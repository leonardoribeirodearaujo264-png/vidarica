"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { trackContact, trackViewContent } from "@/lib/meta-pixel";
import retratoTopo from "../../public/images/deyllane-hero.jpg";
import retratoMentora from "../../public/images/deyllane-mentora.jpg";

/* ═══════════════ CONSTANTES ═══════════════ */

/* TODO: trocar pelo checkout do Sinapse Empresarial (R$ 197).
   Este link ainda é o do Vida Rica (R$ 97). */
const KIWIFY = "https://pay.kiwify.com.br/COIbRyc";

const WA_LINK =
  "https://wa.me/5598985679867?text=Ol%C3%A1!%20Tenho%20interesse%20no%20Sinapse%20Empresarial";
const INSTA = "https://instagram.com/lacerdadeyllane";
const EMAIL = "dey.lacerda82@gmail.com";

const PRECO = "197";
/* Valor cheio usado como âncora. Só mantenha se este preço já foi
   praticado de verdade — anunciar desconto que nunca existiu é risco no CDC. */
const PRECO_CHEIO = "497";

const CTA_LABEL = "Começar agora";

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

function Arrow() {
  return (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden>
      <path d="M5 12h13m0 0l-5-5m5 5l-5 5" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function Tick() {
  return (
    <svg className="w-[18px] h-[18px] shrink-0 mt-[3px] text-gold" viewBox="0 0 24 24" fill="none" aria-hidden>
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

function Shield() {
  return (
    <svg className="w-7 h-7 shrink-0 text-gold" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M12 3l7 2.6v5.2c0 4.3-2.9 8.2-7 9.2-4.1-1-7-4.9-7-9.2V5.6L12 3z"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinejoin="round"
      />
      <path d="M8.8 12.1l2.2 2.2 4.2-4.4" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/* ═══════════════ CABEÇALHO ═══════════════ */

const NAV = [
  { href: "#tese", label: "A tese" },
  { href: "#metodo", label: "Método" },
  { href: "#bonus", label: "Bônus" },
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

  /* Menu aberto: Esc fecha, o fundo nao rola, o Tab fica preso no painel
     e o foco volta para o botao ao sair. */
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
        solid || open ? "bg-abyss/92 backdrop-blur-lg border-b border-white/[0.06]" : ""
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
          <span className="hidden sm:block font-display text-[0.82rem] font-semibold tracking-[0.13em] uppercase text-ink">
            Sinapse Empresarial
          </span>
        </a>

        <nav aria-label="Seções da página" className="hidden lg:flex items-center gap-7 ml-auto">
          {NAV.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="inline-flex items-center min-h-[44px] px-1 text-[0.86rem] text-ink-muted hover:text-ink transition-colors duration-200"
            >
              {item.label}
            </a>
          ))}
          <a
            href={INSTA}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackContact("instagram_header")}
            className="inline-flex items-center gap-2 min-h-[44px] px-1 text-[0.86rem] text-ink-muted hover:text-gold transition-colors duration-200"
          >
            <InstagramGlyph />
            @lacerdadeyllane
          </a>
        </nav>

        <a
          href={KIWIFY}
          target="_blank"
          rel="noopener noreferrer"
          className="cta ml-auto lg:ml-0 hidden sm:inline-flex min-h-[44px] px-5 text-[0.78rem]"
        >
          {CTA_LABEL}
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
            className="lg:hidden fixed inset-x-0 bottom-0 top-[68px] bg-abyss/78 backdrop-blur-sm"
          />
          <div
            id="menu-mobile"
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-label="Navegação"
            className="lg:hidden relative z-10 border-t border-white/[0.06] bg-abyss/98 backdrop-blur-xl rise"
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
                href={KIWIFY}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setOpen(false)}
                className="cta mt-5 mb-2"
              >
                {CTA_LABEL} <Arrow />
              </a>
            </nav>
          </div>
        </>
      )}
    </header>
  );
}

/* ═══════════════ TOPO ═══════════════ */

function Hero() {
  return (
    <section id="topo" className="relative overflow-hidden pt-[116px] pb-20 md:pt-[148px] md:pb-28">
      <div className="aura w-[640px] h-[640px] -top-[260px] -left-[180px]" />
      <div className="aura w-[520px] h-[520px] top-[120px] -right-[200px] opacity-70" />

      <div className="shell relative grid lg:grid-cols-[1.16fr_0.84fr] gap-14 lg:gap-16 items-center">
        <div>
          <p className="eyebrow rise" style={{ animationDelay: "80ms" }}>
            Neurociência aplicada a negócios
          </p>

          <h1 className="display display-hero mt-7 rise" style={{ animationDelay: "170ms" }}>
            Você não decide.
            <br />
            <span className="gilt">Seu cérebro já decidiu.</span>
          </h1>

          <p className="lead mt-7 max-w-[520px] rise" style={{ animationDelay: "280ms" }}>
            Com o seu cliente é igual. O Sinapse Empresarial treina os dois lados da mesma
            sinapse: a decisão que você toma com dinheiro e a decisão que ele toma na hora de
            comprar.
          </p>

          <div
            className="mt-11 flex flex-wrap items-end gap-x-12 gap-y-7 rise"
            style={{ animationDelay: "390ms" }}
          >
            <div>
              <p className="meta">Investimento</p>
              <p className="text-ink-muted line-through text-sm mt-2">R$ {PRECO_CHEIO}</p>
              <div className="flex items-baseline gap-2.5 mt-0.5">
                <span className="font-display text-gold text-xl font-semibold leading-none">R$</span>
                <span className="display gilt text-[3rem] leading-none">{PRECO}</span>
              </div>
              <p className="meta mt-2.5">Pagamento único · 1 ano de acesso</p>
            </div>

            <a href={KIWIFY} target="_blank" rel="noopener noreferrer" className="cta">
              {CTA_LABEL} <Arrow />
            </a>
          </div>

          <p className="meta mt-7 rise" style={{ animationDelay: "480ms" }}>
            Garantia de 7 dias · Pix ou cartão
          </p>
        </div>

        <figure className="relative rise mx-auto w-full max-w-[420px]" style={{ animationDelay: "320ms" }}>
          <div className="relative overflow-hidden rounded-[18px] border border-gold/20">
            <Image
              src={retratoTopo}
              alt="Deyllane Lacerda em atendimento, com celular e tablet nas mãos"
              priority
              placeholder="blur"
              sizes="(max-width: 1024px) 90vw, 420px"
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
              className="w-[190px] h-auto"
            />
          </figcaption>
        </figure>
      </div>
    </section>
  );
}

/* ═══════════════ A TESE ═══════════════ */

const SINTOMAS = [
  {
    t: "O faturamento sobe, o aperto continua",
    d: "Entra mais dinheiro do que ano passado e a sensação no fim do mês é exatamente a mesma.",
  },
  {
    t: "Você desconta antes de pedirem",
    d: "O preço sai da sua boca já menor. A negociação termina antes de começar.",
  },
  {
    t: "A meta está no papel há seis meses",
    d: "Você sabe qual é o próximo passo. Ele simplesmente não acontece.",
  },
];

function Thesis() {
  return (
    <section id="tese" className="band">
      <div className="shell">
        <Reveal>
          <p className="eyebrow">O diagnóstico</p>
          <h2 className="display display-section mt-6 max-w-[620px]">
            Você já sabe o que fazer.
            <br />
            E mesmo assim não faz.
          </h2>
        </Reveal>

        <Reveal delay={80}>
          <p className="lead mt-7 max-w-[600px]">
            Falta de informação parou de ser o seu problema há muito tempo. O que trava um
            empreendedor que já fatura não é o que ele ignora — é o que o cérebro dele faz com a
            informação quando há dinheiro e risco na mesa.
          </p>
        </Reveal>

        <div className="grid md:grid-cols-3 gap-4 mt-14">
          {SINTOMAS.map((s, i) => (
            <Reveal key={s.t} delay={120 + i * 90}>
              <article className="panel h-full p-7">
                <h3 className="display-sm">{s.t}</h3>
                <p className="mt-3 text-[0.95rem] leading-relaxed text-ink-muted">{s.d}</p>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal delay={400}>
          <p className="lead mt-14 max-w-[640px] text-ink">
            Nada disso é indisciplina. É a forma como o seu cérebro decide sob incerteza — e ela
            é treinável.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

/* ═══════════════ A SINAPSE — elemento-assinatura ═══════════════ */

function SynapseDiagram() {
  return (
    <svg
      viewBox="0 0 900 340"
      className="w-full h-auto scale-[1.28] sm:scale-100 origin-center"
      role="img"
      aria-label="Diagrama: as suas decisões e as decisões do cliente ligadas por uma mesma sinapse"
    >
      <defs>
        <linearGradient id="axon" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#a97e28" />
          <stop offset="50%" stopColor="#f7e4b0" />
          <stop offset="100%" stopColor="#a97e28" />
        </linearGradient>
        <radialGradient id="core">
          <stop offset="0%" stopColor="#fff6df" />
          <stop offset="55%" stopColor="#e2bc68" />
          <stop offset="100%" stopColor="#e2bc68" stopOpacity="0" />
        </radialGradient>
      </defs>

      <g stroke="url(#axon)" fill="none" strokeWidth="1.7" opacity="0.8" strokeLinecap="round">
        {/* dendritos — lado de cá */}
        <path d="M110 92 C170 112 240 122 300 170" />
        <path d="M92 182 C160 178 240 173 300 170" />
        <path d="M138 266 C192 242 252 206 300 170" />
        <path d="M216 128 C250 142 276 155 300 170" />
        <path d="M198 236 C240 212 272 190 300 170" />
        {/* dendritos — lado de lá */}
        <path d="M790 92 C730 112 660 122 600 170" />
        <path d="M808 182 C740 178 660 173 600 170" />
        <path d="M762 266 C708 242 648 206 600 170" />
        <path d="M684 128 C650 142 624 155 600 170" />
        <path d="M702 236 C660 212 628 190 600 170" />
      </g>

      {/* axônio: o caminho que o impulso percorre até a fenda e depois dela */}
      <path d="M300 170 H392" stroke="url(#axon)" strokeWidth="2" fill="none" opacity="0.75" />
      <path d="M508 170 H600" stroke="url(#axon)" strokeWidth="2" fill="none" opacity="0.75" />
      <path
        className="impulse"
        d="M300 170 H600"
        stroke="#fff6df"
        strokeWidth="4"
        strokeLinecap="round"
        fill="none"
      />

      {/* a fenda sináptica — o intervalo onde a decisão acontece */}
      <circle cx="450" cy="170" r="58" fill="url(#core)" opacity="0.62" />
      <circle cx="418" cy="170" r="2.4" fill="#f7e4b0" opacity="0.8" />
      <circle cx="450" cy="158" r="2.8" fill="#f7e4b0" opacity="0.9" />
      <circle cx="450" cy="183" r="2.2" fill="#f7e4b0" opacity="0.7" />
      <circle cx="482" cy="170" r="2.4" fill="#f7e4b0" opacity="0.8" />

      {/* nós terminais */}
      <g fill="#e2bc68">
        <circle cx="110" cy="92" r="5" />
        <circle cx="92" cy="182" r="5" />
        <circle cx="138" cy="266" r="5" />
        <circle cx="216" cy="128" r="4" />
        <circle cx="198" cy="236" r="4" />
        <circle cx="790" cy="92" r="5" />
        <circle cx="808" cy="182" r="5" />
        <circle cx="762" cy="266" r="5" />
        <circle cx="684" cy="128" r="4" />
        <circle cx="702" cy="236" r="4" />
      </g>

      {/* hubs */}
      <circle cx="300" cy="170" r="9" fill="#0f2245" stroke="#e2bc68" strokeWidth="2.4" />
      <circle cx="600" cy="170" r="9" fill="#0f2245" stroke="#e2bc68" strokeWidth="2.4" />
      <circle className="node-live" cx="450" cy="170" r="5" fill="#fff6df" />
    </svg>
  );
}

function Synapse() {
  return (
    <section className="band relative overflow-hidden">
      <hr className="hairline absolute inset-x-0 top-0" />

      <div className="shell">
        <Reveal className="text-center">
          <p className="eyebrow">O mecanismo</p>
          <h2 className="display display-section mt-6 mx-auto max-w-[620px]">
            Duas decisões.
            <br />
            <span className="gilt">Um mecanismo.</span>
          </h2>
          <p className="lead mt-7 mx-auto max-w-[620px]">
            Decidir sobre o próprio dinheiro e fazer alguém decidir comprar são o mesmo evento
            visto de dois lados: um cérebro escolhendo sob incerteza. É por isso que finanças
            comportamentais e neurovendas não são dois assuntos — são um só.
          </p>
        </Reveal>

        <Reveal delay={140} className="mt-14 md:mt-16">
          <SynapseDiagram />
        </Reveal>

        <div className="grid sm:grid-cols-2 gap-5 mt-12">
          <Reveal delay={200}>
            <div className="panel p-7 h-full">
              <p className="meta text-gold">Lado de cá</p>
              <h3 className="display-sm mt-3">A sua decisão</h3>
              <p className="mt-3 text-[0.95rem] leading-relaxed text-ink-muted">
                Finanças comportamentais: os vieses que aparecem quando o caixa aperta, o padrão
                que recria a dívida depois de quitada, a meta que evapora em três semanas.
              </p>
            </div>
          </Reveal>

          <Reveal delay={280}>
            <div className="panel p-7 h-full">
              <p className="meta text-gold">Lado de lá</p>
              <h3 className="display-sm mt-3">A decisão dele</h3>
              <p className="mt-3 text-[0.95rem] leading-relaxed text-ink-muted">
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

/* ═══════════════ MÉTODO ═══════════════ */

const FRENTES = [
  {
    lado: "A sua decisão",
    itens: [
      {
        t: "Decidir sob pressão",
        d: "Quais vieses assumem o comando quando o caixa aperta — e como interromper o automático antes de assinar.",
      },
      {
        t: "Dívida é sintoma",
        d: "Sair do vermelho é consequência. O trabalho é no padrão que recria a dívida mesmo depois dela ser quitada.",
      },
      {
        t: "Dinheiro com método",
        d: "Organização financeira que sobrevive a um mês ruim, sem planilha complicada e sem promessa de disciplina eterna.",
      },
    ],
  },
  {
    lado: "A decisão dele",
    itens: [
      {
        t: "O sim antes do argumento",
        d: "A confiança se forma antes da sua primeira frase técnica. Como construí-la de propósito, não por sorte.",
      },
      {
        t: "Ancoragem e preço",
        d: "Por que você desconta sozinho e como ancorar valor de um jeito que o desconto deixa de ser o assunto.",
      },
      {
        t: "Objeção e fechamento",
        d: "Toda objeção é um pedido de segurança. Como responder ao pedido real e fechar sem empurrar.",
      },
    ],
  },
];

function Method() {
  return (
    <section id="metodo" className="band">
      <hr className="hairline absolute inset-x-0 top-0" />
      <div className="shell">
        <Reveal>
          <p className="eyebrow">O que você domina</p>
          <h2 className="display display-section mt-6 max-w-[560px]">Seis frentes, um eixo</h2>
        </Reveal>

        <div className="grid lg:grid-cols-2 gap-x-12 gap-y-12 mt-14">
          {FRENTES.map((coluna, ci) => (
            <div key={coluna.lado}>
              <Reveal delay={ci * 90}>
                <p className="meta text-gold pb-4 border-b border-gold/15">{coluna.lado}</p>
              </Reveal>

              <div className="mt-2">
                {coluna.itens.map((item, i) => (
                  <Reveal key={item.t} delay={ci * 90 + i * 80}>
                    <article className="py-7 border-b border-white/[0.06]">
                      <h3 className="display-sm">{item.t}</h3>
                      <p className="mt-2.5 text-[0.95rem] leading-relaxed text-ink-muted">{item.d}</p>
                    </article>
                  </Reveal>
                ))}
              </div>
            </div>
          ))}
        </div>

        <Reveal delay={200}>
          <p className="lead mt-14 max-w-[620px]">
            Tudo em aulas online curtas, para assistir e aplicar na mesma semana. Sem teoria
            acadêmica solta e sem aula de duas horas que você nunca termina.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

/* ═══════════════ BÔNUS ═══════════════ */

const BONUS = [
  {
    t: "Negociação online",
    d: "Resumo aplicável do que muda quando a negociação acontece por mensagem, sem tom de voz e sem olho no olho.",
  },
  {
    t: "Leitura corporal",
    d: "O que o corpo entrega antes da fala — e como usar isso para saber a hora exata de avançar ou recuar.",
  },
  {
    t: "Confiança instantânea",
    d: "Atalhos para entrar no subconsciente do cliente e encurtar o tempo entre a dúvida e a decisão.",
  },
  {
    t: "Mentalidade financeira",
    d: "E-books autorais sobre a relação com dinheiro que você herdou e nunca parou para questionar.",
  },
];

function Bonus() {
  return (
    <section id="bonus" className="band relative">
      <hr className="hairline absolute inset-x-0 top-0" />
      <div className="shell">
        <Reveal>
          <p className="eyebrow">Incluído</p>
          <h2 className="display display-section mt-6 max-w-[560px]">
            Quatro materiais de <span className="gilt">consulta rápida</span>
          </h2>
          <p className="lead mt-7 max-w-[580px]">
            Feitos para abrir cinco minutos antes de uma reunião, não para ler no fim de semana.
          </p>
        </Reveal>

        <div className="grid sm:grid-cols-2 gap-4 mt-14">
          {BONUS.map((b, i) => (
            <Reveal key={b.t} delay={i * 80}>
              <article className="panel-quiet h-full p-7 flex gap-5">
                <Image
                  src="/images/logo-sinapse-mark.png"
                  alt=""
                  width={560}
                  height={400}
                  className="h-6 w-auto shrink-0 opacity-55 mt-0.5"
                />
                <div>
                  <h3 className="display-sm">{b.t}</h3>
                  <p className="mt-2.5 text-[0.95rem] leading-relaxed text-ink-muted">{b.d}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════ QUALIFICAÇÃO ═══════════════ */

/* ═══════════════ MENTORA ═══════════════ */

function Mentor() {
  return (
    <section className="band relative">
      <hr className="hairline absolute inset-x-0 top-0" />
      <div className="shell grid lg:grid-cols-[0.8fr_1.2fr] gap-12 lg:gap-16 items-center">
        <Reveal>
          <figure className="relative max-w-[360px] mx-auto lg:mx-0">
            <div className="relative overflow-hidden rounded-[16px] border border-gold/20">
              <Image
                src={retratoMentora}
                alt="Retrato de Deyllane Lacerda"
                placeholder="blur"
                sizes="(max-width: 1024px) 80vw, 360px"
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
                className="w-[175px] h-auto"
              />
            </figcaption>
          </figure>
        </Reveal>

        <div>
          <Reveal delay={80}>
            <p className="eyebrow">Quem conduz</p>
            <h2 className="display display-section mt-6">Deyllane Lacerda</h2>
            <p className="meta mt-3">Estrategista de negócios</p>
          </Reveal>

          <Reveal delay={140}>
            <p className="lead mt-8 max-w-[560px]">
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
              className="cta-ghost mt-8"
            >
              @lacerdadeyllane <Arrow />
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════ OFERTA ═══════════════ */

const INCLUSO = [
  "Método Sinapse Empresarial completo — as seis frentes",
  "Aulas online curtas, para assistir e aplicar na mesma semana",
  "E-books de negociação online, leitura corporal e confiança instantânea",
  "E-books autorais de mentalidade financeira",
  "Acesso por 1 ano, de qualquer dispositivo",
  "Garantia legal de 7 dias (art. 49 do CDC)",
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
    <section id="oferta" className="band relative overflow-hidden scroll-mt-[72px]">
      <hr className="hairline absolute inset-x-0 top-0" />
      <div className="aura w-[720px] h-[720px] left-1/2 -translate-x-1/2 top-[10%]" />

      <div className="shell-narrow relative">
        <Reveal className="text-center">
          <p className="eyebrow">Investimento</p>
          <h2 className="display display-section mt-6">
            Um ano de acesso ao método
          </h2>
        </Reveal>

        <Reveal delay={100}>
          <div className="panel mt-12 p-8 sm:p-11">
            <Image
              src="/images/logo-sinapse-wordmark.png"
              alt="Sinapse Empresarial"
              width={1000}
              height={400}
              className="w-[260px] h-auto mx-auto"
            />

            <ul className="mt-10 space-y-4">
              {INCLUSO.map((item) => (
                <li key={item} className="flex gap-3.5 text-[0.95rem] leading-relaxed text-ink-soft">
                  <Tick />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <div className="mt-11 pt-9 border-t border-white/[0.07] text-center">
              <p className="text-ink-muted line-through text-sm">R$ {PRECO_CHEIO}</p>
              <div className="flex items-baseline justify-center gap-3 mt-2">
                <span className="font-display text-gold text-2xl font-semibold leading-none">R$</span>
                <span className="display gilt text-[4rem] leading-none -ml-1">{PRECO}</span>
              </div>
              <p className="meta mt-3">Pagamento único · Acesso por 1 ano</p>

              <div className="flex justify-center gap-8 mt-7 meta">
                <span>Pix</span>
                <span>Cartão</span>
              </div>

              <a
                href={KIWIFY}
                target="_blank"
                rel="noopener noreferrer"
                className="cta cta-wide mt-8"
              >
                {CTA_LABEL} <Arrow />
              </a>

              <p className="meta mt-6">Compra segura na Kiwify · Acesso imediato</p>
            </div>
          </div>
        </Reveal>

        <Reveal delay={180}>
          <div className="panel mt-5 p-8 flex flex-col sm:flex-row items-center gap-6 text-center sm:text-left">
            <div className="grid place-items-center w-[68px] h-[68px] shrink-0 rounded-full border border-gold/30 bg-gold/[0.07]">
              <Shield />
            </div>
            <div>
              <p className="display-sm gilt">Garantia de 7 dias</p>
              <p className="mt-2.5 text-[0.95rem] leading-relaxed text-ink-soft">
                Entre, assista, aplique. Se concluir que não é para você, peça o reembolso em até
                7 dias e recebe o valor integral de volta. O risco é meu.
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
    a: "Um ano a partir da compra, e-books incluídos.",
  },
  {
    q: "E se não for para mim?",
    a: "Sete dias de garantia. Pede o reembolso e recebe tudo de volta, sem justificar.",
  },
];

function FaqItem({ q, a, id }: { q: string; a: string; id: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-white/[0.07]">
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
          <p className="pb-6 pr-10 text-[0.95rem] leading-relaxed text-ink-muted">{a}</p>
        </div>
      </div>
    </div>
  );
}

function Faq() {
  return (
    <section className="band relative">
      <hr className="hairline absolute inset-x-0 top-0" />
      <div className="shell-narrow">
        <Reveal>
          <p className="eyebrow">Perguntas</p>
          <h2 className="display display-section mt-6">Antes que você pergunte</h2>
        </Reveal>

        <div className="mt-12">
          {FAQ.map((item, i) => (
            <Reveal key={item.q} delay={i * 50}>
              <FaqItem q={item.q} a={item.a} id={`faq-${i}`} />
            </Reveal>
          ))}
        </div>

        <Reveal delay={300}>
          <div className="mt-12 text-center">
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

/* ═══════════════ FECHAMENTO ═══════════════ */

function Close() {
  return (
    <section className="band relative overflow-hidden">
      <hr className="hairline absolute inset-x-0 top-0" />
      <div className="aura w-[600px] h-[600px] left-1/2 -translate-x-1/2 -top-[100px] opacity-70" />

      <div className="shell-narrow relative text-center">
        <Reveal>
          <Image
            src="/images/logo-sinapse-mark.png"
            alt=""
            width={560}
            height={400}
            className="h-12 w-auto mx-auto opacity-90"
          />
          <h2 className="display display-section mt-9">
            Daqui a um ano você decide
            <br />
            <span className="gilt">do mesmo jeito?</span>
          </h2>
          <p className="lead mt-7 mx-auto max-w-[560px]">
            Seu faturamento pode crescer sem que nada mude na forma como você decide. É assim que
            um negócio maior vira só um problema maior. O método existe para quebrar esse ciclo —
            e começa com uma decisão sua, agora.
          </p>
        </Reveal>

        <Reveal delay={120}>
          <a href={KIWIFY} target="_blank" rel="noopener noreferrer" className="cta mt-10">
            {CTA_LABEL} <Arrow />
          </a>
          <p className="meta mt-6">
            R$ {PRECO} · 1 ano de acesso · Garantia de 7 dias
          </p>
        </Reveal>
      </div>
    </section>
  );
}

/* ═══════════════ RODAPÉ ═══════════════ */

function Footer() {
  return (
    <footer className="relative pt-16 pb-16">
      <hr className="hairline absolute inset-x-0 top-0" />
      <div className="shell text-center">
        <Image
          src="/images/logo-sinapse-wordmark.png"
          alt="Sinapse Empresarial"
          width={1000}
          height={400}
          className="w-[230px] h-auto mx-auto opacity-80"
        />
        <p className="meta mt-4">O método que conecta comportamento, dinheiro e vendas</p>

        <div className="flex flex-wrap justify-center gap-x-7 gap-y-3 mt-9 text-[0.85rem] text-ink-muted">
          <a
            href={INSTA}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackContact("instagram_rodape")}
            className="inline-flex items-center min-h-[44px] px-1 hover:text-gold transition-colors"
          >
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

        <p className="meta mt-9 normal-case tracking-normal max-w-[620px] mx-auto leading-relaxed">
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
      <a href="#conteudo" className="skip-link">
        Pular para o conteúdo
      </a>
      <Header />
      <main id="conteudo">
        <Hero />
        <Thesis />
        <Synapse />
        <Method />
        <Bonus />
        <Mentor />
        <Offer />
        <Faq />
        <Close />
      </main>
      <Footer />
      <WhatsAppFab />
    </>
  );
}
