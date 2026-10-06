"use client";

import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "motion/react";
import type { PointerEvent } from "react";

const capabilities = [
  { label: "Interface", value: "React", color: "bg-accent-primary" },
  { label: "Language", value: "TypeScript", color: "bg-accent-secondary" },
  { label: "Systems", value: "APIs", color: "bg-accent-highlight" },
];

export function HeroVisual() {
  const reduceMotion = useReducedMotion();
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const smoothX = useSpring(pointerX, { stiffness: 120, damping: 20, mass: 0.5 });
  const smoothY = useSpring(pointerY, { stiffness: 120, damping: 20, mass: 0.5 });
  const rotateX = useTransform(smoothY, [-14, 14], [1.2, -1.2]);
  const rotateY = useTransform(smoothX, [-14, 14], [-1.2, 1.2]);

  function handlePointerMove(event: PointerEvent<HTMLDivElement>) {
    if (reduceMotion || event.pointerType === "touch") return;

    const bounds = event.currentTarget.getBoundingClientRect();
    pointerX.set(((event.clientX - bounds.left) / bounds.width - 0.5) * 28);
    pointerY.set(((event.clientY - bounds.top) / bounds.height - 0.5) * 28);
  }

  function resetPointer() {
    pointerX.set(0);
    pointerY.set(0);
  }

  return (
    <motion.div
      animate={{ opacity: 1, scale: 1, y: 0 }}
      aria-hidden="true"
      className="relative mx-auto w-full max-w-[34rem] py-4 min-[360px]:py-6 sm:py-10 lg:py-0"
      initial={{ opacity: 0, scale: 0.96, y: 28 }}
      onPointerLeave={resetPointer}
      onPointerMove={handlePointerMove}
      style={{ perspective: 1000 }}
      transition={{
        delay: reduceMotion ? 0 : 0.3,
        duration: reduceMotion ? 0 : 0.7,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      <div className="absolute left-1/2 top-1/2 h-56 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent-primary/15 blur-[90px]" />

      <motion.div
        className="relative z-10 rounded-[1rem] border border-line/90 bg-panel/90 p-2 shadow-[0_28px_70px_rgba(0,0,0,0.38)] backdrop-blur-sm min-[360px]:p-3 sm:rounded-[1.25rem] sm:p-4"
        style={{ x: smoothX, y: smoothY, rotateX, rotateY, transformStyle: "preserve-3d" }}
        whileHover={reduceMotion ? undefined : { scale: 1.012 }}
      >
        <div className="overflow-hidden rounded-[0.9rem] border border-line/70 bg-panel-elevated">
          <div className="flex items-center justify-between border-b border-line/70 px-3 py-2.5 min-[360px]:px-4 min-[360px]:py-3 sm:px-5 sm:py-3.5">
            <div className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-accent-secondary shadow-[0_0_10px_var(--color-secondary)]" />
              <span className="font-mono text-[0.58rem] uppercase tracking-[0.17em] text-muted">
                interface.system
              </span>
            </div>
            <span className="font-mono text-[0.56rem] tracking-[0.16em] text-muted/60">AP / 01</span>
          </div>

          <div className="p-3 min-[360px]:p-4 sm:p-6">
            <div className="mb-5 flex items-start justify-between gap-3 min-[360px]:mb-7 min-[360px]:gap-5 sm:mb-8 sm:gap-6">
              <div>
                <p className="font-mono text-[0.55rem] uppercase tracking-[0.2em] text-accent-primary">
                  Active discipline
                </p>
                <p className="mt-2 font-display text-[clamp(1.35rem,5vw,2.35rem)] font-semibold leading-none tracking-[-0.045em] text-foreground">
                  UI ENGINEERING
                </p>
              </div>
              <div className="grid size-8 shrink-0 place-items-center rounded-full border border-line bg-background/50 min-[360px]:size-10">
                <span className="relative h-2 w-2 rounded-full bg-accent-secondary">
                  <span className="absolute inset-0 animate-ping rounded-full bg-accent-secondary opacity-40" />
                </span>
              </div>
            </div>

            <div className="space-y-2">
              {capabilities.map((item, index) => (
                <motion.div
                  className="group flex items-center justify-between gap-2 rounded-lg border border-transparent bg-background/40 px-2.5 py-2.5 transition-colors hover:border-line hover:bg-background/65 min-[360px]:px-3 min-[360px]:py-3"
                  key={item.label}
                  whileHover={reduceMotion ? undefined : { x: 4 }}
                >
                  <div className="flex items-center gap-3">
                    <span className={`h-1.5 w-1.5 rounded-full ${item.color}`} />
                    <span className="font-mono text-[0.55rem] uppercase tracking-[0.1em] text-muted min-[360px]:text-[0.6rem] min-[360px]:tracking-[0.14em]">{item.label}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-[0.6rem] text-foreground min-[360px]:text-[0.68rem]">{item.value}</span>
                    <span className="text-[0.6rem] text-muted/50">0{index + 1}</span>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="mt-4 border-t border-line/70 pt-4 min-[360px]:mt-6 min-[360px]:pt-5">
              <div className="flex items-center justify-between font-mono text-[0.57rem] uppercase tracking-[0.12em] text-muted sm:text-[0.63rem]">
                <span>Build</span>
                <span className="text-accent-primary">→</span>
                <span>Refine</span>
                <span className="text-accent-primary">→</span>
                <span className="text-foreground">Ship</span>
              </div>
              <div className="mt-3 h-px overflow-hidden bg-line">
                <motion.div
                  animate={{ scaleX: 1 }}
                  className="h-full origin-left bg-gradient-to-r from-accent-primary via-accent-secondary to-accent-highlight"
                  initial={{ scaleX: 0 }}
                  transition={{
                    delay: reduceMotion ? 0 : 0.75,
                    duration: reduceMotion ? 0 : 0.8,
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      <motion.div
        animate={reduceMotion ? undefined : { y: [0, -5, 0] }}
        className="absolute left-1 top-1 z-20 rounded-lg border border-line bg-panel-elevated/95 px-2.5 py-2 font-mono text-[0.6rem] uppercase tracking-[0.1em] text-muted shadow-xl sm:-left-8 sm:top-10 sm:px-3 sm:text-[0.62rem]"
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      >
        <span className="mr-2 inline-block h-1.5 w-1.5 rounded-full bg-accent-secondary" />
        System online
      </motion.div>

      <motion.div
        animate={reduceMotion ? undefined : { y: [0, 5, 0] }}
        className="absolute -bottom-1 right-1 z-20 rounded-lg border border-line bg-panel-elevated/95 px-2.5 py-2 font-mono text-[0.6rem] uppercase tracking-[0.1em] text-muted shadow-xl sm:-right-6 sm:bottom-8 sm:px-3 sm:text-[0.62rem]"
        transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
      >
        <span className="text-accent-primary">&lt;/&gt;</span> Crafted for the web
      </motion.div>
    </motion.div>
  );
}
