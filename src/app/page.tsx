import { Navbar } from "@/components/layout/Navbar";
import { AboutContact } from "@/components/sections/AboutPageContent";
import { Expertise } from "@/components/sections/Expertise";
import { Experience } from "@/components/sections/Experience";
import { Hero } from "@/components/sections/Hero";
import { SelectedWork } from "@/components/sections/SelectedWork";
import { UiLab } from "@/components/sections/UiLab";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <SelectedWork />
        <Expertise />
        <Experience />
        <UiLab />
        <AboutContact />
      </main>
    </>
  );
}
