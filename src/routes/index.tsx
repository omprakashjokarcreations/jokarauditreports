import { createFileRoute } from "@tanstack/react-router";
import {
  Briefcase,
  ExternalLink,
  FileSearch,
  Globe,
  ImagePlus,
  Linkedin,
  Sparkles,
  Users,
  Video,
  Wrench,
} from "lucide-react";
import { useMemo, useState } from "react";

import gradientLogo from "@/assets/gradient_logo.png.asset.json";
import blackLogo from "@/assets/black_logo.png.asset.json";
import { Lightbox } from "@/components/Lightbox";
import { allServices, auditEntries, type AuditEntry } from "@/data/audit";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Client Digital Presence Audit — Jokar Creations" },
      {
        name: "description",
        content:
          "Audit of websites and LinkedIn presence for six automotive and manufacturing clients, with services and opportunities identified by Jokar Creations.",
      },
      {
        property: "og:title",
        content: "Client Digital Presence Audit — Jokar Creations",
      },
      {
        property: "og:description",
        content:
          "Websites, LinkedIn activity and digital opportunities identified for six automotive and manufacturing clients.",
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
      className="flex flex-col overflow-hidden rounded-2xl border bg-card shadow-sm transition-shadow hover:shadow-brand"
    >
      {/* Card header */}
      <div className="border-b bg-brand-gradient-soft px-6 py-5">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <h2 className="text-xl font-semibold tracking-tight">{entry.company}</h2>
            <p className="mt-0.5 text-sm text-muted-foreground">{entry.industry}</p>
          </div>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-card px-3 py-1 text-xs font-medium text-muted-foreground ring-1 ring-border">
            <Users className="size-3.5" />
            {entry.followersLabel} followers
          </span>
        </div>
        <div className="mt-3 flex flex-wrap gap-1.5">
          {entry.services.map((service) => (
            <span
              key={service}
              className="rounded-full bg-brand-gradient px-2.5 py-0.5 text-[11px] font-medium text-primary-foreground"
            >
              {service}
            </span>
          ))}
        </div>
      </div>

      {/* Findings */}
      <div className="flex-1 px-6 py-5">
        <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Opportunities identified
        </h3>
        <ul className="mt-3 space-y-3">
          {entry.findings.map((finding) => {
            const Icon = areaIcon[finding.area];
            return (
              <li key={finding.area} className="flex gap-3">
                <span className="mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-lg bg-secondary text-secondary-foreground">
                  <Icon className="size-3.5" />
                </span>
                <div>
                  <p className="text-sm font-semibold">{finding.area}</p>
                  <p className="mt-0.5 text-sm leading-relaxed text-muted-foreground">
                    {finding.detail}
                  </p>
                </div>
              </li>
            );
          })}
        </ul>
      </div>

      {/* Evidence */}
      <div className="border-t px-6 py-5">
        <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Evidence
        </h3>
        <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-3">
          {entry.evidence.map((item, i) => (
            <button
              key={item.url}
              type="button"
              onClick={() => onPreview(i)}
              className="group relative overflow-hidden rounded-xl ring-1 ring-border transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring hover:ring-2 hover:ring-brand-purple"
              aria-label={`Preview: ${item.caption}`}
            >
              <img
                src={item.url}
                alt={item.caption}
                loading="lazy"
                className="aspect-[4/3] w-full object-cover object-top transition duration-300 group-hover:scale-105"
              />
              <span className="absolute inset-x-0 bottom-0 bg-foreground/70 px-2 py-1 text-left text-[11px] leading-tight text-primary-foreground opacity-0 transition group-hover:opacity-100">
                {item.caption}
              </span>
            </button>
          ))}
          {entry.evidence.length === 0 && (
            <div className="col-span-full flex items-center gap-3 rounded-xl border border-dashed px-4 py-5 text-sm text-muted-foreground">
              <ImagePlus className="size-4 shrink-0" />
              Screenshot evidence will be added soon.
            </div>
          )}
        </div>
      </div>

      {/* Links */}
      <div className="mt-auto flex flex-wrap gap-2 border-t px-6 py-4">
        {entry.website && (
          <a
            href={entry.website}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-lg bg-secondary px-3 py-1.5 text-xs font-medium text-secondary-foreground transition hover:bg-accent"
          >
            <Globe className="size-3.5" />
            Website
            {entry.websiteNote && (
              <span className="text-[10px] text-muted-foreground">({entry.websiteNote})</span>
            )}
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

  const stats = useMemo(() => {
    const totalFollowers = auditEntries.reduce((sum, e) => sum + e.followers, 0);
    return {
      companies: auditEntries.length,
      services: allServices.length,
      followers: totalFollowers.toLocaleString(),
    };
  }, []);

  const lightboxEntry = lightbox
    ? auditEntries.find((e) => e.id === lightbox.entryId)
    : undefined;

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b bg-background/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
          <a href="/" className="flex items-center">
            <img
              src={gradientLogo.url}
              alt="Jokar Creations Pvt. Ltd."
              className="h-9 w-auto"
            />
          </a>
          <span className="hidden items-center gap-1.5 rounded-full bg-secondary px-3 py-1 text-xs font-medium text-secondary-foreground sm:inline-flex">
            <FileSearch className="size-3.5" />
            Client Audit — September 2026
          </span>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden border-b bg-brand-gradient-soft">
        <div className="pointer-events-none absolute -top-24 -right-24 size-72 rounded-full bg-brand-pink/20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 -left-24 size-72 rounded-full bg-brand-purple/20 blur-3xl" />
        <div className="relative mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-20">
          <p className="animate-fade-up inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            <Sparkles className="size-3.5 text-brand-magenta" />
            Digital presence audit
          </p>
          <h1
            className="animate-fade-up mt-3 max-w-3xl text-4xl font-bold tracking-tight sm:text-5xl"
            style={{ animationDelay: "80ms" }}
          >
            Where our clients stand — and{" "}
            <span className="text-brand-gradient">where we can take them</span>
          </h1>
          <p
            className="animate-fade-up mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground"
            style={{ animationDelay: "160ms" }}
          >
            A review of six companies across their websites, LinkedIn activity and
            corporate content — with the services we can offer and the evidence behind
            every finding.
          </p>
          <div
            className="animate-fade-up mt-8 flex flex-wrap gap-6"
            style={{ animationDelay: "240ms" }}
          >
            {[
              { label: "Companies audited", value: String(stats.companies) },
              { label: "Services offered", value: String(stats.services) },
              { label: "Combined followers", value: stats.followers },
            ].map((stat) => (
              <div key={stat.label}>
                <p className="text-2xl font-bold text-brand-gradient">{stat.value}</p>
                <p className="text-xs text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Filter bar */}
      <div className="mx-auto max-w-6xl px-4 pt-8 sm:px-6">
        <div className="flex flex-wrap items-center gap-2">
          <span className="mr-1 inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
            <Wrench className="size-3.5" />
            Filter by service
          </span>
          {["All", ...allServices].map((service) => (
            <button
              key={service}
              type="button"
              onClick={() => setFilter(service)}
              className={
                filter === service
                  ? "rounded-full bg-brand-gradient px-3.5 py-1.5 text-xs font-medium text-primary-foreground shadow-sm"
                  : "rounded-full bg-card px-3.5 py-1.5 text-xs font-medium text-foreground ring-1 ring-border transition hover:bg-accent"
              }
            >
              {service}
            </button>
          ))}
        </div>
      </div>

      {/* Company grid */}
      <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-10">
        <div className="grid gap-6 lg:grid-cols-2">
          {filtered.map((entry) => (
            <AuditCard
              key={entry.id}
              entry={entry}
              onPreview={(index) => setLightbox({ entryId: entry.id, index })}
            />
          ))}
        </div>

        {/* Note */}
        <div className="mt-10 flex items-start gap-3 rounded-2xl border border-dashed bg-card px-5 py-4">
          <Briefcase className="mt-0.5 size-4 shrink-0 text-muted-foreground" />
          <p className="text-sm leading-relaxed text-muted-foreground">
            Follower counts and activity observations were recorded in September 2026.
            Remaining screenshot evidence is being collected and will be added to each
            company's record.
          </p>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t bg-card">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 px-4 py-8 sm:flex-row sm:justify-between sm:px-6">
          <img
            src={blackLogo.url}
            alt="Jokar Creations Pvt. Ltd."
            className="h-8 w-auto"
          />
          <p className="text-xs text-muted-foreground">
            Prepared by Jokar Creations Pvt. Ltd. · Client Digital Presence Audit · 2026
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
