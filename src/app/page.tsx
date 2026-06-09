import { getClient } from "@/lib/supabase/server"
import { Navbar } from "@/components/Navbar"
import { HeroSection } from "@/components/HeroSection"
import { ExperiencesSection } from "@/components/ExperiencesSection"
import type { Profile, Experience } from "@/types/profile"

export const dynamic = "force-dynamic";

export default async function Home() {
  const supabase = getClient();

  const [profileResult, experiencesResult] = await Promise.all([
    supabase.from("profile").select("*").single<Profile>(),
    supabase.from("experiences").select("*").returns<Experience[]>(),
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
      </main>
    </>
  )
}