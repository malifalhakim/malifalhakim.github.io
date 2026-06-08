import { getClient } from '@/lib/supabase/server'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export const dynamic = 'force-dynamic'
const supabase = getClient()

export default async function Home() {
  const { data: projects, error } = await supabase.from('projects').select('*')

  return (
    <main className="max-w-4xl mx-auto py-12 px-4 space-y-8">
      <header className="space-y-2">
        <h1 className="text-4xl font-extrabold tracking-tight">Welcome to My Portfolio</h1>
        <p className="text-muted-foreground text-lg">Powered by Next.js, shadcn/ui, and Supabase.</p>
      </header>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {projects && projects.map((project) => (
          <Card key={project.project_id} className="shadow-sm hover:shadow-md transition-shadow">
            <CardHeader>
              <CardTitle>{project.name}</CardTitle>
              <CardDescription>{project.tech_stacks || 'Web Development'}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">{project.description}</p>
              <Button variant="outline" size="sm" asChild>
                <a href={project.preview_url} target="_blank" rel="noreferrer">
                  View Project
                </a>
              </Button>
            </CardContent>
          </Card>
        ))}

        {(!projects || projects.length === 0) && (
          <p className="text-muted-foreground italic col-span-2">No projects found. Check your Supabase connection or table policies!</p>
        )}
      </section>
    </main>
  )
}