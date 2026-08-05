import { createFileRoute, Link } from "@tanstack/react-router";
import { AnimatePresence, motion } from "motion/react";
import { ArrowLeft, ArrowUp, Bot, User } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { AnimatedBackground } from "@/components/AnimatedBackground";
import { PageTransition } from "@/components/PageTransition";

export const Route = createFileRoute("/chat")({
  head: () => ({
    meta: [
      { title: "IA Educacional — Imersão Bullying" },
      {
        name: "description",
        content:
          "Converse com o assistente educacional sobre bullying: identificar, prevenir, agir e denunciar.",
      },
      { property: "og:title", content: "IA Educacional — Imersão Bullying" },
      {
        property: "og:description",
        content: "Interface de conversa educativa sobre bullying, respeito e empatia.",
      },
    ],
  }),
  component: ChatPage,
});

type Message = { id: number; role: "user" | "assistant"; text: string };

const initialMessages: Message[] = [
  {
    id: 0,
    role: "assistant",
    text: "Olá! Sou o assistente educacional da Imersão Bullying. Posso explicar tipos de bullying, sinais de alerta e formas de agir. Como posso ajudar?",
  },
];

const suggestions = [
  "O que é bullying?",
  "Como identificar sinais?",
  "Como denunciar na escola?",
  "Como apoiar uma vítima?",
];

function ChatPage() {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState("");
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  function send(text: string) {
    const value = text.trim();
    if (!value) return;
    setMessages((prev) => [
      ...prev,
      { id: prev.length, role: "user", text: value },
      {
        id: prev.length + 1,
        role: "assistant",
        text: "Esta interface está preparada para uma futura integração de IA. Enquanto isso, explore as seções educativas e os minigames para aprender sobre este tema.",
      },
    ]);
    setInput("");
  }

  return (
    <PageTransition>
      <AnimatedBackground />
      <div className="flex min-h-dvh flex-col">
        <header className="flex items-center gap-3 px-5 py-5">
          <Link
            to="/home"
            aria-label="Voltar para a home"
            className="focus-ring glass inline-flex size-11 items-center justify-center rounded-2xl"
          >
            <ArrowLeft className="size-5" aria-hidden="true" />
          </Link>
          <div>
            <h1 className="text-base font-semibold">IA Educacional</h1>
            <p className="text-xs text-muted-foreground">Interface demonstrativa</p>
          </div>
        </header>

        <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col px-4 pb-6">
          <div className="flex-1 space-y-6 overflow-y-auto py-6" role="log" aria-live="polite">
            <AnimatePresence initial={false}>
              {messages.map((m) => (
                <motion.div
                  key={m.id}
                  initial={{ opacity: 0, y: 12, filter: "blur(6px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  transition={{ duration: 0.5, ease: [0.32, 0.72, 0, 1] }}
                  className={
                    m.role === "user" ? "flex justify-end gap-3" : "flex justify-start gap-3"
                  }
                >
                  {m.role === "assistant" ? (
                    <span className="glass mt-1 inline-flex size-8 shrink-0 items-center justify-center rounded-full">
                      <Bot className="size-4 text-primary" aria-hidden="true" />
                    </span>
                  ) : null}
                  <p
                    className={
                      m.role === "user"
                        ? "max-w-[80%] rounded-3xl bg-primary px-5 py-3 text-sm leading-relaxed text-primary-foreground"
                        : "max-w-[85%] text-sm leading-relaxed text-foreground"
                    }
                  >
                    {m.text}
                  </p>
                  {m.role === "user" ? (
                    <span className="glass mt-1 inline-flex size-8 shrink-0 items-center justify-center rounded-full">
                      <User className="size-4" aria-hidden="true" />
                    </span>
                  ) : null}
                </motion.div>
              ))}
            </AnimatePresence>
            <div ref={endRef} />
          </div>

          <div className="mb-3 flex flex-wrap gap-2">
            {suggestions.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => send(s)}
                className="focus-ring glass rounded-full px-4 py-2 text-xs text-muted-foreground transition-colors hover:text-foreground"
              >
                {s}
              </button>
            ))}
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              send(input);
            }}
            className="glass flex items-end gap-2 rounded-3xl p-2"
          >
            <label htmlFor="chat-input" className="sr-only">
              Escreva sua mensagem
            </label>
            <textarea
              id="chat-input"
              rows={1}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  send(input);
                }
              }}
              placeholder="Escreva sua mensagem…"
              className="max-h-40 flex-1 resize-none bg-transparent px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
            />
            <button
              type="submit"
              aria-label="Enviar mensagem"
              disabled={!input.trim()}
              className="focus-ring inline-flex size-11 items-center justify-center rounded-2xl bg-primary text-primary-foreground transition-opacity disabled:opacity-40"
            >
              <ArrowUp className="size-5" aria-hidden="true" />
            </button>
          </form>
        </main>
      </div>
    </PageTransition>
  );
}