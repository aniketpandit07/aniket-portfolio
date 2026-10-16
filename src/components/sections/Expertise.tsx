"use client";

import { motion, useReducedMotion } from "motion/react";
import { useState } from "react";
import { CapabilityCard } from "@/components/expertise/CapabilityCard";
import { Container } from "@/components/ui/container";
import { capabilities } from "@/data/expertise";

const ease = [0.22, 1, 0.36, 1] as const;

export function Expertise() {
  const reduceMotion = useReducedMotion();
  const [activeCapability, setActiveCapability] = useState(capabilities[0].id);

  return (
    <section
      aria-labelledby="expertise-title"
      className="relative overflow-hidden border-t border-line/50 py-[var(--section-space)]"
      id="expertise"
    >
      <div className="pointer-events-none absolute left-0 top-20 h-80 w-80 -translate-x-2/3 rounded-full bg-accent-primary/[0.05] blur-[110px]" />

      <Container className="relative">
        <div className="grid gap-8 min-[360px]:gap-10 sm:gap-14 lg:grid-cols-[0.72fr_1.28fr] lg:gap-16 xl:gap-24">
          <motion.header
            className="self-start lg:sticky lg:top-28"
            initial={reduceMotion ? false : { opacity: 0, y: 18 }}
            transition={{ duration: 0.6, ease }}
            viewport={{ once: true, amount: 0.45 }}
            whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          >
            <div className="flex items-center gap-3 font-mono text-label uppercase tracking-[0.16em] text-muted">
              <span className="h-px w-8 bg-accent-primary" />
              03 / Expertise
            </div>
            <h2
              className="mt-3 font-display text-section font-semibold leading-[0.9] tracking-[-0.055em] text-foreground min-[360px]:mt-4 sm:mt-5 sm:leading-[0.85] sm:tracking-[-0.07em]"
              id="expertise-title"
            >
              WHAT I DO<span className="text-accent-primary">.</span>
            </h2>
            <p className="mt-4 max-w-md text-body leading-6 text-foreground min-[360px]:mt-5 min-[360px]:leading-7 sm:mt-7 sm:text-lg sm:leading-8">
              I build across the stack, from responsive interfaces to backend services, database schemas, and cloud deployment.
            </p>

            <div className="relative mt-6 border-l border-line/70 pl-4 min-[360px]:mt-7 min-[360px]:pl-5 sm:mt-9" aria-label="Capability layers">
              {capabilities.map((capability, index) => (
                <motion.div
                  className="relative flex items-center gap-3 py-1.5"
                  initial={reduceMotion ? false : { opacity: 0, x: -8 }}
                  key={capability.id}
                  transition={{ delay: 0.18 + index * 0.08, duration: 0.4, ease }}
                  viewport={{ once: true }}
                  whileInView={reduceMotion ? undefined : { opacity: 1, x: 0 }}
                >
                  <span className={`absolute -left-[1.31rem] size-1.5 rounded-full ${activeCapability === capability.id ? "bg-accent-secondary" : "bg-line"}`} />
                  <span className={`font-mono text-label uppercase tracking-[0.12em] transition-colors ${activeCapability === capability.id ? "text-foreground" : "text-muted/60"}`}>
                    {capability.layer}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.header>

          <div onMouseLeave={() => setActiveCapability(capabilities[0].id)}>
            {capabilities.map((capability, index) => (
              <CapabilityCard
                active={activeCapability === capability.id}
                capability={capability}
                index={index}
                key={capability.id}
                onActivate={setActiveCapability}
              />
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
