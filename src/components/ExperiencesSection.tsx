import { ExperiencesList } from "@/components/ExperiencesList";
import { sortExperiences } from "@/lib/experiences";
import type { Experience } from "@/types/profile";

export function ExperiencesSection({ experiences }: { experiences: Experience[] }) {
  const sorted = sortExperiences(experiences);

  return (
    <section id="experience" className="py-24 space-y-12">
      {/* Section header */}
      <div className="max-w-2xl mx-auto px-6 md:px-12 space-y-3 flex flex-col items-center text-center">
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground">
          Experience
        </h2>
        <div className="h-px w-16 bg-primary" />
      </div>

      {/* Cards — narrower, centered */}
      <div className="max-w-3xl mx-auto px-6 md:px-0">
        <ExperiencesList experiences={sorted} />
      </div>
    </section>
  );
}