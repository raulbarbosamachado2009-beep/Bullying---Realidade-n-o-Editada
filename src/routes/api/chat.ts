import { createFileRoute } from "@tanstack/react-router";

type ChatMessage = { role: "user" | "assistant"; content: string };

const SYSTEM_PROMPT = `Você é o assistente educacional do projeto "Imersão Bullying — Realidade não Editada".
Fale sempre em português do Brasil, com linguagem acolhedora, clara e adequada a estudantes do ensino fundamental e médio.
Seu tema é bullying e cyberbullying: tipos, sinais de alerta, impactos, prevenção, empatia, como agir, como apoiar vítimas e como denunciar (escola, responsáveis, Conselho Tutelar, Disque 100, SaferNet).
Regras: respostas curtas e objetivas (máximo 5 frases ou lista curta), nunca julgue quem pede ajuda, nunca incentive violência ou revide.
Se houver risco à vida ou sofrimento grave, oriente procurar um adulto de confiança imediatamente e o CVV pelo telefone 188.
Se perguntarem algo fora do tema, redirecione gentilmente para o assunto do projeto.`;

export const Route = createFileRoute("/api/chat")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const body = (await request.json()) as { messages?: ChatMessage[] };
        const messages = Array.isArray(body.messages) ? body.messages : [];
        if (messages.length === 0) {
          return new Response("Mensagens obrigatórias", { status: 400 });
        }

        const key = process.env["LOVABLE_API_KEY"];
        if (!key) return new Response("Missing LOVABLE_API_KEY", { status: 500 });

        const upstream = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Lovable-API-Key": key,
            "X-Lovable-AIG-SDK": "fetch",
          },
          body: JSON.stringify({
            model: "google/gemini-3.6-flash",
            stream: true,
            messages: [
              { role: "system", content: SYSTEM_PROMPT },
              ...messages.slice(-20).map((m) => ({ role: m.role, content: m.content })),
            ],
          }),
        });

        if (!upstream.ok || !upstream.body) {
          const text = await upstream.text().catch(() => "");
          return new Response(text || "Erro na IA", { status: upstream.status || 500 });
        }

        return new Response(upstream.body, {
          headers: {
            "Content-Type": "text/event-stream; charset=utf-8",
            "Cache-Control": "no-cache",
            Connection: "keep-alive",
          },
        });
      },
    },
  },
});