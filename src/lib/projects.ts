import type { Project } from "@/types/profile";

/** Parse a nullable comma-separated string into a trimmed string array */
export function parseTags(raw: string | null): string[] {
  if (!raw) return [];
  return raw.split(",").map((t) => t.trim()).filter(Boolean);
}

/** Format ISO date string → "Jun 2023". Null → "" */
export function formatProjectDate(dateStr: string | null): string {
  if (!dateStr) return "";
  return new Date(dateStr).toLocaleDateString("en-US", {
    month: "short",
    year: "numeric",
  });
}

/** Badge style per project type */
export const PROJECT_TYPE_CLASS: Record<string, string> = {
  ML: "bg-violet-950/60 text-violet-300 border-violet-800/50",
  SE: "bg-blue-950/60 text-blue-300 border-blue-800/50",
};

/** Extract year from an ISO date string */
export function formatYear(dateStr: string | null): string {
  if (!dateStr) return "";
  return new Date(dateStr).getFullYear().toString();
}