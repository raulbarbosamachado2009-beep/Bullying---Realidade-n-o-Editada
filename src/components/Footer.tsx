import { Link } from "@tanstack/react-router";
import { Instagram, Youtube, Twitter, ShieldCheck } from "lucide-react";

export function Footer() {
  return (
    <footer id="contato" className="hidden border-t border-border/60 px-6 py-16 lg:block">
      <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-3">
        <div>
          <p className="flex items-center gap-2 text-base font-semibold">
            <ShieldCheck className="size-5 text-primary" aria-hidden="true" />
            Imersão Bullying
          </p>
          <p className="mt-3 max-w-xs text-sm leading-relaxed text-muted-foreground">
            Realidade não Editada. Um projeto educativo sobre respeito, empatia e convivência
            escolar.
          </p>
        </div>

        <nav aria-label="Links do rodapé">
          <h3 className="text-sm font-semibold">Navegação</h3>
          <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
            <li>
              <Link to="/home" className="focus-ring hover:text-foreground">
                Início
              </Link>
            </li>
            <li>
              <Link to="/minigames" className="focus-ring hover:text-foreground">
                Minigames
              </Link>
            </li>
            <li>
              <Link to="/chat" className="focus-ring hover:text-foreground">
                IA Educacional
              </Link>
            </li>
            <li>
              <Link to="/" className="focus-ring hover:text-foreground">
                Refazer a imersão
              </Link>
            </li>
          </ul>
        </nav>

        <div>
          <h3 className="text-sm font-semibold">Redes sociais</h3>
          <p className="mt-2 text-xs text-muted-foreground">Perfis fictícios, apenas ilustrativos.</p>
          <ul className="mt-4 flex gap-3">
            {[
              { Icon: Instagram, label: "Instagram" },
              { Icon: Youtube, label: "YouTube" },
              { Icon: Twitter, label: "X" },
            ].map(({ Icon, label }) => (
              <li key={label}>
                <a
                  href="#contato"
                  aria-label={`${label} (fictício)`}
                  className="focus-ring glass inline-flex size-11 items-center justify-center rounded-2xl text-muted-foreground transition-colors hover:text-foreground"
                >
                  <Icon className="size-5" aria-hidden="true" />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <p className="mx-auto mt-12 max-w-6xl text-xs text-muted-foreground">
        © {new Date().getFullYear()} Imersão Bullying – Realidade não Editada. Todos os direitos
        reservados.
      </p>
    </footer>
  );
}