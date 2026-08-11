"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const KIWIFY_URL = "https://pay.kiwify.com.br/COIbRyc";

/* ─────────────────── Scroll Reveal Hook ─────────────────── */
function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("visible");
          observer.unobserve(el);
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return ref;
}

function Section({
  children,
  className = "",
  id,
}: {
  children: React.ReactNode;
  className?: string;
  id?: string;
}) {
  const ref = useReveal();
  return (
    <section id={id} ref={ref} className={`reveal ${className}`}>
      {children}
    </section>
  );
}

/* ─────────────────── HEADER ─────────────────── */
function Header() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-black/80 backdrop-blur-xl border-b border-white/5 py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <Image
          src="/images/logo.png"
          alt="Vida Rica"
          width={140}
          height={50}
          className="h-10 w-auto"
          priority
        />
        <a href={KIWIFY_URL} target="_blank" rel="noopener noreferrer">
          <button className="hidden sm:block bg-gradient-to-r from-[#A88B3A] to-[#C9A84C] text-black text-sm font-semibold px-6 py-2.5 rounded-md hover:shadow-lg hover:shadow-[#C9A84C]/20 transition-all duration-300 cursor-pointer">
            Quero começar
          </button>
        </a>
      </div>
    </header>
  );
}

/* ─────────────────── 1. HERO SECTION ─────────────────── */
function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-black to-[#7B52AF]/10" />
      <div className="absolute top-1/4 right-0 w-[600px] h-[600px] bg-[#9B72CF]/5 rounded-full blur-[150px]" />
      <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] bg-[#C9A84C]/5 rounded-full blur-[120px]" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-28 pb-16 w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text */}
          <div className="order-2 lg:order-1">
            <div className="animate-fade-in-up">
              <p className="text-[#C9A84C] text-sm font-semibold tracking-[0.2em] uppercase mb-6">
                Treinamento online &bull; Acesso imediato &bull; 100% digital
              </p>
            </div>

            <h1
              className="animate-fade-in-up animate-delay-100 text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.1] mb-6"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              Sua{" "}
              <span className="text-gradient-gold">Vida Rica</span> começa na
              mente{" "}
              <span className="text-[#999] font-normal italic">
                — antes de aparecer na conta bancária.
              </span>
            </h1>

            <p className="animate-fade-in-up animate-delay-200 text-[#ccc]/80 text-lg leading-relaxed mb-4 max-w-xl">
              Transforme sua relação com o dinheiro, compreenda os padrões que
              sabotam sua prosperidade e desenvolva uma mentalidade financeira
              capaz de sustentar a vida que você deseja construir.
            </p>

            <div className="animate-fade-in-up animate-delay-300 flex items-center gap-3 mb-8">
              <span
                className="text-gradient-lilac text-lg font-semibold"
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              >
                Vida Rica
              </span>
              <span className="w-px h-4 bg-white/20" />
              <span className="text-[#999] text-sm">
                Finanças comportamentais + mentalidade financeira
              </span>
            </div>

            <div className="animate-fade-in-up animate-delay-400">
              <a
                href={KIWIFY_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="cta-button text-center"
              >
                Quero transformar minha vida financeira
              </a>
            </div>
          </div>

          {/* Photo */}
          <div className="order-1 lg:order-2 flex justify-center animate-fade-in animate-delay-300">
            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-br from-[#9B72CF]/30 via-[#C9A84C]/20 to-transparent rounded-2xl blur-sm" />
              <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl shadow-[#9B72CF]/10 max-w-sm">
                <Image
                  src="/images/hero-photo.jpeg"
                  alt="Deyllane Lacerda — Mentora de Finanças e Negócios"
                  width={400}
                  height={533}
                  className="w-full h-auto object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <p
                    className="text-white text-lg font-semibold"
                    style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                  >
                    Deyllane Lacerda
                  </p>
                  <p className="text-[#C9A84C] text-xs tracking-wider uppercase">
                    Mentora de Finanças e Negócios
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black to-transparent" />
    </section>
  );
}

/* ─────────────────── 2. SEÇÃO DE DOR ─────────────────── */
function PainSection() {
  const pains = [
    "Dinheiro entra e desaparece rapidamente",
    "Você tenta se organizar mas volta aos mesmos hábitos",
    "Faz compras por impulso",
    "Tem dificuldade de construir reservas",
    "Repete padrões financeiros familiares",
    "Sente culpa ou ansiedade quando pensa em dinheiro",
  ];

  return (
    <Section className="py-24 sm:py-32 bg-black relative">
      <div className="absolute inset-0 bg-gradient-to-b from-black via-[#7B52AF]/3 to-black" />
      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <h2
          className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 leading-tight"
          style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
        >
          Você sente que trabalha, ganha dinheiro, mas{" "}
          <span className="text-gradient-lilac">
            nunca consegue prosperar?
          </span>
        </h2>

        <div className="gold-line w-20 mx-auto my-10" />

        <div className="grid sm:grid-cols-2 gap-4 mb-12 text-left">
          {pains.map((pain, i) => (
            <div
              key={i}
              className="glass-lilac rounded-xl p-5 flex items-start gap-4 hover:border-[#9B72CF]/20 transition-all duration-300"
            >
              <span className="text-[#9B72CF] text-lg mt-0.5 shrink-0">&#x2715;</span>
              <p className="text-[#ccc]/90 text-[15px] leading-relaxed">
                {pain}
              </p>
            </div>
          ))}
        </div>

        <div className="glass rounded-2xl p-8 sm:p-10 max-w-3xl mx-auto border-l-2 border-[#C9A84C]/40">
          <p
            className="text-white/90 text-lg sm:text-xl leading-relaxed italic"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            &ldquo;O problema nem sempre está no quanto você ganha. Muitas vezes
            está na forma como você{" "}
            <span className="text-[#C9A84C] font-semibold not-italic">
              pensa, sente e se comporta
            </span>{" "}
            em relação ao dinheiro.&rdquo;
          </p>
        </div>
      </div>
    </Section>
  );
}

/* ─────────────────── 3. MÉTODO VIDA RICA ─────────────────── */
function MethodSection() {
  const pillars = [
    {
      title: "Finanças Comportamentais",
      desc: "Entenda como suas emoções e padrões inconscientes influenciam cada decisão financeira.",
    },
    {
      title: "Neurociência",
      desc: "Descubra como o cérebro processa escolhas financeiras e como reprogramar hábitos.",
    },
    {
      title: "Comportamento Humano",
      desc: "Identifique os gatilhos que levam a decisões impulsivas e aprenda a agir com consciência.",
    },
    {
      title: "Educação Financeira Prática",
      desc: "Ferramentas e estratégias aplicáveis no dia a dia para transformar sua realidade.",
    },
  ];

  const icons = [
    <svg key="brain" className="w-8 h-8 text-[#C9A84C]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg>,
    <svg key="zap" className="w-8 h-8 text-[#C9A84C]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>,
    <svg key="search" className="w-8 h-8 text-[#C9A84C]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>,
    <svg key="chart" className="w-8 h-8 text-[#C9A84C]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>,
  ];

  return (
    <Section className="py-24 sm:py-32 bg-black relative">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#C9A84C]/20 to-transparent" />
      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <p className="text-[#C9A84C] text-sm font-semibold tracking-[0.2em] uppercase mb-4">
            O Método
          </p>
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            O <span className="text-gradient-gold">Vida Rica</span> não é
            apenas um curso de economia.
          </h2>
          <p className="text-[#ccc]/70 text-lg max-w-2xl mx-auto leading-relaxed">
            É um treinamento baseado em ciência do comportamento aplicada às
            finanças pessoais.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {pillars.map((pillar, i) => (
            <div
              key={i}
              className="glass rounded-2xl p-7 text-center group hover:border-[#C9A84C]/20 transition-all duration-500 hover:-translate-y-1"
            >
              <div className="mb-5 flex justify-center">{icons[i]}</div>
              <h3 className="text-white font-semibold text-[15px] mb-3 tracking-wide uppercase">
                {pillar.title}
              </h3>
              <p className="text-[#999] text-sm leading-relaxed">
                {pillar.desc}
              </p>
            </div>
          ))}
        </div>

        <div className="text-center">
          <p
            className="text-xl sm:text-2xl text-white/80 italic max-w-3xl mx-auto"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            &ldquo;Antes de mudar sua conta bancária, você precisa mudar os{" "}
            <span className="text-gradient-lilac font-semibold not-italic">
              padrões que controlam suas decisões financeiras
            </span>
            .&rdquo;
          </p>
        </div>
      </div>
    </Section>
  );
}

/* ─────────────────── 4. BENEFÍCIOS ─────────────────── */
function BenefitsSection() {
  const benefits = [
    "Entender os padrões emocionais ligados ao dinheiro",
    "Identificar comportamentos de autossabotagem financeira",
    "Desenvolver uma mentalidade mais próspera",
    "Aprender a tomar decisões financeiras conscientes",
    "Criar estratégias para sair do ciclo de dívidas",
    "Organizar objetivos e sonhos financeiros",
    "Compreender gatilhos mentais de consumo",
    "Construir uma relação saudável com dinheiro",
  ];

  return (
    <Section className="py-24 sm:py-32 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-black via-[#111]/50 to-black" />
      <div className="relative z-10 max-w-5xl mx-auto px-6">
        <div className="text-center mb-14">
          <p className="text-[#9B72CF] text-sm font-semibold tracking-[0.2em] uppercase mb-4">
            Benefícios
          </p>
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-bold"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            O que você vai{" "}
            <span className="text-gradient-gold">conquistar</span>
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          {benefits.map((benefit, i) => (
            <div
              key={i}
              className="glass rounded-xl p-6 flex items-start gap-4 group hover:border-[#C9A84C]/20 transition-all duration-300"
            >
              <div className="shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-[#C9A84C] to-[#E2C97E] flex items-center justify-center mt-0.5">
                <svg
                  className="w-4 h-4 text-black"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2.5}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <p className="text-white/90 text-[15px] leading-relaxed">
                {benefit}
              </p>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}

/* ─────────────────── 5. PARA QUEM É ─────────────────── */
function ForWhoSection() {
  const targets = [
    "Trabalha e ganha dinheiro, mas sente que não evolui financeiramente",
    "Está cansado de repetir erros financeiros",
    "Quer sair das dívidas de uma vez por todas",
    "Deseja construir uma mentalidade de prosperidade",
    "Quer ter mais controle sobre suas escolhas financeiras",
  ];

  return (
    <Section className="py-24 sm:py-32 bg-black relative">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#9B72CF]/20 to-transparent" />
      <div className="relative z-10 max-w-4xl mx-auto px-6">
        <div className="text-center mb-14">
          <p className="text-[#9B72CF] text-sm font-semibold tracking-[0.2em] uppercase mb-4">
            Para quem é
          </p>
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-bold"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            Esse treinamento é para{" "}
            <span className="text-gradient-lilac">você que...</span>
          </h2>
        </div>

        <div className="space-y-4">
          {targets.map((target, i) => (
            <div
              key={i}
              className="glass rounded-xl p-6 flex items-center gap-5 hover:border-[#9B72CF]/20 transition-all duration-300"
            >
              <div className="shrink-0 w-3 h-3 rounded-full bg-gradient-to-br from-[#9B72CF] to-[#B794E0]" />
              <p className="text-white/90 text-base sm:text-lg">{target}</p>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}

/* ─────────────────── 6. DIFERENCIAL ─────────────────── */
function DifferentialSection() {
  const before = [
    "Falta de controle",
    "Compras emocionais",
    "Medo do dinheiro",
    "Ciclo de dívidas",
  ];
  const after = [
    "Clareza financeira",
    "Decisões conscientes",
    "Planejamento estratégico",
    "Mentalidade de crescimento",
  ];

  return (
    <Section className="py-24 sm:py-32 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-black via-[#7B52AF]/3 to-black" />
      <div className="relative z-10 max-w-5xl mx-auto px-6">
        <div className="text-center mb-6">
          <p className="text-[#C9A84C] text-sm font-semibold tracking-[0.2em] uppercase mb-4">
            Diferencial
          </p>
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            Por que o <span className="text-gradient-gold">Vida Rica</span> é
            diferente?
          </h2>
        </div>

        <div className="glass rounded-2xl p-8 sm:p-10 text-center mb-14 border-l-2 border-[#9B72CF]/30 max-w-3xl mx-auto">
          <p
            className="text-white/90 text-lg sm:text-xl leading-relaxed italic"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            &ldquo;Você não precisa apenas aprender uma planilha. Você precisa
            entender o{" "}
            <span className="text-gradient-gold font-semibold not-italic">
              comportamento
            </span>{" "}
            que faz você tomar decisões financeiras.&rdquo;
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-8">
          {/* Before */}
          <div className="glass rounded-2xl p-8 border-t-2 border-red-500/30">
            <h3
              className="text-center text-sm font-bold text-red-400/80 mb-6 tracking-wide uppercase"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              Antes
            </h3>
            <div className="space-y-4">
              {before.map((item, i) => (
                <div key={i} className="flex items-center gap-4">
                  <span className="text-red-400/60 text-lg">&#x2715;</span>
                  <p className="text-[#999] text-base">{item}</p>
                </div>
              ))}
            </div>
          </div>

          {/* After */}
          <div className="glass rounded-2xl p-8 border-t-2 border-[#C9A84C]/40">
            <h3
              className="text-center text-sm font-bold text-[#C9A84C] mb-6 tracking-wide uppercase"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              Depois do Vida Rica
            </h3>
            <div className="space-y-4">
              {after.map((item, i) => (
                <div key={i} className="flex items-center gap-4">
                  <span className="text-[#C9A84C] text-lg">&#x2713;</span>
                  <p className="text-white/90 text-base">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}

/* ─────────────────── 7. SOBRE A MENTORA ─────────────────── */
function MentorSection() {
  return (
    <Section className="py-24 sm:py-32 bg-black relative" id="mentora">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#C9A84C]/20 to-transparent" />
      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <div className="text-center mb-14">
          <p className="text-[#C9A84C] text-sm font-semibold tracking-[0.2em] uppercase mb-4">
            Sua mentora
          </p>
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-bold"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            Quem é{" "}
            <span className="text-gradient-gold">Deyllane Lacerda</span>?
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Photo */}
          <div className="flex justify-center">
            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-br from-[#C9A84C]/20 via-[#9B72CF]/15 to-transparent rounded-2xl blur-sm" />
              <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl max-w-md">
                <Image
                  src="/images/about-photo.jpeg"
                  alt="Deyllane Lacerda — Economista, Contadora e Especialista em Finanças Comportamentais"
                  width={500}
                  height={667}
                  className="w-full h-auto object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
              </div>
            </div>
          </div>

          {/* Bio */}
          <div>
            <h3
              className="text-2xl sm:text-3xl font-bold mb-2"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              Deyllane Lacerda
            </h3>
            <p className="text-[#C9A84C] text-sm tracking-wider uppercase mb-6">
              Economista &bull; Contadora &bull; Especialista em Finanças
              Comportamentais
            </p>

            <div className="space-y-4 text-[#ccc]/80 text-base leading-relaxed">
              <p>
                Ao longo da sua trajetória, Deyllane percebeu que muitos
                problemas financeiros não acontecem apenas pela falta de
                conhecimento, mas pelos{" "}
                <span className="text-white font-medium">
                  padrões, emoções e decisões que repetimos sem perceber
                </span>
                .
              </p>
              <p>
                Foi unindo conhecimento técnico à compreensão do comportamento
                humano que desenvolveu o{" "}
                <span className="text-gradient-gold font-semibold">
                  Vida Rica
                </span>
                : um método para ajudar pessoas a entenderem sua relação com o
                dinheiro, mudarem comportamentos e construírem uma vida
                financeira mais consciente e próspera.
              </p>
            </div>

            <div className="glass-lilac rounded-xl p-6 mt-8 border-l-2 border-[#9B72CF]/40">
              <p
                className="text-white/90 text-lg italic leading-relaxed"
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              >
                &ldquo;Porque uma Vida Rica não começa quando você ganha mais.
                Começa quando você aprende a{" "}
                <span className="text-[#C9A84C] not-italic font-semibold">
                  pensar, decidir e agir diferente
                </span>{" "}
                com o dinheiro.&rdquo;
              </p>
            </div>

            <div className="mt-6">
              <a
                href="https://instagram.com/lacerdadeyllane"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-[#9B72CF] hover:text-[#B794E0] transition-colors text-sm"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                </svg>
                @lacerdadeyllane
              </a>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}

/* ─────────────────── 8. OFERTA ─────────────────── */
function OfferSection() {
  const features = [
    "Produto 100% online",
    "Acesso pelo celular ou computador",
    "1 ano de acesso ao conteúdo",
    "Liberação após confirmação do pagamento",
  ];

  return (
    <Section className="py-24 sm:py-32 relative" id="oferta">
      <div className="absolute inset-0 bg-gradient-to-b from-black via-[#7B52AF]/5 to-black" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#C9A84C]/3 rounded-full blur-[200px]" />

      <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
        <p className="text-[#C9A84C] text-sm font-semibold tracking-[0.2em] uppercase mb-4">
          Oferta especial
        </p>
        <h2
          className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4"
          style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
        >
          Comece sua{" "}
          <span className="text-gradient-gold">transformação</span> agora
        </h2>
        <p className="text-[#999] text-lg mb-12 max-w-xl mx-auto">
          Invista em você. Invista na sua relação com o dinheiro.
        </p>

        {/* Offer Card */}
        <div className="relative">
          <div className="absolute -inset-px bg-gradient-to-br from-[#C9A84C]/30 via-[#9B72CF]/20 to-[#C9A84C]/30 rounded-3xl" />
          <div className="relative glass rounded-3xl p-10 sm:p-14 bg-[#111]/80">
            <div className="flex items-center justify-center gap-3 mb-2">
              <Image
                src="/images/logo.png"
                alt="Vida Rica"
                width={100}
                height={36}
                className="h-8 w-auto"
              />
            </div>
            <p className="text-[#999] text-sm mb-8">
              Treinamento completo em finanças comportamentais
            </p>

            <div className="mb-8">
              <p className="text-[#999] text-sm mb-1">Por apenas</p>
              <div className="flex items-baseline justify-center gap-1">
                <span className="text-[#C9A84C] text-2xl font-medium">R$</span>
                <span
                  className="text-7xl sm:text-8xl font-bold text-gradient-gold"
                  style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                >
                  97
                </span>
                <span className="text-[#C9A84C] text-2xl font-medium">,00</span>
              </div>
            </div>

            <div className="flex flex-wrap justify-center gap-4 mb-8">
              <span className="glass rounded-full px-4 py-2 text-xs text-white/70 flex items-center gap-2">
                <svg className="w-4 h-4 text-[#C9A84C]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                </svg>
                Cartão
              </span>
              <span className="glass rounded-full px-4 py-2 text-xs text-white/70 flex items-center gap-2">
                <svg className="w-4 h-4 text-[#C9A84C]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Pix
              </span>
              <span className="glass rounded-full px-4 py-2 text-xs text-white/70 flex items-center gap-2">
                <svg className="w-4 h-4 text-[#C9A84C]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Boleto
              </span>
            </div>

            <div className="space-y-3 mb-10 max-w-sm mx-auto">
              {features.map((feature, i) => (
                <div key={i} className="flex items-center gap-3">
                  <svg
                    className="w-4 h-4 text-[#C9A84C] shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2.5}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <p className="text-white/70 text-sm text-left">{feature}</p>
                </div>
              ))}
            </div>

            <a
              href={KIWIFY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="cta-button w-full sm:w-auto text-center block sm:inline-block text-lg"
            >
              Começar minha transformação financeira
            </a>
          </div>
        </div>
      </div>
    </Section>
  );
}

/* ─────────────────── 9. GARANTIA ─────────────────── */
function GuaranteeSection() {
  return (
    <Section className="py-20 sm:py-24 bg-black">
      <div className="max-w-3xl mx-auto px-6 text-center">
        <div className="glass rounded-2xl p-10 sm:p-12 border-[#C9A84C]/10 border">
          <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-gradient-to-br from-[#C9A84C]/20 to-[#C9A84C]/5 flex items-center justify-center">
            <svg
              className="w-8 h-8 text-[#C9A84C]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
              />
            </svg>
          </div>
          <h3
            className="text-2xl sm:text-3xl font-bold mb-4"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            Compra <span className="text-gradient-gold">segura</span>
          </h3>
          <p className="text-[#ccc]/80 text-base leading-relaxed max-w-lg mx-auto mb-6">
            Você pode conhecer o Vida Rica com total tranquilidade. Sua compra é
            processada pela{" "}
            <span className="text-white font-medium">Kiwify</span>, plataforma
            líder em produtos digitais, com garantia de satisfação conforme os
            termos da plataforma.
          </p>
          <div className="flex items-center justify-center gap-2 text-[#C9A84C] text-sm">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            Pagamento 100% seguro
          </div>
        </div>
      </div>
    </Section>
  );
}

/* ─────────────────── 10. FAQ ─────────────────── */
function FaqSection() {
  const faqs = [
    {
      q: "O curso é indicado para quem está endividado?",
      a: "Sim. O treinamento ajuda a entender os comportamentos por trás das dívidas e apresenta estratégias para iniciar uma mudança financeira real e sustentável.",
    },
    {
      q: "Preciso entender de finanças?",
      a: "Não. O conteúdo foi criado para pessoas comuns aplicarem na vida real, sem necessidade de conhecimento prévio em finanças.",
    },
    {
      q: "Por quanto tempo tenho acesso?",
      a: "Você terá 1 ano de acesso completo a todo o conteúdo do treinamento.",
    },
    {
      q: "Posso assistir pelo celular?",
      a: "Sim. O treinamento é 100% online e pode ser acessado de qualquer dispositivo — celular, tablet ou computador.",
    },
    {
      q: "O curso é apenas sobre economizar dinheiro?",
      a: "Não. O foco do Vida Rica é transformar a relação entre mente, comportamento e dinheiro. Vai muito além de dicas de economia — é sobre reprogramar padrões financeiros.",
    },
  ];

  return (
    <Section className="py-24 sm:py-32 bg-black relative" id="faq">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#9B72CF]/20 to-transparent" />
      <div className="relative z-10 max-w-3xl mx-auto px-6">
        <div className="text-center mb-14">
          <p className="text-[#9B72CF] text-sm font-semibold tracking-[0.2em] uppercase mb-4">
            Dúvidas frequentes
          </p>
          <h2
            className="text-3xl sm:text-4xl font-bold"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            Perguntas{" "}
            <span className="text-gradient-lilac">frequentes</span>
          </h2>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <details
              key={i}
              className="faq-item glass rounded-xl group hover:border-[#9B72CF]/15 transition-all duration-300"
            >
              <summary className="flex items-center justify-between p-6 cursor-pointer">
                <span className="text-white/90 font-medium text-[15px] pr-4">
                  {faq.q}
                </span>
                <span className="faq-icon text-[#C9A84C] text-xl transition-transform duration-300 shrink-0">
                  +
                </span>
              </summary>
              <div className="px-6 pb-6 -mt-2">
                <p className="text-[#999] text-sm leading-relaxed">
                  {faq.a}
                </p>
              </div>
            </details>
          ))}
        </div>
      </div>
    </Section>
  );
}

/* ─────────────────── CTA FINAL ─────────────────── */
function FinalCTA() {
  return (
    <Section className="py-24 sm:py-32 relative">
      <div className="absolute inset-0 bg-gradient-to-t from-black via-[#7B52AF]/5 to-black" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#C9A84C]/5 rounded-full blur-[180px]" />
      <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
        <h2
          className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6"
          style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
        >
          Sua <span className="text-gradient-gold">Vida Rica</span> começa{" "}
          <span className="text-gradient-lilac">agora.</span>
        </h2>
        <p className="text-[#ccc]/70 text-lg mb-10 max-w-xl mx-auto">
          Não espere mais para transformar sua relação com o dinheiro. O
          primeiro passo é decidir mudar.
        </p>
        <a
          href={KIWIFY_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="cta-button text-lg"
        >
          Quero transformar minha vida financeira
        </a>
        <p className="text-[#999] text-xs mt-6">
          R$ 97,00 &bull; Acesso imediato &bull; 1 ano de acesso
        </p>
      </div>
    </Section>
  );
}

/* ─────────────────── 11. FOOTER ─────────────────── */
function Footer() {
  return (
    <footer className="py-16 bg-black border-t border-white/5">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col items-center text-center">
          <Image
            src="/images/logo.png"
            alt="Vida Rica"
            width={160}
            height={57}
            className="h-12 w-auto mb-6"
          />

          <p className="text-[#999] text-sm mb-1">Deyllane Lacerda</p>
          <p className="text-[#999]/60 text-xs mb-6">
            Economista &bull; Contadora &bull; Especialista em Finanças
            Comportamentais
          </p>

          <div className="flex flex-wrap justify-center gap-6 mb-8 text-sm">
            <a
              href="https://instagram.com/lacerdadeyllane"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#999] hover:text-[#9B72CF] transition-colors flex items-center gap-2"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
              </svg>
              @lacerdadeyllane
            </a>

            <a
              href="https://wa.me/5598985679867"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#999] hover:text-green-400 transition-colors flex items-center gap-2"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              (98) 98567-9867
            </a>

            <a
              href="mailto:dey.lacerda82@gmail.com"
              className="text-[#999] hover:text-[#C9A84C] transition-colors flex items-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              dey.lacerda82@gmail.com
            </a>
          </div>

          <div className="gold-line w-32 mb-6" />

          <p className="text-[#999]/40 text-xs">
            &copy; {new Date().getFullYear()} Vida Rica. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}

/* ─────────────────── PAGE ─────────────────── */
export default function Home() {
  return (
    <main>
      <Header />
      <HeroSection />
      <PainSection />
      <MethodSection />
      <BenefitsSection />
      <ForWhoSection />
      <DifferentialSection />
      <MentorSection />
      <OfferSection />
      <GuaranteeSection />
      <FaqSection />
      <FinalCTA />
      <Footer />
    </main>
  );
}
