import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Container } from "@/components/ui/container";
import { ProjectVisual } from "@/components/projects/ProjectVisual";
import { projects } from "@/data/projects";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((entry) => entry.id === slug);
  if (!project) return { title: "Project not found" };
  return {
    title: `${project.title} - ${project.category}`,
    description: project.shortDescription,
    alternates: { canonical: project.href },
    openGraph: { title: `${project.title} | Aniket Pandit`, description: project.shortDescription, url: project.href },
  };
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = projects.find((entry) => entry.id === slug);
  if (!project) notFound();
  const otherProject = projects.find((entry) => entry.id !== slug)!;

  return (
    <>
      <Navbar />
      <main id="top" className="pb-16 pt-28 sm:pt-36">
        <Container>
          <Link href="/#work" className="inline-flex min-h-11 items-center gap-2 font-mono text-label uppercase tracking-widest text-muted hover:text-foreground"><ArrowLeft className="size-4" aria-hidden="true" />All work</Link>
          <header className="mt-8 grid gap-8 border-b border-line pb-10 lg:grid-cols-[1fr_0.8fr] lg:items-end">
            <div>
              <p className="font-mono text-label uppercase tracking-widest text-accent-secondary">{project.category}</p>
              <h1 className="mt-4 font-display text-h1 font-semibold tracking-[-0.06em]">{project.title}<span className="text-accent-primary">.</span></h1>
              <p className="mt-5 font-mono text-label uppercase tracking-widest text-muted">{project.period}</p>
            </div>
            <p className="max-w-xl text-muted">{project.shortDescription}</p>
          </header>
          <div className="grid gap-10 py-10 lg:grid-cols-[1fr_1fr] lg:gap-16">
            <div>
              <h2 className="font-display text-subheading font-semibold tracking-tight">The project</h2>
              <p className="mt-5 text-muted">{project.overview}</p>
              <ul className="mt-6 flex flex-wrap gap-2" aria-label="Project technologies">{project.technologies.map((technology) => <li key={technology} className="rounded-full border border-line px-3 py-1.5 font-mono text-label text-muted">{technology}</li>)}</ul>
              {project.liveUrl && <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="mt-8 inline-flex min-h-12 items-center gap-2 rounded-full bg-accent-primary px-6 font-mono text-label uppercase tracking-widest text-white">Visit {project.title}<ArrowUpRight className="size-4" aria-hidden="true" /><span className="sr-only"> (opens in a new tab)</span></a>}
            </div>
            <ProjectVisual project={project} />
          </div>
          <section aria-labelledby="contributions-title" className="border-t border-line py-10">
            <h2 id="contributions-title" className="font-display text-subheading font-semibold tracking-tight">My contributions</h2>
            <div className="mt-8 grid gap-x-10 sm:grid-cols-2">{project.contributions.map((item, index) => <article key={item.title} className="border-t border-line py-6"><p className="font-mono text-label text-accent-secondary">0{index + 1}</p><h3 className="mt-3 font-display text-xl font-semibold">{item.title}</h3><p className="mt-3 text-sm leading-7 text-muted">{item.description}</p></article>)}</div>
          </section>
          <footer className="flex flex-wrap justify-between gap-5 border-t border-line pt-8 font-mono text-label uppercase tracking-widest">
            <Link href="/#contact" className="inline-flex min-h-11 items-center gap-2">Get in touch<ArrowUpRight className="size-4" aria-hidden="true" /></Link>
            <Link href={otherProject.href} className="inline-flex min-h-11 items-center gap-2">Explore {otherProject.title}<ArrowUpRight className="size-4" aria-hidden="true" /></Link>
          </footer>
        </Container>
      </main>
    </>
  );
}
