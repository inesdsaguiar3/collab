export type OfferingId = "retreats" | "co-living" | "community" | "contact";

export type QuestionId =
  | "format"
  | "style"
  | "duration"
  | "intention"
  | "timeline";

export interface PathOption {
  id: string;
  label: string;
  description: string;
  scores: Partial<Record<OfferingId, number>>;
}

export interface PathQuestion {
  id: QuestionId;
  prompt: string;
  options: PathOption[];
}

export type PathAnswers = Partial<Record<QuestionId, string>>;

export interface Recommendation {
  offering: OfferingId;
  title: string;
  description: string;
  href: string;
  cta: string;
  accent: string;
}

const OFFERING_PRIORITY: OfferingId[] = ["retreats", "co-living", "community", "contact"];

export const PATH_QUESTIONS: PathQuestion[] = [
  {
    id: "format",
    prompt: "How do you want to connect right now?",
    options: [
      {
        id: "in-person",
        label: "In person",
        description: "I want a real-world experience.",
        scores: { retreats: 3, "co-living": 3 },
      },
      {
        id: "online",
        label: "Online",
        description: "I prefer a digital-first path.",
        scores: { community: 4, contact: 1 },
      },
      {
        id: "both",
        label: "Both",
        description: "Open to online and in-person.",
        scores: { retreats: 2, "co-living": 2, community: 2 },
      },
    ],
  },
  {
    id: "style",
    prompt: "What feels most aligned?",
    options: [
      {
        id: "curated",
        label: "Curated experience",
        description: "Facilitated, intentional, transformational.",
        scores: { retreats: 5, community: 1 },
      },
      {
        id: "coliving",
        label: "Co-living rhythm",
        description: "Daily life, shared spaces, creative flow.",
        scores: { "co-living": 5, community: 1 },
      },
      {
        id: "not-sure",
        label: "Not sure yet",
        description: "I want guidance based on my needs.",
        scores: { contact: 4, retreats: 1, "co-living": 1 },
      },
    ],
  },
  {
    id: "duration",
    prompt: "How much time do you have?",
    options: [
      {
        id: "few-days",
        label: "A few days",
        description: "I can commit to a short immersion.",
        scores: { retreats: 4 },
      },
      {
        id: "few-weeks",
        label: "A few weeks",
        description: "I want to live in community for a while.",
        scores: { "co-living": 5, retreats: 1 },
      },
      {
        id: "ongoing",
        label: "Ongoing",
        description: "I want continuous support and connection.",
        scores: { community: 4, contact: 1 },
      },
    ],
  },
  {
    id: "intention",
    prompt: "What are you most looking for?",
    options: [
      {
        id: "healing",
        label: "Healing and inner clarity",
        description: "Reset my nervous system and reconnect.",
        scores: { retreats: 5 },
      },
      {
        id: "belonging",
        label: "Belonging and community",
        description: "Find people and meaningful connection.",
        scores: { community: 4, "co-living": 2 },
      },
      {
        id: "focus",
        label: "Focus and life rhythm",
        description: "Work, create, and live in balance.",
        scores: { "co-living": 4, retreats: 1 },
      },
      {
        id: "exploration",
        label: "Just exploring",
        description: "I want to discover what fits best.",
        scores: { contact: 3, retreats: 1, "co-living": 1, community: 1 },
      },
    ],
  },
  {
    id: "timeline",
    prompt: "When would you like to start?",
    options: [
      {
        id: "now",
        label: "Now",
        description: "I want to choose and move quickly.",
        scores: { retreats: 2, "co-living": 2, contact: 1 },
      },
      {
        id: "soon",
        label: "In 1-3 months",
        description: "I am planning the next chapter.",
        scores: { retreats: 2, "co-living": 2, community: 1 },
      },
      {
        id: "later",
        label: "Just exploring",
        description: "I am gathering options for now.",
        scores: { community: 2, contact: 2 },
      },
    ],
  },
];

const RECOMMENDATIONS: Record<OfferingId, Recommendation> = {
  retreats: {
    offering: "retreats",
    title: "Your next step: 1:1 Support",
    description: "A personalized 1:1 space to receive guidance, clarity, and tailored support for your current chapter.",
    href: "/community?topic=one-on-one-support",
    cta: "Explore 1:1 Support",
    accent: "#AE5F8F",
  },
  "co-living": {
    offering: "co-living",
    title: "Your next step: 1:1 Support",
    description: "A personalized 1:1 space to receive guidance, clarity, and tailored support for your current chapter.",
    href: "/community?topic=one-on-one-support",
    cta: "Explore 1:1 Support",
    accent: "#EB8064",
  },
  community: {
    offering: "community",
    title: "Your next step: Online Journeys",
    description: "Join Co-llab Online Journeys for guided group sessions, connection, and support from anywhere.",
    href: "/community?topic=online-sessions",
    cta: "Explore Online Journeys",
    accent: "#7F5AA1",
  },
  contact: {
    offering: "contact",
    title: "Your next step: 1:1 Support",
    description: "A personalized 1:1 space to receive guidance, clarity, and tailored support for your current chapter.",
    href: "/community?topic=one-on-one-support",
    cta: "Explore 1:1 Support",
    accent: "#D16678",
  },
};

export function resolveRecommendation(answers: PathAnswers): Recommendation {
  const totals: Record<OfferingId, number> = {
    retreats: 0,
    "co-living": 0,
    community: 0,
    contact: 0,
  };

  for (const question of PATH_QUESTIONS) {
    const answerId = answers[question.id];
    if (!answerId) continue;
    const picked = question.options.find((opt) => opt.id === answerId);
    if (!picked) continue;
    for (const offering of OFFERING_PRIORITY) {
      totals[offering] += picked.scores[offering] ?? 0;
    }
  }

  let winner: OfferingId = OFFERING_PRIORITY[0];
  for (const offering of OFFERING_PRIORITY) {
    if (totals[offering] > totals[winner]) winner = offering;
  }

  return RECOMMENDATIONS[winner];
}
