// forwardLeadToOps
// Server function called from page submit handlers RIGHT AFTER a lead-capture
// entity (ServiceRequest, CompanyOnboarding, ContactInquiry) is created.
//
// It builds the payload expected by the MRT ops app's `receiveBookingFromWebsite`
// inbound function, POSTs it with the shared-secret header, and:
//   - on success: writes an AuditLog success row
//   - on failure: writes the payload to OutboundLeadQueue for retry AND
//                 writes an AuditLog failure row
//
// Required env vars (set in Base44 dashboard):
//   MRT_OPS_BASE_URL              e.g. https://app.base44.com/apps/<ops-app-id>
//   MRT_WEBSITE_OUTBOUND_SECRET   shared secret with the ops app

import { createClientFromRequest } from 'npm:@base44/sdk@0.8.26';

type Source = 'BookService' | 'CompanyOnboarding' | 'Contact';
type EntityType = 'ServiceRequest' | 'CompanyOnboarding' | 'ContactInquiry';

const SOURCE_TO_ENTITY: Record<Source, EntityType> = {
  BookService: 'ServiceRequest',
  CompanyOnboarding: 'CompanyOnboarding',
  Contact: 'ContactInquiry',
};

interface ForwardRequest {
  source: Source;
  record_id: string;
  fields: Record<string, unknown>;
  // Optional: when called from retry job, reuse the original idempotency key
  idempotency_key?: string;
}

function buildOpsPayload(
  entityType: EntityType,
  recordId: string,
  fields: Record<string, unknown>,
  idempotencyKey: string,
) {
  // Map website fields -> ops app `receiveBookingFromWebsite` shape.
  // Ops app expects:
  //   { lead_type, source_record_id, source_app, idempotency_key, contact: {...}, details: {...} }
  const f = fields as Record<string, string | boolean | undefined>;

  const base = {
    source_app: 'mrt-connect',
    source_record_id: recordId,
    source_entity: entityType,
    idempotency_key: idempotencyKey,
    submitted_at: new Date().toISOString(),
  };

  if (entityType === 'ServiceRequest') {
    return {
      ...base,
      lead_type: 'service_request',
      contact: {
        name: f.contact_name,
        company: f.company,
        email: f.email,
        phone: f.phone,
      },
      details: {
        service_type: f.service_type,
        pickup_location: f.pickup_location,
        destination: f.destination,
        preferred_date: f.preferred_date,
        preferred_time: f.preferred_time,
        is_recurring: f.is_recurring,
        estimated_volume: f.estimated_volume,
        notes: f.notes,
      },
    };
  }

  if (entityType === 'CompanyOnboarding') {
    return {
      ...base,
      lead_type: 'company_onboarding',
      contact: {
        name: f.contact_person,
        company: f.company_name,
        role: f.role_title,
        email: f.email,
        phone: f.phone,
      },
      details: {
        service_category: f.service_category,
        expected_frequency: f.expected_frequency,
        service_geography: f.service_geography,
        timing_windows: f.timing_windows,
        estimated_monthly_volume: f.estimated_monthly_volume,
        special_handling: f.special_handling,
        comments: f.comments,
      },
    };
  }

  // ContactInquiry
  return {
    ...base,
    lead_type: 'contact_inquiry',
    contact: {
      name: f.name,
      email: f.email,
      phone: f.phone,
    },
    details: {
      inquiry_type: f.inquiry_type,
      message: f.message,
    },
  };
}

Deno.serve(async (req: Request) => {
  if (req.method !== 'POST') {
    return Response.json({ error: 'Method not allowed' }, { status: 405 });
  }

  const base44 = createClientFromRequest(req);

  let body: ForwardRequest;
  try {
    body = (await req.json()) as ForwardRequest;
  } catch (_e) {
    return Response.json({ error: 'Invalid JSON body' }, { status: 400 });
  }

  const entityType = SOURCE_TO_ENTITY[body.source];
  if (!entityType || !body.record_id || !body.fields) {
    return Response.json(
      { error: 'Missing source, record_id, or fields' },
      { status: 400 },
    );
  }

  const baseUrl = Deno.env.get('MRT_OPS_BASE_URL');
  const secret = Deno.env.get('MRT_WEBSITE_OUTBOUND_SECRET');
  if (!baseUrl || !secret) {
    return Response.json(
      { error: 'MRT_OPS_BASE_URL and MRT_WEBSITE_OUTBOUND_SECRET must be set' },
      { status: 500 },
    );
  }

  const idempotencyKey = body.idempotency_key ?? crypto.randomUUID();
  const payload = buildOpsPayload(entityType, body.record_id, body.fields, idempotencyKey);
  const targetApp = 'mission-ready-transport-mrt';
  const url = `${baseUrl.replace(/\/$/, '')}/functions/receiveBookingFromWebsite`;

  const startedAt = Date.now();
  let httpStatus: number | undefined;
  let lastError: string | undefined;

  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-mrt-website-secret': secret,
        'x-idempotency-key': idempotencyKey,
      },
      body: JSON.stringify(payload),
    });
    httpStatus = res.status;

    if (!res.ok) {
      const text = await res.text().catch(() => '');
      lastError = `HTTP ${res.status}: ${text.slice(0, 500)}`;
      throw new Error(lastError);
    }

    await base44.entities.AuditLog.create({
      action_type: 'lead_forward_success',
      entity_type: entityType,
      entity_id: body.record_id,
      target_app: targetApp,
      success: true,
      latency_ms: Date.now() - startedAt,
      idempotency_key: idempotencyKey,
      http_status: httpStatus,
    });

    return Response.json({ ok: true, idempotency_key: idempotencyKey });
  } catch (err) {
    lastError = lastError ?? (err instanceof Error ? err.message : String(err));

    // Queue for retry
    try {
      await base44.entities.OutboundLeadQueue.create({
        source_lead_entity_type: entityType,
        source_lead_entity_id: body.record_id,
        target_app: targetApp,
        payload,
        status: 'pending',
        attempts: 1,
        last_error: lastError,
        idempotency_key: idempotencyKey,
        next_attempt_at: new Date(Date.now() + 60_000).toISOString(),
      });
    } catch (queueErr) {
      console.error('Failed to enqueue retry:', queueErr);
    }

    await base44.entities.AuditLog.create({
      action_type: 'lead_forward_failure',
      entity_type: entityType,
      entity_id: body.record_id,
      target_app: targetApp,
      success: false,
      error: lastError,
      latency_ms: Date.now() - startedAt,
      idempotency_key: idempotencyKey,
      http_status: httpStatus,
    });

    // Return 202: lead was captured locally and queued for retry — don't surface
    // a hard failure to the visitor. Ops will pick it up via retry job.
    return Response.json(
      { ok: false, queued: true, idempotency_key: idempotencyKey, error: lastError },
      { status: 202 },
    );
  }
});
