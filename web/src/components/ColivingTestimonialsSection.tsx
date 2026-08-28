import { ReviewsCarousel } from "@/components/ReviewsCarousel";
import { getHomepageReviews } from "@/lib/reviews";

export function ColivingTestimonialsSection() {
  const reviews = getHomepageReviews();
  if (!reviews.length) return null;

  return (
    <section className="max-w-6xl mx-auto py-4 sm:py-8">
      <div className="space-y-8 sm:space-y-10">
        <div className="text-center space-y-3 max-w-2xl mx-auto px-1">
          <span className="text-xs uppercase tracking-[0.3em] text-[#EB8064] font-semibold">
            Guest testimonials
          </span>
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-white leading-[1.15]">
            What it feels like to be at{" "}
            <span className="gradient-text">Casa do Sol</span>
          </h2>
        </div>
        <ReviewsCarousel reviews={reviews} />
      </div>
    </section>
  );
}
