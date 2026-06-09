import { Publication } from "@/types/profile"
import { PublicationsList } from "./PublicationsList";

type Props = {
    publications: Publication[];
};

export function PublicationsSection({ publications }: Props) {
    return (
        <section id="publications" className="py-0 space-y-12">
            {/* ── Section header ── */}
            <div className="max-w-2xl mx-auto px-6 md:px-12 space-y-3 flex flex-col items-center text-center">
                <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground">
                Publications
                </h2>
                <div className="h-px w-16 bg-primary" />
            </div>

            {/* ── Publication rows ── */}
            <div className="max-w-3xl mx-auto px-6 md:px-0">
                <PublicationsList publications={publications}/>
            </div>
        </section>
    )
}