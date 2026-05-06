// retryFailedLeadForwards
// Scheduled function: drains OutboundLeadQueue by re-POSTing each pending
// payload to the MRT ops app. Reuses the original idempotency_key so the ops
// side dedupes. Uses exponential backoff via next_attempt_at.
//
// Schedule recommendation (set in Base44 dashboard): every 5 minutes.
//
// Required env vars: MRT_OPS_BASE_URL, MRT_WEBSITE_OUTBOUND_SECRET

import { createClientFromRequest } from 'npm:@base44/sdk@0.8.26';

const MAX_ATTEMPTS = 8;       // ~ covers ~4 hours of backoff
const BATCH_SIZE = 25;
const TARGET_APP = 'mission-ready-transport-mrt';

function backoffMs(attempts: number): number {
  // 1m, 2m, 4m, 8m, 16m, 32m, 64m, 128m
  return Math.min(60_000 * 2 ** (attempts - 1), 2 * 60 * 60_000);
}

Deno.serve(async (req: Request) => {
  const base44 = createClientFromRequest(req);

  const baseUrl = Deno.env.get('MRT_OPS_BASE_URL');
  const secret = Deno.env.get('MRT_WEBSITE_OUTBOUND_SECRET');
  if (!baseUrl || !secret) {
    return Response.json(
      { error: 'MRT_OPS_BASE_URL and MRT_WEBSITE_OUTBOUND_SECRET must be set' },
      { status: 500 },
    );
  }
  const url = `${baseUrl.replace(/\/$/, '')}/functions/receiveBookingFromWebsite`;

  const now = new Date().toISOString();
  const pending = await base44.entities.OutboundLeadQueue.filter({
    status: 'pending',
  }, '-created_date', BATCH_SIZE);

  const results: Array<{ id: string; ok: boolean; status?: number; error?: string }> = [];

  for (const item of pending) {
    if (item.next_attempt_at && item.next_attempt_at > now) continue;

    const attempts = (item.attempts ?? 0) + 1;
    const startedAt = Date.now();

    try {
      await base44.entities.OutboundLeadQueue.update(item.id, { status: 'in_progress' });

      const res = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-mrt-website-secret': secret,
          'x-idempotency-key': item.idempotency_key,
        },
        body: JSON.stringify(item.payload),
      });

      if (!res.ok) {
        const text = await res.text().catch(() => '');
        throw new Error(`HTTP ${res.status}: ${text.slice(0, 500)}`);
      }

      await base44.entities.OutboundLeadQueue.update(item.id, {
        status: 'succeeded',
        attempts,
        last_error: null,
      });

      await base44.entities.AuditLog.create({
        action_type: 'lead_forward_retry',
        entity_type: item.source_lead_entity_type,
        entity_id: item.source_lead_entity_id,
        target_app: TARGET_APP,
        success: true,
        latency_ms: Date.now() - startedAt,
        idempotency_key: item.idempotency_key,
        http_status: res.status,
      });

      results.push({ id: item.id, ok: true, status: res.status });
    } catch (err) {
      const errMsg = err instanceof Error ? err.message : String(err);
      const isDead = attempts >= MAX_ATTEMPTS;

      await base44.entities.OutboundLeadQueue.update(item.id, {
        status: isDead ? 'dead' : 'pending',
        attempts,
        last_error: errMsg,
        next_attempt_at: isDead
          ? null
          : new Date(Date.now() + backoffMs(attempts)).toISOString(),
      });

      await base44.entities.AuditLog.create({
        action_type: isDead ? 'lead_forward_dead' : 'lead_forward_retry',
        entity_type: item.source_lead_entity_type,
        entity_id: item.source_lead_entity_id,
        target_app: TARGET_APP,
        success: false,
        error: errMsg,
        latency_ms: Date.now() - startedAt,
        idempotency_key: item.idempotency_key,
      });

      results.push({ id: item.id, ok: false, error: errMsg });
    }
  }

  return Response.json({
    processed: results.length,
    results,
  });
});
