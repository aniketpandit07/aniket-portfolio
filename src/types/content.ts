export interface ContentTimestamps {
  createdAt: string;
  updatedAt: string;
}

export type AvailabilityStatus =
  | "not_specified"
  | "available"
  | "limited"
  | "unavailable";

export interface SiteSettings extends ContentTimestamps {
  id: string;
  key: string;
  siteTitle: string;
  siteDescription: string | null;
  availabilityStatus: AvailabilityStatus;
  availabilityText: string | null;
  contactEmail: string | null;
  githubUrl: string | null;
  linkedinUrl: string | null;
}

export interface PortfolioSection extends ContentTimestamps {
  id: string;
  slug: string;
  displayName: string;
  isEnabled: boolean;
  displayOrder: number;
}

export interface ProjectEntity extends ContentTimestamps {
  id: string;
  slug: string;
  title: string;
  shortDescription: string;
  category: string;
  technologies: string[];
  thumbnailPath: string | null;
  projectUrl: string | null;
  githubUrl: string | null;
  isFeatured: boolean;
  isPublished: boolean;
  displayOrder: number;
}

export interface CaseStudy extends ContentTimestamps {
  id: string;
  projectId: string | null;
  slug: string;
  title: string;
  subtitle: string | null;
  summary: string | null;
  overview: string | null;
  challenge: string | null;
  approach: string | null;
  outcome: string | null;
  isPublished: boolean;
  displayOrder: number;
}

export interface ExperienceEntry extends ContentTimestamps {
  id: string;
  slug: string;
  organization: string;
  role: string;
  startDate: string;
  endDate: string | null;
  summary: string | null;
  organizationUrl: string | null;
  technologies: string[];
  isPublished: boolean;
  displayOrder: number;
}
