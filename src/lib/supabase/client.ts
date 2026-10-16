import { createBrowserClient } from "@supabase/ssr";
import { getSupabaseConfig } from "@/lib/supabase/config";

/**
 * Creates a browser client only when public Supabase configuration is present.
 * Callers must handle `null` so local UI development can run without a project.
 */
export function createClient() {
  const config = getSupabaseConfig();

  if (!config) {
    return null;
  }

  return createBrowserClient(config.url, config.publishableKey);
}
