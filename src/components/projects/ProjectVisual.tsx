import type { Project } from "@/types/project";

export function ProjectVisual({ project }: { project: Project }) {
  return (
    <div className="relative overflow-hidden rounded-xl border border-line bg-background p-5 sm:p-8">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(124,92,255,0.12),transparent_65%)]" />
      <div className="relative">
        <p className="font-mono text-label uppercase tracking-[0.14em] text-accent-secondary">{project.period}</p>
        <p className="mt-5 font-display text-[clamp(1.7rem,5vw,3.5rem)] font-semibold tracking-[-0.055em]">{project.title}<span className="text-accent-primary">.</span></p>
        <div className="mt-6 grid gap-4 border-y border-line py-5 sm:grid-cols-2">
          {project.metrics.map((metric) => (
            <div key={metric.label}>
              <strong className="font-display text-3xl tracking-[-0.05em] sm:text-4xl">{metric.value}</strong>
              <p className="mt-1 max-w-52 font-mono text-label uppercase tracking-[0.08em] text-muted">{metric.label}</p>
            </div>
          ))}
        </div>
        <ul className="mt-5 flex flex-wrap gap-2" aria-label={`${project.title} modules`}>
          {project.modules.map((module) => <li key={module} className="rounded-md border border-line bg-panel px-3 py-2 font-mono text-label text-muted">{module}</li>)}
        </ul>
      </div>
    </div>
  );
}
