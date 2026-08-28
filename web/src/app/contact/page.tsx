"use client";

import { useState, type FormEvent } from "react";
import { Suspense } from "react";
import { motion } from "framer-motion";
import { Send } from "lucide-react";
import { useSearchParams } from "next/navigation";

type Topic = "retreat" | "coliving" | "partnership" | "work" | "other" | "";

function ContactPageContent() {
  const searchParams = useSearchParams();
  const [sent, setSent] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState(searchParams.get("email") ?? "");
  const roleParam = searchParams.get("role");
  const [topic, setTopic] = useState<Topic>(() => {
    const fromUrl = searchParams.get("topic") as Topic;
    if (fromUrl) return fromUrl;
    if (roleParam === "artist" || roleParam === "community-manager") return "work";
    return "";
  });
  const [message, setMessage] = useState(() => {
    const role = searchParams.get("role");
    if (role === "artist") {
      return "I'm interested in the volunteer artist position.\n\n";
    }
    if (role === "community-manager") {
      return "I'm interested in the community manager position.\n\n";
    }
    return searchParams.get("message") ?? "";
  });
  const [submitState, setSubmitState] = useState<"idle" | "loading" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!topic) {
      setSubmitState("error");
      setErrorMessage("Please choose a topic.");
      return;
    }
    setSubmitState("loading");
    setErrorMessage("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName,
          lastName,
          email,
          topic,
          message,
        }),
      });
      const data = (await res.json().catch(() => ({}))) as { error?: string };
      if (!res.ok) {
        setSubmitState("error");
        setErrorMessage(data.error ?? "Something went wrong. Try again.");
        return;
      }
      setSent(true);
      setSubmitState("idle");
      setFirstName("");
      setLastName("");
      setEmail("");
      setTopic("");
      setMessage("");
    } catch {
      setSubmitState("error");
      setErrorMessage("Could not send. Check your connection and try again.");
    }
  }

  return (
    <div className="px-6 py-20 min-h-screen">
      <div className="max-w-5xl mx-auto space-y-16 pt-10">
        {/* Header */}
        <section className="text-center space-y-5">
          <span className="text-xs uppercase tracking-[0.3em] text-[#EB8064] font-semibold">Get in Touch</span>
          <h1 className="text-5xl md:text-7xl font-black tracking-tight text-white leading-none">
            Say <span className="gradient-text">Hi.</span>
          </h1>
          <p className="text-white/50 text-xl max-w-xl mx-auto">
            Questions, partnerships, retreat ideas, or just vibes — we're here.
          </p>
        </section>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid md:grid-cols-2 gap-8 items-start"
        >
          {/* Info */}
          <div className="glass rounded-3xl p-8 md:p-9 border border-white/10 self-start">
            <div className="space-y-6">
              <div className="h-px w-full bg-gradient-to-r from-transparent via-white/15 to-transparent" />
              <div className="space-y-5">
                <h2 className="text-2xl font-black text-white">We'd love to hear from you.</h2>
                <p className="text-white/50 leading-relaxed">
                  Curious about a retreat, want to co-create with us, or just want to say hello? — reach out!
                </p>
              </div>
              <div className="h-px w-full bg-gradient-to-r from-transparent via-white/15 to-transparent" />
              <div className="flex items-center gap-4">
                <p className="text-white/75 leading-relaxed">
                  With love,<br />
                  <span className="text-white font-medium">Inês</span>
                </p>
                <div className="w-14 h-14 rounded-full overflow-hidden border border-white/20 shadow-lg shadow-black/20 flex-shrink-0">
                  <img
                    src="/images/retreats/profile.JPG"
                    alt="Inês"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="glass rounded-3xl p-10 border border-white/10">
            {sent ? (
              <div className="h-full flex flex-col items-center justify-center text-center space-y-4 min-h-[320px]">
                <div className="text-5xl">✦</div>
                <h3 className="text-2xl font-black text-white">Message sent!</h3>
                <p className="text-white/50">We'll get back to you within 24 hours.</p>
                <button
                  type="button"
                  onClick={() => setSent(false)}
                  className="text-[#EB8064] text-sm hover:underline"
                >
                  Send another
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="first" className="text-xs font-medium text-white/50 uppercase tracking-wider">
                      First Name
                    </label>
                    <input
                      type="text"
                      id="first"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      placeholder="Jane"
                      required
                      disabled={submitState === "loading"}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder:text-white/20 focus:outline-none focus:border-[#EB8064]/50 transition-colors disabled:opacity-60"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="last" className="text-xs font-medium text-white/50 uppercase tracking-wider">
                      Last Name
                    </label>
                    <input
                      type="text"
                      id="last"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      placeholder="Doe"
                      required
                      disabled={submitState === "loading"}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder:text-white/20 focus:outline-none focus:border-[#EB8064]/50 transition-colors disabled:opacity-60"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="text-xs font-medium text-white/50 uppercase tracking-wider">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="jane@example.com"
                    autoComplete="email"
                    disabled={submitState === "loading"}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder:text-white/20 focus:outline-none focus:border-[#EB8064]/50 transition-colors disabled:opacity-60"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="topic" className="text-xs font-medium text-white/50 uppercase tracking-wider">
                    Topic
                  </label>
                  <select
                    id="topic"
                    value={topic}
                    onChange={(e) => setTopic(e.target.value as Topic)}
                    required
                    disabled={submitState === "loading"}
                    className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white/80 text-sm focus:outline-none focus:border-white/50 transition-colors disabled:opacity-60"
                  >
                    <option value="">Select a topic...</option>
                    <option value="retreat">Retreat inquiry</option>
                    <option value="coliving">Co-Living Inquiry</option>
                    <option value="partnership">Partnership / Collab</option>
                    <option value="work">Work with us</option>
                    <option value="other">Just saying hi 👋</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label htmlFor="message" className="text-xs font-medium text-white/50 uppercase tracking-wider">
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    required
                    placeholder="Tell us what's on your mind..."
                    disabled={submitState === "loading"}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder:text-white/20 focus:outline-none focus:border-[#EB8064]/50 transition-colors resize-none disabled:opacity-60"
                  />
                </div>
                {submitState === "error" && errorMessage ? (
                  <p role="alert" className="text-sm text-red-400/90">
                    {errorMessage}
                  </p>
                ) : null}
                <button
                  type="submit"
                  disabled={submitState === "loading"}
                  aria-busy={submitState === "loading"}
                  className="w-full py-4 rounded-xl font-semibold text-white bg-gradient-to-r from-[#EB8064] to-[#D16678] hover:opacity-90 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 shadow-xl shadow-[#EB8064]/20 flex items-center justify-center gap-2 disabled:opacity-60 disabled:hover:scale-100"
                >
                  {submitState === "loading" ? "Sending…" : (
                    <>
                      Send Message <Send className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default function ContactPage() {
  return (
    <Suspense fallback={<div className="px-6 py-20 min-h-screen" />}>
      <ContactPageContent />
    </Suspense>
  );
}
