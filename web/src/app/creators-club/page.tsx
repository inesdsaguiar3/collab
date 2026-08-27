"use client";

import { Fragment, useState } from "react";
import { motion } from "framer-motion";

const JOIN_LINK = "/creators-club/join";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 22 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { delay, duration: 0.65, ease: "easeOut" as const },
});

const SESSION_STEPS = [
  { title: "Declutter", body: "Movement, breath, flow writing — shake off the week and arrive." },
  { title: "Create", body: "From prompt to flow. Uninterrupted time to let creativity expand with no goal or expectation." },
  { title: "Share", body: "Coming together. Get inspired by the community. The circle holds what you create." },
] as const;

const PRACTICES = [
  {
    title: "Ritual of Creativity",
    teaser: "Declutter, create, and share.",
    body: "A living practice of arriving in flow together. Weekly online gatherings to shake off the week and let creativity move through you.",
    image: "/images/creators/writer.JPG",
    with: "with Inês",
  },
  {
    title: "Wisdom Keepers",
    teaser: "Contemplation with Gene Keys.",
    body: "Contemplation clubs based on the Gene Keys card deck — doorways into knowing, presence, and quiet transmission. We sit with the cards and let wisdom unfold together.",
    image: "/images/creators/wisdom-keepers.jpg",
    with: "with Tim",
  },
  {
    title: "Book Club",
    teaser: "Reading as creative practice.",
    body: "Reading together to deepen the practice of creativity, inspiration, and contemplation. Shared pages, shared reflections — books as companions on the path.",
    image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=800&q=80",
    with: "with Gala & Inês",
  },
  {
    title: "Sacred Circles",
    teaser: "Women's & men's circles.",
    body: "Women's and men's circles — spaces of sharing and holding, where we meet as we are. Honest presence, mutual care, and room to be fully seen.",
    image: "/images/WOMEN.png",
    with: "with Inês & Ben",
  },
] as const;

const CO_CREATORS = [
  {
    name: "Inês",
    role: "Co-creator",
    image: "/images/INES-152.jpeg",
  },
  {
    name: "Tim",
    role: "Co-creator",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80",
  },
  {
    name: "Gala",
    role: "Co-creator",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=600&q=80",
  },
  {
    name: "Ben",
    role: "Co-creator",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=600&q=80",
  },
] as const;

function PracticeFlipCard({
  title,
  teaser,
  body,
  image,
  with: withHosts,
}: {
  title: string;
  teaser: string;
  body: string;
  image: string | null;
  with: string;
}) {
  const [flipped, setFlipped] = useState(false);

  return (
    <button
      type="button"
      aria-label={`${title}. ${flipped ? "Show front" : "Show more"}`}
      aria-pressed={flipped}
      onClick={() => setFlipped((v) => !v)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          setFlipped((v) => !v);
        }
      }}
      className="group relative block w-full h-[320px] md:h-[380px] text-left [perspective:1200px] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#EB8064]/60 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent rounded-2xl"
    >
      <div
        className={`relative h-full w-full transition-transform duration-700 [transform-style:preserve-3d] ${
          flipped ? "[transform:rotateY(180deg)]" : ""
        } md:group-hover:[transform:rotateY(180deg)]`}
      >
        {/* Front */}
        <div className="absolute inset-0 overflow-hidden rounded-2xl border border-white/10 [backface-visibility:hidden]">
          {image ? (
            <>
              <img src={image} alt="" className="absolute inset-0 h-full w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-black/10" />
            </>
          ) : (
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(160deg, rgba(127,90,161,0.55) 0%, rgba(42,28,40,0.95) 48%, rgba(26,18,24,1) 100%)",
              }}
            />
          )}
          <div className="absolute inset-x-0 bottom-0 p-5 md:p-6 flex flex-col gap-2">
            <h3 className="min-h-[1.75rem] text-lg md:text-xl font-black text-white tracking-tight leading-tight">
              {title}
            </h3>
            <p className="min-h-[2.5rem] text-white/70 text-sm font-light leading-snug">{teaser}</p>
            <p className="text-[#EB8064]/90 text-xs font-medium tracking-wide">{withHosts}</p>
            <p className="text-[10px] uppercase tracking-[0.2em] text-white/35 font-semibold md:hidden">
              Tap for more
            </p>
          </div>
        </div>

        {/* Back */}
        <div className="absolute inset-0 flex flex-col justify-between overflow-hidden rounded-2xl border border-[#EB8064]/35 bg-gradient-to-br from-[#3a2430] via-[#2a1c28] to-[#1a1218] p-5 md:p-6 [backface-visibility:hidden] [transform:rotateY(180deg)]">
          <div className="space-y-3">
            <p className="text-[10px] uppercase tracking-[0.22em] text-[#EB8064] font-semibold">
              Practice
            </p>
            <h3 className="min-h-[1.75rem] text-lg md:text-xl font-black text-white tracking-tight leading-tight">
              {title}
            </h3>
            <p className="text-white/65 text-sm font-light leading-relaxed">{body}</p>
          </div>
          <p className="text-[#EB8064]/90 text-xs font-medium tracking-wide pt-4">{withHosts}</p>
        </div>
      </div>
    </button>
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
          <span className="gradient-text">A living container.</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.6 }}
          className="text-white/50 text-base font-light leading-relaxed max-w-xl"
        >
          Ritual of Creativity, Wisdom Keepers, Book Club, and Sacred Circles — practices that deepen how we create, relate, and remember.
        </motion.p>
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
          {/* text column */}
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

          {/* video column */}
          <motion.div {...fadeUp(0.08)} className="rounded-3xl overflow-hidden aspect-[3/4]">
            <video src="/images/creators/IMG_2623.MOV" autoPlay muted loop playsInline className="w-full h-full object-cover" />
          </motion.div>
        </div>

      </section>

      {/* 3 ── ORIGIN ──────────────────────────────────────────── */}
      <section className="max-w-4xl mx-auto mt-28">
        <div className="grid md:grid-cols-2 gap-12 items-start">
          <motion.div {...fadeUp()} className="rounded-2xl overflow-hidden aspect-[3/4]">
            <img src="/images/writer.JPG" alt="Inês writing at Seeds of Dreams" className="w-full h-full object-cover" />
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

      {/* 5 ── THE CONTAINER ──────────────────────────────────── */}
      <section className="max-w-5xl mx-auto mt-28 space-y-10">
        <motion.div {...fadeUp()} className="max-w-2xl space-y-4">
          <h2 className="text-xs uppercase tracking-[0.3em] text-[#EB8064] font-semibold">The Container</h2>
          <div className="h-[2px] w-full rounded-full" style={{ background: "linear-gradient(to right, #EB8064, #7F5AA1, #D16678)" }} />
          <p className="text-white/55 text-base font-light leading-relaxed pt-2">
            One circle of practices — ways of meeting creativity, contemplation, deeper into ourselves and each other.
          </p>
        </motion.div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
          {PRACTICES.map((practice, i) => (
            <motion.div key={practice.title} {...fadeUp(i * 0.08)}>
              <PracticeFlipCard {...practice} />
            </motion.div>
          ))}
        </div>
      </section>

      {/* 6 ── EACH SESSION (Ritual of Creativity) ─────────────── */}
      <section className="max-w-2xl mx-auto mt-28 space-y-10">
        <motion.div {...fadeUp()} className="space-y-4">
          <h2 className="text-xs uppercase tracking-[0.3em] text-[#EB8064] font-semibold">
            Ritual of Creativity · Each Session
          </h2>
          <div className="h-[2px] w-full rounded-full" style={{ background: "linear-gradient(to right, #EB8064, #7F5AA1, #D16678)" }} />
        </motion.div>
        <div className="flex flex-col md:flex-row items-start gap-6 md:gap-0">
          {SESSION_STEPS.map(({ title, body }, i) => (
            <Fragment key={title}>
              <motion.div {...fadeUp(i * 0.1)} className="flex-1 space-y-3 md:pr-6">
                <h3 className="text-xl font-black text-white tracking-tight">{title}</h3>
                <p className="text-white/50 text-sm leading-relaxed">{body}</p>
              </motion.div>
              {i < SESSION_STEPS.length - 1 && (
                <motion.span {...fadeUp(i * 0.1 + 0.05)} className="self-center text-white/15 text-xl shrink-0 rotate-90 md:rotate-0 md:px-2" aria-hidden>›</motion.span>
              )}
            </Fragment>
          ))}
        </div>
      </section>

      {/* 7 ── PRACTICAL + EXCHANGE ───────────────────────────── */}
      <section className="max-w-2xl mx-auto mt-28">
        <div className="flex items-stretch gap-4 w-fit">
          {/* card */}
          <motion.div
            {...fadeUp()}
            className="glass rounded-2xl border border-white/10 px-7 py-6 flex flex-col justify-center gap-2 shrink-0"
          >
            <div className="space-y-2 text-white/65 text-base font-light leading-relaxed">
              <p>Online · WhatsApp community · Recording available</p>
              <p>Ritual of Creativity · Wisdom Keepers</p>
              <p>Book Club · Sacred Circles</p>
              <p className="text-white/80">Donation-based — give what feels right.</p>
            </div>
          </motion.div>

          {/* square video */}
          <motion.div {...fadeUp(0.05)} className="w-[300px] h-[300px] rounded-2xl overflow-hidden shrink-0 self-center">
            <video src="/images/creators/IMG_2253.MOV" autoPlay muted loop playsInline className="w-full h-full object-cover" />
          </motion.div>
        </div>
      </section>

      {/* 8 ── CO-CREATORS ─────────────────────────────────────── */}
      <section className="max-w-5xl mx-auto mt-28 space-y-10">
        <motion.div {...fadeUp()} className="max-w-2xl space-y-4">
          <h2 className="text-xs uppercase tracking-[0.3em] text-[#EB8064] font-semibold">
            Co-creators
          </h2>
          <div className="h-[2px] w-full rounded-full" style={{ background: "linear-gradient(to right, #EB8064, #7F5AA1, #D16678)" }} />
          <p className="text-white/55 text-base font-light leading-relaxed pt-2">
            Four of us holding this space — creating, listening, and growing with the circle.
          </p>
        </motion.div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
          {CO_CREATORS.map(({ name, role, image }, i) => (
            <motion.article
              key={name}
              {...fadeUp(i * 0.08)}
              className="space-y-3"
            >
              <div className="aspect-[3/4] overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03]">
                <img
                  src={image}
                  alt={name}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="space-y-0.5 px-0.5">
                <h3 className="text-lg font-black text-white tracking-tight">{name}</h3>
                <p className="text-xs uppercase tracking-[0.18em] text-white/40 font-semibold">{role}</p>
              </div>
            </motion.article>
          ))}
        </div>
      </section>

      {/* 9 ── CLOSING ────────────────────────────────────────── */}
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
