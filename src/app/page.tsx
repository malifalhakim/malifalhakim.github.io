import { getClient } from "@/lib/supabase/server"
import { Navbar } from "@/components/Navbar"
import { HeroSection } from "@/components/HeroSection"
import { Profile } from "@/types/profile"

export const dynamic = "force-dynamic";

export default async function Home() {
  const supabase = getClient();

  const { data: profile, error } = await supabase
    .from("profile")
    .select("*")
    .single<Profile>();
  
  if (error || !profile) {
    console.error("Failed to fetch profile:", error)
    return <div className="p-8 text-muted-foreground">Could not load profile.</div>
  }

  return (
    <>
      <Navbar />
      <main>
        <HeroSection profile={profile} />
      </main>
    </>
  )
}