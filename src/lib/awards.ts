import type { Award, Volunteering } from "@/types/profile";

export type UnifiedItem = {
  key: string;
  kind: "award" | "volunteer";
  name: string;
  subtitle: string;
  dateLabel: string;      
  sortDate: Date | null;  
  description: string | null;
  logo_url: string | null;
};

function toMonthYear(dateStr: string | null): string {
  if (!dateStr) return "";
  return new Date(dateStr).toLocaleDateString("en-US", {
    month: "short",
    year: "numeric",
  });
}

function toDate(dateStr: string | null): Date | null {
  if (!dateStr) return null;
  return new Date(dateStr);
}

export function mergeAndSort(
  awards: Award[],
  volunteering: Volunteering[]
): UnifiedItem[] {
  const awardItems: UnifiedItem[] = awards.map((a) => ({
    key:         `award-${a.award_name}`,
    kind:        "award",
    name:        a.award_name,
    subtitle:    a.giver,
    dateLabel:   toMonthYear(a.date_given),
    sortDate:    toDate(a.date_given),
    description: a.description,
    logo_url:    a.logo_url,
  }));

  const volunteerItems: UnifiedItem[] = volunteering.map((v) => {
    const start = toMonthYear(v.start_date);
    const end   = v.end_date ? toMonthYear(v.end_date) : "Present";
    return {
      key:         `volunteer-${v.volunteer_name}`,
      kind:        "volunteer",
      name:        v.volunteer_name,
      subtitle:    v.organization ?? "",
      dateLabel:   `${start} — ${end}`,
      sortDate:    toDate(v.end_date ?? v.start_date),
      description: v.description,
      logo_url:    v.logo_url,
    };
  });

 
  return [...awardItems, ...volunteerItems].sort((a, b) => {
    if (!a.sortDate && !b.sortDate) return 0;
    if (!a.sortDate) return -1;
    if (!b.sortDate) return 1;
    return b.sortDate.getTime() - a.sortDate.getTime();
  });
}

export const KIND_BADGE: Record<string, { label: string; className: string }> = {
  award: {
    label:     "Award",
    className: "bg-amber-950/60 text-amber-300 border-amber-800/50",
  },
  volunteer: {
    label:     "Volunteer",
    className: "bg-emerald-950/60 text-emerald-300 border-emerald-800/50",
  },
};