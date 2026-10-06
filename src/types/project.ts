export type ProjectMockupKind =
  | "education"
  | "analytics"
  | "scheduling"
  | "lab";

export interface Project {
  id: string;
  number: string;
  title: string;
  shortDescription: string;
  category: string;
  technologies: string[];
  featured: boolean;
  image: ProjectMockupKind;
  href: string;
  liveUrl: string | null;
  githubUrl: string | null;
}
