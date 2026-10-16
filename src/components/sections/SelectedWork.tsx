"use client";

import { motion, useReducedMotion } from "motion/react";
import { FeaturedProject } from "@/components/projects/FeaturedProject";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { Container } from "@/components/ui/container";
import type { Project } from "@/types/project";

export function SelectedWork({ projects }: { projects: Project[] }) {
  const reduceMotion = useReducedMotion();
  const featuredProject = projects.find((project) => project.featured);
  const remainingProjects = projects.filter((project) => !project.featured);

  if (!featuredProject) return null;

  return (
    <section className="relative overflow-hidden py-[var(--section-space)]" id="work" aria-labelledby="selected-work-title">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-line to-transparent" />
      <Container>
        <motion.div
          className="mb-8 grid items-end gap-5 min-[360px]:mb-10 min-[360px]:gap-6 sm:mb-14 lg:grid-cols-[1fr_0.75fr]"
          initial={{ opacity: 0, y: 18 }}
          transition={{ duration: reduceMotion ? 0 : 0.6, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true, amount: 0.5 }}
          whileInView={{ opacity: 1, y: 0 }}
        >
          <div>
            <div className="flex items-center gap-3 font-mono text-label uppercase tracking-[0.16em] text-muted">
              <span className="h-px w-8 bg-accent-primary" />
              02 / Selected work
            </div>
            <h2 className="mt-3 font-display text-section font-semibold leading-[0.92] tracking-[-0.055em] text-foreground min-[360px]:mt-4 sm:mt-5 sm:leading-[0.88] sm:tracking-[-0.065em]" id="selected-work-title">
              SELECTED <span className="text-muted">WORK</span><span className="text-accent-primary">.</span>
            </h2>
          </div>
          <div className="lg:pb-1">
            <p className="max-w-md text-sm leading-7 text-muted sm:text-base">
              Two products I&apos;ve helped build: an EdTech platform and a multi-tenant business application.
            </p>
            <div className="mt-6 flex items-center gap-3" aria-hidden="true">
              <span className="h-px flex-1 bg-line" />
              <span className="size-1.5 rounded-full bg-accent-secondary" />
              <span className="font-mono text-[0.5rem] tracking-[0.14em] text-muted">{String(projects.length).padStart(2, "0")} / PROJECTS</span>
            </div>
          </div>
        </motion.div>

        <FeaturedProject project={featuredProject} />

        <div className="mt-4 grid gap-4 min-[360px]:mt-6 min-[360px]:gap-6 lg:grid-cols-12">
          {remainingProjects.map((project, index) => (
            <ProjectCard
              className="lg:col-span-12 lg:grid lg:grid-cols-[1fr_1fr] lg:gap-8"
              index={index}
              key={project.id}
              project={project}
            />
          ))}
        </div>


      </Container>
    </section>
  );
}
