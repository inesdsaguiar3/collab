"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { Sparkles, CircleCheck } from "lucide-react";
import { UPCOMING_IMMERSIONS } from "@/lib/labs";
import { COLIVING_FAQS } from "@/lib/colivingFaqs";
import { ROOM_RATES, formatEuro } from "@/lib/pricing";

const COLIVING_HERO_VIDEO = "/images/video-2.mp4";
const COLIVING_HERO_POSTER = "/images/casa.jpg";
const COLIVING_RHYTHM_VIDEO = "/images/media.mp4";
const RATES_HREF = "/rates";
const FROM_NIGHTLY = ROOM_RATES.shared.nightlyRate;

const spaceFeatures = [
  "Spacious indoor & outdoor areas",
  "Dedicated co-working spaces with high-speed WiFi",
  "Peaceful garden corners and meditation spots",
  "Pool, lounge areas and communal kitchen",
  "Filtered water and sustainable lifestyle practices",
  "Room to host your own circles, sessions or creative offerings",
];

const practices = [
  "Daily movement and embodiment sessions",
  "Breathwork and meditation",
  "Somatics",
  "Music",
  "Community circles and co-creation labs",
  "Creative expression and workshops",
  "Optional surf and nature-based activities",
];

const dayWithUs = [
  { title: "Morning movement" },
  { title: "Co-working time" },
  { title: "Brunch" },
  { title: "Co-working time" },
  {
    title: "Workshop",
    detail: "ex: Breathwork · Creative session · Circling · Masterclass · Talk · Surf / nature · Workout · Ecstatic dance · Singing circle · Creative writing",
  },
  { title: "Dinner together" },
  {
    title: "Evening activity",
    detail: "ex: Contemplation Club · Circling · Tea ceremony · Sound Healing · Yin Yoga · Sunset walk · Poetry night · Book club · Music jam",
  },
] as const;

const futureOptions = [
  {
    name: "Ericeira, Portugal",
    status: "Future option",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=900&q=85",
    description: "Ocean-side chapter with surf culture, movement, and creative living by the Atlantic.",
  },
  {
    name: "Lisbon, Portugal",
    status: "Future option",
    image: "https://images.unsplash.com/photo-1513735492246-483525079686?w=900&q=85",
    description: "City-based community experience for creators who want culture, connection, and flow.",
  },
  {
    name: "& more",
    status: "Future option",
    image: "/images/retreats/dsc_4366.jpg",
    description: "New coliving homes in development as the community keeps growing.",
  },
];

function SeeRatesButton({
  variant = "primary",
  className = "",
  label = "See Rates & Book",
  href = RATES_HREF,
}: {
  variant?: "primary" | "secondary" | "link";
  className?: string;
  label?: string;
  href?: string;
}) {
  const base = "inline-flex items-center justify-center text-sm font-semibold transition-all duration-200";

  if (variant === "link") {
    return (
      <Link
        href={href}
        className={`${base} text-white/55 hover:text-white underline underline-offset-4 decoration-white/25 hover:decoration-white/50 ${className}`}
      >
        {label}
      </Link>
    );
  }

  if (variant === "secondary") {
    return (
      <Link
        href={href}
        className={`${base} rounded-full px-6 py-2.5 text-white/80 border border-white/20 hover:border-white/35 hover:text-white ${className}`}
      >
        {label}
      </Link>
    );
  }

  return (
    <Link
      href={href}
      className={`${base} rounded-full px-7 py-3 text-white bg-gradient-to-r from-[#EB8064] to-[#D16678] shadow-lg shadow-[#EB8064]/20 hover:opacity-95 hover:scale-[1.02] ${className}`}
    >
      {label}
    </Link>
  );
}

function UpcomingDatesSection() {
  return (
    <section id="upcoming-coliving" className="max-w-5xl mx-auto scroll-mt-28">
      <div className="grid md:grid-cols-[1fr_1.1fr] gap-10 md:gap-16 items-end">
        <div className="space-y-4">
          <p className="text-xs uppercase tracking-[0.28em] text-[#EB8064] font-semibold">
            Upcoming
          </p>
          <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight leading-[1.08]">
            Next colivings
          </h2>
        </div>

        <div className="space-y-0">
          {UPCOMING_IMMERSIONS.map((item, i) => {
            const contactHref = `/contact?topic=coliving&message=${encodeURIComponent(
              `Count me in for the ${item.when} coliving — keep me first in line when booking opens.\n\n`,
            )}`;

            return (
              <div
                key={item.id}
                className={`flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-2 sm:gap-6 py-5 ${
                  i < UPCOMING_IMMERSIONS.length - 1 ? "border-b border-white/10" : ""
                }`}
              >
                <p className="text-white text-2xl md:text-3xl font-black tracking-tight">{item.when}</p>
                <Link
                  href={contactHref}
                  className="text-[#EB8064] text-sm font-medium underline underline-offset-4 decoration-[#EB8064]/35 hover:text-white hover:decoration-white/50 transition-colors shrink-0"
                >
                  Save your spot →
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default function CoLivingPageClient({
  testimonials,
}: {
  testimonials?: ReactNode;
}) {
  return (
    <div className="pb-28 md:pb-20 min-w-0">
      <section className="relative flex min-h-[100dvh] -mt-20 items-center justify-center overflow-hidden">
        <video
          src={COLIVING_HERO_VIDEO}
          poster={COLIVING_HERO_POSTER}
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/35 to-black/70" />

        <div className="relative z-10 flex min-h-[100dvh] w-full max-w-4xl flex-col items-center justify-center px-5 sm:px-6 pb-28 pt-28 text-center md:pt-32">
          <span className="text-xs uppercase tracking-[0.3em] text-[#EB8064] font-semibold">The living lab</span>
          <h1 className="mt-5 text-[2.5rem] leading-[1.05] sm:text-5xl md:text-7xl font-black tracking-tight text-white max-w-4xl">
            Coliving in Óbidos.<br />
            <span className="gradient-text">Live in community.</span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg font-medium leading-relaxed text-white/90 sm:text-xl md:text-2xl">
            Share your gifts. Live in community. Grow with others.
            <span className="block mt-2 text-base font-normal text-white/75 sm:text-lg md:text-xl">
              For nomads, travelers, and locals who want inspiration — or a place to finally begin.
            </span>
          </p>
          <div className="pt-8">
            <SeeRatesButton />
          </div>
        </div>
      </section>

      <div className="space-y-16 md:space-y-20 px-5 sm:px-6 pt-12 md:pt-16">
      <UpcomingDatesSection />

      <section className="max-w-5xl mx-auto py-10 sm:py-12 px-5 sm:px-8 md:px-12 rounded-3xl" style={{ background: "rgba(220, 210, 240, 0.2)" }}>
        <div className="max-w-3xl space-y-6">
          <div className="space-y-5">
            <p className="text-xs uppercase tracking-[0.3em] text-[#EB8064] font-semibold">Join our community</p>
            <h2 className="text-4xl md:text-5xl font-black text-white leading-tight">
              A short-term immersion<br />
              in community living.
            </h2>
            <p className="text-white/70 text-lg leading-relaxed">
              Coliving, co-creating, giving and receiving — with dedicated time for remote work, growth, connection, and a slower, more intentional rhythm in community.
            </p>
          </div>

          <div className="space-y-3 text-white/70 text-sm leading-relaxed">
            <p>6 to 30 days focused on connection, co-creation and sustainable rhythm.</p>
            <p>Built for digital nomads and remote workers who want both focused work blocks and meaningful community life.</p>
          </div>

          <div className="space-y-4">
            <p className="text-xs uppercase tracking-[0.22em] text-[#EB8064] font-semibold">What&apos;s included</p>
            <ul className="space-y-3 text-white/70">
              {[
                "Accommodation in our cozy shared or private rooms",
                "Dedicated co-working areas with strong WiFi",
                "Nourishing meals — brunch, dinner, snacks & drinks",
                "One daily pre-organised activity and morning circle",
                "Access to community events, classes, and shared spaces",
                "Space to contribute your own gifts, practices, or workshops",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3 leading-relaxed">
                  <CircleCheck className="mt-1 h-4 w-4 flex-shrink-0 text-[#EB8064]" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {testimonials}

      <section className="max-w-5xl mx-auto grid md:grid-cols-2 gap-10 items-start text-white/70 py-10 border-y border-white/10">
        <div className="space-y-6">
          <h3 className="text-3xl font-black text-white">Co-creation</h3>
          <div className="space-y-4">
            <p>
              Co-creation means bringing your <strong className="text-white font-semibold">unique gifts, creativity and energy</strong> to nurture togetherness and build community.
              <strong className="text-white font-semibold"> Freedom and responsibility</strong> go hand in hand here.
            </p>
            <p>
              Think of it as an orchestra: we provide the rhythm and shared structure, and each person brings their own tone, timing and expression.
              Together we create <strong className="text-white font-semibold">something alive that could never exist in solo</strong>.
            </p>
            <p>
              In practice, this means <strong className="text-white font-semibold">living, playing and working together</strong> in a caring environment.
              Everyone contributes to practical aspects of community life: cooking, caring for shared spaces, and supporting one another.
            </p>
            <p>
              We also invite you to share your creative gifts: <strong className="text-white font-semibold">lead a workshop, offer a practice, or test something</strong> you have always wanted to facilitate, on a gift basis.
            </p>
          </div>
        </div>
        <div className="relative h-[320px] md:h-[380px] overflow-hidden">
          <img src="/images/retreats/DSC_4428.JPG" alt="Community co-creation at Casa do Sol" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/35 to-transparent" />
        </div>
      </section>

      <section className="max-w-5xl mx-auto grid md:grid-cols-2 gap-10 items-start text-white/70 py-12 md:py-16 border-b border-white/10">
        <div className="relative h-[360px] md:h-full md:min-h-[520px] overflow-hidden md:order-1">
          <video
            src={COLIVING_RHYTHM_VIDEO}
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/35 to-transparent" />
        </div>
        <div className="space-y-8 md:order-2">
          <div className="space-y-3">
            <p className="text-xs uppercase tracking-[0.3em] text-[#EB8064] font-semibold">The rhythm</p>
            <h3 className="text-3xl md:text-4xl font-black text-white tracking-tight leading-tight">
              A day with us
            </h3>
            <p className="text-white/55 text-base font-light leading-relaxed">
              Join us for 6 to 30 days. A living schedule for focus and connection — with space to move at your own pace.
            </p>
          </div>

          <ol className="relative space-y-0">
            {dayWithUs.map((item, i) => (
              <li key={`${item.title}-${i}`} className="relative flex gap-5 pb-6 last:pb-0">
                {i < dayWithUs.length - 1 ? (
                  <span
                    className="absolute left-[11px] top-7 bottom-0 w-px bg-gradient-to-b from-[#EB8064]/50 to-white/10"
                    aria-hidden
                  />
                ) : null}
                <span
                  className="relative z-[1] mt-1.5 h-[22px] w-[22px] shrink-0 rounded-full border border-[#EB8064]/60 bg-[#EB8064]/15"
                  aria-hidden
                />
                <div className="space-y-1 min-w-0 pt-0.5">
                  <p className="text-base md:text-lg font-semibold text-white tracking-tight">{item.title}</p>
                  {"detail" in item && item.detail ? (
                    <p className="text-sm text-white/45 font-light leading-relaxed">{item.detail}</p>
                  ) : null}
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="max-w-5xl mx-auto py-12 md:py-16 space-y-10 border-b border-white/10">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div className="relative h-[340px] md:h-[420px] overflow-hidden">
            <img
              src="/images/food/food.JPG"
              alt="Nourishing shared meal at Casa do Sol"
              className="absolute inset-0 h-full w-full object-cover"
              style={{ filter: "sepia(0.15) saturate(1.2) brightness(1.02)" }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
          </div>
          <div className="space-y-5 text-white/70">
            <p className="text-xs uppercase tracking-[0.3em] text-[#EB8064] font-semibold">Nourishment</p>
            <h3 className="text-3xl md:text-4xl font-black text-white leading-tight tracking-tight">
              Food as a way of living
            </h3>
            <p className="text-base md:text-lg font-light leading-relaxed">
              Healthy, nourishing meals are part of how we live here — whole foods, seasonal ingredients, and the quiet care of cooking and eating together.
            </p>
            <p className="text-base font-light leading-relaxed">
              We include brunch, dinner, snacks &amp; drinks so your body stays supported while you work, create, and connect.
            </p>
            <ul className="grid grid-cols-2 gap-3 pt-2 text-sm">
              {["Brunch", "Dinner", "Snacks", "Drinks"].map((item) => (
                <li key={item} className="flex items-center gap-2.5 text-white/75">
                  <CircleCheck className="h-4 w-4 flex-shrink-0 text-[#EB8064]" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { src: "/images/food/IMG_2889.jpeg", alt: "Fresh ingredients" },
            { src: "/images/food/IMG_0127.jpeg", alt: "Seasonal food" },
            { src: "/images/food/IMG_3111.jpeg", alt: "Wholesome spread" },
            { src: "/images/food/IMG_4034.jpeg", alt: "Shared table" },
          ].map(({ src, alt }) => (
            <div key={src} className="relative h-[140px] md:h-[180px] overflow-hidden">
              <img
                src={src}
                alt={alt}
                className="absolute inset-0 h-full w-full object-cover"
                style={{ filter: "sepia(0.15) saturate(1.2) brightness(1.02)" }}
              />
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-5xl mx-auto">
        <div className="rounded-3xl border border-white/[0.1] bg-gradient-to-br from-white/[0.04] to-transparent px-8 py-10 md:px-12 md:py-12 text-center space-y-5">
          <h3 className="text-2xl md:text-3xl font-black text-white tracking-tight">
            Ready to join us in Óbidos?
          </h3>
          <p className="text-white/55 text-sm md:text-base max-w-lg mx-auto leading-relaxed">
            Join once for community rates forever — then see rates and book, or reach out with questions.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-1">
            <SeeRatesButton />
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold text-white/70 hover:text-white transition-colors"
            >
              Ask a question
            </Link>
          </div>
        </div>
      </section>

      <section className="max-w-5xl mx-auto">
        <div className="relative h-[300px] md:h-[420px] overflow-hidden">
          <img src="/images/retreats/DSC_4621.JPG" alt="Community gathering" className="w-full h-full object-cover" style={{ objectPosition: "center 65%" }} />
          <div className="absolute inset-0 bg-gradient-to-t from-black/45 to-transparent" />
        </div>
      </section>

      <section className="max-w-5xl mx-auto py-10">
        <div className="relative overflow-hidden rounded-3xl border border-white/[0.12] bg-gradient-to-br from-[#D16678]/[0.12] via-white/[0.03] to-[#EB8064]/[0.06] px-6 py-9 md:px-12 md:py-11">
          <div
            className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-[#EB8064] via-[#D16678] to-[#7F5AA1] opacity-90"
            aria-hidden
          />
          <div className="pl-5 md:pl-6 space-y-5 text-center md:text-left">
            <p className="text-[10px] sm:text-xs uppercase tracking-[0.28em] text-[#EB8064]/90 font-semibold">
              How we show up
            </p>
            <div className="space-y-3 max-w-xl mx-auto md:mx-0">
              <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight leading-tight">
                What holds this place together
              </h3>
              <p className="text-white/58 text-sm sm:text-[15px] leading-relaxed">
                Our shared values — co-creation, kindness, clear communication — so you know the spirit of the house before you arrive.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row sm:flex-wrap sm:items-center justify-center md:justify-start gap-4 sm:gap-6 pt-1">
              <Link
                href="/about#core-values"
                className="inline-flex items-center justify-center rounded-full px-7 py-3.5 text-sm font-semibold text-white bg-gradient-to-r from-[#EB8064] to-[#D16678] shadow-lg shadow-[#EB8064]/20 hover:opacity-95 hover:scale-[1.02] transition-all duration-200"
              >
                Our values
              </Link>
              <Link
                href="/about"
                className="text-sm font-medium text-white/65 hover:text-white/90 underline underline-offset-[5px] decoration-white/30 hover:decoration-white/55 transition-colors"
              >
                Read our story
              </Link>
            </div>
          </div>
          <Sparkles
            className="pointer-events-none absolute -right-2 -top-2 h-16 w-16 text-[#D16678]/25 sm:right-6 sm:top-6"
            strokeWidth={1}
            aria-hidden
          />
        </div>
      </section>

      <section className="max-w-5xl mx-auto grid md:grid-cols-2 gap-10 items-start text-white/70 py-10 border-t border-white/10">
        <div className="space-y-5">
          <h3 className="text-3xl font-black text-white">Spaces</h3>
          <div className="p-2">
            <ul className="space-y-2 list-disc pl-6">
              {spaceFeatures.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
        <div className="relative h-[320px] overflow-hidden">
          <img src="/images/sunlounge.jpeg" alt="Casa do Sol spaces" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/35 to-transparent" />
        </div>
      </section>

      <section className="max-w-5xl mx-auto grid md:grid-cols-2 gap-10 items-start text-white/70 py-10 border-t border-white/10">
        <div className="relative h-[320px] overflow-hidden md:order-1">
          <img src="/images/retreats/DSC_4328.JPG" alt="Practices at Casa do Sol" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/35 to-transparent" />
        </div>
        <div className="space-y-5 md:order-2">
          <h3 className="text-3xl font-black text-white">Practices</h3>
          <div className="p-2">
            <ul className="space-y-2 list-disc pl-6">
              {practices.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="max-w-5xl mx-auto pb-10 space-y-8 text-white/70">
        <div className="relative h-[300px] md:h-[420px] overflow-hidden">
          <img src="/images/retreats/dsc_4346.jpg" alt="Casa do Sol, Óbidos" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/45 to-transparent" />
        </div>

        <div className="text-center space-y-4 max-w-2xl mx-auto px-2">
          <p className="text-xs uppercase tracking-[0.3em] text-[#EB8064] font-semibold">The venue</p>
          <h3 className="text-3xl md:text-4xl font-black text-white">Casa do Sol</h3>
          <p className="text-base leading-relaxed text-white/65">
            A sunny home in Óbidos, on Portugal&apos;s west coast — spacious rooms, shared hangout areas, and a pool. Shared and private rooms for your coliving stay, from cozy dorms to balcony and ensuite options.
          </p>
        </div>

        <div className="w-full h-[280px] md:h-[400px]" style={{ display: "flex", gap: "3px" }}>
          <div style={{ flex: "1.4", overflow: "hidden" }}>
            <img src="/images/sunlounge.jpeg" alt="Sun lounge at Casa do Sol" className="w-full h-full object-cover" />
          </div>
          <div style={{ flex: "1", display: "flex", flexDirection: "column", gap: "3px" }}>
            <div style={{ flex: 1, overflow: "hidden" }}>
              <img src="/images/library.jpeg" alt="Library at Casa do Sol" className="w-full h-full object-cover" />
            </div>
            <div style={{ flex: 1, overflow: "hidden" }}>
              <img
                src="/images/INES-61.jpg"
                alt="Casa do Sol interior"
                className="w-full h-full object-cover"
                style={{ objectPosition: "center 78%" }}
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="h-48 md:h-52 overflow-hidden">
            <img src="/images/twin.JPG" alt="Shared room at Casa do Sol" className="w-full h-full object-cover" />
          </div>
          <div className="h-48 md:h-52 overflow-hidden">
            <img src="/images/queen-balcony.png" alt="Private room at Casa do Sol" className="w-full h-full object-cover" />
          </div>
        </div>

        <div className="text-center">
          <a
            href="https://www.casadosolretreat.com/en"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#EB8064] underline underline-offset-4 hover:text-white transition-colors"
          >
            Explore the venue
          </a>
        </div>
      </section>

      <section id="rates" className="max-w-5xl mx-auto scroll-mt-28">
        <div className="border border-white/10 bg-white/[0.04] px-6 py-10 md:px-10 md:py-12 text-center space-y-5">
          <p className="text-xs uppercase tracking-[0.28em] text-[#EB8064] font-semibold">Rates</p>
          <p className="text-4xl md:text-5xl font-black text-white tracking-tight tabular-nums">
            From {formatEuro(FROM_NIGHTLY)}
            <span className="text-xl md:text-2xl font-semibold text-white/55">/night</span>
          </p>
          <p className="text-sm md:text-base text-white/55 font-light leading-relaxed max-w-md mx-auto">
            Shared room — community life, coworking, and the rhythm of the house included.
          </p>
          <div className="pt-2">
            <SeeRatesButton className="px-8 py-3.5 text-base" />
          </div>
        </div>
      </section>

      <section className="max-w-5xl mx-auto">
        <div className="relative overflow-hidden border border-white/[0.12] bg-gradient-to-br from-[#D16678]/[0.1] via-white/[0.03] to-[#EB8064]/[0.08] px-6 py-8 md:px-10 md:py-9">
          <div
            className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-[#EB8064] via-[#D16678] to-[#7F5AA1] opacity-90"
            aria-hidden
          />
          <div className="pl-4 md:pl-5 space-y-4 max-w-2xl">
            <p className="text-xs uppercase tracking-[0.28em] text-[#EB8064] font-semibold">Once you&apos;re in</p>
            <p className="text-2xl md:text-3xl font-black text-white leading-tight">
              Community pricing, forever.
            </p>
            <p className="text-sm md:text-base text-white/60 leading-relaxed">
              Stay with us once and you&apos;re part of the community — welcomed back with community price each time.
            </p>
            <p className="text-sm text-white/45 leading-relaxed">
              Every friend you bring who books gets you both 10% off — each friend counts.
            </p>
          </div>
        </div>
      </section>

      <section className="max-w-5xl mx-auto space-y-8 pb-10">
        <div className="text-center">
          <span className="text-xs uppercase tracking-[0.3em] text-[#D16678] font-semibold">Future options</span>
          <h3 className="text-4xl md:text-5xl font-black text-white tracking-tight mt-3">Ericeira, Lisbon & more</h3>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {futureOptions.map((opt) => (
            <div key={opt.name} className="overflow-hidden" style={{ background: "rgba(220, 210, 240, 0.22)", border: "1px solid rgba(255,255,255,0.12)" }}>
              <div className="h-56">
                <img src={opt.image} alt={opt.name} className="w-full h-full object-cover" />
              </div>
              <div className="p-6 space-y-2 text-left">
                <p className="text-white font-semibold">{opt.name}</p>
                <p className="text-[#D16678] text-xs uppercase tracking-[0.18em]">{opt.status}</p>
                <p className="text-white/55 text-sm">{opt.description}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center">
          <Link href="#newsletter" className="text-white/70 underline underline-offset-4 hover:text-white">
            Want updates on upcoming locations? Join our newsletter
          </Link>
        </div>
      </section>

      <section className="max-w-3xl mx-auto space-y-8 pb-4">
        <div className="space-y-2 text-center">
          <p className="text-xs uppercase tracking-[0.3em] text-[#EB8064] font-semibold">FAQ</p>
          <h2 className="text-3xl md:text-4xl font-black text-white">Coliving in Portugal</h2>
          <p className="text-white/50 text-sm max-w-xl mx-auto">
            Common questions about stays at Casa do Sol, Óbidos — near Lisbon.
          </p>
        </div>
        <div className="space-y-0 divide-y divide-white/[0.07]">
          {COLIVING_FAQS.map(({ q, a }) => (
            <details key={q} className="group py-5 cursor-pointer">
              <summary className="flex justify-between items-start gap-4 text-white/80 font-medium text-base list-none">
                {q}
                <span className="text-white/30 group-open:rotate-45 transition-transform duration-200 shrink-0 text-lg leading-none mt-0.5">
                  +
                </span>
              </summary>
              <p className="mt-4 text-white/50 text-sm leading-relaxed">{a}</p>
            </details>
          ))}
        </div>
        <p className="text-white/35 text-sm text-center pt-2">
          Still unsure?{" "}
          <Link href="/contact" className="underline underline-offset-4 text-white/55 hover:text-white transition-colors">
            Get in touch
          </Link>
        </p>
      </section>

      {/* Sticky mobile CTA */}
      <div className="fixed inset-x-0 bottom-0 z-40 md:hidden px-4 py-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] pointer-events-none">
        <Link
          href={RATES_HREF}
          className="pointer-events-auto flex w-full items-center justify-center rounded-full px-6 py-3.5 text-sm font-semibold text-white bg-gradient-to-r from-[#EB8064] to-[#D16678] shadow-lg shadow-[#EB8064]/25"
        >
          See Rates &amp; Book
        </Link>
      </div>
      </div>
    </div>
  );
}
