import type { Quolle } from "./client";
import type { Domain, DNSRecord } from "./types";

export class DomainsResource {
  constructor(private readonly client: Quolle) {}

  async list(): Promise<Domain[]> {
    return this.client.request<{ domains: Domain[] }>("GET", "/v1/domains").then((r) => r.domains);
  }

  async add(domain: string): Promise<{ domain: Domain; dnsRecords: DNSRecord[]; isCloudflare: boolean }> {
    return this.client.request("POST", "/v1/domains", { domain });
  }

  async verify(domainId: string): Promise<{ verified: boolean; status: string }> {
    return this.client.request("POST", `/v1/domains/${domainId}/verify`);
  }

  async delete(domainId: string): Promise<{ message: string }> {
    return this.client.request("DELETE", `/v1/domains/${domainId}`);
  }
}
