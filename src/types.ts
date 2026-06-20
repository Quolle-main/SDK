export interface QuolleConfig {
  apiKey: string;
  baseURL?: string;
}

export interface SendEmailPayload {
  from: string;
  to: string | string[];
  subject: string;
  html: string;
  replyTo?: string;
  text?: string;
  scheduledAt?: string;
  metadata?: {
    ussd?: {
      sessionId: string;
      shortCode: string;
      phoneNumber: string;
      transactionRef?: string;
    };
    [key: string]: unknown;
  };
}

export interface USSDEmailPayload extends Omit<SendEmailPayload, "to"> {
  to?: string;
  phoneNumber?: string;
}

export interface Email {
  id: string;
  from: string;
  to: string;
  subject: string;
  status: string;
  opensCount: number;
  clicksCount: number;
  openedAt: string | null;
  clickedAt: string | null;
  sentAt: string | null;
  scheduledAt: string | null;
  createdAt: string;
}

export interface Domain {
  id: string;
  domain: string;
  status: "pending" | "verified" | "failed";
  createdAt: string;
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
  statusCode: number;
  constructor(message: string, statusCode: number) {
    super(message);
    this.name = "QuolleError";
    this.statusCode = statusCode;
  }
}
