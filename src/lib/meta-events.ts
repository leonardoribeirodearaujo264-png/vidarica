/* ══════════════════════════════════════════════════════════════════
   META — CONFIGURACAO COMPARTILHADA (navegador + servidor)

   ATENCAO: este arquivo tambem e enviado ao navegador.
   Nunca colocar segredos aqui (o token da CAPI fica em meta-capi.ts,
   lido apenas de variavel de ambiente do servidor).
   ══════════════════════════════════════════════════════════════════ */

/** ID do Pixel. E publico por natureza — aparece no HTML de qualquer site. */
export const PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID ?? "1675957073477718";

/**
 * Eventos que ESTE site pode enviar.
 *
 * Purchase is handled by Kiwify to avoid duplicate purchases.
 * A compra acontece no checkout da Kiwify, que ja dispara o Pixel com o
 * mesmo ID. Nao ha como compartilhar event_id com a Kiwify, entao um
 * Purchase disparado aqui seria contado em dobro.
 */
export const META_EVENTS = ["PageView", "ViewContent", "InitiateCheckout", "Contact"] as const;

export type MetaEventName = (typeof META_EVENTS)[number];

export function isMetaEventName(value: unknown): value is MetaEventName {
  return typeof value === "string" && (META_EVENTS as readonly string[]).includes(value);
}

/** Dados reais do produto — os mesmos valores exibidos na pagina de oferta. */
export const PRODUCT = {
  content_type: "product",
  content_ids: ["vida-rica"],
  currency: "BRL",
  value: 97,
} as const;

export type MetaCustomData = Record<string, unknown>;

/**
 * Gera um event_id unico. O MESMO id vai para o Pixel do navegador
 * (opcao eventID) e para a Conversions API, que e como a Meta deduplica.
 */
export function generateEventId(eventName: string): string {
  const uuid =
    typeof crypto !== "undefined" && typeof crypto.randomUUID === "function"
      ? crypto.randomUUID()
      : `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 12)}`;
  return `${eventName}.${uuid}`;
}
