import { Navbar } from "@/components/layout/Navbar";
import { AboutContact } from "@/components/sections/AboutPageContent";
import { Expertise } from "@/components/sections/Expertise";
import { Experience } from "@/components/sections/Experience";
import { Hero } from "@/components/sections/Hero";
import { SelectedWork } from "@/components/sections/SelectedWork";
import { getProjects } from "@/lib/data/projects";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default async function Home() {
  const projects = await getProjects();

  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <SelectedWork projects={projects} />
        <Expertise />
        <Experience />
        <AboutContact />
      </main>
    </>
  );
}
import type { Metadata } from "next";
