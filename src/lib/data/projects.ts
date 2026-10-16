import "server-only";
import { projects as staticProjects } from "@/data/projects";
import type { Project } from "@/types/project";

/**
 * The UI reads project content through this boundary. Static data remains the
 * source of truth until a reviewed Supabase schema and records are available.
 */
export async function getProjects(): Promise<Project[]> {
  return [...staticProjects];
}
