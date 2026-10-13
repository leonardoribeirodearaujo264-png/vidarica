"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { trackContact, trackViewContent } from "@/lib/meta-pixel";
import retratoTopo from "../../public/images/deyllane-hero.jpg";
import retratoMentora from "../../public/images/deyllane-mentora.jpg";

/* ═══════════════ CONSTANTES ═══════════════ */

const KIWIFY = "https://pay.kiwify.com.br/AOXrTIn";

const WA_LINK =
  "https://wa.me/5598985679867?text=Ol%C3%A1!%20Tenho%20interesse%20no%20Sinapse%20Empresarial";
const INSTA = "https://instagram.com/lacerdadeyllane";
const EMAIL = "dey.lacerda82@gmail.com";

const PRECO = "197";
/* Valor cheio usado como âncora. Só mantenha se este preço já foi
   praticado de verdade — anunciar desconto que nunca existiu é risco no CDC. */
const PRECO_CHEIO = "497";

const CTA = "Quero dominar minhas decisões";
const CTA_CURTO = "Quero dominar";

/* ═══════════════ ÍCONES ═══════════════ */

/* Traço único de 1.6, mesma grade de 24 — para não virar colcha de retalhos. */
const GLYPHS: Record<string, ReactNode> = {
  brain: (
    <>
      <path d="M12 5.5a2.6 2.6 0 0 0-5 .6A2.7 2.7 0 0 0 5.4 9 2.7 2.7 0 0 0 6 13.7 2.6 2.6 0 0 0 8.3 18a2.6 2.6 0 0 0 3.7-.6z" />
      <path d="M12 5.5a2.6 2.6 0 0 1 5 .6A2.7 2.7 0 0 1 18.6 9a2.7 2.7 0 0 1-.6 4.7A2.6 2.6 0 0 1 15.7 18a2.6 2.6 0 0 1-3.7-.6z" />
      <path d="M12 5.5v12.9" />
    </>
  ),
  scale: (
    <>
      <path d="M12 4v16M7 20h10" />
      <path d="M5 8h14M5 8l-2.6 5.4a3 3 0 0 0 5.2 0zM19 8l2.6 5.4a3 3 0 0 1-5.2 0z" />
    </>
  ),
  target: (
    <>
      <circle cx="12" cy="12" r="8" />
      <circle cx="12" cy="12" r="3.4" />
      <path d="M12 4v2.4M12 17.6V20M4 12h2.4M17.6 12H20" />
    </>
  ),
  handshake: (
    <>
      <path d="M8.5 11.5 11 14a1.6 1.6 0 0 0 2.3 0l3.4-3.4" />
      <path d="m3 10 3.2-3.2a2 2 0 0 1 1.4-.6h2.3L12 8l1.1-1.8h2.3a2 2 0 0 1 1.4.6L21 10" />
      <path d="M21 10v4.4a2 2 0 0 1-.6 1.4l-2.6 2.6a1.6 1.6 0 0 1-2.3 0l-1.3-1.3M3 10v4.4a2 2 0 0 0 .6 1.4l2.6 2.6a1.6 1.6 0 0 0 2.3 0l1.3-1.3" />
    </>
  ),
  trending: (
    <>
      <path d="M3.5 16.5 9 11l3.4 3.4L20.5 6.5" />
      <path d="M15.5 6.5h5v5" />
    </>
  ),
  shield: (
    <>
      <path d="M12 3.2 19 5.8V11c0 4.3-2.9 8.2-7 9.2-4.1-1-7-4.9-7-9.2V5.8z" />
      <path d="m8.9 12 2.2 2.2L15.3 10" />
    </>
  ),
  book: (
    <>
      <path d="M4.5 4.8h5.2a2.6 2.6 0 0 1 2.3 1.4 2.6 2.6 0 0 1 2.3-1.4h5.2v13h-5.2a2.6 2.6 0 0 0-2.3 1.4 2.6 2.6 0 0 0-2.3-1.4H4.5z" />
      <path d="M12 6.2v12" />
    </>
  ),
  layers: (
    <>
      <path d="m12 3.6 8.4 4.3-8.4 4.3-8.4-4.3z" />
      <path d="m3.6 12.4 8.4 4.3 8.4-4.3M3.6 16.6l8.4 4.3 8.4-4.3" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="8.2" />
      <path d="M12 7.4V12l3 1.8" />
    </>
  ),
  device: (
    <>
      <rect x="3" y="4.6" width="13" height="10.4" rx="1.8" />
      <path d="M3 18.6h10" />
      <rect x="17.4" y="10" width="3.8" height="9" rx="1.2" />
    </>
  ),
  eye: (
    <>
      <path d="M2.8 12S6.2 6.4 12 6.4 21.2 12 21.2 12 17.8 17.6 12 17.6 2.8 12 2.8 12z" />
      <circle cx="12" cy="12" r="2.8" />
    </>
  ),
  quote: (
    <>
      <path d="M9.6 6.2C6.6 7.6 5 10 5 13v4.8h5.4V12H7.9c0-1.9.8-3.3 2.6-4.2zM19 6.2c-3 1.4-4.6 3.8-4.6 6.8v4.8h5.4V12h-2.5c0-1.9.8-3.3 2.6-4.2z" />
    </>
  ),
  spark: (
    <>
      <path d="M12 3.4 13.7 9 19.2 10.7 13.7 12.4 12 18 10.3 12.4 4.8 10.7 10.3 9z" />
      <path d="M18.4 16.2 19 18l1.8.6-1.8.6-.6 1.8-.6-1.8-1.8-.6 1.8-.6z" />
    </>
  ),
};

function Icon({ name, className = "w-[22px] h-[22px]" }: { name: keyof typeof GLYPHS; className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      {GLYPHS[name]}
    </svg>
  );
}

function Arrow() {
  return (
    <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden>
      <path d="M5 12h13m0 0l-5-5m5 5l-5 5" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function Tick({ tone = "gold" }: { tone?: "gold" | "petrol" }) {
  return (
    <svg
      className={`w-[18px] h-[18px] shrink-0 mt-[3px] ${tone === "gold" ? "text-gold" : "text-petrol-soft"}`}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden
    >
      <path d="M4 12.5l5 5L20 6.5" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function InstagramGlyph() {
  return (
    <svg className="w-[17px] h-[17px] shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden>
      <rect x="3" y="3" width="18" height="18" rx="5" strokeWidth={1.6} />
      <circle cx="12" cy="12" r="4" strokeWidth={1.6} />
      <circle cx="17.2" cy="6.8" r="1.1" fill="currentColor" stroke="none" />
    </svg>
  );
}

/* ═══════════════ CAMPO NEURAL DE FUNDO ═══════════════ */

type Ponto = [number, number];

const NOS_ESQ: Ponto[] = [
  [70, 110], [206, 58], [332, 172], [176, 288], [54, 372],
  [292, 416], [418, 296], [148, 520], [328, 598], [66, 676],
  [248, 758], [424, 688],
];

const NOS_DIR: Ponto[] = [
  [782, 92], [918, 178], [1058, 102], [842, 302], [998, 382],
  [1142, 288], [792, 502], [946, 562], [1108, 478], [858, 698],
  [1018, 756], [1158, 660],
];

/** Liga cada nó aos dois vizinhos mais próximos, sem repetir aresta. */
function malha(nos: Ponto[]): [Ponto, Ponto][] {
  const arestas: [Ponto, Ponto][] = [];
  const vistas = new Set<string>();

  nos.forEach((a, i) => {
    nos
      .map((b, j) => ({ b, j, d: (a[0] - b[0]) ** 2 + (a[1] - b[1]) ** 2 }))
      .filter((x) => x.j !== i)
      .sort((x, y) => x.d - y.d)
      .slice(0, 2)
      .forEach(({ b, j }) => {
        const chave = i < j ? `${i}:${j}` : `${j}:${i}`;
        if (vistas.has(chave)) return;
        vistas.add(chave);
        arestas.push([a, b]);
      });
  });

  return arestas;
}

const MALHA_ESQ = malha(NOS_ESQ);
const MALHA_DIR = malha(NOS_DIR);

/** A malha em si — desenhada uma vez e reaproveitada nas duas orientações. */
function Malha() {
  return (
    <>
      <g className="drift-a" stroke="url(#nf-gold)" fill="#d8bd88" strokeWidth="0.7">
        {MALHA_ESQ.map(([a, b], i) => (
          <line key={`le-${i}`} x1={a[0]} y1={a[1]} x2={b[0]} y2={b[1]} opacity="0.5" />
        ))}
        {NOS_ESQ.map(([x, y], i) => (
          <circle key={`ne-${i}`} cx={x} cy={y} r={i % 3 === 0 ? 2.6 : 1.7} stroke="none" opacity="0.55" />
        ))}
      </g>

      <g className="drift-b" stroke="url(#nf-petrol)" fill="#5cb0c2" strokeWidth="0.7">
        {MALHA_DIR.map(([a, b], i) => (
          <line key={`ld-${i}`} x1={a[0]} y1={a[1]} x2={b[0]} y2={b[1]} opacity="0.5" />
        ))}
        {NOS_DIR.map(([x, y], i) => (
          <circle key={`nd-${i}`} cx={x} cy={y} r={i % 3 === 0 ? 2.6 : 1.7} stroke="none" opacity="0.55" />
        ))}
      </g>
    </>
  );
}

function CamposDeGradiente() {
  return (
    <defs>
      <linearGradient id="nf-gold" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#d8bd88" stopOpacity="0.5" />
        <stop offset="100%" stopColor="#d8bd88" stopOpacity="0.08" />
      </linearGradient>
      <linearGradient id="nf-petrol" x1="1" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#5cb0c2" stopOpacity="0.5" />
        <stop offset="100%" stopColor="#5cb0c2" stopOpacity="0.08" />
      </linearGradient>
    </defs>
  );
}

function NeuralField() {
  return (
    <div className="neural-field" aria-hidden>
      {/* Tela larga: a malha no sentido original, ouro à esquerda. */}
      <svg
        viewBox="0 0 1200 860"
        preserveAspectRatio="xMidYMid slice"
        className="hidden sm:block w-full h-full"
      >
        <CamposDeGradiente />
        <Malha />
      </svg>

      {/* Tela estreita: a mesma malha girada 90°, senão o recorte cairia
          bem no vão vazio entre os dois grupos. Em retrato o ouro fica
          em cima e o petróleo embaixo — a mesma divisão, de pé. */}
      <svg
        viewBox="0 0 860 1200"
        preserveAspectRatio="xMidYMid slice"
        className="sm:hidden w-full h-full"
      >
        <CamposDeGradiente />
        <g transform="translate(860,0) rotate(90)">
          <Malha />
        </g>
      </svg>
    </div>
  );
}

/** Onda que separa seções — o mesmo traço do campo neural, ampliado. */
function Wave({ id, flip = false }: { id: string; flip?: boolean }) {
  return (
    <div className={`relative h-[70px] md:h-[110px] overflow-hidden ${flip ? "rotate-180" : ""}`} aria-hidden>
      <svg viewBox="0 0 1440 120" preserveAspectRatio="none" className="w-full h-full">
        <defs>
          <linearGradient id={`wv-${id}`} x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#d8bd88" stopOpacity="0" />
            <stop offset="30%" stopColor="#d8bd88" stopOpacity="0.5" />
            <stop offset="68%" stopColor="#5cb0c2" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#5cb0c2" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path
          d="M0 74c180-46 320 34 480 30s280-64 460-52 320 62 500 26"
          fill="none"
          stroke={`url(#wv-${id})`}
          strokeWidth="1.2"
        />
        <path
          d="M0 92c180-46 320 34 480 30s280-64 460-52 320 62 500 26"
          fill="none"
          stroke={`url(#wv-${id})`}
          strokeWidth="0.7"
          opacity="0.5"
        />
      </svg>
    </div>
  );
}

/* ═══════════════ PRIMITIVOS ═══════════════ */

/** Revela no scroll. Sem IntersectionObserver, entrega o conteúdo visível. */
function Reveal({
  children,
  className = "",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (typeof IntersectionObserver === "undefined") {
      el.classList.add("is-in");
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            el.classList.add("is-in");
            io.disconnect();
          }
        }
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.05 },
    );

    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} data-reveal className={className} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  );
}

function BuyButton({ className = "", children }: { className?: string; children?: ReactNode }) {
  return (
    <a href={KIWIFY} target="_blank" rel="noopener noreferrer" className={`cta ${className}`}>
      {children ?? CTA} <Arrow />
    </a>
  );
}

/* ═══════════════ CABEÇALHO ═══════════════ */

const NAV = [
  { href: "#diagnostico", label: "O problema" },
  { href: "#metodo", label: "Método" },
  { href: "#conteudo", label: "Conteúdo" },
  { href: "#oferta", label: "Investimento" },
];

function Header() {
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Menu aberto: Esc fecha, o fundo não rola, o Tab fica preso no painel
     e o foco volta para o botão ao sair. */
  useEffect(() => {
    if (!open) return;

    const panel = panelRef.current;
    const toggle = toggleRef.current;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    panel?.querySelector<HTMLElement>("a, button")?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        return;
      }
      if (event.key !== "Tab" || !panel) return;

      const focusables = panel.querySelectorAll<HTMLElement>("a[href], button:not([disabled])");
      if (focusables.length === 0) return;

      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
      toggle?.focus();
    };
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        solid || open ? "bg-abyss/92 backdrop-blur-lg border-b border-white/[0.07]" : ""
      }`}
    >
      <div className="shell flex items-center gap-6 h-[68px]">
        <a
          href="#topo"
          className="flex items-center gap-2.5 shrink-0 min-h-[44px]"
          aria-label="Sinapse Empresarial — ir para o topo"
        >
          <Image
            src="/images/logo-sinapse-mark.png"
            alt=""
            width={560}
            height={400}
            className="h-8 w-auto"
            priority
          />
          <span className="hidden sm:block font-display text-[0.8rem] font-semibold tracking-[0.13em] uppercase text-ink">
            Sinapse Empresarial
          </span>
        </a>

        <nav aria-label="Seções da página" className="hidden lg:flex items-center gap-6 ml-auto">
          {NAV.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="inline-flex items-center min-h-[44px] px-1 text-[0.84rem] text-ink-muted hover:text-ink transition-colors duration-200"
            >
              {item.label}
            </a>
          ))}
          <a
            href={INSTA}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackContact("instagram_header")}
            aria-label="Instagram de Deyllane Lacerda"
            className="inline-flex items-center justify-center w-11 h-11 rounded-lg text-ink-muted hover:text-gold transition-colors duration-200"
          >
            <InstagramGlyph />
          </a>
        </nav>

        <a
          href={KIWIFY}
          target="_blank"
          rel="noopener noreferrer"
          className="cta ml-auto lg:ml-0 hidden sm:inline-flex min-h-[44px] px-5 text-[0.74rem]"
        >
          {CTA_CURTO}
        </a>

        <button
          ref={toggleRef}
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="menu-mobile"
          className="lg:hidden ml-auto sm:ml-0 grid place-items-center w-11 h-11 rounded-lg border border-white/10 text-ink hover:border-gold/40 transition-colors"
        >
          <span className="sr-only">{open ? "Fechar menu" : "Abrir menu"}</span>
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden>
            {open ? (
              <path d="M6 6l12 12M18 6L6 18" strokeWidth={1.8} strokeLinecap="round" />
            ) : (
              <path d="M4 7h16M4 12h16M4 17h16" strokeWidth={1.8} strokeLinecap="round" />
            )}
          </svg>
        </button>
      </div>

      {open && (
        <>
          <div
            aria-hidden="true"
            onClick={() => setOpen(false)}
            className="lg:hidden fixed inset-x-0 bottom-0 top-[68px] bg-abyss/80 backdrop-blur-sm"
          />
          <div
            id="menu-mobile"
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-label="Navegação"
            className="lg:hidden relative z-10 border-t border-white/[0.07] bg-abyss/98 backdrop-blur-xl rise"
          >
            <nav className="shell py-4 flex flex-col">
              {NAV.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="flex items-center min-h-[52px] border-b border-white/[0.05] text-ink-soft hover:text-gold transition-colors"
                >
                  {item.label}
                </a>
              ))}
              <a
                href={INSTA}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => {
                  setOpen(false);
                  trackContact("instagram_menu");
                }}
                className="flex items-center gap-2.5 min-h-[52px] border-b border-white/[0.05] text-ink-soft hover:text-gold transition-colors"
              >
                <InstagramGlyph />
                @lacerdadeyllane
              </a>
              <BuyButton className="mt-5 mb-2" />
            </nav>
          </div>
        </>
      )}
    </header>
  );
}

/* ═══════════════ TOPO ═══════════════ */

/* Em telas estreitas o selo quebra em duas linhas; a divisão fica aqui. */
const SELOS: [string, string][] = [
  ["12 meses", "de acesso"],
  ["7 dias", "de garantia"],
  ["Acesso", "imediato"],
];

/** Preço com os centavos menores, como em vitrine. O `em` do sufixo é
 *  relativo ao tamanho do número, então acompanha qualquer escala. */
function Preco({ tamanho }: { tamanho: string }) {
  return (
    <span className={`display gilt inline-flex items-start leading-none ${tamanho}`}>
      {PRECO}
      <span className="text-[0.38em] leading-none mt-[0.3em] ml-[0.04em]">,00</span>
    </span>
  );
}

/** Valor cheio riscado, com os centavos um pouco menores. */
function PrecoCheio({ className = "" }: { className?: string }) {
  return (
    <p className={`text-ink-muted line-through ${className}`}>
      R$ {PRECO_CHEIO}
      <span className="text-[0.82em]">,00</span>
    </p>
  );
}

function Hero() {
  return (
    <section id="topo" className="relative overflow-hidden pt-[112px] pb-16 md:pt-[144px] md:pb-24">
      <div className="aura w-[640px] h-[640px] -top-[280px] -left-[180px]" />
      <div className="aura aura-petrol w-[560px] h-[560px] top-[80px] -right-[220px]" />

      <div className="shell grid lg:grid-cols-[1.16fr_0.84fr] gap-12 lg:gap-16 items-center">
        <div>
          <p className="eyebrow rise" style={{ animationDelay: "80ms" }}>
            Neurociência aplicada a negócios
          </p>

          <h1 className="display display-hero mt-6 rise" style={{ animationDelay: "170ms" }}>
            Você não decide.
            <br />
            <span className="gilt">
              Seu cérebro
              <br />
              já decidiu.
            </span>
          </h1>

          <p className="lead mt-6 max-w-[520px] rise" style={{ animationDelay: "280ms" }}>
            Com o seu cliente é igual. O Sinapse Empresarial treina os dois lados da mesma
            sinapse: a decisão que você toma com dinheiro e a decisão que ele toma na hora de
            comprar.
          </p>

          <div className="mt-9 flex flex-wrap items-end gap-x-10 gap-y-6 rise" style={{ animationDelay: "390ms" }}>
            <div>
              <p className="meta">Acesso completo</p>
              <PrecoCheio className="text-sm mt-2" />
              <div className="flex items-baseline gap-2.5 mt-0.5">
                <span className="font-display text-gold text-xl font-semibold leading-none">R$</span>
                <Preco tamanho="text-[3rem]" />
              </div>
              <p className="meta mt-2.5">Pagamento único · Sem mensalidades</p>
            </div>

            <BuyButton className="max-w-[320px]" />
          </div>

          <ul
            className="mt-8 grid grid-cols-3 gap-2 sm:flex sm:flex-wrap sm:gap-x-7 sm:gap-y-2 rise"
            style={{ animationDelay: "480ms" }}
          >
            {SELOS.map(([primeira, segunda]) => (
              <li
                key={primeira}
                className="meta flex flex-col items-center gap-1 text-center text-[0.6rem] tracking-[0.08em] sm:flex-row sm:gap-2 sm:text-left sm:text-[0.72rem] sm:tracking-[0.14em]"
              >
                <Icon name="shield" className="w-[14px] h-[14px] shrink-0 text-gold" />
                <span>
                  {primeira} <span className="block sm:inline">{segunda}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>

        <figure className="relative rise mx-auto w-full max-w-[400px]" style={{ animationDelay: "320ms" }}>
          <div className="relative overflow-hidden rounded-[18px] border border-gold/22">
            <Image
              src={retratoTopo}
              alt="Deyllane Lacerda em atendimento, com celular e tablet nas mãos"
              priority
              placeholder="blur"
              sizes="(max-width: 1024px) 88vw, 400px"
              className="w-full h-auto"
            />
            <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-abyss to-transparent" />
          </div>
          <figcaption className="absolute left-5 right-5 bottom-5">
            <Image
              src="/images/logo-deyllane.png"
              alt="Deyllane Lacerda — Estrategista de Negócios"
              width={1000}
              height={426}
              className="w-[180px] h-auto"
            />
          </figcaption>
        </figure>
      </div>
    </section>
  );
}

/* ═══════════════ DIAGNÓSTICO ═══════════════ */

const SINTOMAS = [
  {
    i: "scale" as const,
    t: "O faturamento sobe, o aperto continua",
    d: "Entra mais dinheiro do que ano passado e a sensação no fim do mês é exatamente a mesma.",
  },
  {
    i: "handshake" as const,
    t: "Você desconta antes de pedirem",
    d: "O preço sai da sua boca já menor. A negociação termina antes mesmo de começar.",
  },
  {
    i: "target" as const,
    t: "A meta está no papel há seis meses",
    d: "Você sabe qual é o próximo passo. Ele simplesmente não acontece.",
  },
];

function Diagnosis() {
  return (
    <section id="diagnostico" className="band">
      <div className="shell">
        <Reveal>
          <p className="eyebrow">O diagnóstico</p>
          <h2 className="display display-section mt-5 max-w-[620px]">
            Você já sabe o que fazer.
            <br />
            E mesmo assim não faz.
          </h2>
          <p className="lead mt-6 max-w-[600px]">
            Falta de informação parou de ser o seu problema há muito tempo. O que trava um
            empreendedor que já fatura não é o que ele ignora — é o que o cérebro dele faz com a
            informação quando há dinheiro e risco na mesa.
          </p>
        </Reveal>

        <div className="grid md:grid-cols-3 gap-4 mt-12">
          {SINTOMAS.map((s, i) => (
            <Reveal key={s.t} delay={100 + i * 80}>
              <article className="panel panel-lift h-full p-7">
                <div className="glyph">
                  <Icon name={s.i} />
                </div>
                <h3 className="display-sm mt-5">{s.t}</h3>
                <p className="mt-3 text-[0.94rem] leading-relaxed text-ink-muted">{s.d}</p>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal delay={360}>
          <p className="lead mt-12 max-w-[640px] text-ink">
            Nada disso é indisciplina. É a forma como o seu cérebro decide sob incerteza — e ela
            é treinável.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

/* ═══════════════ O MECANISMO ═══════════════ */

function SynapseDiagram() {
  return (
    <svg
      viewBox="0 0 900 340"
      className="w-full h-auto scale-[1.24] sm:scale-100 origin-center"
      role="img"
      aria-label="Diagrama: as suas decisões e as decisões do cliente ligadas por uma mesma sinapse"
    >
      <defs>
        <linearGradient id="ax-gold" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#a2803b" />
          <stop offset="100%" stopColor="#f2e3be" />
        </linearGradient>
        <linearGradient id="ax-petrol" x1="1" y1="0" x2="0" y2="0">
          <stop offset="0%" stopColor="#14657a" />
          <stop offset="100%" stopColor="#bfe9f2" />
        </linearGradient>
        <radialGradient id="core">
          <stop offset="0%" stopColor="#fff8e7" />
          <stop offset="45%" stopColor="#d8bd88" />
          <stop offset="100%" stopColor="#5cb0c2" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* dendritos — o seu lado, em dourado */}
      <g stroke="url(#ax-gold)" fill="none" strokeWidth="1.7" opacity="0.82" strokeLinecap="round">
        <path d="M110 92 C170 112 240 122 300 170" />
        <path d="M92 182 C160 178 240 173 300 170" />
        <path d="M138 266 C192 242 252 206 300 170" />
        <path d="M216 128 C250 142 276 155 300 170" />
        <path d="M198 236 C240 212 272 190 300 170" />
      </g>

      {/* dendritos — o lado do cliente, em petróleo */}
      <g stroke="url(#ax-petrol)" fill="none" strokeWidth="1.7" opacity="0.82" strokeLinecap="round">
        <path d="M790 92 C730 112 660 122 600 170" />
        <path d="M808 182 C740 178 660 173 600 170" />
        <path d="M762 266 C708 242 648 206 600 170" />
        <path d="M684 128 C650 142 624 155 600 170" />
        <path d="M702 236 C660 212 628 190 600 170" />
      </g>

      {/* axônio: o caminho até a fenda e depois dela */}
      <path d="M300 170 H392" stroke="url(#ax-gold)" strokeWidth="2.2" fill="none" opacity="0.8" />
      <path d="M508 170 H600" stroke="url(#ax-petrol)" strokeWidth="2.2" fill="none" opacity="0.8" />
      <path
        className="impulse"
        d="M300 170 H600"
        stroke="#fff8e7"
        strokeWidth="4"
        strokeLinecap="round"
        fill="none"
      />

      {/* a fenda sináptica — o intervalo onde a decisão acontece */}
      <circle cx="450" cy="170" r="62" fill="url(#core)" opacity="0.6" />
      <circle cx="418" cy="170" r="2.4" fill="#f2e3be" opacity="0.85" />
      <circle cx="450" cy="157" r="2.8" fill="#f2e3be" opacity="0.95" />
      <circle cx="450" cy="184" r="2.2" fill="#bfe9f2" opacity="0.75" />
      <circle cx="482" cy="170" r="2.4" fill="#bfe9f2" opacity="0.85" />

      {/* nós terminais */}
      <g fill="#d8bd88">
        <circle cx="110" cy="92" r="5" />
        <circle cx="92" cy="182" r="5" />
        <circle cx="138" cy="266" r="5" />
        <circle cx="216" cy="128" r="4" />
        <circle cx="198" cy="236" r="4" />
      </g>
      <g fill="#5cb0c2">
        <circle cx="790" cy="92" r="5" />
        <circle cx="808" cy="182" r="5" />
        <circle cx="762" cy="266" r="5" />
        <circle cx="684" cy="128" r="4" />
        <circle cx="702" cy="236" r="4" />
      </g>

      {/* hubs */}
      <circle cx="300" cy="170" r="9" fill="#0e2247" stroke="#d8bd88" strokeWidth="2.4" />
      <circle cx="600" cy="170" r="9" fill="#0e2247" stroke="#5cb0c2" strokeWidth="2.4" />
      <circle className="node-live" cx="450" cy="170" r="5" fill="#fff8e7" />
    </svg>
  );
}

function Mechanism() {
  return (
    <section className="band relative overflow-hidden">
      <div className="shell">
        <Reveal className="text-center">
          <p className="eyebrow">O mecanismo</p>
          <h2 className="display display-section mt-5 mx-auto max-w-[620px]">
            Duas decisões.
            <br />
            <span className="gilt">Um mecanismo.</span>
          </h2>
          <p className="lead mt-6 mx-auto max-w-[620px]">
            Decidir sobre o próprio dinheiro e fazer alguém decidir comprar são o mesmo evento
            visto de dois lados: um cérebro escolhendo sob incerteza. É por isso que finanças
            comportamentais e neurovendas não são dois assuntos — são um só.
          </p>
        </Reveal>

        <Reveal delay={140} className="mt-12 md:mt-14">
          <SynapseDiagram />
        </Reveal>

        <div className="grid sm:grid-cols-2 gap-5 mt-12">
          <Reveal delay={200}>
            <div className="panel panel-lift p-7 h-full">
              <div className="glyph">
                <Icon name="brain" />
              </div>
              <p className="eyebrow mt-5">Lado de cá</p>
              <h3 className="display-sm mt-3">A sua decisão</h3>
              <p className="mt-3 text-[0.94rem] leading-relaxed text-ink-muted">
                Finanças comportamentais: os vieses que aparecem quando o caixa aperta, o padrão
                que recria a dívida depois de quitada, a meta que evapora em três semanas.
              </p>
            </div>
          </Reveal>

          <Reveal delay={280}>
            <div className="panel panel-petrol panel-lift p-7 h-full">
              <div className="glyph glyph-petrol">
                <Icon name="eye" />
              </div>
              <p className="eyebrow eyebrow-petrol mt-5">Lado de lá</p>
              <h3 className="display-sm mt-3">A decisão dele</h3>
              <p className="mt-3 text-[0.94rem] leading-relaxed text-ink-muted">
                Neurovendas e negociação: como a confiança se forma em segundos, por que a
                objeção é pedido de segurança, e onde o preço é ancorado antes de ser dito.
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════ DEPOIMENTOS ═══════════════ */

/* Mensagens recebidas por WhatsApp. Texto mantido como veio, só com as
   abreviações abertas — números e afirmações intocados. */
const DEPOIMENTOS = [
  {
    texto:
      "Deyllane, vim te dizer que eu comecei a aplicar o que você ensina no Sinapse Empresarial e meu faturamento aumentou mais de R$ 10 mil! Eu vendia, mas não tinha estratégia e também não sabia organizar direito o dinheiro que entrava. Agora, depois de aplicar, as coisas estão bem melhores — e é porque eu tive um período difícil, viu. Valeu o investimento, obrigada.",
    tom: "gold" as const,
  },
  {
    texto:
      "Mulher, você não tem noção do quanto você me salvou. As dívidas da minha empresa estavam em quase R$ 70 mil e agora já caiu para R$ 34 mil! Ainda não terminei, mas do que estava para o que tá agora está bem demais, e tô aplicando as estratégias para alcançar mais clientes também. Volto pra te contar como tá.",
    tom: "petrol" as const,
  },
];

function Depoimentos() {
  return (
    <section className="band">
      <div className="shell">
        <Reveal>
          <p className="eyebrow">Quem já aplicou</p>
          <h2 className="display display-section mt-5 max-w-[620px]">
            Mensagens de quem <span className="gilt">fez o método</span>
          </h2>
        </Reveal>

        <div className="grid lg:grid-cols-2 gap-4 mt-12">
          {DEPOIMENTOS.map((d, i) => (
            <Reveal key={i} delay={i * 90}>
              <figure
                className={`panel panel-lift h-full p-7 sm:p-8 flex flex-col ${
                  d.tom === "petrol" ? "panel-petrol" : ""
                }`}
              >
                <div className={`glyph ${d.tom === "petrol" ? "glyph-petrol" : ""}`}>
                  <Icon name="quote" />
                </div>
                <blockquote className="mt-6 text-[1rem] leading-relaxed text-ink-soft">
                  {d.texto}
                </blockquote>
                <figcaption className="meta mt-6 pt-5 border-t border-white/[0.07]">
                  Aluna do Sinapse Empresarial
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>

        <Reveal delay={240}>
          <p className="meta mt-8 normal-case tracking-normal max-w-[640px] leading-relaxed">
            Mensagens reais recebidas por WhatsApp. Os resultados são individuais e dependem da
            aplicação de cada pessoa — nada aqui é promessa de faturamento.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

/* ═══════════════ MÉTODO ═══════════════ */

const PROGRAMA = [
  {
    lado: "A sua decisão",
    tom: "gold" as const,
    itens: [
      {
        i: "brain" as const,
        t: "Entendendo a autossabotagem financeira",
        d: "Por que você repete escolhas que já sabe que não funcionam — e onde o padrão começa.",
      },
      {
        i: "eye" as const,
        t: "Funcionamento da mente e tomada de decisões",
        d: "Gastos irracionais, gatilhos mentais e feridas emocionais por trás de cada decisão de dinheiro.",
      },
      {
        i: "scale" as const,
        t: "Saindo do ciclo de dívidas pessoais e empresariais",
        d: "O que recria a dívida mesmo depois de quitada, e como quebrar o ciclo em vez de só pagar.",
      },
      {
        i: "target" as const,
        t: "Conquistando metas dentro e fora do negócio",
        d: "Metas num formato que o cérebro aceita, para não evaporarem em três semanas.",
      },
    ],
  },
  {
    lado: "A decisão dele",
    tom: "petrol" as const,
    itens: [
      {
        i: "trending" as const,
        t: "Fazendo dinheiro com neurovendas",
        d: "Como a confiança se forma em segundos e o que leva o cliente a decidir comprar.",
      },
      {
        i: "handshake" as const,
        t: "Aprendendo a negociar",
        d: "Conduzir a conversa sem empurrar: toda objeção é um pedido de segurança.",
      },
      {
        i: "layers" as const,
        t: "Preço e posicionamento",
        d: "Ancorar valor para parar de descontar antes mesmo de pedirem desconto.",
      },
    ],
  },
];

function Method() {
  return (
    <section id="metodo" className="band">
      <div className="shell">
        <Reveal>
          <p className="eyebrow">O programa</p>
          <h2 className="display display-section mt-5 max-w-[620px]">
            O que você vai ver no <span className="gilt">Sinapse</span>
          </h2>
          <p className="lead mt-6 max-w-[580px]">
            Sete módulos mais um bônus, organizados na ordem em que um sustenta o outro: primeiro
            a sua forma de decidir, depois a do seu cliente.
          </p>
        </Reveal>

        <div className="grid lg:grid-cols-2 gap-x-10 gap-y-10 mt-12">
          {PROGRAMA.map((coluna, ci) => (
            <div key={coluna.lado}>
              <Reveal delay={ci * 80}>
                <p className={`eyebrow ${coluna.tom === "petrol" ? "eyebrow-petrol" : ""}`}>
                  {coluna.lado}
                </p>
              </Reveal>

              <div className="grid gap-3 mt-5">
                {coluna.itens.map((item, i) => (
                  <Reveal key={item.t} delay={ci * 80 + i * 70}>
                    <article
                      className={`panel panel-lift h-full p-6 flex gap-5 ${
                        coluna.tom === "petrol" ? "panel-petrol" : ""
                      }`}
                    >
                      <div className={`glyph ${coluna.tom === "petrol" ? "glyph-petrol" : ""}`}>
                        <Icon name={item.i} />
                      </div>
                      <div>
                        <h3 className="display-sm">{item.t}</h3>
                        <p className="mt-2.5 text-[0.92rem] leading-relaxed text-ink-muted">{item.d}</p>
                      </div>
                    </article>
                  </Reveal>
                ))}
              </div>
            </div>
          ))}
        </div>

        <Reveal delay={320}>
          <article className="panel panel-lift mt-6 p-7 flex flex-col sm:flex-row gap-5 sm:items-center">
            <div className="glyph">
              <Icon name="spark" />
            </div>
            <div>
              <p className="eyebrow">Bônus do treinamento</p>
              <h3 className="display-sm mt-2.5">Reprogramação mental para aumentar confiança</h3>
            </div>
          </article>
        </Reveal>
      </div>
    </section>
  );
}

/* ═══════════════ CONTEÚDO RECEBIDO ═══════════════ */

const ENTREGA = [
  {
    i: "device" as const,
    t: "Aulas online curtas",
    d: "No seu ritmo, de qualquer dispositivo. Feitas para caber entre compromissos: assistir hoje, aplicar esta semana.",
  },
  {
    i: "layers" as const,
    t: "Sete módulos em sequência",
    d: "Do comportamento com dinheiro até preço e posicionamento, na ordem em que um sustenta o outro.",
  },
  {
    i: "book" as const,
    t: "Quatro e-books de bônus",
    d: "Negociação online, leitura corporal, confiança instantânea e mentalidade financeira.",
  },
  {
    i: "clock" as const,
    t: "Doze meses de acesso",
    d: "Para voltar quantas vezes precisar, incluindo o material de apoio e os bônus.",
  },
];

function Deliverables() {
  return (
    <section id="conteudo" className="band">
      <div className="shell">
        <Reveal>
          <p className="eyebrow">O que chega na sua mão</p>
          <h2 className="display display-section mt-5 max-w-[560px]">
            Tudo o que <span className="gilt">você recebe</span>
          </h2>
        </Reveal>

        <div className="grid md:grid-cols-2 gap-4 mt-12">
          {ENTREGA.map((e, i) => (
            <Reveal key={e.t} delay={i * 70}>
              <article className="panel panel-lift h-full p-7 flex gap-5">
                <div className="glyph">
                  <Icon name={e.i} />
                </div>
                <div>
                  <h3 className="display-sm">{e.t}</h3>
                  <p className="mt-2.5 text-[0.94rem] leading-relaxed text-ink-muted">{e.d}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════ BÔNUS ═══════════════ */

const BONUS = [
  {
    i: "handshake" as const,
    t: "Negociação online",
    d: "O que muda quando a negociação acontece por mensagem, sem tom de voz e sem olho no olho.",
  },
  {
    i: "eye" as const,
    t: "Leitura corporal",
    d: "O que o corpo entrega antes da fala — e como usar isso para saber a hora de avançar ou recuar.",
  },
  {
    i: "spark" as const,
    t: "Confiança instantânea",
    d: "Atalhos para encurtar o tempo entre a dúvida do cliente e a decisão dele.",
  },
  {
    i: "brain" as const,
    t: "Mentalidade financeira",
    d: "E-books autorais sobre a relação com dinheiro que você herdou e nunca parou para questionar.",
  },
];

function Bonus() {
  return (
    <section className="band">
      <div className="shell">
        <Reveal>
          <p className="eyebrow eyebrow-petrol">Incluído sem custo extra</p>
          <h2 className="display display-section mt-5 max-w-[560px]">
            Quatro materiais de <span className="teal">consulta rápida</span>
          </h2>
          <p className="lead mt-6 max-w-[580px]">
            Feitos para abrir cinco minutos antes de uma reunião, não para ler no fim de semana.
          </p>
        </Reveal>

        <div className="grid sm:grid-cols-2 gap-4 mt-12">
          {BONUS.map((b, i) => (
            <Reveal key={b.t} delay={i * 70}>
              <article className="panel panel-petrol panel-lift h-full p-7 flex gap-5">
                <div className="glyph glyph-petrol">
                  <Icon name={b.i} />
                </div>
                <div>
                  <h3 className="display-sm">{b.t}</h3>
                  <p className="mt-2.5 text-[0.94rem] leading-relaxed text-ink-muted">{b.d}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════ QUEM CONDUZ ═══════════════ */

function Mentor() {
  return (
    <section className="band">
      <div className="shell grid lg:grid-cols-[0.78fr_1.22fr] gap-10 lg:gap-16 items-center">
        <Reveal>
          <figure className="relative max-w-[350px] mx-auto lg:mx-0">
            <div className="relative overflow-hidden rounded-[16px] border border-gold/22">
              <Image
                src={retratoMentora}
                alt="Retrato de Deyllane Lacerda"
                placeholder="blur"
                sizes="(max-width: 1024px) 78vw, 350px"
                className="w-full h-auto"
              />
              <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-abyss to-transparent" />
            </div>
            <figcaption className="absolute left-5 right-5 bottom-5">
              <Image
                src="/images/logo-deyllane.png"
                alt="Deyllane Lacerda — Estrategista de Negócios"
                width={1000}
                height={426}
                className="w-[170px] h-auto"
              />
            </figcaption>
          </figure>
        </Reveal>

        <div>
          <Reveal delay={80}>
            <p className="eyebrow">Quem conduz</p>
            <h2 className="display display-section mt-5">Deyllane Lacerda</h2>
            <p className="meta mt-3">Estrategista de negócios</p>
          </Reveal>

          <Reveal delay={140}>
            <p className="lead mt-7 max-w-[560px]">
              Trabalho a mente do empreendedor porque é lá que a decisão acontece — a sua e a do
              seu cliente. Junto finanças comportamentais, neurociência e negociação num método
              que existe para gerar movimento, não para render um certificado.
            </p>
            <p className="lead mt-5 max-w-[560px]">
              Se você está aqui procurando motivação, existem lugares mais baratos. Se está
              procurando entender por que decide como decide, você está no lugar certo.
            </p>
          </Reveal>

          <Reveal delay={200}>
            <a
              href={INSTA}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackContact("instagram_mentora")}
              className="cta-ghost mt-7"
            >
              <InstagramGlyph />
              @lacerdadeyllane
              <Arrow />
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════ INVESTIMENTO ═══════════════ */

const INCLUSO = [
  "Método Sinapse Empresarial completo — os sete módulos mais o bônus",
  "Aulas online curtas, para assistir e aplicar na mesma semana",
  "E-books de negociação online, leitura corporal e confiança instantânea",
  "E-books autorais de mentalidade financeira",
  "Acesso por 12 meses, de qualquer dispositivo",
];

function Offer() {
  const sent = useRef(false);

  useEffect(() => {
    const check = () => {
      if (sent.current) return;
      const el = document.getElementById("oferta");
      if (!el) return;
      const r = el.getBoundingClientRect();
      if (r.top < window.innerHeight * 0.75 && r.bottom > 0) {
        sent.current = true;
        trackViewContent();
        window.removeEventListener("scroll", check);
      }
    };
    window.addEventListener("scroll", check, { passive: true });
    check();
    return () => window.removeEventListener("scroll", check);
  }, []);

  return (
    <section id="oferta" className="band relative overflow-hidden">
      <div className="aura w-[760px] h-[760px] left-1/2 -translate-x-1/2 top-[6%]" />
      <div className="aura aura-petrol w-[520px] h-[520px] -left-[180px] top-[40%]" />

      <div className="shell-narrow">
        <Reveal className="text-center">
          <p className="eyebrow">Investimento</p>
          <h2 className="display display-section mt-5">
            Acesso completo ao <span className="gilt">Método Sinapse Empresarial</span>
          </h2>
          <p className="lead mt-6 mx-auto max-w-[560px]">
            12 meses para aprender, aplicar e transformar suas decisões.
          </p>
        </Reveal>

        <Reveal delay={100}>
          <div className="panel mt-11 p-7 sm:p-11">
            <Image
              src="/images/logo-sinapse-wordmark.png"
              alt="Sinapse Empresarial"
              width={1000}
              height={400}
              className="w-[250px] h-auto mx-auto"
            />

            <ul className="mt-10 space-y-4">
              {INCLUSO.map((item) => (
                <li key={item} className="flex gap-3.5 text-[0.94rem] leading-relaxed text-ink-soft">
                  <Tick />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <div className="mt-10 pt-9 border-t border-white/[0.08] text-center">
              <PrecoCheio className="text-sm" />
              <div className="flex items-baseline justify-center gap-3 mt-2">
                <span className="font-display text-gold text-2xl font-semibold leading-none">R$</span>
                <Preco tamanho="text-[4rem]" />
              </div>
              <p className="display-sm mt-4">Pagamento único — sem mensalidades</p>

              <BuyButton className="cta-wide mt-8" />

              <p className="meta mt-6">Compra segura · Acesso imediato</p>
              <p className="meta mt-2 text-gold">Garantia de 7 dias (art. 49 do CDC)</p>
            </div>
          </div>
        </Reveal>

        <Reveal delay={180}>
          <div className="panel-petrol panel mt-4 p-8 flex flex-col sm:flex-row items-center gap-6 text-center sm:text-left">
            <div className="glyph glyph-petrol w-[64px] h-[64px] rounded-full">
              <Icon name="shield" className="w-7 h-7" />
            </div>
            <div>
              <p className="display-sm teal">O risco é meu</p>
              <p className="mt-2.5 text-[0.94rem] leading-relaxed text-ink-soft">
                Entre, assista, aplique. Se concluir que não é para você, peça o reembolso em até
                7 dias e recebe o valor integral de volta — sem precisar justificar.
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ═══════════════ PERGUNTAS ═══════════════ */

const FAQ = [
  {
    q: "Isso é um curso de finanças ou de vendas?",
    a: "De decisão. Metade trata das suas escolhas com dinheiro; metade, das escolhas de compra do seu cliente. O mecanismo é o mesmo nos dois lados.",
  },
  {
    q: "Serve para quem está endividado?",
    a: "Serve, mas sair da dívida aqui é consequência, não objetivo. Se o seu único problema hoje é renegociar parcelas, existe conteúdo gratuito mais direto para isso.",
  },
  {
    q: "Preciso saber alguma coisa de neurociência?",
    a: "Não. A neurociência sustenta o método, não o vocabulário das aulas. Você recebe o mecanismo e o que fazer com ele.",
  },
  {
    q: "Tenho pouco tempo. Como funciona na prática?",
    a: "Aulas curtas, no seu ritmo, de qualquer dispositivo. Feitas para caber entre compromissos: assistir hoje, aplicar esta semana.",
  },
  {
    q: "Por quanto tempo fica disponível?",
    a: "Doze meses a partir da compra, e-books incluídos.",
  },
  {
    q: "E se não for para mim?",
    a: "Sete dias de garantia. Pede o reembolso e recebe tudo de volta, sem justificar.",
  },
];

function FaqItem({ q, a, id }: { q: string; a: string; id: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-white/[0.08]">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        aria-controls={id}
        className="w-full flex items-start justify-between gap-6 py-6 min-h-[64px] text-left cursor-pointer group"
      >
        <span className="display-sm normal-case font-medium text-[1rem] group-hover:text-gold transition-colors duration-200">
          {q}
        </span>
        <span
          className={`shrink-0 mt-1 text-gold transition-transform duration-300 ${open ? "rotate-45" : ""}`}
          aria-hidden
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path d="M12 5v14M5 12h14" strokeWidth={1.6} strokeLinecap="round" />
          </svg>
        </span>
      </button>

      <div
        id={id}
        role="region"
        className="grid transition-[grid-template-rows] duration-300 ease-out"
        style={{ gridTemplateRows: open ? "1fr" : "0fr" }}
      >
        <div className="overflow-hidden">
          <p className="pb-6 pr-10 text-[0.94rem] leading-relaxed text-ink-muted">{a}</p>
        </div>
      </div>
    </div>
  );
}

function Faq() {
  return (
    <section className="band">
      <div className="shell-narrow">
        <Reveal>
          <p className="eyebrow">Perguntas</p>
          <h2 className="display display-section mt-5">Antes que você pergunte</h2>
        </Reveal>

        <div className="mt-10">
          {FAQ.map((item, i) => (
            <Reveal key={item.q} delay={i * 50}>
              <FaqItem q={item.q} a={item.a} id={`faq-${i}`} />
            </Reveal>
          ))}
        </div>

        <Reveal delay={300}>
          <div className="mt-10 text-center">
            <a
              href={WA_LINK}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackContact("whatsapp_faq")}
              className="cta-ghost"
            >
              Ficou outra dúvida? Fale comigo no WhatsApp <Arrow />
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ═══════════════ COMPRA FINAL ═══════════════ */

function FinalPurchase() {
  return (
    <section className="band relative overflow-hidden">
      <div className="aura w-[620px] h-[620px] left-1/2 -translate-x-1/2 -top-[120px]" />

      <div className="shell-narrow text-center">
        <Reveal>
          <Image
            src="/images/logo-sinapse-mark.png"
            alt=""
            width={560}
            height={400}
            className="h-12 w-auto mx-auto opacity-90"
          />
          <h2 className="display display-section mt-8">
            Daqui a um ano você decide
            <br />
            <span className="gilt">do mesmo jeito?</span>
          </h2>
          <p className="lead mt-6 mx-auto max-w-[560px]">
            Seu faturamento pode crescer sem que nada mude na forma como você decide. É assim que
            um negócio maior vira só um problema maior. O método existe para quebrar esse ciclo —
            e começa com uma decisão sua, agora.
          </p>
        </Reveal>

        <Reveal delay={120}>
          <div className="panel mt-10 p-7 sm:p-9 max-w-[520px] mx-auto">
            <p className="display-sm">Acesso completo ao método</p>
            <div className="flex items-baseline justify-center gap-2.5 mt-4">
              <span className="font-display text-gold text-xl font-semibold leading-none">R$</span>
              <Preco tamanho="text-[3.2rem]" />
            </div>
            <p className="meta mt-3">Pagamento único · 12 meses de acesso</p>
            <BuyButton className="cta-wide mt-7" />
            <p className="meta mt-5 text-gold">Garantia de 7 dias</p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ═══════════════ RODAPÉ ═══════════════ */

function Footer() {
  return (
    <footer className="relative pt-14 pb-16">
      <div className="shell text-center">
        <Image
          src="/images/logo-sinapse-wordmark.png"
          alt="Sinapse Empresarial"
          width={1000}
          height={400}
          className="w-[230px] h-auto mx-auto opacity-80"
        />
        <p className="meta mt-4">O método que conecta comportamento, dinheiro e vendas</p>

        <div className="flex flex-wrap justify-center gap-x-7 gap-y-1 mt-8 text-[0.85rem] text-ink-muted">
          <a
            href={INSTA}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackContact("instagram_rodape")}
            className="inline-flex items-center gap-2 min-h-[44px] px-1 hover:text-gold transition-colors"
          >
            <InstagramGlyph />
            @lacerdadeyllane
          </a>
          <a
            href={WA_LINK}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackContact("whatsapp_rodape")}
            className="inline-flex items-center min-h-[44px] px-1 hover:text-gold transition-colors"
          >
            (98) 98567-9867
          </a>
          <a
            href={`mailto:${EMAIL}`}
            onClick={() => trackContact("email_rodape")}
            className="inline-flex items-center min-h-[44px] px-1 hover:text-gold transition-colors"
          >
            {EMAIL}
          </a>
        </div>

        <p className="meta mt-8 normal-case tracking-normal max-w-[620px] mx-auto leading-relaxed">
          Conteúdo educacional. Não é consultoria de investimentos e não promete retorno
          financeiro — o resultado depende da aplicação de cada pessoa.
        </p>

        <p className="meta mt-6">
          © {new Date().getFullYear()} Deyllane Lacerda · Todos os direitos reservados
        </p>
      </div>
    </footer>
  );
}

/* ═══════════════ WHATSAPP FLUTUANTE ═══════════════ */

function WhatsAppFab() {
  return (
    <a
      href={WA_LINK}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => trackContact("whatsapp_flutuante")}
      aria-label="Falar com Deyllane no WhatsApp"
      className="wa-fab"
    >
      <svg className="w-7 h-7" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
        <path d="M17.5 14.4c-.3-.2-1.8-.9-2-1-.3-.1-.5-.2-.7.2s-.8 1-.9 1.2c-.2.2-.3.2-.6.1-.3-.2-1.3-.5-2.4-1.5-.9-.8-1.5-1.8-1.7-2.1-.2-.3 0-.5.1-.6l.5-.5c.1-.2.2-.3.3-.5.1-.2 0-.4 0-.5 0-.2-.7-1.6-.9-2.2-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.5s1.1 2.9 1.2 3.1c.2.2 2.1 3.2 5.1 4.5.7.3 1.3.5 1.7.6.7.2 1.4.2 1.9.1.6-.1 1.8-.7 2-1.4.2-.7.2-1.3.2-1.4-.1-.1-.3-.2-.6-.3M12 21.8h-.1c-1.8 0-3.5-.5-5-1.4l-.4-.2-3.7 1 1-3.7-.2-.4A9.9 9.9 0 0 1 2.1 12C2.1 6.5 6.6 2.1 12 2.1c2.7 0 5.2 1 7 2.9a9.8 9.8 0 0 1 2.9 7c0 5.4-4.4 9.8-9.9 9.8M20.5 3.5A11.8 11.8 0 0 0 12 0C5.5 0 .2 5.3.2 11.9c0 2.1.5 4.1 1.6 5.9L0 24l6.3-1.7c1.7 1 3.7 1.4 5.7 1.4 6.5 0 11.9-5.3 11.9-11.9 0-3.2-1.2-6.2-3.4-8.4" />
      </svg>
    </a>
  );
}

/* ═══════════════ PÁGINA ═══════════════ */

export default function Home() {
  return (
    <>
      <a href="#conteudo-principal" className="skip-link">
        Pular para o conteúdo
      </a>
      <NeuralField />
      <Header />
      <main id="conteudo-principal" className="relative z-[1]">
        <Hero />
        <Diagnosis />
        <Wave id="um" />
        <Mechanism />
        <Depoimentos />
        <Wave id="dois" flip />
        <Method />
        <Deliverables />
        <Bonus />
        <Wave id="tres" />
        <Mentor />
        <Offer />
        <Faq />
        <FinalPurchase />
      </main>
      <Footer />
      <WhatsAppFab />
    </>
  );
}
