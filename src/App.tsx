import { useMemo, useState } from "react"
import { ArrowUpRight, Search, Sparkles, X } from "lucide-react"

import {
  prototypes,
  GRADIENTS,
  type Prototype,
  type PrototypeCategory,
} from "@/data/prototypes"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { UpdatesBanner } from "@/components/UpdatesBanner"
import { cn } from "@/lib/utils"

const CATEGORY_LABELS: Record<PrototypeCategory, string> = {
  canvas: "Canvas",
  storybook: "Storybook",
  dashboard: "Dashboard",
  prototype: "Prototype",
  tool: "Tool",
  writeup: "Writeup",
}

const STATUS_STYLES: Record<string, string> = {
  live: "bg-emerald-500/15 text-emerald-300 border-emerald-500/30",
  wip: "bg-amber-500/15 text-amber-300 border-amber-500/30",
  archived: "bg-muted text-muted-foreground border-border",
}

type Filter = "all" | PrototypeCategory

function formatDate(iso: string): string {
  const d = new Date(iso + "T00:00:00")
  return d.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  })
}

interface ProjectCardProps {
  p: Prototype
  featured?: boolean
}

function ProjectCard({ p, featured = false }: ProjectCardProps) {
  return (
    <a
      key={p.slug}
      href={p.href}
      target={p.external ? "_blank" : undefined}
      rel={p.external ? "noopener noreferrer" : undefined}
      className="group block"
    >
      <Card
        className={cn(
          "h-full overflow-hidden p-0 gap-0 transition-all hover:shadow-lg hover:shadow-foreground/5 hover:-translate-y-0.5 hover:border-foreground/30",
          featured && "ring-1 ring-amber-500/30 border-amber-500/30",
        )}
      >
        <div
          className={cn(
            "relative w-full overflow-hidden",
            featured ? "h-44" : "h-32",
          )}
          style={{ background: GRADIENTS[p.gradient] }}
        >
          {/* Header image. Gradient shows behind it while the image loads
              and fills any letterboxing on extreme aspect ratios.
              object-top keeps screenshot titles visible when we crop. */}
          {p.image && (
            <img
              src={p.image}
              alt=""
              loading="lazy"
              decoding="async"
              className="absolute inset-0 w-full h-full object-cover object-top"
            />
          )}
          {/* Bottom fade. Softer when there's an image so the artwork
              stays visible; tighter on gradient-only cards so the pills
              still pop. */}
          <div
            className={cn(
              "absolute inset-0 bg-gradient-to-t via-transparent to-transparent",
              p.image ? "from-card/60" : "from-card",
            )}
          />
          <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
            <span className="text-[10px] font-medium uppercase tracking-wider text-white/90 bg-black/30 backdrop-blur-sm px-2 py-1 rounded">
              {CATEGORY_LABELS[p.category]}
            </span>
            <Badge
              variant="outline"
              className={cn(
                "text-[10px] backdrop-blur-sm",
                STATUS_STYLES[p.status],
              )}
            >
              {p.status}
            </Badge>
          </div>
        </div>

        <CardHeader className="pt-5 pb-3 min-w-0">
          {/* Card titles must fit on a single line at the default 3-column
              desktop layout. Featured \u2264 30 chars, regular \u2264 34 chars.
              See the "Card title length" rule in AGENTS.md.
              The CSS guard below is a backstop; titles should not rely on it. */}
          <CardTitle
            className={cn(
              featured ? "text-xl" : "text-lg",
              "leading-snug whitespace-nowrap overflow-hidden text-ellipsis min-w-0",
            )}
            title={p.title}
          >
            {p.title}
          </CardTitle>
          <CardDescription
            className={cn(featured ? "line-clamp-4" : "line-clamp-3", "mt-1.5")}
          >
            {p.description}
          </CardDescription>
        </CardHeader>

        {p.tags && p.tags.length > 0 && (
          <CardContent className="pb-3">
            <div className="flex flex-wrap gap-1.5">
              {p.tags.map((t) => (
                <Badge
                  key={t}
                  variant="secondary"
                  className="text-[10px] font-normal"
                >
                  {t}
                </Badge>
              ))}
            </div>
          </CardContent>
        )}

        <CardFooter className="mt-auto pt-3 pb-5 flex flex-col items-stretch gap-2.5">
          <div className="flex items-start justify-between gap-2 text-[11px] text-muted-foreground">
            <div className="min-w-0 space-y-0.5">
              <div className="flex flex-wrap items-baseline gap-x-1.5 gap-y-0">
                <span className="text-muted-foreground/60 shrink-0">Creator</span>
                <span className="text-foreground/90 font-medium">{p.createdBy}</span>
              </div>
              <time dateTime={p.createdDate} className="text-muted-foreground/80">
                {formatDate(p.createdDate)}
              </time>
            </div>
            <ArrowUpRight
              className="size-4 shrink-0 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              aria-hidden
            />
          </div>
          <div className="text-[11px] text-muted-foreground min-w-0 space-y-0.5">
            <div className="flex flex-wrap items-baseline gap-x-1.5 gap-y-0">
              <span className="text-muted-foreground/60 shrink-0">Last modified by</span>
              <span className="text-foreground/90 font-medium">{p.lastModifiedBy}</span>
            </div>
            <time dateTime={p.modifiedDate} className="text-muted-foreground/80">
              {formatDate(p.modifiedDate)}
            </time>
          </div>
        </CardFooter>
      </Card>
    </a>
  )
}

function App() {
  const [filter, setFilter] = useState<Filter>("all")
  const [query, setQuery] = useState("")

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase()
    return prototypes.filter((p) => {
      if (filter !== "all" && p.category !== filter) return false
      if (!q) return true
      const haystack = [
        p.title,
        p.description,
        p.createdBy,
        p.lastModifiedBy,
        ...(p.tags ?? []),
        CATEGORY_LABELS[p.category],
      ]
        .join(" ")
        .toLowerCase()
      return haystack.includes(q)
    })
  }, [filter, query])

  const featuredVisible = useMemo(
    () => visible.filter((p) => p.featured),
    [visible],
  )
  const restVisible = useMemo(
    () => visible.filter((p) => !p.featured),
    [visible],
  )

  const categoriesPresent = useMemo(() => {
    const set = new Set<PrototypeCategory>()
    prototypes.forEach((p) => set.add(p.category))
    return Array.from(set)
  }, [])

  return (
    <main className="mx-auto max-w-6xl px-6 py-16 md:py-24">
      <header className="mb-12">
        <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground mb-3">
          Azalea Phangsoa · Staging
        </p>
        <h1 className="text-4xl md:text-5xl font-semibold tracking-tight leading-tight max-w-2xl mb-4">
          Maps &amp; Command prototypes.
        </h1>
        <p className="text-lg text-muted-foreground max-w-prose">
          Canvases and IA audits — iterate here, then promote to the team hub.
        </p>
        <p className="text-lg text-muted-foreground max-w-prose">
          Built in React so anyone can dig in.
        </p>
      </header>

      <UpdatesBanner />

      {prototypes.length === 0 ? (
        <Card className="border-dashed">
          <CardHeader>
            <CardTitle>Nothing here yet.</CardTitle>
            <CardDescription>
              New entries will land soon. To add one, edit{" "}
              <code className="rounded bg-muted px-1.5 py-0.5 text-xs">
                src/data/prototypes.ts
              </code>{" "}
              and push to{" "}
              <code className="rounded bg-muted px-1.5 py-0.5 text-xs">
                main
              </code>
              .
            </CardDescription>
          </CardHeader>
        </Card>
      ) : (
        <>
          <div className="flex flex-col lg:flex-row lg:items-center gap-3 lg:gap-4 mb-8">
            {/* Search box (left-aligned) */}
            <div className="relative lg:w-80 shrink-0">
              <Search
                className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground/70 pointer-events-none"
                aria-hidden
              />
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={"Search title, description, tag\u2026"}
                aria-label="Search projects"
                className={cn(
                  "w-full h-9 rounded-full bg-card/80 border pl-9 pr-9 text-sm placeholder:text-muted-foreground/60",
                  "transition-colors focus-visible:outline-none",
                  query
                    ? "border-amber-500/50 ring-2 ring-amber-500/20"
                    : "border-border focus-visible:border-foreground/40 focus-visible:ring-2 focus-visible:ring-foreground/10",
                )}
              />
              {query && (
                <button
                  type="button"
                  onClick={() => setQuery("")}
                  aria-label="Clear search"
                  className="absolute right-2 top-1/2 -translate-y-1/2 size-6 rounded-full hover:bg-muted text-muted-foreground hover:text-foreground inline-flex items-center justify-center transition-colors"
                >
                  <X className="size-3.5" aria-hidden />
                </button>
              )}
            </div>

            {/* Filter pills (right-aligned) */}
            <nav
              className="flex flex-wrap gap-2 lg:ml-auto lg:justify-end"
              aria-label="Filter prototypes by category"
            >
              <Button
                variant={filter === "all" ? "default" : "outline"}
                size="sm"
                onClick={() => setFilter("all")}
                className="rounded-full"
              >
                All ({prototypes.length})
              </Button>
              {categoriesPresent.map((cat) => {
                const count = prototypes.filter(
                  (p) => p.category === cat
                ).length
                return (
                  <Button
                    key={cat}
                    variant={filter === cat ? "default" : "outline"}
                    size="sm"
                    onClick={() => setFilter(cat)}
                    className="rounded-full"
                  >
                    {CATEGORY_LABELS[cat]} ({count})
                  </Button>
                )
              })}
            </nav>
          </div>

          {/* Search results summary */}
          {query && (
            <p className="text-xs text-muted-foreground mb-5 -mt-3">
              {visible.length === 0
                ? "No matches"
                : `${visible.length} ${visible.length === 1 ? "match" : "matches"}`}{" "}
              for <span className="text-amber-300 font-medium">&ldquo;{query}&rdquo;</span>
              {filter !== "all" && (
                <>
                  {" "}in <span className="text-foreground">{CATEGORY_LABELS[filter]}</span>
                </>
              )}
            </p>
          )}

          {featuredVisible.length > 0 && (
            <section className="mb-10" aria-label="Featured projects">
              <div className="flex items-baseline gap-3 mb-4">
                <h2 className="text-sm font-semibold uppercase tracking-widest text-amber-300/90 inline-flex items-center gap-1.5">
                  <Sparkles className="size-3.5" aria-hidden />
                  Featured
                </h2>
                <span className="text-xs text-muted-foreground">
                  Maps 2.0 editor and navigation IA work in progress.
                </span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {featuredVisible.map((p) => (
                  <ProjectCard key={p.slug} p={p} featured />
                ))}
              </div>
            </section>
          )}

          {restVisible.length > 0 && (
            <section aria-label="All other projects">
              {featuredVisible.length > 0 && (
                <div className="flex items-baseline gap-3 mb-4">
                  <h2 className="text-sm font-semibold uppercase tracking-widest text-muted-foreground">
                    More work
                  </h2>
                  <span className="text-xs text-muted-foreground/70">
                    Other audits, tools, and one-off prototypes.
                  </span>
                </div>
              )}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {restVisible.map((p) => (
                  <ProjectCard key={p.slug} p={p} />
                ))}
              </div>
            </section>
          )}

          {featuredVisible.length === 0 && restVisible.length === 0 && (
            <Card className="border-dashed">
              <CardHeader>
                <CardTitle>Nothing matches.</CardTitle>
                <CardDescription>
                  {query
                    ? "Try a different search term, or clear the search."
                    : "Try another filter."}
                </CardDescription>
              </CardHeader>
            </Card>
          )}
        </>
      )}

      <footer className="mt-24 pt-8 border-t text-sm text-muted-foreground flex items-center justify-between">
        <p>Built with React + Vite + Tailwind + shadcn/ui.</p>
        <a
          href="https://github.com/azalea-verkada/azalea-verkada.github.io"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 hover:text-foreground transition-colors"
        >
          <svg
            viewBox="0 0 24 24"
            className="size-4"
            fill="currentColor"
            aria-hidden="true"
          >
            <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.756-1.333-1.756-1.09-.745.083-.73.083-.73 1.205.085 1.838 1.236 1.838 1.236 1.07 1.835 2.807 1.305 3.492.998.108-.775.42-1.305.762-1.605-2.665-.303-5.467-1.332-5.467-5.93 0-1.31.467-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.4 3-.405 1.02.005 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
          </svg>
          Source
        </a>
      </footer>
    </main>
  )
}

export default App
