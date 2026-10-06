export interface Capability {
  id: string;
  number: string;
  title: string;
  layer: string;
  description: string;
  technologies: string[];
  note?: string;
}

export const capabilities: Capability[] = [
  {
    id: "build-interfaces",
    number: "01",
    title: "Build interfaces",
    layer: "Interfaces",
    description:
      "I turn designs and product requirements into responsive, production-ready interfaces with a strong focus on usability, consistency and interaction.",
    technologies: [
      "React",
      "TypeScript",
      "Chakra UI",
      "JavaScript",
    ],
  },
  {
    id: "build-applications",
    number: "02",
    title: "Build applications",
    layer: "Applications",
    description:
      "I connect interfaces to APIs, business logic and backend services to turn frontend experiences into fully functional web applications.",
    technologies: ["Java", "Spring Boot", "REST APIs"],
  },
  {
    id: "ship-scale",
    number: "03",
    title: "Ship & scale",
    layer: "Cloud / delivery",
    description:
      "I work with cloud services and delivery workflows to support applications beyond local development.",
    technologies: ["AWS S3", "AWS EC2", "CloudFront / CDN", "Jenkins", "CI/CD"],
    note: "Hands-on exposure and working knowledge",
  },
];
