import { motion, type HTMLMotionProps } from "motion/react";
import { cn } from "@/lib/utils";

type GlassCardProps = HTMLMotionProps<"div"> & {
  interactive?: boolean;
};

export function GlassCard({ className, interactive, children, ...props }: GlassCardProps) {
  return (
    <motion.div
      {...(interactive ? { whileHover: { scale: 1.02, y: -4 } } : {})}
      transition={{ duration: 0.45, ease: [0.32, 0.72, 0, 1] }}
      className={cn(
        "glass rounded-3xl p-6",
        interactive && "cursor-pointer hover:border-white/25",
        className,
      )}
      {...props}
    >
      {children}
    </motion.div>
  );
}