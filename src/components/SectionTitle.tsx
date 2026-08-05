import { motion } from "motion/react";
import { cn } from "@/lib/utils";

export function SectionTitle({
  eyebrow,
  title,
  subtitle,
  align = "center",
  className,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "center" | "left";
  className?: string;
}) {
  return (
    <motion.header
      initial={{ opacity: 0, y: 24, filter: "blur(8px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.8, ease: [0.32, 0.72, 0, 1] }}
      className={cn(
        "mx-auto max-w-2xl",
        align === "center" ? "text-center" : "mx-0 text-left",
        className,
      )}
    >
      {eyebrow ? (
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-primary">{eyebrow}</p>
      ) : null}
      <h2 className="mt-3 text-4xl font-semibold text-gradient sm:text-5xl">{title}</h2>
      {subtitle ? (
        <p className="mt-4 text-lg leading-relaxed text-muted-foreground">{subtitle}</p>
      ) : null}
    </motion.header>
  );
}