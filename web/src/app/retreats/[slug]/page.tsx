import { notFound } from "next/navigation";
import { compileMDX } from "next-mdx-remote/rsc";
import { getRetreatBySlug, getRetreatSlugs, formatRetreatDateRange } from "@/lib/mdx";
import { RetreatBookingProvider, RetreatHero, mdxComponents } from "@/components/mdx";
import { PageBackground } from "@/components/PageBackground";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export async function generateStaticParams() {
  return getRetreatSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const retreat = getRetreatBySlug(slug);
  if (!retreat) return { title: "Retreat Not Found" };
  return {
    title: `${retreat.frontmatter.title} | Co-llab`,
    description: retreat.frontmatter.metaDescription,
  };
}

export default async function RetreatPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const retreat = getRetreatBySlug(slug);
  if (!retreat) notFound();

  const { frontmatter, content } = retreat;
  const accentColor = frontmatter.accentColor || "#7F5AA1";

  const { content: mdxContent } = await compileMDX({
    source: content,
    components: mdxComponents,
    options: { parseFrontmatter: false },
  });

  return (
    <div className="min-h-screen">
      {/* Fixes iOS overscroll colour at bottom — does NOT touch nav, footer or animated background */}
      <PageBackground color="#EDE8FF" />

      {/* Back link */}
      <div className="fixed top-20 left-6 z-40">
        <Link
          href="/retreats"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-light text-white/70 hover:text-white backdrop-blur-md bg-black/15 border border-white/20 transition-all hover:bg-black/25"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Back
        </Link>
      </div>

      {/* Hero — transparent so the animated background shows through, same as every other page */}
      <RetreatHero
        title={frontmatter.title}
        subtitle={frontmatter.subtitle}
        date={formatRetreatDateRange(frontmatter.startDate, frontmatter.endDate)}
        imageUrl={frontmatter.mainImageUrl}
        videoUrl={frontmatter.heroVideoUrl}
        hideImage={frontmatter.hideHeaderImage}
        accentColor={accentColor}
      />

      {/* Thin brand-gradient rule */}
      <div style={{ height: "2px", background: "linear-gradient(to right, #EB806460, #AE5F8F80, #7F5AA170, transparent)" }} />

      {/* Content — semi-transparent lavender overlay lets the animated background
          show through subtly, keeping the page alive while lavender dominates. */}
      <div style={{
        color: "#4A3F5C",
        background: "rgba(237, 232, 255, 0.92)",
      }}>
        <RetreatBookingProvider slug={slug} offers={frontmatter.offers}>
          {mdxContent}
        </RetreatBookingProvider>
      </div>

    </div>
  );
}
