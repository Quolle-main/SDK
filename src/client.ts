import { QuolleError, type QuolleConfig } from "./types";
import { EmailsResource } from "./emails";
import { DomainsResource } from "./domains";
import { ContactsResource } from "./contacts";

export class Quolle {
  private readonly apiKey: string;
  readonly baseURL: string;
  private _idempotencyKey?: string;

  readonly emails: EmailsResource;
  readonly domains: DomainsResource;
  readonly contacts: ContactsResource;

  constructor(config: QuolleConfig) {
    if (!config.apiKey) throw new Error("apiKey is required");
    this.apiKey = config.apiKey;
    this.baseURL = config.baseURL ?? "https://api.quolle.com";
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

    const res = await fetch(`${this.baseURL}${path}`, {
      method,
      headers,
      body: body !== undefined ? JSON.stringify(body) : undefined,
    });

    const data = (await res.json()) as T & { error?: string };

    if (!res.ok) {
      throw new QuolleError(
        (data as { error?: string }).error ?? `HTTP ${res.status}`,
        res.status
      );
    }

    return data;
  }
}
