export interface Project {
  id: string;
  number: string;
  title: string;
  shortDescription: string;
  category: string;
  technologies: string[];
  featured: boolean;
  period: string;
  overview: string;
  contributions: { title: string; description: string }[];
  metrics: { value: string; label: string }[];
  modules: string[];
  href: string;
  liveUrl: string | null;
  githubUrl: string | null;
}
