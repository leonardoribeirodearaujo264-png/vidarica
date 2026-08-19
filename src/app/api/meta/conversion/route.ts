/* ══════════════════════════════════════════════════════════════════
   POST /api/meta/conversion

   Recebe os eventos do navegador e repassa a Meta pela Conversions API.
   O token vive so aqui no servidor (variavel de ambiente da Vercel).
   ══════════════════════════════════════════════════════════════════ */

import { NextResponse, type NextRequest } from "next/server";
import { isMetaEventName, type MetaCustomData } from "@/lib/meta-events";
import { sendMetaServerEvent } from "@/lib/meta-capi";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const MAX_BODY_BYTES = 4096;

type Payload = {
  event_name?: unknown;
  event_id?: unknown;
  event_source_url?: unknown;
  custom_data?: unknown;
  user_data?: {
    fbp?: unknown;
    fbc?: unknown;
    external_id?: unknown;
    email?: unknown;
    phone?: unknown;
  };
};

function asString(value: unknown): string | undefined {
  return typeof value === "string" && value.length > 0 ? value : undefined;
}

/** Primeiro IP do x-forwarded-for (o do cliente; os seguintes sao proxies). */
function clientIp(request: NextRequest): string | undefined {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0]?.trim() || undefined;
  return request.headers.get("x-real-ip") ?? undefined;
}

export async function POST(request: NextRequest) {
  // Aceita apenas chamadas vindas da propria pagina.
  const origin = request.headers.get("origin");
  if (origin) {
    let sameOrigin = false;
    try {
      sameOrigin = new URL(origin).host === request.headers.get("host");
    } catch {
      sameOrigin = false;
    }
    if (!sameOrigin) {
      return NextResponse.json({ ok: false, error: "origem invalida" }, { status: 403 });
    }
  }

  const raw = await request.text();
  if (raw.length > MAX_BODY_BYTES) {
    return NextResponse.json({ ok: false, error: "corpo muito grande" }, { status: 413 });
  }

  let payload: Payload;
  try {
    payload = JSON.parse(raw) as Payload;
  } catch {
    return NextResponse.json({ ok: false, error: "json invalido" }, { status: 400 });
  }

  // Purchase and InitiateCheckout are handled by Kiwify to avoid duplicate events.
  if (payload.event_name === "Purchase" || payload.event_name === "InitiateCheckout") {
    return NextResponse.json(
      { ok: false, error: `${payload.event_name} is handled by Kiwify` },
      { status: 409 },
    );
  }

  if (!isMetaEventName(payload.event_name)) {
    return NextResponse.json({ ok: false, error: "evento nao permitido" }, { status: 400 });
  }

  const eventId = asString(payload.event_id);
  if (!eventId) {
    return NextResponse.json({ ok: false, error: "event_id obrigatorio" }, { status: 400 });
  }

  const result = await sendMetaServerEvent({
    event_name: payload.event_name,
    event_id: eventId,
    event_source_url: asString(payload.event_source_url),
    custom_data:
      payload.custom_data && typeof payload.custom_data === "object"
        ? (payload.custom_data as MetaCustomData)
        : undefined,
    user_data: {
      fbp: asString(payload.user_data?.fbp),
      fbc: asString(payload.user_data?.fbc),
      external_id: asString(payload.user_data?.external_id),
      email: asString(payload.user_data?.email),
      phone: asString(payload.user_data?.phone),
    },
    client_ip_address: clientIp(request),
    client_user_agent: request.headers.get("user-agent") ?? undefined,
  });

  return NextResponse.json(
    { ok: result.ok, detail: result.detail },
    { status: result.ok ? 200 : 502 },
  );
}
