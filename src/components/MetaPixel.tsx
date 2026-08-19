"use client";

/* ══════════════════════════════════════════════════════════════════
   Unico ponto de instalacao do Meta Pixel no site.
   O snippet tem a guarda `if(f.fbq)return;` e este componente e
   montado uma vez so no layout raiz — nao existe segundo Pixel.
   ══════════════════════════════════════════════════════════════════ */

import Script from "next/script";
import { PIXEL_ID } from "@/lib/meta-events";
import { PIXEL_SNIPPET, trackPageView } from "@/lib/meta-pixel";

/** Modulo (nao ref/estado): sobrevive ao duplo mount do StrictMode em dev,
 *  garantindo um unico PageView por carregamento de pagina. */
let pageViewSent = false;

export default function MetaPixel() {
  const handleReady = () => {
    if (pageViewSent) return;
    pageViewSent = true;
    trackPageView();
  };

  return (
    <>
      {/* Meta Pixel Code */}
      <Script id="meta-pixel" strategy="afterInteractive" onReady={handleReady}>
        {PIXEL_SNIPPET}
      </Script>
      <noscript>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          height="1"
          width="1"
          style={{ display: "none" }}
          alt=""
          src={`https://www.facebook.com/tr?id=${PIXEL_ID}&ev=PageView&noscript=1`}
        />
      </noscript>
      {/* End Meta Pixel Code */}
    </>
  );
}
