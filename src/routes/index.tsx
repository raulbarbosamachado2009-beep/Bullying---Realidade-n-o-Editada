import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { AnimatePresence, motion } from "motion/react";
import { CheckCircle2, ChevronRight, Hand, XCircle } from "lucide-react";
import { useEffect, useState } from "react";
import {
  Eye,
  Flag,
  HeartHandshake,
  Layers,
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
import GradientWave from "@/components/ui/gradient-wave";
import TextLoop from "@/components/ui/text-loop";
import { toast } from "sonner";

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
  { Icon: RefreshCcw, label: "Como reverter uma situação" },
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
  const [waveOn, setWaveOn] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setWaveOn(true), 1400);
    return () => clearTimeout(t);
  }, []);

  return (
    <>
      <AnimatedBackground />
      {waveOn ? (
        <div
          aria-hidden="true"
          className="pointer-events-none fixed inset-0 -z-10 animate-fade-in opacity-40 [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_70%)]"
        >
          <GradientWave
            colors={["#0ea5e9", "#1e293b", "#38bdf8", "#0f172a"]}
            shadowPower={6}
            darkenTop
          />
        </div>
      ) : null}
      <main className="relative flex h-dvh flex-col items-center justify-center overflow-hidden px-4 pb-[max(4rem,env(safe-area-inset-bottom))] pt-[max(3rem,env(safe-area-inset-top))] sm:px-6 sm:py-16">
        <AnimatePresence mode="wait">
          {step === 0 ? <Welcome key="s0" onNext={() => setStep(1)} /> : null}
          {step === 1 ? <Topics key="s1" onNext={() => setStep(2)} /> : null}
          {step === 2 ? <Quiz key="s2" onNext={() => setStep(3)} /> : null}
          {step === 3 ? <LoginStep key="s3" /> : null}
        </AnimatePresence>

        <nav
          aria-label="Progresso"
          className="absolute bottom-[max(1rem,env(safe-area-inset-bottom))] flex gap-2 sm:bottom-6"
        >
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
      <h1 className="text-4xl font-semibold leading-[1.08] text-gradient sm:text-6xl lg:text-7xl">
        Olá! <Hand aria-hidden="true" className="ml-2 inline size-8 text-primary lg:hidden" />
        <span className="mt-3 block text-lg font-medium text-muted-foreground sm:text-2xl lg:text-3xl">
          Seja bem-vindo à Imersão Bullying – Realidade não Editada
        </span>
      </h1>
      <TextLoop
        className="mt-6 text-sm font-medium sm:text-base"
        staticText="Uma imersão sobre"
        rotatingTexts={["respeito", "empatia", "coragem", "convivência"]}
        staticTextClassName="text-muted-foreground"
        rotatingTextClassName="font-semibold text-primary"
        backgroundClassName="bg-primary/10 rounded-full"
      />
      <Button size="lg" className="mt-8 rounded-full px-10 text-base sm:mt-12" onClick={onNext}>
        Começar
      </Button>
    </motion.section>
  );
}

function Topics({ onNext }: { onNext: () => void }) {
  return (
    <motion.section {...screen} className="w-full max-w-3xl">
      <h2 className="text-center text-2xl font-semibold text-gradient sm:text-4xl lg:text-5xl">
        Aqui vamos aprender:
      </h2>
      <ul className="mx-auto mt-6 grid gap-2 sm:mt-10 sm:grid-cols-2 sm:gap-3">
        {topics.map((t, i) => (
          <motion.li
            key={t.label}
            initial={{ opacity: 0, x: -16, filter: "blur(6px)" }}
            animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.6, delay: 0.15 + i * 0.08, ease }}
          >
            <GlassCard className="flex items-center gap-3 rounded-2xl p-3 sm:p-4">
              <t.Icon className="size-5 shrink-0 text-primary" aria-hidden="true" />
              <span className="text-sm">{t.label}</span>
            </GlassCard>
          </motion.li>
        ))}
      </ul>
      <div className="mt-6 text-center sm:mt-10">
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
      <h2 className="mt-3 text-center text-lg font-semibold leading-snug sm:text-2xl lg:text-3xl">
        Se algum colega de classe zomba de você por questões relacionadas à raça, etnia ou religião,
        você:
      </h2>

      <ul className="mt-5 space-y-2 sm:mt-8 sm:space-y-3">
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
                className={`focus-ring glass flex w-full items-center gap-4 rounded-2xl px-4 py-3 text-left text-sm transition-all sm:px-5 sm:py-4 duration-500 hover:scale-[1.01] ${
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
            className="mt-4 sm:mt-6"
          >
            <GlassCard className="flex items-start gap-3 rounded-2xl p-4">
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

      <div className="mt-5 text-center sm:mt-8">
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
  const [mode, setMode] = useState<"entrar" | "criar">("entrar");

  return (
    <motion.section {...screen} className="grid w-full max-w-6xl gap-6 lg:grid-cols-2 lg:gap-10">
      <div className="flex items-center">
        <div className="w-full">
          <h2 className="text-center text-3xl font-semibold sm:text-4xl">
            {mode === "entrar" ? "Bem-vindo de volta" : "Criar sua conta"}
          </h2>
          <p className="mt-2 text-center text-sm text-muted-foreground">
            {mode === "entrar"
              ? "Entre para continuar a imersão"
              : "Leva menos de um minuto"}
          </p>

          <div
            role="tablist"
            aria-label="Modo de acesso"
            className="glass mx-auto mt-7 grid max-w-sm grid-cols-2 gap-1 rounded-2xl p-1"
          >
            {(["entrar", "criar"] as const).map((m) => (
              <button
                key={m}
                type="button"
                role="tab"
                aria-selected={mode === m}
                onClick={() => setMode(m)}
                className="focus-ring relative rounded-xl py-2.5 text-sm font-medium text-muted-foreground transition-colors aria-selected:text-foreground"
              >
                {mode === m ? (
                  <motion.span
                    layoutId="auth-pill"
                    aria-hidden="true"
                    className="absolute inset-0 rounded-xl bg-secondary"
                  />
                ) : null}
                <span className="relative">{m === "entrar" ? "Entrar" : "Criar conta"}</span>
              </button>
            ))}
          </div>

          <form
            className="mx-auto mt-5 max-w-sm space-y-3"
            onSubmit={(e) => {
              e.preventDefault();
              const nome = String(new FormData(e.currentTarget).get("nome") ?? "").trim();
              if (!nome) {
                toast.error("Escreva seu nome para continuar");
                return;
              }
              const id = toast.loading(mode === "entrar" ? "Entrando…" : "Criando conta…");
              setTimeout(() => {
                toast.success(`Bem-vindo, ${nome}!`, { id });
                navigate({ to: "/home" });
              }, 600);
            }}
          >
            <div className="relative">
              <UserRound
                aria-hidden="true"
                className="pointer-events-none absolute left-4 top-1/2 size-5 -translate-y-1/2 text-muted-foreground"
              />
              <Label htmlFor="nome" className="sr-only">
                Nome
              </Label>
              <Input
                id="nome"
                name="nome"
                placeholder="Seu nome"
                autoComplete="name"
                className="h-14 rounded-2xl pl-12 text-base"
              />
            </div>

            <div className="relative">
              <GraduationCap
                aria-hidden="true"
                className="pointer-events-none absolute left-4 top-1/2 size-5 -translate-y-1/2 text-muted-foreground"
              />
              <Label htmlFor="turma" className="sr-only">
                Turma
              </Label>
              <Input
                id="turma"
                name="turma"
                placeholder="Turma (opcional)"
                className="h-14 rounded-2xl pl-12 text-base"
              />
            </div>

            <div className="flex items-center justify-between pt-1 text-sm">
              <label className="flex cursor-pointer items-center gap-2 text-muted-foreground">
                <input
                  type="checkbox"
                  name="lembrar"
                  className="focus-ring size-4 rounded border-border accent-primary"
                />
                Lembrar de mim
              </label>
              <button
                type="button"
                onClick={() => toast("Acesso simbólico: basta escrever seu nome.")}
                className="focus-ring font-medium text-primary"
              >
                Precisa de ajuda?
              </button>
            </div>

            <Button type="submit" size="lg" className="mt-2 h-14 w-full rounded-2xl text-base">
              {mode === "entrar" ? "Entrar" : "Criar conta"}
              <ChevronRight className="size-4" aria-hidden="true" />
            </Button>

            <p className="pt-1 text-center text-sm text-muted-foreground">
              {mode === "entrar" ? "Não tem conta? " : "Já tem conta? "}
              <button
                type="button"
                onClick={() => setMode(mode === "entrar" ? "criar" : "entrar")}
                className="focus-ring font-semibold text-foreground"
              >
                {mode === "entrar" ? "Criar conta" : "Entrar"}
              </button>
            </p>
          </form>
        </div>
      </div>

      <ul className="hidden gap-3 sm:grid sm:grid-cols-2 lg:gap-4">
        {infoCards.map((c, i) => (
          <motion.li
            key={c.title}
            initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.6, delay: 0.15 + i * 0.07, ease }}
          >
            <GlassCard interactive className="h-full rounded-2xl p-4 lg:p-6">
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
