"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, useInView, AnimatePresence } from "framer-motion";

const KIWIFY_URL = "https://pay.kiwify.com.br/COIbRyc";

/* ═══════════════════════════════════════════════════════════
   MOTION VARIANTS
   ═══════════════════════════════════════════════════════════ */
const EASE_OUT = [0.16, 1, 0.3, 1] as const;

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (delay: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 1, delay, ease: EASE_OUT as unknown as [number, number, number, number] },
  }),
};

const fadeIn = {
  hidden: { opacity: 0 },
  visible: (delay: number = 0) => ({
    opacity: 1,
    transition: { duration: 1.2, delay, ease: "easeOut" as const },
  }),
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: (delay: number = 0) => ({
    opacity: 1,
    scale: 1,
    transition: { duration: 1, delay, ease: EASE_OUT as unknown as [number, number, number, number] },
  }),
};

/* Reveal wrapper */
function Reveal({
  children,
  className = "",
  delay = 0,
  variant = fadeUp,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  variant?: any;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      custom={delay}
      variants={variant}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════════
   HEADER — Ultra minimal, floating
   ═══════════════════════════════════════════════════════════ */
function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, []);

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.2 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
        scrolled
          ? "bg-[#050505]/90 backdrop-blur-2xl border-b border-white/[0.04]"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-[1400px] mx-auto px-8 md:px-12 flex items-center justify-between h-20">
        <Image
          src="/images/logo.png"
          alt="Vida Rica"
          width={120}
          height={43}
          className="h-9 w-auto"
          priority
        />
        <a
          href={KIWIFY_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="hidden sm:inline-flex items-center gap-2 text-[#C9A84C] text-xs font-medium tracking-[0.15em] uppercase hover:text-[#E8D48B] transition-colors duration-500"
        >
          Começar agora
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </a>
      </div>
    </motion.header>
  );
}

/* ═══════════════════════════════════════════════════════════
   1. HERO — Full viewport, cinematic
   ═══════════════════════════════════════════════════════════ */
function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const imgY = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section ref={ref} className="relative min-h-screen flex items-center overflow-hidden noise">
      {/* Ambient light */}
      <div className="absolute top-[-20%] right-[-10%] w-[800px] h-[800px] bg-[#9B72CF]/[0.04] rounded-full blur-[200px]" />
      <div className="absolute bottom-[-10%] left-[-5%] w-[600px] h-[600px] bg-[#C9A84C]/[0.03] rounded-full blur-[180px]" />

      <motion.div
        style={{ opacity: textOpacity }}
        className="relative z-10 max-w-[1400px] mx-auto px-8 md:px-12 w-full pt-32 pb-20"
      >
        <div className="grid lg:grid-cols-[1fr_0.85fr] gap-16 xl:gap-24 items-center">
          {/* Left — Text */}
          <div className="order-2 lg:order-1">
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="text-[#C9A84C] text-[11px] font-medium tracking-[0.3em] uppercase mb-8"
            >
              Treinamento online de finanças comportamentais
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="font-display text-[2.8rem] sm:text-[3.5rem] lg:text-[4.2rem] xl:text-[4.8rem] font-bold leading-[1.05] tracking-[-0.02em] mb-8"
            >
              Sua{" "}
              <span className="text-gold-gradient">Vida Rica</span>
              <br />
              começa na mente.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1, ease: [0.16, 1, 0.3, 1] }}
              className="text-[#888] text-lg sm:text-xl leading-relaxed max-w-lg mb-12 font-light"
            >
              Antes de aparecer na sua conta bancária, a prosperidade começa nos
              pensamentos, decisões e comportamentos que você repete todos os dias.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1.3, ease: [0.16, 1, 0.3, 1] }}
            >
              <a href={KIWIFY_URL} target="_blank" rel="noopener noreferrer" className="cta-gold">
                Quero transformar minha relação com dinheiro
              </a>
            </motion.div>
          </div>

          {/* Right — Photo */}
          <motion.div
            className="order-1 lg:order-2 flex justify-center lg:justify-end"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.4, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            style={{ y: imgY }}
          >
            <div className="relative max-w-[420px] w-full">
              {/* Glow behind image */}
              <div className="absolute -inset-8 bg-gradient-to-br from-[#9B72CF]/10 via-[#C9A84C]/5 to-transparent rounded-full blur-3xl" />
              <div className="relative overflow-hidden rounded-[3px]">
                <Image
                  src="/images/hero-photo.jpeg"
                  alt="Deyllane Lacerda — Mentora de Finanças e Negócios"
                  width={420}
                  height={560}
                  className="w-full h-auto object-cover"
                  priority
                />
                {/* Bottom gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent opacity-50" />
              </div>
              {/* Name strip */}
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <p className="font-display text-white text-xl font-semibold tracking-wide">
                  Deyllane Lacerda
                </p>
                <p className="text-[#C9A84C] text-[10px] tracking-[0.25em] uppercase mt-1">
                  Mentora de Finanças e Negócios
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-3"
      >
        <span className="text-[#555] text-[10px] tracking-[0.3em] uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="w-px h-8 bg-gradient-to-b from-[#C9A84C]/60 to-transparent"
        />
      </motion.div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════
   2. CONEXÃO — Narrativa emocional
   ═══════════════════════════════════════════════════════════ */
function ConnectionSection() {
  const patterns = [
    "Continua sem conseguir guardar",
    "Compra para aliviar emoções",
    "Sente culpa ao gastar",
    "Repete erros financeiros da família",
  ];

  return (
    <section className="relative py-32 sm:py-44 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#050505] via-[#080808] to-[#050505]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#9B72CF]/[0.03] rounded-full blur-[200px]" />

      <div className="relative z-10 max-w-[900px] mx-auto px-8 md:px-12">
        <Reveal>
          <p className="text-[#C9A84C] text-[11px] tracking-[0.3em] uppercase mb-8 text-center font-medium">
            A verdade que ninguém te conta
          </p>
        </Reveal>

        <Reveal delay={0.15}>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-[3.2rem] font-bold text-center leading-[1.15] tracking-[-0.01em] mb-6">
            Você não tem um problema
            <br />
            <span className="text-[#888] font-light italic">apenas</span> com dinheiro.
          </h2>
        </Reveal>

        <Reveal delay={0.3}>
          <p className="font-display text-2xl sm:text-3xl text-center text-gold-gradient font-semibold mb-20">
            Você tem padrões.
          </p>
        </Reveal>

        <Reveal delay={0.4}>
          <p className="text-[#666] text-center text-sm tracking-[0.15em] uppercase mb-12">
            Você ganha dinheiro, mas...
          </p>
        </Reveal>

        <div className="space-y-4 mb-20">
          {patterns.map((p, i) => (
            <Reveal key={i} delay={0.5 + i * 0.1}>
              <div className="flex items-center gap-6 py-5 border-b border-white/[0.04]">
                <span className="text-[#C9A84C]/40 font-display text-2xl font-light">
                  0{i + 1}
                </span>
                <p className="text-[#aaa] text-lg font-light">{p}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.9}>
          <div className="relative py-12 px-8 sm:px-14">
            <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-[#C9A84C]/30 to-transparent" />
            <p className="font-display text-xl sm:text-2xl text-white/80 italic leading-relaxed">
              &ldquo;O problema não é somente quanto dinheiro entra.
              <br />
              <span className="not-italic font-semibold text-gold-gradient">
                É o comportamento
              </span>{" "}
              que controla suas decisões.&rdquo;
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════
   3. MÉTODO — Composição elegante, sem cards
   ═══════════════════════════════════════════════════════════ */
function MethodSection() {
  const pillars = [
    "Finanças Comportamentais",
    "Neurociência",
    "Comportamento Humano",
    "Educação Financeira Prática",
  ];

  return (
    <section className="relative py-32 sm:py-44 overflow-hidden noise">
      <div className="absolute inset-0 bg-gradient-to-b from-[#050505] via-[#0a0a08] to-[#050505]" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#C9A84C]/10 to-transparent" />

      <div className="relative z-10 max-w-[1100px] mx-auto px-8 md:px-12">
        <Reveal>
          <p className="text-[#C9A84C] text-[11px] tracking-[0.3em] uppercase mb-8 text-center font-medium">
            O Método
          </p>
        </Reveal>

        <Reveal delay={0.15}>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-[3.2rem] font-bold text-center leading-[1.15] mb-8">
            O <span className="text-gold-gradient">Vida Rica</span> não é um curso.
            <br />
            <span className="text-[#666] font-light">É um método de transformação.</span>
          </h2>
        </Reveal>

        <Reveal delay={0.3}>
          <p className="text-[#777] text-lg text-center max-w-2xl mx-auto mb-24 font-light leading-relaxed">
            Uma abordagem que une ciência, comportamento e prática para mudar como você
            pensa, sente e decide sobre dinheiro.
          </p>
        </Reveal>

        {/* Pillars — Elegant vertical composition */}
        <div className="flex flex-col items-center gap-0">
          {pillars.map((pillar, i) => (
            <Reveal key={i} delay={0.4 + i * 0.12}>
              <div className="flex flex-col items-center">
                <p className="font-display text-xl sm:text-2xl lg:text-3xl font-semibold text-white/90 tracking-tight text-center">
                  {pillar}
                </p>
                {i < pillars.length - 1 && (
                  <div className="flex flex-col items-center my-6">
                    <div className="w-px h-8 bg-gradient-to-b from-[#C9A84C]/40 to-[#C9A84C]/10" />
                    <span className="text-[#C9A84C]/60 text-lg my-2">+</span>
                    <div className="w-px h-8 bg-gradient-to-b from-[#C9A84C]/10 to-[#C9A84C]/40" />
                  </div>
                )}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════
   4. TRANSFORMAÇÃO — Before / After premium
   ═══════════════════════════════════════════════════════════ */
function TransformationSection() {
  const before = ["Medo", "Ansiedade", "Descontrole", "Decisões impulsivas"];
  const after = ["Clareza", "Estratégia", "Consciência", "Prosperidade"];

  return (
    <section className="relative py-32 sm:py-44 overflow-hidden">
      <div className="absolute inset-0 bg-[#050505]" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#9B72CF]/10 to-transparent" />

      <div className="relative z-10 max-w-[1100px] mx-auto px-8 md:px-12">
        <Reveal>
          <p className="text-[#9B72CF] text-[11px] tracking-[0.3em] uppercase mb-8 text-center font-medium">
            Transformação
          </p>
        </Reveal>

        <Reveal delay={0.15}>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-[3rem] font-bold text-center leading-[1.15] mb-20 max-w-3xl mx-auto">
            De uma relação confusa com dinheiro para uma vida financeira{" "}
            <span className="text-gold-gradient">consciente.</span>
          </h2>
        </Reveal>

        <div className="grid md:grid-cols-[1fr_auto_1fr] gap-8 md:gap-0 items-start max-w-3xl mx-auto">
          {/* Before */}
          <Reveal delay={0.3}>
            <div className="text-center md:text-right md:pr-16">
              <p className="text-[#555] text-[10px] tracking-[0.3em] uppercase mb-10 font-medium">
                Antes
              </p>
              <div className="space-y-6">
                {before.map((item, i) => (
                  <p key={i} className="text-[#666] text-lg font-light">
                    {item}
                  </p>
                ))}
              </div>
            </div>
          </Reveal>

          {/* Divider */}
          <div className="hidden md:flex flex-col items-center">
            <div className="w-px h-full min-h-[250px] bg-gradient-to-b from-[#C9A84C]/0 via-[#C9A84C]/30 to-[#C9A84C]/0" />
          </div>
          <div className="md:hidden w-full flex justify-center py-4">
            <div className="h-px w-24 bg-gradient-to-r from-transparent via-[#C9A84C]/30 to-transparent" />
          </div>

          {/* After */}
          <Reveal delay={0.5}>
            <div className="text-center md:text-left md:pl-16">
              <p className="text-[#C9A84C] text-[10px] tracking-[0.3em] uppercase mb-10 font-medium">
                Depois do Vida Rica
              </p>
              <div className="space-y-6">
                {after.map((item, i) => (
                  <p key={i} className="text-white/90 text-lg font-medium">
                    {item}
                  </p>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════
   5. BENEFÍCIOS — Clean, minimal list
   ═══════════════════════════════════════════════════════════ */
function BenefitsSection() {
  const benefits = [
    "Entender os padrões emocionais que sabotam suas finanças",
    "Identificar comportamentos de autossabotagem financeira",
    "Desenvolver uma mentalidade genuinamente próspera",
    "Tomar decisões financeiras com consciência e clareza",
    "Criar estratégias reais para sair do ciclo de dívidas",
    "Organizar seus objetivos e sonhos financeiros",
    "Compreender os gatilhos mentais que levam ao consumo",
    "Construir uma relação saudável e duradoura com dinheiro",
  ];

  return (
    <section className="relative py-32 sm:py-44 overflow-hidden noise">
      <div className="absolute inset-0 bg-gradient-to-b from-[#050505] via-[#080808] to-[#050505]" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#C9A84C]/10 to-transparent" />

      <div className="relative z-10 max-w-[800px] mx-auto px-8 md:px-12">
        <Reveal>
          <p className="text-[#C9A84C] text-[11px] tracking-[0.3em] uppercase mb-8 text-center font-medium">
            O que você conquista
          </p>
        </Reveal>

        <Reveal delay={0.15}>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-center mb-20">
            Resultados que vão além
            <br />
            <span className="text-[#666] font-light">de uma planilha.</span>
          </h2>
        </Reveal>

        <div className="space-y-0">
          {benefits.map((b, i) => (
            <Reveal key={i} delay={0.2 + i * 0.07}>
              <div className="flex items-start gap-6 py-6 border-b border-white/[0.04] group">
                <div className="shrink-0 w-1.5 h-1.5 rounded-full bg-[#C9A84C] mt-2.5 group-hover:shadow-[0_0_12px_rgba(201,168,76,0.5)] transition-shadow duration-500" />
                <p className="text-[#999] text-[15px] sm:text-base font-light leading-relaxed group-hover:text-white/80 transition-colors duration-500">
                  {b}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════
   6. MENTORA — Grande, autoritária
   ═══════════════════════════════════════════════════════════ */
function MentorSection() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const imgY = useTransform(scrollYProgress, [0, 1], [-40, 40]);

  return (
    <section ref={ref} className="relative py-32 sm:py-44 overflow-hidden" id="mentora">
      <div className="absolute inset-0 bg-[#050505]" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#C9A84C]/10 to-transparent" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-[#C9A84C]/[0.02] rounded-full blur-[200px]" />

      <div className="relative z-10 max-w-[1200px] mx-auto px-8 md:px-12">
        <div className="grid lg:grid-cols-2 gap-16 xl:gap-24 items-center">
          {/* Photo — Large */}
          <Reveal variant={scaleIn}>
            <motion.div style={{ y: imgY }} className="relative">
              <div className="absolute -inset-4 bg-gradient-to-br from-[#C9A84C]/[0.06] via-transparent to-[#9B72CF]/[0.04] rounded-[4px] blur-2xl" />
              <div className="relative overflow-hidden rounded-[3px]">
                <Image
                  src="/images/about-photo.jpeg"
                  alt="Deyllane Lacerda"
                  width={600}
                  height={800}
                  className="w-full h-auto object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#050505]/30 via-transparent to-transparent" />
              </div>
            </motion.div>
          </Reveal>

          {/* Bio */}
          <div>
            <Reveal>
              <p className="text-[#C9A84C] text-[11px] tracking-[0.3em] uppercase mb-8 font-medium">
                Sua mentora
              </p>
            </Reveal>

            <Reveal delay={0.15}>
              <h2 className="font-display text-4xl sm:text-5xl font-bold mb-3 tracking-tight">
                Deyllane Lacerda
              </h2>
            </Reveal>

            <Reveal delay={0.25}>
              <p className="text-[#C9A84C] text-xs tracking-[0.2em] uppercase mb-10">
                Economista &middot; Contadora &middot; Especialista em Finanças Comportamentais
              </p>
            </Reveal>

            <Reveal delay={0.35}>
              <p className="text-[#888] text-base leading-[1.85] font-light mb-6">
                Especialista em transformar a forma como pessoas{" "}
                <span className="text-white/90 font-normal">
                  pensam, sentem e decidem
                </span>{" "}
                sobre dinheiro. Ao longo da sua trajetória, percebeu que problemas
                financeiros raramente são sobre falta de conhecimento — são sobre
                padrões emocionais e comportamentais que se repetem sem consciência.
              </p>
            </Reveal>

            <Reveal delay={0.45}>
              <p className="text-[#888] text-base leading-[1.85] font-light mb-10">
                Unindo formação técnica à compreensão profunda do comportamento humano,
                desenvolveu o{" "}
                <span className="text-gold-gradient font-medium">Vida Rica</span>:
                um método para ajudar pessoas a construírem uma vida financeira
                consciente e próspera.
              </p>
            </Reveal>

            <Reveal delay={0.55}>
              <div className="py-8 border-t border-white/[0.04]">
                <p className="font-display text-lg text-white/70 italic leading-relaxed">
                  &ldquo;Uma Vida Rica não começa quando você ganha mais.
                  Começa quando você aprende a{" "}
                  <span className="not-italic text-gold-gradient font-semibold">
                    pensar, decidir e agir diferente
                  </span>{" "}
                  com o dinheiro.&rdquo;
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.65}>
              <a
                href="https://instagram.com/lacerdadeyllane"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 text-[#777] hover:text-[#B794E0] transition-colors duration-500 text-sm"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                </svg>
                @lacerdadeyllane
              </a>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════
   7. PARA QUEM É
   ═══════════════════════════════════════════════════════════ */
function ForWhoSection() {
  const targets = [
    "Trabalha e ganha dinheiro, mas sente que não evolui financeiramente",
    "Está cansado de repetir os mesmos erros financeiros",
    "Quer sair das dívidas de uma vez por todas",
    "Deseja construir uma mentalidade de prosperidade real",
    "Quer ter mais controle e consciência sobre suas escolhas",
  ];

  return (
    <section className="relative py-32 sm:py-44 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#050505] via-[#080808] to-[#050505]" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#9B72CF]/10 to-transparent" />

      <div className="relative z-10 max-w-[800px] mx-auto px-8 md:px-12 text-center">
        <Reveal>
          <p className="text-[#9B72CF] text-[11px] tracking-[0.3em] uppercase mb-8 font-medium">
            Para quem é
          </p>
        </Reveal>

        <Reveal delay={0.15}>
          <h2 className="font-display text-3xl sm:text-4xl font-bold mb-20">
            Esse treinamento é para
            <br />
            <span className="text-lilac-gradient">você que...</span>
          </h2>
        </Reveal>

        <div className="text-left space-y-0">
          {targets.map((t, i) => (
            <Reveal key={i} delay={0.2 + i * 0.08}>
              <div className="flex items-start gap-6 py-6 border-b border-white/[0.04]">
                <div className="shrink-0 w-px h-5 bg-[#9B72CF]/50 mt-1" />
                <p className="text-[#999] text-[15px] sm:text-base font-light">{t}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════
   8. OFERTA — Premium, não um checkout barato
   ═══════════════════════════════════════════════════════════ */
function OfferSection() {
  return (
    <section className="relative py-32 sm:py-44 overflow-hidden noise" id="oferta">
      <div className="absolute inset-0 bg-[#050505]" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#C9A84C]/10 to-transparent" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#C9A84C]/[0.02] rounded-full blur-[250px]" />

      <div className="relative z-10 max-w-[680px] mx-auto px-8 md:px-12 text-center">
        <Reveal>
          <p className="text-[#C9A84C] text-[11px] tracking-[0.3em] uppercase mb-8 font-medium">
            Investimento
          </p>
        </Reveal>

        <Reveal delay={0.15}>
          <Image
            src="/images/logo.png"
            alt="Vida Rica"
            width={140}
            height={50}
            className="h-10 w-auto mx-auto mb-4"
          />
        </Reveal>

        <Reveal delay={0.25}>
          <p className="text-[#666] text-sm mb-16 font-light">
            O treinamento completo de finanças comportamentais
          </p>
        </Reveal>

        <Reveal delay={0.35}>
          <div className="mb-16">
            <p className="text-[#666] text-xs tracking-[0.2em] uppercase mb-4">Por apenas</p>
            <div className="flex items-baseline justify-center gap-2">
              <span className="text-[#C9A84C] text-xl font-light">R$</span>
              <span className="font-display text-7xl sm:text-8xl lg:text-9xl font-bold text-gold-gradient leading-none">
                97
              </span>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.45}>
          <div className="flex justify-center gap-12 mb-16 text-[#666] text-xs tracking-[0.15em] uppercase">
            <span>Pix</span>
            <span>Cartão</span>
            <span>Boleto</span>
          </div>
        </Reveal>

        <Reveal delay={0.5}>
          <div className="line-gold mb-16" />
        </Reveal>

        <Reveal delay={0.55}>
          <div className="flex flex-col sm:flex-row justify-center gap-8 sm:gap-16 mb-16 text-[13px]">
            <div className="text-center">
              <p className="text-white/70 font-medium mb-1">Acesso</p>
              <p className="text-[#666] font-light">1 ano completo</p>
            </div>
            <div className="text-center">
              <p className="text-white/70 font-medium mb-1">Formato</p>
              <p className="text-[#666] font-light">100% online</p>
            </div>
            <div className="text-center">
              <p className="text-white/70 font-medium mb-1">Dispositivo</p>
              <p className="text-[#666] font-light">Celular ou computador</p>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.65}>
          <a
            href={KIWIFY_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="cta-gold w-full sm:w-auto"
          >
            Começar minha transformação financeira
          </a>
        </Reveal>

        <Reveal delay={0.75}>
          <div className="flex items-center justify-center gap-2 mt-8 text-[#555] text-xs">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            Compra segura via Kiwify
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════
   9. GARANTIA
   ═══════════════════════════════════════════════════════════ */
function GuaranteeSection() {
  return (
    <section className="relative py-24 sm:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-[#050505]" />
      <div className="relative z-10 max-w-[600px] mx-auto px-8 md:px-12 text-center">
        <Reveal>
          <div className="w-12 h-12 mx-auto mb-8 flex items-center justify-center">
            <svg className="w-10 h-10 text-[#C9A84C]/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <h3 className="font-display text-2xl font-semibold mb-4">
            Compra <span className="text-gold-gradient">segura</span>
          </h3>
        </Reveal>

        <Reveal delay={0.2}>
          <p className="text-[#777] text-sm leading-relaxed font-light">
            Sua compra é processada pela Kiwify, plataforma líder em produtos
            digitais, com garantia de satisfação conforme os termos da plataforma.
            Conheça o Vida Rica com total tranquilidade.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════
   10. DEPOIMENTOS — Espaço elegante
   ═══════════════════════════════════════════════════════════ */
function TestimonialsSection() {
  return (
    <section className="relative py-32 sm:py-40 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#050505] via-[#080808] to-[#050505]" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#9B72CF]/10 to-transparent" />

      <div className="relative z-10 max-w-[900px] mx-auto px-8 md:px-12 text-center">
        <Reveal>
          <p className="text-[#9B72CF] text-[11px] tracking-[0.3em] uppercase mb-8 font-medium">
            Depoimentos
          </p>
        </Reveal>

        <Reveal delay={0.15}>
          <h2 className="font-display text-3xl sm:text-4xl font-bold mb-20">
            Quem já transformou sua{" "}
            <span className="text-gold-gradient">relação com dinheiro</span>
          </h2>
        </Reveal>

        <Reveal delay={0.3}>
          <div className="relative py-12 px-8">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 text-[#C9A84C]/10 font-display text-[120px] leading-none select-none">
              &ldquo;
            </div>
            <p className="font-display text-xl sm:text-2xl text-white/60 italic leading-relaxed relative z-10">
              Espaço reservado para depoimentos de alunas e alunos
              que passaram pelo treinamento Vida Rica.
            </p>
            <div className="mt-8 w-8 h-px bg-[#C9A84C]/20 mx-auto" />
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════
   11. FAQ — Minimalista
   ═══════════════════════════════════════════════════════════ */
function FaqItem({ q, a, index }: { q: string; a: string; index: number }) {
  const [open, setOpen] = useState(false);

  return (
    <Reveal delay={0.1 + index * 0.06}>
      <div className="border-b border-white/[0.04]">
        <button
          onClick={() => setOpen(!open)}
          className="w-full flex items-center justify-between py-7 text-left cursor-pointer group"
        >
          <span className="text-[#bbb] text-[15px] font-light pr-8 group-hover:text-white transition-colors duration-500">
            {q}
          </span>
          <motion.span
            animate={{ rotate: open ? 45 : 0 }}
            transition={{ duration: 0.3 }}
            className="text-[#C9A84C] text-lg shrink-0"
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
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="overflow-hidden"
            >
              <p className="text-[#777] text-sm font-light leading-relaxed pb-7 pr-12">
                {a}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </Reveal>
  );
}

function FaqSection() {
  const faqs = [
    {
      q: "O curso é indicado para quem está endividado?",
      a: "Sim. O treinamento ajuda a entender os comportamentos por trás das dívidas e apresenta estratégias para iniciar uma mudança financeira real e sustentável.",
    },
    {
      q: "Preciso ter conhecimento em finanças?",
      a: "Não. O conteúdo foi criado para pessoas comuns aplicarem na vida real, sem necessidade de formação prévia em finanças.",
    },
    {
      q: "Por quanto tempo tenho acesso?",
      a: "1 ano de acesso completo a todo o conteúdo do treinamento.",
    },
    {
      q: "Posso assistir pelo celular?",
      a: "Sim. O treinamento é 100% online e pode ser acessado de qualquer dispositivo.",
    },
    {
      q: "O curso é apenas sobre economizar dinheiro?",
      a: "Não. O foco é transformar a relação entre mente, comportamento e dinheiro. Vai muito além de dicas — é sobre reprogramar seus padrões financeiros.",
    },
  ];

  return (
    <section className="relative py-32 sm:py-44 overflow-hidden" id="faq">
      <div className="absolute inset-0 bg-[#050505]" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#C9A84C]/10 to-transparent" />

      <div className="relative z-10 max-w-[700px] mx-auto px-8 md:px-12">
        <Reveal>
          <p className="text-[#C9A84C] text-[11px] tracking-[0.3em] uppercase mb-8 text-center font-medium">
            Dúvidas
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-center mb-16">
            Perguntas frequentes
          </h2>
        </Reveal>

        <div>
          {faqs.map((faq, i) => (
            <FaqItem key={i} q={faq.q} a={faq.a} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════
   12. CTA FINAL — Cinematic close
   ═══════════════════════════════════════════════════════════ */
function FinalCTA() {
  return (
    <section className="relative py-32 sm:py-44 overflow-hidden noise">
      <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#080806] to-[#050505]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-[#C9A84C]/[0.03] rounded-full blur-[200px]" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#C9A84C]/10 to-transparent" />

      <div className="relative z-10 max-w-[700px] mx-auto px-8 md:px-12 text-center">
        <Reveal>
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold mb-8 leading-[1.1]">
            Sua <span className="text-gold-gradient">Vida Rica</span>
            <br />
            começa <span className="text-lilac-gradient">agora.</span>
          </h2>
        </Reveal>

        <Reveal delay={0.2}>
          <p className="text-[#777] text-lg font-light mb-12 max-w-md mx-auto">
            O primeiro passo para transformar sua relação com o dinheiro
            é decidir mudar.
          </p>
        </Reveal>

        <Reveal delay={0.35}>
          <a
            href={KIWIFY_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="cta-gold"
          >
            Quero transformar minha vida financeira
          </a>
        </Reveal>

        <Reveal delay={0.45}>
          <p className="text-[#555] text-xs mt-8 tracking-wide">
            R$ 97,00 &middot; Acesso imediato &middot; 1 ano
          </p>
        </Reveal>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════
   13. FOOTER — Minimalista
   ═══════════════════════════════════════════════════════════ */
function Footer() {
  return (
    <footer className="relative py-20 border-t border-white/[0.04]">
      <div className="max-w-[1200px] mx-auto px-8 md:px-12">
        <div className="flex flex-col items-center text-center">
          <Image
            src="/images/logo.png"
            alt="Vida Rica"
            width={120}
            height={43}
            className="h-9 w-auto mb-8"
          />

          <p className="text-[#555] text-xs tracking-[0.1em] mb-8">
            Deyllane Lacerda &middot; Mentora de Finanças e Negócios
          </p>

          <div className="flex flex-wrap justify-center gap-8 mb-10 text-[#555] text-xs">
            <a
              href="https://instagram.com/lacerdadeyllane"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#9B72CF] transition-colors duration-500 flex items-center gap-2"
            >
              <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
              </svg>
              @lacerdadeyllane
            </a>
            <a
              href="https://wa.me/5598985679867"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-green-400 transition-colors duration-500 flex items-center gap-2"
            >
              <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              (98) 98567-9867
            </a>
            <a
              href="mailto:dey.lacerda82@gmail.com"
              className="hover:text-[#C9A84C] transition-colors duration-500 flex items-center gap-2"
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              dey.lacerda82@gmail.com
            </a>
          </div>

          <div className="w-16 h-px bg-gradient-to-r from-transparent via-[#222] to-transparent mb-8" />

          <p className="text-[#333] text-[11px]">
            &copy; {new Date().getFullYear()} Vida Rica. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}

/* ═══════════════════════════════════════════════════════════
   PAGE
   ═══════════════════════════════════════════════════════════ */
export default function Home() {
  return (
    <main className="bg-[#050505]">
      <Header />
      <Hero />
      <ConnectionSection />
      <MethodSection />
      <TransformationSection />
      <BenefitsSection />
      <MentorSection />
      <ForWhoSection />
      <OfferSection />
      <GuaranteeSection />
      <TestimonialsSection />
      <FaqSection />
      <FinalCTA />
      <Footer />
    </main>
  );
}
