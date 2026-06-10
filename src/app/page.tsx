import { getClient } from "@/lib/supabase/server"
import { Navbar } from "@/components/Navbar"
import { HeroSection } from "@/components/HeroSection"
import { ExperiencesSection } from "@/components/ExperiencesSection"
import { ProjectsSection } from "@/components/ProjectsSection";
import { type Profile, type Experience, type Project, type Publication, type Education, type Skill, Award, Volunteering } from "@/types/profile"
import { PublicationsSection } from "@/components/PublicationsSection";
import { EducationSkillsSection } from "@/components/EducationSkillsSection";
import { AwardsSection } from "@/components/AwardsSection";
import { Footer } from "@/components/Footer";

export const dynamic = "force-dynamic";

export default async function Home() {
  const supabase = getClient();

  const [profileResult, experiencesResult, projectsResult, publicationsResult, educationResult, skillsResult, awardsResult, volunteerResults] = await Promise.all([
    supabase.from("profile").select("*").single<Profile>(),
    supabase.from("experiences").select("*").returns<Experience[]>(),
    supabase.from("projects").select("*").order("project_date", { ascending: false }).returns<Project[]>(),
    supabase.from("publications").select("*").order("published_date", {ascending:false}).returns<Publication[]>(),
    supabase.from("education").select("*").returns<Education[]>(),
    supabase.from("skills").select("skill_name, category").returns<Skill[]>(),
    supabase.from("awards").select("*").returns<Award[]>(),
    supabase.from("volunteering").select("*").returns<Volunteering[]>(),
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
        <PublicationsSection publications={publicationsResult.data ?? []} />
        <EducationSkillsSection education={educationResult.data ?? []} skills={skillsResult.data ?? []}/>
        <AwardsSection awards={awardsResult.data ?? []} volunteering={volunteerResults.data ?? []}/>
      </main>
      <Footer profile={profileResult.data}/>
    </>
  )
}