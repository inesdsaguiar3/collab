"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

const JOIN_LINK = "/creators-club/join";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 22 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { delay, duration: 0.65, ease: "easeOut" as const },
});

const WRITING_STEPS = [
  { title: "Declutter", body: "Movement, breath, flow writing — shake off the week and arrive." },
  { title: "Create", body: "From prompt to flow. Uninterrupted time to let creativity expand with no goal or expectation." },
  { title: "Share", body: "Coming together. Get inspired by the community. The circle holds what you create." },
] as const;

const GATHERING_SLIDES = [
  {
    id: "ines",
    label: "Ritual of Creativity",
    host: "with Inês",
    type: "steps" as const,
  },
  {
    id: "tim",
    label: "Contemplation Club",
    host: "with Tim",
    type: "prose" as const,
  },
] as const;

function GatheringsCarousel() {
  const [index, setIndex] = useState(0);
  const slide = GATHERING_SLIDES[index];
  const timerRef = useRef<number | null>(null);

  const goTo = useCallback((nextIndex: number) => {
    setIndex((nextIndex + GATHERING_SLIDES.length) % GATHERING_SLIDES.length);
  }, []);

  const prev = useCallback(() => {
    setIndex((i) => (i - 1 + GATHERING_SLIDES.length) % GATHERING_SLIDES.length);
  }, []);

  const next = useCallback(() => {
    setIndex((i) => (i + 1) % GATHERING_SLIDES.length);
  }, []);

  useEffect(() => {
    const startTimer = () => {
      if (timerRef.current !== null) window.clearInterval(timerRef.current);
      timerRef.current = window.setInterval(next, 9000);
    };

    startTimer();
    return () => {
      if (timerRef.current !== null) window.clearInterval(timerRef.current);
    };
  }, [next, index]);

  return (
    <section className="max-w-3xl mx-auto mt-28 space-y-10">
      <div className="relative min-h-[280px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={slide.id}
            initial={{ opacity: 0, x: 28 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -28 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="space-y-10"
          >
            {slide.type === "steps" ? (
              <>
                <div className="text-center space-y-2">
                  <p className="text-[#EB8064] text-2xl md:text-3xl font-black tracking-tight">
                    Ritual of Creativity
                  </p>
                  <p className="text-white/35 text-sm font-light">with Inês</p>
                </div>

                <div className="flex flex-col md:flex-row items-start gap-6 md:gap-0">
                  {WRITING_STEPS.map(({ title, body }, i) => (
                    <div key={title} className="contents">
                      <div className="flex-1 space-y-2 md:px-4 text-center md:text-left">
                        <h3 className="text-lg font-black text-white tracking-tight">{title}</h3>
                        <p className="text-white/50 text-sm leading-relaxed">{body}</p>
                      </div>
                      {i < WRITING_STEPS.length - 1 && (
                        <span className="hidden md:block self-center text-white/15 text-xl shrink-0" aria-hidden>›</span>
                      )}
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <div className="space-y-8 text-center max-w-xl mx-auto">
                <div className="space-y-2">
                  <p className="text-[#EB8064] text-2xl md:text-3xl font-black tracking-tight">
                    Contemplation Club
                  </p>
                  <p className="text-white/35 text-sm font-light">with Tim</p>
                </div>

                <div className="space-y-5 text-white/55 text-sm md:text-base font-light leading-[1.9]">
                  <p>
                    Each thought we witness, each emotion we soften toward, each story we release, and each new perspective we allow becomes an act of creation.
                  </p>
                  <p>
                    Through contemplation, meeting the wisdom teachers, and shared inquiry, we create space to loosen the patterns that keep us stuck and reconnect with the creative intelligence that has been present all along.
                  </p>
                  <p className="text-white/75 text-lg font-light">From that place, creativity is no longer something we do.</p>
                  <p className="text-white text-xl md:text-2xl font-light leading-snug">
                    It becomes a way of being.
                  </p>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="flex items-center justify-center gap-4">
        <button
          type="button"
          onClick={prev}
          className="w-10 h-10 rounded-full border border-white/20 bg-white/5 text-white/80 flex items-center justify-center shrink-0 hover:bg-white/10 transition-colors"
          aria-label="Previous gathering"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        <div className="flex items-center gap-2">
          {GATHERING_SLIDES.map((s, i) => (
            <button
              key={s.id}
              type="button"
              onClick={() => goTo(i)}
              className={`h-2 rounded-full transition-all ${
                i === index ? "w-7 bg-[#EB8064]" : "w-2 bg-white/25 hover:bg-white/40"
              }`}
              aria-label={`Show ${s.label}`}
              aria-pressed={i === index}
            />
          ))}
        </div>

        <button
          type="button"
          onClick={next}
          className="w-10 h-10 rounded-full border border-white/20 bg-white/5 text-white/80 flex items-center justify-center shrink-0 hover:bg-white/10 transition-colors"
          aria-label="Next gathering"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </section>
  );
}

const INES_BIO =
  "Inês is a Breathwork, Somatics and Meditation facilitator and the founder of Co-llab. Her passion is creating spaces for expansion by nurturing awareness, connection and a more intentional rhythm of living and working together. Her background in Somatic & Rebirthing Breathwork, Meditation, Energy healing, and Trauma-Aware spaceholding informs how she holds the field — with sensitivity, aliveness and trust.";

const LAURA_BIO =
  "Laura is a regenerative facilitator working with inner-led change and authentic relating. Through her Table concept, she guides cooking as a practice of presence, collaboration and creativity — listening to ingredients, to our senses, and to one another.";

const GALA_BIO =
  "Gala is a singer-songwriter and poet from northern Spain who writes vulnerable, dark, funny poems about her weird parents and her place in the world.";

const CO_CREATORS = [
  {
    name: "Inês",
    subtitle: "Breathwork, Somatics & Creativity",
    image: "/images/retreats/profile.JPG",
    bio: INES_BIO,
  },
  {
    name: "Tim",
    subtitle: "Gene Keys & Contemplation",
    image: "/images/Tim.jpg",
    bio:
      "Tim guides people home to themselves — reconnecting with their center and embodying their gifts in daily life, work, and relationships. His work weaves Gene Keys, somatic self-regulation, re-parenting, and inner parts work. He values pausing: when we slow down and listen, we meet inner wisdom and move with more ease, trust, and creative power.",
  },
  {
    name: "Laura",
    subtitle: "Full Moon Circle · the Table",
    image: "/images/laura.jpeg",
    bio: LAURA_BIO,
  },
  {
    name: "Gala",
    subtitle: "Singer-songwriter & Poet",
    image: "/images/gala-portrait.jpg",
    bio: GALA_BIO,
  },
] as const;

const EXTRA_GATHERINGS = [
  {
    title: "Full Moon Women's Circle",
    when: "Monthly · Mondays 7pm",
    body: "Ritual of letting go, passing thresholds, and connecting to a natural rhythm — cycles, wild sides, and tender parts. Archetypes, release, and movement that awaken aliveness and the Feminine.",
  },
  {
    title: "Creativity Book Club",
    when: "Monthly · Thursdays 5.30pm",
    body: "Reading together to deepen creativity, inspiration, and contemplation — shared pages, shared reflections.",
  },
] as const;

function CoCreatorFlipCard({
  name,
  subtitle,
  image,
  bio,
  imagePosition = "object-center",
}: {
  name: string;
  subtitle: string;
  image: string;
  bio: string;
  imagePosition?: string;
}) {
  const [flipped, setFlipped] = useState(false);

  return (
    <article className="text-center space-y-4">
      <button
        type="button"
        aria-label={`${name}, ${subtitle}. ${flipped ? "Show photo" : "Read bio"}`}
        aria-pressed={flipped}
        onClick={() => setFlipped((v) => !v)}
        className="group relative block w-full max-w-[280px] mx-auto aspect-[3/4] text-left [perspective:1200px] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#EB8064]/60 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent rounded-2xl"
      >
        <div
          className={`relative h-full w-full transition-transform duration-700 [transform-style:preserve-3d] ${
            flipped ? "[transform:rotateY(180deg)]" : ""
          } md:group-hover:[transform:rotateY(180deg)]`}
        >
          <div className="absolute inset-0 overflow-hidden rounded-2xl border border-white/10 [backface-visibility:hidden] shadow-lg">
            <img
              src={image}
              alt=""
              className={`absolute inset-0 h-full w-full object-cover ${imagePosition}`}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
            <p className="absolute bottom-4 inset-x-0 text-center text-[10px] uppercase tracking-[0.2em] text-white/35 font-semibold md:hidden">
              Tap for bio
            </p>
          </div>

          <div className="absolute inset-0 flex flex-col justify-center overflow-hidden rounded-2xl border border-[#EB8064]/35 bg-gradient-to-br from-[#3a2430] via-[#2a1c28] to-[#1a1218] p-5 md:p-6 [backface-visibility:hidden] [transform:rotateY(180deg)] shadow-lg overflow-y-auto">
            <p className="text-white/65 text-xs md:text-sm font-light leading-relaxed">{bio}</p>
          </div>
        </div>
      </button>

      <div className="space-y-1">
        <h3 className="text-lg font-black text-white tracking-tight">{name}</h3>
        <p className="text-[#EB8064] text-[10px] uppercase tracking-[0.2em] font-semibold">{subtitle}</p>
      </div>
    </article>
  );
}

export default function CreatorsClubPage() {
  return (
    <div className="px-6 py-20 min-h-screen">

      {/* 1 ── HERO ──────────────────────────────────────────── */}
      <section className="max-w-2xl mx-auto pt-10 space-y-8">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.7 }}
          className="text-5xl md:text-6xl font-black tracking-tight text-white leading-[1.08]"
        >
          The Creators&apos; Lab<span className="text-[#EB8064]">.</span><br />
          <span className="gradient-text">A Ritual of Creativity.</span>
        </motion.h1>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5, duration: 0.6 }}>
          <a
            href={JOIN_LINK}
            className="inline-block px-8 py-4 rounded-full font-semibold text-white bg-gradient-to-r from-[#7F5AA1] to-[#D16678] hover:opacity-90 hover:scale-105 transition-all duration-200 shadow-xl shadow-[#7F5AA1]/20"
          >
            Join the Lab ✦
          </a>
        </motion.div>
      </section>

      {/* 2 ── A SPACE OF CREATION ───────────────────────────── */}
      <section className="max-w-3xl mx-auto mt-24 space-y-10">
        <motion.p {...fadeUp()} className="text-[#EB8064] text-xs uppercase tracking-[0.3em] font-semibold">
          A Space of Creation
        </motion.p>

        <div className="grid md:grid-cols-2 gap-10 items-start">
          <div className="space-y-8">
            <motion.p {...fadeUp(0.05)} className="text-white/55 text-2xl font-light leading-snug">
              Whatever you&apos;ve been wanting to create —
            </motion.p>

            <motion.p {...fadeUp(0.08)} className="text-white text-4xl md:text-5xl font-black tracking-tight leading-tight">
              this is your space.
            </motion.p>

            <motion.p {...fadeUp(0.12)} className="text-white/55 text-base font-light leading-loose tracking-wide">
              Calling in the poets&nbsp;·&nbsp;the artists&nbsp;·&nbsp;the idealists&nbsp;·&nbsp;the writers&nbsp;·&nbsp;the singers&nbsp;·&nbsp;the entrepreneurs&nbsp;·&nbsp;the dreamers&nbsp;·&nbsp;and those still searching
            </motion.p>

            <motion.p {...fadeUp(0.2)} className="text-white/70 text-2xl md:text-3xl font-light leading-snug">
              The thing stopping you from creating might be exactly what you&apos;re meant to create.
            </motion.p>
          </div>

          <motion.div {...fadeUp(0.08)} className="rounded-3xl overflow-hidden aspect-[3/4]">
            <video src="/images/creators/IMG_2623.MOV" autoPlay muted loop playsInline className="w-full h-full object-cover" />
          </motion.div>
        </div>
      </section>

      {/* 3 ── ORIGIN ──────────────────────────────────────────── */}
      <section className="max-w-4xl mx-auto mt-28">
        <div className="grid md:grid-cols-2 gap-12 items-start">
          <motion.div {...fadeUp()} className="rounded-2xl overflow-hidden aspect-[3/4]">
            <img src="/images/writer.JPG" alt="Inês writing" className="w-full h-full object-cover" />
          </motion.div>
          <div className="space-y-6 md:pt-4">
            <motion.div {...fadeUp(0.05)}>
              <h2 className="text-xs uppercase tracking-[0.3em] text-[#EB8064] font-semibold">How It Began</h2>
            </motion.div>
            <motion.div {...fadeUp(0.1)} className="space-y-5 text-white/55 text-base font-light leading-relaxed">
              <p className="text-white/75 font-normal">This space began as an extension of our in person immersions. We wanted a space to keep creating and growing together.</p>
              <p className="text-white/80">I thrive in creating spaces that bring clarity, ease and inspiration. The Creators&apos; Lab is an experiment to recreate these qualities in whatever space you happen to be in.</p>
              <div className="pt-6" />
              <p>Sitting down in a cozy corner with a cup of cacao, a good book and pen and paper is what I crave when I need to reconnect.</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── ALL OF YOU ── */}
      <section className="max-w-2xl mx-auto mt-20 space-y-8">
        <motion.p {...fadeUp()} className="text-white text-2xl md:text-3xl font-light leading-snug">
          How do you find your flow?<br />How do you stay connected with your truth as you create?
        </motion.p>
        <motion.div {...fadeUp(0.08)} className="space-y-5 text-white/55 text-base font-light leading-[1.85]">
          <p>
            By acknowledging that all parts of you have the right and space to exist. I believe there&apos;s no such thing as lack of alignment — there&apos;s just inner parts that want to be heard and feel safe before you dive into deeper realms.
          </p>
          <p className="text-white/65">All of you is creativity. It&apos;s just that some parts have not learnt how to express yet.</p>
          <p className="text-white font-semibold text-lg">Here&apos;s the space for all of you.</p>
        </motion.div>
      </section>

      {/* 7 ── PRACTICAL ───────────────────────────────────────── */}
      <section className="max-w-2xl mx-auto mt-28 w-full min-w-0">
        <div className="flex flex-col sm:flex-row items-stretch gap-4 w-full">
          <motion.div
            {...fadeUp()}
            className="glass rounded-2xl border border-white/10 px-5 py-6 sm:px-7 flex flex-col justify-center gap-2 flex-1 min-w-0"
          >
            <div className="space-y-2 text-white/65 text-sm sm:text-base font-light leading-relaxed">
              <p>Every other Thursday · Online · 1 hour</p>
              <p>Recording available · WhatsApp community</p>
              <p className="text-white/80">Donation-based — give what feels right.</p>
            </div>
          </motion.div>

          <motion.div {...fadeUp(0.05)} className="w-full sm:w-[280px] aspect-square sm:h-auto rounded-2xl overflow-hidden shrink-0 self-center">
            <video src="/images/creators/IMG_2253.MOV" autoPlay muted loop playsInline className="w-full h-full object-cover" />
          </motion.div>
        </div>
      </section>

      <GatheringsCarousel />

      {/* ── ALSO IN THE LAB (extras) ──────────────────────────── */}
      <section className="max-w-4xl mx-auto mt-16 space-y-5">
        <motion.p {...fadeUp()} className="text-center text-white/30 text-[11px] uppercase tracking-[0.28em] font-semibold">
          Also in the Lab
        </motion.p>
        <div className="grid md:grid-cols-2 gap-5">
          {EXTRA_GATHERINGS.map((extra, i) => (
            <motion.div
              key={extra.title}
              {...fadeUp(i * 0.06)}
              className="glass rounded-2xl border border-white/10 px-6 py-6 md:px-7 md:py-7 space-y-3"
            >
              <p className="text-white text-lg font-semibold tracking-tight leading-snug">{extra.title}</p>
              <p className="text-white/45 text-sm font-light">{extra.when}</p>
              <p className="text-white/60 text-sm md:text-base font-light leading-relaxed">{extra.body}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 6 ── CO-CREATORS ─────────────────────────────────────── */}
      <section className="max-w-5xl mx-auto mt-28 space-y-10">
        <motion.div {...fadeUp()} className="max-w-2xl space-y-4">
          <h2 className="text-xs uppercase tracking-[0.3em] text-[#EB8064] font-semibold">
            Co-creators
          </h2>
          <div className="h-[2px] w-full rounded-full" style={{ background: "linear-gradient(to right, #EB8064, #7F5AA1, #D16678)" }} />
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-8 max-w-5xl mx-auto">
          {CO_CREATORS.map((creator, i) => (
            <motion.div key={creator.name} {...fadeUp(i * 0.08)}>
              <CoCreatorFlipCard {...creator} />
            </motion.div>
          ))}
        </div>
      </section>

      {/* 8 ── CLOSING ────────────────────────────────────────── */}
      <section className="max-w-2xl mx-auto mt-28 pb-10 space-y-8">
        <motion.div {...fadeUp()} className="space-y-4">
          <p className="text-white/45 text-lg font-light">You were never meant to do it alone.</p>
          <p className="text-white text-2xl md:text-3xl font-black tracking-tight">There&apos;s a circle waiting for you.</p>
        </motion.div>
        <motion.div {...fadeUp(0.1)}>
          <a href={JOIN_LINK} className="inline-block px-8 py-4 rounded-full font-semibold text-white bg-gradient-to-r from-[#7F5AA1] to-[#D16678] hover:opacity-90 hover:scale-105 transition-all duration-200 shadow-xl shadow-[#7F5AA1]/20">
            Join the Lab ✦
          </a>
        </motion.div>
        <motion.div {...fadeUp(0.15)} className="pt-8 border-t border-white/[0.07] space-y-3">
          <p className="text-white/65 text-lg font-light leading-relaxed">
            Want to take it to the next level?
          </p>
          <p className="text-white/45 text-base font-light leading-relaxed">
            We gather in person for retreats, labs and colivings in Portugal.{" "}
            <a href="/retreats" className="text-white/70 underline underline-offset-4 hover:text-white transition-colors">
              See retreats &amp; labs →
            </a>
          </p>
        </motion.div>
      </section>

    </div>
  );
}
