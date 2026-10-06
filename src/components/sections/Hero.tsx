"use client";

import { ArrowDown, ArrowUpRight } from "lucide-react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { HeroVisual } from "@/components/sections/HeroVisual";

const ease = [0.22, 1, 0.36, 1] as const;

export function Hero() {
  const reduceMotion = useReducedMotion();
  const { scrollY } = useScroll();
  const scrollIndicatorOpacity = useTransform(scrollY, [0, 140], [1, 0]);

  return (
    <section
      className="hero-grid relative isolate overflow-hidden pb-10 pt-20 min-[360px]:pt-24 sm:pb-12 sm:pt-28 lg:flex lg:min-h-svh lg:items-center lg:pb-16 lg:pt-28"
      id="top"
    >
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_74%_40%,rgba(124,92,255,0.11),transparent_30%),radial-gradient(circle_at_15%_20%,rgba(56,214,199,0.045),transparent_22%)]" />

      <Container className="grid items-center gap-6 sm:gap-10 lg:grid-cols-[1.08fr_0.92fr] lg:gap-8 xl:gap-16">
        <div className="relative z-10">
          <motion.div
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-3 font-mono text-label uppercase tracking-[0.16em] text-muted sm:tracking-[0.2em]"
            initial={{ opacity: 0, y: 12 }}
            transition={{ duration: reduceMotion ? 0 : 0.55, ease }}
          >
            <span className="h-px w-8 bg-accent-primary" />
            Frontend / Full-stack developer
          </motion.div>

          <h1 className="mt-4 overflow-hidden font-display text-display font-semibold leading-[0.87] tracking-[-0.055em] text-foreground min-[360px]:mt-5 sm:mt-6 sm:leading-[0.84] sm:tracking-[-0.065em]">
            <motion.span
              animate={{ y: 0 }}
              className="block"
              initial={{ y: "105%" }}
              transition={{ delay: reduceMotion ? 0 : 0.08, duration: reduceMotion ? 0 : 0.75, ease }}
            >
              ANIKET
            </motion.span>
            <span className="block overflow-hidden pb-[0.08em]">
              <motion.span
                animate={{ y: 0 }}
                className="block text-muted"
                initial={{ y: "105%" }}
                transition={{ delay: reduceMotion ? 0 : 0.15, duration: reduceMotion ? 0 : 0.75, ease }}
              >
                PANDIT<span className="text-accent-primary">.</span>
              </motion.span>
            </span>
          </h1>

          <motion.p
            animate={{ opacity: 1, y: 0 }}
            className="mt-4 max-w-xl text-body leading-6 text-muted min-[360px]:mt-5 sm:mt-7 sm:leading-8"
            initial={{ opacity: 0, y: 16 }}
            transition={{ delay: reduceMotion ? 0 : 0.25, duration: reduceMotion ? 0 : 0.6, ease }}
          >
            I build thoughtful digital interfaces and full-stack experiences with a focus on clean interaction,
            responsive design, and real-world usability.
          </motion.p>

          <motion.div
            animate={{ opacity: 1, y: 0 }}
            className="mt-6 grid gap-2.5 min-[380px]:flex min-[380px]:flex-wrap sm:mt-9 sm:gap-3"
            initial={{ opacity: 0, y: 16 }}
            transition={{ delay: reduceMotion ? 0 : 0.34, duration: reduceMotion ? 0 : 0.6, ease }}
          >
            <Link
              className="group inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-accent-primary px-4 font-mono text-label font-medium uppercase tracking-[0.1em] text-white outline-none transition-[transform,background-color] hover:-translate-y-0.5 hover:brightness-110 focus-visible:ring-2 focus-visible:ring-foreground focus-visible:ring-offset-2 focus-visible:ring-offset-background min-[360px]:min-h-12 min-[360px]:px-5 min-[360px]:tracking-[0.12em] sm:px-6"
              href="#work"
            >
              View my work
              <ArrowDown className="size-3.5 transition-transform group-hover:translate-y-0.5" aria-hidden="true" />
            </Link>
            <Link
              className="group inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-line bg-panel/55 px-4 font-mono text-label font-medium uppercase tracking-[0.1em] text-foreground outline-none transition-[transform,border-color,background-color] hover:-translate-y-0.5 hover:border-muted hover:bg-panel-elevated focus-visible:ring-2 focus-visible:ring-accent-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background min-[360px]:min-h-12 min-[360px]:px-5 min-[360px]:tracking-[0.12em] sm:px-6"
              href="#contact"
            >
              Let&apos;s talk
              <ArrowUpRight className="size-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
            </Link>
          </motion.div>
        </div>

        <HeroVisual />
      </Container>

      <motion.div
        className="pointer-events-none absolute bottom-5 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 lg:flex"
        style={{ opacity: scrollIndicatorOpacity }}
      >
        <span className="font-mono text-[0.53rem] uppercase tracking-[0.22em] text-muted">Scroll</span>
        <span className="relative h-8 w-px overflow-hidden bg-line">
          <motion.span
            animate={reduceMotion ? undefined : { y: ["-100%", "130%"] }}
            className="absolute inset-x-0 top-0 h-1/2 bg-accent-primary"
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          />
        </span>
      </motion.div>
    </section>
  );
}
