import type { Experience, ExperienceType } from "@/types/profile";

const TYPE_ORDER: Record<string, number> = {
    research: 0,
    work: 1,
    course: 2,
    other: 3,
};


/**
 * Sort experiences:
 * 1. By type group (research → work → course → other)
 * 2. Within each group, by end_date descending (most recent first).
 *    Null end_date (= current/ongoing) sorts to the top of the group.
 */
export function sortExperiences(experiences: Experience[]): Experience[] {
    return [...experiences].sort((a, b) => {
        const typeA = TYPE_ORDER[a.experience_type ?? "other"] ?? 3;
        const typeB = TYPE_ORDER[b.experience_type ?? "other"] ?? 3;

        if (typeA !== typeB) return typeA - typeB;

        if (!a.end_date && !b.end_date) return 0;
        if (!a.end_date) return -1;
        if (!b.end_date) return 1;

        return new Date(b.end_date).getTime() - new Date(a.end_date).getTime();
    });
}

/**
 * Format a Supabase ISO date string as "Jan 2023".
 * Returns "Present" for null end_date.
 */
export function formatMonthYear(dateStr: string | null, fallback = "Present"): string {
    if (!dateStr) return fallback;
    return new Date(dateStr).toLocaleDateString("en-US", {
        month: "short",
        year: "numeric",
    });
}

/** Human-readable label for the badge */
export const TYPE_LABEL: Record<string, string> = {
  research: "Research",
  work:     "Work",
  course:   "Course",
  other:    "Other",
};

/** Badge color variants per type — mapped to Tailwind classes */
export const TYPE_BADGE_CLASS: Record<string, string> = {
  research: "bg-blue-950/60 text-blue-300 border-blue-800/50",
  work:     "bg-muted text-foreground border-border",
  course:   "bg-emerald-950/60 text-emerald-300 border-emerald-800/50",
  other:    "bg-muted text-muted-foreground border-border",
};