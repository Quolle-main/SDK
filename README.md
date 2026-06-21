# Quolle

Official Node.js SDK for [Quolle](https://quolle.com) — transactional email API for African SaaS.

## Installation

```bash
npm install @quolle/sdk
```

## Quick Start

```typescript
import { Quolle } from "@quolle/sdk"

const quolle = new Quolle({
  apiKey: process.env.QUOLLE_API_KEY!
})

// Send an email
const { id } = await quolle.emails.send({
  from: "hello@mail.yourdomain.com",
  to: "customer@example.com",
  subject: "Welcome!",
  html: "<h1>Welcome to our platform</h1>"
})
```

## Features

- ✅ TypeScript-first with full type safety
- ✅ Send via REST API
- ✅ USSD-triggered emails
- ✅ Idempotency key support
- ✅ Domain management
- ✅ Naira pricing at quolle.com

## Idempotency

```typescript
const { id } = await quolle.emails
  .setIdempotencyKey("order_123_receipt")
  .send({
    from: "hello@mail.yourdomain.com",
    to: "customer@example.com",
    subject: "Your receipt",
    html: "<p>Thanks for your order</p>"
  })
```

## Scheduled Sending

```typescript
await quolle.emails.send({
  from: "hello@mail.yourdomain.com",
  to: "customer@example.com",
  subject: "Your weekly digest",
  html: "<p>Here's what happened this week</p>",
  scheduledAt: "2026-12-25T09:00:00.000Z"
})
```

## Batch Sending

```typescript
const { ids, queued } = await quolle.emails.sendBatch([
  { from: "hello@mail.yourdomain.com", to: "alice@example.com", subject: "Hi Alice", html: "<p>Hello</p>" },
  { from: "hello@mail.yourdomain.com", to: "bob@example.com",   subject: "Hi Bob",   html: "<p>Hello</p>" }
])
```

## USSD Emails

```typescript
await quolle.emails.sendUSSD({
  from: "receipts@mail.yourbank.com",
  to: "customer@example.com",
  subject: "Transaction Receipt",
  html: "<p>₦5,000 sent successfully</p>",
  metadata: {
    ussd: {
      sessionId: "sess_123",
      shortCode: "*737#",
      phoneNumber: "+2348012345678"
    }
  }
})
```

## Domains

```typescript
const domains = await quolle.domains.list()

const { domain, dnsRecords } = await quolle.domains.add("mail.yourdomain.com")

const { verified, status } = await quolle.domains.verify(domain.id)
```

## Contact Lists

```typescript
const list = await quolle.contacts.createList("Newsletter")
await quolle.contacts.add(list.id, {
  email: "user@example.com",
  firstName: "Amaka",
  phone: "+2348012345678"
})
const contacts = await quolle.contacts.list(list.id)
```

## Error Handling

```typescript
import { Quolle, QuolleError } from "@quolle/sdk"

try {
  await quolle.emails.send({
    from: "hello@mail.yourdomain.com",
    to: "customer@example.com",
    subject: "Welcome!",
    html: "<h1>Welcome</h1>"
  })
} catch (err) {
  if (err instanceof QuolleError) {
    console.error(err.statusCode, err.message)
  }
}
```

## API Reference

Full documentation at https://docs.quolle.com

## License

MIT © Avianise
