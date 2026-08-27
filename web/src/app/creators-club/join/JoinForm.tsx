"use client";

import { useSearchParams } from "next/navigation";
import { useState, type FormEvent } from "react";

const inputCls =
  "w-full bg-white/[0.07] border border-white/20 rounded-xl px-4 py-3 text-white text-sm placeholder:text-white/40 focus:outline-none focus:border-[#7F5AA1]/70 transition-colors disabled:opacity-60";
const labelCls = "text-xs uppercase tracking-widest text-white/60 font-medium";

const SUGGESTED = [33, 44, 55];

export function JoinForm() {
  const searchParams = useSearchParams();
  const joined = searchParams.get("joined") === "1";
  const cancelled = searchParams.get("cancelled") === "1";

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  if (joined) {
    return (
      <div className="space-y-4 text-center py-4">
        <p className="text-white font-semibold text-xl">You&apos;re in.</p>
        <p className="text-white/55 text-base font-light leading-relaxed">
          Thank you for joining the Creators&apos; Lab. You&apos;ll receive an invitation to the
          group shortly.
        </p>
      </div>
    );
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const response = await fetch("/api/stripe/creators-lab-checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, amount }),
      });
      const data = (await response.json().catch(() => ({}))) as {
        url?: string;
        error?: string;
        details?: string;
      };
      if (!response.ok || !data.url) {
        setError(data.error || data.details || "Could not start checkout. Please try again.");
        return;
      }
      window.location.href = data.url;
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {cancelled && (
        <p className="text-white/50 text-sm font-light">
          Checkout was cancelled. Choose an amount below when you&apos;re ready.
        </p>
      )}

      <div className="space-y-2">
        <label htmlFor="join-name" className={labelCls}>
          Name
        </label>
        <input
          id="join-name"
          type="text"
          required
          autoComplete="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          disabled={loading}
          className={inputCls}
          placeholder="Your name"
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="join-email" className={labelCls}>
          Email
        </label>
        <input
          id="join-email"
          type="email"
          required
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={loading}
          className={inputCls}
          placeholder="you@email.com"
        />
      </div>

      <div className="space-y-3">
        <label htmlFor="join-amount" className={labelCls}>
          Monthly amount (€)
        </label>
        <div className="flex flex-wrap gap-2">
          {SUGGESTED.map((value) => (
            <button
              key={value}
              type="button"
              disabled={loading}
              onClick={() => setAmount(String(value))}
              className={`px-4 py-2 rounded-full text-sm font-medium border transition-colors ${
                amount === String(value)
                  ? "border-[#7F5AA1]/70 bg-[#7F5AA1]/20 text-white"
                  : "border-white/15 bg-white/[0.04] text-white/70 hover:border-white/30"
              }`}
            >
              €{value}
            </button>
          ))}
        </div>
        <div className="relative">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40 text-sm pointer-events-none">
            €
          </span>
          <input
            id="join-amount"
            type="text"
            required
            inputMode="decimal"
            autoComplete="off"
            value={amount}
            onChange={(e) => {
              const next = e.target.value.replace(/[^\d.,]/g, "");
              setAmount(next);
            }}
            disabled={loading}
            className={`${inputCls} pl-8 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none`}
            placeholder="Choose any amount that feels right"
          />
        </div>
        <p className="text-white/40 text-xs font-light leading-relaxed">
          Recurs monthly. Cancel anytime from your Stripe receipt email.
          <br />
          Feeling more abundant? Choose a higher amount to sponsor others who need the space.
        </p>
      </div>

      {error && <p className="text-[#EB8064] text-sm font-light">{error}</p>}

      <button
        type="submit"
        disabled={loading}
        className="w-full py-4 rounded-full font-semibold text-white bg-gradient-to-r from-[#7F5AA1] to-[#D16678] hover:opacity-90 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 shadow-xl shadow-[#7F5AA1]/20 disabled:opacity-60 disabled:hover:scale-100"
      >
        {loading ? "Starting checkout…" : "Continue to payment ✦"}
      </button>
    </form>
  );
}
