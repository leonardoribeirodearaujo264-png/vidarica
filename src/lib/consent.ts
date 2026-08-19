/* ══════════════════════════════════════════════════════════════════
   CONSENTIMENTO DE MARKETING

   O site ainda NAO possui banner de cookies. Este modulo existe para
   que adicionar um depois seja uma mudanca de uma funcao so: basta
   fazer hasMarketingConsent() ler a escolha do usuario. Enquanto nao
   houver banner, o padrao e permitir (comportamento atual do site).
   ══════════════════════════════════════════════════════════════════ */

const STORAGE_KEY = "consent:marketing";

/** Retorna false apenas se o usuario tiver recusado explicitamente. */
export function hasMarketingConsent(): boolean {
  if (typeof window === "undefined") return false;
  try {
    return window.localStorage.getItem(STORAGE_KEY) !== "denied";
  } catch {
    // Navegador sem acesso a storage (modo restrito): mantem o padrao atual.
    return true;
  }
}

/** Usar quando existir um banner de cookies. */
export function setMarketingConsent(granted: boolean): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(STORAGE_KEY, granted ? "granted" : "denied");
  } catch {
    /* sem storage: nada a persistir */
  }
}
