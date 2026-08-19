"use client";

/* ══════════════════════════════════════════════════════════════════
   META PIXEL — LADO NAVEGADOR

   Cada evento e disparado duas vezes de proposito: uma pelo Pixel do
   navegador e outra pela Conversions API (via /api/meta/conversion).
   As duas carregam o MESMO event_id, entao a Meta deduplica e conta
   apenas um evento — com a cobertura extra de quando o navegador
   bloqueia o Pixel.
   ══════════════════════════════════════════════════════════════════ */

import {
  PIXEL_ID,
  PRODUCT,
  generateEventId,
  type MetaCustomData,
  type MetaEventName,
} from "./meta-events";
import { hasMarketingConsent } from "./consent";

declare global {
  interface Window {
    fbq?: (
      command: string,
      event: string,
      params?: Record<string, unknown>,
      options?: { eventID?: string },
    ) => void;
  }
}

const CAPI_ENDPOINT = "/api/meta/conversion";
const VISITOR_KEY = "vr_visitor_id";
const FBC_MAX_AGE_SECONDS = 90 * 24 * 60 * 60; // 90 dias, igual ao Pixel

/** Snippet oficial da Meta, sem o `fbq('track','PageView')` automatico —
 *  o PageView e disparado por trackPageView() para carregar o event_id. */
export const PIXEL_SNIPPET = `!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '${PIXEL_ID}');`;

/* ─────────────── cookies de correspondencia ─────────────── */

function readCookie(name: string): string | undefined {
  if (typeof document === "undefined") return undefined;
  const match = document.cookie.match(new RegExp(`(?:^|; )${name}=([^;]*)`));
  return match ? decodeURIComponent(match[1]) : undefined;
}

/**
 * Le os cookies `_fbp` e `_fbc`. Se a URL trouxer `fbclid` e o `_fbc`
 * ainda nao existir, monta o valor no formato exigido pela Meta
 * (`fb.<subdominio>.<timestamp>.<fbclid>`) e persiste por 90 dias.
 */
export function getFacebookCookies(): { fbp?: string; fbc?: string } {
  if (typeof window === "undefined") return {};

  const fbp = readCookie("_fbp");
  let fbc = readCookie("_fbc");

  if (!fbc) {
    const fbclid = new URLSearchParams(window.location.search).get("fbclid");
    if (fbclid) {
      fbc = `fb.1.${Date.now()}.${fbclid}`;
      document.cookie = `_fbc=${fbc}; max-age=${FBC_MAX_AGE_SECONDS}; path=/; SameSite=Lax`;
    }
  }

  return { fbp, fbc };
}

/** Vira true assim que a primeira espera pelo `_fbp` termina — a partir
 *  dai nenhum evento espera, nem por um instante. */
let cookiesSettled = false;

/** O `_fbp` so existe depois que o fbevents.js roda. Espera curta apenas
 *  no primeiro evento da pagina; cliques posteriores saem na hora. */
function cookiesWhenReady(timeoutMs = 1500): Promise<{ fbp?: string; fbc?: string }> {
  const immediate = getFacebookCookies();
  if (cookiesSettled || immediate.fbp) {
    cookiesSettled = true;
    return Promise.resolve(immediate);
  }

  return new Promise((resolve) => {
    const startedAt = Date.now();
    const check = () => {
      const cookies = getFacebookCookies();
      if (cookies.fbp || Date.now() - startedAt >= timeoutMs) {
        cookiesSettled = true;
        resolve(cookies);
        return;
      }
      window.setTimeout(check, 150);
    };
    check();
  });
}

/** ID anonimo e estavel por navegador. Vai para a CAPI como external_id
 *  (o servidor aplica SHA-256 antes de enviar a Meta). */
function getVisitorId(): string | undefined {
  if (typeof window === "undefined") return undefined;
  try {
    let id = window.localStorage.getItem(VISITOR_KEY);
    if (!id) {
      id = generateEventId("visitor");
      window.localStorage.setItem(VISITOR_KEY, id);
    }
    return id;
  } catch {
    return undefined;
  }
}

/* ─────────────── envio ─────────────── */

/** Envia o evento ao nosso servidor, que repassa a Meta pela CAPI.
 *  Nunca bloqueia o clique: usa sendBeacon (ou fetch keepalive). */
async function sendServerEvent(
  eventName: MetaEventName,
  eventId: string,
  customData?: MetaCustomData,
): Promise<void> {
  try {
    const { fbp, fbc } = await cookiesWhenReady();
    const body = JSON.stringify({
      event_name: eventName,
      event_id: eventId,
      event_source_url: window.location.href,
      custom_data: customData,
      user_data: { fbp, fbc, external_id: getVisitorId() },
    });

    if (typeof navigator.sendBeacon === "function") {
      const queued = navigator.sendBeacon(
        CAPI_ENDPOINT,
        new Blob([body], { type: "application/json" }),
      );
      if (queued) return;
    }

    await fetch(CAPI_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body,
      keepalive: true,
    });
  } catch {
    // Rastreamento nunca pode quebrar a pagina.
  }
}

/** Dispara o mesmo evento no Pixel e na CAPI com um unico event_id. */
function track(eventName: MetaEventName, customData?: MetaCustomData): void {
  if (typeof window === "undefined") return;
  if (!hasMarketingConsent()) return;

  const eventId = generateEventId(eventName);

  if (typeof window.fbq === "function") {
    window.fbq("track", eventName, customData ?? {}, { eventID: eventId });
  }

  void sendServerEvent(eventName, eventId, customData);
}

/* ─────────────── eventos ─────────────── */

/** Uma vez por carregamento de pagina. */
export function trackPageView(): void {
  track("PageView");
}

/** Visualizacao da secao de oferta/preco. */
export function trackViewContent(): void {
  track("ViewContent", { ...PRODUCT });
}

/** Clique num botao que leva ao checkout da Kiwify.
 *  `ctaLocation` identifica qual botao converteu. */
export function trackInitiateCheckout(ctaLocation: string): void {
  track("InitiateCheckout", { ...PRODUCT, cta_location: ctaLocation });
}

/** Clique nos canais de contato (WhatsApp, Instagram, e-mail). */
export function trackContact(channel: string): void {
  track("Contact", { channel });
}

// Purchase is handled by Kiwify to avoid duplicate purchases.
