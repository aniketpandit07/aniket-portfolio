import { externalLinks } from "@/data/external-links";
import type { Project } from "@/types/project";

export const projects: Project[] = [
  {
    id: "sapthora", number: "01", title: "Sapthora",
    shortDescription: "Rebuilt a WordPress website as a full stack EdTech platform. Delivered 35+ production-ready features, contributing to a 20% increase in paid users.",
    category: "Full Stack EdTech Platform",
    technologies: ["React.js", "TypeScript", "Spring Boot", "MySQL", "AWS EC2", "AWS S3", "CloudFront", "Docker", "Jenkins"],
    featured: true, href: "/projects/sapthora", liveUrl: externalLinks.sapthora, githubUrl: null,
    period: "August 2025 - September 2026",
    overview: "Sapthora’s WordPress setup limited functionality, customization, and ownership of platform workflows. I rebuilt it as a custom full stack application, with responsive learning and administrative interfaces, API integration, database development, and cloud deployment.",
    metrics: [{ value: "35+", label: "Production-ready features" }, { value: "20%", label: "Increase in paid users" }, { value: "3", label: "Release environments" }],
    modules: ["Attendance", "Credits", "Reporting", "Support tickets", "Notifications", "Real-time chat"],
    contributions: [
      { title: "UI engineering & UX", description: "Owned responsive layouts, screens, and user flows using React.js and TypeScript, translating complex learning and administrative workflows into intuitive interfaces." },
      { title: "Backend development", description: "Developed backend functionality with Java and Spring Boot and integrated RESTful APIs to support attendance, credit management, reporting, ticket management, notifications, and real-time chat." },
      { title: "Database design", description: "Designed MySQL schemas for most modules, handled database relationships, and connected application workflows to persistent data as part of end-to-end feature delivery." },
      { title: "Cloud & deployment", description: "Managed development, staging, and production releases using AWS, Docker, Jenkins, and CI/CD pipelines. Used EC2 for hosting, S3 for image storage, and CloudFront for image delivery." },
      { title: "Technical challenges", description: "Addressed complex UI flows, frontend-backend integration, and database relationships while keeping behavior consistent across modules and environments." },
    ],
  },
  {
    id: "oneplatify", number: "02", title: "OnePlatify",
    shortDescription: "Developing a multi-tenant business platform for MSMEs, with responsibilities across 10+ modules and simultaneous ownership of HR and Helpdesk.",
    category: "Multi-Tenant B2B Platform",
    technologies: ["Next.js", "React.js", "TypeScript", "PostgreSQL", "Docker", "RESTful APIs", "Git"],
    featured: false, href: "/projects/oneplatify", liveUrl: externalLinks.oneplatify, githubUrl: null,
    period: "October 2026 - Present",
    overview: "OnePlatify brings employee management, customer relationships, and business operations into one centralized application for MSMEs. The platform is being developed around 12-15 interconnected modules, including CRM, HR, Helpdesk, and Voice, to address fragmented data and reliance on multiple applications.",
    metrics: [{ value: "10+", label: "Modules with development responsibilities" }, { value: "2", label: "Core modules owned: HR & Helpdesk" }],
    modules: ["CRM", "HR", "Helpdesk", "Voice"],
    contributions: [
      { title: "Module ownership", description: "Handle development responsibilities across 10+ modules, with simultaneous ownership of HR and Helpdesk." },
      { title: "Frontend engineering", description: "Build responsive interfaces, reusable components, and connected user flows with Next.js, React.js, and TypeScript." },
      { title: "API & data integration", description: "Integrate RESTful APIs and work with PostgreSQL to support linked workflows and consistent company and employee data across modules." },
      { title: "Development & delivery", description: "Use Docker and Git for consistent development environments and version-controlled delivery of the multi-tenant application." },
    ],
  },
];
