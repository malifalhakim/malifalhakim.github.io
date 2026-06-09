// src/components/EducationSkillsSection.tsx
import Image from "next/image";
import { sortEducation, formatEduDateRange } from "@/lib/education";
import { groupSkills } from "@/lib/skills";
import type { Education, Skill } from "@/types/profile";

type Props = {
  education: Education[];
  skills: Skill[];
};

export function EducationSkillsSection({ education, skills }: Props) {
  const sortedEdu   = sortEducation(education);
  const skillGroups = groupSkills(skills);

  return (
    <section
      id="skills"
      className="max-w-[1200px] mx-auto px-6 md:px-12 py-24 space-y-10" 
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-16">

        {/* ══ LEFT COLUMN: Education ══════════════════════════════════════ */}
        <div className="space-y-10">
          <div className="space-y-3 flex flex-col items-center text-center">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground">
              Education
            </h2>
            <div className="h-px w-16 bg-primary" />
          </div>

          <div className="space-y-8">
            {sortedEdu.map((edu) => {
              const dateRange = formatEduDateRange(edu.start_date, edu.end_date);

              return (
                <div key={edu.education_name} className="flex items-start gap-4">

                  {/* School logo */}
                  {edu.logo_url && (
                    <div className="relative size-10 shrink-0 rounded-md overflow-hidden border border-border bg-muted mt-1">
                      <Image
                        src={edu.logo_url}
                        alt={`${edu.education_name} logo`}
                        fill
                        className="object-contain p-1"
                      />
                    </div>
                  )}

                  {/* Text content */}
                  <div className="space-y-1">
                    {/* Degree category — e.g. "Master's Degree" */}
                    <h3 className="text-base font-semibold text-foreground leading-snug">
                      {edu.education_category}
                    </h3>

                    {/* School name + date range */}
                    <p className="text-sm text-muted-foreground">
                      {edu.education_name}
                      {dateRange && <span> • {dateRange}</span>}
                    </p>

                    {/* Grade — only if present */}
                    {edu.grade !== null && (
                      <p className="text-sm text-muted-foreground">
                        GPA: {edu.grade.toFixed(2)}
                      </p>
                    )}

                    {/* Description — italic, like the design */}
                    {edu.description && (
                      <p className="text-sm text-muted-foreground italic mt-1.5">
                        {edu.description}
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ══ RIGHT COLUMN: Skills ════════════════════════════════════════ */}
        {/* Invisible anchor so the "Skills" nav link works */}
        <div className="space-y-10">
          <div className="space-y-3 flex flex-col items-center text-center">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground">
              Technical Skills
            </h2>
            <div className="h-px w-16 bg-primary" />
          </div>

          <div className="space-y-8">
            {skillGroups.map(({ label, skills: groupItems }) => (
              <div key={label} className="space-y-3">
                {/* Category heading — uppercase muted label */}
                <h3 className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                  {label}
                </h3>

                {/* Skill badge chips */}
                <div className="flex flex-wrap gap-2">
                  {groupItems.map((skill) => (
                    <span
                      key={skill.skill_name}
                      className="bg-muted border border-border px-3 py-1.5 rounded-lg text-sm font-medium text-foreground"
                    >
                      {skill.skill_name}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}