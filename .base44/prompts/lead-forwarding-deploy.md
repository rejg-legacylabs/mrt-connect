# Lead Forwarding Deploy Notes (mrt-connect)

This website forwards every captured lead (ServiceRequest, CompanyOnboarding,
ContactInquiry) to the **MRT ops** Base44 app (`mission-ready-transport-mrt`)
so operations can act on leads from a single inbox.

## Required env vars

Set these in the Base44 dashboard for this app (Settings -> Environment):

| Name | Value |
| --- | --- |
| `MRT_OPS_BASE_URL` | Functions base URL of the MRT ops app, e.g. `https://app.base44.com/apps/<ops-app-id>` |
| `MRT_WEBSITE_OUTBOUND_SECRET` | Long random string. Must match the value the ops app reads as `MRT_WEBSITE_INBOUND_SECRET` to validate `x-mrt-website-secret`. |

Generate the secret with e.g. `openssl rand -hex 32` and store it in 1Password
before pasting into both apps' env config.

## Functions

- `forwardLeadToOps` — invoked by the page submit handlers (`BookService`,
  `CompanyOnboarding`, `Contact`) immediately after the entity is created.
  POSTs to `${MRT_OPS_BASE_URL}/functions/receiveBookingFromWebsite` with header
  `x-mrt-website-secret: <secret>`. On failure, enqueues the payload to
  `OutboundLeadQueue` and writes an `AuditLog` entry.
- `retryFailedLeadForwards` — scheduled every 5 minutes; drains `OutboundLeadQueue`
  with exponential backoff (1m, 2m, 4m, ... up to 8 attempts).

## Entities added

- `OutboundLeadQueue` — failed-forward retry queue.
- `AuditLog` — append-only audit trail for all forward attempts.

## Deploy steps

1. Merge this PR.
2. Add both env vars in the Base44 dashboard.
3. In the Base44 dashboard -> Functions -> `retryFailedLeadForwards`, set a
   schedule of `*/5 * * * *` (every 5 minutes).
4. Deploy. Base44 will pick up the new entities on next publish.

## Smoke test

1. Submit a fake `Contact` form on the live site.
2. Confirm a `ContactInquiry` row was created (existing behavior).
3. Confirm an `AuditLog` row with `action_type=lead_forward_success` exists.
4. Confirm the lead appears in the MRT ops app inbox.
5. Negative test: temporarily rotate `MRT_WEBSITE_OUTBOUND_SECRET` on the
   website only. Resubmit. You should see an `OutboundLeadQueue` row with
   `status=pending`. Restore the secret; within 5 minutes the queue row
   should flip to `status=succeeded`.

## Cross-app dependency

The ops app (`mission-ready-transport-mrt`) MUST expose a server function
`receiveBookingFromWebsite` that:

- Validates the `x-mrt-website-secret` header against its own
  `MRT_WEBSITE_INBOUND_SECRET` env var.
- Dedupes by `idempotency_key` (also passed as `x-idempotency-key` header).
- Persists the lead into the ops `Lead` / `Booking` entity.
- Returns 2xx on success.

If that handler is not yet in place, leads will queue and retry until it is.
