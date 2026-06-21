import { QuolleError, type QuolleConfig } from "./types";
import { EmailsResource } from "./emails";
import { DomainsResource } from "./domains";
import { ContactsResource } from "./contacts";

export class Quolle {
  private readonly apiKey: string;
  private readonly timeout: number;
  readonly baseURL: string;
  private _idempotencyKey?: string;

  readonly emails: EmailsResource;
  readonly domains: DomainsResource;
  readonly contacts: ContactsResource;

  constructor(config: QuolleConfig) {
    if (!config.apiKey) throw new Error("Quolle API key is required");
    if (!config.apiKey.startsWith("qle_")) {
      console.warn("Warning: API key should start with qle_");
    }
    this.apiKey = config.apiKey;
    this.baseURL = config.baseURL ?? "https://api.quolle.com";
    this.timeout = config.timeout ?? 30000;
    this.emails = new EmailsResource(this);
    this.domains = new DomainsResource(this);
    this.contacts = new ContactsResource(this);
  }

  setIdempotencyKey(key: string): this {
    this._idempotencyKey = key;
    return this;
  }

  async request<T>(
    method: string,
    path: string,
    body?: unknown,
    extraHeaders?: Record<string, string>
  ): Promise<T> {
    const headers: Record<string, string> = {
      Authorization: `Bearer ${this.apiKey}`,
      "Content-Type": "application/json",
      ...extraHeaders,
    };

    if (this._idempotencyKey) {
      headers["Idempotency-Key"] = this._idempotencyKey;
      this._idempotencyKey = undefined;
    }

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), this.timeout);

    try {
      const res = await fetch(`${this.baseURL}${path}`, {
        method,
        headers,
        body: body !== undefined ? JSON.stringify(body) : undefined,
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      const data = (await res.json()) as T & { error?: string };

      if (!res.ok) {
        throw new QuolleError(
          (data as { error?: string }).error ?? `HTTP ${res.status}`,
          res.status,
          data as Record<string, unknown>
        );
      }

      return data;
    } catch (err) {
      clearTimeout(timeoutId);
      throw err;
    }
  }
}
