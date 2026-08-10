import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import {
  AlertTriangle,
  Check,
  Globe,
  HeartHandshake,
  Landmark,
  MessageSquare,
  Sparkle,
  Users,
  Zap,
  Brain,
  ShieldCheck,
} from "lucide-react";
import { AnimatedBackground } from "@/components/AnimatedBackground";
import { Footer } from "@/components/Footer";
import { GlassCard } from "@/components/GlassCard";
import { Navbar } from "@/components/Navbar";
import { MobileTabBar, MobileTabBarSpacer, MobileTopBar } from "@/components/MobileShell";
import { PageTransition } from "@/components/PageTransition";
import { SectionTitle } from "@/components/SectionTitle";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export const Route = createFileRoute("/home")({
  head: () => ({
    meta: [
      { title: "Imersão Bullying — Realidade não Editada" },
      {
        name: "description",
        content:
          "Aprenda a identificar, prevenir, denunciar e reverter situações de bullying em uma experiência interativa para estudantes.",
      },
      { property: "og:title", content: "Imersão Bullying — Realidade não Editada" },
      {
        property: "og:description",
        content: "Experiência educativa sobre bullying: identificar, prevenir, agir e apoiar.",
      },
    ],
  }),
  component: HomePage,
});

const types = [
  { Icon: Zap, emoji: "💥", title: "Físico", text: "Empurrões, chutes, agressões e danos a pertences." },
  { Icon: MessageSquare, emoji: "🗯️", title: "Verbal", text: "Apelidos, xingamentos, humilhações e ameaças." },
  { Icon: Brain, emoji: "🧠", title: "Psicológico", text: "Chantagem, manipulação, intimidação e perseguição." },
  { Icon: Globe, emoji: "📱", title: "Virtual", text: "Cyberbullying: exposição e ataques em redes e grupos." },
  { Icon: Users, emoji: "🚷", title: "Social", text: "Exclusão deliberada, boatos e isolamento do grupo." },
  { Icon: Sparkle, emoji: "✊🏾", title: "Racial", text: "Ofensas relacionadas a raça, cor, etnia ou origem." },
  { Icon: Landmark, emoji: "🕊️", title: "Religioso", text: "Zombarias e discriminação por crença ou fé." },
];

const mobileShortcuts = [
  { to: "/minigames" as const, emoji: "🎮", title: "Minigames", text: "6 desafios rápidos" },
  { to: "/chat" as const, emoji: "🤖", title: "IA Educativa", text: "Tire suas dúvidas" },
  { to: "/home" as const, hash: "aprender", emoji: "📚", title: "Aprender", text: "Tipos e sinais" },
  { to: "/" as const, emoji: "🔄", title: "Recomeçar", text: "Refazer a imersão" },
];

const signs = [
  "Queda repentina no rendimento escolar",
  "Recusa constante em ir à escola",
  "Objetos pessoais danificados ou perdidos",
  "Mudança de humor, irritabilidade ou tristeza",
  "Isolamento de amigos e atividades",
  "Queixas frequentes de dores sem causa aparente",
];

const prevention = [
  { title: "Diálogo aberto", text: "Espaços seguros para falar sem medo de julgamento." },
  { title: "Educação emocional", text: "Trabalhar empatia, limites e resolução de conflitos." },
  { title: "Regras claras", text: "Combinados coletivos e consequências conhecidas por todos." },
  { title: "Protagonismo juvenil", text: "Estudantes como agentes de acolhimento na escola." },
];

const steps = [
  { title: "Reconheça", text: "Nomeie o que está acontecendo. Bullying não é brincadeira." },
  { title: "Registre", text: "Anote datas, locais e salve prints em casos virtuais." },
  { title: "Comunique", text: "Procure professores, coordenação ou responsáveis." },
  { title: "Acolha", text: "Apoie a vítima, escute sem culpar e mantenha presença." },
  { title: "Acompanhe", text: "Verifique se as medidas funcionaram e siga monitorando." },
];

const stats = [
  { label: "Verbal", value: 42 },
  { label: "Social", value: 27 },
  { label: "Virtual", value: 19 },
  { label: "Físico", value: 12 },
];

const faq = [
  {
    q: "Toda briga é bullying?",
    a: "Não. O bullying é repetitivo, intencional e envolve desequilíbrio de poder entre as pessoas.",
  },
  {
    q: "Quem presencia também tem responsabilidade?",
    a: "Sim. Quem observa pode interromper o ciclo ao não rir, não compartilhar e comunicar um adulto.",
  },
  {
    q: "Denunciar é 'dedurar'?",
    a: "Não. Denunciar protege alguém que está sofrendo e é um ato de responsabilidade coletiva.",
  },
  {
    q: "É possível reverter uma situação de bullying?",
    a: "Sim, com mediação, acompanhamento da escola, apoio à vítima e responsabilização educativa.",
  },
];

const reveal = {
  initial: { opacity: 0, y: 28, filter: "blur(8px)" },
  whileInView: { opacity: 1, y: 0, filter: "blur(0px)" },
  viewport: { once: true, margin: "-60px" },
};

function HomePage() {
  return (
    <PageTransition>
      <AnimatedBackground />
      <Navbar />
      <MobileTopBar emoji="🛡️" title="Imersão Bullying" subtitle="Realidade não Editada" />

      <main className="pt-14 lg:pt-0">
        <section
          id="inicio"
          className="relative flex min-h-[78dvh] items-center justify-center px-6 pt-10 text-center lg:min-h-dvh lg:pt-32"
        >
          <div className="mx-auto max-w-3xl">
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.32, 0.72, 0, 1] }}
              className="glass mx-auto w-fit rounded-full px-4 py-2 text-xs uppercase tracking-[0.25em] text-muted-foreground"
            >
              Realidade não Editada
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 30, filter: "blur(12px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 1, delay: 0.1, ease: [0.32, 0.72, 0, 1] }}
              className="mt-6 text-4xl font-semibold leading-[1.05] text-gradient sm:text-7xl lg:mt-8 lg:text-7xl"
            >
              Bullying não é brincadeira.
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.25, ease: [0.32, 0.72, 0, 1] }}
              className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-muted-foreground lg:mt-6 lg:text-lg"
            >
              Cada palavra deixa marca. Aqui você aprende a enxergar, interromper e transformar
              situações de violência dentro da escola.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.4, ease: [0.32, 0.72, 0, 1] }}
              className="mt-8 flex flex-wrap justify-center gap-3 lg:mt-10"
            >
              <Button asChild size="lg" className="rounded-full px-8">
                <Link to="/chat">🤖 Conversar com IA</Link>
              </Button>
              <Button asChild size="lg" variant="secondary" className="rounded-full px-8">
                <Link to="/minigames">🎮 Minigames</Link>
              </Button>
            </motion.div>
          </div>
        </section>

        <section aria-label="Atalhos" className="px-4 pb-2 lg:hidden">
          <ul className="grid grid-cols-2 gap-3">
            {mobileShortcuts.map((s) => (
              <li key={s.title}>
                <Link
                  to={s.to}
                  {...(s.hash ? { hash: s.hash } : {})}
                  className="focus-ring glass block rounded-3xl p-4 transition-transform active:scale-95"
                >
                  <span aria-hidden="true" className="text-2xl">
                    {s.emoji}
                  </span>
                  <p className="mt-2 text-sm font-semibold">{s.title}</p>
                  <p className="text-[11px] text-muted-foreground">{s.text}</p>
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <section id="sobre" className="px-6 py-14 lg:py-28">
          <SectionTitle
            eyebrow="Sobre o Projeto"
            title="Uma imersão que transforma o olhar"
            subtitle="Conteúdo educativo, linguagem direta e experiências interativas para provocar reflexão real dentro da sala de aula."
          />
          <div className="mx-auto mt-8 grid max-w-5xl gap-4 md:grid-cols-3 lg:mt-14 lg:gap-5">
            {[
              { Icon: ShieldCheck, e: "🛡️", t: "Conscientizar", d: "Mostrar o impacto real das agressões." },
              { Icon: HeartHandshake, e: "🤝", t: "Acolher", d: "Ensinar como apoiar quem sofre." },
              { Icon: AlertTriangle, e: "⚠️", t: "Agir", d: "Dar caminhos claros de denúncia e mediação." },
            ].map((c, i) => (
              <motion.div key={c.t} {...reveal} transition={{ duration: 0.7, delay: i * 0.1 }}>
                <GlassCard interactive className="h-full p-6 lg:p-8">
                  <span aria-hidden="true" className="text-2xl lg:hidden">
                    {c.e}
                  </span>
                  <c.Icon className="hidden size-6 text-primary lg:block" aria-hidden="true" />
                  <h3 className="mt-5 text-xl font-semibold">{c.t}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{c.d}</p>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </section>

        <section id="aprender" className="px-6 py-14 lg:py-28">
          <SectionTitle eyebrow="Tipos de Bullying" title="Nem sempre deixa marca visível" />
          <div className="mx-auto mt-8 grid max-w-6xl gap-3 sm:grid-cols-2 lg:mt-14 lg:grid-cols-3 lg:gap-5">
            {types.map((t, i) => (
              <motion.div key={t.title} {...reveal} transition={{ duration: 0.7, delay: i * 0.06 }}>
                <GlassCard interactive className="h-full p-5 lg:p-7">
                  <span aria-hidden="true" className="text-2xl lg:hidden">
                    {t.emoji}
                  </span>
                  <span className="glass hidden size-11 items-center justify-center rounded-2xl lg:inline-flex">
                    <t.Icon className="size-5 text-primary" aria-hidden="true" />
                  </span>
                  <h3 className="mt-3 text-base font-semibold lg:mt-5 lg:text-lg">{t.title}</h3>
                  <p className="mt-1 text-[13px] leading-relaxed text-muted-foreground lg:mt-2 lg:text-sm">
                    {t.text}
                  </p>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </section>

        <section className="px-6 py-14 lg:py-28">
          <SectionTitle eyebrow="Como Identificar" title="Sinais que pedem atenção" />
          <GlassCard className="mx-auto mt-8 max-w-3xl p-6 lg:mt-14 lg:p-8">
            <ul className="space-y-4">
              {signs.map((s, i) => (
                <motion.li
                  key={s}
                  {...reveal}
                  transition={{ duration: 0.6, delay: i * 0.07 }}
                  className="flex items-start gap-3 text-sm text-muted-foreground"
                >
                  <span className="mt-0.5 inline-flex size-5 shrink-0 items-center justify-center rounded-full bg-primary/20">
                    <Check className="size-3 text-primary" aria-hidden="true" />
                  </span>
                  {s}
                </motion.li>
              ))}
            </ul>
          </GlassCard>
        </section>

        <section className="px-6 py-14 lg:py-28">
          <SectionTitle eyebrow="Como Prevenir" title="A prevenção é coletiva" />
          <div className="mx-auto mt-8 grid max-w-5xl gap-4 sm:grid-cols-2 lg:mt-14 lg:gap-5">
            {prevention.map((p, i) => (
              <motion.div key={p.title} {...reveal} transition={{ duration: 0.7, delay: i * 0.08 }}>
                <GlassCard interactive className="h-full p-6 lg:p-8">
                  <h3 className="text-lg font-semibold">{p.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{p.text}</p>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </section>

        <section className="px-6 py-14 lg:py-28">
          <SectionTitle eyebrow="Como Agir" title="Cinco passos para interromper o ciclo" />
          <ol className="mx-auto mt-8 max-w-2xl border-l border-border pl-8 lg:mt-14">
            {steps.map((s, i) => (
              <motion.li
                key={s.title}
                {...reveal}
                transition={{ duration: 0.7, delay: i * 0.08 }}
                className="relative pb-10 last:pb-0"
              >
                <span
                  aria-hidden="true"
                  className="absolute -left-[41px] top-1 inline-flex size-6 items-center justify-center rounded-full bg-primary text-[11px] font-semibold text-primary-foreground"
                >
                  {i + 1}
                </span>
                <h3 className="text-lg font-semibold">{s.title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{s.text}</p>
              </motion.li>
            ))}
          </ol>
        </section>

        <section className="px-6 py-14 lg:py-28">
          <SectionTitle
            eyebrow="Dados Importantes"
            title="Distribuição ilustrativa"
            subtitle="Valores fictícios, usados apenas como exemplo visual em sala de aula."
          />
          <GlassCard className="mx-auto mt-8 max-w-3xl p-6 lg:mt-14 lg:p-8">
            <ul className="space-y-6">
              {stats.map((s, i) => (
                <li key={s.label}>
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium">{s.label}</span>
                    <span className="text-muted-foreground">{s.value}%</span>
                  </div>
                  <div className="mt-2 h-2 overflow-hidden rounded-full bg-white/10">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${s.value}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.1, delay: i * 0.1, ease: [0.32, 0.72, 0, 1] }}
                      className="h-full rounded-full bg-primary"
                    />
                  </div>
                </li>
              ))}
            </ul>
          </GlassCard>
        </section>

        <section className="px-6 py-14 lg:py-28">
          <SectionTitle eyebrow="FAQ" title="Perguntas Frequentes" />
          <GlassCard className="mx-auto mt-8 max-w-3xl p-4 lg:mt-14 lg:p-8">
            <Accordion type="single" collapsible className="w-full">
              {faq.map((f) => (
                <AccordionItem key={f.q} value={f.q} className="border-border">
                  <AccordionTrigger className="text-left text-base">{f.q}</AccordionTrigger>
                  <AccordionContent className="text-sm leading-relaxed text-muted-foreground">
                    {f.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </GlassCard>
        </section>

        <section className="px-6 pb-6 text-center lg:hidden">
          <p className="text-[11px] leading-relaxed text-muted-foreground">
            🛡️ Imersão Bullying — Realidade não Editada
            <br />© {new Date().getFullYear()} Projeto educativo escolar.
          </p>
        </section>
        <MobileTabBarSpacer />
      </main>

      <Footer />
      <MobileTabBar />
    </PageTransition>
  );
}