import { ReviewsCarousel } from "@/components/ReviewsCarousel";
import { getHomepageReviews } from "@/lib/reviews";

export function ReviewsSection() {
  const reviews = getHomepageReviews();

  return (
    <section className="py-16 sm:py-24 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto space-y-8 sm:space-y-10">
        <div className="text-center space-y-3 max-w-2xl mx-auto px-1">
          <span className="text-xs uppercase tracking-[0.3em] text-[#EB8064] font-semibold">
            Reviews
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white leading-[1.1]">
            What people say about <span className="gradient-text">Co-llab.</span>
          </h2>
        </div>
        <ReviewsCarousel reviews={reviews} />
      </div>
    </section>
  );
}
