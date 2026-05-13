import type { Metadata } from "next";
import Link from "next/link";
import { PageShell } from "@/components/shared/page-shell";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { SITE_CONFIG } from "@/lib/site-config";
import { buildPageMetadata } from "@/lib/seo";

const pillars = [
  {
    title: "Wire-native structure",
    description:
      "Headline, lede, body, and facts keep the same hierarchy on every story so journalists and readers know where to look first.",
  },
  {
    title: "Operator-friendly controls",
    description:
      "Embargos, categories, and review steps map to how comms teams already work—no mystery boxes that only engineers can change.",
  },
  {
    title: "Performance you can explain",
    description:
      "When leadership asks what a release did, you can point to the archive, reach notes, and search traffic in plain language.",
  },
];

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata({
    path: "/about",
    title: `About ${SITE_CONFIG.name}`,
    description: `How ${SITE_CONFIG.name} approaches press distribution, reporting, and reader trust.`,
  });
}

export default function AboutPage() {
  return (
    <PageShell
      title={`About ${SITE_CONFIG.name}`}
      description={`${SITE_CONFIG.name} is a press release newswire focused on structured announcements, honest reach reporting, and fast paths from draft to live.`}
      actions={
        <>
          <Button asChild>
            <Link href="/contact">Contact</Link>
          </Button>
        </>
      }
    >
      <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <Card className="border-[#ead8cc] bg-white">
          <CardContent className="space-y-4 p-6 sm:p-8">
            <h2 className="text-2xl font-semibold text-foreground">Why we exist</h2>
            <p className="text-sm leading-relaxed text-muted-foreground">
              Most teams do not need another blog template. They need a professional front door for announcements, a consistent
              reading experience, and an archive that still makes sense six months later. That is the product surface {SITE_CONFIG.name}{" "}
              optimizes for—without hiding the underlying publishing engine that keeps your routes, tasks, and feeds compatible
              with the rest of the platform.
            </p>
            <p className="text-sm leading-relaxed text-muted-foreground">
              We bias toward clarity: transparent pricing lanes, predictable story pages, and UI that looks like a modern newswire
              instead of a recolored consumer app.
            </p>
          </CardContent>
        </Card>
        <div className="space-y-4">
          {pillars.map((value) => (
            <Card key={value.title} className="border-[#ead8cc] bg-white">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-foreground">{value.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{value.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </PageShell>
  );
}
