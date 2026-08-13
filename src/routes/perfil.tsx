import { createFileRoute, Link } from "@tanstack/react-router";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import {
  Camera,
  Check,
  Copy,
  LogOut,
  Pencil,
  Repeat,
  Share2,
  UserPlus,
  X,
} from "lucide-react";
import { AnimatedBackground } from "@/components/AnimatedBackground";
import { PageTransition } from "@/components/PageTransition";
import { MobileTabBar, MobileTabBarSpacer, MobileTopBar } from "@/components/MobileShell";
import { Navbar } from "@/components/Navbar";

export const Route = createFileRoute("/perfil")({
  head: () => ({
    meta: [
      { title: "Perfil — Imersão Bullying" },
      {
        name: "description",
        content:
          "Seu perfil na Imersão Bullying: foto, biografia, pontos nos minigames, seguidores e compartilhamento.",
      },
      { property: "og:title", content: "Perfil — Imersão Bullying" },
      {
        property: "og:description",
        content: "Personalize seu perfil e acompanhe seus pontos nos minigames.",
      },
    ],
  }),
  component: PerfilPage,
});

type Profile = {
  handle: string;
  name: string;
  bio: string;
  avatar: string | null;
};

const STORAGE_KEY = "imersao-perfil";

const defaultProfile: Profile = {
  handle: "estudante._",
  name: "Estudante",
  bio: "Participando da Imersão Bullying — Realidade não Editada. Respeito é o mínimo. 💙",
  avatar: null,
};

const gameScores = [
  { emoji: "🧠", label: "Quiz", value: 0 },
  { emoji: "✅", label: "Verdadeiro ou Falso", value: 0 },
  { emoji: "🤝", label: "Escolha de Atitude", value: 0 },
  { emoji: "🧩", label: "Cenários", value: 0 },
];

function PerfilPage() {
  const [profile, setProfile] = useState<Profile>(defaultProfile);
  const [editing, setEditing] = useState(false);
  const [sharing, setSharing] = useState(false);
  const [copied, setCopied] = useState(false);
  const [following, setFollowing] = useState(false);
  const [scores, setScores] = useState(gameScores);
  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setProfile({ ...defaultProfile, ...(JSON.parse(raw) as Partial<Profile>) });
      const rawScores = localStorage.getItem("imersao-pontos");
      if (rawScores) {
        const parsed = JSON.parse(rawScores) as Record<string, number>;
        setScores((prev) => prev.map((s) => ({ ...s, value: parsed[s.label] ?? s.value })));
      }
    } catch {
      // ignora dados inválidos
    }
  }, []);

  function save(next: Profile) {
    setProfile(next);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch {
      // armazenamento indisponível
    }
  }

  function onPickAvatar(file: File | undefined) {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => save({ ...profile, avatar: String(reader.result) });
    reader.readAsDataURL(file);
  }

  const total = scores.reduce((a, b) => a + b.value, 0);
  const shareUrl = typeof window === "undefined" ? "" : window.location.origin;
  const shareText = `Estou na Imersão Bullying — Realidade não Editada. Bora aprender junto?`;

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      // clipboard bloqueado
    }
  }

  return (
    <PageTransition>
      <AnimatedBackground />
      <div className="hidden lg:block">
        <Navbar />
      </div>
      <MobileTopBar emoji="🔒" title={profile.handle} subtitle="Seu perfil" backTo="/home" />

      <main className="mx-auto w-full max-w-2xl px-4 pb-8 pt-20 lg:pt-28">
        <header className="grid grid-cols-[auto_minmax(0,1fr)] items-center gap-5">
          <div className="relative shrink-0">
            <button
              type="button"
              onClick={() => fileRef.current?.click()}
              aria-label="Alterar foto de perfil"
              className="focus-ring glass grid size-24 place-items-center overflow-hidden rounded-full"
            >
              {profile.avatar ? (
                <img
                  src={profile.avatar}
                  alt={`Foto de perfil de ${profile.name}`}
                  className="size-full object-cover"
                />
              ) : (
                <span aria-hidden="true" className="text-3xl">
                  👤
                </span>
              )}
            </button>
            <span
              aria-hidden="true"
              className="absolute -bottom-1 -right-1 grid size-8 place-items-center rounded-full bg-primary text-primary-foreground"
            >
              <Camera className="size-4" />
            </span>
            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              className="sr-only"
              onChange={(e) => onPickAvatar(e.target.files?.[0])}
            />
          </div>

          <dl className="grid grid-cols-3 gap-2 text-center">
            <div>
              <dt className="sr-only">Pontos</dt>
              <dd className="text-xl font-semibold">{total}</dd>
              <p className="text-xs text-muted-foreground">pontos</p>
            </div>
            <div>
              <dt className="sr-only">Seguidores</dt>
              <dd className="text-xl font-semibold">394</dd>
              <p className="text-xs text-muted-foreground">seguidores</p>
            </div>
            <div>
              <dt className="sr-only">Seguindo</dt>
              <dd className="text-xl font-semibold">320</dd>
              <p className="text-xs text-muted-foreground">seguindo</p>
            </div>
          </dl>
        </header>

        <div className="mt-5">
          <h1 className="text-lg font-semibold">{profile.name}</h1>
          <p className="mt-1 whitespace-pre-line text-sm text-muted-foreground">{profile.bio}</p>
        </div>

        <div className="mt-5 grid grid-cols-[minmax(0,1fr)_minmax(0,1fr)_auto] gap-2">
          <button
            type="button"
            onClick={() => setEditing(true)}
            className="focus-ring glass inline-flex items-center justify-center gap-2 rounded-2xl py-2.5 text-sm font-medium active:scale-95"
          >
            <Pencil className="size-4" aria-hidden="true" /> Editar
          </button>
          <button
            type="button"
            onClick={() => setSharing(true)}
            className="focus-ring glass inline-flex items-center justify-center gap-2 rounded-2xl py-2.5 text-sm font-medium active:scale-95"
          >
            <Share2 className="size-4" aria-hidden="true" /> Compartilhar
          </button>
          <button
            type="button"
            onClick={() => setFollowing((v) => !v)}
            aria-pressed={following}
            aria-label="Seguir amigos"
            className="focus-ring glass grid size-[42px] place-items-center rounded-2xl active:scale-95"
          >
            <UserPlus className="size-4" aria-hidden="true" />
          </button>
        </div>

        <section aria-labelledby="pontos" className="mt-8">
          <h2 id="pontos" className="text-sm font-semibold text-muted-foreground">
            🏆 Pontos nos minigames
          </h2>
          <ul className="mt-3 grid grid-cols-2 gap-3">
            {scores.map((s) => (
              <li key={s.label} className="glass rounded-3xl p-4">
                <span aria-hidden="true" className="text-xl">
                  {s.emoji}
                </span>
                <p className="mt-1 text-2xl font-semibold">{s.value}</p>
                <p className="text-xs text-muted-foreground">{s.label}</p>
              </li>
            ))}
          </ul>
        </section>

        <section aria-labelledby="conta" className="mt-8 space-y-2">
          <h2 id="conta" className="text-sm font-semibold text-muted-foreground">
            ⚙️ Conta
          </h2>
          <Link
            to="/"
            className="focus-ring glass flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-sm active:scale-[0.99]"
          >
            <Repeat className="size-4 text-primary" aria-hidden="true" /> Trocar de conta
          </Link>
          <Link
            to="/"
            className="focus-ring glass flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-sm text-destructive active:scale-[0.99]"
          >
            <LogOut className="size-4" aria-hidden="true" /> Sair da conta
          </Link>
        </section>
      </main>

      <MobileTabBarSpacer />
      <MobileTabBar />

      <AnimatePresence>
        {editing ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] grid place-items-end bg-background/70 p-3 sm:place-items-center"
            role="dialog"
            aria-modal="true"
            aria-label="Editar perfil"
          >
            <div className="glass w-full max-w-md rounded-3xl p-5">
              <div className="flex items-center justify-between">
                <h2 className="text-base font-semibold">Editar perfil</h2>
                <button
                  type="button"
                  aria-label="Fechar"
                  onClick={() => setEditing(false)}
                  className="focus-ring grid size-9 place-items-center rounded-full"
                >
                  <X className="size-4" aria-hidden="true" />
                </button>
              </div>
              <form
                className="mt-4 space-y-3"
                onSubmit={(e) => {
                  e.preventDefault();
                  const form = new FormData(e.currentTarget);
                  save({
                    ...profile,
                    name: String(form.get("name") ?? profile.name),
                    handle: String(form.get("handle") ?? profile.handle),
                    bio: String(form.get("bio") ?? profile.bio),
                  });
                  setEditing(false);
                }}
              >
                <label className="block text-xs text-muted-foreground" htmlFor="p-name">
                  Nome
                </label>
                <input
                  id="p-name"
                  name="name"
                  defaultValue={profile.name}
                  className="focus-ring w-full rounded-2xl border border-border bg-transparent px-4 py-3 text-sm"
                />
                <label className="block text-xs text-muted-foreground" htmlFor="p-handle">
                  Usuário
                </label>
                <input
                  id="p-handle"
                  name="handle"
                  defaultValue={profile.handle}
                  className="focus-ring w-full rounded-2xl border border-border bg-transparent px-4 py-3 text-sm"
                />
                <label className="block text-xs text-muted-foreground" htmlFor="p-bio">
                  Biografia
                </label>
                <textarea
                  id="p-bio"
                  name="bio"
                  rows={3}
                  defaultValue={profile.bio}
                  className="focus-ring w-full resize-none rounded-2xl border border-border bg-transparent px-4 py-3 text-sm"
                />
                <button
                  type="submit"
                  className="focus-ring w-full rounded-2xl bg-primary py-3 text-sm font-medium text-primary-foreground active:scale-95"
                >
                  Salvar
                </button>
              </form>
            </div>
          </motion.div>
        ) : null}

        {sharing ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] grid place-items-end bg-background/70 p-3 sm:place-items-center"
            role="dialog"
            aria-modal="true"
            aria-label="Compartilhar perfil"
          >
            <div className="glass w-full max-w-md rounded-3xl p-5">
              <div className="flex items-center justify-between">
                <h2 className="text-base font-semibold">Compartilhar</h2>
                <button
                  type="button"
                  aria-label="Fechar"
                  onClick={() => setSharing(false)}
                  className="focus-ring grid size-9 place-items-center rounded-full"
                >
                  <X className="size-4" aria-hidden="true" />
                </button>
              </div>
              <div className="mt-4 space-y-2">
                <button
                  type="button"
                  onClick={() => void copyLink()}
                  className="focus-ring glass flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-sm active:scale-[0.99]"
                >
                  {copied ? (
                    <Check className="size-4 text-primary" aria-hidden="true" />
                  ) : (
                    <Copy className="size-4 text-primary" aria-hidden="true" />
                  )}
                  {copied ? "Link copiado!" : "Copiar link"}
                </button>
                <a
                  href={`https://wa.me/?text=${encodeURIComponent(`${shareText} ${shareUrl}`)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="focus-ring glass flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-sm active:scale-[0.99]"
                >
                  <span aria-hidden="true">💬</span> Compartilhar no WhatsApp
                </a>
                <a
                  href="https://www.instagram.com/"
                  target="_blank"
                  rel="noreferrer"
                  className="focus-ring glass flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-sm active:scale-[0.99]"
                >
                  <span aria-hidden="true">📸</span> Compartilhar no Instagram
                </a>
              </div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </PageTransition>
  );
}
