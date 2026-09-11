import arvLinkedin from "@/assets/arv-linkedin.png.asset.json";
import igarashiWebsite from "@/assets/igarashi-website.png.asset.json";
import igarashiLinkedin from "@/assets/igarashi-linkedin.png.asset.json";
import neccoWebsite from "@/assets/necco-website.png.asset.json";
import neccoLinkedin from "@/assets/necco-linkedin.png.asset.json";
import sundaramWebsite from "@/assets/sundaram-website.png.asset.json";
import sundaramLinkedin from "@/assets/sundaram-linkedin.png.asset.json";
import raneLinkedin from "@/assets/rane-linkedin.png.asset.json";
import sancraftLinkedin from "@/assets/sancraft-linkedin.png.asset.json";

import arvLogo from "@/assets/arv-logo.png.asset.json";
import neccoLogo from "@/assets/necco-logo.png.asset.json";
import tvsLogo from "@/assets/tvs-logo.png.asset.json";
import igarashiLogo from "@/assets/igarashi-logo.png.asset.json";
import sancraftLogo from "@/assets/sancraft-logo.png.asset.json";
import raneLogo from "@/assets/rane-logo.png.asset.json";

export type Evidence = {
  url: string;
  caption: string;
};

export type Finding = {
  /** Service area this finding belongs to */
  area: "Website" | "LinkedIn" | "Corporate Video";
  /** Short scannable verdict — a few words only */
  short: string;
  detail: string;
};

export type AuditEntry = {
  id: string;
  company: string;
  industry: string;
  logo: string;
  services: string[];
  findings: Finding[];
  website: string | null;
  websiteNote?: string;
  linkedin: string;
  followers: number;
  followersLabel: string;
  /** One-line verdict shown at the top of the card */
  verdict: string;
  /** What we can do for them */
  potential: string[];
  evidence: Evidence[];
};

export const auditEntries: AuditEntry[] = [
  {
    id: "arv-automotive",
    company: "ARV Automotive",
    industry: "Coolant pumps, oil pumps & fan drive support",
    logo: arvLogo.url,
    services: ["Website", "LinkedIn Management", "Corporate Video"],
    findings: [
      {
        area: "Website",
        short: "No website at all",
        detail:
          "They currently do not have a website. arvmotors.com is a different company — ARV Motors, a Faridabad electric-vehicle maker founded in 2024 — so it is not theirs.",
      },
      {
        area: "LinkedIn",
        short: "0 posts, 0 jobs",
        detail: "Their LinkedIn presence is not being utilized — 0 posts and 0 job postings.",
      },
      {
        area: "Corporate Video",
        short: "No corporate video",
        detail:
          "Opportunity to create a professional corporate profile showcasing their company, capabilities, infrastructure, and products.",
      },
    ],
    website: null,
    linkedin: "https://www.linkedin.com/company/arvauto-epl/?originalSubdomain=in",
    followers: 264,
    followersLabel: "264",
    verdict: "No website, dormant LinkedIn, no video.",
    potential: ["Website", "LinkedIn Management", "Corporate Video"],
    evidence: [
      {
        url: arvLinkedin.url,
        caption: "ARV Auto LinkedIn — no jobs posted, dormant company page",
      },
    ],
  },
  {
    id: "necco-tools",
    company: "Necco Tools",
    industry: "Precision machined components & tooling",
    logo: neccoLogo.url,
    services: ["Website Revamp", "LinkedIn Management", "Corporate Video"],
    findings: [
      {
        area: "Website",
        short: "Website content is just images",
        detail:
          "Much of the website content is presented as images rather than properly structured web content. This creates a strong opportunity for a website revamp with better content structure, readability, and user experience.",
      },
      {
        area: "Corporate Video",
        short: "No corporate video",
        detail:
          "No corporate video was identified publicly, creating an opportunity to showcase their company, products, and capabilities through video.",
      },
    ],
    website: "https://www.neccotools.com/",
    linkedin: "https://www.linkedin.com/company/necco-tools---india/?originalSubdomain=in",
    followers: 236,
    followersLabel: "236",
    verdict: "Image-based website, quiet LinkedIn, no video.",
    potential: ["Website Revamp", "LinkedIn Management", "Corporate Video"],
    evidence: [
      {
        url: neccoWebsite.url,
        caption: "Necco Tools — page content delivered as flat images",
      },
      {
        url: neccoLinkedin.url,
        caption: "Necco Tools LinkedIn — no posts yet on the company page",
      },
    ],
  },
  {
    id: "sundaram-fasteners",
    company: "Sundaram Fasteners",
    industry: "High-tensile fasteners & precision components (TVS Group)",
    logo: tvsLogo.url,
    services: ["Website Revamp", "LinkedIn Management"],
    findings: [
      {
        area: "Website",
        short: "Dated design",
        detail:
          "The current website has a basic and dated visual presentation, creating scope for a modern corporate website revamp.",
      },
      {
        area: "LinkedIn",
        short: "6,000 followers, silent 6 months",
        detail:
          "They have approximately 6,000 followers and were active around 6–8 months ago. Since they already have an established audience and previous activity, there is potential to restart and improve their LinkedIn presence.",
      },
    ],
    website: "https://www.sundram.com/index.php",
    linkedin: "https://www.linkedin.com/company/sundram-fasteners",
    followers: 6000,
    followersLabel: "6,000",
    verdict: "Big audience, dated site, posting stopped.",
    potential: ["Website Revamp", "LinkedIn Management"],
    evidence: [
      {
        url: sundaramWebsite.url,
        caption: "Sundram Fasteners website — dated visual presentation",
      },
      {
        url: sundaramLinkedin.url,
        caption: "Sundram Fasteners LinkedIn — last post around 6 months ago",
      },
    ],
  },
  {
    id: "igarashi-motors",
    company: "Igarashi Motors",
    industry: "Micro DC motors for automotive applications",
    logo: igarashiLogo.url,
    services: ["Website Revamp", "LinkedIn Management"],
    findings: [
      {
        area: "Website",
        short: "Outdated PHP site",
        detail:
          "Their current website is PHP-based and the design appears outdated, creating an opportunity for a modern website redesign.",
      },
      {
        area: "LinkedIn",
        short: "Inactive, old branding",
        detail:
          "Their LinkedIn presence is largely inactive. Basic brand assets such as the logo and banner are also not updated, indicating scope for improving their corporate presence.",
      },
    ],
    website: "https://www.igarashimotors.com/",
    linkedin: "https://www.linkedin.com/company/igarashi-india/?originalSubdomain=in",
    followers: 207,
    followersLabel: "207",
    verdict: "Old site, inactive page, outdated branding.",
    potential: ["Website Revamp", "LinkedIn Management"],
    evidence: [
      {
        url: igarashiWebsite.url,
        caption: "Igarashi Motors website — dated PHP-based layout",
      },
      {
        url: igarashiLinkedin.url,
        caption: "Igarashi India LinkedIn — placeholder logo and empty banner",
      },
    ],
  },
  {
    id: "sancraft",
    company: "Sancraft",
    industry: "Sheet metal & industrial fabrication",
    logo: sancraftLogo.url,
    services: ["LinkedIn Management"],
    findings: [
      {
        area: "LinkedIn",
        short: "Almost no activity",
        detail:
          "Their LinkedIn presence has little to no recent activity. This creates an opportunity to establish consistent corporate communication through company updates, product content, industry insights, and other professional content.",
      },
    ],
    website: "https://www.sancraftindustries.com/",
    linkedin: "https://www.linkedin.com/company/sancraft-industries-pvt-ltd/",
    followers: 497,
    followersLabel: "497",
    verdict: "Established page with almost nothing on it.",
    potential: ["LinkedIn Management"],
    evidence: [
      {
        url: sancraftLinkedin.url,
        caption: "Sancraft Industries LinkedIn — no posts yet on the page",
      },
    ],
  },
  {
    id: "rane-engine-valves",
    company: "Rane Engine Valves",
    industry: "Engine valves & valve train components",
    logo: raneLogo.url,
    services: ["LinkedIn Management"],
    findings: [
      {
        area: "LinkedIn",
        short: "Silent for 2 years",
        detail:
          "They were previously active on LinkedIn but appear to have stopped around 2 years ago. This creates an opportunity to understand the reason behind the inactivity and propose a strategy to restart their LinkedIn presence for visibility, credibility, and business development.",
      },
    ],
    website: "https://ranegroup.com/",
    linkedin:
      "https://www.linkedin.com/company/rane-engine-valve-limited-revl/?originalSubdomain=in",
    followers: 7000,
    followersLabel: "7,000",
    verdict: "7,000 followers and two years of silence.",
    potential: ["LinkedIn Management"],
    evidence: [
      {
        url: raneLinkedin.url,
        caption: "Rane Engine Valve LinkedIn — last post around 2 years ago",
      },
    ],
  },
];

export const researchSheetUrl =
  "https://docs.google.com/spreadsheets/d/1KTM0aIPLUNSuQ7K_FpKP5EghmK-Oko-jRpaFQ-DtFxo/edit?usp=sharing";

export const allServices = [
  "Website",
  "Website Revamp",
  "LinkedIn Management",
  "Corporate Video",
] as const;
