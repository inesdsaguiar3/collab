"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Loader2 } from "lucide-react";
import { PATH_QUESTIONS, PathAnswers, Recommendation, resolveRecommendation } from "@/lib/pathFinder";

interface SubmitState {
  loading: boolean;
  success: boolean;
  error: string | null;
}

export function PathFinderFlow() {
  const [stepIndex, setStepIndex] = useState(0);
  const [answers, setAnswers] = useState<PathAnswers>({});
  const [email, setEmail] = useState("");
  const [submitState, setSubmitState] = useState<SubmitState>({
    loading: false,
    success: false,
    error: null,
  });

  const emailGateEnabled = false;
  const emailStepIndex = PATH_QUESTIONS.length;
  const resultStepIndex = emailGateEnabled ? PATH_QUESTIONS.length + 1 : PATH_QUESTIONS.length;
  const isEmailStep = emailGateEnabled && stepIndex === emailStepIndex;
  const isResultStep = stepIndex >= resultStepIndex;
  const totalSteps = emailGateEnabled ? PATH_QUESTIONS.length + 2 : PATH_QUESTIONS.length + 1;
  const question = PATH_QUESTIONS[stepIndex];
  const recommendation = useMemo<Recommendation>(() => resolveRecommendation(answers), [answers]);

  const progress = Math.round(((Math.min(stepIndex + 1, totalSteps)) / totalSteps) * 100);

  const back = () => {
    setStepIndex((s) => Math.max(0, s - 1));
  };

  const choose = (optionId: string) => {
    if (!question) return;
    setAnswers((prev) => ({ ...prev, [question.id]: optionId }));
    setStepIndex((s) => Math.min(s + 1, resultStepIndex));
  };

  const submitLead = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) {
      setSubmitState((s) => ({ ...s, error: "Please add your email." }));
      return;
    }

    setSubmitState({ loading: true, success: false, error: null });
    try {
      const res = await fetch("/api/path-finder", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          source: "homepage_path_finder",
          answers,
          recommendation: recommendation.offering,
          contact: { email: email.trim() },
          submittedAt: new Date().toISOString(),
        }),
      });
      if (!res.ok) throw new Error("submit_failed");
      setSubmitState({ loading: false, success: true, error: null });
      setStepIndex(resultStepIndex);
    } catch {
      setSubmitState({
        loading: false,
        success: false,
        error: "Something went wrong. Please try again.",
      });
    }
  };

  return (
    <section className="py-20 md:py-28 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-10 space-y-3">
          <p className="text-xs uppercase tracking-[0.35em] text-white/45">Your path</p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-light text-white tracking-tight">
            Find your best fit
          </h2>
        </div>

        <div className="rounded-3xl p-6 md:p-8" style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.14)", backdropFilter: "blur(20px)" }}>
          <div className="mb-8">
            <div className="h-1.5 w-full rounded-full bg-white/10 overflow-hidden">
              <div className="h-full rounded-full transition-all duration-300" style={{ width: `${progress}%`, background: "linear-gradient(90deg, #EB8064 0%, #AE5F8F 100%)" }} />
            </div>
            <p className="mt-3 text-xs uppercase tracking-[0.25em] text-white/40">
              Step {Math.min(stepIndex + 1, totalSteps)} of {totalSteps}
            </p>
          </div>

          <AnimatePresence mode="wait">
            {!isResultStep && question && (
              <motion.div
                key={question.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="space-y-6"
              >
                <h3 className="text-2xl md:text-3xl font-light text-white">{question.prompt}</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {question.options.map((option) => {
                    const active = answers[question.id] === option.id;
                    return (
                      <button
                        key={option.id}
                        onClick={() => choose(option.id)}
                        className="w-full text-left rounded-2xl px-5 py-5 min-h-[132px] transition-all duration-200"
                        style={{
                          background: active ? "rgba(235,128,100,0.16)" : "rgba(255,255,255,0.04)",
                          border: active ? "1px solid rgba(235,128,100,0.6)" : "1px solid rgba(255,255,255,0.12)",
                        }}
                      >
                        <p className="text-white font-medium text-base">{option.label}</p>
                        <p className="mt-2 text-white/60 text-sm leading-relaxed">{option.description}</p>
                      </button>
                    );
                  })}
                </div>
              </motion.div>
            )}

            {isEmailStep && (
              <motion.div
                key="email-gate"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="space-y-6"
              >
                <div className="rounded-2xl p-6 md:p-7 border border-white/12 bg-white/[0.03]">
                  <p className="text-white text-2xl font-light">Before we show your match</p>
                  <p className="text-white/55 text-sm mt-2">
                    Leave your details so we can send your personalized recommendation and next steps.
                  </p>
                  <form onSubmit={submitLead} className="mt-4">
                    <div className="grid grid-cols-1 gap-3">
                      <input
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email"
                        type="email"
                        required
                        className="w-full bg-white/5 border border-white/15 rounded-xl px-4 py-3 text-white text-sm placeholder:text-white/30 focus:outline-none focus:border-[#EB8064]/50"
                      />
                    </div>
                    <p className="text-white/40 text-xs mt-3">
                      By submitting, you agree to receive relevant updates and recommendations.
                    </p>
                    {submitState.error && <p className="text-[#EB8064] text-sm mt-3">{submitState.error}</p>}
                    <button
                      type="submit"
                      disabled={submitState.loading}
                      className="mt-4 inline-flex items-center gap-2 px-6 py-3 rounded-full text-white text-sm font-medium bg-gradient-to-r from-[#EB8064] to-[#D16678] disabled:opacity-60"
                    >
                      {submitState.loading && <Loader2 className="w-4 h-4 animate-spin" />}
                      Reveal my best match
                    </button>
                  </form>
                </div>
              </motion.div>
            )}

            {isResultStep && (
              <motion.div
                key="result"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="space-y-6"
              >
                <div className="rounded-2xl p-6 md:p-7 border" style={{ borderColor: `${recommendation.accent}66`, background: "rgba(255,255,255,0.04)" }}>
                  <p className="text-xs uppercase tracking-[0.25em] mb-3" style={{ color: recommendation.accent }}>Best match</p>
                  <h3 className="text-2xl md:text-3xl font-light text-white">{recommendation.title}</h3>
                  <p className="mt-3 text-white/70 leading-relaxed">{recommendation.description}</p>
                  <div className="mt-6 flex flex-wrap gap-3">
                    <Link
                      href={recommendation.href}
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-white text-sm font-medium"
                      style={{ background: recommendation.accent }}
                    >
                      {recommendation.cta} <ArrowRight className="w-4 h-4" />
                    </Link>
                    <Link
                      href="/contact"
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-white/90 text-sm border border-white/20 bg-white/5"
                    >
                      Get personal guidance
                    </Link>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="mt-8 flex items-center justify-between">
            <button
              onClick={back}
              disabled={stepIndex === 0}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-white/80 border border-white/20 disabled:opacity-30"
            >
              <ArrowLeft className="w-4 h-4" /> Back
            </button>
            {!isResultStep && <div />}
          </div>
        </div>
      </div>
    </section>
  );
}
