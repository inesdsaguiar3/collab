"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, type FormEvent } from "react";
import { Send, ChevronDown } from "lucide-react";

const FREE_CALL_LINK = "https://calendar.app.google/U7Ybon5Nugh1y8jD9";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 22 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { delay, duration: 0.65, ease: "easeOut" as const },
});

const forWhom = [
  "You keep arriving at the same place, no matter how much you understand.",
  "You are moving through burnout, anxiety, or chronic stress.",
  "The body feels like too much. Or not enough.",
  "You've lost the thread back to yourself.",
  "Something is shifting, and you want steady ground while it does.",
];

const STATES = [
  {
    id: "sensitive",
    label: "Sensitive, easily triggered",
    sub: "Small things land hard. Reactions feel disproportionate.",
    note: "Your system is close to the surface. That's not a flaw — it's a signal. Sessions will start with gentle regulation, not exposure. The aim is to widen your window of tolerance, slowly.",
    practices: ["Grounding and regulation first", "Very slow, titrated contact", "Learning to feel without being overwhelmed"],
  },
  {
    id: "overstimulated",
    label: "Overstimulated / overloaded",
    sub: "Fast mind, tension, too much input.",
    note: "The system is taking in more than it can process. There's often a backlog — things that haven't had space to land. Sessions slow the pace down and help the system discharge what's been accumulating.",
    practices: ["Slowing the intake", "Discharging accumulated tension", "Building capacity to be with less"],
  },
  {
    id: "anxious",
    label: "Anxious / activated",
    sub: "Restless, unsettled, emotionally charged.",
    note: "There's charge in the system looking for somewhere to land. We'll work with the activation rather than trying to silence it — helping energy move through rather than stay looped.",
    practices: ["Breath-led regulation", "Tracking sensation without feeding the story", "Finding stillness inside the movement"],
  },
  {
    id: "shutdown",
    label: "Shut down",
    sub: "Numb, foggy, distant, low energy.",
    note: "Shutdown is the nervous system protecting itself. There is nothing wrong with you. We'll work very gently to invite the system back — no pressure, no rush.",
    practices: ["Slow, non-demanding presence", "Small, safe moments of activation", "Re-building contact with sensation"],
  },
  {
    id: "transition",
    label: "In transition",
    sub: "In-between, unclear footing.",
    note: "When the ground is shifting, the body often holds what the mind can't yet process. Sessions can help you find footing below the uncertainty.",
    practices: ["Presence over direction", "Tolerating not-knowing", "Tracking what is still stable"],
  },
  {
    id: "unsure",
    label: "Not sure",
    sub: "Something feels off — I can't name it yet.",
    note: "Not being able to name it is a valid place to begin. The body often knows before the mind does. We'll follow what shows up.",
    practices: ["Open, curious exploration", "No agenda, no destination", "Following what is present"],
  },
];

const inputCls =
  "w-full bg-white/[0.07] border border-white/20 rounded-xl px-4 py-3 text-white text-sm placeholder:text-white/40 focus:outline-none focus:border-[#7F5AA1]/70 transition-colors disabled:opacity-60";
const labelCls = "text-xs uppercase tracking-widest text-white/60 font-medium";

function SomaticIntakeFlow() {
  const [chosen, setChosen] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [submitState, setSubmitState] = useState<"idle" | "loading" | "sent" | "error">("idle");

  const selectedState = STATES.find((s) => s.id === chosen);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setSubmitState("loading");
    try {
      const res = await fetch("/api/one-to-one-intake", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          state: selectedState?.label ?? chosen,
        }),
      });
      if (!res.ok) throw new Error();
      setSubmitState("sent");
    } catch {
      setSubmitState("error");
    }
  }

  if (submitState === "sent") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col items-center justify-center text-center space-y-5 py-14"
      >
        <div className="text-4xl">✦</div>
        <p className="text-white font-semibold text-lg">Received.</p>
        <p className="text-white/55 max-w-xs leading-relaxed text-sm">
          Check your inbox — the free guide is on its way.
        </p>
        <p className="text-white/35 max-w-xs leading-relaxed text-xs">
          I&apos;ll follow up within a couple of days.{" "}
          <a href={FREE_CALL_LINK} target="_blank" rel="noopener noreferrer" className="underline underline-offset-4 text-white/55">
            Book a call
          </a>{" "}
          if you&apos;d rather just talk.
        </p>
      </motion.div>
    );
  }

  return (
    <div className="space-y-8">

      {/* ── State selector ── */}
      <div className="space-y-4">
        <p className="text-xs uppercase tracking-[0.28em] text-white/55 font-semibold">
          What feels most like your current state?
        </p>
        <div className="grid sm:grid-cols-2 gap-2.5">
          {STATES.map((s) => {
            const active = chosen === s.id;
            return (
              <button
                key={s.id}
                type="button"
                onClick={() => setChosen(s.id)}
                className={`text-left px-5 py-4 rounded-2xl border transition-all duration-200 space-y-1 ${
                  active
                    ? "border-[#7F5AA1]/60 bg-[#7F5AA1]/15 text-white"
                    : "border-white/10 bg-white/[0.03] text-white/55 hover:border-white/20 hover:text-white/75"
                }`}
              >
                <p className={`text-sm font-medium ${active ? "text-white" : "text-white/75"}`}>{s.label}</p>
                <p className="text-xs text-white/40 font-light leading-snug">{s.sub}</p>
              </button>
            );
          })}
        </div>
      </div>

      {/* ── Contextual insight + form ── */}
      <AnimatePresence mode="wait">
        {chosen && selectedState && (
          <motion.div
            key={chosen}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 6 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="space-y-7"
          >
            {/* State insight */}
            <div className="space-y-4 border-l-2 border-[#7F5AA1]/40 pl-5">
              <p className="text-white/65 text-sm leading-relaxed">{selectedState.note}</p>
              <ul className="space-y-1.5">
                {selectedState.practices.map((p) => (
                  <li key={p} className="flex gap-2.5 items-start text-xs text-white/45 font-light">
                    <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-[#7F5AA1]/60" aria-hidden />
                    {p}
                  </li>
                ))}
              </ul>
            </div>

            <div className="h-px w-full bg-white/[0.08]" />

            {/* Minimal fields */}
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className={labelCls}>Name</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your name"
                    disabled={submitState === "loading"}
                    className={inputCls}
                  />
                </div>
                <div className="space-y-2">
                  <label className={labelCls}>Email</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    disabled={submitState === "loading"}
                    className={inputCls}
                  />
                </div>
              </div>

              {submitState === "error" && (
                <p className="text-sm text-red-400/80">Something went wrong. Try again.</p>
              )}

              <div className="rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 flex gap-3 items-start">
                <span className="text-[#7F5AA1] text-base mt-0.5">✦</span>
                <p className="text-white/55 text-xs leading-relaxed">
                  You&apos;ll receive a free guide —{" "}
                  <span className="text-white/70 font-medium">A Short Guide to Nervous System States</span>{" "}
                  — in your inbox after submitting.
                </p>
              </div>

              <div className="space-y-2 pt-1">
                <button
                  type="submit"
                  disabled={submitState === "loading"}
                  className="w-full py-4 rounded-xl font-semibold text-white bg-gradient-to-r from-[#7F5AA1] to-[#D16678] hover:opacity-90 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 shadow-xl shadow-[#7F5AA1]/20 flex items-center justify-center gap-2 disabled:opacity-60"
                >
                  {submitState === "loading" ? "Sending…" : <>Start the journey <Send className="w-4 h-4" /></>}
                </button>

              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function OneToOnePage() {
  return (
    <div className="px-6 py-20 space-y-32 min-h-screen">

      {/* ── HERO ── */}
      <section className="max-w-5xl mx-auto pt-10 grid md:grid-cols-2 gap-12 lg:gap-16 items-center">
        <div className="space-y-8">
        <motion.div initial={{ opacity: 0, y: -14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55 }}>
          <span className="text-xs uppercase tracking-[0.3em] text-[#EB8064] font-semibold">Your lab</span>
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.7 }}
          className="text-5xl md:text-6xl lg:text-7xl font-black tracking-tight text-white leading-[1.08]"
        >
          Come back<br />
          <span className="gradient-text">to yourself.</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.7 }}
          className="text-white/55 text-xl max-w-xl leading-relaxed"
        >
          The body is always speaking to you — are you listening?
        </motion.p>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="flex flex-col sm:flex-row gap-4"
        >
          <a
            href={FREE_CALL_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-8 py-4 rounded-full font-semibold text-white bg-gradient-to-r from-[#7F5AA1] to-[#D16678] hover:opacity-90 hover:scale-105 transition-all duration-200 shadow-xl shadow-[#7F5AA1]/20"
          >
            Book a free call ✦
          </a>
          <a
            href="#enquire"
            className="inline-block px-7 py-4 rounded-full font-semibold text-white glass border border-white/15 hover:border-white/35 transition-all duration-200"
          >
            Request a session →
          </a>
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.85, duration: 0.6 }}
          className="pt-4"
        >
          <a
            href="#enquire"
            className="group inline-flex flex-col items-center gap-2 text-white/40 hover:text-white/70 transition-colors"
            aria-label="Scroll to Begin Here"
          >
            <span className="text-[10px] uppercase tracking-[0.3em] font-semibold">Begin here</span>
            <motion.span
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
              className="inline-flex"
            >
              <ChevronDown className="w-6 h-6 text-[#EB8064]/80 group-hover:text-[#EB8064]" strokeWidth={1.5} />
            </motion.span>
          </a>
        </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.75 }}
          className="relative aspect-[3/4] max-w-sm mx-auto md:max-w-none w-full rounded-3xl overflow-hidden"
        >
          <img
            src="/images/INES-152.jpeg"
            alt="Inês — psychosomatic practitioner"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/35 to-transparent" />
        </motion.div>
      </section>

      {/* ── PSYCHOSOMATIC THERAPY ── */}
      <section className="max-w-3xl mx-auto">
        <motion.div {...fadeUp()} className="space-y-10">
          <div className="space-y-5">
            <p className="text-xs uppercase tracking-[0.3em] text-[#EB8064] font-semibold">
              Psychosomatic Therapy
            </p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black tracking-tight text-white leading-[1.1]">
              Come home to{" "}
              <span className="gradient-text">your body.</span>
            </h2>
            <div
              className="h-[2px] w-16 rounded-full"
              style={{ background: "linear-gradient(to right, #EB8064, #7F5AA1, #D16678)" }}
            />
          </div>

          <div className="space-y-5 text-white/60 text-lg font-light leading-[1.8]">
            <p>
              We slow down and listen to the wisdom of your body. Through breath, intuitive
              movement, and Internal Family Systems work, we gently unwind stress patterns,
              soften protective layers, and reconnect you with your grounded, coherent presence.
            </p>
            <p className="text-white/80">
              These sessions help you come home to yourself — emotionally, physically, and
              energetically — so you can move through life with greater clarity, calm, and
              alignment.
            </p>
          </div>

          <div className="pt-2">
            <p className="text-[10px] uppercase tracking-[0.28em] text-white/35 font-semibold mb-4">
              Tools &amp; modalities I work with
            </p>
            <ul className="space-y-3">
              {[
                "Breathwork",
                "Internal Family Systems",
                "Somatic Experiencing",
                "Compassionate Inquiry",
                "Intuitive Movement",
                "Embodied Writing",
                "Polyvagal Theory (The Nervous System)",
              ].map((item, i) => (
                <motion.li
                  key={item}
                  {...fadeUp(0.05 * i)}
                  className="flex items-center gap-3 text-white/70 text-sm md:text-base font-light"
                >
                  <span
                    className="h-px w-6 shrink-0"
                    style={{ background: "linear-gradient(to right, #EB8064, transparent)" }}
                    aria-hidden
                  />
                  {item}
                </motion.li>
              ))}
            </ul>
          </div>

          <p className="text-white/40 text-sm font-light tracking-wide pt-2 border-t border-white/[0.08]">
            Available in person in Portugal and online.
          </p>
        </motion.div>
      </section>

      {/* ── BEGIN HERE (intake) ── */}
      <section id="enquire" className="max-w-2xl mx-auto scroll-mt-24">
        <motion.div
          {...fadeUp()}
          className="glass rounded-3xl p-8 md:p-12 border border-white/10 space-y-8"
        >
          <span className="text-xs uppercase tracking-[0.3em] text-[#EB8064] font-semibold">Begin Here</span>
          <SomaticIntakeFlow />
          <div className="pt-2 flex items-center gap-4 border-t border-white/[0.08]">
            <div className="w-10 h-10 rounded-full overflow-hidden border border-white/20 flex-shrink-0">
              <img src="/images/retreats/profile.JPG" alt="Inês" className="w-full h-full object-cover" />
            </div>
            <p className="text-white/40 text-sm">
              Rather speak first?{" "}
              <a href={FREE_CALL_LINK} target="_blank" rel="noopener noreferrer" className="underline underline-offset-4 text-white/60 hover:text-white transition-colors">
                Book a free call.
              </a>
            </p>
          </div>
        </motion.div>
      </section>

      {/* ── INTRO ── */}
      <section className="max-w-2xl mx-auto">
        <motion.div {...fadeUp()} className="space-y-5 text-white/60 text-lg font-light leading-[1.75]">
          <p>You might not be able to name what&apos;s off.</p>
          <p>You just know something isn&apos;t landing.</p>
          <p className="text-white/80 font-normal">This is a space to slow down and feel your way back.</p>
        </motion.div>
      </section>

      {/* ── WHO THIS IS FOR ── */}
      <section className="max-w-3xl mx-auto space-y-10">
        <motion.div {...fadeUp()}>
          <h2 className="text-xs uppercase tracking-[0.3em] text-[#EB8064] font-semibold">Who This Is For</h2>
        </motion.div>
        <ul className="space-y-4">
          {forWhom.map((line, i) => (
            <motion.li key={i} {...fadeUp(i * 0.08)} className="flex gap-4 items-start">
              <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gradient-to-br from-[#EB8064] to-[#D16678] ring-2 ring-[#EB8064]/25" aria-hidden />
              <span className="text-white/65 text-lg font-light leading-relaxed">{line}</span>
            </motion.li>
          ))}
        </ul>
      </section>

      {/* ── CLOSING ── */}
      <section className="max-w-3xl mx-auto pb-10 text-center space-y-7">
        <motion.div {...fadeUp()} className="space-y-5">
          <p className="text-white/50 text-lg font-light">When you are ready —</p>
          <p className="text-white text-2xl md:text-3xl font-black tracking-tight">there is room for you here.</p>
        </motion.div>
        <motion.div {...fadeUp(0.1)} className="pt-2">
          <a
            href={FREE_CALL_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-8 py-4 rounded-full font-semibold text-white bg-gradient-to-r from-[#7F5AA1] to-[#D16678] hover:opacity-90 hover:scale-105 transition-all duration-200 shadow-xl shadow-[#7F5AA1]/20"
          >
            Book a free call ✦
          </a>
        </motion.div>
      </section>

      {/* ── FAQ ── */}
      <section className="max-w-3xl mx-auto space-y-8">
        <motion.div {...fadeUp()}>
          <h2 className="text-xs uppercase tracking-[0.3em] text-[#EB8064] font-semibold">Common Questions</h2>
        </motion.div>
        <div className="space-y-0 divide-y divide-white/[0.07]">
          {[
            {
              q: "What is somatic therapy?",
              a: "Somatic therapy is a body-based approach to healing. Rather than working only through conversation, we include physical sensations, breath, and movement as entry points into emotional and nervous system patterns. It is particularly effective for stress, burnout, anxiety, and trauma.",
            },
            {
              q: "How is this different from talking therapy?",
              a: "Talking therapy works primarily through insight and language. Somatic therapy works with what the body is holding — tension, bracing, shutdown, or activation — so that change happens at a felt level, not just a cognitive one. Both have value; they work differently.",
            },
            {
              q: "Is somatic therapy effective for burnout?",
              a: "Yes. Burnout is often a nervous system collapse, not just a mindset problem. Somatic approaches help regulate the system, discharge accumulated stress, and rebuild capacity — which is why they can reach places that thinking and talking alone cannot.",
            },
            {
              q: "What happens in a somatic experiencing session?",
              a: "Sessions are slow and relational. We might work with breath, body sensation, intuitive movement, or parts work (IFS). There is no fixed agenda — we follow what shows up in the moment. Most people describe feeling quieter, more grounded, or more present afterwards.",
            },
            {
              q: "Do you offer somatic therapy sessions in Portugal?",
              a: "Yes — in person in Óbidos, Portugal, about one hour from Lisbon. Sessions are also available online for clients anywhere in the world.",
            },
            {
              q: "Do I need prior experience with somatic work or breathwork?",
              a: "No. These sessions are open to anyone, including people who have never done body-based work before. We always start where you are.",
            },
          ].map(({ q, a }, i) => (
            <motion.details key={i} {...fadeUp(i * 0.05)} className="group py-5 cursor-pointer">
              <summary className="flex justify-between items-start gap-4 text-white/80 font-medium text-base list-none">
                {q}
                <span className="text-white/30 group-open:rotate-45 transition-transform duration-200 shrink-0 text-lg leading-none mt-0.5">+</span>
              </summary>
              <p className="mt-4 text-white/50 text-sm leading-relaxed">{a}</p>
            </motion.details>
          ))}
        </div>
        <motion.p {...fadeUp()} className="text-white/35 text-sm pt-2">
          Exploring breathwork retreats?{" "}
          <a href="/retreats/inner-peace-portugal" className="underline underline-offset-4 text-white/55 hover:text-white transition-colors">
            See our retreat in Óbidos, Portugal.
          </a>
        </motion.p>
      </section>

    </div>
  );
}
