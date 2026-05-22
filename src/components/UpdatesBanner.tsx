import { ArrowUpRight, Sparkles } from 'lucide-react'

import { lastSiteEditDate, siteUpdates } from '@/data/site-updates'
import { cn } from '@/lib/utils'

function formatDate(iso: string): string {
  const d = new Date(iso + 'T00:00:00')
  return d.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}

export function UpdatesBanner() {
  if (siteUpdates.length === 0) return null

  return (
    <section
      className="mb-10 rounded-xl border border-amber-500/25 bg-amber-500/5 px-5 py-5 md:px-6 md:py-6"
      aria-label="Recent updates"
    >
      <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 mb-4">
        <h2 className="text-sm font-semibold uppercase tracking-widest text-amber-300/90 inline-flex items-center gap-1.5">
          <Sparkles className="size-3.5" aria-hidden />
          What&apos;s new
        </h2>
        <p className="text-xs text-muted-foreground">
          Since the last hub edit ({formatDate(lastSiteEditDate)})
        </p>
      </div>

      <ul
        className={cn(
          siteUpdates.length > 1
            ? 'grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8'
            : 'space-y-5',
        )}
      >
        {siteUpdates.map((update) => (
          <li key={`${update.date}-${update.title}`} className="min-w-0">
            <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1 mb-2">
              <time
                dateTime={update.date}
                className="text-[11px] font-medium uppercase tracking-wide text-amber-300/80"
              >
                {formatDate(update.date)}
              </time>
              <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
                {update.href ? (
                  <a
                    href={update.href}
                    target={update.external ? '_blank' : undefined}
                    rel={update.external ? 'noopener noreferrer' : undefined}
                    className={cn(
                      'text-sm font-semibold text-foreground inline-flex items-center gap-1',
                      'hover:text-amber-200 transition-colors',
                    )}
                  >
                    {update.title}
                    <ArrowUpRight className="size-3.5 shrink-0" aria-hidden />
                  </a>
                ) : (
                  <span className="text-sm font-semibold text-foreground">
                    {update.title}
                  </span>
                )}
                {update.author && (
                  <span className="text-xs text-muted-foreground">
                    by {update.author}
                  </span>
                )}
              </div>
            </div>
            <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
              {update.bullets.map((bullet) => (
                <li key={bullet}>{bullet}</li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </section>
  )
}
