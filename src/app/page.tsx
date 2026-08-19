"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { motion, useScroll, useTransform, useInView, AnimatePresence } from "framer-motion";
import { trackContact, trackViewContent } from "@/lib/meta-pixel";

/* ═══════════════ FEATURE FLAGS ═══════════════ */
const MOSTRAR_DEPOIMENTOS = false;
const MOSTRAR_ESTATISTICAS = false;

/* ═══════════════ CONSTANTS ═══════════════ */
const KIWIFY = "https://pay.kiwify.com.br/COIbRyc";
type Ease = [number, number, number, number];
const EASE: Ease = [0.16, 1, 0.3, 1];
const WA_LINK = "https://wa.me/5598985679867?text=Ol%C3%A1!%20Tenho%20interesse%20no%20Vida%20Rica";
const INSTA = "https://instagram.com/lacerdadeyllane";
const CTA_TEXT = "Quero começar agora";

/* ═══════════════ HELPERS ═══════════════ */
function R({ children, className = "", d = 0, y = 14 }: { children: ReactNode; className?: string; d?: number; y?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const v = useInView(ref, { once: true, margin: "-40px 0px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y }}
      animate={v ? { opacity: 1, y: 0 } : { opacity: 0, y }}
      transition={{ duration: 0.6, delay: d, ease: EASE }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function Arrow() {
  return (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
    </svg>
  );
}

function Check({ gold = true }: { gold?: boolean }) {
  const color = gold ? "#C9A84C" : "#C9A84C";
  return (
    <div className="shrink-0 w-5 h-5 rounded-full flex items-center justify-center mt-0.5" style={{ background: `linear-gradient(135deg, ${color}, ${color}cc)` }}>
      <svg className="w-3 h-3 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
      </svg>
    </div>
  );
}

function Eyebrow({ children, lilac = false }: { children: ReactNode; lilac?: boolean }) {
  return (
    <p
      className="text-[11px] font-semibold tracking-[0.2em] uppercase mb-5 text-center"
      style={{ color: lilac ? "var(--color-lilac)" : "var(--color-gold)" }}
    >
      {children}
    </p>
  );
}

/* ════════════════════════════════════════════
   HEADER
   ════════════════════════════════════════════ */
function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 100);
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, []);

  useEffect(() => {
    document.body.classList.toggle("mobile-menu-open", menuOpen);
    return () => document.body.classList.remove("mobile-menu-open");
  }, [menuOpen]);

  const links = [
    { label: "Sobre", href: "#sobre" },
    { label: "Método", href: "#metodo" },
    { label: "Oferta", href: "#oferta" },
    { label: "Dúvidas", href: "#duvidas" },
  ];
  const close = () => setMenuOpen(false);

  return (
    <>
      <motion.header
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className={`top-0 inset-x-0 z-50 transition-all duration-500 ${
          scrolled
            ? "fixed lg:bg-[#0A0908] lg:border-b lg:border-white/[0.04] bg-transparent"
            : "absolute bg-transparent"
        }`}
      >
        <div className="section-container flex items-center justify-between h-[68px]">
          <a href="#" onClick={close} className="relative z-10 hidden lg:block focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold">
            <Image src="/images/logo.png" alt="Vida Rica" width={120} height={40} className="h-9 w-auto" priority />
          </a>
          <nav className="hidden lg:flex items-center gap-8">
            {links.map((l) => (
              <a key={l.href} href={l.href} className="text-[13px] text-text-muted hover:text-text-primary transition-colors duration-300 tracking-wide focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold">
                {l.label}
              </a>
            ))}
            <a href={KIWIFY} target="_blank" rel="noopener noreferrer" className="ml-4 text-[13px] font-semibold text-bg-base bg-gradient-to-r from-gold to-[#E8D48B] px-6 py-2.5 rounded-lg hover:shadow-lg hover:shadow-gold/20 transition-all duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold">
              {CTA_TEXT}
            </a>
          </nav>
          <button onClick={() => setMenuOpen(!menuOpen)} className="lg:hidden flex flex-col gap-[5px] min-w-[44px] min-h-[44px] items-center justify-center cursor-pointer relative z-10 ml-auto focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold" aria-label="Menu" style={{ filter: "drop-shadow(0 2px 8px rgba(0,0,0,0.6))" }}>
            <span className={`block w-5 h-[1.5px] bg-white transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-[6.5px]" : ""}`} />
            <span className={`block w-5 h-[1.5px] bg-white transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`} />
            <span className={`block w-5 h-[1.5px] bg-white transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-[6.5px]" : ""}`} />
          </button>
        </div>
      </motion.header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-bg-base/98 backdrop-blur-2xl flex flex-col items-center justify-center gap-8"
          >
            {links.map((l, i) => (
              <motion.a key={l.href} href={l.href} onClick={close} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 + i * 0.08, duration: 0.4 }} className="text-xl text-text-secondary hover:text-gold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold">
                {l.label}
              </motion.a>
            ))}
            <motion.a href={KIWIFY} target="_blank" rel="noopener noreferrer" onClick={close} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 0.4 }} className="cta-primary mt-4">
              {CTA_TEXT}
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

/* ════════════════════════════════════════════
   MOBILE CTA BAR
   ════════════════════════════════════════════ */
function MobileCta() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const h = () => {
      const pastThreshold = window.scrollY > 600;
      const offerSection = document.getElementById("oferta");
      let offerVisible = false;
      if (offerSection) {
        const r = offerSection.getBoundingClientRect();
        offerVisible = r.top < window.innerHeight && r.bottom > 0;
      }
      setVisible(pastThreshold && !offerVisible);
    };
    window.addEventListener("scroll", h, { passive: true });
    h();
    return () => window.removeEventListener("scroll", h);
  }, []);

  return (
    <div className={`mobile-cta-bar lg:hidden ${visible ? "visible" : ""}`}>
      <div className="flex items-center justify-between gap-3">
        <div className="shrink-0 whitespace-nowrap">
          <p className="text-gold text-xs font-semibold">67% OFF</p>
          <p className="text-[12px]">
            <span className="text-text-muted/45 line-through text-[11px]">R$ 297</span>{" "}
            <span className="text-text-primary font-semibold">R$ 97</span>
          </p>
        </div>
        <a href={KIWIFY} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 bg-gradient-to-b from-[#E0C55C] via-[#C9A84C] to-[#B8942F] text-[#0d0b07] font-semibold text-sm min-w-[150px] h-12 px-5 rounded-full border-t border-white/25 whitespace-nowrap shrink-0">
          Comprar agora <Arrow />
        </a>
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════
   HERO
   ════════════════════════════════════════════ */
function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], [0, 40]);

  return (
    <section ref={ref} className="relative overflow-hidden">
      {/* ── MOBILE LAYOUT ── */}
      <div className="lg:hidden">
        {/* Full-bleed photo — starts at y=0, behind header */}
        <div className="relative w-full" style={{ height: "60vh" }}>
          <Image
            src="/images/hero-photo.jpeg"
            alt="Deyllane Lacerda"
            fill
            className="object-cover"
            style={{ objectPosition: "center 20%" }}
            priority
          />
          {/* Dissolve — bottom to top, using exact bg color */}
          <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-[#0A0908] from-0% via-[#0A0908]/85 via-[35%] to-transparent to-[65%]" />
        </div>

        {/* Text content — overlaps the dissolved photo */}
        <div className="relative z-10 px-6 -mt-32">
          <motion.h1 initial={{ opacity: 0, y: 25 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.3, ease: EASE }} className="heading-hero mb-5">
            Por que você ganha dinheiro e{" "}
            <span className="gold-text">ainda se sente preso?</span>
          </motion.h1>

          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.6, ease: EASE }} className="text-text-secondary text-[15px] leading-relaxed mb-7">
            Seus padrões emocionais controlam cada decisão financeira. Aprenda a{" "}
            <strong className="text-text-primary font-medium">pensar, decidir e agir diferente</strong> com o dinheiro.
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.9, ease: EASE }} className="flex flex-col gap-5">
            {/* Price — single baseline row */}
            <div>
              <span className="inline-block text-[10px] font-bold tracking-[0.1em] uppercase text-emerald-400 bg-emerald-400/10 px-2.5 py-1 rounded-full border border-emerald-400/20 mb-2">-67% OFF</span>
              <div className="flex items-baseline gap-3">
                <span className="text-red-400 text-sm line-through" style={{ opacity: 0.7 }}>R$ 297</span>
                <span className="font-display text-gold text-sm font-medium" style={{ lineHeight: 1 }}>R$</span>
                <span className="font-display gold-text text-[2.25rem] font-bold" style={{ lineHeight: 1, marginLeft: "-6px" }}>97</span>
              </div>
              <p className="text-text-muted text-[11px] mt-2">Pagamento único</p>
            </div>

            <a id="hero-cta" href={KIWIFY} target="_blank" rel="noopener noreferrer" className="cta-primary hero-cta text-[15px] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold">
              {CTA_TEXT} <Arrow />
            </a>
          </motion.div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 1.3 }} className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1.5 mt-6 text-text-muted text-[10px]" style={{ opacity: 0.65 }}>
            <span className="flex items-center gap-1">
              <svg className="w-2.5 h-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
              Compra segura
            </span>
            <span className="text-white/10">|</span>
            <span className="flex items-center gap-1">
              <svg className="w-2.5 h-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
              7 dias de garantia
            </span>
          </motion.div>

          <div className="pb-10" />
        </div>
      </div>

      {/* ── DESKTOP LAYOUT ── */}
      <div className="hidden lg:flex items-center min-h-screen">
        {/* Ambient glows */}
        <div className="glow-gold" style={{ top: "-15%", right: "-5%" }} />
        <div className="absolute bottom-[-10%] left-[10%] w-[400px] h-[400px] bg-gold-glow rounded-full blur-[160px] pointer-events-none" />

        <div className="relative z-10 section-container w-full pt-28 pb-16">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="max-w-[520px]">
              <motion.h1 initial={{ opacity: 0, y: 25 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.5, ease: EASE }} className="heading-hero mb-6">
                Por que você ganha dinheiro e{" "}
                <span className="gold-text">ainda se sente preso?</span>
              </motion.h1>

              <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.8, ease: EASE }} className="text-text-secondary text-base leading-relaxed mb-8 max-w-[480px]">
                Seus padrões emocionais controlam cada decisão financeira. Aprenda a{" "}
                <strong className="text-text-primary font-medium">pensar, decidir e agir diferente</strong> com o dinheiro.
              </motion.p>

              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 1.1, ease: EASE }} className="flex flex-col items-start gap-5">
                {/* Price — single baseline row */}
                <div>
                  <span className="inline-block text-[10px] font-bold tracking-[0.1em] uppercase text-emerald-400 bg-emerald-400/10 px-2.5 py-1 rounded-full border border-emerald-400/20 mb-2">-67% OFF</span>
                  <div className="flex items-baseline gap-3">
                    <span className="text-red-400 text-sm line-through" style={{ opacity: 0.7 }}>R$ 297</span>
                    <span className="font-display text-gold text-base font-medium" style={{ lineHeight: 1 }}>R$</span>
                    <span className="font-display gold-text text-[2.75rem] font-bold" style={{ lineHeight: 1, marginLeft: "-6px" }}>97</span>
                  </div>
                  <p className="text-text-muted text-[11px] mt-2">Pagamento único</p>
                </div>

                <a id="hero-cta" href={KIWIFY} target="_blank" rel="noopener noreferrer" className="cta-primary text-[15px] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold">
                  {CTA_TEXT} <Arrow />
                </a>
              </motion.div>

              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 1.5 }} className="flex flex-wrap items-center gap-x-3 gap-y-1.5 mt-6 text-text-muted text-[10px]" style={{ opacity: 0.65 }}>
                <span className="flex items-center gap-1">
                  <svg className="w-2.5 h-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
                  Compra segura
                </span>
                <span className="text-white/10">|</span>
                <span className="flex items-center gap-1">
                  <svg className="w-2.5 h-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
                  7 dias de garantia
                </span>
              </motion.div>
            </div>

            <motion.div className="flex justify-end" initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1.2, delay: 0.3, ease: EASE }} style={{ y: imgY }}>
              <div className="relative w-[400px]">
                <Image src="/images/hero-photo.jpeg" alt="Deyllane Lacerda" width={400} height={530} className="w-full h-auto object-cover" priority />
                {/* Bottom dissolve */}
                <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[#0A0908] via-[#0A0908]/70 to-transparent pointer-events-none" />
                {/* Left dissolve */}
                <div className="absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-[#0A0908] via-[#0A0908]/50 to-transparent pointer-events-none" />
                {/* Top dissolve */}
                <div className="absolute inset-x-0 top-0 h-1/4 bg-gradient-to-b from-[#0A0908] to-transparent pointer-events-none" />
              </div>
            </motion.div>
          </div>
        </div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2, duration: 1 }} className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center">
          <motion.div animate={{ y: [0, 6, 0] }} transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }} className="w-[1px] h-6 bg-gradient-to-b from-gold/30 to-transparent" />
        </motion.div>
      </div>
    </section>
  );
}

/* ════════════════════════════════════════════
   "VOCÊ SE IDENTIFICA?" — 3 camadas visuais distintas
   ════════════════════════════════════════════ */
function PainSection() {
  return (
    <section className="relative section-pad overflow-hidden scroll-mt-[88px]">
      <div className="absolute inset-0 bg-gradient-to-b from-bg-base via-bg-sunken to-bg-base" />
      <div className="divider-gold absolute top-0 inset-x-0" />

      <div className="relative z-10 section-container max-w-[820px]">
        <R><Eyebrow>Você se identifica?</Eyebrow></R>
        <R d={0.06}>
          <h2 className="heading-section text-center mb-4">
            Você não tem um problema com dinheiro.{" "}
            <span className="gold-text">Você tem camadas.</span>
          </h2>
        </R>
        <R d={0.1}>
          <p className="text-text-muted text-center text-[15px] max-w-lg mx-auto mb-16">
            A maioria trata o sintoma. O que controla seu dinheiro está muito mais fundo.
          </p>
        </R>

        {/* Timeline connector */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-[19px] top-0 bottom-0 w-[1px] bg-gradient-to-b from-white/[0.06] via-gold/20 to-gold/40 hidden sm:block" />

          {/* Camada 1 — Superfície */}
          <R d={0.14}>
            <div className="relative pl-0 sm:pl-14 mb-12">
              <div className="flex items-center gap-3 mb-5">
                <div className="relative z-10 w-10 h-10 rounded-full bg-bg-elevated border border-white/[0.08] flex items-center justify-center text-sm text-text-muted font-display font-bold shrink-0">01</div>
                <p className="text-text-muted text-[11px] font-semibold tracking-[0.2em] uppercase">O que aparece na superfície</p>
              </div>
              <div className="grid sm:grid-cols-2 gap-3">
                {[
                  "O dinheiro entra e some — você não sabe para onde foi",
                  "A fatura do cartão é sempre maior do que esperava",
                  "Já tentou planilha, app, anotação — nada funcionou",
                ].map((item, i) => (
                  <div key={i} className="glass-card flex items-center gap-3 px-5 py-4">
                    <span className="text-text-muted text-sm shrink-0">—</span>
                    <p className="text-text-secondary text-[13px] leading-relaxed">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </R>

          {/* Camada 2 — Emocional */}
          <R d={0.2}>
            <div className="relative pl-0 sm:pl-14 mb-12">
              <div className="flex items-center gap-3 mb-5">
                <div className="relative z-10 w-10 h-10 rounded-full bg-bg-elevated border border-lilac/20 flex items-center justify-center text-sm text-lilac font-display font-bold shrink-0">02</div>
                <p className="text-lilac text-[11px] font-semibold tracking-[0.2em] uppercase">O que dói por dentro</p>
              </div>
              <div className="bg-bg-sunken rounded-2xl border border-lilac/[0.08] p-6 sm:p-8 max-w-[560px]">
                <div className="border-l-2 border-lilac/20 pl-5 space-y-4">
                  {[
                    "Vergonha de admitir que não sabe lidar com dinheiro",
                    "Ansiedade toda vez que abre o extrato ou a fatura",
                    "Medo de chegar aos 60 sem nenhuma segurança financeira",
                  ].map((item, i) => (
                    <p key={i} className="text-text-secondary text-sm italic leading-relaxed">{item}</p>
                  ))}
                </div>
              </div>
            </div>
          </R>

          {/* Camada 3 — Raiz */}
          <R d={0.26}>
            <div className="relative pl-0 sm:pl-14 mb-12">
              <div className="flex items-center gap-3 mb-5">
                <div className="relative z-10 w-10 h-10 rounded-full bg-gold/10 border border-gold/25 flex items-center justify-center text-sm text-gold font-display font-bold shrink-0">03</div>
                <p className="text-gold text-[11px] font-semibold tracking-[0.2em] uppercase">A raiz que ninguém te mostrou</p>
              </div>
              <div className="gold-border-card p-6 sm:p-8">
                <p className="text-text-primary text-base sm:text-lg leading-[1.8] font-display">
                  Crenças herdadas — <span className="text-gold italic">&ldquo;dinheiro é sujo&rdquo;</span>, <span className="text-gold italic">&ldquo;rico é desonesto&rdquo;</span> — que se transformaram em ciclos de culpa e recompensa. Uma identidade construída em torno de <span className="text-text-primary font-semibold">&ldquo;não sou boa com dinheiro&rdquo;</span>, repetida sem consciência, geração após geração.
                </p>
              </div>
            </div>
          </R>
        </div>

        {/* Ponte */}
        <R d={0.3}>
          <div className="relative pl-6 border-l-2 border-gold/20 py-3 mt-4 mb-8">
            <p className="font-display text-lg sm:text-xl text-text-secondary italic leading-relaxed">
              &ldquo;A maioria dos cursos começa pela planilha e ignora a raiz.
              O <span className="not-italic gold-text font-semibold">Vida Rica</span> começa pela sua mente.&rdquo;
            </p>
          </div>
        </R>

        <R d={0.35}>
          <div className="text-center">
            <a href="#metodo" className="inline-flex items-center gap-2 text-gold text-sm font-medium hover:text-[#E8D48B] transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold">
              Conheça o método que resolve isso
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" /></svg>
            </a>
          </div>
        </R>
      </div>
    </section>
  );
}

/* ════════════════════════════════════════════
   SEGMENTAÇÃO — 3 perfis
   ════════════════════════════════════════════ */
function SegmentationSection() {
  const profiles = [
    {
      title: "Vive no vermelho",
      quote: "Todo mês eu juro que vou me organizar, mas nunca consigo.",
      diagnosis: "Sabe que precisa mudar, mas não sabe por onde começar. Trabalha para pagar contas, não para viver.",
      result: "Sair do ciclo de endividamento e criar sua primeira reserva.",
    },
    {
      title: "Se organiza, mas trava",
      quote: "Eu ganho bem, mas no fim do mês... cadê o dinheiro?",
      diagnosis: "Não está devendo, mas algo invisível te trava — e não é falta de informação.",
      result: "Parar de sabotar seu crescimento e construir patrimônio conscientemente.",
    },
    {
      title: "Quer ir mais longe",
      quote: "Já me organizo, mas sei que minha mentalidade me limita.",
      diagnosis: "Tem controle básico, mas crenças antigas sobre riqueza ainda operam por baixo das decisões.",
      result: "Desbloquear o próximo nível de prosperidade e liberdade com o dinheiro.",
    },
  ];

  return (
    <section className="relative section-pad overflow-hidden scroll-mt-[88px]">
      <div className="absolute inset-0 bg-bg-base" />
      <div className="divider-lilac absolute top-0 inset-x-0" />

      <div className="relative z-10 section-container max-w-[1100px]">
        <R><Eyebrow lilac>Para quem é o Vida Rica?</Eyebrow></R>
        <R d={0.06}>
          <h2 className="heading-section text-center mb-4">
            Não importa de onde você começa.{" "}
            <span className="lilac-text">Existe um caminho.</span>
          </h2>
        </R>
        <R d={0.1}>
          <p className="text-text-muted text-center text-[15px] max-w-md mx-auto mb-14">
            Três perfis diferentes, um único método que se adapta à sua realidade.
          </p>
        </R>

        <div className="grid md:grid-cols-3 gap-5">
          {profiles.map((p, i) => (
            <R key={i} d={0.14 + i * 0.07}>
              <div className="glass-card p-6 sm:p-7 h-full flex flex-col">
                <h3 className="text-text-primary font-semibold text-base mb-3">{p.title}</h3>
                <p className="text-lilac/80 text-sm italic mb-4 border-l-2 border-lilac/15 pl-3">&ldquo;{p.quote}&rdquo;</p>
                <p className="text-text-muted text-[13px] leading-relaxed mb-5">{p.diagnosis}</p>
                <div className="mt-auto flex items-start gap-2 bg-gold/[0.04] rounded-lg p-3 border border-gold/[0.08]">
                  <Check />
                  <p className="text-text-secondary text-[13px] leading-relaxed">{p.result}</p>
                </div>
              </div>
            </R>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ════════════════════════════════════════════
   MENTORA
   ════════════════════════════════════════════ */
function MentorSection() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], [-12, 12]);

  return (
    <section ref={ref} className="relative section-pad overflow-hidden scroll-mt-[88px]" id="sobre">
      <div className="absolute inset-0 bg-gradient-to-b from-bg-base via-bg-elevated/30 to-bg-base" />
      <div className="divider-gold absolute top-0 inset-x-0" />
      <div className="glow-gold" style={{ bottom: 0, right: 0 }} />

      <div className="relative z-10 section-container max-w-[1100px]">
        <div className="grid lg:grid-cols-[1fr_1.2fr] gap-10 lg:gap-16 items-center">
          <R y={0}>
            <motion.div style={{ y: imgY }} className="relative flex justify-center lg:justify-start">
              <div className="relative w-[260px] sm:w-[320px] lg:w-full max-w-[400px]">
                <div className="glow-gold -inset-8 !w-auto !h-auto !rounded-2xl blur-2xl" />
                <div className="relative overflow-hidden rounded-2xl shadow-2xl shadow-black/30" style={{ border: "1px solid rgba(201,168,76,0.1)" }}>
                  <Image src="/images/about-photo.jpeg" alt="Deyllane Lacerda" width={560} height={750} className="w-full h-auto object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-bg-base/40 via-transparent to-transparent" />
                </div>
              </div>
            </motion.div>
          </R>

          <div>
            <R><Eyebrow>Sua Mentora</Eyebrow></R>
            <R d={0.06}>
              <h2 className="font-display text-3xl sm:text-4xl font-bold mb-2 tracking-tight text-text-primary">Deyllane Lacerda</h2>
            </R>
            <R d={0.1}>
              <p className="text-gold text-xs tracking-[0.15em] uppercase mb-7">Economista &middot; Contadora &middot; Especialista em Finanças Comportamentais</p>
            </R>

            <R d={0.14}>
              <p className="text-text-secondary text-[15px] leading-[1.85] mb-4 max-w-[540px]">
                Formada em Economia e Contabilidade, Deyllane percebeu que o conhecimento técnico <strong className="text-text-primary font-medium">não resolvia o problema real</strong> das pessoas com dinheiro. O erro não estava na conta — <strong className="text-text-primary font-medium">estava na mente.</strong>
              </p>
            </R>
            <R d={0.18}>
              <p className="text-text-secondary text-[15px] leading-[1.85] mb-6 max-w-[540px]">
                Ela uniu economia, neurociência e psicologia comportamental em um único método — o <span className="gold-text font-semibold">Vida Rica</span>.
              </p>
            </R>

            <R d={0.22}>
              <div className="py-5 border-t border-b border-white/[0.06] mb-6 max-w-[540px]">
                <p className="font-display text-base sm:text-lg text-text-secondary italic leading-relaxed">
                  &ldquo;Uma Vida Rica não começa quando você ganha mais. Começa quando você aprende a <span className="not-italic gold-text font-semibold">pensar, decidir e agir diferente</span> com o dinheiro.&rdquo;
                </p>
                <p className="text-gold text-xs mt-3 tracking-wider">— Deyllane Lacerda</p>
              </div>
            </R>

            <R d={0.26}>
              <a href={INSTA} onClick={() => trackContact("instagram_mentora")} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-text-muted hover:text-lilac transition-colors text-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" /></svg>
                @lacerdadeyllane
              </a>
            </R>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ════════════════════════════════════════════
   MÉTODO — 4 pilares
   ════════════════════════════════════════════ */
function MethodSection() {
  const pillars = [
    { n: "01", title: "Finanças Comportamentais", desc: "Entenda como emoções e crenças sabotam cada decisão financeira que você toma.", tag: null },
    { n: "02", title: "Mentalidade Financeira", desc: "Reprograme a forma como você pensa sobre dinheiro, riqueza e prosperidade.", tag: null },
    { n: "03", title: "Neurociência Aplicada", desc: "Descubra como o cérebro processa escolhas financeiras e crie hábitos a seu favor.", tag: "Diferencial único" },
    { n: "04", title: "Organização Prática", desc: "Ferramentas e sistemas reais para o dia a dia. Sem planilha complicada, sem jargão.", tag: null },
  ];

  return (
    <section className="relative section-pad overflow-hidden scroll-mt-[88px]" id="metodo">
      <div className="absolute inset-0 bg-bg-base" />
      <div className="divider-gold absolute top-0 inset-x-0" />

      <div className="relative z-10 section-container max-w-[1000px]">
        <R><Eyebrow>O Método Vida Rica</Eyebrow></R>
        <R d={0.06}>
          <h2 className="heading-section text-center mb-4">
            Não é um curso. É uma{" "}
            <span className="gold-text">jornada em 4 pilares.</span>
          </h2>
        </R>
        <R d={0.1}>
          <p className="text-text-muted text-center text-[15px] max-w-lg mx-auto mb-14">
            Do desbloqueio emocional à ação prática. Cada pilar resolve uma camada.
          </p>
        </R>

        <div className="grid md:grid-cols-2 gap-5">
          {pillars.map((p, i) => (
            <R key={i} d={0.14 + i * 0.07}>
              <div className="glass-card p-6 sm:p-8 h-full relative overflow-hidden group">
                {p.tag && (
                  <span className="absolute top-4 right-4 text-[9px] font-bold tracking-wider uppercase bg-gold/10 text-gold px-2.5 py-1 rounded-full border border-gold/20">
                    {p.tag}
                  </span>
                )}
                {/* Watermark number */}
                <span className="absolute -right-2 -bottom-4 text-[6rem] font-display font-bold text-white/[0.03] leading-none pointer-events-none select-none">{p.n}</span>
                <div className="flex items-center gap-4 mb-4">
                  <span className="text-gold/25 font-display text-3xl font-bold leading-none">{p.n}</span>
                  <div className="h-[1px] flex-1 bg-gradient-to-r from-gold/10 to-transparent" />
                </div>
                <h3 className="text-text-primary font-semibold text-base sm:text-lg mb-2">{p.title}</h3>
                <p className="text-text-muted text-sm leading-relaxed">{p.desc}</p>
                {/* Hover line */}
                <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-gold/0 via-gold/40 to-gold/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            </R>
          ))}
        </div>

        <R d={0.45}>
          <div className="text-center mt-12">
            <a href="#oferta" className="inline-flex items-center gap-2 text-gold text-sm font-medium hover:text-[#E8D48B] transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold">
              {CTA_TEXT} <Arrow />
            </a>
          </div>
        </R>
      </div>
    </section>
  );
}

/* ════════════════════════════════════════════
   COMPARATIVA — cards empilhados no mobile
   ════════════════════════════════════════════ */
function ComparisonSection() {
  const rows = [
    { criteria: "Abordagem", others: "Só planilha e corte de gastos", vr: "Comportamento + mente + prática" },
    { criteria: "Base científica", others: "Opinião e experiência pessoal", vr: "Neurociência + economia comportamental" },
    { criteria: "Crenças e emoções", others: "Ignoradas ou tratadas como frescura", vr: "Primeiro pilar do método" },
    { criteria: "Organização", others: "Planilha genérica que você abandona", vr: "Sistema prático adaptado à sua realidade" },
    { criteria: "Resultado", others: "Saber o que fazer (e não conseguir)", vr: "Pensar, decidir e agir diferente" },
  ];

  return (
    <section className="relative section-pad overflow-hidden scroll-mt-[88px]">
      <div className="absolute inset-0 bg-gradient-to-b from-bg-base via-bg-sunken to-bg-base" />
      <div className="divider-lilac absolute top-0 inset-x-0" />

      <div className="relative z-10 section-container max-w-[900px]">
        <R><Eyebrow lilac>Por que isso é diferente</Eyebrow></R>
        <R d={0.06}>
          <h2 className="heading-section text-center mb-12">
            Não se compara com o que existe no mercado.
          </h2>
        </R>

        {/* Desktop table */}
        <R d={0.12}>
          <div className="hidden sm:block">
            <table className="w-full text-sm">
              <thead>
                <tr>
                  <th className="text-left text-text-muted text-[11px] font-semibold tracking-wider uppercase pb-4 pr-4 w-[26%]">Critério</th>
                  <th className="text-left text-text-muted text-[11px] font-semibold tracking-wider uppercase pb-4 pr-4 w-[37%]">Cursos tradicionais</th>
                  <th className="text-left text-[11px] font-semibold tracking-wider uppercase pb-4 w-[37%] pl-4"><span className="gold-text">Vida Rica</span></th>
                </tr>
              </thead>
              <tbody>
                {rows.map((r, i) => (
                  <tr key={i} className="border-t border-white/[0.04]">
                    <td className="py-4 pr-4 text-text-secondary font-medium text-[13px]">{r.criteria}</td>
                    <td className="py-4 pr-4 text-text-muted text-[13px]">
                      <span className="flex items-center gap-2"><span className="text-red-400/40 text-xs">&#10005;</span> {r.others}</span>
                    </td>
                    <td className="py-4 text-[13px] pl-4 bg-gold/[0.03] border-l border-gold/[0.08]">
                      <span className="flex items-center gap-2 text-text-secondary"><span className="text-gold text-xs">&#10003;</span> {r.vr}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </R>

        {/* Mobile cards */}
        <div className="sm:hidden space-y-3">
          {rows.map((r, i) => (
            <R key={i} d={0.1 + i * 0.05}>
              <div className="glass-card p-4">
                <p className="text-text-muted text-[10px] font-semibold tracking-wider uppercase mb-2">{r.criteria}</p>
                <div className="flex items-start gap-2 mb-2 text-text-muted text-[13px]">
                  <span className="text-red-400/40 text-xs mt-0.5 shrink-0">&#10005;</span>
                  <p>{r.others}</p>
                </div>
                <div className="flex items-start gap-2 text-text-secondary text-[13px] bg-gold/[0.03] rounded-lg p-2 border border-gold/[0.06]">
                  <span className="text-gold text-xs mt-0.5 shrink-0">&#10003;</span>
                  <p>{r.vr}</p>
                </div>
              </div>
            </R>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ════════════════════════════════════════════
   DEPOIMENTOS (oculto)
   ════════════════════════════════════════════ */
function TestimonialsSection() {
  if (!MOSTRAR_DEPOIMENTOS) return null;
  return null;
}

/* ════════════════════════════════════════════
   OFERTA — Entregas absorvidas + Selos + Garantia compactados
   ════════════════════════════════════════════ */
function OfferSection() {
  const included = [
    "Treinamento Vida Rica completo — 4 pilares integrados",
    "Todas as aulas em vídeo, acesso por 1 ano",
    "Material de apoio complementar",
    "Acesso de qualquer dispositivo",
    "Garantia legal de 7 dias (art. 49 do CDC)",
  ];

  // Dispara ViewContent quando a seção de preço entra na tela (uma única vez)
  const viewSent = useRef(false);

  useEffect(() => {
    const h = () => {
      if (viewSent.current) return;
      const el = document.getElementById("oferta");
      if (!el) return;
      const r = el.getBoundingClientRect();
      if (r.top < window.innerHeight * 0.75 && r.bottom > 0) {
        viewSent.current = true;
        trackViewContent();
        window.removeEventListener("scroll", h);
      }
    };
    window.addEventListener("scroll", h, { passive: true });
    h();
    return () => window.removeEventListener("scroll", h);
  }, []);

  return (
    <section className="relative section-pad overflow-hidden scroll-mt-[88px]" id="oferta">
      <div className="absolute inset-0 bg-bg-base" />
      <div className="divider-gold absolute top-0 inset-x-0" />
      <div className="glow-gold" style={{ top: "50%", left: "50%", transform: "translate(-50%,-50%)" }} />

      <div className="relative z-10 section-container max-w-[600px]">
        <R><Eyebrow>Investimento</Eyebrow></R>
        <R d={0.06}>
          <h2 className="heading-section text-center mb-12">
            Quanto custa transformar sua{" "}
            <span className="gold-text">relação com o dinheiro?</span>
          </h2>
        </R>

        <R d={0.12}>
          <div className="glass-card p-7 sm:p-10 text-center" style={{ borderColor: "rgba(201,168,76,0.12)" }}>
            <Image src="/images/logo.png" alt="Vida Rica" width={100} height={36} className="h-7 w-auto mx-auto mb-8 opacity-80" />

            <div className="space-y-3 text-left mb-8">
              {included.map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <Check />
                  <p className="text-text-secondary text-sm">{item}</p>
                </div>
              ))}
            </div>

            <div className="divider-gold my-8" />

            {/* Market comparison — subordinate */}
            <div className="text-left mb-8 opacity-60 hover:opacity-80 transition-opacity">
              <p className="text-text-muted text-[10px] font-semibold tracking-wider uppercase mb-2">Compare com o mercado</p>
              <div className="flex justify-between text-[12px] text-text-muted border-b border-white/[0.04] pb-2 mb-1.5">
                <span>Terapia financeira (1 sessão)</span><span>R$ 200+</span>
              </div>
              <div className="flex justify-between text-[12px] text-text-muted border-b border-white/[0.04] pb-2 mb-1.5">
                <span>Consultoria financeira (1 mês)</span><span>R$ 500+</span>
              </div>
              <div className="flex justify-between text-[12px] text-text-muted">
                <span>Curso presencial de finanças</span><span>R$ 1.200+</span>
              </div>
            </div>

            {/* Price with glow */}
            <div className="relative">
              <div className="absolute inset-0 bg-gold/[0.04] rounded-2xl blur-2xl" />
              <p className="text-text-muted text-xs tracking-[0.15em] uppercase mb-3 relative">Tudo isso por apenas</p>
              <div className="flex items-center justify-center gap-3 mb-1 relative">
                <span className="text-text-muted text-lg line-through opacity-50">R$ 297</span>
                <div className="flex items-baseline gap-1">
                  <span className="text-gold text-xl font-medium">R$</span>
                  <span className="font-display text-7xl sm:text-8xl font-bold gold-text leading-none">97</span>
                </div>
              </div>
              <div className="flex justify-center mb-2 relative">
                <span className="text-[10px] font-bold tracking-wider uppercase bg-gold/15 text-gold px-3 py-1 rounded-full border border-gold/20">Economia de R$ 200</span>
              </div>
              <p className="text-text-muted text-xs mb-2 relative">Pagamento único &middot; Acesso por 1 ano completo</p>
              <p className="text-gold-soft text-sm font-medium mb-8 relative">
                Menos de R$ 0,27 por dia.
              </p>
            </div>

            <div className="flex justify-center gap-5 mb-7 text-text-muted text-[11px] tracking-wider">
              <span>Pix</span>
              <span className="text-white/10">&middot;</span>
              <span>Cartão</span>
              <span className="text-white/10">&middot;</span>
              <span>Boleto</span>
            </div>

            <a href={KIWIFY} target="_blank" rel="noopener noreferrer" className="cta-full focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold">
              QUERO COMEÇAR AGORA <Arrow />
            </a>

            <div className="flex items-center justify-center gap-2 mt-5 text-text-muted text-[11px]">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              Compra 100% segura &middot; Plataforma Kiwify
            </div>
          </div>
        </R>
      </div>
    </section>
  );
}

/* ════════════════════════════════════════════
   SELOS + GARANTIA — compactados em uma seção
   ════════════════════════════════════════════ */
function TrustAndGuaranteeSection() {
  return (
    <section className="relative py-16 sm:py-24 overflow-hidden scroll-mt-[88px]">
      <div className="absolute inset-0 bg-gradient-to-b from-bg-base via-bg-sunken to-bg-base" />
      <div className="divider-gold absolute top-0 inset-x-0" />

      <div className="relative z-10 section-container max-w-[800px]">
        {/* Trust badges — compact strip */}
        <R>
          <div className="grid grid-cols-3 gap-3 sm:gap-5 mb-12">
            {[
              { title: "Compra segura", desc: "Plataforma Kiwify" },
              { title: "Acesso imediato", desc: "Pix ou cartão" },
              { title: "Garantia 7 dias", desc: "Art. 49 do CDC" },
            ].map((b, i) => (
              <div key={i} className="text-center py-4 sm:py-5">
                <p className="text-text-primary text-xs sm:text-sm font-semibold mb-1">{b.title}</p>
                <p className="text-text-muted text-[11px]">{b.desc}</p>
              </div>
            ))}
          </div>
        </R>

        {/* Guarantee block */}
        <R d={0.08}>
          <div className="gold-border-card p-6 sm:p-8">
            <h3 className="font-display text-xl sm:text-2xl font-bold text-text-primary mb-4 text-center">
              Garantia legal de 7 dias
            </h3>
            <div className="max-w-[580px] mx-auto space-y-3 text-text-muted text-[13px] leading-relaxed">
              <p>
                Conforme o <strong className="text-text-secondary font-medium">art. 49 do Código de Defesa do Consumidor</strong>, você tem 7 dias corridos a partir da data da compra para solicitar o reembolso integral, sem necessidade de justificativa.
              </p>
              <p>
                Para exercer esse direito, basta entrar em contato pelo e-mail ou WhatsApp informados nesta página dentro do prazo de 7 dias. O reembolso será processado pela plataforma Kiwify.
              </p>
              <p>
                Conforme o <strong className="text-text-secondary font-medium">art. 46 do CDC</strong>, todas as condições desta oferta estão descritas de forma clara nesta página. Você sabe exatamente o que está adquirindo antes de comprar.
              </p>
            </div>
          </div>
        </R>
      </div>
    </section>
  );
}

/* ════════════════════════════════════════════
   QUALIFICAÇÃO
   ════════════════════════════════════════════ */
function QualificationSection() {
  const yes = [
    "Quer entender POR QUE repete os mesmos erros financeiros",
    "Está disposta a olhar para dentro antes de olhar para a planilha",
    "Quer sair do ciclo de culpa e ansiedade com dinheiro",
    "Busca uma transformação real, não uma receita mágica",
    "Quer construir uma relação saudável com dinheiro para a vida toda",
  ];
  const no = [
    "Busca fórmula de dinheiro fácil ou rápido",
    "Não está disposta a questionar crenças e hábitos antigos",
    "Quer apenas mais uma planilha ou app de controle",
    "Não vai dedicar tempo para assistir e aplicar o conteúdo",
    "Prefere terceirizar responsabilidade em vez de assumir o controle",
  ];

  return (
    <section className="relative section-pad overflow-hidden scroll-mt-[88px]">
      <div className="absolute inset-0 bg-bg-base" />
      <div className="divider-gold absolute top-0 inset-x-0" />

      <div className="relative z-10 section-container max-w-[960px]">
        <R><Eyebrow>Esse método é para você?</Eyebrow></R>
        <R d={0.06}>
          <h2 className="heading-section text-center mb-12">
            O Vida Rica não é para todo mundo.
          </h2>
        </R>

        <div className="grid md:grid-cols-2 gap-5">
          <R d={0.12}>
            <div className="qual-yes p-6 sm:p-7 h-full">
              <p className="text-gold text-xs font-bold tracking-[0.2em] uppercase mb-5">&#10003; É para você se</p>
              <div className="space-y-4">
                {yes.map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <Check />
                    <p className="text-text-secondary text-sm leading-relaxed">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </R>

          <R d={0.18}>
            <div className="qual-no p-6 sm:p-7 h-full">
              <p className="text-text-muted text-xs font-bold tracking-[0.2em] uppercase mb-5">&#10005; Não é para você se</p>
              <div className="space-y-4">
                {no.map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="shrink-0 w-5 h-5 rounded-full bg-white/[0.04] flex items-center justify-center mt-0.5">
                      <span className="text-text-muted text-[10px]">&#10005;</span>
                    </div>
                    <p className="text-text-muted text-sm leading-relaxed">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </R>
        </div>

        <R d={0.24}>
          <p className="text-center text-text-secondary text-base mt-10 font-display italic">
            Se você se identificou com a coluna da esquerda — esse treinamento foi feito para você.
          </p>
        </R>
      </div>
    </section>
  );
}

/* ════════════════════════════════════════════
   DADOS DE MERCADO (oculto)
   ════════════════════════════════════════════ */
function MarketDataSection() {
  if (!MOSTRAR_ESTATISTICAS) return null;

  const stats = [
    { number: "78%", label: "das famílias brasileiras terminam o mês sem sobrar dinheiro", source: "SPC Brasil / CNDL" },
    { number: "67M+", label: "de brasileiros estão endividados atualmente", source: "Serasa Experian" },
    { number: "58%", label: "dos brasileiros não fazem nenhum tipo de controle financeiro", source: "SPC Brasil" },
    { number: "48%", label: "das pessoas gastam mais do que ganham por impulso emocional", source: "CNDL / SPC Brasil" },
  ];

  return (
    <section className="relative section-pad overflow-hidden scroll-mt-[88px]">
      <div className="absolute inset-0 bg-gradient-to-b from-bg-base via-bg-sunken to-bg-base" />
      <div className="divider-gold absolute top-0 inset-x-0" />
      <div className="relative z-10 section-container max-w-[1100px]">
        <R><Eyebrow>O cenário real</Eyebrow></R>
        <R d={0.06}>
          <h2 className="heading-section text-center mb-14">
            O movimento já está acontecendo.{" "}
            <span className="gold-text">O risco é ficar de fora.</span>
          </h2>
        </R>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {stats.map((s, i) => (
            <R key={i} d={0.12 + i * 0.06}>
              <div className="glass-card p-6 text-center h-full">
                <p className="font-display text-4xl sm:text-5xl font-bold gold-text mb-3">{s.number}</p>
                <p className="text-text-secondary text-sm leading-relaxed mb-3">{s.label}</p>
                <p className="text-text-muted text-[10px] tracking-wider uppercase">Fonte: {s.source}</p>
              </div>
            </R>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ════════════════════════════════════════════
   FAQ
   ════════════════════════════════════════════ */
function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className={`border-b border-white/[0.05] transition-colors duration-300 ${open ? "bg-white/[0.015] -mx-4 px-4 rounded-xl border-transparent" : ""}`}>
      <button onClick={() => setOpen(!open)} className="w-full flex items-center justify-between py-5 sm:py-6 text-left cursor-pointer group focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold">
        <span className="text-text-secondary text-sm sm:text-[15px] pr-6 group-hover:text-text-primary transition-colors duration-300 font-medium">{q}</span>
        <motion.span
          animate={{ rotate: open ? 45 : 0 }}
          transition={{ duration: 0.2 }}
          className="text-gold text-xl shrink-0 leading-none font-light"
        >
          +
        </motion.span>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3, ease: EASE }} className="overflow-hidden">
            <p className="text-text-muted text-sm leading-relaxed pb-5 sm:pb-6 pr-10">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function FaqSection() {
  const faqs = [
    { q: "Preciso entender de finanças para fazer o treinamento?", a: "Não. O Vida Rica foi criado para pessoas comuns, sem termos complicados. A linguagem é simples, prática e direta. Se você sabe o que é uma conta de luz, sabe o suficiente para começar." },
    { q: "Já fiz outros cursos de finanças e não funcionou. Por que esse seria diferente?", a: "Porque outros cursos focam em planilha e números. O Vida Rica começa pelo comportamento — a raiz do problema. Não adianta saber COMO organizar se você não entende POR QUE desorganiza." },
    { q: "Estou endividada. Isso serve pra mim?", a: "Especialmente para você. O treinamento te ajuda a entender os comportamentos que criaram as dívidas — e te dá o caminho para sair desse ciclo sem culpa e com estratégia." },
    { q: "Não tenho tempo. Consigo acompanhar?", a: "As aulas são curtas e você assiste no seu ritmo, de qualquer dispositivo. Com 20 minutos por dia você consegue avançar. E o acesso é por 1 ano inteiro." },
    { q: "E se não funcionar pra mim?", a: "Você tem 7 dias de garantia conforme o art. 49 do Código de Defesa do Consumidor. Se dentro desse prazo você decidir que não é para você, solicite o reembolso integral pelo e-mail ou WhatsApp." },
    { q: "É só mais um curso motivacional sobre dinheiro?", a: "Não. O Vida Rica é baseado em ciência — finanças comportamentais, neurociência e economia. É sobre entender como seu cérebro toma decisões financeiras e reprogramar padrões reais." },
    { q: "Por quanto tempo tenho acesso ao conteúdo?", a: "Você terá 1 ano de acesso completo a todas as aulas e materiais, a partir do momento da compra." },
    { q: "Quais as formas de pagamento?", a: "Pix (acesso imediato), cartão de crédito (acesso imediato) e boleto bancário (acesso após compensação, geralmente 1-2 dias úteis)." },
  ];

  return (
    <section className="relative section-pad overflow-hidden scroll-mt-[88px]" id="duvidas">
      <div className="absolute inset-0 bg-gradient-to-b from-bg-base via-bg-sunken to-bg-base" />
      <div className="divider-gold absolute top-0 inset-x-0" />

      <div className="relative z-10 section-container max-w-[680px]">
        <R><Eyebrow>Dúvidas frequentes</Eyebrow></R>
        <R d={0.06}>
          <h2 className="heading-section text-center mb-12">
            Ainda tem alguma dúvida?
          </h2>
        </R>

        <div>
          {faqs.map((f, i) => (
            <R key={i} d={0.08 + i * 0.02}>
              <FaqItem q={f.q} a={f.a} />
            </R>
          ))}
        </div>

        <R d={0.3}>
          <div className="text-center mt-10 space-y-5">
            <a href={KIWIFY} target="_blank" rel="noopener noreferrer" className="cta-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold">
              {CTA_TEXT} <Arrow />
            </a>
            <div>
              <a href={WA_LINK} onClick={() => trackContact("whatsapp_faq")} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-text-muted hover:text-green-400 text-sm transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-400">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
                Ou fale diretamente pelo WhatsApp
              </a>
            </div>
          </div>
        </R>
      </div>
    </section>
  );
}

/* ════════════════════════════════════════════
   BIFURCAÇÃO FINAL
   ════════════════════════════════════════════ */
function BifurcationSection() {
  return (
    <section className="relative py-24 sm:py-32 overflow-hidden scroll-mt-[88px]">
      <div className="absolute inset-0 bg-gradient-to-t from-bg-base via-bg-elevated/30 to-bg-base" />
      <div className="glow-gold" style={{ top: "50%", left: "50%", transform: "translate(-50%,-50%)" }} />
      <div className="divider-gold absolute top-0 inset-x-0" />

      <div className="relative z-10 section-container max-w-[960px]">
        <R>
          <h2 className="font-display text-[clamp(1.6rem,4.5vw,3rem)] font-bold text-center mb-4 leading-[1.1] text-text-primary">
            Daqui a um ano, você vai desejar ter{" "}
            <span className="gold-text">começado hoje.</span>
          </h2>
        </R>
        <R d={0.06}>
          <p className="text-text-muted text-center text-base sm:text-lg mb-12 max-w-md mx-auto">
            Você tem duas opções agora. Nenhuma é neutra.
          </p>
        </R>

        <div className="grid md:grid-cols-2 gap-5 mb-12">
          <R d={0.12}>
            <div className="qual-no p-6 sm:p-7 h-full">
              <p className="text-text-muted text-xs font-bold tracking-[0.2em] uppercase mb-4">Opção 1 — Fechar esta página</p>
              <div className="space-y-3 text-text-muted text-sm leading-relaxed">
                <p>Continuar fazendo o que sempre fez.</p>
                <p>Daqui a 12 meses, o dinheiro ainda vai sumir sem explicação.</p>
                <p>A culpa, a vergonha e a ansiedade continuam no mesmo lugar.</p>
                <p className="italic opacity-60">Nada muda se nada muda.</p>
              </div>
            </div>
          </R>

          <R d={0.18}>
            <div className="gold-border-card p-6 sm:p-7 h-full">
              <p className="text-gold text-xs font-bold tracking-[0.2em] uppercase mb-4">Opção 2 — Entrar no Vida Rica</p>
              <div className="space-y-3 text-text-secondary text-sm leading-relaxed">
                <p>Entender de verdade por que você age assim com dinheiro.</p>
                <p>Quebrar os padrões que se repetem há anos — talvez há gerações.</p>
                <p>Daqui a 12 meses, olhar para trás e não se reconhecer.</p>
                <p className="font-medium text-text-primary">Uma decisão. Um clique. Uma vida diferente.</p>
              </div>
            </div>
          </R>
        </div>

        <R d={0.24}>
          <div className="text-center">
            <a href={KIWIFY} target="_blank" rel="noopener noreferrer" className="cta-primary text-[15px] px-10 py-5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold">
              QUERO COMEÇAR AGORA <Arrow />
            </a>
            <p className="text-text-muted text-xs mt-5">
              R$ 97,00 &middot; Acesso imediato &middot; Garantia de 7 dias &middot; 1 ano de conteúdo
            </p>
          </div>
        </R>
      </div>
    </section>
  );
}

/* ════════════════════════════════════════════
   FOOTER
   ════════════════════════════════════════════ */
function Footer() {
  return (
    <footer className="relative py-14 border-t border-white/[0.04]">
      <div className="section-container">
        <div className="flex flex-col items-center text-center">
          <Image src="/images/logo.png" alt="Vida Rica" width={110} height={40} className="h-8 w-auto mb-6 opacity-70" />

          <p className="text-text-muted text-xs mb-5">
            Deyllane Lacerda &middot; Economista &middot; Contadora &middot; Especialista em Finanças Comportamentais
          </p>

          <div className="flex flex-wrap justify-center gap-x-6 gap-y-3 mb-6 text-text-muted text-xs">
            <a href={INSTA} onClick={() => trackContact("instagram_rodape")} target="_blank" rel="noopener noreferrer" className="hover:text-lilac transition-colors flex items-center gap-1.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold">
              <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" /></svg>
              @lacerdadeyllane
            </a>
            <a href={WA_LINK} onClick={() => trackContact("whatsapp_rodape")} target="_blank" rel="noopener noreferrer" className="hover:text-green-400 transition-colors flex items-center gap-1.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold">
              <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
              (98) 98567-9867
            </a>
            <a href="mailto:dey.lacerda82@gmail.com" onClick={() => trackContact("email_rodape")} className="hover:text-gold transition-colors flex items-center gap-1.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
              dey.lacerda82@gmail.com
            </a>
          </div>

          <div className="divider-gold w-full mb-6" />

          <div className="max-w-2xl text-center mb-4">
            <p className="text-text-muted/60 text-[10px] leading-relaxed">
              <strong className="text-text-muted/80">Aviso legal:</strong> Os resultados apresentados nesta página são ilustrativos e podem variar de pessoa para pessoa. O treinamento Vida Rica oferece conhecimento e ferramentas, mas os resultados dependem da dedicação e aplicação individual de cada aluno. Este produto não garante resultados financeiros específicos. Ao adquirir, você concorda com os termos de uso da plataforma Kiwify.
            </p>
          </div>

          <p className="text-text-muted/30 text-[11px]">
            &copy; {new Date().getFullYear()} Vida Rica. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}

/* ════════════════════════════════════════════
   PAGE
   ════════════════════════════════════════════ */
export default function Home() {
  return (
    <main className="bg-bg-base pb-20 lg:pb-0">
      <Header />
      <Hero />
      <PainSection />
      <SegmentationSection />
      <MentorSection />
      <MethodSection />
      <ComparisonSection />
      <TestimonialsSection />
      <OfferSection />
      <TrustAndGuaranteeSection />
      <QualificationSection />
      <MarketDataSection />
      <FaqSection />
      <BifurcationSection />
      <Footer />
      <MobileCta />
    </main>
  );
}
