import Link from "next/link";
import { ArrowRight, Calendar, MapPin } from "lucide-react";
import { formatRetreatDateRange, getAllRetreats } from "@/lib/mdx";
import {
  PAST_EXPERIENCES,
  UPCOMING_LABS,
  formatLabDateRange,
  isUpcomingByEndDate,
} from "@/lib/labs";

type UpcomingCard = {
  key: string;
  href: string;
  title: string;
  description?: string;
  location: string;
  dateRange: string;
  image: string;
  accent: string;
  kind: "Retreat" | "Lab";
  priceLabel?: string;
  sortDate: string;
};

export function RetreatsSection() {
  const upcomingLabs = UPCOMING_LABS.filter((lab) =>
    isUpcomingByEndDate(lab.endDate),
  );
  const excludedIds = new Set([
    ...upcomingLabs.map((lab) => lab.id),
    ...PAST_EXPERIENCES.map((item) => item.id),
  ]);

  const retreatCards: UpcomingCard[] = getAllRetreats()
    .filter(({ slug, frontmatter }) => {
      if (excludedIds.has(slug) || excludedIds.has(frontmatter.id)) return false;
      return isUpcomingByEndDate(frontmatter.endDate);
    })
    .map(({ slug, frontmatter }) => {
      const fromPrice = frontmatter.offers?.length
        ? Math.min(...frontmatter.offers.map((offer) => Number(offer.price)))
        : null;
      const currency = frontmatter.offers?.[0]?.priceCurrency ?? "EUR";
      const priceSymbol = currency === "USD" ? "$" : "€";

      return {
        key: slug,
        href: `/retreats/${slug}`,
        title: frontmatter.title,
        description: frontmatter.metaDescription ?? frontmatter.subtitle,
        location: frontmatter.location,
        dateRange: formatRetreatDateRange(frontmatter.startDate, frontmatter.endDate),
        image: frontmatter.mainImageUrl,
        accent: frontmatter.accentColor ?? "#7F5AA1",
        kind: "Retreat" as const,
        priceLabel: fromPrice ? `From ${priceSymbol}${fromPrice}` : undefined,
        sortDate: frontmatter.startDate,
      };
    });

  const labCards: UpcomingCard[] = upcomingLabs.map((lab) => ({
    key: lab.id,
    href: lab.href,
    title: lab.title,
    description: lab.description,
    location: lab.location,
    dateRange: formatLabDateRange(lab.startDate, lab.endDate),
    image: lab.image,
    accent: lab.accent,
    kind: "Lab" as const,
    priceLabel: lab.priceLabel || undefined,
    sortDate: lab.startDate,
  }));

  const cards = [...retreatCards, ...labCards].sort((a, b) =>
    a.sortDate.localeCompare(b.sortDate),
  );

  return (
    <section className="py-28 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12 max-w-2xl space-y-4">
          <h2 className="text-4xl md:text-6xl font-black tracking-tight text-white leading-none">
            Upcoming <span className="gradient-text">immersions</span>
          </h2>
          <p className="text-white/50 text-sm md:text-base leading-relaxed">
            Our field labs — days to feel, embody and connect, in person.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {cards.map((card) => (
            <Link
              key={card.key}
              href={card.href}
              className="group block overflow-hidden border border-white/10 bg-white/[0.06] hover:border-white/20 hover:bg-white/[0.08] transition-all duration-300"
            >
              <div className="relative h-64 md:h-72 overflow-hidden">
                <img
                  src={card.image}
                  alt={card.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />
                <span className="absolute top-3 left-3 px-2.5 py-1 text-[10px] uppercase tracking-[0.2em] text-white/85 border border-white/20 bg-black/25 backdrop-blur-sm">
                  {card.kind}
                </span>
              </div>
              <div className="p-5 space-y-3">
                <div className="flex flex-wrap gap-x-3 gap-y-1 text-[11px] font-medium uppercase tracking-wider text-white/40">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {card.dateRange}
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3 h-3" />
                    {card.location}
                  </span>
                </div>
                <h3 className="text-xl font-semibold text-white tracking-tight leading-snug group-hover:text-white/85 transition-colors">
                  {card.title}
                </h3>
                {card.description && (
                  <p className="text-white/50 text-sm leading-relaxed line-clamp-2">
                    {card.description}
                  </p>
                )}
                <div className="flex items-center justify-between pt-1">
                  <span className="text-sm font-medium" style={{ color: card.accent }}>
                    {card.priceLabel ?? "Learn more"}
                  </span>
                  <span className="flex items-center gap-1.5 text-sm text-white/60 group-hover:text-white transition-colors">
                    Explore{" "}
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-12 flex justify-center">
          <Link
            href="/retreats"
            className="px-8 py-4 glass rounded-full text-white font-semibold border border-white/10 hover:border-[#EB8064]/40 hover:bg-white/5 transition-all duration-200 flex items-center gap-2"
          >
            View all immersions <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
