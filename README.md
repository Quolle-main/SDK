# quolle

Official Node.js / TypeScript SDK for [Quolle](https://quolle.com) — transactional email built for African SaaS.

## Installation

```bash
npm install quolle
```

## Quick start

```typescript
import { Quolle } from "quolle";

const client = new Quolle({ apiKey: process.env.QUOLLE_API_KEY! });

const email = await client.emails.send({
  from: "hello@mail.yourdomain.com",
  to: "customer@example.com",
  subject: "Welcome!",
  html: "<h1>Thanks for signing up</h1>",
});

console.log(email.id); // "a1b2c3d4-…"
```

## Idempotency

```typescript
client.emails.setIdempotencyKey("order_12345");
const email = await client.emails.send({ … });
// Calling again with the same key returns the cached response
```

## Scheduled sending

```typescript
await client.emails.send({
  from: "…",
  to: "…",
  subject: "Your weekly digest",
  html: "…",
  scheduledAt: "2026-12-25T09:00:00.000Z",
});
```

## Batch sending

```typescript
const { ids, queued } = await client.emails.sendBatch([
  { from: "…", to: "alice@example.com", subject: "Hi Alice", html: "…" },
  { from: "…", to: "bob@example.com",   subject: "Hi Bob",   html: "…" },
]);
```

## USSD-triggered emails

```typescript
const result = await client.emails.sendUSSD({
  from: "receipts@mail.yourbank.com",
  phoneNumber: "+2348012345678",
  subject: "Transaction Receipt",
  html: "<p>₦5,000 sent.</p>",
  metadata: {
    ussd: { sessionId: "sess_abc", shortCode: "*737#", phoneNumber: "+2348012345678" },
  },
});
// { queued: true, ref: "…" }
```

## Domains

```typescript
const domains = await client.domains.list();
const d = await client.domains.add("mail.yourdomain.com");
await client.domains.verify(d.id);
```

## Contact lists

```typescript
const list = await client.contacts.createList("Newsletter");
await client.contacts.add(list.id, {
  email: "user@example.com",
  firstName: "Amaka",
  phone: "+2348012345678",
});
const contacts = await client.contacts.list(list.id);
```

## Error handling

```typescript
import { QuolleError } from "quolle";

try {
  await client.emails.send({ … });
} catch (err) {
  if (err instanceof QuolleError) {
    console.error(err.status, err.message);
  }
}
```

## API reference

See the full [API documentation](https://docs.quolle.com).

## License

MIT
