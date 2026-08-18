/* ═══════════════ META PIXEL ═══════════════ */
export const PIXEL_ID = "1675957073477718";

declare global {
  interface Window {
    fbq?: (command: string, event: string, params?: Record<string, unknown>) => void;
  }
}

/* Dados do produto enviados junto dos eventos de compra */
const PRODUCT = {
  content_name: "Vida Rica",
  content_ids: ["vida-rica"],
  content_type: "product",
  value: 97,
  currency: "BRL",
};

/** Dispara um evento do Pixel. Vira no-op se o script ainda não carregou. */
export function track(event: string, params?: Record<string, unknown>) {
  if (typeof window === "undefined" || typeof window.fbq !== "function") return;
  window.fbq("track", event, params);
}

/** Visualização da seção de oferta/preço. */
export function trackViewContent() {
  track("ViewContent", { ...PRODUCT });
}

/** Clique em qualquer botão que leva ao checkout da Kiwify. */
export function trackCheckout(location: string) {
  track("InitiateCheckout", { ...PRODUCT, cta_location: location });
}

/** Clique nos canais de contato (WhatsApp, Instagram, e-mail). */
export function trackContact(channel: string) {
  track("Contact", { channel });
}
