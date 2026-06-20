import type { Quolle } from "./client";
import type { SendEmailPayload, USSDEmailPayload, Email } from "./types";

export class EmailsResource {
  constructor(private readonly client: Quolle) {}

  async send(payload: SendEmailPayload): Promise<{ id: string; message: string; status?: string; scheduledAt?: string }> {
    return this.client.request("POST", "/v1/emails/send", payload);
  }

  async sendBatch(emails: SendEmailPayload[]): Promise<{ queued: number; ids: string[] }> {
    return this.client.request("POST", "/v1/emails/batch", { emails });
  }

  async get(id: string): Promise<Email> {
    return this.client.request<{ email: Email }>("GET", `/v1/emails/${id}`).then((r) => r.email);
  }

  async cancel(id: string): Promise<{ message: string }> {
    return this.client.request("DELETE", `/v1/emails/${id}/cancel`);
  }

  async sendUSSD(payload: USSDEmailPayload): Promise<{ queued: boolean; ref: string }> {
    return this.client.request("POST", "/v1/emails/ussd", payload);
  }

  setIdempotencyKey(key: string): this {
    this.client.setIdempotencyKey(key);
    return this;
  }
}
