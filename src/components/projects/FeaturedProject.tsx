"use client";

import { ArrowUpRight } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import Link from "next/link";
import { ProjectVisual } from "@/components/projects/ProjectVisual";
import type { Project } from "@/types/project";

export function FeaturedProject({ project }: { project: Project }) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.article
      className="group rounded-[1rem] border border-line/80 bg-panel/45 p-3 transition-colors duration-300 hover:border-muted/55 hover:bg-panel/70 min-[360px]:p-4 sm:rounded-[1.5rem] sm:p-6 lg:p-8"
      id={project.id}
      initial={{ opacity: 0, y: 28 }}
      transition={{ duration: reduceMotion ? 0 : 0.65, ease: [0.22, 1, 0.36, 1] }}
      viewport={{ once: true, amount: 0.15 }}
      whileInView={{ opacity: 1, y: 0 }}
    >
      <div className="grid gap-6 sm:gap-8 lg:grid-cols-[0.72fr_1.5fr] lg:gap-10 xl:gap-14">
        <div className="flex flex-col justify-between lg:py-2">
          <div>
            <div className="flex items-center justify-between gap-5">
              <span className="font-mono text-label tracking-[0.15em] text-accent-primary">{project.number}</span>
              <span className="font-mono text-label uppercase tracking-[0.11em] text-muted">Featured project</span>
            </div>
            <p className="mt-6 font-mono text-label uppercase tracking-[0.11em] text-muted sm:mt-7 sm:tracking-[0.13em]">{project.category}</p>
            <h3 className="mt-3 font-display text-[clamp(1.65rem,7vw,3.65rem)] font-semibold leading-[1] tracking-[-0.05em] text-foreground sm:leading-[0.96] sm:tracking-[-0.055em]">
              {project.title}
            </h3>
            <p className="mt-4 max-w-md text-sm leading-6 text-muted sm:mt-5 sm:leading-7">{project.shortDescription}</p>
          </div>

          <div className="mt-8 lg:mt-12">
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((technology) => (
                <span className="rounded-full border border-line bg-background/45 px-3 py-1.5 font-mono text-label uppercase tracking-[0.07em] text-muted" key={technology}>{technology}</span>
              ))}
            </div>
            <Link href={project.href} className="min-h-11 rounded-sm outline-none focus-visible:ring-2 focus-visible:ring-accent-primary mt-7 inline-flex items-center gap-2 font-mono text-label uppercase tracking-[0.11em] text-foreground">
              View project details
              <ArrowUpRight className="size-3.5 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
            </Link>
          </div>
        </div>

        <motion.div
          className="min-w-0 overflow-hidden rounded-2xl bg-panel-elevated p-2 sm:p-3"
          whileHover={reduceMotion ? undefined : { y: -4 }}
          transition={{ duration: 0.25 }}
        >
          <ProjectVisual project={project} />
        </motion.div>
      </div>
    </motion.article>
  );
}
