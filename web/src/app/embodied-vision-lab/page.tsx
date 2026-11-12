"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import {
  embodiedVisionLab,
  getPublicFacilitators,
} from "@/content/embodied-vision-lab";
import { EmbodiedVisionApplyForm } from "@/components/embodied-vision-lab/ApplyForm";

const applyButtonCls =
  "inline-block px-8 py-4 rounded-full font-semibold text-white bg-gradient-to-r from-[#7F5AA1] to-[#D16678] hover:opacity-90 hover:scale-105 transition-all duration-200 shadow-xl shadow-[#7F5AA1]/20 text-center";

function ApplyButton() {
  return (
    <div className="flex justify-center">
      <a href="#apply" className={applyButtonCls}>
        Apply to join ✦
      </a>
    </div>
  );
}

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 22 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { delay, duration: 0.65, ease: "easeOut" as const },
});

const content = embodiedVisionLab;
const facilitators = getPublicFacilitators();

function Guide({
  name,
  role,
  bio,
  imageUrl,
  reversed = false,
}: {
  name: string;
  role: string;
  bio: string;
  imageUrl: string;
  reversed?: boolean;
}) {
  return (
    <article
      className={`flex flex-col items-center gap-8 py-8 md:items-center md:gap-16 md:py-10 ${
        reversed ? "md:flex-row-reverse" : "md:flex-row"
      }`}
    >
      <div
        className="relative h-48 w-48 shrink-0 overflow-hidden rounded-full sm:h-56 sm:w-56"
        style={{ boxShadow: "0 0 0 1px rgba(235,128,100,0.4), 0 18px 50px rgba(0,0,0,0.4)" }}
      >
        <img src={imageUrl} alt="" className="absolute inset-0 h-full w-full object-cover object-center" />
      </div>
      <div className={`min-w-0 flex-1 space-y-4 text-center ${reversed ? "md:text-right" : "md:text-left"}`}>
        <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#EB8064]">{role}</p>
        <h3 className="text-4xl font-light tracking-tight text-white md:text-5xl">{name}</h3>
        <div
          className={`mx-auto h-px w-10 ${reversed ? "md:ml-auto md:mr-0" : "md:mx-0"}`}
          style={{ background: "linear-gradient(to right, #EB8064, #7F5AA1)" }}
        />
        <p
          className={`mx-auto max-w-xl text-base font-light leading-relaxed text-white/70 ${
            reversed ? "md:ml-auto md:mr-0" : "md:mx-0"
          }`}
        >
          {bio}
        </p>
      </div>
    </article>
  );
}

export default function EmbodiedVisionLabPage() {
  useEffect(() => {
    const html = document.documentElement;
    const previous = html.style.scrollBehavior;
    html.style.scrollBehavior = "auto";
    const showHero = () => {
      if (!window.location.hash || window.location.hash === "#hero") {
        window.scrollTo(0, 0);
      }
    };
    showHero();
    const frame = window.requestAnimationFrame(() => {
      showHero();
      html.style.scrollBehavior = previous;
    });
    return () => {
      window.cancelAnimationFrame(frame);
      html.style.scrollBehavior = previous;
    };
  }, []);

  return (
    <div className="min-h-screen">
      {/* Hero — full-bleed photo, same treatment as coliving */}
      <section id="hero" className="relative flex min-h-[100dvh] -mt-20 items-center justify-center overflow-hidden">
        <img
          src="/images/vision-lab/group.png"
          alt=""
          className="absolute inset-0 h-full w-full object-cover object-[center_62%]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/65 via-black/55 to-black/80" />

        <div className="relative z-10 flex min-h-[100dvh] w-full max-w-4xl flex-col items-center justify-center px-5 sm:px-6 pb-24 pt-28 text-center md:pt-32">
          <p className="text-xs uppercase tracking-[0.3em] text-[#EB8064] font-semibold">
            Co-llab · Lab
          </p>
          <h1 className="mt-5 text-[2.5rem] leading-[1.05] sm:text-5xl md:text-7xl font-black tracking-tight text-white [text-shadow:0_2px_24px_rgba(0,0,0,0.45)]">
            Embodied
            <br />
            Vision <span className="gradient-text">Lab.</span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg font-light leading-relaxed text-white/85 sm:text-xl">
            {content.tagline}
          </p>

          <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:items-end sm:gap-5">
            <div className="space-y-1 text-center sm:text-left">
              <p className="text-[11px] uppercase tracking-[0.28em] text-[#EB8064] font-semibold">
                Immersion
              </p>
              <p className="text-2xl sm:text-3xl font-semibold tracking-tight text-white leading-none">
                5–9 May <span className="font-light text-white/80">2027</span>
              </p>
            </div>
            <div className="hidden sm:block h-10 w-px bg-white/30 self-end mb-0.5" aria-hidden />
            <p className="text-lg sm:pb-0.5 sm:text-left sm:text-xl font-light tracking-tight text-white/85 leading-tight">
              + 3 months mentorship
            </p>
          </div>

          <div className="mt-8 flex w-full max-w-xs flex-col gap-3 sm:max-w-none sm:flex-row sm:justify-center sm:gap-4">
            <a
              href="#apply"
              className="inline-block px-8 py-4 rounded-full font-semibold text-white bg-gradient-to-r from-[#7F5AA1] to-[#D16678] hover:opacity-90 hover:scale-105 transition-all duration-200 shadow-xl shadow-[#7F5AA1]/20 text-center"
            >
              Apply to join ✦
            </a>
            <a
              href="#experience"
              className="inline-block px-7 py-4 rounded-full font-semibold text-white glass border border-white/15 hover:border-white/35 transition-all duration-200 text-center"
            >
              Explore the experience →
            </a>
          </div>
        </div>

        <a
          href="#experience"
          className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 text-white/70 hover:text-white transition-colors"
          aria-label="Scroll to experience"
        >
          <motion.span
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
            className="inline-flex"
          >
            <ChevronDown className="w-6 h-6" strokeWidth={1.5} />
          </motion.span>
        </a>
      </section>

      <div className="px-5 py-14 space-y-16 sm:px-6 sm:py-20 sm:space-y-28 md:space-y-36">

      {/* Highlight */}
      <section className="max-w-2xl mx-auto text-center">
        <motion.p
          {...fadeUp()}
          className="text-white/70 text-xl sm:text-2xl md:text-3xl font-light leading-snug"
        >
          You have valuable skills. This lab helps you grow the business around them — with
          structure, feedback and a pace that still feels like you.
        </motion.p>
      </section>

      <section className="-mx-5 sm:-mx-6">
        <div className="grid grid-cols-3 gap-1">
          {[
            { src: "/images/retreats/DSC_4328.JPG", alt: "Practice at Casa do Sol", position: "center" },
            { src: "/images/retreats/dsc_4346.jpg", alt: "Lunch together outside at Casa do Sol", position: "center 42%" },
            { src: "/images/vision-lab/work.png", alt: "Zoë working on a laptop", position: "center 35%" },
          ].map((img) => (
            <div key={img.src} className="relative h-48 overflow-hidden sm:h-72 md:h-[28rem]">
              <img
                src={img.src}
                alt={img.alt}
                className="absolute inset-0 h-full w-full object-cover"
                style={{ objectPosition: img.position }}
              />
            </div>
          ))}
        </div>
      </section>

      {/* Recognition */}
      <section className="max-w-4xl mx-auto space-y-12">
        <motion.div {...fadeUp()} className="space-y-4 text-center md:text-left">
          <p className="text-xs uppercase tracking-[0.3em] text-[#EB8064] font-semibold">
            If this sounds familiar
          </p>
          <h2 className="text-3xl md:text-4xl font-black tracking-tight text-white leading-[1.1]">
            Where many practitioners{" "}
            <span className="gradient-text">get stuck.</span>
          </h2>
        </motion.div>
        <div className="grid md:grid-cols-2 gap-x-12 gap-y-10">
          {content.recognition.map((item, i) => (
            <motion.div key={item.title} {...fadeUp(i * 0.06)} className="space-y-2">
              <h3 className="text-lg font-black text-white tracking-tight">{item.title}</h3>
              <p className="text-white/50 text-sm font-light leading-relaxed">{item.body}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Experience */}
      <section id="experience" className="max-w-4xl mx-auto scroll-mt-28 space-y-12">
        <motion.div {...fadeUp()} className="space-y-4">
          <p className="text-xs uppercase tracking-[0.3em] text-[#EB8064] font-semibold">
            The experience · 5–9 May 2027
          </p>
          <h2 className="text-3xl md:text-4xl font-black tracking-tight text-white leading-[1.1]">
            Five days together.
            <br />
            <span className="gradient-text">Three months of implementation.</span>
          </h2>
          <div
            className="h-[2px] w-16 rounded-full"
            style={{ background: "linear-gradient(to right, #EB8064, #7F5AA1, #D16678)" }}
          />
        </motion.div>
        <div className="grid md:grid-cols-2 gap-10 md:gap-14">
          {[
            { phase: content.phases[0], image: "/images/vision-lab/mvmt1.png", alt: "Embodied practice during the immersion" },
            { phase: content.phases[1], image: "/images/vision-lab/group-indoor.png", alt: "Group work and conversation indoors" },
          ].map(({ phase, image, alt }, i) => (
            <motion.div key={phase.title} {...fadeUp(0.08 + i * 0.08)} className="space-y-5">
              <div className="relative aspect-[4/3] overflow-hidden">
                <img src={image} alt={alt} className="absolute inset-0 h-full w-full object-cover" />
              </div>
              <div className="space-y-3">
                <h3 className="text-xl font-black text-white tracking-tight">{phase.title}</h3>
                <p className="text-white/55 text-base font-light leading-[1.85]">{phase.body}</p>
              </div>
            </motion.div>
          ))}
        </div>
        <motion.p {...fadeUp(0.15)} className="text-white/40 text-sm font-light leading-relaxed max-w-2xl">
          {content.optionalColiving.summary}
        </motion.p>
        <ApplyButton />
      </section>

      {/* Work on */}
      <section className="max-w-4xl mx-auto space-y-12">
        <motion.div {...fadeUp()} className="space-y-4 max-w-2xl">
          <p className="text-xs uppercase tracking-[0.3em] text-[#EB8064] font-semibold">
            What you&apos;ll work on
          </p>
          <h2 className="text-3xl md:text-4xl font-black tracking-tight text-white leading-[1.1]">
            Areas you&apos;ll develop{" "}
            <span className="gradient-text">with support.</span>
          </h2>
          <p className="text-white/45 text-sm font-light leading-relaxed">
            These are areas you will develop with guidance — not guaranteed finished outcomes. The
            aim is a manageable business system suited to your stage.
          </p>
        </motion.div>
        <div className="grid md:grid-cols-2 gap-x-12 gap-y-8">
          {content.workAreas.map((area, i) => (
            <motion.div key={area.title} {...fadeUp(i * 0.05)} className="space-y-2">
              <div className="flex gap-3 items-start">
                <span
                  className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#EB8064]"
                  aria-hidden
                />
                <div className="space-y-1.5">
                  <h3 className="text-base font-black text-white tracking-tight">{area.title}</h3>
                  <p className="text-white/50 text-sm font-light leading-relaxed">{area.body}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Name meaning */}
      <section className="max-w-4xl mx-auto space-y-8 md:space-y-12">
        <motion.h2
          {...fadeUp()}
          className="text-[1.75rem] sm:text-3xl md:text-4xl font-black tracking-tight text-white leading-[1.1] text-center"
        >
          Why <span className="gradient-text">Embodied Vision Lab</span>
        </motion.h2>
        <div className="divide-y divide-white/10 md:grid md:grid-cols-3 md:divide-y-0 md:gap-10">
          {content.nameMeaning.map((item, i) => {
            const colors = ["#EB8064", "#D16678", "#E4B4DC"] as const;
            return (
              <motion.div
                key={item.word}
                {...fadeUp(i * 0.08)}
                className="space-y-2 py-5 first:pt-0 last:pb-0 text-left md:space-y-3 md:py-0"
              >
                <h3
                  className="text-xl sm:text-2xl font-black tracking-tight"
                  style={{ color: colors[i] }}
                >
                  {item.word}
                </h3>
                <p className="text-white/60 text-[15px] sm:text-sm font-light leading-relaxed">{item.body}</p>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Photo mosaic — mixed sizes */}
      <section className="relative max-w-6xl mx-auto">
        <svg className="pointer-events-none absolute overflow-visible" width="0" height="0" aria-hidden>
          <filter id="evl-lift-soft">
            <feComponentTransfer>
              <feFuncR type="gamma" amplitude="1.08" exponent="0.82" offset="0.04" />
              <feFuncG type="gamma" amplitude="1.08" exponent="0.82" offset="0.04" />
              <feFuncB type="gamma" amplitude="1.08" exponent="0.82" offset="0.04" />
            </feComponentTransfer>
          </filter>
          <filter id="evl-lift-strong">
            <feComponentTransfer>
              <feFuncR type="gamma" amplitude="1.12" exponent="0.7" offset="0.035" />
              <feFuncG type="gamma" amplitude="1.12" exponent="0.7" offset="0.035" />
              <feFuncB type="gamma" amplitude="1.12" exponent="0.7" offset="0.035" />
            </feComponentTransfer>
          </filter>
        </svg>
        <div className="grid grid-cols-6 gap-1 auto-rows-[78px] sm:auto-rows-[96px] md:auto-rows-[108px]">
          {(
            [
              {
                src: "/images/vision-lab/breath12.png",
                alt: "Meditation together",
                className: "col-span-6 row-span-4",
              },
              {
                src: "/images/vision-lab/handpan.png",
                alt: "Sound and stillness",
                className: "col-span-3 row-span-5",
              },
              {
                src: "/images/vision-lab/garden-group.png",
                alt: "Sharing a cup in the garden at Casa do Sol",
                className: "col-span-3 row-span-3",
              },
              {
                src: "/images/WhatsApp%20Image%202026-11-11%20at%2012.46.37.jpeg",
                alt: "Group circle indoors at Casa do Sol",
                className: "col-span-3 row-span-2",
              },
              {
                src: "/images/vision-lab/dinner.png",
                alt: "Shared dinner",
                className: "col-span-4 row-span-3",
                filter: "url(#evl-lift-strong)",
              },
              {
                src: "/images/vision-lab/breath.png",
                alt: "Breathwork practice",
                className: "col-span-2 row-span-3",
                filter: "url(#evl-lift-soft)",
              },
              {
                src: "/images/WhatsApp%20Image%202026-11-11%20at%2012.47.05.jpeg",
                alt: "Conversation during the gathering",
                className: "col-span-2 row-span-5",
              },
              {
                src: "/images/vision-lab/circle1.png",
                alt: "Evening circle",
                className: "col-span-4 row-span-5",
                filter: "url(#evl-lift-strong)",
              },
            ] as const
          ).map((img) => (
            <div key={img.src} className={`relative overflow-hidden ${img.className}`}>
              <img
                src={img.src}
                alt={img.alt}
                className="absolute inset-0 h-full w-full object-cover"
                style={"filter" in img ? { filter: img.filter } : undefined}
              />
            </div>
          ))}
        </div>
      </section>

      {/* Who for */}
      <section className="max-w-3xl mx-auto space-y-10">
        <motion.div {...fadeUp()} className="space-y-4">
          <p className="text-xs uppercase tracking-[0.3em] text-[#EB8064] font-semibold">
            Fit
          </p>
          <h2 className="text-3xl md:text-4xl font-black tracking-tight text-white leading-[1.1]">
            This lab is for you{" "}
            <span className="gradient-text">if…</span>
          </h2>
        </motion.div>
        <ul className="space-y-4">
          {content.whoFor.map((line, i) => (
            <motion.li
              key={line}
              {...fadeUp(i * 0.05)}
              className="flex gap-3 items-start text-white/60 text-base font-light leading-relaxed"
            >
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#EB8064]" aria-hidden />
              {line}
            </motion.li>
          ))}
        </ul>
        <ApplyButton />
      </section>

      {/* Facilitators */}
      {facilitators.length > 0 ? (
        <section id="guides" className="max-w-4xl mx-auto space-y-12 scroll-mt-28">
          <motion.div {...fadeUp()} className="space-y-4 text-center">
            <p className="text-xs uppercase tracking-[0.3em] text-[#EB8064] font-semibold">
              Facilitators
            </p>
            <h2 className="text-3xl md:text-4xl font-black tracking-tight text-white leading-[1.1]">
              Meet your{" "}
              <span className="gradient-text">guides.</span>
            </h2>
          </motion.div>
          <div className="divide-y divide-white/10">
            {facilitators.map((f, i) => (
              <motion.div key={f.name} {...fadeUp(i * 0.08)}>
                <Guide {...f} reversed={i % 2 === 1} />
              </motion.div>
            ))}
          </div>
        </section>
      ) : null}

      {/* Casa do Sol */}
      <section id="venue" className="scroll-mt-28 space-y-10 md:space-y-14">
        <motion.div
          {...fadeUp()}
          className="relative w-full max-w-5xl mx-auto aspect-[21/9] md:aspect-[24/9] overflow-hidden"
        >
          <img
            src="/images/casa.jpg"
            alt="Casa do Sol"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
        </motion.div>

        <div className="max-w-4xl mx-auto space-y-10">
          <motion.div {...fadeUp(0.05)} className="text-center space-y-4 max-w-xl mx-auto">
            <p className="text-xs uppercase tracking-[0.3em] text-[#EB8064] font-semibold">
              The venue
            </p>
            <h2 className="text-3xl md:text-4xl font-black tracking-tight text-white leading-[1.1]">
              Casa do <span className="gradient-text">Sol</span>
            </h2>
            <p className="text-white/55 text-base font-light leading-[1.85]">
              Located in Óbidos, Portugal, Casa do Sol is a sunny temple in the surroundings of the
              Artistic Medieval Village of the west coast. With beautiful spacious rooms, plenty of
              hangout areas and an inviting swimming pool, we are ready to receive you just as if it
              were your home.
            </p>
          </motion.div>

          <motion.div {...fadeUp(0.1)} className="space-y-1">
            <div className="flex flex-col md:flex-row gap-1 md:h-[420px]">
              <div className="relative md:flex-[1.4] h-56 md:h-auto overflow-hidden">
                <img
                  src="/images/sunlounge.jpeg"
                  alt="Sun lounge"
                  className="absolute inset-0 h-full w-full object-cover"
                />
              </div>
              <div className="md:flex-1 flex flex-col gap-1">
                <div className="relative h-44 md:flex-1 overflow-hidden">
                  <img
                    src="/images/library.jpeg"
                    alt="Library"
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                </div>
                <div className="relative h-44 md:flex-1 overflow-hidden">
                  <img
                    src="/images/INES-61.jpg"
                    alt="Casa do Sol space"
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-1">
              {[
                { src: "/images/INES-51.jpg", alt: "Casa do Sol interior" },
                { src: "/images/23.png", alt: "Casa do Sol view" },
                { src: "/images/INES-32.jpg", alt: "Casa do Sol room" },
              ].map((img) => (
                <div key={img.src} className="relative h-44 sm:h-52 overflow-hidden">
                  <img
                    src={img.src}
                    alt={img.alt}
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div {...fadeUp(0.12)} className="text-center">
            <a
              href="https://www.casadosolretreat.com/en"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-semibold text-[#EB8064] hover:text-white underline underline-offset-4 transition-colors"
            >
              Explore the venue
            </a>
          </motion.div>
        </div>
      </section>

      {/* Investment */}
      <section id="investment" className="max-w-3xl mx-auto scroll-mt-28 space-y-8">
        <motion.div {...fadeUp()} className="space-y-4 text-center">
          <p className="text-xs uppercase tracking-[0.3em] text-[#EB8064] font-semibold">
            The investment
          </p>
          <h2 className="text-[1.75rem] sm:text-3xl md:text-4xl font-black tracking-tight text-white leading-[1.1]">
            Shared or private.
          </h2>
        </motion.div>
        <div className="grid gap-3 sm:grid-cols-2">
          {[
            { label: "Shared", price: content.pricing.shared, color: "#EB8064" },
            { label: "Private", price: content.pricing.private, color: "#E4B4DC" },
          ].map((tier) => (
            <motion.div
              key={tier.label}
              {...fadeUp(0.06)}
              className="border border-white/10 px-6 py-7 text-center space-y-2"
            >
              <p
                className="text-[11px] uppercase tracking-[0.28em] font-semibold"
                style={{ color: tier.color }}
              >
                {tier.label}
              </p>
              <p className="text-4xl font-black tracking-tight text-white">{tier.price}</p>
            </motion.div>
          ))}
        </div>
        <motion.p
          {...fadeUp(0.1)}
          className="text-center text-white/55 text-sm sm:text-base font-light leading-relaxed max-w-xl mx-auto"
        >
          {content.pricing.includes}
        </motion.p>
        <ApplyButton />
      </section>

      {/* FAQ */}
      <section id="questions" className="max-w-2xl mx-auto space-y-10 scroll-mt-28">
        <motion.div {...fadeUp()} className="space-y-4">
          <p className="text-xs uppercase tracking-[0.3em] text-[#EB8064] font-semibold">
            Practical details
          </p>
          <h2 className="text-3xl md:text-4xl font-black tracking-tight text-white leading-[1.1]">
            Questions,{" "}
            <span className="gradient-text">answered.</span>
          </h2>
        </motion.div>
        <div className="divide-y divide-white/10">
          {content.faqs.map((faq, i) => (
            <motion.details key={faq.q} {...fadeUp(i * 0.03)} className="group py-5">
              <summary className="flex justify-between gap-4 cursor-pointer list-none font-medium text-base text-white/85 hover:text-white transition-colors">
                {faq.q}
                <span className="text-[#EB8064]/60 group-open:rotate-45 transition-transform shrink-0">
                  +
                </span>
              </summary>
              <p className="mt-3 text-sm font-light leading-relaxed text-white/50">{faq.a}</p>
            </motion.details>
          ))}
        </div>
      </section>

      {/* Apply */}
      <section id="apply" className="max-w-2xl mx-auto scroll-mt-28 space-y-10">
        <motion.div {...fadeUp()} className="space-y-4 text-center">
          <p className="text-xs uppercase tracking-[0.3em] text-[#EB8064] font-semibold">
            Apply
          </p>
          <h2 className="text-3xl md:text-4xl font-black tracking-tight text-white leading-[1.1]">
            Apply to join
            <br />
            <span className="gradient-text">Embodied Vision Lab.</span>
          </h2>
          <p className="text-white/55 text-base font-light leading-relaxed max-w-xl mx-auto">
            {content.form.intro}
          </p>
        </motion.div>
        <motion.div {...fadeUp(0.1)}>
          <EmbodiedVisionApplyForm />
        </motion.div>
        <motion.p {...fadeUp()} className="text-center text-white/35 text-xs font-light leading-relaxed max-w-md mx-auto">
          Embodied Vision Lab is application-based. Submitting does not reserve a place or collect
          payment.
        </motion.p>
        <p className="text-center text-white/25 text-xs font-light">
          <a href="/embodied-vision-lab/editorial" className="underline underline-offset-4 hover:text-white/45 transition-colors">
            Editorial sketch
          </a>
        </p>
      </section>
      </div>
    </div>
  );
}
