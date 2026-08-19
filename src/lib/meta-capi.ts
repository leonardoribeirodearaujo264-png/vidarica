/* ══════════════════════════════════════════════════════════════════
   META CONVERSIONS API — APENAS SERVIDOR

   Este modulo le META_CONVERSIONS_API_TOKEN. So pode ser importado por
   codigo de servidor (route handlers). Nao importar de componentes
   client — o token nunca pode chegar ao navegador nem aos logs.
   ══════════════════════════════════════════════════════════════════ */

import { createHash } from "node:crypto";
import { PIXEL_ID as PUBLIC_PIXEL_ID, type MetaCustomData, type MetaEventName } from "./meta-events";

const GRAPH_VERSION = process.env.META_GRAPH_API_VERSION ?? "v24.0";

/** ID usado no servidor. Cai no ID publico se META_PIXEL_ID nao existir. */
const SERVER_PIXEL_ID = process.env.META_PIXEL_ID ?? PUBLIC_PIXEL_ID;

/** Codigo do "Testar eventos" do Gerenciador de Eventos (opcional). Quando
 *  definido, os eventos aparecem la em vez de entrar nos dados reais. */
const TEST_EVENT_CODE = process.env.META_TEST_EVENT_CODE;

/* ─────────────── normalizacao + hash (padrao Meta) ─────────────── */

function sha256(value: string): string {
  return createHash("sha256").update(value).digest("hex");
}

/** E-mail: minusculo, sem espacos nas pontas, SHA-256. */
export function hashEmail(raw?: string | null): string | undefined {
  const normalized = raw?.trim().toLowerCase();
  return normalized ? sha256(normalized) : undefined;
}

/** Telefone: so digitos, com DDI (assume 55 quando vier sem), SHA-256. */
export function hashPhone(raw?: string | null): string | undefined {
  const digits = raw?.replace(/\D/g, "");
  if (!digits) return undefined;
  const e164 = digits.length <= 11 ? `55${digits}` : digits;
  return sha256(e164);
}

/** external_id: sem espacos nas pontas, SHA-256. */
export function hashExternalId(raw?: string | null): string | undefined {
  const normalized = raw?.trim();
  return normalized ? sha256(normalized) : undefined;
}

/* ─────────────── envio ─────────────── */

export type ServerEventInput = {
  event_name: MetaEventName;
  event_id: string;
  event_source_url?: string;
  custom_data?: MetaCustomData;
  /** fbp/fbc vao em texto puro (a Meta exige assim). email, phone e
   *  external_id passam por SHA-256 aqui dentro. */
  user_data?: {
    fbp?: string;
    fbc?: string;
    external_id?: string;
    email?: string;
    phone?: string;
  };
  client_ip_address?: string;
  client_user_agent?: string;
};

export type ServerEventResult = { ok: boolean; status: number; detail?: string };

export async function sendMetaServerEvent(input: ServerEventInput): Promise<ServerEventResult> {
  const accessToken = process.env.META_CONVERSIONS_API_TOKEN;

  if (!accessToken) {
    console.error("[meta-capi] META_CONVERSIONS_API_TOKEN nao configurado");
    return { ok: false, status: 503, detail: "conversions api nao configurada" };
  }

  const userData: Record<string, unknown> = {};

  // Sem hash — a Meta exige estes campos em texto puro.
  if (input.client_ip_address) userData.client_ip_address = input.client_ip_address;
  if (input.client_user_agent) userData.client_user_agent = input.client_user_agent;
  if (input.user_data?.fbp) userData.fbp = input.user_data.fbp;
  if (input.user_data?.fbc) userData.fbc = input.user_data.fbc;

  // Com SHA-256 — dados pessoais.
  const email = hashEmail(input.user_data?.email);
  const phone = hashPhone(input.user_data?.phone);
  const externalId = hashExternalId(input.user_data?.external_id);
  if (email) userData.em = [email];
  if (phone) userData.ph = [phone];
  if (externalId) userData.external_id = [externalId];

  const payload = {
    data: [
      {
        event_name: input.event_name,
        // Hora definida pelo servidor: o relogio do navegador pode estar
        // torto e a Meta rejeita eventos com data futura.
        event_time: Math.floor(Date.now() / 1000),
        event_id: input.event_id,
        event_source_url: input.event_source_url,
        action_source: "website",
        user_data: userData,
        custom_data: input.custom_data,
      },
    ],
    ...(TEST_EVENT_CODE ? { test_event_code: TEST_EVENT_CODE } : {}),
    access_token: accessToken,
  };

  try {
    const response = await fetch(
      `https://graph.facebook.com/${GRAPH_VERSION}/${SERVER_PIXEL_ID}/events`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        // O token vai no corpo, nunca na URL — URL acaba em log de acesso.
        body: JSON.stringify(payload),
      },
    );

    const json: unknown = await response.json().catch(() => null);

    if (!response.ok) {
      // Logar somente a mensagem: o payload contem o access_token.
      const error = (json as { error?: { message?: string; error_user_msg?: string } } | null)?.error;
      const message = error?.error_user_msg ?? error?.message ?? `HTTP ${response.status}`;
      console.error("[meta-capi] evento recusado", { event: input.event_name, message });
      return { ok: false, status: response.status, detail: message };
    }

    const received = (json as { events_received?: number } | null)?.events_received;
    return { ok: true, status: 200, detail: `events_received=${received ?? 0}` };
  } catch (error) {
    console.error("[meta-capi] falha de rede", {
      event: input.event_name,
      message: error instanceof Error ? error.message : "erro desconhecido",
    });
    return { ok: false, status: 502, detail: "falha de rede" };
  }
}
