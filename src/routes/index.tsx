import { createFileRoute } from "@tanstack/react-router";
import {
  Download,
  ExternalLink,
  Globe,
  Linkedin,
  Maximize2,
  Table2,
  Users,
  Video,
} from "lucide-react";
import { useMemo, useState } from "react";

import whiteLogo from "@/assets/white_logo.png.asset.json";
import { Lightbox } from "@/components/Lightbox";
import {
  allServices,
  auditEntries,
  researchSheetUrl,
  type AuditEntry,
} from "@/data/audit";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Shortlisted Clients & Pitch Potential — Jokar Creations" },
      {
        name: "description",
        content:
          "Six shortlisted automotive and manufacturing companies, what each one is missing online, and the exact services Jokar Creations can pitch to them.",
      },
      {
        property: "og:title",
        content: "Shortlisted Clients & Pitch Potential — Jokar Creations",
      },
      {
        property: "og:description",
        content:
          "Website, LinkedIn and corporate video gaps across six shortlisted companies, with the pitch for each.",
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
  isPrintTarget,
  onPreview,
  onDownload,
}: {
  entry: AuditEntry;
  isPrintTarget: boolean;
  onPreview: (index: number) => void;
  onDownload: () => void;
}) {
  return (
    <article
      id={entry.id}
      data-card="true"
      data-print={isPrintTarget ? "true" : undefined}
      className="card-surface print-page flex break-inside-avoid flex-col overflow-hidden rounded-2xl border transition-shadow hover:shadow-brand"
    >
      {/* Banner */}
      <div className="bg-brand-gradient-soft relative border-b px-5 py-5 sm:px-6">
        <div className="flex items-start justify-between gap-4">
          <div className="flex min-w-0 items-center gap-3">
            <span className="flex size-14 shrink-0 items-center justify-center rounded-xl bg-white p-2 shadow-lg">
              <img
                src={entry.logo}
                alt={`${entry.company} logo`}
                className="max-h-full max-w-full object-contain"
              />
            </span>
            <div className="min-w-0">
              <h2 className="truncate text-lg font-semibold tracking-tight sm:text-xl">
                {entry.company}
              </h2>
              <p className="mt-0.5 line-clamp-2 text-xs text-muted-foreground">
                {entry.industry}
              </p>
            </div>
          </div>
          <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-background/60 px-2.5 py-1 text-[11px] font-medium text-muted-foreground">
            <Users className="size-3" />
            {entry.followersLabel}
          </span>
        </div>

        {/* Pitch first */}
        <p className="mt-4 text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
          What we pitch
        </p>
        <div className="mt-2 flex flex-wrap gap-2">
          {entry.potential.map((item) => (
            <span
              key={item}
              className="rounded-full bg-brand-gradient px-3 py-1 text-[11px] font-semibold text-primary-foreground"
            >
              {item}
            </span>
          ))}
        </div>
      </div>

      <div className="border-b px-5 py-4 sm:px-6">
        <p className="text-sm font-medium leading-relaxed">{entry.verdict}</p>
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
                <span className="no-print pointer-events-none absolute inset-x-0 bottom-0 flex items-center justify-center gap-1.5 bg-gradient-to-t from-black/85 to-transparent pb-2 pt-6 text-[11px] font-semibold text-white">
                  <Maximize2 className="size-3" />
                  Click here to view
                </span>
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="mt-auto border-t px-5 py-4 sm:px-6">
        <div className="flex flex-wrap items-center gap-2">
          {entry.website ? (
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
          ) : (
            <span className="inline-flex items-center gap-1.5 rounded-lg bg-secondary px-3 py-1.5 text-xs font-medium text-muted-foreground">
              <Globe className="size-3.5" />
              No website
            </span>
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
          <button
            type="button"
            onClick={onDownload}
            className="no-print ml-auto inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium text-muted-foreground ring-1 ring-border transition hover:bg-secondary hover:text-foreground"
          >
            <Download className="size-3.5" />
            Download page
          </button>
        </div>
      </div>
    </article>
  );
}

function AuditPage() {
  const [filter, setFilter] = useState<string>("All");
  const [printTarget, setPrintTarget] = useState<string | null>(null);
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

  const print = (id: string | null) => {
    if (id === null) setFilter("All");
    setPrintTarget(id);
    requestAnimationFrame(() => {
      window.requestAnimationFrame(() => {
        window.print();
        setPrintTarget(null);
      });
    });
  };

  return (
    <div className={printTarget ? "min-h-screen print-single" : "min-h-screen"}>
      <header className="no-print sticky top-0 z-40 border-b bg-background/85 backdrop-blur-md">
        <div className="mx-auto grid max-w-6xl grid-cols-[minmax(0,1fr)_auto] items-center gap-3 px-4 py-3 sm:px-6">
          <a href="/" className="flex min-w-0 items-center">
            <img
              src={whiteLogo.url}
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
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
            Client shortlist · Business development
          </p>
          <h1 className="mt-3 max-w-3xl text-2xl font-semibold leading-tight tracking-tight sm:text-4xl">
            These are the clients I have shortlisted — and{" "}
            <span className="text-brand-gradient">what we can pitch them</span>.
          </h1>
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base">
            Six companies, one card each: the pitch first, then the gaps I found on
            their website and LinkedIn, with screenshots as proof.
          </p>
          <div className="no-print mt-6 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => print(null)}
              className="inline-flex items-center gap-2 rounded-lg bg-brand-gradient px-4 py-2 text-xs font-semibold text-primary-foreground sm:text-sm"
            >
              <Download className="size-4" />
              Download full report
            </button>
            <a
              href={researchSheetUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg px-4 py-2 text-xs font-semibold text-muted-foreground ring-1 ring-border transition hover:bg-secondary hover:text-foreground sm:text-sm"
            >
              <Table2 className="size-4" />
              Full research sheet
              <ExternalLink className="size-3 opacity-60" />
            </a>
          </div>
        </div>
      </section>

      <div className="no-print mx-auto max-w-6xl px-4 pt-6 sm:px-6 sm:pt-8">
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
              isPrintTarget={printTarget === entry.id}
              onPreview={(index) => setLightbox({ entryId: entry.id, index })}
              onDownload={() => print(entry.id)}
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
