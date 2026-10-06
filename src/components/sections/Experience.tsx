"use client";

import { ArrowRight, ArrowUpRight } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { useState } from "react";
import { Container } from "@/components/ui/container";
import { externalLinks } from "@/data/external-links";

const ease = [0.22, 1, 0.36, 1] as const;

const productAreas = [
  {
    name: "Enrollment",
    description: "Parents move from selecting a course and schedule to creating an enrollment.",
    position: "left-[4%] top-[8%]",
    anchor: { x1: 122, y1: 72, x2: 282, y2: 205 },
  },
  {
    name: "Courses",
    description: "Course choices connect the learning experience to enrollment and scheduling.",
    position: "right-[2%] top-[15%]",
    anchor: { x1: 518, y1: 103, x2: 362, y2: 205 },
  },
  {
    name: "Scheduling",
    description: "Class timing and teacher availability become part of the application workflow.",
    position: "right-0 top-[48%]",
    anchor: { x1: 530, y1: 244, x2: 388, y2: 244 },
  },
  {
    name: "Attendance",
    description: "Class participation and attendance connect back into the learning workflow.",
    position: "right-[7%] bottom-[7%]",
    anchor: { x1: 505, y1: 410, x2: 362, y2: 284 },
  },
  {
    name: "Users & roles",
    description: "Students, parents and teachers interact through role-specific experiences.",
    position: "left-[7%] bottom-[4%]",
    anchor: { x1: 126, y1: 423, x2: 282, y2: 284 },
  },
  {
    name: "Support",
    description: "Support workflows connect operational needs with the application experience.",
    position: "left-0 top-[48%]",
    anchor: { x1: 102, y1: 244, x2: 256, y2: 244 },
  },
] as const;

const responsibilities = [
  {
    number: "01",
    title: "Interface development",
    description: "Building responsive application screens, reusable components and user-facing workflows.",
  },
  {
    number: "02",
    title: "Product workflows",
    description: "Connecting interfaces with APIs and application logic to make real workflows functional.",
  },
  {
    number: "03",
    title: "Production collaboration",
    description: "Working across frontend, backend and cloud-connected parts during ongoing product development.",
  },
] as const;

function ProductMap({ activeIndex, setActiveIndex, reduceMotion }: {
  activeIndex: number;
  setActiveIndex: (index: number) => void;
  reduceMotion: boolean | null;
}) {
  return (
    <div className="relative aspect-[1.12/1] min-h-[29rem] overflow-hidden border border-line/80 bg-panel/30">
      <div aria-hidden="true" className="absolute inset-0 bg-[linear-gradient(rgba(41,49,60,0.18)_1px,transparent_1px),linear-gradient(90deg,rgba(41,49,60,0.18)_1px,transparent_1px)] bg-[size:3rem_3rem] [mask-image:radial-gradient(circle_at_center,black,transparent_78%)]" />
      <div aria-hidden="true" className="absolute left-1/2 top-1/2 size-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent-primary/[0.06] blur-[75px]" />

      <svg aria-hidden="true" className="absolute inset-0 size-full" preserveAspectRatio="none" viewBox="0 0 640 500">
        {productAreas.map((area, index) => (
          <motion.path
            animate={{ opacity: activeIndex === index ? 1 : 0.2, pathLength: activeIndex === index ? 1 : 0.72 }}
            d={`M ${area.anchor.x1} ${area.anchor.y1} L ${area.anchor.x2} ${area.anchor.y2}`}
            fill="none"
            key={area.name}
            stroke={activeIndex === index ? "var(--color-secondary)" : "var(--color-border)"}
            strokeDasharray={activeIndex === index ? "0" : "3 6"}
            strokeWidth={activeIndex === index ? 1.5 : 1}
            transition={{ duration: reduceMotion ? 0 : 0.45, ease }}
            vectorEffect="non-scaling-stroke"
          />
        ))}
      </svg>

      <motion.div
        animate={{ borderColor: "rgba(124, 92, 255, 0.55)", boxShadow: "0 0 55px rgba(124, 92, 255, 0.1)" }}
        className="absolute left-1/2 top-1/2 z-10 w-[34%] min-w-36 -translate-x-1/2 -translate-y-1/2 border bg-background/95 px-4 py-6 text-center sm:px-6"
        initial={reduceMotion ? false : { opacity: 0, scale: 0.94 }}
        transition={{ duration: reduceMotion ? 0 : 0.7, ease }}
        viewport={{ once: true, amount: 0.8 }}
        whileInView={reduceMotion ? undefined : { opacity: 1, scale: 1 }}
      >
        <span className="font-mono text-label uppercase tracking-[0.14em] text-accent-secondary">Product core</span>
        <strong className="mt-2 block font-display text-[clamp(1.4rem,3vw,2.35rem)] font-semibold leading-none tracking-[-0.06em] text-foreground">SAPTHORA</strong>
        <span className="mt-2 block font-mono text-label uppercase leading-4 tracking-[0.1em] text-muted">Online learning platform</span>
      </motion.div>

      {productAreas.map((area, index) => {
        const isActive = activeIndex === index;
        return (
          <button
            aria-label={`${area.name}: ${area.description}`}
            aria-pressed={isActive}
            className={`absolute z-20 min-w-24 border px-3 py-2.5 text-left outline-none transition-[border-color,background-color,opacity,transform] focus-visible:ring-2 focus-visible:ring-accent-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background ${area.position} ${isActive ? "scale-100 border-accent-secondary/70 bg-panel-elevated opacity-100" : "scale-[0.97] border-line/70 bg-background/90 opacity-50 hover:opacity-90"}`}
            key={area.name}
            onClick={() => setActiveIndex(index)}
            onFocus={() => setActiveIndex(index)}
            type="button"
          >
            <span className={`block font-mono text-label tracking-[0.12em] ${isActive ? "text-accent-secondary" : "text-muted"}`}>0{index + 1}</span>
            <span className="mt-1 block font-display text-[0.67rem] font-semibold uppercase tracking-[-0.02em] text-foreground xl:text-xs">{area.name}</span>
          </button>
        );
      })}

    </div>
  );
}

export function Experience() {
  const reduceMotion = useReducedMotion();
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section aria-labelledby="experience-title" className="relative overflow-hidden border-t border-line/50 py-[var(--section-space)]" id="experience">
      <div aria-hidden="true" className="pointer-events-none absolute right-0 top-32 h-96 w-96 translate-x-1/2 rounded-full bg-accent-secondary/[0.035] blur-[120px]" />
      <Container className="relative">
        <motion.header
          className="grid gap-5 border-b border-line/70 pb-8 min-[360px]:gap-6 min-[360px]:pb-9 sm:pb-11 lg:grid-cols-[1.15fr_0.85fr] lg:items-end"
          initial={reduceMotion ? false : { opacity: 0, y: 18 }}
          transition={{ duration: reduceMotion ? 0 : 0.6, ease }}
          viewport={{ once: true, amount: 0.4 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
        >
          <div>
            <div className="flex items-center gap-3 font-mono text-label uppercase tracking-[0.16em] text-muted">
              <span className="h-px w-8 bg-accent-primary" />
              04 / Experience
            </div>
            <h2 className="mt-3 max-w-4xl font-display text-section-wide font-semibold leading-[0.94] tracking-[-0.05em] text-foreground min-[360px]:mt-4 sm:mt-5 sm:leading-[0.88] sm:tracking-[-0.065em]" id="experience-title">
              FROM WEBSITE<br /><span className="text-muted">TO WORKING</span> PRODUCT<span className="text-accent-primary">.</span>
            </h2>
          </div>
          <div className="max-w-lg lg:pb-1">
            <p className="text-sm leading-7 text-muted sm:text-base sm:leading-8">
              Real product work is more than building screens. It is understanding how interfaces, workflows and people connect.
            </p>
            <div className="mt-6 flex items-end gap-3 border-t border-line/70 pt-4 min-[360px]:mt-7 min-[360px]:gap-4 min-[360px]:pt-5" aria-label="More than one year building UI flows at Sapthora">
              <strong className="font-display text-[clamp(2.8rem,6vw,5.25rem)] font-semibold leading-[0.78] tracking-[-0.075em] text-foreground">1+</strong>
              <div className="pb-0.5">
                <span className="block font-mono text-label uppercase tracking-[0.13em] text-accent-secondary">Year of experience</span>
                <span className="mt-1.5 block font-mono text-label uppercase leading-4 tracking-[0.09em] text-muted">Building UI flows at Sapthora</span>
              </div>
            </div>
          </div>
        </motion.header>

        <div className="mt-8 flex items-center justify-between gap-3 min-[360px]:mt-10 sm:mt-14 sm:gap-4">
          <div className="flex items-center gap-3 font-mono text-[0.5rem] uppercase tracking-[0.16em] text-muted">
            <span className="size-1.5 rounded-full bg-accent-secondary" /> Product flow
          </div>
          <span className="hidden font-mono text-[0.46rem] uppercase tracking-[0.13em] text-muted/60 sm:block">One product / connected experiences</span>
        </div>

        <div className="mt-5 hidden items-start gap-8 md:grid md:grid-cols-[1.15fr_0.85fr] lg:gap-14">
          <div className="sticky top-24"><ProductMap activeIndex={activeIndex} reduceMotion={reduceMotion} setActiveIndex={setActiveIndex} /></div>
          <div className="border-t border-line/70">
            {productAreas.map((area, index) => (
              <motion.article
                className={`relative min-h-[8rem] border-b px-2 py-5 transition-[border-color,opacity] duration-300 lg:grid lg:min-h-0 lg:grid-cols-[0.72fr_1.28fr] lg:items-start lg:gap-5 lg:px-4 lg:py-4 ${activeIndex === index ? "border-accent-secondary/50 opacity-100" : "border-line/70 opacity-45"}`}
                key={area.name}
                onViewportEnter={() => setActiveIndex(index)}
                viewport={{ amount: 0.7, margin: "-18% 0px -18% 0px" }}
              >
                <div>
                  <span className={`font-mono text-[0.48rem] tracking-[0.14em] ${activeIndex === index ? "text-accent-secondary" : "text-muted"}`}>0{index + 1}</span>
                  <h3 className="mt-2 font-display text-[clamp(1.3rem,2.5vw,2rem)] font-semibold uppercase leading-none tracking-[-0.045em] text-foreground lg:text-[1.35rem]">{area.name}</h3>
                </div>
                <p className="mt-3 max-w-md text-xs leading-6 text-muted lg:mt-0">{area.description}</p>
              </motion.article>
            ))}
          </div>
        </div>

        <div className="relative mt-6 md:hidden">
          <div className="sticky top-16 z-20 flex items-center justify-between gap-2 border border-line/80 bg-background/95 px-3 py-2.5 backdrop-blur-lg min-[360px]:top-20 min-[360px]:px-4 min-[360px]:py-3">
            <div>
              <span className="font-display text-base font-semibold tracking-[-0.035em] text-foreground min-[360px]:text-lg">SAPTHORA</span>
              <span className="ml-1.5 hidden font-mono text-label uppercase tracking-[0.09em] text-muted min-[350px]:inline">Product core</span>
            </div>
            <span className="font-mono text-label text-accent-secondary">0{activeIndex + 1} / 06</span>
          </div>
          <div className="ml-2 border-l border-line/80 pl-5 min-[360px]:ml-4 min-[360px]:pl-6">
            {productAreas.map((area, index) => (
              <motion.article
                className="relative flex min-h-[7.5rem] flex-col justify-center border-b border-line/70 py-5 min-[360px]:min-h-[8.75rem] min-[360px]:py-6"
                initial={reduceMotion ? false : { opacity: 0.38, x: 8 }}
                key={area.name}
                onViewportEnter={() => setActiveIndex(index)}
                transition={{ duration: reduceMotion ? 0 : 0.35 }}
                viewport={{ amount: 0.7, margin: "-15% 0px -15% 0px" }}
                whileInView={{ opacity: 1, x: 0 }}
              >
                <span aria-hidden="true" className={`absolute -left-[1.7rem] top-1/2 size-2 -translate-y-1/2 rounded-full border-2 border-background ${activeIndex === index ? "bg-accent-secondary" : "bg-line"}`} />
                <span className="font-mono text-label tracking-[0.12em] text-accent-secondary">0{index + 1}</span>
                <h3 className="mt-2 font-display text-2xl font-semibold uppercase leading-none tracking-[-0.05em] text-foreground">{area.name}</h3>
                <p className="mt-3 max-w-sm text-xs leading-6 text-muted">{area.description}</p>
              </motion.article>
            ))}
          </div>
        </div>

        <div className="mt-12 border-t border-line/70 pt-7 sm:mt-14 sm:pt-8">
          <div className="flex flex-wrap items-end justify-between gap-5">
            <div>
              <span className="font-mono text-label uppercase tracking-[0.13em] text-accent-primary">My role</span>
              <h3 className="mt-2 font-display text-[clamp(2rem,4vw,3.6rem)] font-semibold uppercase leading-none tracking-[-0.055em] text-foreground">Across the product</h3>
            </div>
            <a className="group inline-flex min-h-10 items-center gap-2 font-mono text-label uppercase tracking-[0.11em] text-muted underline decoration-line underline-offset-4 outline-none transition-colors hover:text-foreground focus-visible:rounded-sm focus-visible:ring-2 focus-visible:ring-accent-primary focus-visible:ring-offset-4 focus-visible:ring-offset-background" href={externalLinks.sapthora} rel="noopener noreferrer" target="_blank">
              View Sapthora <ArrowUpRight aria-hidden="true" className="size-3 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
          </div>
          <div className="mt-8 grid border-t border-line/70 md:grid-cols-3">
            {responsibilities.map((item, index) => (
              <motion.article
                className={`border-b border-line/70 py-6 md:border-b-0 md:px-6 md:py-6 ${index > 0 ? "md:border-l" : "md:pl-0"}`}
                initial={reduceMotion ? false : { opacity: 0, y: 14 }}
                key={item.title}
                transition={{ delay: reduceMotion ? 0 : index * 0.08, duration: reduceMotion ? 0 : 0.45, ease }}
                viewport={{ once: true, amount: 0.5 }}
                whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
              >
                <span className="font-mono text-label tracking-[0.12em] text-accent-secondary">{item.number}</span>
                <h4 className="mt-3 font-display text-lg font-semibold uppercase leading-tight tracking-[-0.035em] text-foreground">{item.title}</h4>
                <p className="mt-3 text-xs leading-6 text-muted">{item.description}</p>
              </motion.article>
            ))}
          </div>
        </div>

        <motion.footer
          className="mt-10 flex flex-col gap-5 border-t border-line/70 pt-7 sm:mt-12 sm:flex-row sm:items-end sm:justify-between"
          initial={reduceMotion ? false : { opacity: 0, y: 12 }}
          transition={{ duration: reduceMotion ? 0 : 0.5, ease }}
          viewport={{ once: true, amount: 0.7 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
        >
          <p className="text-sm text-muted">From individual screens to connected workflows.</p>
          <div aria-label="Screen to workflow to product" className="flex flex-wrap items-center gap-2 font-mono text-label uppercase tracking-[0.11em] text-foreground sm:gap-4">
            <span>Screen</span><ArrowRight aria-hidden="true" className="size-3 text-accent-primary" /><span>Workflow</span><ArrowRight aria-hidden="true" className="size-3 text-accent-secondary" /><span>Product</span>
          </div>
        </motion.footer>
      </Container>
    </section>
  );
}
