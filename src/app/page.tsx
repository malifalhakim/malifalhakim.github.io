import { getClient } from "@/lib/supabase/server"
import { Navbar } from "@/components/Navbar"
import { HeroSection } from "@/components/HeroSection"
import { ExperiencesSection } from "@/components/ExperiencesSection"
import { ProjectsSection } from "@/components/ProjectsSection";
import type { Profile, Experience, Project } from "@/types/profile"

export const dynamic = "force-dynamic";

export default async function Home() {
  const supabase = getClient();

  const [profileResult, experiencesResult, projectsResult] = await Promise.all([
    supabase.from("profile").select("*").single<Profile>(),
    supabase.from("experiences").select("*").returns<Experience[]>(),
    supabase.from("projects").select("*").order("project_id", { ascending: true}).returns<Project[]>(),
  ]);

  if (profileResult.error || !profileResult.data) {
    return <div className="p-8 text-muted-foreground">Could not load profile.</div>;
  }

  return (
    <>
      <Navbar />
      <main>
        <HeroSection profile={profileResult.data} />
        <ExperiencesSection experiences={experiencesResult.data ?? []}/>
        <ProjectsSection projects={projectsResult.data ?? []}/>
      </main>
    </>
  )
}