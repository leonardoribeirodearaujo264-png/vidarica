"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type ReactNode } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useInView,
  AnimatePresence,
} from "framer-motion";

const KIWIFY = "https://pay.kiwify.com.br/COIbRyc";
type Ease = [number, number, number, number];
const EASE: Ease = [0.16, 1, 0.3, 1];

/* ════════════  REVEAL  ════════════ */
function R({
  children,
  className = "",
  d = 0,
  y = 30,
}: {
  children: ReactNode;
  className?: string;
  d?: number;
  y?: number;
}) {
  const ref = useRef(null);
  const v = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y }}
      animate={v ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: d, ease: EASE }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ════════════════════════════════════════════════════════════
   1. HEADER — Navigation + CTA
   ════════════════════════════════════════════════════════════ */
function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, []);

  useEffect(() => {
    document.body.classList.toggle("mobile-menu-open", menuOpen);
    return () => document.body.classList.remove("mobile-menu-open");
  }, [menuOpen]);

  const links = [
    { label: "Método", href: "#metodo" },
    { label: "Sobre", href: "#sobre" },
    { label: "Benefícios", href: "#beneficios" },
    { label: "Dúvidas", href: "#duvidas" },
  ];

  const close = () => setMenuOpen(false);

  return (
    <>
      <motion.header
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-[#060606]/92 backdrop-blur-xl shadow-[0_1px_0_rgba(255,255,255,0.04)]"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-[1280px] mx-auto px-5 sm:px-8 flex items-center justify-between h-[72px]">
          {/* Logo */}
          <a href="#" onClick={close}>
            <Image
              src="/images/logo.png"
              alt="Vida Rica"
              width={120}
              height={40}
              className="h-8 sm:h-9 w-auto"
              priority
            />
          </a>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-8">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="text-[13px] text-[#999] hover:text-white transition-colors duration-300 tracking-wide"
              >
                {l.label}
              </a>
            ))}
            <a
              href={KIWIFY}
              target="_blank"
              rel="noopener noreferrer"
              className="ml-4 text-[13px] font-semibold text-[#0a0a0a] bg-gradient-to-r from-[#C9A84C] to-[#E8D48B] px-6 py-2.5 rounded-md hover:shadow-lg hover:shadow-[#C9A84C]/20 transition-all duration-300"
            >
              Quero começar
            </a>
          </nav>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="lg:hidden flex flex-col gap-[5px] p-2 cursor-pointer"
            aria-label="Menu"
          >
            <span className={`block w-5 h-[1.5px] bg-white transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-[6.5px]" : ""}`} />
            <span className={`block w-5 h-[1.5px] bg-white transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`} />
            <span className={`block w-5 h-[1.5px] bg-white transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-[6.5px]" : ""}`} />
          </button>
        </div>
      </motion.header>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-[#060606]/98 backdrop-blur-2xl flex flex-col items-center justify-center gap-8"
          >
            {links.map((l, i) => (
              <motion.a
                key={l.href}
                href={l.href}
                onClick={close}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + i * 0.08, duration: 0.4 }}
                className="text-xl text-white/80 hover:text-[#C9A84C] transition-colors"
              >
                {l.label}
              </motion.a>
            ))}
            <motion.a
              href={KIWIFY}
              target="_blank"
              rel="noopener noreferrer"
              onClick={close}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.4 }}
              className="cta-primary mt-4"
            >
              Quero começar agora
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

/* ════════════════════════════════════════════════════════════
   2. HERO — Sells in the first 5 seconds
   ════════════════════════════════════════════════════════════ */
function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], [0, 80]);

  return (
    <section ref={ref} className="relative min-h-screen flex items-center overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute top-[-15%] right-[-5%] w-[500px] h-[500px] bg-[#9B72CF]/[0.05] rounded-full blur-[180px] pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[10%] w-[400px] h-[400px] bg-[#C9A84C]/[0.04] rounded-full blur-[150px] pointer-events-none" />

      <div className="relative z-10 max-w-[1280px] mx-auto px-5 sm:px-8 w-full pt-28 sm:pt-32 pb-16 sm:pb-20">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Text column */}
          <div className="order-2 lg:order-1">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="inline-flex items-center gap-2 bg-white/[0.04] border border-white/[0.06] rounded-full px-4 py-1.5 mb-8"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#C9A84C] animate-pulse" />
              <span className="text-[11px] text-[#999] tracking-wide">
                Treinamento 100% online · Acesso imediato
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.5, ease: EASE }}
              className="font-display text-[2.2rem] sm:text-[2.8rem] md:text-[3.4rem] lg:text-[3.8rem] xl:text-[4.2rem] font-bold leading-[1.08] tracking-[-0.02em] mb-6"
            >
              Por que você ganha dinheiro e{" "}
              <span className="gold-text">ainda se sente preso?</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8, ease: EASE }}
              className="text-[#999] text-base sm:text-lg leading-relaxed max-w-[520px] mb-10"
            >
              Descubra como seus padrões emocionais controlam cada decisão
              financeira — e aprenda a pensar, decidir e agir diferente com
              o dinheiro.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.1, ease: EASE }}
              className="flex flex-col sm:flex-row items-start sm:items-center gap-5"
            >
              <a href={KIWIFY} target="_blank" rel="noopener noreferrer" className="cta-primary">
                Quero transformar minha vida financeira
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
              <span className="text-[#666] text-xs">
                Por apenas <strong className="text-[#C9A84C]">R$ 97</strong>
              </span>
            </motion.div>
          </div>

          {/* Photo column */}
          <motion.div
            className="order-1 lg:order-2 flex justify-center"
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, delay: 0.3, ease: EASE }}
            style={{ y: imgY }}
          >
            <div className="relative w-full max-w-[380px] sm:max-w-[400px]">
              <div className="absolute -inset-6 bg-gradient-to-br from-[#9B72CF]/[0.08] via-[#C9A84C]/[0.04] to-transparent rounded-2xl blur-2xl pointer-events-none" />
              <div className="relative overflow-hidden rounded-xl border border-white/[0.06]">
                <Image
                  src="/images/hero-photo.jpeg"
                  alt="Deyllane Lacerda — Mentora de Finanças e Negócios"
                  width={400}
                  height={530}
                  className="w-full h-auto object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#060606]/70 via-transparent to-transparent" />
                <div className="absolute bottom-0 inset-x-0 p-5">
                  <p className="font-display text-white text-lg font-semibold">Deyllane Lacerda</p>
                  <p className="text-[#C9A84C] text-[10px] tracking-[0.2em] uppercase mt-0.5">
                    Mentora de Finanças e Negócios
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 hidden sm:flex flex-col items-center gap-2"
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="w-[1px] h-6 bg-gradient-to-b from-[#C9A84C]/50 to-transparent"
        />
      </motion.div>
    </section>
  );
}

/* ════════════════════════════════════════════════════════════
   3. PROBLEMA — Emotional connection
   ════════════════════════════════════════════════════════════ */
function ProblemSection() {
  const pains = [
    { icon: "💸", text: "Dinheiro entra e some — você não sabe para onde vai" },
    { icon: "🛍️", text: "Compra por impulso para aliviar ansiedade ou frustração" },
    { icon: "😰", text: "Sente culpa, medo ou vergonha ao pensar em dinheiro" },
    { icon: "🔄", text: "Repete os mesmos padrões financeiros da sua família" },
    { icon: "📉", text: "Não consegue construir uma reserva, mesmo trabalhando muito" },
  ];

  return (
    <section className="relative py-20 sm:py-28 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#060606] via-[#0a0a0a] to-[#060606]" />
      <div className="divider-gold absolute top-0 inset-x-0" />

      <div className="relative z-10 max-w-[900px] mx-auto px-5 sm:px-8">
        <R>
          <p className="text-[#C9A84C] text-[11px] font-semibold tracking-[0.25em] uppercase mb-4 text-center">
            Você se identifica?
          </p>
        </R>

        <R d={0.1}>
          <h2 className="font-display text-[1.7rem] sm:text-3xl md:text-4xl lg:text-[2.8rem] font-bold text-center leading-tight mb-4">
            Você não tem apenas um problema
            <br className="hidden sm:block" /> com dinheiro.{" "}
            <span className="gold-text">Você tem padrões.</span>
          </h2>
        </R>

        <R d={0.2}>
          <p className="text-[#888] text-center text-base sm:text-lg max-w-2xl mx-auto mb-14">
            A maioria das pessoas acredita que o problema é ganhar pouco. Mas a verdade
            é que o dinheiro reflete os seus comportamentos — não o seu salário.
          </p>
        </R>

        <div className="space-y-3">
          {pains.map((p, i) => (
            <R key={i} d={0.25 + i * 0.08}>
              <div className="glass-card flex items-center gap-4 sm:gap-5 px-5 sm:px-7 py-5">
                <span className="text-xl sm:text-2xl shrink-0">{p.icon}</span>
                <p className="text-[#ccc] text-[14px] sm:text-[15px] leading-relaxed">{p.text}</p>
              </div>
            </R>
          ))}
        </div>

        <R d={0.7}>
          <div className="mt-14 relative pl-6 border-l-2 border-[#C9A84C]/30">
            <p className="font-display text-lg sm:text-xl text-white/80 italic leading-relaxed">
              &ldquo;O problema não é quanto dinheiro entra.
              É o <span className="not-italic gold-text font-semibold">comportamento invisível</span> que
              controla o que você faz com ele.&rdquo;
            </p>
          </div>
        </R>
      </div>
    </section>
  );
}

/* ════════════════════════════════════════════════════════════
   4. MÉTODO — Elegant cards with descriptions
   ════════════════════════════════════════════════════════════ */
function MethodSection() {
  const pillars = [
    {
      n: "01",
      title: "Finanças Comportamentais",
      desc: "Entenda como emoções e crenças inconscientes sabotam cada decisão financeira que você toma.",
    },
    {
      n: "02",
      title: "Mentalidade Financeira",
      desc: "Reprograme a forma como você pensa sobre dinheiro, riqueza e prosperidade.",
    },
    {
      n: "03",
      title: "Neurociência Aplicada",
      desc: "Descubra como o cérebro processa escolhas e aprenda a criar novos hábitos financeiros.",
    },
    {
      n: "04",
      title: "Organização Prática",
      desc: "Ferramentas e estratégias reais para organizar sua vida financeira no dia a dia.",
    },
  ];

  return (
    <section className="relative py-20 sm:py-28 overflow-hidden" id="metodo">
      <div className="absolute inset-0 bg-[#060606]" />
      <div className="divider-gold absolute top-0 inset-x-0" />

      <div className="relative z-10 max-w-[1100px] mx-auto px-5 sm:px-8">
        <R>
          <p className="text-[#C9A84C] text-[11px] font-semibold tracking-[0.25em] uppercase mb-4 text-center">
            O Método Vida Rica
          </p>
        </R>

        <R d={0.1}>
          <h2 className="font-display text-[1.7rem] sm:text-3xl md:text-4xl font-bold text-center leading-tight mb-4">
            Não é um curso. É um{" "}
            <span className="gold-text">sistema de transformação.</span>
          </h2>
        </R>

        <R d={0.2}>
          <p className="text-[#888] text-center text-base sm:text-lg max-w-2xl mx-auto mb-14">
            O Vida Rica une ciência do comportamento e estratégia financeira
            para mudar sua relação com dinheiro de dentro para fora.
          </p>
        </R>

        <div className="grid sm:grid-cols-2 gap-4">
          {pillars.map((p, i) => (
            <R key={i} d={0.25 + i * 0.1}>
              <div className="glass-card p-6 sm:p-8 h-full">
                <span className="text-[#C9A84C]/30 font-display text-3xl font-bold">{p.n}</span>
                <h3 className="text-white font-semibold text-base sm:text-lg mt-3 mb-2">{p.title}</h3>
                <p className="text-[#888] text-sm leading-relaxed">{p.desc}</p>
              </div>
            </R>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ════════════════════════════════════════════════════════════
   5. TRANSFORMAÇÃO — Before / After with icons
   ════════════════════════════════════════════════════════════ */
function TransformSection() {
  const before = [
    { icon: "😟", label: "Confusão financeira" },
    { icon: "😰", label: "Medo e ansiedade com dinheiro" },
    { icon: "🎯", label: "Descontrole nos gastos" },
    { icon: "😔", label: "Culpa ao gastar ou investir" },
  ];
  const after = [
    { icon: "✨", label: "Clareza nas decisões" },
    { icon: "📊", label: "Estratégia e planejamento" },
    { icon: "🛡️", label: "Segurança financeira" },
    { icon: "🚀", label: "Mentalidade de prosperidade" },
  ];

  return (
    <section className="relative py-20 sm:py-28 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#060606] via-[#0a0808] to-[#060606]" />
      <div className="divider-lilac absolute top-0 inset-x-0" />

      <div className="relative z-10 max-w-[1000px] mx-auto px-5 sm:px-8">
        <R>
          <p className="text-[#9B72CF] text-[11px] font-semibold tracking-[0.25em] uppercase mb-4 text-center">
            Sua transformação
          </p>
        </R>
        <R d={0.1}>
          <h2 className="font-display text-[1.7rem] sm:text-3xl md:text-4xl font-bold text-center leading-tight mb-14">
            De uma relação confusa para uma vida financeira{" "}
            <span className="gold-text">consciente e próspera.</span>
          </h2>
        </R>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Before */}
          <R d={0.2}>
            <div className="glass-card p-6 sm:p-8 border-t-2 border-red-500/20 hover:border-red-500/30">
              <p className="text-red-400/70 text-[10px] font-semibold tracking-[0.25em] uppercase mb-6">Antes</p>
              <div className="space-y-5">
                {before.map((item, i) => (
                  <div key={i} className="flex items-center gap-4">
                    <span className="text-lg">{item.icon}</span>
                    <p className="text-[#888] text-sm sm:text-[15px]">{item.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </R>

          {/* After */}
          <R d={0.35}>
            <div className="glass-card p-6 sm:p-8 border-t-2 border-[#C9A84C]/30 hover:border-[#C9A84C]/50">
              <p className="text-[#C9A84C] text-[10px] font-semibold tracking-[0.25em] uppercase mb-6">
                Depois do Vida Rica
              </p>
              <div className="space-y-5">
                {after.map((item, i) => (
                  <div key={i} className="flex items-center gap-4">
                    <span className="text-lg">{item.icon}</span>
                    <p className="text-white/90 text-sm sm:text-[15px] font-medium">{item.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </R>
        </div>
      </div>
    </section>
  );
}

/* ════════════════════════════════════════════════════════════
   6. MENTORA — Editorial authority
   ════════════════════════════════════════════════════════════ */
function MentorSection() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], [-30, 30]);

  return (
    <section ref={ref} className="relative py-20 sm:py-28 overflow-hidden" id="sobre">
      <div className="absolute inset-0 bg-[#060606]" />
      <div className="divider-gold absolute top-0 inset-x-0" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-[#C9A84C]/[0.02] rounded-full blur-[180px] pointer-events-none" />

      <div className="relative z-10 max-w-[1100px] mx-auto px-5 sm:px-8">
        <div className="grid lg:grid-cols-[1fr_1.1fr] gap-12 lg:gap-20 items-center">
          {/* Photo */}
          <R y={0}>
            <motion.div style={{ y: imgY }} className="relative">
              <div className="absolute -inset-3 bg-gradient-to-br from-[#C9A84C]/[0.06] to-[#9B72CF]/[0.04] rounded-xl blur-xl pointer-events-none" />
              <div className="relative overflow-hidden rounded-xl border border-white/[0.06]">
                <Image
                  src="/images/about-photo.jpeg"
                  alt="Deyllane Lacerda"
                  width={560}
                  height={750}
                  className="w-full h-auto object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#060606]/30 via-transparent to-transparent" />
              </div>
            </motion.div>
          </R>

          {/* Bio */}
          <div>
            <R><p className="text-[#C9A84C] text-[11px] font-semibold tracking-[0.25em] uppercase mb-4">Sua Mentora</p></R>

            <R d={0.1}>
              <h2 className="font-display text-3xl sm:text-4xl lg:text-[2.8rem] font-bold mb-2 tracking-tight">
                Deyllane Lacerda
              </h2>
            </R>

            <R d={0.18}>
              <p className="text-[#C9A84C] text-xs tracking-[0.15em] uppercase mb-8">
                Economista · Contadora · Especialista em Finanças Comportamentais
              </p>
            </R>

            <R d={0.25}>
              <p className="text-[#999] text-[15px] leading-[1.8] mb-5">
                Especialista em transformar a forma como pessoas{" "}
                <span className="text-white font-medium">pensam, sentem e decidem</span> sobre
                dinheiro. Ao longo da sua trajetória, percebeu que problemas financeiros
                raramente são sobre falta de conhecimento — são sobre padrões emocionais e
                comportamentais que se repetem sem consciência.
              </p>
            </R>

            <R d={0.32}>
              <p className="text-[#999] text-[15px] leading-[1.8] mb-8">
                Unindo formação técnica à compreensão profunda do comportamento humano,
                desenvolveu o <span className="gold-text font-semibold">Vida Rica</span>: um método
                para ajudar pessoas a construírem uma vida financeira consciente e próspera.
              </p>
            </R>

            <R d={0.4}>
              <div className="py-6 border-t border-b border-white/[0.05] mb-6">
                <p className="font-display text-base sm:text-lg text-white/70 italic leading-relaxed">
                  &ldquo;Uma Vida Rica não começa quando você ganha mais. Começa quando você
                  aprende a <span className="not-italic gold-text font-semibold">pensar, decidir e agir diferente</span> com
                  o dinheiro.&rdquo;
                </p>
              </div>
            </R>

            <R d={0.48}>
              <a
                href="https://instagram.com/lacerdadeyllane"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-[#888] hover:text-[#B794E0] transition-colors text-sm"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
                @lacerdadeyllane
              </a>
            </R>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ════════════════════════════════════════════════════════════
   7. BENEFÍCIOS — Commercial copy
   ════════════════════════════════════════════════════════════ */
function BenefitsSection() {
  const items = [
    "Identificar os comportamentos que sabotam seu dinheiro",
    "Quebrar os padrões financeiros negativos da sua família",
    "Tomar decisões com clareza — sem culpa e sem impulso",
    "Criar um plano real para sair do ciclo de dívidas",
    "Organizar sua vida financeira de forma prática e simples",
    "Desenvolver uma mentalidade próspera e sustentável",
    "Entender seus gatilhos emocionais de consumo",
    "Construir uma relação saudável e consciente com dinheiro",
  ];

  return (
    <section className="relative py-20 sm:py-28 overflow-hidden" id="beneficios">
      <div className="absolute inset-0 bg-gradient-to-b from-[#060606] via-[#080808] to-[#060606]" />
      <div className="divider-gold absolute top-0 inset-x-0" />

      <div className="relative z-10 max-w-[800px] mx-auto px-5 sm:px-8">
        <R>
          <p className="text-[#C9A84C] text-[11px] font-semibold tracking-[0.25em] uppercase mb-4 text-center">
            O que você conquista
          </p>
        </R>
        <R d={0.1}>
          <h2 className="font-display text-[1.7rem] sm:text-3xl md:text-4xl font-bold text-center leading-tight mb-4">
            Você vai aprender a...
          </h2>
        </R>
        <R d={0.18}>
          <p className="text-[#888] text-center text-base max-w-xl mx-auto mb-12">
            Muito mais do que teoria — são mudanças reais que você vai sentir
            na sua vida e no seu bolso.
          </p>
        </R>

        <div className="grid sm:grid-cols-2 gap-x-6 gap-y-0">
          {items.map((b, i) => (
            <R key={i} d={0.2 + i * 0.06}>
              <div className="flex items-start gap-4 py-4 border-b border-white/[0.04] group">
                <div className="shrink-0 w-5 h-5 rounded-full bg-gradient-to-br from-[#C9A84C] to-[#E8D48B] flex items-center justify-center mt-0.5">
                  <svg className="w-3 h-3 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7"/>
                  </svg>
                </div>
                <p className="text-[#bbb] text-sm leading-relaxed group-hover:text-white transition-colors duration-300">{b}</p>
              </div>
            </R>
          ))}
        </div>

        <R d={0.7}>
          <div className="text-center mt-14">
            <a href={KIWIFY} target="_blank" rel="noopener noreferrer" className="cta-primary">
              Quero começar minha transformação
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3"/>
              </svg>
            </a>
          </div>
        </R>
      </div>
    </section>
  );
}

/* ════════════════════════════════════════════════════════════
   8. OFERTA — Premium pricing with value stack
   ════════════════════════════════════════════════════════════ */
function OfferSection() {
  const included = [
    "Acesso completo ao treinamento Vida Rica",
    "Aulas sobre finanças comportamentais e mentalidade",
    "Estratégias práticas de organização financeira",
    "Conteúdo sobre neurociência e tomada de decisão",
    "Acesso por 1 ano completo ao conteúdo",
    "Assista de qualquer dispositivo, a qualquer hora",
  ];

  return (
    <section className="relative py-20 sm:py-28 overflow-hidden" id="oferta">
      <div className="absolute inset-0 bg-[#060606]" />
      <div className="divider-gold absolute top-0 inset-x-0" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#C9A84C]/[0.02] rounded-full blur-[200px] pointer-events-none" />

      <div className="relative z-10 max-w-[640px] mx-auto px-5 sm:px-8">
        <R><p className="text-[#C9A84C] text-[11px] font-semibold tracking-[0.25em] uppercase mb-4 text-center">Investimento</p></R>

        <R d={0.1}>
          <h2 className="font-display text-[1.7rem] sm:text-3xl md:text-4xl font-bold text-center leading-tight mb-12">
            Tudo isso por um valor que{" "}
            <span className="gold-text">cabe no seu bolso.</span>
          </h2>
        </R>

        <R d={0.2}>
          <div className="glass-card p-8 sm:p-10 border-[#C9A84C]/10 text-center">
            {/* Logo */}
            <Image src="/images/logo.png" alt="Vida Rica" width={100} height={36} className="h-7 w-auto mx-auto mb-6" />

            {/* Value stack */}
            <div className="space-y-3 text-left mb-8">
              {included.map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <svg className="w-4 h-4 text-[#C9A84C] shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7"/>
                  </svg>
                  <p className="text-[#ccc] text-sm">{item}</p>
                </div>
              ))}
            </div>

            <div className="divider-gold my-8" />

            {/* Price */}
            <p className="text-[#888] text-xs tracking-[0.15em] uppercase mb-3">Por apenas</p>
            <div className="flex items-baseline justify-center gap-1 mb-2">
              <span className="text-[#C9A84C] text-lg">R$</span>
              <span className="font-display text-6xl sm:text-7xl font-bold gold-text leading-none">97</span>
            </div>
            <p className="text-[#666] text-xs mb-8">Pagamento único · Acesso por 1 ano</p>

            {/* Payment methods */}
            <div className="flex justify-center gap-6 mb-8 text-[#777] text-xs tracking-wider">
              <span>Pix</span>
              <span className="text-[#333]">·</span>
              <span>Cartão</span>
              <span className="text-[#333]">·</span>
              <span>Boleto</span>
            </div>

            {/* CTA */}
            <a
              href={KIWIFY}
              target="_blank"
              rel="noopener noreferrer"
              className="cta-primary w-full justify-center text-[15px]"
            >
              Começar minha transformação financeira
            </a>

            {/* Security */}
            <div className="flex items-center justify-center gap-2 mt-5 text-[#666] text-[11px]">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
              </svg>
              Compra 100% segura · Plataforma Kiwify
            </div>
          </div>
        </R>
      </div>
    </section>
  );
}

/* ════════════════════════════════════════════════════════════
   9. GARANTIA — Professional security block
   ════════════════════════════════════════════════════════════ */
function GuaranteeSection() {
  return (
    <section className="relative py-16 sm:py-20 overflow-hidden">
      <div className="absolute inset-0 bg-[#060606]" />
      <div className="relative z-10 max-w-[700px] mx-auto px-5 sm:px-8">
        <R>
          <div className="glass-card flex flex-col sm:flex-row items-center gap-6 p-7 sm:p-10 border-[#C9A84C]/10">
            <div className="shrink-0 w-14 h-14 rounded-full bg-gradient-to-br from-[#C9A84C]/15 to-[#C9A84C]/5 flex items-center justify-center">
              <svg className="w-7 h-7 text-[#C9A84C]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
              </svg>
            </div>
            <div className="text-center sm:text-left">
              <h3 className="font-display text-lg font-semibold text-white mb-2">
                Compra protegida e segura
              </h3>
              <p className="text-[#888] text-sm leading-relaxed">
                Processada pela <strong className="text-white font-medium">Kiwify</strong>, plataforma
                líder em produtos digitais. Seus dados estão protegidos e você conta com
                garantia de satisfação conforme os termos da plataforma.
              </p>
            </div>
          </div>
        </R>
      </div>
    </section>
  );
}

/* ════════════════════════════════════════════════════════════
   10. FAQ — Objection-breaking questions
   ════════════════════════════════════════════════════════════ */
function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-white/[0.05]">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-5 sm:py-6 text-left cursor-pointer group"
      >
        <span className="text-[#ccc] text-sm sm:text-[15px] pr-6 group-hover:text-white transition-colors duration-300 font-medium">
          {q}
        </span>
        <motion.span
          animate={{ rotate: open ? 45 : 0 }}
          transition={{ duration: 0.25 }}
          className="text-[#C9A84C] text-lg shrink-0 leading-none"
        >
          +
        </motion.span>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: EASE }}
            className="overflow-hidden"
          >
            <p className="text-[#888] text-sm leading-relaxed pb-5 sm:pb-6 pr-10">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function FaqSection() {
  const faqs = [
    {
      q: "Preciso entender de finanças para fazer o treinamento?",
      a: "Não. O Vida Rica foi criado para pessoas comuns, sem termos complicados. Você vai aprender de forma prática e acessível.",
    },
    {
      q: "Serve para quem está endividado?",
      a: "Sim. O treinamento ajuda a entender os comportamentos por trás das dívidas e mostra estratégias concretas para iniciar sua mudança financeira.",
    },
    {
      q: "Por quanto tempo tenho acesso ao conteúdo?",
      a: "Você terá 1 ano de acesso completo a todas as aulas e materiais do treinamento.",
    },
    {
      q: "Posso assistir pelo celular?",
      a: "Sim! O treinamento é 100% online e funciona em qualquer dispositivo — celular, tablet ou computador.",
    },
    {
      q: "Quando começo a ter acesso?",
      a: "Imediatamente após a confirmação do pagamento. Se pagar via Pix ou cartão, o acesso é liberado na hora.",
    },
    {
      q: "O curso é apenas sobre economizar dinheiro?",
      a: "Não. O foco é transformar a relação entre sua mente, seus comportamentos e o dinheiro. É sobre reprogramar padrões — não sobre cortar cafézinho.",
    },
  ];

  return (
    <section className="relative py-20 sm:py-28 overflow-hidden" id="duvidas">
      <div className="absolute inset-0 bg-[#060606]" />
      <div className="divider-gold absolute top-0 inset-x-0" />

      <div className="relative z-10 max-w-[700px] mx-auto px-5 sm:px-8">
        <R>
          <p className="text-[#C9A84C] text-[11px] font-semibold tracking-[0.25em] uppercase mb-4 text-center">
            Dúvidas Frequentes
          </p>
        </R>
        <R d={0.1}>
          <h2 className="font-display text-[1.7rem] sm:text-3xl md:text-4xl font-bold text-center leading-tight mb-12">
            Ainda tem alguma dúvida?
          </h2>
        </R>

        <div>
          {faqs.map((f, i) => (
            <R key={i} d={0.15 + i * 0.05}>
              <FaqItem q={f.q} a={f.a} />
            </R>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ════════════════════════════════════════════════════════════
   11. CTA FINAL — Emotional close
   ════════════════════════════════════════════════════════════ */
function FinalCTA() {
  return (
    <section className="relative py-24 sm:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-t from-[#060606] via-[#0a0908] to-[#060606]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-[#C9A84C]/[0.03] rounded-full blur-[180px] pointer-events-none" />
      <div className="divider-gold absolute top-0 inset-x-0" />

      <div className="relative z-10 max-w-[700px] mx-auto px-5 sm:px-8 text-center">
        <R>
          <h2 className="font-display text-[1.8rem] sm:text-4xl md:text-5xl font-bold mb-6 leading-[1.1]">
            Sua nova relação com dinheiro começa com{" "}
            <span className="gold-text">uma decisão.</span>
          </h2>
        </R>

        <R d={0.15}>
          <p className="text-[#888] text-base sm:text-lg mb-10 max-w-lg mx-auto">
            Não espere a situação perfeita. O primeiro passo para mudar sua
            realidade financeira é decidir que você merece mais.
          </p>
        </R>

        <R d={0.3}>
          <a href={KIWIFY} target="_blank" rel="noopener noreferrer" className="cta-primary text-[15px]">
            Quero transformar minha vida financeira
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3"/>
            </svg>
          </a>
        </R>

        <R d={0.4}>
          <p className="text-[#666] text-xs mt-6">
            R$ 97,00 · Acesso imediato · 1 ano de conteúdo
          </p>
        </R>
      </div>
    </section>
  );
}

/* ════════════════════════════════════════════════════════════
   12. FOOTER
   ════════════════════════════════════════════════════════════ */
function Footer() {
  return (
    <footer className="relative py-14 border-t border-white/[0.04]">
      <div className="max-w-[1100px] mx-auto px-5 sm:px-8">
        <div className="flex flex-col items-center text-center">
          <Image src="/images/logo.png" alt="Vida Rica" width={110} height={40} className="h-8 w-auto mb-6" />

          <p className="text-[#666] text-xs mb-6">
            Deyllane Lacerda · Mentora de Finanças e Negócios
          </p>

          <div className="flex flex-wrap justify-center gap-x-6 gap-y-3 mb-8 text-[#666] text-xs">
            <a href="https://instagram.com/lacerdadeyllane" target="_blank" rel="noopener noreferrer" className="hover:text-[#9B72CF] transition-colors flex items-center gap-1.5">
              <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
              @lacerdadeyllane
            </a>
            <a href="https://wa.me/5598985679867" target="_blank" rel="noopener noreferrer" className="hover:text-green-400 transition-colors flex items-center gap-1.5">
              <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              (98) 98567-9867
            </a>
            <a href="mailto:dey.lacerda82@gmail.com" className="hover:text-[#C9A84C] transition-colors flex items-center gap-1.5">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
              dey.lacerda82@gmail.com
            </a>
          </div>

          <p className="text-[#333] text-[11px]">
            © {new Date().getFullYear()} Vida Rica. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}

/* ════════════════════════════════════════════════════════════
   PAGE
   ════════════════════════════════════════════════════════════ */
export default function Home() {
  return (
    <main className="bg-[#060606]">
      <Header />
      <Hero />
      <ProblemSection />
      <MethodSection />
      <TransformSection />
      <MentorSection />
      <BenefitsSection />
      <OfferSection />
      <GuaranteeSection />
      <FaqSection />
      <FinalCTA />
      <Footer />
    </main>
  );
}
