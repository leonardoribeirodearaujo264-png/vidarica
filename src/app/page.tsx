"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { motion, useScroll, useTransform, useInView, AnimatePresence } from "framer-motion";

/* ═══════════════ CONSTANTS ═══════════════ */
const KIWIFY = "https://pay.kiwify.com.br/COIbRyc";
type Ease = [number, number, number, number];
const EASE: Ease = [0.16, 1, 0.3, 1];
const WA_LINK = "https://wa.me/5598985679867?text=Ol%C3%A1!%20Tenho%20interesse%20no%20Vida%20Rica";
const INSTA = "https://instagram.com/lacerdadeyllane";

/* ═══════════════ HELPERS ═══════════════ */
function R({ children, className = "", d = 0, y = 24 }: { children: ReactNode; className?: string; d?: number; y?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const v = useInView(ref, { once: true, margin: "-40px 0px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y }}
      animate={v ? { opacity: 1, y: 0 } : { opacity: 0, y }}
      transition={{ duration: 0.65, delay: d, ease: EASE }}
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

function Check({ color = "#C9A84C" }: { color?: string }) {
  return (
    <div className="shrink-0 w-5 h-5 rounded-full flex items-center justify-center mt-0.5" style={{ background: `linear-gradient(135deg, ${color}, ${color}cc)` }}>
      <svg className="w-3 h-3 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
      </svg>
    </div>
  );
}

function SectionLabel({ children, color = "#C9A84C" }: { children: ReactNode; color?: string }) {
  return <p className="text-[11px] font-semibold tracking-[0.25em] uppercase mb-5 text-center" style={{ color }}>{children}</p>;
}

/* ════════════════════════════════════════════
   1. HEADER
   ════════════════════════════════════════════ */
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
    { label: "Metodo", href: "#metodo" },
    { label: "Sobre", href: "#sobre" },
    { label: "Oferta", href: "#oferta" },
    { label: "Duvidas", href: "#duvidas" },
  ];
  const close = () => setMenuOpen(false);

  return (
    <>
      <motion.header
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${scrolled ? "bg-[#060606]/95 backdrop-blur-xl shadow-[0_1px_0_rgba(255,255,255,0.04)]" : "bg-transparent"}`}
      >
        <div className="max-w-7xl mx-auto px-5 sm:px-8 flex items-center justify-between h-[68px]">
          <a href="#" onClick={close} className="relative z-10">
            <Image src="/images/logo.png" alt="Vida Rica" width={120} height={40} className="h-8 sm:h-9 w-auto" priority />
          </a>
          <nav className="hidden lg:flex items-center gap-8">
            {links.map((l) => (
              <a key={l.href} href={l.href} className="text-[13px] text-[#999] hover:text-white transition-colors duration-300 tracking-wide">{l.label}</a>
            ))}
            <a href={KIWIFY} target="_blank" rel="noopener noreferrer" className="ml-4 text-[13px] font-semibold text-[#0a0a0a] bg-gradient-to-r from-[#C9A84C] to-[#E8D48B] px-6 py-2.5 rounded-lg hover:shadow-lg hover:shadow-[#C9A84C]/20 transition-all duration-300">
              Quero comecar
            </a>
          </nav>
          <button onClick={() => setMenuOpen(!menuOpen)} className="lg:hidden flex flex-col gap-[5px] p-2 cursor-pointer relative z-10" aria-label="Menu">
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
            className="fixed inset-0 z-40 bg-[#060606]/98 backdrop-blur-2xl flex flex-col items-center justify-center gap-8"
          >
            {links.map((l, i) => (
              <motion.a key={l.href} href={l.href} onClick={close} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 + i * 0.08, duration: 0.4 }} className="text-xl text-white/80 hover:text-[#C9A84C] transition-colors">
                {l.label}
              </motion.a>
            ))}
            <motion.a href={KIWIFY} target="_blank" rel="noopener noreferrer" onClick={close} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 0.4 }} className="cta-primary mt-4">
              Quero comecar agora
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

/* ════════════════════════════════════════════
   2. HERO
   ════════════════════════════════════════════ */
function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], [0, 50]);

  return (
    <section ref={ref} className="relative min-h-screen flex items-center overflow-hidden">
      <div className="absolute top-[-15%] right-[-5%] w-[500px] h-[500px] bg-[#9B72CF]/[0.06] rounded-full blur-[200px] pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[10%] w-[400px] h-[400px] bg-[#C9A84C]/[0.04] rounded-full blur-[160px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 w-full pt-28 sm:pt-32 pb-16 sm:pb-20">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <div className="order-2 lg:order-1 max-w-[560px]">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.3 }} className="inline-flex items-center gap-2 bg-white/[0.04] border border-white/[0.06] rounded-full px-4 py-1.5 mb-7">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C9A84C] animate-pulse" />
              <span className="text-[11px] text-[#999] tracking-wide">Treinamento 100% online &middot; Acesso imediato</span>
            </motion.div>

            <motion.h1 initial={{ opacity: 0, y: 25 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.5, ease: EASE }} className="font-display text-[2rem] sm:text-[2.6rem] md:text-[3.2rem] lg:text-[3.5rem] font-bold leading-[1.08] tracking-[-0.02em] mb-6">
              Por que voce ganha dinheiro e{" "}
              <span className="gold-text">ainda se sente preso?</span>
            </motion.h1>

            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.8, ease: EASE }} className="text-[#999] text-[15px] sm:text-base leading-relaxed mb-8 max-w-[500px]">
              Descubra como seus padroes emocionais controlam cada decisao financeira — e aprenda a{" "}
              <strong className="text-white font-medium">pensar, decidir e agir diferente</strong> com o dinheiro. Metodo em 4 pilares: do desbloqueio emocional a organizacao pratica.
            </motion.p>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 1.1, ease: EASE }} className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <a href={KIWIFY} target="_blank" rel="noopener noreferrer" className="cta-primary">
                Quero transformar minha vida financeira <Arrow />
              </a>
              <span className="text-[#666] text-xs">
                Por apenas <strong className="text-[#C9A84C]">R$ 97</strong>
              </span>
            </motion.div>

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 1.5 }} className="flex flex-wrap items-center gap-6 mt-8 text-[#666] text-xs">
              <div className="flex items-center gap-2">
                <svg className="w-3.5 h-3.5 text-[#C9A84C]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
                Compra 100% segura
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-3.5 h-3.5 text-[#C9A84C]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
                Garantia de 7 dias
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-3.5 h-3.5 text-[#C9A84C]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                Acesso imediato
              </div>
            </motion.div>
          </div>

          <motion.div className="order-1 lg:order-2 flex justify-center lg:justify-end" initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1.2, delay: 0.3, ease: EASE }} style={{ y: imgY }}>
            <div className="relative w-[260px] sm:w-[320px] lg:w-[380px]">
              <div className="absolute -inset-8 bg-gradient-to-br from-[#9B72CF]/[0.08] via-[#C9A84C]/[0.05] to-transparent rounded-3xl blur-3xl pointer-events-none" />
              <div className="relative overflow-hidden rounded-2xl border border-white/[0.08] shadow-2xl shadow-black/40">
                <Image src="/images/hero-photo.jpeg" alt="Deyllane Lacerda — Mentora de Financas Comportamentais" width={400} height={530} className="w-full h-auto object-cover" priority />
                <div className="absolute inset-0 bg-gradient-to-t from-[#060606]/90 via-[#060606]/20 to-transparent" />
                <div className="absolute bottom-0 inset-x-0 p-5 sm:p-6">
                  <p className="font-display text-white text-lg sm:text-xl font-semibold">Deyllane Lacerda</p>
                  <p className="text-[#C9A84C] text-[10px] tracking-[0.2em] uppercase mt-1">Economista &middot; Financas Comportamentais</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2, duration: 1 }} className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 hidden sm:flex flex-col items-center">
        <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }} className="w-[1px] h-8 bg-gradient-to-b from-[#C9A84C]/40 to-transparent" />
      </motion.div>
    </section>
  );
}

/* ════════════════════════════════════════════
   3. DOR EM 3 CAMADAS
   ════════════════════════════════════════════ */
function PainSection() {
  const surface = [
    "O dinheiro entra e some — voce nao sabe para onde foi",
    "A fatura do cartao e sempre maior do que voce esperava",
    "Voce ja tentou planilha, app e anotacao — e nada funcionou",
    "No fim do mes sobra angustia, nao dinheiro",
  ];
  const emotional = [
    "Vergonha de admitir que nao sabe lidar com dinheiro",
    "Ansiedade toda vez que abre o extrato ou a fatura",
    "Medo de chegar aos 60 sem nenhuma seguranca financeira",
    "Culpa por cada compra — e culpa por nao comprar tambem",
  ];
  const root = [
    "Crencas herdadas: 'dinheiro e sujo', 'rico e desonesto', 'nao nasci pra isso'",
    "Ciclo de culpa e recompensa que transforma consumo em valvula emocional",
    "Uma identidade construida em torno de 'nao sou boa com dinheiro'",
    "Padroes familiares repetidos sem consciencia, geracao apos geracao",
  ];

  return (
    <section className="relative py-20 sm:py-28 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#060606] via-[#0a0a0a] to-[#060606]" />
      <div className="divider-gold absolute top-0 inset-x-0" />

      <div className="relative z-10 max-w-[880px] mx-auto px-5 sm:px-8">
        <R><SectionLabel>Voce se identifica?</SectionLabel></R>
        <R d={0.08}>
          <h2 className="font-display text-[1.6rem] sm:text-3xl md:text-4xl font-bold text-center leading-tight mb-4">
            Voce nao tem apenas um problema com dinheiro.{" "}
            <span className="gold-text">Voce tem camadas.</span>
          </h2>
        </R>
        <R d={0.14}>
          <p className="text-[#888] text-center text-[15px] sm:text-base max-w-2xl mx-auto mb-14">
            A maioria das pessoas trata o sintoma. Mas o que controla seu dinheiro esta muito mais fundo do que voce imagina.
          </p>
        </R>

        {/* Camada 1 */}
        <R d={0.18}>
          <div className="mb-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded-full bg-white/[0.06] border border-white/[0.08] flex items-center justify-center text-sm text-[#999]">1</div>
              <p className="text-[#888] text-xs font-semibold tracking-[0.2em] uppercase">O que aparece na superficie</p>
            </div>
            <div className="space-y-2.5">
              {surface.map((item, i) => (
                <div key={i} className="glass-card flex items-center gap-4 px-5 py-4">
                  <span className="text-[#555] text-lg shrink-0">—</span>
                  <p className="text-[#bbb] text-sm leading-relaxed">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </R>

        {/* Camada 2 */}
        <R d={0.24}>
          <div className="mb-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded-full bg-[#9B72CF]/10 border border-[#9B72CF]/15 flex items-center justify-center text-sm text-[#9B72CF]">2</div>
              <p className="text-[#9B72CF] text-xs font-semibold tracking-[0.2em] uppercase">O que doi por dentro e voce nao conta pra ninguem</p>
            </div>
            <div className="space-y-2.5">
              {emotional.map((item, i) => (
                <div key={i} className="glass-card flex items-center gap-4 px-5 py-4" style={{ borderColor: "rgba(155,114,207,0.08)" }}>
                  <span className="text-[#9B72CF]/40 text-lg shrink-0">—</span>
                  <p className="text-[#bbb] text-sm leading-relaxed italic">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </R>

        {/* Camada 3 */}
        <R d={0.3}>
          <div className="mb-10">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded-full bg-[#C9A84C]/10 border border-[#C9A84C]/15 flex items-center justify-center text-sm text-[#C9A84C]">3</div>
              <p className="text-[#C9A84C] text-xs font-semibold tracking-[0.2em] uppercase">O que ninguem te ensinou a enxergar</p>
            </div>
            <div className="space-y-2.5">
              {root.map((item, i) => (
                <div key={i} className="gold-border-card flex items-center gap-4 px-5 py-4">
                  <span className="text-[#C9A84C]/40 text-lg shrink-0">&#9670;</span>
                  <p className="text-[#ccc] text-sm leading-relaxed">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </R>

        {/* Ponte */}
        <R d={0.35}>
          <div className="relative pl-6 border-l-2 border-[#C9A84C]/25 py-3">
            <p className="font-display text-lg sm:text-xl text-white/80 italic leading-relaxed">
              &ldquo;A maioria dos cursos comeca pela planilha e ignora a raiz.
              O <span className="not-italic gold-text font-semibold">Vida Rica</span> comeca pela sua mente.&rdquo;
            </p>
          </div>
        </R>

        <R d={0.4}>
          <div className="text-center mt-12">
            <a href="#metodo" className="inline-flex items-center gap-2 text-[#C9A84C] text-sm font-medium hover:text-[#E8D48B] transition-colors">
              Conheca o metodo que resolve isso
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" /></svg>
            </a>
          </div>
        </R>
      </div>
    </section>
  );
}

/* ════════════════════════════════════════════
   4. SEGMENTACAO — 3 perfis (SEM percentuais)
   ════════════════════════════════════════════ */
function SegmentationSection() {
  const profiles = [
    {
      icon: "&#9888;",
      title: "Vive no vermelho",
      quote: "Todo mes eu juro que vou me organizar, mas nunca consigo.",
      diagnosis: "Voce sabe que precisa mudar, mas nao sabe por onde comecar. O dinheiro parece escorregar entre os dedos e a sensacao e de que voce trabalha para pagar contas, nao para viver.",
      route: "Pilar 1 (Financas Comportamentais) → Pilar 2 (Mentalidade) → Pilar 4 (Organizacao Pratica) → Pilar 3 (Neurociencia)",
      result: "Sair do ciclo de endividamento e criar sua primeira reserva de seguranca.",
    },
    {
      icon: "&#8962;",
      title: "Se organiza, mas trava",
      quote: "Eu ganho bem, mas no fim do mes... cade o dinheiro?",
      diagnosis: "Voce nao esta devendo, mas tambem nao esta avancando. Sabe que poderia estar em uma posicao melhor, mas algo invisivel te trava — e nao e falta de informacao.",
      route: "Pilar 1 (Financas Comportamentais) → Pilar 3 (Neurociencia Aplicada) → Pilar 2 (Mentalidade) → Pilar 4 (Organizacao)",
      result: "Parar de sabotar seu proprio crescimento financeiro e construir patrimonio conscientemente.",
    },
    {
      icon: "&#9650;",
      title: "Quer ir mais longe",
      quote: "Ja me organizo, mas sei que minha mentalidade me limita.",
      diagnosis: "Voce tem controle basico, mas sente que existe um teto invisivel. Crencas antigas sobre dinheiro, riqueza e merecimento ainda operam por baixo das suas decisoes.",
      route: "Pilar 2 (Mentalidade) → Pilar 3 (Neurociencia Aplicada) → Pilar 1 (Financas Comportamentais) → Pilar 4 (Organizacao)",
      result: "Desbloquear o proximo nivel de prosperidade e criar uma relacao verdadeiramente livre com o dinheiro.",
    },
  ];

  return (
    <section className="relative py-20 sm:py-28 overflow-hidden">
      <div className="absolute inset-0 bg-[#060606]" />
      <div className="divider-lilac absolute top-0 inset-x-0" />

      <div className="relative z-10 max-w-[1100px] mx-auto px-5 sm:px-8">
        <R><SectionLabel color="#9B72CF">Para quem e o Vida Rica?</SectionLabel></R>
        <R d={0.08}>
          <h2 className="font-display text-[1.6rem] sm:text-3xl md:text-4xl font-bold text-center leading-tight mb-4">
            Nao importa de onde voce comeca.{" "}
            <span className="lilac-text">Existe um caminho para voce.</span>
          </h2>
        </R>
        <R d={0.14}>
          <p className="text-[#888] text-center text-[15px] max-w-xl mx-auto mb-14">
            Tres perfis diferentes, um unico metodo que se adapta a sua realidade.
          </p>
        </R>

        <div className="grid md:grid-cols-3 gap-5">
          {profiles.map((p, i) => (
            <R key={i} d={0.18 + i * 0.08}>
              <div className="glass-card p-6 sm:p-7 h-full flex flex-col">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-2xl" dangerouslySetInnerHTML={{ __html: p.icon }} />
                  <h3 className="text-white font-semibold text-base">{p.title}</h3>
                </div>
                <p className="text-[#9B72CF] text-sm italic mb-4 border-l-2 border-[#9B72CF]/20 pl-3">&ldquo;{p.quote}&rdquo;</p>
                <p className="text-[#888] text-[13px] leading-relaxed mb-5">{p.diagnosis}</p>
                <div className="mt-auto">
                  <p className="text-[#C9A84C] text-[11px] tracking-wider uppercase mb-2 font-semibold">Sua rota no metodo:</p>
                  <p className="text-[#aaa] text-[12px] leading-relaxed mb-3">{p.route}</p>
                  <div className="flex items-start gap-2 bg-[#C9A84C]/[0.05] rounded-lg p-3 border border-[#C9A84C]/[0.08]">
                    <Check />
                    <p className="text-[#ccc] text-[13px] leading-relaxed">{p.result}</p>
                  </div>
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
   5. MENTORA — Historia com [[PREENCHER]]
   ════════════════════════════════════════════ */
function MentorSection() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], [-15, 15]);

  return (
    <section ref={ref} className="relative py-20 sm:py-28 overflow-hidden" id="sobre">
      <div className="absolute inset-0 bg-gradient-to-b from-[#060606] via-[#080808] to-[#060606]" />
      <div className="divider-gold absolute top-0 inset-x-0" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-[#C9A84C]/[0.03] rounded-full blur-[180px] pointer-events-none" />

      <div className="relative z-10 max-w-[1100px] mx-auto px-5 sm:px-8">
        <div className="grid lg:grid-cols-[1fr_1.2fr] gap-10 lg:gap-16 items-center">
          <R y={0}>
            <motion.div style={{ y: imgY }} className="relative flex justify-center lg:justify-start">
              <div className="relative w-[260px] sm:w-[320px] lg:w-full max-w-[400px]">
                <div className="absolute -inset-4 bg-gradient-to-br from-[#C9A84C]/[0.06] to-[#9B72CF]/[0.04] rounded-2xl blur-2xl pointer-events-none" />
                <div className="relative overflow-hidden rounded-2xl border border-white/[0.08] shadow-2xl shadow-black/30">
                  <Image src="/images/about-photo.jpeg" alt="Deyllane Lacerda" width={560} height={750} className="w-full h-auto object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#060606]/40 via-transparent to-transparent" />
                </div>
              </div>
            </motion.div>
          </R>

          <div>
            <R><SectionLabel color="#C9A84C">Sua Mentora</SectionLabel></R>
            <R d={0.08}>
              <h2 className="font-display text-3xl sm:text-4xl font-bold mb-2 tracking-tight">Deyllane Lacerda</h2>
            </R>
            <R d={0.12}>
              <p className="text-[#C9A84C] text-xs tracking-[0.15em] uppercase mb-7">Economista &middot; Contadora &middot; Especialista em Financas Comportamentais</p>
            </R>

            <R d={0.16}>
              <p className="text-[#999] text-[15px] leading-[1.85] mb-4">
                {/* [[PREENCHER: Historia pessoal de virada da Deyllane — o "antes". Ex: situacao financeira dificil, momento de crise, etc.]] */}
                Deyllane conheceu de perto o que e ter uma relacao disfuncional com o dinheiro. [[PREENCHER: descrever o momento de virada pessoal — o que aconteceu na vida financeira dela que a fez mudar]].
              </p>
            </R>
            <R d={0.2}>
              <p className="text-[#999] text-[15px] leading-[1.85] mb-4">
                Formada em Economia e Contabilidade, ela percebeu que o conhecimento tecnico <strong className="text-white font-medium">nao resolvia o problema real</strong> das pessoas com dinheiro. Via clientes ganhando bem e terminando o mes sem nada. O erro nao estava na conta — <strong className="text-white font-medium">estava na mente.</strong>
              </p>
            </R>
            <R d={0.24}>
              <p className="text-[#999] text-[15px] leading-[1.85] mb-4">
                O mercado ensinava ferramentas, mas ignorava os <span className="text-[#C9A84C] font-medium">comportamentos invisiveis</span> que sabotam cada decisao financeira. Foi ai que ela uniu economia, neurociencia e psicologia comportamental em um unico metodo.
              </p>
            </R>
            <R d={0.28}>
              <p className="text-[#999] text-[15px] leading-[1.85] mb-7">
                {/* [[PREENCHER: Resultado pessoal concreto — quitou dividas em X meses, ha quantos anos atua, etc.]] */}
                [[PREENCHER: resultado pessoal concreto e ha quantos anos atua com educacao financeira]]. O resultado dessa jornada e o <span className="gold-text font-semibold">Vida Rica</span>.
              </p>
            </R>

            <R d={0.32}>
              <div className="py-5 border-t border-b border-white/[0.06] mb-6">
                <p className="font-display text-base sm:text-lg text-white/70 italic leading-relaxed">
                  &ldquo;Uma Vida Rica nao comeca quando voce ganha mais. Comeca quando voce aprende a <span className="not-italic gold-text font-semibold">pensar, decidir e agir diferente</span> com o dinheiro.&rdquo;
                </p>
                <p className="text-[#C9A84C] text-xs mt-3 tracking-wider">— Deyllane Lacerda</p>
              </div>
            </R>

            <R d={0.36}>
              <a href={INSTA} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-[#888] hover:text-[#B794E0] transition-colors text-sm">
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
   6. METODO — 4 pilares (Neurociencia = diferencial)
   ════════════════════════════════════════════ */
function MethodSection() {
  const pillars = [
    { n: "01", title: "Financas Comportamentais", desc: "Entenda como emocoes e crencas inconscientes sabotam cada decisao financeira que voce toma. Aqui voce identifica os padroes que controlam seu dinheiro sem voce perceber.", tag: null },
    { n: "02", title: "Mentalidade Financeira", desc: "Reprograme a forma como voce pensa sobre dinheiro, riqueza e prosperidade. Substitua crencas limitantes por uma identidade financeira de abundancia.", tag: null },
    { n: "03", title: "Neurociencia Aplicada", desc: "Descubra como o cerebro processa escolhas financeiras e aprenda a criar novos habitos que funcionam no piloto automatico — a seu favor, nao contra voce.", tag: "Diferencial unico" },
    { n: "04", title: "Organizacao Pratica", desc: "Ferramentas, estrategias e sistemas reais para organizar sua vida financeira no dia a dia. Sem planilha complicada, sem jargao — so o que funciona.", tag: null },
  ];

  return (
    <section className="relative py-20 sm:py-28 overflow-hidden" id="metodo">
      <div className="absolute inset-0 bg-[#060606]" />
      <div className="divider-gold absolute top-0 inset-x-0" />

      <div className="relative z-10 max-w-[1100px] mx-auto px-5 sm:px-8">
        <R><SectionLabel>O Metodo Vida Rica</SectionLabel></R>
        <R d={0.08}>
          <h2 className="font-display text-[1.6rem] sm:text-3xl md:text-4xl font-bold text-center leading-tight mb-4">
            Nao e um curso. E uma{" "}
            <span className="gold-text">jornada de transformacao em 4 pilares.</span>
          </h2>
        </R>
        <R d={0.14}>
          <p className="text-[#888] text-center text-[15px] max-w-2xl mx-auto mb-14">
            Cada pilar resolve uma camada do problema. Voce avanca na ordem certa — do desbloqueio emocional a acao pratica.
          </p>
        </R>

        <div className="grid md:grid-cols-2 gap-5">
          {pillars.map((p, i) => (
            <R key={i} d={0.18 + i * 0.08}>
              <div className="glass-card p-6 sm:p-8 h-full relative overflow-hidden">
                {p.tag && (
                  <span className="absolute top-4 right-4 text-[9px] font-bold tracking-wider uppercase bg-[#C9A84C]/15 text-[#C9A84C] px-3 py-1.5 rounded-full border border-[#C9A84C]/25">
                    {p.tag}
                  </span>
                )}
                <div className="flex items-center gap-4 mb-5">
                  <span className="text-[#C9A84C]/20 font-display text-4xl font-bold leading-none">{p.n}</span>
                  <div className="h-[1px] flex-1 bg-gradient-to-r from-[#C9A84C]/12 to-transparent" />
                </div>
                <h3 className="text-white font-semibold text-base sm:text-lg mb-3">{p.title}</h3>
                <p className="text-[#888] text-sm leading-relaxed">{p.desc}</p>
              </div>
            </R>
          ))}
        </div>

        <R d={0.5}>
          <div className="text-center mt-14">
            <a href={KIWIFY} target="_blank" rel="noopener noreferrer" className="cta-primary">
              Quero comecar minha jornada <Arrow />
            </a>
          </div>
        </R>
      </div>
    </section>
  );
}

/* ════════════════════════════════════════════
   7. COMPARATIVA — Vida Rica vs Mercado
   ════════════════════════════════════════════ */
function ComparisonSection() {
  const rows = [
    { criteria: "Abordagem", others: "So planilha e corte de gastos", vr: "Comportamento + mente + pratica" },
    { criteria: "Base cientifica", others: "Opiniao e experiencia pessoal", vr: "Neurociencia + economia comportamental" },
    { criteria: "Crencas e emocoes", others: "Ignoradas ou tratadas como frescura", vr: "Primeiro pilar do metodo" },
    { criteria: "Padroes familiares", others: "Nunca mencionados", vr: "Identificados e reprogramados" },
    { criteria: "Organizacao financeira", others: "Planilha generica que voce abandona", vr: "Sistema pratico adaptado a sua realidade" },
    { criteria: "Resultado esperado", others: "Saber o que fazer (e nao conseguir)", vr: "Pensar, decidir e agir diferente" },
  ];

  return (
    <section className="relative py-20 sm:py-28 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#060606] via-[#080808] to-[#060606]" />
      <div className="divider-lilac absolute top-0 inset-x-0" />

      <div className="relative z-10 max-w-[900px] mx-auto px-5 sm:px-8">
        <R><SectionLabel color="#9B72CF">Por que isso e diferente</SectionLabel></R>
        <R d={0.08}>
          <h2 className="font-display text-[1.6rem] sm:text-3xl md:text-4xl font-bold text-center leading-tight mb-12">
            Nao se compara com o que existe no mercado.
          </h2>
        </R>

        <R d={0.16}>
          <div className="overflow-x-auto -mx-5 sm:mx-0 px-5 sm:px-0">
            <table className="w-full min-w-[580px] sm:min-w-0 text-sm">
              <thead>
                <tr>
                  <th className="text-left text-[#888] text-xs font-semibold tracking-wider uppercase pb-4 pr-4 w-[28%]">Criterio</th>
                  <th className="text-left text-[#888] text-xs font-semibold tracking-wider uppercase pb-4 pr-4 w-[36%]">Cursos tradicionais</th>
                  <th className="text-left text-xs font-semibold tracking-wider uppercase pb-4 w-[36%]"><span className="gold-text">Vida Rica</span></th>
                </tr>
              </thead>
              <tbody>
                {rows.map((r, i) => (
                  <tr key={i} className="border-t border-white/[0.05]">
                    <td className="py-4 pr-4 text-[#ccc] font-medium text-[13px]">{r.criteria}</td>
                    <td className="py-4 pr-4 text-[#666] text-[13px]">
                      <span className="flex items-center gap-2"><span className="text-red-400/60">&#10005;</span> {r.others}</span>
                    </td>
                    <td className="py-4 text-[#ccc] text-[13px]">
                      <span className="flex items-center gap-2"><span className="text-[#C9A84C]">&#10003;</span> {r.vr}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </R>
      </div>
    </section>
  );
}

/* ════════════════════════════════════════════
   8. DEPOIMENTOS — [[PREENCHER]]
   ════════════════════════════════════════════ */
function TestimonialsSection() {
  const categories = [
    { label: "Transformacao emocional", testimonials: [{ name: "[[PREENCHER: Nome A.]]", quote: "[[PREENCHER: depoimento sobre mudanca emocional com dinheiro]]" }] },
    { label: "Saiu das dividas", testimonials: [{ name: "[[PREENCHER: Nome B.]]", quote: "[[PREENCHER: depoimento sobre sair do endividamento]]" }] },
    { label: "Organizacao financeira", testimonials: [{ name: "[[PREENCHER: Nome C.]]", quote: "[[PREENCHER: depoimento sobre organizacao e controle]]" }] },
  ];

  return (
    <section className="relative py-20 sm:py-28 overflow-hidden">
      <div className="absolute inset-0 bg-[#060606]" />
      <div className="divider-gold absolute top-0 inset-x-0" />

      <div className="relative z-10 max-w-[1100px] mx-auto px-5 sm:px-8">
        <R><SectionLabel>Resultados reais</SectionLabel></R>
        <R d={0.08}>
          <h2 className="font-display text-[1.6rem] sm:text-3xl md:text-4xl font-bold text-center leading-tight mb-4">
            Quem aplicou,{" "}<span className="gold-text">transformou.</span>
          </h2>
        </R>
        <R d={0.14}>
          <p className="text-[#888] text-center text-[15px] max-w-xl mx-auto mb-14">
            [[PREENCHER: subtitulo quando tiver depoimentos reais]]
          </p>
        </R>

        <div className="grid md:grid-cols-3 gap-5">
          {categories.map((cat, i) => (
            <R key={i} d={0.18 + i * 0.08}>
              <div className="glass-card p-6 h-full">
                <p className="text-[#C9A84C] text-[10px] font-semibold tracking-[0.2em] uppercase mb-5">{cat.label}</p>
                {cat.testimonials.map((t, j) => (
                  <div key={j} className="mb-4 last:mb-0">
                    <p className="text-[#bbb] text-sm italic leading-relaxed mb-2">&ldquo;{t.quote}&rdquo;</p>
                    <p className="text-[#888] text-xs font-medium">— {t.name}</p>
                  </div>
                ))}
                <div className="mt-4 p-5 rounded-xl bg-white/[0.02] border border-dashed border-white/[0.08] text-center">
                  <p className="text-[#555] text-[11px]">[[PREENCHER: print do depoimento]]</p>
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
   9. ENTREGAS — O que voce recebe (so o real)
   ════════════════════════════════════════════ */
function DeliverySection() {
  const blocks = [
    {
      category: "O Metodo",
      items: [
        { title: "Treinamento Vida Rica completo", desc: "Todas as aulas em video, com acesso por 1 ano. Assista no seu ritmo, de qualquer dispositivo." },
        { title: "4 pilares integrados", desc: "Financas Comportamentais + Mentalidade + Neurociencia + Organizacao Pratica — nessa ordem." },
      ],
    },
    {
      category: "O Material",
      items: [
        { title: "Material de apoio", desc: "[[PREENCHER: descrever exatamente o que o aluno recebe — exercicios, PDFs, reflexoes, etc.]]" },
        { title: "Acesso multiplataforma", desc: "Assista pelo celular, tablet ou computador. Sua conta fica ativa por 12 meses completos." },
      ],
    },
  ];

  return (
    <section className="relative py-20 sm:py-28 overflow-hidden" id="beneficios">
      <div className="absolute inset-0 bg-gradient-to-b from-[#060606] via-[#080808] to-[#060606]" />
      <div className="divider-gold absolute top-0 inset-x-0" />

      <div className="relative z-10 max-w-[1000px] mx-auto px-5 sm:px-8">
        <R><SectionLabel>Tudo que voce recebe</SectionLabel></R>
        <R d={0.08}>
          <h2 className="font-display text-[1.6rem] sm:text-3xl md:text-4xl font-bold text-center leading-tight mb-14">
            Seu acesso completo ao{" "}<span className="gold-text">Vida Rica</span>
          </h2>
        </R>

        <div className="space-y-8">
          {blocks.map((block, i) => (
            <R key={i} d={0.14 + i * 0.08}>
              <div>
                <p className="text-[#C9A84C] text-[10px] font-bold tracking-[0.25em] uppercase mb-4">{block.category}</p>
                <div className="grid sm:grid-cols-2 gap-4">
                  {block.items.map((item, j) => (
                    <div key={j} className="glass-card p-5 sm:p-6">
                      <div className="flex items-start gap-3">
                        <Check />
                        <div>
                          <h4 className="text-white font-semibold text-sm mb-1.5">{item.title}</h4>
                          <p className="text-[#888] text-[13px] leading-relaxed">{item.desc}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </R>
          ))}
        </div>

        <R d={0.35}>
          <div className="text-center mt-14">
            <a href={KIWIFY} target="_blank" rel="noopener noreferrer" className="cta-primary">
              Quero comecar agora <Arrow />
            </a>
          </div>
        </R>
      </div>
    </section>
  );
}

/* ════════════════════════════════════════════
   10. OFERTA — Sem ancoragem, com reenquadramento
   ════════════════════════════════════════════ */
function OfferSection() {
  const included = [
    "Treinamento Vida Rica completo (4 pilares)",
    "Aulas em video com acesso por 1 ano",
    "Material de apoio e exercicios praticos",
    "Acesso de qualquer dispositivo",
    "Garantia legal de 7 dias (art. 49 do CDC)",
  ];

  return (
    <section className="relative py-20 sm:py-28 overflow-hidden" id="oferta">
      <div className="absolute inset-0 bg-[#060606]" />
      <div className="divider-gold absolute top-0 inset-x-0" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#C9A84C]/[0.03] rounded-full blur-[200px] pointer-events-none" />

      <div className="relative z-10 max-w-[620px] mx-auto px-5 sm:px-8">
        <R><SectionLabel>Investimento</SectionLabel></R>
        <R d={0.08}>
          <h2 className="font-display text-[1.6rem] sm:text-3xl md:text-4xl font-bold text-center leading-tight mb-12">
            Quanto custa transformar sua{" "}
            <span className="gold-text">relacao com o dinheiro?</span>
          </h2>
        </R>

        <R d={0.16}>
          <div className="glass-card p-7 sm:p-10 border-[#C9A84C]/[0.12] text-center">
            <Image src="/images/logo.png" alt="Vida Rica" width={100} height={36} className="h-7 w-auto mx-auto mb-8" />

            <div className="space-y-3.5 text-left mb-8">
              {included.map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <Check />
                  <p className="text-[#ccc] text-sm">{item}</p>
                </div>
              ))}
            </div>

            <div className="divider-gold my-8" />

            <div className="text-left mb-8 space-y-2.5">
              <p className="text-[#666] text-xs font-semibold tracking-wider uppercase mb-3">Compare com o mercado:</p>
              <div className="flex justify-between text-[13px] border-b border-white/[0.05] pb-2.5">
                <span className="text-[#888]">1 sessao de terapia financeira</span>
                <span className="text-[#666]">R$ 200+</span>
              </div>
              <div className="flex justify-between text-[13px] border-b border-white/[0.05] pb-2.5">
                <span className="text-[#888]">Consultoria financeira (1 mes)</span>
                <span className="text-[#666]">R$ 500+</span>
              </div>
              <div className="flex justify-between text-[13px] border-b border-white/[0.05] pb-2.5">
                <span className="text-[#888]">Curso presencial de financas</span>
                <span className="text-[#666]">R$ 1.200+</span>
              </div>
            </div>

            <p className="text-[#888] text-xs tracking-[0.15em] uppercase mb-3">Tudo isso por apenas</p>
            <div className="flex items-baseline justify-center gap-1 mb-1">
              <span className="text-[#C9A84C] text-xl font-medium">R$</span>
              <span className="font-display text-6xl sm:text-7xl font-bold gold-text leading-none">97</span>
            </div>
            <p className="text-[#666] text-xs mb-2">Pagamento unico &middot; Acesso por 1 ano completo</p>
            <p className="text-[#C9A84C] text-sm font-medium mb-8" style={{ opacity: 0.75 }}>
              Menos de R$ 0,27 por dia. Menos que um cafe.
            </p>

            <div className="flex justify-center gap-6 mb-7 text-[#777] text-xs tracking-wider">
              <span>Pix</span>
              <span className="text-[#333]">&middot;</span>
              <span>Cartao</span>
              <span className="text-[#333]">&middot;</span>
              <span>Boleto</span>
            </div>

            <a href={KIWIFY} target="_blank" rel="noopener noreferrer" className="cta-full">
              QUERO FAZER MINHA MATRICULA <Arrow />
            </a>

            <div className="flex items-center justify-center gap-2 mt-5 text-[#666] text-[11px]">
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
   11. SELOS DE CONFIANCA
   ════════════════════════════════════════════ */
function TrustSection() {
  const badges = [
    { icon: <svg className="w-7 h-7 text-[#C9A84C]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>, title: "Compra segura", desc: "Processada pela Kiwify, plataforma lider em produtos digitais. Seus dados estao 100% protegidos." },
    { icon: <svg className="w-7 h-7 text-[#C9A84C]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>, title: "Acesso imediato", desc: "Apos a confirmacao do pagamento (Pix ou cartao), seu acesso e liberado na hora." },
    { icon: <svg className="w-7 h-7 text-[#C9A84C]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>, title: "Garantia de 7 dias", desc: "Direito de arrependimento conforme art. 49 do CDC. Reembolso integral dentro do prazo legal." },
  ];

  return (
    <section className="relative py-16 sm:py-20 overflow-hidden">
      <div className="absolute inset-0 bg-[#060606]" />
      <div className="relative z-10 max-w-[900px] mx-auto px-5 sm:px-8">
        <div className="grid md:grid-cols-3 gap-4">
          {badges.map((b, i) => (
            <R key={i} d={0.08 + i * 0.08}>
              <div className="glass-card p-5 sm:p-6 text-center h-full">
                <div className="w-12 h-12 rounded-full bg-[#C9A84C]/[0.08] flex items-center justify-center mx-auto mb-4">{b.icon}</div>
                <h3 className="text-white font-semibold text-sm mb-2">{b.title}</h3>
                <p className="text-[#888] text-[13px] leading-relaxed">{b.desc}</p>
              </div>
            </R>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ════════════════════════════════════════════
   12. GARANTIA — Art. 49 do CDC
   ════════════════════════════════════════════ */
function GuaranteeSection() {
  return (
    <section className="relative py-16 sm:py-24 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#060606] via-[#080808] to-[#060606]" />
      <div className="divider-gold absolute top-0 inset-x-0" />

      <div className="relative z-10 max-w-[680px] mx-auto px-5 sm:px-8">
        <R>
          <div className="gold-border-card p-7 sm:p-10 text-center">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#C9A84C]/15 to-[#C9A84C]/5 flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8 text-[#C9A84C]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>

            <h3 className="font-display text-2xl sm:text-3xl font-bold text-white mb-5">
              Garantia legal de 7 dias
            </h3>
            <p className="text-[#999] text-[15px] leading-relaxed mb-4">
              Conforme o <strong className="text-white font-medium">art. 49 do Codigo de Defesa do Consumidor</strong>, voce tem 7 dias corridos a partir da data da compra para solicitar o reembolso integral, sem necessidade de justificativa.
            </p>
            <p className="text-[#999] text-[15px] leading-relaxed mb-4">
              Para exercer esse direito, basta entrar em contato pelo e-mail ou WhatsApp informados nesta pagina dentro do prazo de 7 dias. O reembolso sera processado pela plataforma Kiwify.
            </p>
            <p className="text-[#999] text-[15px] leading-relaxed mb-6">
              Conforme o <strong className="text-white font-medium">art. 46 do CDC</strong>, todas as condicoes desta oferta estao descritas de forma clara nesta pagina. Voce sabe exatamente o que esta adquirindo antes de comprar.
            </p>
          </div>
        </R>
      </div>
    </section>
  );
}

/* ════════════════════════════════════════════
   13. QUALIFICACAO — E / Nao e para voce
   ════════════════════════════════════════════ */
function QualificationSection() {
  const yes = [
    "Quer entender POR QUE repete os mesmos erros financeiros",
    "Esta disposta a olhar para dentro antes de olhar para a planilha",
    "Quer sair do ciclo de culpa e ansiedade com dinheiro",
    "Busca uma transformacao real, nao uma receita magica",
    "Tem pelo menos 20 minutos por dia para as aulas",
    "Quer construir uma relacao saudavel com dinheiro para a vida toda",
  ];
  const no = [
    "Busca formula de dinheiro facil ou rapido",
    "Nao esta disposta a questionar crencas e habitos antigos",
    "Quer apenas mais uma planilha ou app de controle",
    "Nao vai dedicar tempo para assistir e aplicar o conteudo",
    "Prefere terceirizar responsabilidade em vez de assumir o controle",
  ];

  return (
    <section className="relative py-20 sm:py-28 overflow-hidden">
      <div className="absolute inset-0 bg-[#060606]" />
      <div className="divider-lilac absolute top-0 inset-x-0" />

      <div className="relative z-10 max-w-[1000px] mx-auto px-5 sm:px-8">
        <R><SectionLabel color="#9B72CF">Esse metodo e para voce?</SectionLabel></R>
        <R d={0.08}>
          <h2 className="font-display text-[1.6rem] sm:text-3xl md:text-4xl font-bold text-center leading-tight mb-12">
            O Vida Rica nao e para todo mundo.
          </h2>
        </R>

        <div className="grid md:grid-cols-2 gap-5">
          <R d={0.16}>
            <div className="qual-yes p-6 sm:p-7 h-full">
              <p className="text-green-400 text-xs font-bold tracking-[0.2em] uppercase mb-5">&#10003; E para voce se</p>
              <div className="space-y-4">
                {yes.map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <Check color="#22c55e" />
                    <p className="text-[#ccc] text-sm leading-relaxed">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </R>

          <R d={0.22}>
            <div className="qual-no p-6 sm:p-7 h-full">
              <p className="text-red-400 text-xs font-bold tracking-[0.2em] uppercase mb-5">&#10005; NAO e para voce se</p>
              <div className="space-y-4">
                {no.map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="shrink-0 w-5 h-5 rounded-full bg-red-500/10 flex items-center justify-center mt-0.5">
                      <span className="text-red-400 text-xs">&#10005;</span>
                    </div>
                    <p className="text-[#999] text-sm leading-relaxed">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </R>
        </div>

        <R d={0.3}>
          <p className="text-center text-[#888] text-sm mt-8 italic">
            Se voce leu a coluna da esquerda e se identificou com pelo menos 3 itens — esse treinamento foi feito para voce.
          </p>
        </R>

        <R d={0.35}>
          <div className="text-center mt-10">
            <a href={KIWIFY} target="_blank" rel="noopener noreferrer" className="cta-primary">
              O metodo e para mim — quero entrar <Arrow />
            </a>
          </div>
        </R>
      </div>
    </section>
  );
}

/* ════════════════════════════════════════════
   14. DADOS DE MERCADO
   ════════════════════════════════════════════ */
function MarketDataSection() {
  const stats = [
    { number: "78%", label: "das familias brasileiras terminam o mes sem sobrar dinheiro", source: "SPC Brasil / CNDL" },
    { number: "67M+", label: "de brasileiros estao endividados atualmente", source: "Serasa Experian" },
    { number: "58%", label: "dos brasileiros nao fazem nenhum tipo de controle financeiro", source: "SPC Brasil" },
    { number: "48%", label: "das pessoas gastam mais do que ganham por impulso emocional", source: "[[PREENCHER: verificar fonte exata — CNDL/SPC Brasil]]" },
  ];

  return (
    <section className="relative py-20 sm:py-28 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#060606] via-[#0a0a0a] to-[#060606]" />
      <div className="divider-gold absolute top-0 inset-x-0" />

      <div className="relative z-10 max-w-[1100px] mx-auto px-5 sm:px-8">
        <R><SectionLabel>O cenario real</SectionLabel></R>
        <R d={0.08}>
          <h2 className="font-display text-[1.6rem] sm:text-3xl md:text-4xl font-bold text-center leading-tight mb-4">
            O movimento ja esta acontecendo.{" "}
            <span className="gold-text">O risco e ficar de fora.</span>
          </h2>
        </R>
        <R d={0.14}>
          <p className="text-[#888] text-center text-[15px] max-w-2xl mx-auto mb-14">
            Os numeros mostram: o problema nao e falta de dinheiro — e falta de preparo emocional e comportamental para lidar com ele.
          </p>
        </R>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {stats.map((s, i) => (
            <R key={i} d={0.18 + i * 0.06}>
              <div className="glass-card p-6 text-center h-full">
                <p className="font-display text-4xl sm:text-5xl font-bold gold-text mb-3">{s.number}</p>
                <p className="text-[#bbb] text-sm leading-relaxed mb-3">{s.label}</p>
                <p className="text-[#555] text-[10px] tracking-wider uppercase">Fonte: {s.source}</p>
              </div>
            </R>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ════════════════════════════════════════════
   15. FAQ
   ════════════════════════════════════════════ */
function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-white/[0.06]">
      <button onClick={() => setOpen(!open)} className="w-full flex items-center justify-between py-5 sm:py-6 text-left cursor-pointer group">
        <span className="text-[#ccc] text-sm sm:text-[15px] pr-6 group-hover:text-white transition-colors duration-300 font-medium">{q}</span>
        <motion.span animate={{ rotate: open ? 45 : 0 }} transition={{ duration: 0.2 }} className="text-[#C9A84C] text-xl shrink-0 leading-none font-light">+</motion.span>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3, ease: EASE }} className="overflow-hidden">
            <p className="text-[#888] text-sm leading-relaxed pb-5 sm:pb-6 pr-10">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function FaqSection() {
  const faqs = [
    { q: "Preciso entender de financas para fazer o treinamento?", a: "Nao. O Vida Rica foi criado para pessoas comuns, sem termos complicados. A linguagem e simples, pratica e direta. Se voce sabe o que e uma conta de luz, sabe o suficiente para comecar." },
    { q: "Ja fiz outros cursos de financas e nao funcionou. Por que esse seria diferente?", a: "Porque outros cursos focam em planilha e numeros. O Vida Rica comeca pelo comportamento — a raiz do problema. Nao adianta saber COMO organizar se voce nao entende POR QUE desorganiza. E por isso que esse metodo funciona onde os outros falharam." },
    { q: "Estou endividada. Isso serve pra mim?", a: "Especialmente para voce. O treinamento te ajuda a entender os comportamentos que criaram as dividas — e te da o caminho para sair desse ciclo sem culpa e com estrategia." },
    { q: "Nao tenho tempo. Consigo acompanhar?", a: "As aulas sao curtas e voce assiste no seu ritmo, de qualquer dispositivo. Com 20 minutos por dia voce consegue avancar de forma consistente. E o acesso e por 1 ano inteiro." },
    { q: "E se nao funcionar pra mim?", a: "Voce tem 7 dias de garantia conforme o art. 49 do Codigo de Defesa do Consumidor. Se dentro desse prazo voce decidir que nao e para voce, solicite o reembolso integral pelo e-mail ou WhatsApp." },
    { q: "E so mais um curso motivacional sobre dinheiro?", a: "Nao. O Vida Rica e baseado em ciencia — financas comportamentais, neurociencia e economia. Nao e sobre 'pensar positivo'. E sobre entender como seu cerebro toma decisoes financeiras e reprogramar padroes reais." },
    { q: "Por quanto tempo tenho acesso ao conteudo?", a: "Voce tera 1 ano de acesso completo a todas as aulas e materiais, a partir do momento da compra." },
    { q: "Posso assistir pelo celular?", a: "Sim! O treinamento e 100% online e funciona em qualquer dispositivo — celular, tablet ou computador." },
    { q: "Quando comeco a ter acesso?", a: "Imediatamente apos a confirmacao do pagamento. Se pagar via Pix ou cartao, o acesso e liberado na hora." },
    { q: "Quais as formas de pagamento?", a: "Pix (acesso imediato), cartao de credito (acesso imediato) e boleto bancario (acesso apos compensacao, geralmente 1-2 dias uteis)." },
  ];

  return (
    <section className="relative py-20 sm:py-28 overflow-hidden" id="duvidas">
      <div className="absolute inset-0 bg-[#060606]" />
      <div className="divider-gold absolute top-0 inset-x-0" />

      <div className="relative z-10 max-w-[680px] mx-auto px-5 sm:px-8">
        <R><SectionLabel>Duvidas frequentes</SectionLabel></R>
        <R d={0.08}>
          <h2 className="font-display text-[1.6rem] sm:text-3xl md:text-4xl font-bold text-center leading-tight mb-12">
            Ainda tem alguma duvida?
          </h2>
        </R>

        <div>
          {faqs.map((f, i) => (
            <R key={i} d={0.1 + i * 0.02}>
              <FaqItem q={f.q} a={f.a} />
            </R>
          ))}
        </div>

        <R d={0.4}>
          <div className="text-center mt-10 p-6 glass-card">
            <p className="text-[#ccc] text-sm mb-4">Ficou com alguma duvida? Fale diretamente:</p>
            <a href={WA_LINK} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-green-600/90 hover:bg-green-600 text-white text-sm font-semibold px-6 py-3 rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-green-600/20">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
              Falar com o suporte
            </a>
          </div>
        </R>
      </div>
    </section>
  );
}

/* ════════════════════════════════════════════
   16. BIFURCACAO FINAL
   ════════════════════════════════════════════ */
function BifurcationSection() {
  return (
    <section className="relative py-24 sm:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-t from-[#060606] via-[#0a0908] to-[#060606]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#C9A84C]/[0.03] rounded-full blur-[200px] pointer-events-none" />
      <div className="divider-gold absolute top-0 inset-x-0" />

      <div className="relative z-10 max-w-[1000px] mx-auto px-5 sm:px-8">
        <R>
          <h2 className="font-display text-[1.8rem] sm:text-4xl md:text-5xl font-bold text-center mb-4 leading-[1.1]">
            Daqui a um ano, voce vai desejar ter{" "}
            <span className="gold-text">comecado hoje.</span>
          </h2>
        </R>
        <R d={0.08}>
          <p className="text-[#888] text-center text-base sm:text-lg mb-12 max-w-lg mx-auto">
            Voce tem duas opcoes agora. Nenhuma e neutra.
          </p>
        </R>

        <div className="grid md:grid-cols-2 gap-5 mb-12">
          <R d={0.16}>
            <div className="qual-no p-6 sm:p-7 h-full">
              <p className="text-red-400/80 text-xs font-bold tracking-[0.2em] uppercase mb-4">Opcao 1 — Fechar esta pagina</p>
              <div className="space-y-3 text-[#888] text-sm leading-relaxed">
                <p>Continuar fazendo o que sempre fez.</p>
                <p>Daqui a 12 meses, o dinheiro ainda vai sumir sem explicacao.</p>
                <p>A fatura do cartao vai continuar maior do que deveria.</p>
                <p>A culpa, a vergonha e a ansiedade continuam no mesmo lugar.</p>
                <p className="italic text-[#666]">Nada muda se nada muda.</p>
              </div>
            </div>
          </R>

          <R d={0.22}>
            <div className="gold-border-card p-6 sm:p-7 h-full">
              <p className="text-[#C9A84C] text-xs font-bold tracking-[0.2em] uppercase mb-4">Opcao 2 — Entrar no Vida Rica</p>
              <div className="space-y-3 text-[#ccc] text-sm leading-relaxed">
                <p>Entender de verdade por que voce age assim com dinheiro.</p>
                <p>Quebrar os padroes que se repetem ha anos — talvez ha geracoes.</p>
                <p>Construir uma relacao consciente, livre de culpa e de medo.</p>
                <p>Daqui a 12 meses, olhar para tras e nao se reconhecer.</p>
                <p className="font-medium text-white">Uma decisao. Um clique. Uma vida diferente.</p>
              </div>
            </div>
          </R>
        </div>

        <R d={0.3}>
          <div className="text-center">
            <a href={KIWIFY} target="_blank" rel="noopener noreferrer" className="cta-primary text-[15px] px-10 py-5">
              EU ESCOLHO A OPCAO 2 <Arrow />
            </a>
            <p className="text-[#666] text-xs mt-5">
              R$ 97,00 &middot; Acesso imediato &middot; Garantia de 7 dias &middot; 1 ano de conteudo
            </p>
          </div>
        </R>
      </div>
    </section>
  );
}

/* ════════════════════════════════════════════
   17. FOOTER
   ════════════════════════════════════════════ */
function Footer() {
  return (
    <footer className="relative py-14 border-t border-white/[0.05]">
      <div className="max-w-[1100px] mx-auto px-5 sm:px-8">
        <div className="flex flex-col items-center text-center">
          <Image src="/images/logo.png" alt="Vida Rica" width={110} height={40} className="h-8 w-auto mb-6" />

          <p className="text-[#666] text-xs mb-5">
            Deyllane Lacerda &middot; Economista &middot; Contadora &middot; Especialista em Financas Comportamentais
          </p>

          <div className="flex flex-wrap justify-center gap-x-6 gap-y-3 mb-6 text-[#666] text-xs">
            <a href={INSTA} target="_blank" rel="noopener noreferrer" className="hover:text-[#9B72CF] transition-colors flex items-center gap-1.5">
              <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" /></svg>
              @lacerdadeyllane
            </a>
            <a href={WA_LINK} target="_blank" rel="noopener noreferrer" className="hover:text-green-400 transition-colors flex items-center gap-1.5">
              <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
              (98) 98567-9867
            </a>
            <a href="mailto:dey.lacerda82@gmail.com" className="hover:text-[#C9A84C] transition-colors flex items-center gap-1.5">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
              dey.lacerda82@gmail.com
            </a>
          </div>

          <div className="divider-gold w-full mb-6" />

          <div className="max-w-2xl text-center mb-4">
            <p className="text-[#444] text-[10px] leading-relaxed">
              <strong className="text-[#555]">Aviso legal:</strong> Os resultados apresentados nesta pagina sao ilustrativos e podem variar de pessoa para pessoa. O treinamento Vida Rica oferece conhecimento e ferramentas, mas os resultados dependem da dedicacao e aplicacao individual de cada aluno. Este produto nao garante resultados financeiros especificos. Ao adquirir, voce concorda com os termos de uso da plataforma Kiwify.
            </p>
          </div>

          <p className="text-[#333] text-[11px]">
            &copy; {new Date().getFullYear()} Vida Rica. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}

/* ════════════════════════════════════════════
   PAGE — Composicao final
   ════════════════════════════════════════════ */
export default function Home() {
  return (
    <main className="bg-[#060606]">
      <Header />
      <Hero />
      <PainSection />
      <SegmentationSection />
      <MentorSection />
      <MethodSection />
      <ComparisonSection />
      <TestimonialsSection />
      <DeliverySection />
      <OfferSection />
      <TrustSection />
      <GuaranteeSection />
      <QualificationSection />
      <MarketDataSection />
      <FaqSection />
      <BifurcationSection />
      <Footer />
    </main>
  );
}
