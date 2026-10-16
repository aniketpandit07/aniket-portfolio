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
      "React.js",
      "Next.js",
      "TypeScript",
      "Redux",
      "Chakra UI",
      "JavaScript",
      "HTML5",
      "CSS3",
      "Responsive Web Design",
    ],
  },
  {
    id: "build-applications",
    number: "02",
    title: "Build applications",
    layer: "Applications",
    description:
      "I connect interfaces to APIs, business logic and backend services to turn frontend experiences into fully functional web applications.",
    technologies: ["Java", "Spring Boot", "Node.js", "Express.js", "RESTful APIs", "WebSocket", "PostgreSQL", "MySQL"],
  },
  {
    id: "ship-scale",
    number: "03",
    title: "Ship & scale",
    layer: "Cloud / delivery",
    description:
      "I work with cloud services and delivery workflows to support applications beyond local development.",
    technologies: ["AWS S3", "AWS EC2", "CloudFront", "Docker", "Jenkins", "CI/CD Pipelines"],
  },
  {
    id: "tools-platforms",
    number: "04",
    title: "Tools & collaboration",
    layer: "Development workflow",
    description: "I use version control, API testing, design tools, and project tracking throughout development, and mentor junior developers and interns through technical guidance and knowledge transfer.",
    technologies: ["Git", "GitHub", "Postman", "Figma", "Jira", "VS Code", "IntelliJ IDEA"],
  },
];
