import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { AnimatePresence, motion } from "motion/react";
import { CheckCircle2, ChevronRight, XCircle } from "lucide-react";
import { useState } from "react";
import {
  Eye,
  Flag,
  HeartHandshake,
  Layers,
  LifeBuoy,
  MessageSquare,
  RefreshCcw,
  ShieldAlert,
  ShieldCheck,
  Sparkle,
  Users,
} from "lucide-react";
import { AnimatedBackground } from "@/components/AnimatedBackground";
import { GlassCard } from "@/components/GlassCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Imersão Bullying – Realidade não Editada" },
      {
        name: "description",
        content:
          "Experiência interativa para estudantes: entenda, identifique, previna e saiba como agir diante do bullying.",
      },
      { property: "og:title", content: "Imersão Bullying – Realidade não Editada" },
      {
        property: "og:description",
        content: "Uma imersão educativa sobre bullying, empatia e convivência escolar.",
      },
    ],
  }),
  component: Wizard,
});

const ease = [0.32, 0.72, 0, 1] as const;

const topics = [
  { Icon: ShieldAlert, label: "O que é Bullying" },
  { Icon: Layers, label: "Tipos de Bullying" },
  { Icon: Eye, label: "Como identificar" },
  { Icon: ShieldCheck, label: "Como prevenir" },
  { Icon: Flag, label: "Como agir" },
  { Icon: MessageSquare, label: "Como denunciar" },
  { Icon: HeartHandshake, label: "Como apoiar uma vítima" },
  { Icon: RefreshCcw, label: "Como reverter uma situação de bullying" },
];

const options = [
  {
    label: "Reportaria à coordenação da escola",
    good: true,
    feedback:
      "Excelente escolha. A coordenação pode registrar o caso, mediar e acionar as medidas previstas — discriminação racial ou religiosa é crime, não brincadeira.",
  },
  {
    label: "Conversaria com um professor",
    good: true,
    feedback:
      "Ótimo caminho. Um adulto de confiança pode acolher você e encaminhar a situação para quem tem responsabilidade de agir.",
  },
  {
    label: "Ignoraria",
    good: false,
    feedback:
      "Ignorar raramente interrompe o ciclo. O silêncio costuma dar espaço para que as agressões se repitam e aumentem.",
  },
  {
    label: "Retrucaria com ofensas",
    good: false,
    feedback:
      "Responder com ofensas amplia o conflito e pode colocar você em risco. Violência não se corrige com violência.",
  },
  {
    label: "Incentivaria outros colegas",
    good: false,
    feedback:
      "Envolver mais pessoas na agressão transforma o caso em violência coletiva e agrava profundamente o sofrimento.",
  },
];

const infoCards = [
  { Icon: Layers, title: "Tipos de Bullying", text: "Físico, verbal, social, virtual e mais." },
  { Icon: Eye, title: "Como Identificar", text: "Sinais silenciosos que pedem atenção." },
  { Icon: Flag, title: "Como Denunciar", text: "Caminhos seguros dentro da escola." },
  { Icon: HeartHandshake, title: "Empatia", text: "Enxergar o outro antes de julgar." },
  { Icon: Sparkle, title: "Respeito", text: "A base de qualquer convivência." },
  { Icon: Users, title: "Convivência Escolar", text: "Um ambiente seguro é construído junto." },
];

function Wizard() {
  const [step, setStep] = useState(0);

  return (
    <>
      <AnimatedBackground />
      <main className="relative flex min-h-dvh flex-col items-center justify-center overflow-hidden px-6 py-24">
        <AnimatePresence mode="wait">
          {step === 0 ? <Welcome key="s0" onNext={() => setStep(1)} /> : null}
          {step === 1 ? <Topics key="s1" onNext={() => setStep(2)} /> : null}
          {step === 2 ? <Quiz key="s2" onNext={() => setStep(3)} /> : null}
          {step === 3 ? <LoginStep key="s3" /> : null}
        </AnimatePresence>

        <nav aria-label="Progresso" className="absolute bottom-8 flex gap-2">
          {[0, 1, 2, 3].map((i) => (
            <span
              key={i}
              aria-current={i === step ? "step" : undefined}
              className={`h-1.5 rounded-full transition-all duration-500 ${
                i === step ? "w-8 bg-primary" : "w-1.5 bg-white/20"
              }`}
            />
          ))}
        </nav>
      </main>
    </>
  );
}

const screen = {
  initial: { opacity: 0, filter: "blur(14px)", y: 24 },
  animate: { opacity: 1, filter: "blur(0px)", y: 0 },
  exit: { opacity: 0, filter: "blur(14px)", y: -24 },
  transition: { duration: 0.7, ease },
};

function Welcome({ onNext }: { onNext: () => void }) {
  return (
    <motion.section {...screen} className="w-full max-w-3xl text-center">
      <h1 className="text-5xl font-semibold leading-[1.08] text-gradient sm:text-7xl">
        Olá!
        <span className="mt-4 block text-2xl font-medium text-muted-foreground sm:text-3xl">
          Seja bem-vindo à Imersão Bullying – Realidade não Editada
        </span>
      </h1>
      <Button size="lg" className="mt-12 rounded-full px-10 text-base" onClick={onNext}>
        Começar
      </Button>
    </motion.section>
  );
}

function Topics({ onNext }: { onNext: () => void }) {
  return (
    <motion.section {...screen} className="w-full max-w-3xl">
      <h2 className="text-center text-4xl font-semibold text-gradient sm:text-5xl">
        Aqui vamos aprender:
      </h2>
      <ul className="mx-auto mt-12 grid gap-3 sm:grid-cols-2">
        {topics.map((t, i) => (
          <motion.li
            key={t.label}
            initial={{ opacity: 0, x: -16, filter: "blur(6px)" }}
            animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.6, delay: 0.15 + i * 0.08, ease }}
          >
            <GlassCard className="flex items-center gap-3 rounded-2xl p-4">
              <t.Icon className="size-5 shrink-0 text-primary" aria-hidden="true" />
              <span className="text-sm">{t.label}</span>
            </GlassCard>
          </motion.li>
        ))}
      </ul>
      <div className="mt-12 text-center">
        <Button size="lg" className="rounded-full px-10" onClick={onNext}>
          Continuar
        </Button>
      </div>
    </motion.section>
  );
}

function Quiz({ onNext }: { onNext: () => void }) {
  const [selected, setSelected] = useState<number | null>(null);
  const chosen = selected === null ? null : options[selected]!;

  return (
    <motion.section {...screen} className="w-full max-w-2xl">
      <p className="text-center text-xs uppercase tracking-[0.25em] text-primary">Questão Teste</p>
      <h2 className="mt-4 text-center text-2xl font-semibold leading-snug sm:text-3xl">
        Se algum colega de classe zomba de você por questões relacionadas à raça, etnia ou religião,
        você:
      </h2>

      <ul className="mt-10 space-y-3">
        {options.map((o, i) => {
          const isSelected = selected === i;
          return (
            <motion.li
              key={o.label}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.1 + i * 0.06, ease }}
            >
              <button
                type="button"
                aria-pressed={isSelected}
                onClick={() => setSelected(i)}
                className={`focus-ring glass flex w-full items-center gap-4 rounded-2xl px-5 py-4 text-left text-sm transition-all duration-500 hover:scale-[1.01] ${
                  isSelected
                    ? o.good
                      ? "border-success/60"
                      : "border-destructive/60"
                    : "hover:border-white/25"
                }`}
              >
                <span
                  aria-hidden="true"
                  className={`inline-block size-4 shrink-0 rounded-full border transition-colors ${
                    isSelected
                      ? o.good
                        ? "border-success bg-success"
                        : "border-destructive bg-destructive"
                      : "border-white/40"
                  }`}
                />
                {o.label}
              </button>
            </motion.li>
          );
        })}
      </ul>

      <AnimatePresence mode="wait">
        {chosen ? (
          <motion.div
            key={chosen.label}
            initial={{ opacity: 0, y: 12, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -8, filter: "blur(8px)" }}
            transition={{ duration: 0.5, ease }}
            role="status"
            className="mt-8"
          >
            <GlassCard className="flex items-start gap-3 rounded-2xl p-5">
              {chosen.good ? (
                <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-success" aria-hidden="true" />
              ) : (
                <XCircle className="mt-0.5 size-5 shrink-0 text-destructive" aria-hidden="true" />
              )}
              <p className="text-sm leading-relaxed text-muted-foreground">{chosen.feedback}</p>
            </GlassCard>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <div className="mt-10 text-center">
        <Button
          size="lg"
          className="rounded-full px-10"
          disabled={selected === null}
          onClick={onNext}
        >
          Continuar
        </Button>
      </div>
    </motion.section>
  );
}

function LoginStep() {
  const navigate = useNavigate();

  return (
    <motion.section {...screen} className="grid w-full max-w-6xl gap-10 lg:grid-cols-2">
      <div className="flex items-center">
        <GlassCard className="w-full p-8 sm:p-10">
          <h2 className="text-3xl font-semibold text-gradient">Entrar</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Acesso simbólico, apenas para continuar a experiência.
          </p>
          <form
            className="mt-8 space-y-5"
            onSubmit={(e) => {
              e.preventDefault();
              navigate({ to: "/home" });
            }}
          >
            <div className="space-y-2">
              <Label htmlFor="nome">Nome</Label>
              <Input id="nome" name="nome" placeholder="Seu nome" className="h-12 rounded-2xl" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="turma">Turma (opcional)</Label>
              <Input id="turma" name="turma" placeholder="Ex.: 9º B" className="h-12 rounded-2xl" />
            </div>
            <Button type="submit" size="lg" className="w-full rounded-full">
              Entrar
              <ChevronRight className="size-4" aria-hidden="true" />
            </Button>
          </form>
        </GlassCard>
      </div>

      <ul className="grid gap-4 sm:grid-cols-2">
        {infoCards.map((c, i) => (
          <motion.li
            key={c.title}
            initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.6, delay: 0.15 + i * 0.07, ease }}
          >
            <GlassCard interactive className="h-full rounded-2xl p-6">
              <span className="glass inline-flex size-10 items-center justify-center rounded-xl">
                <c.Icon className="size-5 text-primary" aria-hidden="true" />
              </span>
              <h3 className="mt-4 text-base font-semibold">{c.title}</h3>
              <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{c.text}</p>
            </GlassCard>
          </motion.li>
        ))}
      </ul>
    </motion.section>
  );
}

void LifeBuoy;
