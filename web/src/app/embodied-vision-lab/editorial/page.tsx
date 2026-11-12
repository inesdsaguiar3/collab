import Link from "next/link";
import { embodiedVisionLab, getPublicFacilitators } from "@/content/embodied-vision-lab";
import { EditorialApplyForm } from "@/components/embodied-vision-lab/EditorialApplyForm";

const c = embodiedVisionLab;
const facilitators = getPublicFacilitators();

const navLinks = [
  { href: "#experience", label: "The experience" },
  { href: "#work-on", label: "What you’ll work on" },
  { href: "#guides", label: "Your guides" },
  { href: "#questions", label: "Questions" },
] as const;

function ApplyButton({ className = "" }: { className?: string }) {
  return (
    <a
      href="#apply"
      className={`inline-flex items-center justify-center rounded-full px-7 py-3 text-sm font-semibold text-[#F7F3EB] bg-[#5C6B4A] hover:bg-[#4A573C] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#5C6B4A]/50 focus-visible:ring-offset-2 focus-visible:ring-offset-[#F7F3EB] ${className}`}
    >
      Apply to join
    </a>
  );
}

function SectionEyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[11px] uppercase tracking-[0.28em] text-[#5C6B4A] font-semibold mb-3">
      {children}
    </p>
  );
}

function SectionTitle({ children, id }: { children: React.ReactNode; id?: string }) {
  return (
    <h2
      id={id}
      className="font-[family-name:var(--font-evl-display)] text-3xl md:text-4xl text-[#2C2A26] tracking-tight leading-[1.15]"
    >
      {children}
    </h2>
  );
}

export default function EmbodiedVisionLabEditorialPage() {
  return (
    <div className="relative">
      {/* Cover site mesh with warm ivory for this page */}
      <div className="fixed inset-0 z-[-1] bg-[#F7F3EB]" aria-hidden />

      {/* Nav — sits under the site Navbar */}
      <header className="sticky top-16 md:top-[4.5rem] z-40 border-b border-[#2C2A26]/08 bg-[#F7F3EB]/92 backdrop-blur-md">
        <div className="max-w-5xl mx-auto px-5 sm:px-6 py-4 flex items-center justify-between gap-4">
          <a
            href="#top"
            className="font-[family-name:var(--font-evl-display)] text-lg text-[#2C2A26] tracking-tight shrink-0"
          >
            Embodied Vision Lab
          </a>
          <nav className="hidden md:flex items-center gap-6 text-sm text-[#2C2A26]/60" aria-label="Page">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="hover:text-[#2C2A26] transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>
          <ApplyButton className="!px-5 !py-2.5 text-xs sm:text-sm" />
        </div>
        <nav
          className="md:hidden flex gap-4 overflow-x-auto px-5 pb-3 text-xs text-[#2C2A26]/55"
          aria-label="Page sections"
        >
          {navLinks.map((link) => (
            <a key={link.href} href={link.href} className="whitespace-nowrap hover:text-[#2C2A26]">
              {link.label}
            </a>
          ))}
        </nav>
      </header>

      <main id="top">
        {/* Hero */}
        <section className="max-w-5xl mx-auto px-5 sm:px-6 pt-16 md:pt-24 pb-20 md:pb-28">
          <div className="max-w-3xl space-y-7">
            <p className="text-[11px] uppercase tracking-[0.3em] text-[#5C6B4A] font-semibold">
              Business immersion &amp; mentorship
            </p>
            <h1 className="font-[family-name:var(--font-evl-display)] text-4xl sm:text-5xl md:text-6xl text-[#2C2A26] tracking-tight leading-[1.08]">
              {c.name}
            </h1>
            <p className="font-[family-name:var(--font-evl-display)] text-xl md:text-2xl text-[#2C2A26]/75 font-normal leading-snug">
              {c.tagline}
            </p>
            <p className="text-base md:text-lg text-[#2C2A26]/65 font-light leading-relaxed max-w-2xl">
              {c.description}
            </p>
            <p className="text-sm text-[#2C2A26]/50 font-light leading-relaxed border-t border-[#2C2A26]/10 pt-5">
              {c.detailsLine}
            </p>
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <ApplyButton />
              <a
                href="#experience"
                className="inline-flex items-center justify-center rounded-full px-7 py-3 text-sm font-semibold text-[#2C2A26]/75 border border-[#2C2A26]/20 hover:border-[#2C2A26]/40 hover:text-[#2C2A26] transition-colors"
              >
                Explore the experience
              </a>
            </div>
          </div>
        </section>

        {/* Recognition */}
        <section className="border-y border-[#2C2A26]/08 bg-[#F1EBE0]/70">
          <div className="max-w-5xl mx-auto px-5 sm:px-6 py-16 md:py-20 space-y-10">
            <div className="max-w-xl space-y-3">
              <SectionEyebrow>Recognition</SectionEyebrow>
              <SectionTitle>If this sounds familiar</SectionTitle>
            </div>
            <div className="grid sm:grid-cols-2 gap-8 md:gap-10">
              {c.recognition.map((item) => (
                <div key={item.title} className="space-y-2">
                  <h3 className="text-lg font-semibold text-[#2C2A26] tracking-tight">{item.title}</h3>
                  <p className="text-[#2C2A26]/60 text-sm md:text-base font-light leading-relaxed">
                    {item.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Experience */}
        <section id="experience" className="max-w-5xl mx-auto px-5 sm:px-6 py-16 md:py-24 scroll-mt-28 space-y-12">
          <div className="max-w-xl space-y-3">
            <SectionEyebrow>The experience</SectionEyebrow>
            <SectionTitle>Two connected phases</SectionTitle>
          </div>
          <div className="grid md:grid-cols-2 gap-10 md:gap-14">
            {c.phases.map((phase) => (
              <div key={phase.title} className="space-y-3 border-t border-[#C4A484]/50 pt-6">
                <h3 className="font-[family-name:var(--font-evl-display)] text-2xl text-[#2C2A26] tracking-tight">
                  {phase.title}
                </h3>
                <p className="text-[#2C2A26]/65 text-base font-light leading-relaxed">{phase.body}</p>
              </div>
            ))}
          </div>
          <p className="text-sm text-[#2C2A26]/50 font-light leading-relaxed max-w-2xl">
            {c.optionalColiving.summary}
          </p>
        </section>

        {/* What you'll work on */}
        <section id="work-on" className="border-y border-[#2C2A26]/08 bg-[#EFE8DC]/55 scroll-mt-28">
          <div className="max-w-5xl mx-auto px-5 sm:px-6 py-16 md:py-24 space-y-12">
            <div className="max-w-xl space-y-3">
              <SectionEyebrow>What you’ll work on</SectionEyebrow>
              <SectionTitle>Areas you’ll develop with support</SectionTitle>
              <p className="text-[#2C2A26]/55 text-base font-light leading-relaxed">
                These are areas you will develop with guidance — not guaranteed finished outcomes. The aim is a
                manageable business system suited to your stage.
              </p>
            </div>
            <ol className="grid sm:grid-cols-2 gap-8 md:gap-10 list-none">
              {c.workAreas.map((area, i) => (
                <li key={area.title} className="space-y-2">
                  <p className="text-[11px] uppercase tracking-[0.22em] text-[#C4A484] font-semibold">
                    {String(i + 1).padStart(2, "0")}
                  </p>
                  <h3 className="text-lg font-semibold text-[#2C2A26] tracking-tight">{area.title}</h3>
                  <p className="text-[#2C2A26]/60 text-sm md:text-base font-light leading-relaxed">
                    {area.body}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* Why the name */}
        <section className="max-w-5xl mx-auto px-5 sm:px-6 py-16 md:py-24 space-y-12">
          <div className="max-w-xl space-y-3">
            <SectionEyebrow>Why Embodied Vision Lab</SectionEyebrow>
            <SectionTitle>What the name holds</SectionTitle>
          </div>
          <div className="grid md:grid-cols-3 gap-8 md:gap-6">
            {c.nameMeaning.map((item) => (
              <div key={item.word} className="space-y-3 md:pr-4">
                <h3 className="font-[family-name:var(--font-evl-display)] text-3xl text-[#5C6B4A] tracking-tight">
                  {item.word}
                </h3>
                <p className="text-[#2C2A26]/65 text-sm md:text-base font-light leading-relaxed">
                  {item.body}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Who this is for */}
        <section className="border-y border-[#2C2A26]/08 bg-[#F1EBE0]/70">
          <div className="max-w-5xl mx-auto px-5 sm:px-6 py-16 md:py-20 space-y-8">
            <div className="max-w-xl space-y-3">
              <SectionEyebrow>Who this is for</SectionEyebrow>
              <SectionTitle>Participants who</SectionTitle>
            </div>
            <ul className="space-y-4 max-w-2xl">
              {c.whoFor.map((item) => (
                <li
                  key={item}
                  className="flex gap-3 text-[#2C2A26]/70 text-base font-light leading-relaxed"
                >
                  <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[#5C6B4A] shrink-0" aria-hidden />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Guides */}
        <section id="guides" className="max-w-5xl mx-auto px-5 sm:px-6 py-16 md:py-24 scroll-mt-28 space-y-10">
          <div className="max-w-xl space-y-3">
            <SectionEyebrow>Your guides</SectionEyebrow>
            <SectionTitle>Two facilitators</SectionTitle>
            {facilitators.length === 0 ? (
              <p className="text-[#2C2A26]/50 text-base font-light leading-relaxed">
                Facilitator names, biographies and photographs will be shared here soon.
              </p>
            ) : null}
          </div>
          {facilitators.length > 0 ? (
            <div className="grid md:grid-cols-2 gap-10 md:gap-14">
              {facilitators.map((person) => (
                <article key={person.name} className="space-y-5">
                  <div className="aspect-[3/4] overflow-hidden bg-[#E8E0D4]">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={person.imageUrl}
                      alt={person.name}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-[family-name:var(--font-evl-display)] text-2xl text-[#2C2A26] tracking-tight">
                      {person.name}
                    </h3>
                    <p className="text-[11px] uppercase tracking-[0.22em] text-[#5C6B4A] font-semibold">
                      {person.role}
                    </p>
                    <p className="text-[#2C2A26]/65 text-sm md:text-base font-light leading-relaxed pt-1">
                      {person.bio}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          ) : null}
        </section>

        {/* FAQs */}
        <section id="questions" className="border-y border-[#2C2A26]/08 bg-[#EFE8DC]/55 scroll-mt-28">
          <div className="max-w-3xl mx-auto px-5 sm:px-6 py-16 md:py-24 space-y-10">
            <div className="space-y-3">
              <SectionEyebrow>Practical details</SectionEyebrow>
              <SectionTitle>Questions</SectionTitle>
            </div>
            <div className="divide-y divide-[#2C2A26]/10">
              {c.faqs.map(({ q, a }) => (
                <details key={q} className="group py-5">
                  <summary className="flex justify-between gap-4 cursor-pointer list-none text-[#2C2A26] font-medium text-base leading-snug">
                    {q}
                    <span className="text-[#2C2A26]/30 group-open:rotate-45 transition-transform shrink-0 text-lg leading-none">
                      +
                    </span>
                  </summary>
                  <p className="mt-3 text-[#2C2A26]/60 text-sm md:text-base font-light leading-relaxed pr-8">
                    {a}
                  </p>
                </details>
              ))}
            </div>
            <p className="text-sm text-[#2C2A26]/45 font-light">{c.pricingNote}</p>
          </div>
        </section>

        {/* Apply */}
        <section id="apply" className="max-w-2xl mx-auto px-5 sm:px-6 py-16 md:py-24 scroll-mt-28 space-y-8">
          <div className="space-y-4">
            <SectionEyebrow>Application</SectionEyebrow>
            <SectionTitle>{c.form.heading}</SectionTitle>
            <p className="text-[#2C2A26]/60 text-base font-light leading-relaxed">{c.form.intro}</p>
          </div>
          <EditorialApplyForm />
        </section>

        {/* Closing CTA */}
        <section className="border-t border-[#2C2A26]/08">
          <div className="max-w-5xl mx-auto px-5 sm:px-6 py-14 md:py-16 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div className="space-y-2">
              <p className="font-[family-name:var(--font-evl-display)] text-2xl md:text-3xl text-[#2C2A26] tracking-tight">
                Ready to take the next step?
              </p>
              <p className="text-sm text-[#2C2A26]/50 font-light">
                Apply to join — we&apos;ll be in touch about what comes next.
              </p>
            </div>
            <ApplyButton />
          </div>
        </section>
      </main>

      <footer className="border-t border-[#2C2A26]/08 px-5 sm:px-6 py-8">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 text-sm text-[#2C2A26]/45 font-light">
          <p>Embodied Vision Lab · Co-llab · Editorial sketch</p>
          <div className="flex flex-wrap gap-4">
            <Link href="/embodied-vision-lab" className="hover:text-[#2C2A26] underline underline-offset-4">
              Co-llab version
            </Link>
            <Link href="/retreats" className="hover:text-[#2C2A26] underline underline-offset-4">
              All retreats &amp; labs
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
