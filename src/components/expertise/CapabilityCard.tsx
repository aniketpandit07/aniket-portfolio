"use client";

import { motion, useReducedMotion } from "motion/react";
import type { Capability } from "@/data/expertise";

interface CapabilityCardProps {
  capability: Capability;
  active: boolean;
  index: number;
  onActivate: (id: string) => void;
}

export function CapabilityCard({ capability, active, index, onActivate }: CapabilityCardProps) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.article
      className={`group relative border-t transition-[border-color,opacity] duration-300 ${
        active ? "border-accent-primary opacity-100" : "border-line/80 opacity-70 hover:border-muted hover:opacity-100"
      }`}
      initial={reduceMotion ? false : { opacity: 0, y: 16 }}
      onMouseEnter={() => onActivate(capability.id)}
      transition={{ delay: index * 0.08, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      viewport={{ once: true, amount: 0.4 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
    >
      <button
        aria-pressed={active}
        aria-label={`Emphasize ${capability.title}`}
        className="absolute inset-0 z-10 cursor-pointer rounded-sm outline-none focus-visible:ring-2 focus-visible:ring-accent-primary focus-visible:ring-offset-4 focus-visible:ring-offset-background"
        onClick={() => onActivate(capability.id)}
        onFocus={() => onActivate(capability.id)}
        type="button"
      />

      {active ? (
        <motion.span
          aria-hidden="true"
          className="absolute -left-3 top-4 h-7 w-0.5 rounded-full bg-accent-primary min-[360px]:-left-5 min-[360px]:top-5 sm:-left-7 sm:top-7 lg:-left-9"
          layoutId="active-capability"
          transition={{ duration: reduceMotion ? 0 : 0.24, ease: [0.22, 1, 0.36, 1] }}
        />
      ) : null}

      <div className="pointer-events-none grid gap-3 py-4 min-[360px]:gap-4 min-[360px]:py-5 sm:grid-cols-[8rem_1fr] sm:gap-6 sm:py-7">
          <div className="flex items-center gap-3 self-start">
            <span className={`font-mono text-label tracking-[0.15em] ${active ? "text-accent-primary" : "text-muted"}`}>
              {capability.number}
            </span>
            <span className={`h-px flex-1 transition-colors ${active ? "bg-accent-primary/55" : "bg-line"}`} />
          </div>

          <div>
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <h3 className="font-display text-[clamp(1.35rem,7vw,2.45rem)] font-semibold uppercase leading-none tracking-[-0.045em] text-foreground sm:tracking-[-0.05em]">
                {capability.title}
              </h3>
              <span className={`font-mono text-label uppercase tracking-[0.11em] ${active ? "text-accent-secondary" : "text-muted/70"}`}>
                {capability.layer}
              </span>
            </div>

            <span className="mt-3 block max-w-2xl text-sm leading-6 text-muted sm:text-[0.95rem] sm:leading-7">
              {capability.description}
            </span>

            {capability.note ? (
              <span className="mt-3 block font-mono text-label uppercase tracking-[0.09em] text-accent-highlight">
                {capability.note}
              </span>
            ) : null}

            <span className="mt-4 flex flex-wrap gap-2">
              {capability.technologies.map((technology, technologyIndex) => (
                <motion.span
                  animate={{ opacity: active ? 1 : 0.68, y: 0 }}
                  className={`rounded-full border px-2.5 py-1 font-mono text-label uppercase tracking-[0.065em] transition-colors ${
                    active ? "border-line bg-panel-elevated text-foreground" : "border-line/70 text-muted"
                  }`}
                  initial={reduceMotion ? false : { opacity: 0, y: 3 }}
                  key={technology}
                  transition={{ delay: reduceMotion ? 0 : technologyIndex * 0.025, duration: 0.2 }}
                >
                  {technology}
                </motion.span>
              ))}
            </span>
          </div>
      </div>
    </motion.article>
  );
}
