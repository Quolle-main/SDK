import type { Quolle } from "./client";
import type { Domain } from "./types";

export class DomainsResource {
  constructor(private readonly client: Quolle) {}

  async list(): Promise<Domain[]> {
    return this.client.request<{ domains: Domain[] }>("GET", "/v1/domains").then((r) => r.domains);
  }

  async add(domain: string): Promise<Domain> {
    return this.client.request("POST", "/v1/domains", { domain });
  }

  async verify(id: string): Promise<{ status: string; message: string }> {
    return this.client.request("POST", `/v1/domains/${id}/verify`);
  }

  async delete(id: string): Promise<{ message: string }> {
    return this.client.request("DELETE", `/v1/domains/${id}`);
  }
}
