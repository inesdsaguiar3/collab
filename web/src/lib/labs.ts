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

/** Upcoming themed labs (coliving cards + listings) */
export const UPCOMING_LABS: LabExperience[] = [UPCOMING_CREATORS_LAB];

export const PREVIOUS_LABS: PreviousLab[] = [
  { dates: "13 – 19 April 2026", title: "Mindful Living Lab" },
  { dates: "20 – 26 April 2026", title: "Social Impact & Embodied Change Lab" },
  { dates: "27 April – 3 May 2026", title: "Slowliving & Self-Care Lab" },
  { dates: "5 – 10 May 2026", title: "The Creators' Lab: On Writing & Creative Expression" },
  { dates: "11 – 18 May 2026", title: "The Nervous System Reset" },
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
  return UPCOMING_LABS.find((lab) => lab.id === id);
}
