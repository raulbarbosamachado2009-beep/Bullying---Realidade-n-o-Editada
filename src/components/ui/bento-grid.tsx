import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export interface BentoItem {
  title: string;
  description?: string;
  icon: ReactNode;
  status?: string;
  tags?: string[];
  meta?: string;
  cta?: string;
  colSpan?: number;
  hasPersistentHover?: boolean;
  onClick?: () => void;
}

/** Bento grid adapted from the 21st.dev "Bento Grid" (kokonutd) to this design system. */
export function BentoGrid({ items, className }: { items: BentoItem[]; className?: string }) {
  return (
    <div className={cn("mx-auto grid w-full grid-cols-2 gap-3 md:grid-cols-3", className)}>
      {items.map((item, index) => (
        <button
          key={index}
          type="button"
          onClick={item.onClick}
          className={cn(
            "group focus-ring relative overflow-hidden rounded-3xl p-4 text-left transition-all duration-300",
            "border border-border bg-card/40 backdrop-blur-xl",
            "hover:-translate-y-0.5 hover:border-primary/40 active:scale-[0.98]",
            item.colSpan === 2 ? "col-span-2" : "col-span-1",
            item.hasPersistentHover && "border-primary/40",
          )}
        >
          <span
            aria-hidden="true"
            className={cn(
              "pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,color-mix(in_oklab,var(--foreground)_9%,transparent)_1px,transparent_1px)] bg-[length:5px_5px] transition-opacity duration-300",
              item.hasPersistentHover ? "opacity-100" : "opacity-0 group-hover:opacity-100",
            )}
          />
          <span
            aria-hidden="true"
            className="pointer-events-none absolute -right-10 -top-10 size-28 rounded-full bg-primary/20 blur-3xl transition-opacity duration-500 group-hover:opacity-100 sm:opacity-0"
          />

          <div className="relative flex h-full flex-col gap-3">
            <div className="flex items-start justify-between gap-2">
              <span className="inline-flex size-10 items-center justify-center rounded-2xl bg-secondary text-primary">
                {item.icon}
              </span>
              {item.status ? (
                <span className="rounded-full bg-secondary px-2 py-1 text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
                  {item.status}
                </span>
              ) : null}
            </div>

            <div className="space-y-1">
              <h3 className="text-[15px] font-semibold tracking-tight">
                {item.title}
                {item.meta ? (
                  <span className="ml-2 text-xs font-normal text-muted-foreground">
                    {item.meta}
                  </span>
                ) : null}
              </h3>
              {item.description ? (
                <p className="hidden text-xs leading-relaxed text-muted-foreground sm:block">
                  {item.description}
                </p>
              ) : null}
            </div>

            <div className="mt-auto flex items-center justify-between gap-2 pt-2">
              <div className="flex flex-wrap gap-1.5">
                {item.tags?.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-md bg-secondary px-2 py-0.5 text-[10px] text-muted-foreground"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
              <span className="shrink-0 text-xs font-medium text-primary transition-opacity sm:opacity-0 sm:group-hover:opacity-100">
                {item.cta ?? "Jogar →"}
              </span>
            </div>
          </div>
        </button>
      ))}
    </div>
  );
}
