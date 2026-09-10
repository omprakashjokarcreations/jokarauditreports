import arvLinkedin from "@/assets/arv-linkedin.png.asset.json";
import igarashiWebsite from "@/assets/igarashi-website.png.asset.json";
import igarashiLinkedin from "@/assets/igarashi-linkedin.png.asset.json";
import neccoWebsite from "@/assets/necco-website.png.asset.json";

export type Evidence = {
  url: string;
  caption: string;
};

export type Finding = {
  /** Service area this finding belongs to */
  area: "Website" | "LinkedIn" | "Corporate Video";
  detail: string;
};

export type AuditEntry = {
  id: string;
  company: string;
  industry: string;
  services: string[];
  findings: Finding[];
  website: string | null;
  websiteNote?: string;
  linkedin: string;
  followers: number;
  followersLabel: string;
  evidence: Evidence[];
};

export const auditEntries: AuditEntry[] = [
  {
    id: "arv-automotive",
    company: "ARV Automotive",
    industry: "Coolant pumps, oil pumps & fan drive support",
    services: ["Website", "LinkedIn Management", "Corporate Video"],
    findings: [
      { area: "Website", detail: "They currently do not have a website." },
      {
        area: "LinkedIn",
        detail:
          "Their LinkedIn presence is not being utilized — 0 posts and 0 job postings.",
      },
      {
        area: "Corporate Video",
        detail:
          "Opportunity to create a professional corporate profile showcasing their company, capabilities, infrastructure, and products.",
      },
    ],
    website: "https://arvmotors.com/",
    websiteNote: "To be verified",
    linkedin: "https://www.linkedin.com/company/arvauto-epl/?originalSubdomain=in",
    followers: 264,
    followersLabel: "264",
    evidence: [
      {
        url: arvLinkedin.url,
        caption: "ARV Auto LinkedIn — no jobs posted, dormant company page",
      },
    ],
  },
  {
    id: "igarashi-motors",
    company: "Igarashi Motors",
    industry: "Micro DC motors for automotive applications",
    services: ["Website Revamp", "LinkedIn Management"],
    findings: [
      {
        area: "Website",
        detail:
          "Their current website is PHP-based and the design appears outdated, creating an opportunity for a modern website redesign.",
      },
      {
        area: "LinkedIn",
        detail:
          "Their LinkedIn presence is largely inactive. Basic brand assets such as the logo and banner are also not updated, indicating scope for improving their corporate presence.",
      },
    ],
    website: "https://www.igarashimotors.com/",
    linkedin: "https://www.linkedin.com/company/igarashi-india/?originalSubdomain=in",
    followers: 207,
    followersLabel: "207",
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
    id: "necco-tools",
    company: "Necco Tools",
    industry: "Precision machined components & tooling",
    services: ["Website Revamp", "LinkedIn Management", "Corporate Video"],
    findings: [
      {
        area: "Website",
        detail:
          "Much of the website content is presented as images rather than properly structured web content. This creates a strong opportunity for a website revamp with better content structure, readability, and user experience.",
      },
      {
        area: "Corporate Video",
        detail:
          "No corporate video was identified publicly, creating an opportunity to showcase their company, products, and capabilities through video.",
      },
    ],
    website: "https://www.neccotools.com/",
    linkedin: "https://www.linkedin.com/company/necco-tools---india/?originalSubdomain=in",
    followers: 236,
    followersLabel: "236",
    evidence: [
      {
        url: neccoWebsite.url,
        caption: "Necco Tools — page content delivered as flat images",
      },
    ],
  },
  {
    id: "sundaram-fasteners",
    company: "Sundaram Fasteners",
    industry: "High-tensile fasteners & precision components",
    services: ["Website Revamp", "LinkedIn Management"],
    findings: [
      {
        area: "Website",
        detail:
          "The current website has a basic and dated visual presentation, creating scope for a modern corporate website revamp.",
      },
      {
        area: "LinkedIn",
        detail:
          "They have approximately 6,000 followers and were active around 6–8 months ago. Since they already have an established audience and previous activity, there is potential to restart and improve their LinkedIn presence.",
      },
    ],
    website: "https://www.sundram.com/index.php",
    linkedin: "https://www.linkedin.com/company/sundram-fasteners",
    followers: 6000,
    followersLabel: "6,000",
    evidence: [],
  },
  {
    id: "rane-engine-valves",
    company: "Rane Engine Valves",
    industry: "Engine valves & valve train components",
    services: ["LinkedIn Management"],
    findings: [
      {
        area: "LinkedIn",
        detail:
          "They were previously active on LinkedIn but appear to have stopped around 2 years ago. This creates an opportunity to understand the reason behind the inactivity and propose a strategy to restart their LinkedIn presence for visibility, credibility, and business development.",
      },
    ],
    website: "https://ranegroup.com/",
    linkedin:
      "https://www.linkedin.com/company/rane-engine-valve-limited-revl/?originalSubdomain=in",
    followers: 7000,
    followersLabel: "7,000",
    evidence: [],
  },
  {
    id: "sancraft",
    company: "Sancraft",
    industry: "Sheet metal & industrial fabrication",
    services: ["LinkedIn Management"],
    findings: [
      {
        area: "LinkedIn",
        detail:
          "Their LinkedIn presence has little to no recent activity. This creates an opportunity to establish consistent corporate communication through company updates, product content, industry insights, and other professional content.",
      },
    ],
    website: "https://www.sancraftindustries.com/",
    linkedin: "https://www.linkedin.com/company/sancraft-industries-pvt-ltd/",
    followers: 497,
    followersLabel: "497",
    evidence: [],
  },
];

export const allServices = [
  "Website",
  "Website Revamp",
  "LinkedIn Management",
  "Corporate Video",
] as const;
