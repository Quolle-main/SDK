export interface QuolleConfig {
  apiKey: string;
  baseURL?: string;
  timeout?: number;
}

export interface SendEmailPayload {
  from: string;
  to: string | string[];
  subject: string;
  html: string;
  text?: string;
  replyTo?: string;
  scheduledAt?: string;
  metadata?: Record<string, unknown>;
}

export interface USSDEmailPayload extends SendEmailPayload {
  metadata: {
    ussd: {
      sessionId: string;
      shortCode: string;
      phoneNumber: string;
      transactionRef?: string;
    };
    [key: string]: unknown;
  };
}

export interface Email {
  id: string;
  from: string;
  to: string;
  subject: string;
  status: "queued" | "sending" | "sent" | "delivered" | "bounced" | "failed";
  provider?: string;
  messageId?: string;
  opensCount: number;
  clicksCount: number;
  openedAt?: string;
  clickedAt?: string;
  sentAt?: string;
  createdAt: string;
}

export interface Domain {
  id: string;
  domain: string;
  status: "pending" | "verified" | "failed";
  dnsProvider?: string;
  createdAt: string;
}

export interface DNSRecord {
  type: string;
  name: string;
  value: string;
  ttl: number;
  purpose: string;
}

export interface Contact {
  id: string;
  email: string;
  firstName?: string | null;
  lastName?: string | null;
  phone?: string | null;
  unsubscribed: boolean;
  createdAt: string;
}

export interface ContactList {
  id: string;
  name: string;
  createdAt: string;
}

export interface WebhookEvent {
  event: string;
  emailId: string;
  to: string[];
  subject: string;
  status: string;
  timestamp: string;
  messageId?: string;
}

export class QuolleError extends Error {
  constructor(
    message: string,
    public statusCode: number,
    public data?: Record<string, unknown>
  ) {
    super(message);
    this.name = "QuolleError";
  }
}
