export interface QuolleConfig {
  apiKey: string;
  baseURL?: string;
  timeout?: number;
}

interface SendEmailBase {
  from: string;
  to: string | string[];
  subject: string;
  replyTo?: string;
  scheduledAt?: string;
  metadata?: Record<string, unknown>;
}

export type SendEmailPayload = SendEmailBase &
  (
    | { html: string; text?: string; template?: never; variables?: never }
    | { template: string; variables?: Record<string, unknown>; html?: never; text?: never }
  );

export type USSDEmailPayload = SendEmailPayload & {
  metadata: {
    ussd: {
      sessionId: string;
      shortCode: string;
      phoneNumber: string;
      transactionRef?: string;
    };
    [key: string]: unknown;
  };
};

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

  get status(): number {
    return this.statusCode;
  }
}
