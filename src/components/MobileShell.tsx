import { Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import type { ReactNode } from "react";

const tabs = [
  { to: "/home", emoji: "🏠", label: "Início" },
  { to: "/minigames", emoji: "🎮", label: "Jogos" },
  { to: "/chat", emoji: "🤖", label: "IA" },
  { to: "/", emoji: "🔄", label: "Recomeçar" },
] as const;

/** iOS-style top bar. Mobile only. */
export function MobileTopBar({
  emoji,
  title,
  subtitle,
  backTo,
  right,
}: {
  emoji?: string;
  title: string;
  subtitle?: string;
  backTo?: "/home" | "/minigames" | "/chat" | "/";
  right?: ReactNode;
}) {
  return (
    <header className="fixed inset-x-0 top-0 z-50 lg:hidden">
      <div className="glass flex items-center gap-3 rounded-none border-x-0 border-t-0 px-4 pb-3 pt-[max(0.75rem,env(safe-area-inset-top))]">
        {backTo ? (
          <Link
            to={backTo}
            aria-label="Voltar"
            className="focus-ring -ml-1 inline-flex size-9 shrink-0 items-center justify-center rounded-full text-primary"
          >
            <span aria-hidden="true" className="text-xl leading-none">
              ‹
            </span>
          </Link>
        ) : null}
        <div className="min-w-0 flex-1">
          <h2 className="truncate text-[17px] font-semibold leading-tight">
            {emoji ? (
              <span aria-hidden="true" className="mr-1.5">
                {emoji}
              </span>
            ) : null}
            {title}
          </h2>
          {subtitle ? (
            <p className="truncate text-[11px] text-muted-foreground">{subtitle}</p>
          ) : null}
        </div>
        {right ? <div className="shrink-0">{right}</div> : null}
      </div>
    </header>
  );
}

/** iOS-style bottom tab bar. Mobile only. */
export function MobileTabBar() {
  return (
    <motion.nav
      initial={{ y: 40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.32, 0.72, 0, 1] }}
      aria-label="Navegação do app"
      className="fixed bottom-0 left-0 right-0 z-50 px-3 pb-[max(0.5rem,env(safe-area-inset-bottom))] pt-2 lg:hidden"
    >
      <ul className="glass grid grid-cols-4 rounded-3xl border px-2 pt-2 shadow-2xl">
        {tabs.map((t) => (
          <li key={t.to}>
            <Link
              to={t.to}
              activeOptions={{ exact: true }}
              activeProps={{ "data-active": "true" }}
              className="focus-ring group flex flex-col items-center gap-0.5 rounded-2xl py-2 text-muted-foreground transition-colors data-[active=true]:text-primary"
            >
              <span aria-hidden="true" className="text-[22px] leading-none transition-transform group-active:scale-90">
                {t.emoji}
              </span>
              <span className="text-[10px] font-medium">{t.label}</span>
            </Link>
          </li>
        ))}
      </ul>
    </motion.nav>
  );
}

/** Spacer so fixed tab bar never covers content. Mobile only. */
export function MobileTabBarSpacer() {
  return <div aria-hidden="true" className="h-[76px] lg:hidden" />;
}
