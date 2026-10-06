import type { Project } from "@/types/project";

export const projects: Project[] = [
  {
    id: "education-management-platform",
    number: "01",
    title: "Education Management Platform",
    shortDescription:
      "An education platform interface covering student, teacher, parent, course, enrollment, attendance and scheduling workflows.",
    category: "Full-Stack Web Application",
    technologies: ["React", "TypeScript", "Spring Boot", "MySQL"],
    featured: true,
    image: "education",
    href: "#education-management-platform",
    liveUrl: null,
    githubUrl: null,
  },
  {
    id: "interactive-analytics-dashboard",
    number: "02",
    title: "Interactive Analytics Dashboard",
    shortDescription:
      "A responsive dashboard concept focused on presenting complex data through clear visual hierarchy, filters and interactive UI.",
    category: "Frontend / Data Visualization",
    technologies: ["React", "TypeScript", "REST API"],
    featured: false,
    image: "analytics",
    href: "#interactive-analytics-dashboard",
    liveUrl: null,
    githubUrl: null,
  },
  {
    id: "scheduling-booking-interface",
    number: "03",
    title: "Scheduling & Booking Interface",
    shortDescription:
      "A responsive scheduling experience designed around calendars, availability, time slots and intuitive user flows.",
    category: "Frontend Engineering",
    technologies: ["React", "TypeScript", "API Integration"],
    featured: false,
    image: "scheduling",
    href: "#scheduling-booking-interface",
    liveUrl: null,
    githubUrl: null,
  },
  {
    id: "developer-interface-lab",
    number: "04",
    title: "Developer Interface Lab",
    shortDescription:
      "A collection of interaction experiments exploring motion, responsive layouts, reusable components and modern interface patterns.",
    category: "UI Experiment",
    technologies: ["React", "TypeScript", "Motion"],
    featured: false,
    image: "lab",
    href: "#developer-interface-lab",
    liveUrl: null,
    githubUrl: null,
  },
];
