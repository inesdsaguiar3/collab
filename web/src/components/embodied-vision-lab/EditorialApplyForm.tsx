"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { embodiedVisionLab } from "@/content/embodied-vision-lab";

const fieldCls =
  "w-full rounded-lg border border-[#2C2A26]/15 bg-white/70 px-4 py-3 text-sm text-[#2C2A26] placeholder:text-[#2C2A26]/35 focus:outline-none focus:border-[#5C6B4A] focus:ring-1 focus:ring-[#5C6B4A]/40 disabled:opacity-60";
const labelCls = "block text-xs font-semibold uppercase tracking-[0.18em] text-[#2C2A26]/55 mb-2";
const errorCls = "mt-1.5 text-sm text-[#9A4F3C]";

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

export function EditorialApplyForm() {
  const { form } = embodiedVisionLab;
  const [values, setValues] = useState<FormState>(initial);
  const [fieldErrors, setFieldErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [formError, setFormError] = useState("");

  function set<K extends keyof FormState>(key: K, value: FormState[K]) {
    setValues((prev) => ({ ...prev, [key]: value }));
    if (fieldErrors[key]) {
      setFieldErrors((prev) => {
        const next = { ...prev };
        delete next[key];
        return next;
      });
    }
  }

  function validate(): boolean {
    const errors: Partial<Record<keyof FormState, string>> = {};
    if (!values.fullName.trim()) errors.fullName = "Full name is required.";
    if (!values.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) {
      errors.email = "A valid email is required.";
    }
    if (!values.workOffer.trim()) errors.workOffer = "This field is required.";
    if (!values.businessStage) errors.businessStage = "Please select an option.";
    if (!values.developMost.trim()) errors.developMost = "This field is required.";
    if (!values.whyNow.trim()) errors.whyNow = "This field is required.";
    if (!values.attendance) errors.attendance = "Please select an option.";
    if (!values.privacyAck) errors.privacyAck = "Please confirm before submitting.";
    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (status === "loading") return;
    setFormError("");
    if (!validate()) return;

    setStatus("loading");
    try {
      const res = await fetch("/api/embodied-vision-lab/apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const data = (await res.json().catch(() => ({}))) as { error?: string };
      if (!res.ok) {
        setStatus("error");
        setFormError(data.error ?? "Something went wrong. Please try again.");
        return;
      }
      setStatus("success");
    } catch {
      setStatus("error");
      setFormError("Could not send. Check your connection and try again.");
    }
  }

  if (status === "success") {
    return (
      <div
        role="status"
        className="rounded-2xl border border-[#5C6B4A]/25 bg-[#5C6B4A]/[0.06] px-6 py-8 md:px-8 md:py-10 space-y-3"
      >
        <p className="font-[family-name:var(--font-evl-display)] text-2xl text-[#2C2A26] tracking-tight">
          Application received
        </p>
        <p className="text-[#2C2A26]/70 text-base font-light leading-relaxed">{form.success}</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-7" noValidate>
      <p className="text-sm text-[#2C2A26]/55 font-light leading-relaxed border-l-2 border-[#C4A484] pl-4">
        This is an application, not a booking. Submitting does not reserve a place or collect payment.
      </p>

      <div className="absolute -left-[9999px] opacity-0 h-0 overflow-hidden" aria-hidden="true">
        <label htmlFor="evl-editorial-company">Company</label>
        <input
          id="evl-editorial-company"
          name="company"
          tabIndex={-1}
          autoComplete="off"
          value={values.company}
          onChange={(e) => set("company", e.target.value)}
        />
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="evl-editorial-name" className={labelCls}>
            Full name *
          </label>
          <input
            id="evl-editorial-name"
            type="text"
            required
            autoComplete="name"
            disabled={status === "loading"}
            value={values.fullName}
            onChange={(e) => set("fullName", e.target.value)}
            className={fieldCls}
            aria-invalid={Boolean(fieldErrors.fullName)}
          />
          {fieldErrors.fullName ? <p className={errorCls}>{fieldErrors.fullName}</p> : null}
        </div>
        <div>
          <label htmlFor="evl-editorial-email" className={labelCls}>
            Email address *
          </label>
          <input
            id="evl-editorial-email"
            type="email"
            required
            autoComplete="email"
            disabled={status === "loading"}
            value={values.email}
            onChange={(e) => set("email", e.target.value)}
            className={fieldCls}
            aria-invalid={Boolean(fieldErrors.email)}
          />
          {fieldErrors.email ? <p className={errorCls}>{fieldErrors.email}</p> : null}
        </div>
      </div>

      <div>
        <label htmlFor="evl-editorial-web" className={labelCls}>
          Website or Instagram
        </label>
        <input
          id="evl-editorial-web"
          type="text"
          autoComplete="url"
          disabled={status === "loading"}
          value={values.websiteOrInstagram}
          onChange={(e) => set("websiteOrInstagram", e.target.value)}
          className={fieldCls}
          placeholder="Optional"
        />
      </div>

      <div>
        <label htmlFor="evl-editorial-work" className={labelCls}>
          What kind of work do you do, and what do you currently offer? *
        </label>
        <textarea
          id="evl-editorial-work"
          required
          rows={4}
          disabled={status === "loading"}
          value={values.workOffer}
          onChange={(e) => set("workOffer", e.target.value)}
          className={fieldCls}
          aria-invalid={Boolean(fieldErrors.workOffer)}
        />
        {fieldErrors.workOffer ? <p className={errorCls}>{fieldErrors.workOffer}</p> : null}
      </div>

      <fieldset>
        <legend className={labelCls}>Where are you in your business right now? *</legend>
        <div className="space-y-3 mt-1">
          {form.businessStageOptions.map((option) => (
            <label key={option} className="flex items-start gap-3 text-sm text-[#2C2A26]/80 font-light cursor-pointer">
              <input
                type="radio"
                name="businessStage"
                value={option}
                checked={values.businessStage === option}
                disabled={status === "loading"}
                onChange={() => set("businessStage", option)}
                className="mt-1 accent-[#5C6B4A]"
              />
              <span>{option}</span>
            </label>
          ))}
        </div>
        {fieldErrors.businessStage ? <p className={errorCls}>{fieldErrors.businessStage}</p> : null}
      </fieldset>

      <div>
        <label htmlFor="evl-editorial-develop" className={labelCls}>
          What would you most like to develop through this experience? *
        </label>
        <textarea
          id="evl-editorial-develop"
          required
          rows={4}
          disabled={status === "loading"}
          value={values.developMost}
          onChange={(e) => set("developMost", e.target.value)}
          className={fieldCls}
          aria-invalid={Boolean(fieldErrors.developMost)}
        />
        {fieldErrors.developMost ? <p className={errorCls}>{fieldErrors.developMost}</p> : null}
      </div>

      <div>
        <label htmlFor="evl-editorial-why" className={labelCls}>
          Why does this feel like the right time to join? *
        </label>
        <textarea
          id="evl-editorial-why"
          required
          rows={4}
          disabled={status === "loading"}
          value={values.whyNow}
          onChange={(e) => set("whyNow", e.target.value)}
          className={fieldCls}
          aria-invalid={Boolean(fieldErrors.whyNow)}
        />
        {fieldErrors.whyNow ? <p className={errorCls}>{fieldErrors.whyNow}</p> : null}
      </div>

      <fieldset>
        <legend className={labelCls}>
          Can you attend 5–9 May 2027 and make time for the three-month continuation? *
        </legend>
        <div className="space-y-3 mt-1">
          {form.attendanceOptions.map((option) => (
            <label key={option} className="flex items-start gap-3 text-sm text-[#2C2A26]/80 font-light cursor-pointer">
              <input
                type="radio"
                name="attendance"
                value={option}
                checked={values.attendance === option}
                disabled={status === "loading"}
                onChange={() => set("attendance", option)}
                className="mt-1 accent-[#5C6B4A]"
              />
              <span>{option}</span>
            </label>
          ))}
        </div>
        {fieldErrors.attendance ? <p className={errorCls}>{fieldErrors.attendance}</p> : null}
      </fieldset>

      <fieldset>
        <legend className={labelCls}>Are you interested in optional co-living afterward?</legend>
        <div className="space-y-3 mt-1">
          {form.colivingInterestOptions.map((option) => (
            <label key={option} className="flex items-start gap-3 text-sm text-[#2C2A26]/80 font-light cursor-pointer">
              <input
                type="radio"
                name="colivingInterest"
                value={option}
                checked={values.colivingInterest === option}
                disabled={status === "loading"}
                onChange={() => set("colivingInterest", option)}
                className="mt-1 accent-[#5C6B4A]"
              />
              <span>{option}</span>
            </label>
          ))}
        </div>
      </fieldset>

      <div>
        <label htmlFor="evl-editorial-else" className={labelCls}>
          Anything else you would like us to know?
        </label>
        <textarea
          id="evl-editorial-else"
          rows={3}
          disabled={status === "loading"}
          value={values.anythingElse}
          onChange={(e) => set("anythingElse", e.target.value)}
          className={fieldCls}
          placeholder="Optional"
        />
      </div>

      <div className="space-y-4 pt-2">
        <label className="flex items-start gap-3 text-sm text-[#2C2A26]/75 font-light cursor-pointer">
          <input
            type="checkbox"
            checked={values.privacyAck}
            disabled={status === "loading"}
            onChange={(e) => set("privacyAck", e.target.checked)}
            className="mt-1 accent-[#5C6B4A]"
            aria-invalid={Boolean(fieldErrors.privacyAck)}
          />
          <span>
            I have read the{" "}
            <Link href="/contact" className="underline underline-offset-2 hover:text-[#2C2A26]">
              privacy notice
            </Link>{" "}
            and understand my information will be used to review this application and contact me about
            Embodied Vision Lab. *
          </span>
        </label>
        {fieldErrors.privacyAck ? <p className={errorCls}>{fieldErrors.privacyAck}</p> : null}

        <label className="flex items-start gap-3 text-sm text-[#2C2A26]/55 font-light cursor-pointer">
          <input
            type="checkbox"
            checked={values.marketingOptIn}
            disabled={status === "loading"}
            onChange={(e) => set("marketingOptIn", e.target.checked)}
            className="mt-1 accent-[#5C6B4A]"
          />
          <span>Optional: keep me updated about future Co-llab programmes and gatherings.</span>
        </label>
      </div>

      {formError ? (
        <p role="alert" className="text-sm text-[#9A4F3C]">
          {formError}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={status === "loading"}
        className="inline-flex items-center justify-center rounded-full px-8 py-3.5 text-sm font-semibold text-[#F7F3EB] bg-[#5C6B4A] hover:bg-[#4A573C] transition-colors disabled:opacity-60 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#5C6B4A]/50 focus-visible:ring-offset-2 focus-visible:ring-offset-[#F7F3EB]"
      >
        {status === "loading" ? "Submitting…" : "Submit application"}
      </button>
    </form>
  );
}
