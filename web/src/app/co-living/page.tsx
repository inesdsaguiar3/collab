import CoLivingPageClient from "./CoLivingPageClient";
import { ColivingTestimonialsSection } from "@/components/ColivingTestimonialsSection";

export default function CoLivingPage() {
  return (
    <CoLivingPageClient testimonials={<ColivingTestimonialsSection />} />
  );
}
