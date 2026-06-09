import type { Skill } from "@/types/profile";

export const SKILL_CATEGORY_LABEL: Record<string, string> = {
  SE:                     "Other Frameworks",
  ML:                     "ML Frameworks",
  "Programming Languages": "Programming Languages",
  Misc:                   "Miscellaneous",
};

const CATEGORY_ORDER: Record<string, number> = {
  SE: 2,
  ML: 1,
  "Programming Languages": 0,
  Misc: 3,
};

/**
 * Group skills by category and return them in the defined order.
 */
export function groupSkills(
  skills: Skill[]
): Array<{ label: string; skills: Skill[] }> {
  const map = new Map<string, Skill[]>();
  for (const skill of skills) {
    const key = skill.category ?? "Misc";
    if (!map.has(key)) map.set(key, []);
    map.get(key)!.push(skill);
  }
  return [...map.entries()]
    .sort(([a], [b]) => {
      const orderA = CATEGORY_ORDER[a] ?? 99;
      const orderB = CATEGORY_ORDER[b] ?? 99;
      return orderA - orderB;
    })
    .map(([key, items]) => ({
      label: SKILL_CATEGORY_LABEL[key] ?? key,
      skills: items,
    }));
}
