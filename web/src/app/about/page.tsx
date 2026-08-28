"use client";

import { motion } from "framer-motion";
import Link from "next/link";
const values = [
  { title: "Co-creation", desc: "Building together with shared intention and collective leadership." },
  { title: "Expansion", desc: "Growing in awareness, possibility, and personal capacity." },
  { title: "Community", desc: "Choosing belonging, care, and togetherness over isolation." },
  { title: "Social awareness", desc: "Staying awake to our impact and responsible to the wider world." },
  { title: "Connection", desc: "Reconnecting to self, to others, and to what matters most." },
  { title: "Expression", desc: "Honoring truth through creativity, movement, voice, and presence." },
  { title: "Communication", desc: "Speaking with clarity, listening deeply, and meeting with openness." },
  { title: "Authenticity", desc: "Showing up honestly and living from what is real." },
];

const inesBio =
  "Deeply human. I feel things deeply and empower others to do it too — to embrace the gift of sensitivity and move through life with aliveness rather than numbness.";

/**
 * Full “Meet the Team” grid (all entries in `team`). Flip to `true` when you’re ready to show everyone again.
 */
const SHOW_MEET_THE_TEAM = false;

const team = [
  {
    name: "Inês Rosa",
    role: "Founder & Curator",
    image: "/images/retreats/profile.JPG",
    bio: inesBio,
    focusLine: "somatic self-inquiry, breathwork, movement, teacher, writer",
  },
  { name: "Elena Sol", role: "Founder & Visionary", image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&q=80" },
  { name: "Marcus Chen", role: "Head of Experience", image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80" },
  { name: "Amara Osei", role: "Community Lead", image: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=400&q=80" },
];

const inesRosaMember = team.find((m) => m.name === "Inês Rosa");

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: "easeOut" as const },
  }),
};

type TeamMember = (typeof team)[number];

function TeamMemberCard({ member, idx }: { member: TeamMember; idx: number }) {
  const hasBio = "bio" in member && member.bio;

  if (!hasBio) {
    return (
      <motion.div
        key={member.name}
        custom={idx}
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="group text-center space-y-4"
      >
        <div className="relative aspect-square rounded-2xl overflow-hidden mx-auto">
          <img
            src={member.image}
            alt={member.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
        <div>
          <h3 className="font-bold text-white">{member.name}</h3>
          <p className="text-[#EB8064] text-xs uppercase tracking-wider mt-0.5">{member.role}</p>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      key={member.name}
      custom={idx}
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="text-center space-y-4"
    >
      <div
        tabIndex={0}
        className="group w-full max-w-[280px] mx-auto rounded-2xl focus:outline-none focus-visible:ring-2 focus-visible:ring-[#EB8064]/70 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0f]"
        aria-label={`${member.name}, ${member.role}. Hover or focus this card to read bio.`}
      >
        <div className="[perspective:1000px]">
          <div className="relative aspect-square transition-transform duration-700 ease-out [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)] group-focus-within:[transform:rotateY(180deg)] motion-reduce:transition-none motion-reduce:group-hover:[transform:none] motion-reduce:group-focus-within:[transform:none]">
            <div className="absolute inset-0 rounded-2xl overflow-hidden border border-white/10 [backface-visibility:hidden] shadow-lg">
              <img src={member.image} alt="" className="w-full h-full object-cover" aria-hidden />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent pointer-events-none" />
            </div>
            <div className="absolute inset-0 rounded-2xl overflow-hidden border border-white/10 glass p-5 flex flex-col justify-center text-left [backface-visibility:hidden] [transform:rotateY(180deg)] shadow-lg overflow-y-auto">
              <p className="text-white/85 text-xs leading-relaxed">{member.bio}</p>
            </div>
          </div>
        </div>
      </div>
      <div>
        <h3 className="font-bold text-white">{member.name}</h3>
        <p className="text-[#EB8064] text-xs uppercase tracking-wider mt-0.5">{member.role}</p>
        {"focusLine" in member && member.focusLine ? (
          <p className="text-[#EB8064] text-[10px] sm:text-[11px] leading-snug mt-2 max-w-[260px] mx-auto font-medium tracking-wide">
            {member.focusLine}
          </p>
        ) : null}
      </div>
    </motion.div>
  );
}

export default function AboutPage() {
  return (
    <div className="px-6 py-20 space-y-32">
      {/* Header */}
      <section className="max-w-5xl mx-auto text-center space-y-8 pt-10">
        <motion.div initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <span className="text-xs uppercase tracking-[0.3em] text-[#EB8064] font-semibold">Our Story</span>
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.7 }}
          className="text-5xl md:text-7xl font-black tracking-tight text-white leading-none"
        >
          Born from a desire<br />
          <span className="gradient-text">to belong.</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.7 }}
          className="text-white/50 text-xl max-w-2xl mx-auto leading-relaxed"
        >
          We asked a simple question: what if life could be designed around connection rather than isolation?
        </motion.p>
      </section>

      {/* Story */}
      <section className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="space-y-6 text-white/60 text-lg leading-relaxed"
        >
          <h2 className="text-3xl md:text-4xl font-black text-white">Why Co-llab Exists</h2>
          <p>
            It started with a few friends, a shared house, and the realization that everything flows better when you're surrounded by people who truly see you.
          </p>
          <p>
            From humble retreat gatherings to a global movement, Co-llab has grown into a network of spaces and experiences that honor the deep human need for community, creativity, and meaning.
          </p>
          <p>
            Today we curate retreats, co-living spaces and gatherings in our favorite places around the world, and an online member community that spans borders.
          </p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="relative aspect-[4/5] rounded-3xl overflow-hidden"
        >
          <img
            src="/images/retreats/IMG_8185.JPG"
            alt="Co-llab community together at Casa do Sol"
            className="w-full h-full object-cover"
            style={{ objectPosition: "center center" }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        </motion.div>
      </section>

      {/* Coming together manifesto */}
      <section className="max-w-4xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65, ease: "easeOut" }}
          className="relative rounded-[1.75rem] md:rounded-[2rem] overflow-hidden border border-white/[0.12] bg-gradient-to-b from-white/[0.07] to-white/[0.02] shadow-[0_24px_80px_-20px_rgba(0,0,0,0.55)]"
        >
          <div
            className="h-1 w-full bg-gradient-to-r from-[#EB8064] via-[#D16678] to-[#7F5AA1]"
            aria-hidden
          />
          <div className="absolute -top-24 -right-24 w-64 h-64 rounded-full bg-[#EB8064]/[0.08] blur-3xl pointer-events-none" />
          <div className="absolute -bottom-20 -left-16 w-56 h-56 rounded-full bg-[#7F5AA1]/[0.07] blur-3xl pointer-events-none" />

          <div className="relative px-8 py-12 md:px-14 md:py-16 text-center">
            <p className="text-white text-[1.65rem] sm:text-2xl md:text-3xl lg:text-[2.1rem] font-black leading-[1.15] tracking-tight max-w-[22ch] mx-auto">
              There’s nothing more powerful than{" "}
              <span className="gradient-text">coming together.</span>
            </p>

            <ul className="mt-12 md:mt-14 space-y-5 md:space-y-6 text-left max-w-xl mx-auto list-none">
              {[
                "Coming together to feel and get in touch with the parts of us that have been hidden.",
                "Coming together to celebrate life.",
                "Coming together to share the weight of pain.",
                "Coming together to empower change.",
                "Coming together to create the world we want to live in.",
                "No matter where you are, you are not alone.",
              ].map((line) => (
                <li key={line} className="flex gap-4 items-start">
                  <span
                    className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gradient-to-br from-[#EB8064] to-[#D16678] ring-2 ring-[#EB8064]/25"
                    aria-hidden
                  />
                  <span className="text-white/72 text-base md:text-lg leading-relaxed font-light">{line}</span>
                </li>
              ))}
            </ul>

            <p className="mt-12 md:mt-14 text-white text-xl sm:text-2xl md:text-3xl font-black tracking-tight">
              Let’s <span className="gradient-text">come together.</span>
            </p>
          </div>
        </motion.div>
      </section>

      {/* Values — layout aligned with co-living (two-column, left rule) */}
      <section id="core-values" className="max-w-5xl mx-auto space-y-10 scroll-mt-28">
        <div className="text-center">
          <span className="text-xs uppercase tracking-[0.3em] text-[#EB8064] font-semibold block mb-4">What We Stand For</span>
          <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight">Our Core Values</h2>
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          {values.map((v, idx) => (
            <motion.div
              key={v.title}
              custom={idx}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="p-5"
              style={{ borderLeft: "1px solid rgba(255,255,255,0.2)" }}
            >
              <p className="text-white font-semibold">{v.title}</p>
              <p className="text-white/60 text-sm mt-1 leading-relaxed">{v.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Founder spotlight — shown while full team grid is hidden */}
      {!SHOW_MEET_THE_TEAM && inesRosaMember ? (
        <section className="max-w-3xl mx-auto space-y-8">
          <div className="text-center">
            <span className="text-xs uppercase tracking-[0.3em] text-[#D16678] font-semibold block mb-3">
              Founder
            </span>
            <p className="text-white/45 text-sm max-w-md mx-auto leading-relaxed">
              Co-llab is shaped by a small core team; for now you’ll meet the person curating the vision.
            </p>
          </div>
          <div className="flex justify-center">
            <TeamMemberCard member={inesRosaMember} idx={0} />
          </div>
        </section>
      ) : null}

      {/* Meet the Team — full grid; toggle with SHOW_MEET_THE_TEAM */}
      {SHOW_MEET_THE_TEAM ? (
        <section className="max-w-7xl mx-auto space-y-16">
          <div className="text-center">
            <span className="text-xs uppercase tracking-[0.3em] text-[#D16678] font-semibold block mb-4">
              The Humans Behind
            </span>
            <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight">Meet the Team</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {team.map((member, idx) => (
              <TeamMemberCard key={member.name} member={member} idx={idx} />
            ))}
          </div>
        </section>
      ) : null}

      {/* Pull quote — end of story, before join CTA */}
      <section className="max-w-3xl mx-auto px-4">
        <div className="line-glow mb-10 md:mb-14 max-w-md mx-auto opacity-50" />
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className="rounded-2xl border border-white/10 bg-white/[0.03] px-8 py-9 md:px-11 md:py-11 text-center"
        >
          <blockquote className="m-0">
            <p className="text-lg md:text-xl text-white/82 font-light leading-[1.65] tracking-tight">
              It’s not always an easy path; that’s why we do it together. If you feel the call, this space is for you.
            </p>
          </blockquote>
        </motion.div>
      </section>

      {/* CTA */}
      <section className="max-w-4xl mx-auto text-center space-y-8 pb-10">
        <div className="line-glow mb-16" />
        <h2 className="text-4xl md:text-5xl font-black text-white">Ready to join?</h2>
        <p className="text-white/50 text-lg max-w-xl mx-auto">
          Whether through a retreat, a co-living stay, or simply saying hi — we'd love to connect.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/retreats"
            className="px-8 py-4 rounded-full font-semibold text-white bg-gradient-to-r from-[#EB8064] to-[#D16678] hover:opacity-90 hover:scale-105 transition-all duration-200 shadow-xl shadow-[#EB8064]/20"
          >
            Explore retreats &amp; labs ✦
          </Link>
          <Link
            href="/contact"
            className="px-8 py-4 rounded-full font-semibold text-white glass border border-white/15 hover:border-white/30 transition-all duration-200"
          >
            Get Involved →
          </Link>
        </div>
      </section>
    </div>
  );
}
