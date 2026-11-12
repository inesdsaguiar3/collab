/**
 * Central content for Embodied Vision Lab.
 * Fill facilitator fields when ready — empty profiles are hidden on the public page.
 */

export type Facilitator = {
  name: string;
  role: string;
  bio: string;
  imageUrl: string;
};

export const embodiedVisionLab = {
  name: "Embodied Vision Lab",
  tagline: "Expand the business that brings your vision to life.",
  description:
    "A business immersion and mentorship for wellness practitioners. Five days together in person, followed by three months of guided implementation to refine your offer, strengthen your online presence and create a clearer path to clients.",
  detailsLine:
    "5–9 May 2027 · Five-day immersion + three-month mentorship · Up to 12 participants",
  immersion: {
    startLabel: "5–9 May 2027",
    startDate: "2027-05-05",
    endDate: "2027-05-09",
    nights: "Four nights",
    groupSize: "An intimate group of up to 12 participants",
    location: "Casa do Sol, Óbidos",
  },
  continuation: {
    duration: "Three months of guided implementation",
    calls: "Six facilitated online calls",
  },
  optionalColiving: {
    summary:
      "Optional co-living after the immersion, booked separately.",
  },
  pricing: {
    shared: "€1,800",
    private: "€2,100",
    includes:
      "Includes accommodation and meals for the 5 days, and 6 online mentoring sessions.",
  },
  pricingNote:
    "€1,800 shared · €2,100 private. Includes accommodation and meals for the 5 days, and 6 online mentoring sessions.",
  seo: {
    title: "Embodied Vision Lab | Business Immersion for Wellness Practitioners",
    description:
      "A five-day business immersion and three-month mentorship for wellness practitioners — refine your offer, strengthen your online presence, and create a clearer path to clients. 5–9 May 2027.",
    keywords: [
      "business immersion wellness practitioners",
      "mentorship for coaches facilitators",
      "wellness business programme",
      "embodied vision lab",
      "offer clarity wellness",
    ],
  },
  recognition: [
    {
      title: "Skills you trust, words that still feel hard",
      body: "You have valuable skills, but explaining your offer still feels difficult — especially in a way that feels true to how you work.",
    },
    {
      title: "An online presence that underplays your work",
      body: "Your website or Instagram does not fully reflect the quality of what people experience with you in person.",
    },
    {
      title: "Ideas waiting for structure",
      body: "You have ideas, but need structure and support to implement them without losing the thread of your week.",
    },
    {
      title: "Growth without a false persona",
      body: "You want to grow without adopting a business persona that does not feel like you.",
    },
  ],
  phases: [
    {
      title: "Five days together",
      body: "Space to clarify your direction, refine your offer, work on your business and explore how you show up through embodiment and reflection. Accommodation and meals are included, alongside business workshops and embodied practices.",
    },
    {
      title: "Three months of implementation",
      body: "Six facilitated online calls, practical milestones and feedback to help you apply what you developed during the immersion — at a pace that fits real life.",
    },
  ],
  workAreas: [
    {
      title: "Direction and positioning",
      body: "Clarify who you serve and how your work sits in the wider landscape — with support, not pressure to sound like everyone else.",
    },
    {
      title: "A clear, well-defined offer",
      body: "Shape an offer people can understand and say yes to, rooted in the work you already know how to hold.",
    },
    {
      title: "Messaging and online presence",
      body: "Bring your website and social presence closer to the quality of your real sessions and conversations.",
    },
    {
      title: "Content and visibility",
      body: "Build sustainable ways to stay visible — without performing a version of yourself that drains you.",
    },
    {
      title: "Personalised AI workflows",
      body: "Use AI as practical support for planning, writing and implementation that still sounds like you. It does not replace your expertise or run your business for you.",
    },
    {
      title: "From discovery to enquiry",
      body: "Map a manageable path from someone finding your work to getting in touch or becoming a client. Not everyone needs a complex funnel — the aim is a system suited to your stage.",
    },
  ],
  nameMeaning: [
    {
      word: "Embodied",
      body: "Supporting how you show up, express yourself and make decisions — in the room and in your business.",
    },
    {
      word: "Vision",
      body: "Clarifying the business you want to grow and how it fits the life you actually want to live.",
    },
    {
      word: "Lab",
      body: "Working on real ideas, testing them, receiving feedback and refining them together.",
    },
  ],
  whoFor: [
    "Already have a skill, service or practice to build on.",
    "Are ready to take practical steps toward growing your business.",
    "Value both business guidance and embodied exploration.",
    "Can attend the immersion and make time for implementation afterward.",
  ],
  facilitators: [
    {
      name: "Inês",
      role: "Somatics, Breathwork & Creativity",
      bio: "Inês is a Breathwork, Somatics and Meditation facilitator and the founder of Co-llab. Her passion is creating spaces for expansion by nurturing awareness, connection and a more intentional rhythm of living and working together.",
      imageUrl: "/images/ines-portrait.jpg",
    },
    {
      name: "Zoë",
      role: "Business coaching",
      bio: "Zoë is a business coach and the founder of Zowhy Coaching. She supports coaches, healers and guides to clarify their offer, content and visibility — the same work she holds in SPIRA, her programme for growing a practice from a regulated, embodied place.",
      imageUrl: "/images/zoe-portrait.jpg",
    },
  ] as Facilitator[],
  faqs: [
    {
      q: "When is the immersion?",
      a: "5–9 May 2027.",
    },
    {
      q: "Where is it?",
      a: "Casa do Sol, Óbidos, Portugal — about one hour from Lisbon.",
    },
    {
      q: "What is included?",
      a: "Accommodation and meals for the 5 days, facilitated sessions during the immersion, and 6 online mentoring sessions over the three months that follow.",
    },
    {
      q: "Do I need an established business?",
      a: "You need a skill or service to build on; you can still be early in business.",
    },
    {
      q: "Do I need experience with AI?",
      a: "No prior expertise is required.",
    },
    {
      q: "Can I join only online?",
      a: "The programme is designed as one complete experience — the in-person immersion and the three-month continuation together.",
    },
    {
      q: "Is co-living included?",
      a: "No. Optional co-living afterward is a separately booked extension. Details are still to be confirmed.",
    },
    {
      q: "What is the investment?",
      a: "€1,800 in a shared room, or €2,100 in a private room. Both include accommodation and meals for the 5 days, and 6 online mentoring sessions.",
    },
    {
      q: "Does applying reserve my place?",
      a: "No. Applications help us assess fit; submitting one does not confirm a booking.",
    },
  ],
  form: {
    heading: "Apply to join Embodied Vision Lab",
    intro:
      "Tell us a little about your work, where you are now and what you would like to develop. We’ll review your application and contact you about the next step.",
    success:
      "Thank you for applying to Embodied Vision Lab. Your application has been received. We’ll review it and contact you about the next step.",
    businessStageOptions: [
      "I have a skill or practice and am developing my first offer.",
      "I already work with clients and want more clarity and consistency.",
      "I have an established offer and want to expand.",
    ] as const,
    attendanceOptions: [
      "Yes.",
      "I need to clarify a few practical details.",
    ] as const,
    colivingInterestOptions: ["Yes.", "Maybe.", "No."] as const,
  },
} as const;

export function getPublicFacilitators() {
  return embodiedVisionLab.facilitators.filter(
    (f) => f.name.trim() && f.bio.trim() && f.imageUrl.trim(),
  );
}
