import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Code, ExternalLink, CalendarDays } from "lucide-react"
import { parseTags, formatProjectDate, PROJECT_TYPE_CLASS } from "@/lib/projects"
import type { Project } from "@/types/profile"

export function ProjectCard({ project }: { project: Project}) {
    const tags = parseTags(project.tags);
    const techStacks = parseTags(project.tech_stacks);
    const dateLabel = formatProjectDate(project.project_date);
    const typeClass = PROJECT_TYPE_CLASS[project.project_type ?? ""] ?? "bg-muted text-muted-foreground border-border";

    return (
    <div className="group flex flex-col rounded-xl border border-border bg-card overflow-hidden hover:ring-1 hover:ring-foreground/20 transition-all duration-200">
      {/* ── Thumbnail ── */}
      {/* <div className="relative aspect-video w-full overflow-hidden bg-muted">
        {project.preview_url ? (
          <Image
            src={project.preview_url}
            alt={`${project.project_name} preview`}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          // Placeholder when no screenshot
          <div className="absolute inset-0 flex items-center justify-center text-muted-foreground/30 text-xs uppercase tracking-widest">
            No preview
          </div>
        )} */}

        {/* Type badge over image */}
        {/* {project.project_type && (
          <span className={`absolute top-2 right-2 text-[10px] font-bold uppercase tracking-wider
                            px-2 py-0.5 rounded border backdrop-blur-sm ${typeClass}`}>
            {project.project_type}
          </span>
        )}
      </div> */}

      {/* ── Body ── */}
      <div className="flex flex-col flex-1 gap-3 p-4">
        {/* Title + date */}
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-sm font-semibold text-foreground leading-snug">
            {project.project_name}
          </h3>
          {dateLabel && (
            <div className="flex items-center gap-1 text-[11px] text-muted-foreground shrink-0">
              <CalendarDays size={11} />
              {dateLabel}
            </div>
          )}
        </div>

        {/* Description — 2-line clamp */}
        {project.description && (
          <p className="text-xs text-muted-foreground leading-relaxed line-clamp-3">
            {project.description}
          </p>
        )}

        {/* Tags */}
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {tags.map((tag) => (
              <span key={tag}
                className="text-[10px] bg-muted text-muted-foreground px-1.5 py-0.5 rounded border border-border">
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Tech stacks */}
        {techStacks.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {techStacks.map((tech) => (
              <span key={tech}
                className="text-[10px] font-medium bg-primary/10 text-primary px-1.5 py-0.5 rounded">
                {tech}
              </span>
            ))}
          </div>
        )}

        {/* Spacer + action buttons pinned to bottom */}
        <div className="flex items-center gap-2 mt-auto pt-2">
          {project.repo_url && (
            <Button asChild variant="outline" size="sm" className="h-7 text-xs gap-1.5 flex-1">
              <a href={project.repo_url} target="_blank" rel="noopener noreferrer">
                <Code size={12} /> Code
              </a>
            </Button>
          )}
          {project.demo_url && (
            <Button asChild variant="default" size="sm" className="h-7 text-xs gap-1.5 flex-1">
              <a href={project.demo_url} target="_blank" rel="noopener noreferrer">
                <ExternalLink size={12} /> Demo
              </a>
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}