import { cn } from "@/lib/utils";

export function BlurCircle({
  className,
  delay = 0,
}: {
  className?: string;
  delay?: number;
}) {
  return (
    <div
      aria-hidden="true"
      className={cn("pointer-events-none absolute rounded-full blur-[120px]", className)}
      style={{
        animation: `float-slow 18s var(--ease-ios) ${delay}s infinite`,
      }}
    />
  );
}

export function FloatingShapes() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      <BlurCircle className="left-[-10%] top-[-10%] size-[38rem] bg-primary/25" />
      <BlurCircle className="right-[-15%] top-[20%] size-[32rem] bg-primary-glow/20" delay={3} />
      <BlurCircle className="bottom-[-20%] left-[25%] size-[34rem] bg-accent/15" delay={6} />
    </div>
  );
}

export function AnimatedBackground({ className }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={cn("pointer-events-none fixed inset-0 -z-10 bg-background", className)}
    >
      <FloatingShapes />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,transparent_20%,var(--background)_75%)]" />
    </div>
  );
}