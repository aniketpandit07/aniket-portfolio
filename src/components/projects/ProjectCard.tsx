"use client";

import { ArrowUpRight } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import Link from "next/link";
import { ProjectVisual } from "@/components/projects/ProjectVisual";
import type { Project } from "@/types/project";

interface ProjectCardProps {
  project: Project;
  className?: string;
  index: number;
}

export function ProjectCard({ project, className = "", index }: ProjectCardProps) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.article
      className={`group flex min-w-0 flex-col rounded-[1rem] border border-line/80 bg-panel/40 p-3 transition-colors duration-300 hover:border-muted/55 hover:bg-panel/70 min-[360px]:p-4 sm:rounded-[1.35rem] sm:p-5 ${className}`}
      id={project.id}
      initial={{ opacity: 0, y: 24 }}
      transition={{ delay: reduceMotion ? 0 : index * 0.06, duration: reduceMotion ? 0 : 0.58, ease: [0.22, 1, 0.36, 1] }}
      viewport={{ once: true, amount: 0.12 }}
      whileInView={{ opacity: 1, y: 0 }}
    >
      <motion.div
        className="min-w-0 overflow-hidden rounded-xl bg-panel-elevated p-2"
        whileHover={reduceMotion ? undefined : { y: -3 }}
        transition={{ duration: 0.22 }}
      >
        <ProjectVisual project={project} />
      </motion.div>

      <div className="flex flex-1 flex-col px-1 pb-1 pt-5 sm:pt-6">
        <div className="flex items-center justify-between gap-4">
          <span className="font-mono text-label tracking-[0.14em] text-accent-primary">{project.number}</span>
          <span className="font-mono text-label uppercase tracking-[0.1em] text-muted">{project.category}</span>
        </div>
        <h3 className="mt-3 max-w-xl font-display text-[clamp(1.45rem,6vw,2.55rem)] font-semibold leading-[1.04] tracking-[-0.04em] text-foreground sm:mt-4">{project.title}</h3>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-muted sm:mt-4">{project.shortDescription}</p>
        <div className="mt-auto pt-6">
          <div className="flex flex-wrap gap-x-4 gap-y-2 border-t border-line/60 pt-4">
            {project.technologies.map((technology) => <span className="font-mono text-label uppercase tracking-[0.07em] text-muted" key={technology}>{technology}</span>)}
          </div>
          <Link href={project.href} className="min-h-11 rounded-sm outline-none focus-visible:ring-2 focus-visible:ring-accent-primary mt-5 inline-flex items-center gap-2 font-mono text-label uppercase tracking-[0.1em] text-foreground">
            View project details
            <ArrowUpRight className="size-3.5 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </motion.article>
  );
}
