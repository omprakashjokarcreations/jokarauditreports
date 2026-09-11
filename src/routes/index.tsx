import { createFileRoute } from "@tanstack/react-router";
import { ExternalLink, Globe, Linkedin, Users, Video } from "lucide-react";
import { useMemo, useState } from "react";

import gradientLogo from "@/assets/gradient_logo.png.asset.json";
import { Lightbox } from "@/components/Lightbox";
import { allServices, auditEntries, type AuditEntry } from "@/data/audit";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Client Digital Presence Audit — Jokar Creations" },
      {
        name: "description",
        content:
          "Audit of websites and LinkedIn presence for six automotive and manufacturing clients, with the services and potential identified by Jokar Creations.",
      },
      {
        property: "og:title",
        content: "Client Digital Presence Audit — Jokar Creations",
      },
      {
        property: "og:description",
        content:
          "Websites, LinkedIn activity and potential identified for six automotive and manufacturing clients.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: AuditPage,
});

const areaIcon = {
  Website: Globe,
  LinkedIn: Linkedin,
  "Corporate Video": Video,
} as const;

function AuditCard({
  entry,
  onPreview,
}: {
  entry: AuditEntry;
  onPreview: (index: number) => void;
}) {
  return (
    <article
      id={entry.id}
      className="card-surface flex flex-col overflow-hidden rounded-2xl border transition-shadow hover:shadow-brand"
    >
      <div className="border-b px-5 py-5 sm:px-6">
        <div className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-3">
          <div className="min-w-0">
            <h2 className="truncate text-lg font-semibold tracking-tight sm:text-xl">
              {entry.company}
            </h2>
            <p className="mt-0.5 truncate text-xs text-muted-foreground">
              {entry.industry}
            </p>
          </div>
          <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-secondary px-2.5 py-1 text-[11px] font-medium text-secondary-foreground">
            <Users className="size-3" />
            {entry.followersLabel}
          </span>
        </div>
        <p className="mt-3 text-sm font-medium leading-relaxed">{entry.verdict}</p>
      </div>

      <div className="flex-1 px-5 py-5 sm:px-6">
        <ul className="space-y-4">
          {entry.findings.map((finding) => {
            const Icon = areaIcon[finding.area];
            return (
              <li key={finding.area} className="flex gap-3">
                <span className="mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-lg bg-secondary text-muted-foreground">
                  <Icon className="size-3.5" />
                </span>
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-brand-gradient">
                    {finding.short}
                  </p>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                    {finding.detail}
                  </p>
                </div>
              </li>
            );
          })}
        </ul>
      </div>

      {entry.evidence.length > 0 && (
        <div className="border-t px-5 py-5 sm:px-6">
          <div className="grid grid-cols-2 gap-3">
            {entry.evidence.map((item, i) => (
              <button
                key={item.url}
                type="button"
                onClick={() => onPreview(i)}
                className="group relative overflow-hidden rounded-xl ring-1 ring-border transition hover:ring-2 hover:ring-brand-purple focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
                aria-label={`Preview: ${item.caption}`}
              >
                <img
                  src={item.url}
                  alt={item.caption}
                  loading="lazy"
                  className="aspect-[4/3] w-full object-cover object-top opacity-90 transition duration-300 group-hover:scale-105 group-hover:opacity-100"
                />
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="mt-auto border-t px-5 py-4 sm:px-6">
        <div className="flex flex-wrap items-center gap-2">
          {entry.website && (
            <a
              href={entry.website}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-lg bg-secondary px-3 py-1.5 text-xs font-medium text-secondary-foreground transition hover:bg-accent"
            >
              <Globe className="size-3.5" />
              Website
              <ExternalLink className="size-3 opacity-60" />
            </a>
          )}
          <a
            href={entry.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-lg bg-secondary px-3 py-1.5 text-xs font-medium text-secondary-foreground transition hover:bg-accent"
          >
            <Linkedin className="size-3.5" />
            LinkedIn
            <ExternalLink className="size-3 opacity-60" />
          </a>
        </div>
        <p className="mt-3 text-xs text-muted-foreground">
          Potential:{" "}
          <span className="font-medium text-foreground">
            {entry.potential.join(" · ")}
          </span>
        </p>
      </div>
    </article>
  );
}

function AuditPage() {
  const [filter, setFilter] = useState<string>("All");
  const [lightbox, setLightbox] = useState<{ entryId: string; index: number } | null>(
    null,
  );

  const filtered = useMemo(
    () =>
      filter === "All"
        ? auditEntries
        : auditEntries.filter((e) => e.services.includes(filter)),
    [filter],
  );

  const lightboxEntry = lightbox
    ? auditEntries.find((e) => e.id === lightbox.entryId)
    : undefined;

  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-40 border-b bg-background/85 backdrop-blur-md">
        <div className="mx-auto grid max-w-6xl grid-cols-[minmax(0,1fr)_auto] items-center gap-3 px-4 py-3 sm:px-6">
          <a href="/" className="flex min-w-0 items-center">
            <img
              src={gradientLogo.url}
              alt="Jokar Creations Pvt. Ltd."
              className="h-8 w-auto sm:h-9"
            />
          </a>
          <span className="shrink-0 text-[11px] font-medium text-muted-foreground sm:text-xs">
            September 2026
          </span>
        </div>
      </header>

      <section className="border-b">
        <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
          <h1 className="max-w-2xl text-2xl font-semibold leading-tight tracking-tight sm:text-4xl">
            Six clients. Where they stand today, and{" "}
            <span className="text-brand-gradient">what we can fix</span>.
          </h1>
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base">
            One card per company: the verdict first, the detail below, and the
            screenshots that prove it.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-4 pt-6 sm:px-6 sm:pt-8">
        <div className="flex flex-wrap gap-2">
          {["All", ...allServices].map((service) => (
            <button
              key={service}
              type="button"
              onClick={() => setFilter(service)}
              className={
                filter === service
                  ? "rounded-full bg-brand-gradient px-3.5 py-1.5 text-xs font-medium text-primary-foreground"
                  : "rounded-full px-3.5 py-1.5 text-xs font-medium text-muted-foreground ring-1 ring-border transition hover:bg-secondary hover:text-foreground"
              }
            >
              {service}
            </button>
          ))}
        </div>
      </div>

      <main className="mx-auto max-w-6xl px-4 py-6 sm:px-6 sm:py-10">
        <div className="grid gap-5 md:grid-cols-2">
          {filtered.map((entry) => (
            <AuditCard
              key={entry.id}
              entry={entry}
              onPreview={(index) => setLightbox({ entryId: entry.id, index })}
            />
          ))}
        </div>
      </main>

      <footer className="border-t">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-8 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <p className="text-xs text-muted-foreground">
            Prepared by Jokar Creations Pvt. Ltd.
          </p>
          <p className="text-xs text-muted-foreground">
            Follower counts recorded September 2026.
          </p>
        </div>
      </footer>

      <Lightbox
        items={lightboxEntry?.evidence ?? []}
        index={lightbox?.index ?? null}
        onIndexChange={(index) =>
          setLightbox(index === null ? null : { entryId: lightbox!.entryId, index })
        }
        title={lightboxEntry?.company}
      />
    </div>
  );
}
