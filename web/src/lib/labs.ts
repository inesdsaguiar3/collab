export type LabExperience = {
  id: string;
  title: string;
  subtitle: string;
  startDate: string;
  endDate: string;
  location: string;
  description: string;
  tags: string[];
  accent: string;
  image: string;
  href: string;
  includes: string[];
  priceLabel: string;
  spotsLabel: string;
};

export type PreviousLab = {
  dates: string;
  title: string;
};

export type PastExperience = {
  id: string;
  title: string;
  dates: string;
  location: string;
  kind: "Lab" | "Retreat";
  image: string;
  href?: string;
  subtitle?: string;
};

export const UPCOMING_CREATORS_LAB: LabExperience = {
  id: "creators-lab-oct-2026",
  title: "The Creators' Lab",
  subtitle: "Healing Arts Residency",
  startDate: "2026-10-05",
  endDate: "2026-11-05",
  location: "Casa do Sol, Óbidos",
  description:
    "A healing arts residency inside the autumn coliving chapter — space, structure, and community for creative and embodied practice.",
  tags: [
    "Writing",
    "Creativity",
    "Expression",
    "Art",
    "Breathwork",
    "Yoga",
    "Drama",
    "Circling",
    "Somatics",
    "Music",
    "Dance",
  ],
  accent: "#D16678",
  image: "/images/creators/writer.JPG",
  href: "/coliving#upcoming-lab",
  includes: [
    "Daily creative rhythm inside coliving",
    "Writing prompts and shared studio time",
    "Community meals and evening practice",
    "Nature, focus, and slow-living flow",
    "Book through the coliving stay",
  ],
  priceLabel: "",
  spotsLabel: "limited spots",
};

export const UPCOMING_FLOW_LIVING_LAB: LabExperience = {
  id: "flow-living-lab",
  title: "Flow Living Lab",
  subtitle: "A week to remember how you want to live",
  startDate: "2026-09-07",
  endDate: "2026-09-14",
  location: "Casa do Sol, Óbidos",
  description:
    "Enter a flow-living week with co-working dedicated slots, play, growth, slow living and movement. Build, play & relate with intention.",
  tags: ["Co-working", "Slow living", "Movement", "Community"],
  accent: "#EB8064",
  image: "/images/IMG_2692.jpg",
  href: "/retreats/flow-living-lab",
  includes: [
    "Deep focus co-working sessions",
    "Creative collaboration & mastermind circles",
    "Embodied movement & shared cooking",
    "Authentic relating & celebration",
    "Book through the coliving stay",
  ],
  priceLabel: "",
  spotsLabel: "limited spots",
};

export const EMBODIED_VISION_LAB: LabExperience = {
  id: "embodied-vision-lab",
  title: "Embodied Vision Lab",
  subtitle: "Business immersion for wellness practitioners",
  startDate: "2027-05-05",
  endDate: "2027-05-09",
  location: "Casa do Sol, Óbidos",
  description:
    "Five days together, then three months of guided implementation — refine your offer, strengthen your online presence, and create a clearer path to clients.",
  tags: ["Business", "Embodiment", "Mentorship", "Wellness"],
  accent: "#EB8064",
  image: "/images/vision-lab/mvmt1.png",
  href: "/embodied-vision-lab#hero",
  includes: [
    "Five-day in-person immersion",
    "Accommodation and meals during the immersion",
    "Three-month mentorship with six online calls",
    "Offer clarity, messaging & presence",
    "Application-based programme",
  ],
  priceLabel: "€1,800 shared",
  spotsLabel: "up to 12 participants",
};

/** Upcoming themed labs (homepage + retreats listings) */
export const UPCOMING_LABS: LabExperience[] = [EMBODIED_VISION_LAB];

/** Compact list used by coliving / archives */
export const PREVIOUS_LABS: PreviousLab[] = [
  { dates: "5 Oct – 5 Nov 2026", title: "The Creators' Lab" },
  { dates: "14 – 18 Oct 2026", title: "Breathwork Lab · Inner Peace" },
  { dates: "7 – 14 Sep 2026", title: "Flow Living Lab" },
  { dates: "11 – 18 May 2026", title: "The Nervous System Reset" },
  { dates: "5 – 10 May 2026", title: "The Creators' Lab: On Writing & Creative Expression" },
  { dates: "27 April – 3 May 2026", title: "Slowliving & Self-Care Lab" },
  { dates: "20 – 26 April 2026", title: "Social Impact & Embodied Change Lab" },
  { dates: "13 – 19 April 2026", title: "Mindful Living Lab" },
];

/** Past experiences for retreats page (most recent first) */
export const PAST_EXPERIENCES: PastExperience[] = [
  {
    id: "creators-lab-oct-2026",
    title: "The Creators' Lab",
    subtitle: "Healing Arts Residency",
    dates: "5 Oct – 5 Nov 2026",
    location: "Casa do Sol, Óbidos",
    kind: "Lab",
    image: "/images/creators/writer.JPG",
    href: "/creators-club",
  },
  {
    id: "inner-peace-portugal",
    title: "Breathwork Lab",
    subtitle: "A Somatic Journey into Inner Peace",
    dates: "14 – 18 Oct 2026",
    location: "Óbidos, Portugal",
    kind: "Lab",
    image: "/images/retreats/innerpeace.jpg",
    href: "/retreats/inner-peace-portugal",
  },
  {
    id: "flow-living-lab",
    title: "Flow Living Lab",
    subtitle: "A week to remember how you want to live",
    dates: "7 – 14 Sep 2026",
    location: "Casa do Sol, Óbidos",
    kind: "Lab",
    image: "/images/IMG_2692.jpg",
    href: "/retreats/flow-living-lab",
  },
  {
    id: "nervous-system-reset",
    title: "The Nervous System Reset",
    dates: "11 – 18 May 2026",
    location: "Casa do Sol, Óbidos",
    kind: "Lab",
    image: "/images/retreats/DSC_4621.JPG",
  },
  {
    id: "creators-lab-may-2026",
    title: "The Creators' Lab",
    subtitle: "On Writing & Creative Expression",
    dates: "5 – 10 May 2026",
    location: "Casa do Sol, Óbidos",
    kind: "Lab",
    image: "/images/creators/writer.JPG",
    href: "/creators-club",
  },
  {
    id: "slowliving-self-care",
    title: "Slowliving & Self-Care Lab",
    dates: "27 April – 3 May 2026",
    location: "Casa do Sol, Óbidos",
    kind: "Lab",
    image: "/images/casa.jpg",
  },
  {
    id: "social-impact",
    title: "Social Impact & Embodied Change Lab",
    dates: "20 – 26 April 2026",
    location: "Casa do Sol, Óbidos",
    kind: "Lab",
    image: "/images/INES-105.jpg",
  },
  {
    id: "mindful-living",
    title: "Mindful Living Lab",
    dates: "13 – 19 April 2026",
    location: "Casa do Sol, Óbidos",
    kind: "Lab",
    image: "/images/retreats/DSC_4328.JPG",
  },
];

export const COLIVING_CHAPTERS = {
  upcoming: {
    label: "Autumn chapter",
    dates: "5 October – 5 November 2026",
    location: "Casa do Sol, Óbidos",
  },
  previous: {
    label: "Spring chapter",
    dates: "1 April – 20 May 2026",
    location: "Casa do Sol, Óbidos",
  },
} as const;

export type UpcomingImmersion = {
  id: string;
  label: string;
  when: string;
  location: string;
};

/** Open interest list for the next coliving chapters */
export const UPCOMING_IMMERSIONS: UpcomingImmersion[] = [
  {
    id: "may-2027",
    label: "May coliving",
    when: "May 2027",
    location: "Óbidos, Portugal",
  },
  {
    id: "october-2027",
    label: "October coliving",
    when: "October 2027",
    location: "Óbidos, Portugal",
  },
];

export function formatLabDateRange(startDate: string, endDate: string): string {
  const start = new Date(`${startDate}T00:00:00`);
  const end = new Date(`${endDate}T00:00:00`);
  const months = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
  ];

  const sameMonth =
    start.getMonth() === end.getMonth() && start.getFullYear() === end.getFullYear();

  if (sameMonth) {
    return `${start.getDate()} – ${end.getDate()} ${months[start.getMonth()]} ${start.getFullYear()}`;
  }

  return `${start.getDate()} ${months[start.getMonth()]} – ${end.getDate()} ${months[end.getMonth()]} ${end.getFullYear()}`;
}

export function getLabById(id: string): LabExperience | undefined {
  return (
    UPCOMING_LABS.find((lab) => lab.id === id) ??
    [UPCOMING_CREATORS_LAB, UPCOMING_FLOW_LIVING_LAB, EMBODIED_VISION_LAB].find(
      (lab) => lab.id === id,
    )
  );
}

/** True if the experience end date is still in the future (local calendar day). */
export function isUpcomingByEndDate(endDate: string, today = new Date()): boolean {
  const end = new Date(`${endDate}T23:59:59`);
  return end.getTime() >= today.getTime();
}
