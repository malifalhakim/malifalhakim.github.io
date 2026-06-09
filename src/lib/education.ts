import type { Education } from "@/types/profile";

/* Extract year from ISO date string */
function toYear(dateStr: string | null): string {
    if (!dateStr) return "";
    return new Date(dateStr).getFullYear().toString();
}

/* Format date range for education instance */
export function formatEduDateRange(
    start: string | null,
    end: string | null,
): string {
    const s = toYear(start);
    const e = end ? toYear(end) : "Present";
    if (!s) return e;
    if (s === e) return s;
    return `${s} - ${e}`
}

/* Sort education by end_date */
export function sortEducation(items: Education[]): Education[] {
    return [...items].sort((a, b) => {
        if (!a.end_date && !b.end_date) return 0;
        if (!a.end_date) return -1;
        if (!b.end_date) return 1;
        return new Date(b.end_date).getTime() - new Date(a.end_date).getTime(); 
    });
}