import { createFileRoute, Link } from "@tanstack/react-router";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import {
  Camera,
  Check,
  Brain,
  Copy,
  HeartHandshake,
  Instagram,
  LogOut,
  Mail,
  MessageCircle,
  Pencil,
  Puzzle,
  Repeat,
  Scale,
  Share2,
  Settings,
  Trophy,
  UserRound,
  X,
} from "lucide-react";
import { toast } from "sonner";
import { AnimatedBackground } from "@/components/AnimatedBackground";
import { PageTransition } from "@/components/PageTransition";
import { MobileTabBar, MobileTabBarSpacer } from "@/components/MobileShell";
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
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
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
  bio: "Participando da Imersão Bullying — Realidade não Editada. Respeito é o mínimo.",
  avatar: null,
};

const gameScores = [
  { Icon: Brain, label: "Quiz", value: 0 },
  { Icon: Scale, label: "Verdadeiro ou Falso", value: 0 },
  { Icon: HeartHandshake, label: "Escolha de Atitude", value: 0 },
  { Icon: Puzzle, label: "Cenários", value: 0 },
];

const tabs = ["Pontos", "Conta"] as const;
type Tab = (typeof tabs)[number];

function PerfilPage() {
  const [profile, setProfile] = useState<Profile>(defaultProfile);
  const [editing, setEditing] = useState(false);
  const [sharing, setSharing] = useState(false);
  const [copied, setCopied] = useState(false);
  const [following, setFollowing] = useState(false);
  const [tab, setTab] = useState<Tab>("Pontos");
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

      <main className="mx-auto w-full max-w-2xl pb-8 lg:pt-24">
        {/* Capa */}
        <div className="relative h-40 overflow-hidden sm:h-52 lg:rounded-3xl">
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-[linear-gradient(140deg,var(--primary)_0%,color-mix(in_oklab,var(--primary)_40%,var(--background))_45%,var(--background)_100%)]"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-[radial-gradient(120%_90%_at_20%_0%,color-mix(in_oklab,var(--primary-glow)_45%,transparent),transparent_70%)]"
          />
          <Link
            to="/home"
            aria-label="Voltar"
            className="focus-ring glass absolute left-4 top-[max(1rem,env(safe-area-inset-top))] grid size-10 place-items-center rounded-full text-foreground lg:hidden"
          >
            <span aria-hidden="true" className="text-xl leading-none">
              ‹
            </span>
          </Link>
        </div>

        <div className="px-4">
          {/* Avatar + ações */}
          <div className="-mt-12 flex items-end justify-between gap-3">
            <div className="relative shrink-0">
              <button
                type="button"
                onClick={() => fileRef.current?.click()}
                aria-label="Alterar foto de perfil"
                className="focus-ring grid size-24 place-items-center overflow-hidden rounded-3xl border-4 border-background bg-muted"
              >
                {profile.avatar ? (
                  <img
                    src={profile.avatar}
                    alt={`Foto de perfil de ${profile.name}`}
                    className="size-full object-cover"
                  />
                ) : (
                  <UserRound aria-hidden="true" className="size-9 text-primary" />
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

            <div className="flex items-center gap-2 pb-1">
              <button
                type="button"
                onClick={() => setSharing(true)}
                aria-label="Compartilhar perfil"
                className="focus-ring glass grid size-11 place-items-center rounded-full active:scale-95"
              >
                <Share2 className="size-4" aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={() => setEditing(true)}
                aria-label="Editar perfil"
                className="focus-ring glass grid size-11 place-items-center rounded-full active:scale-95"
              >
                <Pencil className="size-4" aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={() => setFollowing((v) => !v)}
                aria-pressed={following}
                className="focus-ring rounded-full bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground active:scale-95 data-[on=true]:bg-secondary data-[on=true]:text-secondary-foreground"
                data-on={following}
              >
                {following ? "Seguindo" : "Seguir"}
              </button>
            </div>
          </div>

          {/* Identidade */}
          <div className="mt-4">
            <h1 className="text-xl font-semibold leading-tight">{profile.name}</h1>
            <p className="text-sm text-muted-foreground">@{profile.handle}</p>
          </div>

          <dl className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-1 text-sm">
            <div className="flex gap-1.5">
              <dd className="font-semibold">320</dd>
              <dt className="text-muted-foreground">Seguindo</dt>
            </div>
            <div className="flex gap-1.5">
              <dd className="font-semibold">394</dd>
              <dt className="text-muted-foreground">Seguidores</dt>
            </div>
            <div className="flex gap-1.5">
              <dd className="font-semibold">{total}</dd>
              <dt className="text-muted-foreground">Pontos</dt>
            </div>
          </dl>

          <p className="mt-3 whitespace-pre-line text-sm leading-relaxed">{profile.bio}</p>

          {/* Abas */}
          <div
            role="tablist"
            aria-label="Seções do perfil"
            className="mt-6 flex border-b border-border/70"
          >
            {tabs.map((t) => (
              <button
                key={t}
                role="tab"
                type="button"
                aria-selected={tab === t}
                onClick={() => setTab(t)}
                className="focus-ring relative flex-1 pb-3 pt-1 text-sm font-medium text-muted-foreground aria-selected:text-foreground"
              >
                {t}
                {tab === t ? (
                  <motion.span
                    layoutId="perfil-tab"
                    aria-hidden="true"
                    className="absolute inset-x-6 -bottom-px h-0.5 rounded-full bg-primary"
                  />
                ) : null}
              </button>
            ))}
          </div>

          {tab === "Pontos" ? (
            <section aria-label="Pontos nos minigames" className="mt-5">
              <h2 className="flex items-center gap-2 text-sm font-semibold text-muted-foreground">
                <Trophy className="size-4 text-primary" aria-hidden="true" /> Pontos nos minigames
              </h2>
              <ul className="mt-3 grid grid-cols-2 gap-3">
                {scores.map((s) => (
                  <li key={s.label} className="glass rounded-3xl p-4">
                    <s.Icon aria-hidden="true" className="size-5 text-primary" />
                    <p className="mt-1 text-2xl font-semibold">{s.value}</p>
                    <p className="text-xs text-muted-foreground">{s.label}</p>
                  </li>
                ))}
              </ul>
            </section>
          ) : (
            <section aria-label="Conta" className="mt-5 space-y-2">
              <h2 className="flex items-center gap-2 text-sm font-semibold text-muted-foreground">
                <Settings className="size-4 text-primary" aria-hidden="true" /> Conta
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
          )}
        </div>
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
                  toast.success("Perfil salvo");
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
                  <MessageCircle className="size-4 text-primary" aria-hidden="true" /> Compartilhar no WhatsApp
                </a>
                <a
                  href="https://www.instagram.com/"
                  target="_blank"
                  rel="noreferrer"
                  className="focus-ring glass flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-sm active:scale-[0.99]"
                >
                  <Instagram className="size-4 text-primary" aria-hidden="true" /> Compartilhar no Instagram
                </a>
                <a
                  href="mailto:?subject=Imers%C3%A3o%20Bullying"
                  className="focus-ring glass flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-sm active:scale-[0.99]"
                >
                  <Mail className="size-4 text-primary" aria-hidden="true" /> Enviar por e-mail
                </a>
              </div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </PageTransition>
  );
}
