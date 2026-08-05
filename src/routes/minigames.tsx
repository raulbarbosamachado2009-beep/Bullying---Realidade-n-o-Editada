import { createFileRoute } from "@tanstack/react-router";
import { AnimatePresence, motion } from "motion/react";
import { Brain, CheckCircle2, Gamepad2, PenLine, Scale, XCircle } from "lucide-react";
import { useState } from "react";
import { AnimatedBackground } from "@/components/AnimatedBackground";
import { Footer } from "@/components/Footer";
import { GlassCard } from "@/components/GlassCard";
import { Navbar } from "@/components/Navbar";
import { PageTransition } from "@/components/PageTransition";
import { SectionTitle } from "@/components/SectionTitle";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/minigames")({
  head: () => ({
    meta: [
      { title: "Minigames Educativos — Imersão Bullying" },
      {
        name: "description",
        content:
          "Quiz, verdadeiro ou falso e desafios de atitude para aprender a identificar e combater o bullying.",
      },
      { property: "og:title", content: "Minigames Educativos — Imersão Bullying" },
      {
        property: "og:description",
        content: "Jogos rápidos que ensinam empatia, prevenção e como agir diante do bullying.",
      },
    ],
  }),
  component: MinigamesPage,
});

type Question = { prompt: string; options: string[]; correct: number; explain: string };

type Game = {
  id: string;
  title: string;
  description: string;
  Icon: typeof Brain;
  questions: Question[];
};

const games: Game[] = [
  {
    id: "quiz",
    title: "Quiz",
    description: "Teste seus conhecimentos sobre os conceitos essenciais.",
    Icon: Brain,
    questions: [
      {
        prompt: "O que caracteriza o bullying?",
        options: [
          "Uma briga isolada entre colegas",
          "Agressões repetidas e intencionais com desequilíbrio de poder",
          "Qualquer desentendimento na sala",
        ],
        correct: 1,
        explain:
          "Bullying é repetitivo, intencional e envolve desequilíbrio de poder entre as partes.",
      },
      {
        prompt: "Quem pode ajudar a interromper uma situação de bullying?",
        options: [
          "Apenas a vítima",
          "Somente os pais",
          "Toda a comunidade escolar, inclusive quem observa",
        ],
        correct: 2,
        explain: "Quem observa tem papel decisivo: silenciar fortalece o agressor.",
      },
    ],
  },
  {
    id: "vf",
    title: "Verdadeiro ou Falso",
    description: "Separe mitos de fatos sobre convivência escolar.",
    Icon: Scale,
    questions: [
      {
        prompt: "“Bullying é só brincadeira e faz parte do crescimento.”",
        options: ["Verdadeiro", "Falso"],
        correct: 1,
        explain: "Falso. Bullying causa sofrimento real e impactos duradouros na saúde mental.",
      },
      {
        prompt: "“Cyberbullying pode acontecer 24 horas por dia.”",
        options: ["Verdadeiro", "Falso"],
        correct: 0,
        explain: "Verdadeiro. O ambiente digital não tem pausa, o que amplia o sofrimento.",
      },
    ],
  },
  {
    id: "atitude",
    title: "Escolha a Melhor Atitude",
    description: "Decida como agir em cenários reais do dia a dia.",
    Icon: Gamepad2,
    questions: [
      {
        prompt: "Você vê um colega sendo humilhado em um grupo de mensagens. Você:",
        options: [
          "Sai do grupo em silêncio",
          "Registra o print e comunica um adulto responsável",
          "Responde com outra ofensa",
        ],
        correct: 1,
        explain: "Registrar e comunicar protege a vítima e cria provas para a escola agir.",
      },
    ],
  },
  {
    id: "situacao",
    title: "Complete a Situação",
    description: "Finalize a cena escolhendo o desfecho mais empático.",
    Icon: PenLine,
    questions: [
      {
        prompt: "No recreio, alguém está sempre sozinho. A melhor atitude é…",
        options: [
          "…deixar como está, é escolha dele",
          "…convidar para participar e apresentar o grupo",
          "…comentar sobre isso com outros colegas",
        ],
        correct: 1,
        explain: "O acolhimento reduz o isolamento, principal fator de risco em casos de bullying.",
      },
    ],
  },
];

function MinigamesPage() {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [index, setIndex] = useState(0);
  const [choice, setChoice] = useState<number | null>(null);
  const [score, setScore] = useState(0);

  const game = games.find((g) => g.id === activeId) ?? null;
  const question = game?.questions[index] ?? null;
  const finished = game !== null && index >= game.questions.length;

  function start(id: string) {
    setActiveId(id);
    setIndex(0);
    setChoice(null);
    setScore(0);
  }

  function next() {
    setIndex((i) => i + 1);
    setChoice(null);
  }

  return (
    <PageTransition>
      <AnimatedBackground />
      <Navbar />
      <main className="px-6 pb-24 pt-36">
        <SectionTitle
          eyebrow="Minigames"
          title="Aprender jogando"
          subtitle="Quatro desafios rápidos com pontuação local. Nada é enviado para lugar nenhum."
        />

        <div className="mx-auto mt-14 grid max-w-5xl gap-5 sm:grid-cols-2">
          {games.map((g, i) => (
            <motion.div
              key={g.id}
              initial={{ opacity: 0, y: 28, filter: "blur(8px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: i * 0.08, ease: [0.32, 0.72, 0, 1] }}
            >
              <GlassCard interactive className="flex h-full flex-col gap-4 p-8">
                <span className="glass inline-flex size-12 items-center justify-center rounded-2xl">
                  <g.Icon className="size-6 text-primary" aria-hidden="true" />
                </span>
                <h3 className="text-xl font-semibold">{g.title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{g.description}</p>
                <Button className="mt-auto w-fit rounded-full" onClick={() => start(g.id)}>
                  Jogar
                </Button>
              </GlassCard>
            </motion.div>
          ))}
        </div>

        <AnimatePresence>
          {game ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35 }}
              className="fixed inset-0 z-[60] flex items-center justify-center bg-black/70 p-4 backdrop-blur-xl"
              role="dialog"
              aria-modal="true"
              aria-label={game.title}
            >
              <motion.div
                initial={{ scale: 0.94, y: 20, opacity: 0 }}
                animate={{ scale: 1, y: 0, opacity: 1 }}
                exit={{ scale: 0.96, opacity: 0 }}
                transition={{ duration: 0.5, ease: [0.32, 0.72, 0, 1] }}
                className="glass w-full max-w-xl rounded-3xl p-8"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-xs uppercase tracking-[0.2em] text-primary">{game.title}</p>
                    <p className="mt-1 text-sm text-muted-foreground">
                      Pontuação: {score}/{game.questions.length}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setActiveId(null)}
                    className="focus-ring rounded-full px-3 py-2 text-sm text-muted-foreground hover:text-foreground"
                  >
                    Fechar
                  </button>
                </div>

                {finished || !question ? (
                  <div className="mt-8 text-center">
                    <h3 className="text-2xl font-semibold">Muito bem!</h3>
                    <p className="mt-2 text-sm text-muted-foreground">
                      Você acertou {score} de {game.questions.length} desafios.
                    </p>
                    <div className="mt-6 flex justify-center gap-3">
                      <Button className="rounded-full" onClick={() => start(game.id)}>
                        Jogar novamente
                      </Button>
                      <Button
                        variant="secondary"
                        className="rounded-full"
                        onClick={() => setActiveId(null)}
                      >
                        Voltar
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="mt-6">
                    <h3 className="text-xl font-semibold leading-snug">{question.prompt}</h3>
                    <ul className="mt-6 space-y-3">
                      {question.options.map((opt, i) => {
                        const selected = choice === i;
                        const isCorrect = i === question.correct;
                        return (
                          <li key={opt}>
                            <button
                              type="button"
                              disabled={choice !== null}
                              onClick={() => {
                                setChoice(i);
                                if (isCorrect) setScore((s) => s + 1);
                              }}
                              className={`focus-ring w-full rounded-2xl border px-5 py-4 text-left text-sm transition-all duration-500 ${
                                choice !== null && isCorrect
                                  ? "border-success/60 bg-success/10"
                                  : selected
                                    ? "border-destructive/60 bg-destructive/10"
                                    : "border-border hover:border-white/30 hover:bg-white/5"
                              }`}
                            >
                              {opt}
                            </button>
                          </li>
                        );
                      })}
                    </ul>

                    {choice !== null ? (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.45, ease: [0.32, 0.72, 0, 1] }}
                        className="mt-6"
                      >
                        <p className="flex items-start gap-2 text-sm text-muted-foreground">
                          {choice === question.correct ? (
                            <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-success" />
                          ) : (
                            <XCircle className="mt-0.5 size-4 shrink-0 text-destructive" />
                          )}
                          {question.explain}
                        </p>
                        <Button className="mt-5 w-full rounded-full" onClick={next}>
                          Continuar
                        </Button>
                      </motion.div>
                    ) : null}
                  </div>
                )}
              </motion.div>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </main>
      <Footer />
    </PageTransition>
  );
}