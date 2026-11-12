"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { embodiedVisionLab } from "@/content/embodied-vision-lab";

const fieldCls =
  "w-full bg-transparent border-0 border-b border-white/25 rounded-none px-0 py-3 text-white text-xl md:text-2xl font-light placeholder:text-white/25 focus:outline-none focus:border-[#EB8064] transition-colors disabled:opacity-60";
const errorCls = "text-sm text-[#D16678]";

type FormState = {
  fullName: string;
  email: string;
  websiteOrInstagram: string;
  workOffer: string;
  businessStage: string;
  developMost: string;
  whyNow: string;
  attendance: string;
  colivingInterest: string;
  anythingElse: string;
  privacyAck: boolean;
  marketingOptIn: boolean;
  company: string;
};

const initial: FormState = {
  fullName: "",
  email: "",
  websiteOrInstagram: "",
  workOffer: "",
  businessStage: "",
  developMost: "",
  whyNow: "",
  attendance: "",
  colivingInterest: "",
  anythingElse: "",
  privacyAck: false,
  marketingOptIn: false,
  company: "",
};

type TextId = "fullName" | "email" | "websiteOrInstagram";
type AreaId = "workOffer" | "developMost" | "whyNow" | "anythingElse";
type ChoiceId = "businessStage" | "attendance" | "colivingInterest";

type Step =
  | {
      id: TextId;
      kind: "text" | "email";
      required: boolean;
      label: string;
      hint?: string;
      placeholder?: string;
      autoComplete?: string;
    }
  | {
      id: AreaId;
      kind: "textarea";
      required: boolean;
      label: string;
      hint?: string;
      placeholder?: string;
    }
  | {
      id: ChoiceId;
      kind: "choice";
      required: boolean;
      label: string;
      hint?: string;
      link?: { href: string; label: string };
      options: readonly string[];
    }
  | {
      id: "privacy";
      kind: "consent";
      label: string;
      hint?: string;
    };

const { form } = embodiedVisionLab;

const steps: Step[] = [
  {
    id: "fullName",
    kind: "text",
    required: true,
    label: "What's your name?",
    placeholder: "Full name",
    autoComplete: "name",
  },
  {
    id: "email",
    kind: "email",
    required: true,
    label: "What's your email?",
    placeholder: "you@example.com",
    autoComplete: "email",
  },
  {
    id: "websiteOrInstagram",
    kind: "text",
    required: false,
    label: "Where can we see your work?",
    hint: "Website or Instagram. Optional.",
    placeholder: "https:// or @handle",
    autoComplete: "url",
  },
  {
    id: "workOffer",
    kind: "textarea",
    required: true,
    label: "What kind of work do you do, and what do you currently offer?",
  },
  {
    id: "businessStage",
    kind: "choice",
    required: true,
    label: "Where are you in your business right now?",
    options: form.businessStageOptions,
  },
  {
    id: "developMost",
    kind: "textarea",
    required: true,
    label: "What would you most like to develop through this experience?",
  },
  {
    id: "whyNow",
    kind: "textarea",
    required: true,
    label: "Why does this feel like the right time to join?",
  },
  {
    id: "attendance",
    kind: "choice",
    required: true,
    label: "Can you attend 5–9 May 2027 and make time for the three-month continuation?",
    options: form.attendanceOptions,
  },
  {
    id: "colivingInterest",
    kind: "choice",
    required: false,
    label: "Are you interested in co-living afterward?",
    link: { href: "/coliving", label: "See coliving" },
    options: form.colivingInterestOptions,
  },
  {
    id: "anythingElse",
    kind: "textarea",
    required: false,
    label: "Anything else you would like us to know?",
    hint: "Optional.",
  },
  {
    id: "privacy",
    kind: "consent",
    label: "One last thing.",
    hint: "This is an application, not a booking. Submitting does not reserve a place or collect payment.",
  },
];

function stepValue(step: Step, values: FormState): string {
  if (step.kind === "consent") return "";
  return values[step.id];
}

function stepError(step: Step, values: FormState): string {
  if (step.kind === "consent") {
    return values.privacyAck ? "" : "Please confirm before submitting.";
  }
  const value = stepValue(step, values).trim();
  if (!step.required) return "";
  if (step.id === "email") {
    if (!value || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return "A valid email is required.";
    return "";
  }
  if (!value) return step.kind === "choice" ? "Please select an option." : "This field is required.";
  return "";
}

export function EmbodiedVisionApplyForm() {
  const [values, setValues] = useState<FormState>(initial);
  const [stepIndex, setStepIndex] = useState(0);
  const [error, setError] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const fieldRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null);
  const hasNavigatedStepRef = useRef(false);

  const step = steps[stepIndex];
  const progress = Math.round(((stepIndex + 1) / steps.length) * 100);

  useEffect(() => {
    const el = fieldRef.current;
    if (!el) return;
    if (el instanceof HTMLTextAreaElement) {
      el.style.height = "auto";
      el.style.height = `${el.scrollHeight}px`;
    }
    if (hasNavigatedStepRef.current) {
      el.focus({ preventScroll: true });
    }
  }, [stepIndex]);

  function set<K extends keyof FormState>(key: K, value: FormState[K]) {
    setValues((prev) => ({ ...prev, [key]: value }));
    setError("");
  }

  function goNext() {
    hasNavigatedStepRef.current = true;
    setStepIndex((index) => Math.min(index + 1, steps.length - 1));
    setError("");
  }

  function goBack() {
    hasNavigatedStepRef.current = true;
    setStepIndex((index) => Math.max(0, index - 1));
    setError("");
  }

  function advance() {
    const message = stepError(step, values);
    if (message) {
      setError(message);
      fieldRef.current?.focus({ preventScroll: true });
      return;
    }
    if (stepIndex >= steps.length - 1) return;
    goNext();
  }

  function choose(id: ChoiceId, option: string) {
    hasNavigatedStepRef.current = true;
    setValues((prev) => ({ ...prev, [id]: option }));
    setError("");
    setStepIndex((index) => Math.min(index + 1, steps.length - 1));
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (status === "loading") return;
    if (step.kind !== "consent") {
      advance();
      return;
    }

    const message = stepError(step, values);
    if (message) {
      setError(message);
      setStatus("idle");
      return;
    }

    setStatus("loading");
    setError("");
    try {
      const res = await fetch("/api/embodied-vision-lab/apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const data = (await res.json().catch(() => ({}))) as { error?: string };
      if (!res.ok) {
        setStatus("error");
        setError(data.error ?? "Something went wrong. Please try again.");
        return;
      }
      setStatus("success");
    } catch {
      setStatus("error");
      setError("Could not send. Check your connection and try again.");
    }
  }

  if (status === "success") {
    return (
      <motion.div
        role="status"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col items-center justify-center text-center space-y-5 py-14"
      >
        <div className="text-4xl">✦</div>
        <p className="text-white font-semibold text-lg">Application received</p>
        <p className="text-white/55 max-w-sm leading-relaxed text-sm">{form.success}</p>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="mx-auto max-w-xl" noValidate>
      <div className="absolute -left-[9999px] h-0 overflow-hidden opacity-0" aria-hidden="true">
        <label htmlFor="evl-company">Company</label>
        <input
          id="evl-company"
          name="company"
          tabIndex={-1}
          autoComplete="off"
          value={values.company}
          onChange={(e) => set("company", e.target.value)}
        />
      </div>

      <div className="mb-8">
        <div className="h-1 w-full overflow-hidden rounded-full bg-white/10">
          <div
            className="h-full rounded-full transition-all duration-300"
            style={{ width: `${progress}%`, background: "linear-gradient(90deg, #EB8064 0%, #AE5F8F 100%)" }}
          />
        </div>
        <p className="mt-3 text-xs uppercase tracking-[0.25em] text-white/40">
          {stepIndex + 1} of {steps.length}
        </p>
      </div>

      <div className="min-h-[280px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={step.id}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.28, ease: "easeOut" }}
            className="space-y-6"
          >
            <div className="space-y-3">
              <h3 className="text-2xl font-light leading-snug text-white md:text-3xl">{step.label}</h3>
              {step.hint ? <p className="text-sm font-light leading-relaxed text-white/45">{step.hint}</p> : null}
              {"link" in step && step.link ? (
                <p className="text-sm font-light">
                  <Link
                    href={step.link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#EB8064] underline underline-offset-4 transition-colors hover:text-white"
                  >
                    {step.link.label}
                  </Link>
                </p>
              ) : null}
            </div>

            {step.kind === "text" || step.kind === "email" ? (
              <input
                ref={(node) => {
                  fieldRef.current = node;
                }}
                type={step.kind === "email" ? "email" : "text"}
                value={values[step.id]}
                autoComplete={step.autoComplete}
                placeholder={step.placeholder}
                disabled={status === "loading"}
                onChange={(e) => set(step.id, e.target.value)}
                className={fieldCls}
                aria-invalid={Boolean(error)}
              />
            ) : null}

            {step.kind === "textarea" ? (
              <textarea
                ref={(node) => {
                  fieldRef.current = node;
                }}
                rows={1}
                value={values[step.id]}
                placeholder={step.placeholder ?? "Type your answer"}
                disabled={status === "loading"}
                onChange={(e) => {
                  set(step.id, e.target.value);
                  const el = e.currentTarget;
                  el.style.height = "auto";
                  el.style.height = `${el.scrollHeight}px`;
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    e.currentTarget.form?.requestSubmit();
                  }
                }}
                className={`${fieldCls} min-h-[3.25rem] resize-none overflow-hidden text-lg leading-relaxed md:text-xl`}
                aria-invalid={Boolean(error)}
              />
            ) : null}

            {step.kind === "choice" ? (
              <div className="space-y-2.5">
                {step.options.map((option) => {
                  const active = values[step.id] === option;
                  return (
                    <button
                      key={option}
                      type="button"
                      disabled={status === "loading"}
                      onClick={() => choose(step.id, option)}
                      className={`w-full rounded-2xl border px-5 py-4 text-left text-sm font-medium transition-all duration-200 ${
                        active
                          ? "border-[#EB8064]/60 bg-[#EB8064]/15 text-white"
                          : "border-white/10 bg-white/[0.03] text-white/70 hover:border-white/25 hover:text-white"
                      }`}
                    >
                      {option}
                    </button>
                  );
                })}
              </div>
            ) : null}

            {step.kind === "consent" ? (
              <div className="space-y-4">
                <label className="flex cursor-pointer items-start gap-3 text-sm font-light text-white/70">
                  <input
                    type="checkbox"
                    checked={values.privacyAck}
                    disabled={status === "loading"}
                    onChange={(e) => set("privacyAck", e.target.checked)}
                    className="mt-1 accent-[#EB8064]"
                    aria-invalid={Boolean(error)}
                  />
                  <span>
                    I have read the{" "}
                    <Link
                      href="/contact"
                      className="text-[#EB8064] underline underline-offset-2 transition-colors hover:text-white"
                    >
                      privacy notice
                    </Link>{" "}
                    and understand my information will be used to review this application and contact me about
                    Embodied Vision Lab. *
                  </span>
                </label>
                <label className="flex cursor-pointer items-start gap-3 text-sm font-light text-white/45">
                  <input
                    type="checkbox"
                    checked={values.marketingOptIn}
                    disabled={status === "loading"}
                    onChange={(e) => set("marketingOptIn", e.target.checked)}
                    className="mt-1 accent-[#EB8064]"
                  />
                  <span>Optional: keep me updated about future Co-llab programmes and gatherings.</span>
                </label>
              </div>
            ) : null}

            {error ? (
              <p role="alert" className={errorCls}>
                {error}
              </p>
            ) : null}

            {step.kind !== "choice" ? (
              <div className="flex items-center gap-4 pt-1">
                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-[#7F5AA1] to-[#D16678] px-7 py-3 font-semibold text-white shadow-xl shadow-[#7F5AA1]/20 transition-all duration-200 hover:opacity-90 disabled:opacity-60"
                >
                  {step.kind === "consent"
                    ? status === "loading"
                      ? "Submitting…"
                      : "Submit application ✦"
                    : "OK"}
                </button>
                {step.kind !== "consent" ? (
                  <span className="text-xs font-light text-white/30">press Enter ↵</span>
                ) : null}
              </div>
            ) : step.required ? null : (
              <button
                type="submit"
                className="text-sm font-light text-white/40 underline underline-offset-4 transition-colors hover:text-white/70"
              >
                Skip
              </button>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="mt-6">
        <button
          type="button"
          onClick={goBack}
          disabled={stepIndex === 0 || status === "loading"}
          className="inline-flex items-center gap-2 rounded-full border border-white/20 px-4 py-2 text-white/80 disabled:opacity-30"
        >
          <ArrowLeft className="h-4 w-4" /> Back
        </button>
      </div>
    </form>
  );
}
