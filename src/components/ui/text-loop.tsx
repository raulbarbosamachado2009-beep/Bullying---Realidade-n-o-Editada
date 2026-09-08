"use client";

import { useEffect, useState } from "react";
import { LazyMotion, domAnimation, m, AnimatePresence, type Transition } from "motion/react";
import { cn } from "@/lib/utils";

interface TextLoopProps {
  staticText?: string;
  rotatingTexts?: string[];
  className?: string;
  interval?: number;
  transition?: Transition;
  staticTextClassName?: string;
  rotatingTextClassName?: string;
  backgroundClassName?: string;
  cursorClassName?: string;
}

export default function TextLoop({
  staticText = "Design",
  rotatingTexts = ["Limitless", "Timeless", "Flawless"],
  className,
  interval = 3000,
  transition = { duration: 0.8, ease: "easeInOut" },
  staticTextClassName,
  rotatingTextClassName,
  backgroundClassName,
  cursorClassName,
}: TextLoopProps) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % rotatingTexts.length);
    }, interval);
    return () => clearInterval(timer);
  }, [rotatingTexts.length, interval]);

  return (
    <LazyMotion features={domAnimation}>
      <div
        className={cn(
          "flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-center",
          className,
        )}
      >
        <span className={cn("text-foreground", staticTextClassName)}>{staticText}</span>

        <span className="relative inline-flex items-center">
          <span
            aria-hidden="true"
            className={cn(
              "absolute -inset-x-2 -inset-y-1 -z-10 rounded-md bg-gradient-to-r from-primary/40 via-primary/25 to-transparent",
              backgroundClassName,
            )}
          />
          <AnimatePresence mode="wait" initial={false}>
            <m.span
              key={rotatingTexts[index]}
              initial={{ opacity: 0, y: "0.35em", filter: "blur(6px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: "-0.35em", filter: "blur(6px)" }}
              transition={transition}
              className={cn("inline-block text-primary", rotatingTextClassName)}
            >
              {rotatingTexts[index]}
            </m.span>
          </AnimatePresence>

          <m.span
            aria-hidden="true"
            animate={{ opacity: [1, 1, 0, 0] }}
            transition={{ duration: 1.1, repeat: Infinity, times: [0, 0.5, 0.5, 1] }}
            className={cn("ml-1 inline-block h-[0.9em] w-[3px] bg-primary", cursorClassName)}
          />
        </span>
      </div>
    </LazyMotion>
  );
}
