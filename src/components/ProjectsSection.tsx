import { ProjectsGrid } from "@/components/ProjectsGrid";
import type { Project } from "@/types/profile";

export function ProjectsSection({ projects }: { projects: Project[] }) {
  return (
    <section id="projects" className="max-w-[1200px] mx-auto px-6 md:px-12 py-24 space-y-10">

      {/* Section header */}
      <div className="space-y-3 flex flex-col items-center text-center">
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground">
          Projects
        </h2>
        <div className="h-px w-16 bg-primary" />
      </div>

      <ProjectsGrid projects={projects} />
    </section>
  );
}