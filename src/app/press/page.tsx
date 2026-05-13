import Link from 'next/link'
import type { Metadata } from 'next'
import { PageShell } from '@/components/shared/page-shell'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { SITE_CONFIG } from '@/lib/site-config'
import { buildPageMetadata } from '@/lib/seo'

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata({
    path: '/press',
    title: `Press room — ${SITE_CONFIG.name}`,
    description: `Media resources and contact points for ${SITE_CONFIG.name}.`,
  })
}

export default function PressPage() {
  return (
    <PageShell
      title="Press room"
      description="Information for journalists, partners, and media teams covering Daily Trend Press."
    >
      <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <Card className="border-[#ead8cc]">
          <CardContent className="space-y-3 p-6 sm:p-8">
            <h2 className="text-lg font-semibold text-foreground">Media &amp; story requests</h2>
            <p className="text-sm leading-relaxed text-muted-foreground">
              For interviews, data points, or background on how our newswire serves customers, reach the team through the contact
              page. Please include your outlet, deadline, and whether the piece is on or off the record.
            </p>
            <Button asChild>
              <Link href="/contact">Open contact form</Link>
            </Button>
          </CardContent>
        </Card>
        <Card className="border-[#ead8cc]">
          <CardContent className="space-y-3 p-6 sm:p-8">
            <h2 className="text-lg font-semibold text-foreground">Brand &amp; logo use</h2>
            <p className="text-sm leading-relaxed text-muted-foreground">
              The {SITE_CONFIG.name} name and logomark should not be modified or placed on backgrounds that fail contrast checks.
              Request official assets when you have an approved need—our team will send the right files for print and screen.
            </p>
            <p className="text-sm text-muted-foreground">
              Live product screenshots may be captured from the public site; please include the page URL and capture date in your
              caption.
            </p>
          </CardContent>
        </Card>
      </div>
    </PageShell>
  )
}
