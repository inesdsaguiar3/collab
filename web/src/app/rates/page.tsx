"use client";

import Link from "next/link";
import { useEffect, useId, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowDown } from "lucide-react";
import {
  ADD_ONS,
  COLIVING_WEEKLY_REGULAR_TOTALS_EUR,
  PACKAGE_DEFS,
  ROOM_IDS,
  ROOM_RATES,
  STAY_LENGTHS,
  availableAddOns,
  calculateStayTotal,
  colivingWeeklyTotalForRoom,
  discountedNightlyRate,
  filterAddOnsForStay,
  formatEuro,
  isEarlyBirdActive,
  packageStayTotal,
  roundMoney,
  wellnessAddOns,
  type AddOnId,
  type PackageId,
  type RoomId,
  type StayLengthId,
} from "@/lib/pricing";
import { formatStayDate, isValidCheckIn, validCheckInOptions } from "@/lib/stayAvailability";
import { StayCalendar } from "@/components/StayCalendar";
import { UPCOMING_CREATORS_LAB, UPCOMING_FLOW_LIVING_LAB, formatLabDateRange } from "@/lib/labs";

type BookingDraft = {
  roomId: RoomId;
  stayLengthId: StayLengthId;
  addOnIds: AddOnId[];
  packageId?: PackageId;
  title: string;
  total: number;
  preferredCheckIn?: string | null;
  contextNote?: string | null;
};

const PACKAGE_CARDS: {
  id: string;
  title: string;
  packageId: PackageId;
  alsoPackageId?: PackageId;
  alsoPriceLabels?: [string, string];
  image: string;
  imageAlt: string;
  features: string[];
  alsoFeatures?: string[];
  featured?: boolean;
}[] = [
  {
    id: "shared",
    title: "Shared Room",
    packageId: "sharedWellness",
    image: "/images/twin.JPG",
    imageAlt: "Shared room at Casa do Sol",
    features: [
      "Co-working with strong WiFi",
      "Daily activity & morning circle",
      "Community events & shared spaces",
    ],
  },
  {
    id: "private-suite",
    title: "Private / Suite",
    packageId: "privateWellness",
    alsoPackageId: "suiteRetreat",
    alsoPriceLabels: ["Private", "Suite"],
    image: "/images/queen-balcony.png",
    imageAlt: "Private room at Casa do Sol",
    features: [
      "Shared bathroom",
      "Private working space",
      "Co-working with strong WiFi",
      "Pool, kitchen & garden access",
    ],
    alsoFeatures: [
      "Private bathroom & balcony",
      "Private working space",
      "Co-working with strong WiFi",
      "Pool, kitchen & garden access",
    ],
    featured: true,
  },
  {
    id: "studio",
    title: "Studio",
    packageId: "studioRetreat",
    image: "/images/family-suite.png",
    imageAlt: "Studio at Casa do Sol",
    features: [
      "Private kitchen & living area",
      "Private working area",
      "Co-working with strong WiFi",
    ],
  },
];

function packageExtras(stayLengthId: StayLengthId, includeWellness: boolean): string[] {
  const lines: string[] = [];
  if (includeWellness) {
    lines.push("Meals included", "Morning yoga");
  }
  if (stayLengthId === "monthly") lines.push("40% off room");
  return lines;
}

function StayLengthToggle({
  value,
  onChange,
}: {
  value: StayLengthId;
  onChange: (next: StayLengthId) => void;
}) {
  return (
    <div className="inline-flex rounded-full border border-white/15 bg-white/[0.04] p-1">
      {(["weekly", "monthly"] as const).map((id) => (
        <button
          key={id}
          type="button"
          onClick={() => onChange(id)}
          className={`px-5 py-2 rounded-full text-sm font-semibold transition-colors ${
            value === id
              ? "bg-gradient-to-r from-[#7F5AA1] to-[#D16678] text-white shadow-md shadow-[#7F5AA1]/20"
              : "text-white/55 hover:text-white"
          }`}
        >
          {STAY_LENGTHS[id].label}
        </button>
      ))}
    </div>
  );
}

function MealsYogaToggle({
  value,
  onChange,
}: {
  value: boolean;
  onChange: (next: boolean) => void;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={value}
      onClick={() => onChange(!value)}
      className={`inline-flex w-full sm:w-auto items-center gap-3 rounded-full border px-4 py-2.5 text-left transition-colors ${
        value
          ? "border-[#EB8064]/60 bg-[#EB8064]/15 text-white"
          : "border-white/15 bg-white/[0.04] text-white/55 hover:text-white hover:border-white/30"
      }`}
    >
      <span
        className={`relative h-5 w-9 shrink-0 rounded-full transition-colors ${
          value ? "bg-[#EB8064]" : "bg-white/20"
        }`}
        aria-hidden
      >
        <span
          className={`absolute top-0.5 left-0.5 h-4 w-4 rounded-full bg-white transition-transform ${
            value ? "translate-x-4" : "translate-x-0"
          }`}
        />
      </span>
      <span className="text-sm font-semibold leading-tight">
        Meals &amp; morning yoga
        <span className="block text-[11px] font-normal text-white/45">
          +{formatEuro(ADD_ONS.fullBoard.pricePerDay + ADD_ONS.morningYoga.pricePerDay)}/day
        </span>
      </span>
    </button>
  );
}

function BookStayModal({
  draft,
  onClose,
}: {
  draft: BookingDraft;
  onClose: () => void;
}) {
  const titleId = useId();
  const dateOptions = useMemo(
    () => validCheckInOptions(draft.stayLengthId),
    [draft.stayLengthId],
  );
  const preferred =
    draft.preferredCheckIn &&
    dateOptions.some((o) => o.checkIn === draft.preferredCheckIn)
      ? draft.preferredCheckIn
      : null;
  const [checkInDate, setCheckInDate] = useState<string | null>(
    preferred ?? dateOptions[0]?.checkIn ?? null,
  );
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  const selected = dateOptions.find((o) => o.checkIn === checkInDate);
  const nights = STAY_LENGTHS[draft.stayLengthId].nights;
  const roomLabel = ROOM_RATES[draft.roomId].label;
  const addOnLabels = draft.addOnIds.map((id) => ADD_ONS[id].label);

  async function handlePay() {
    if (!checkInDate || !selected) {
      setErrorMessage("Please choose an available arrival date.");
      return;
    }
    setLoading(true);
    setErrorMessage("");
    try {
      const res = await fetch("/api/stripe/rates-checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          roomId: draft.roomId,
          stayLengthId: draft.stayLengthId,
          addOnIds: draft.addOnIds,
          checkInDate,
          packageId: draft.packageId,
        }),
      });
      const data = (await res.json().catch(() => ({}))) as {
        url?: string;
        error?: string;
        details?: string;
      };
      if (!res.ok || !data.url) {
        setErrorMessage(data.error ?? data.details ?? "Could not start checkout.");
        setLoading(false);
        return;
      }
      window.location.href = data.url;
    } catch {
      setErrorMessage("Could not start checkout. Check your connection and try again.");
      setLoading(false);
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4 bg-black/65 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 16 }}
        transition={{ duration: 0.25 }}
        className="w-full max-w-lg max-h-[92vh] overflow-y-auto border border-white/12 bg-[#2f1d26] shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4 px-6 pt-6 pb-4">
          <div className="space-y-1">
            <p className="text-[10px] uppercase tracking-[0.28em] text-[#EB8064] font-semibold">
              Book your stay
            </p>
            <h2 id={titleId} className="text-2xl md:text-3xl font-black text-white tracking-tight">
              {draft.title}
            </h2>
            {draft.contextNote ? (
              <p className="text-sm text-white/45 font-light pt-1">{draft.contextNote}</p>
            ) : null}
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-white/35 hover:text-white text-2xl leading-none"
            aria-label="Close"
          >
            ×
          </button>
        </div>

        <div className="px-6 pb-6 space-y-6">
          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3">
              <p className="text-[9px] uppercase tracking-[0.2em] text-[#EB8064] font-semibold mb-1">
                Room
              </p>
              <p className="text-sm text-white/85 font-medium leading-snug">{roomLabel}</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3">
              <p className="text-[9px] uppercase tracking-[0.2em] text-[#EB8064] font-semibold mb-1">
                Stay
              </p>
              <p className="text-sm text-white/85 font-medium">
                {STAY_LENGTHS[draft.stayLengthId].label} · {nights} nights
              </p>
            </div>
          </div>

          {addOnLabels.length > 0 ? (
            <p className="text-sm text-white/45 font-light">
              Includes {addOnLabels.join(" · ")}
            </p>
          ) : draft.roomId === "shared" ? (
            <p className="text-sm text-white/45 font-light">
              Room only — yoga and food available as add-ons
            </p>
          ) : (
            <p className="text-sm text-white/45 font-light">Room only — yoga available as add-on</p>
          )}

          {dateOptions.length === 0 ? (
            <p className="text-sm text-white/50 font-light">
              No open dates for this stay length. Available: 1–14 Sep and 1 Oct – 30 Nov 2026.
            </p>
          ) : (
            <div className="rounded-3xl border border-white/10 bg-white/[0.03] px-4 py-5 md:px-6">
              <p className="text-center text-[10px] uppercase tracking-[0.24em] text-white/40 font-semibold mb-4">
                Arrival date
              </p>
              <StayCalendar
                stayLengthId={draft.stayLengthId}
                checkInIso={checkInDate}
                onSelectCheckIn={(iso) => {
                  setCheckInDate(iso);
                  setErrorMessage("");
                }}
              />
            </div>
          )}

          {selected ? (
            <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-[#EB8064]/10 to-transparent px-5 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-[9px] uppercase tracking-[0.2em] text-[#EB8064] font-semibold mb-1">
                    Stay period
                  </p>
                  <p className="text-sm text-white font-medium">
                    {formatStayDate(selected.checkIn)} – {formatStayDate(selected.checkOut)}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-[9px] uppercase tracking-[0.2em] text-[#EB8064] font-semibold mb-1">
                    Total
                  </p>
                  <p className="text-2xl font-black text-white tabular-nums">
                    {formatEuro(draft.total)}
                  </p>
                  {draft.stayLengthId === "weekly" && isEarlyBirdActive() ? (
                    <p className="text-[10px] uppercase tracking-[0.18em] font-bold text-[#EB8064] mt-1">
                      Early Bird
                    </p>
                  ) : null}
                </div>
              </div>
            </div>
          ) : null}

          {errorMessage ? (
            <p role="alert" className="text-sm text-red-400/90 font-light text-center">
              {errorMessage}
            </p>
          ) : null}

          <button
            type="button"
            onClick={handlePay}
            disabled={loading || !selected}
            className="w-full py-4 rounded-full font-semibold text-sm tracking-wide text-white bg-gradient-to-r from-[#7F5AA1] to-[#D16678] hover:opacity-90 transition-opacity disabled:opacity-50 shadow-lg shadow-[#7F5AA1]/20"
          >
            {loading ? "Opening Stripe…" : "Confirm & pay"}
          </button>
        </div>
      </motion.div>
    </div>
  );
}

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { delay, duration: 0.55, ease: "easeOut" as const },
});

const bookBtnCls =
  "inline-flex items-center justify-center w-full py-3.5 rounded-full font-semibold text-sm text-white bg-gradient-to-r from-[#7F5AA1] to-[#D16678] hover:opacity-90 transition-opacity shadow-lg shadow-[#7F5AA1]/15";

export default function RatesPage() {
  const [stayLengthId, setStayLengthId] = useState<StayLengthId>("weekly");
  const [includeWellness, setIncludeWellness] = useState(true);
  const [customOpen, setCustomOpen] = useState(false);
  const [customRoomId, setCustomRoomId] = useState<RoomId>("shared");
  const [customAddOns, setCustomAddOns] = useState<AddOnId[]>([...wellnessAddOns(true)]);
  const [booking, setBooking] = useState<BookingDraft | null>(null);
  const [privateSuiteId, setPrivateSuiteId] = useState<PackageId>("privateWellness");
  const [preferredCheckIn, setPreferredCheckIn] = useState<string | null>(null);
  const [labSource, setLabSource] = useState<"creators" | "flow" | null>(null);
  const earlyBirdActive = isEarlyBirdActive();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const checkIn = params.get("checkIn");
    const stay = params.get("stay");
    const from = params.get("from");

    if (stay === "weekly" || stay === "monthly") {
      setStayLengthId(stay);
      const wellnessDefault = stay !== "monthly";
      setIncludeWellness(wellnessDefault);
      setCustomAddOns([...wellnessAddOns(wellnessDefault)]);
    }
    const stayForValidation =
      stay === "monthly" ? "monthly" : "weekly";
    if (checkIn && isValidCheckIn(stayForValidation, checkIn)) {
      setPreferredCheckIn(checkIn);
    }
    if (from === "lab") setLabSource("creators");
    if (from === "flow-lab") setLabSource("flow");
  }, []);

  const nights = STAY_LENGTHS[stayLengthId].nights;
  const fromNightly = ROOM_RATES.shared.nightlyRate;
  const allowedCustomAddOns = filterAddOnsForStay(stayLengthId, customAddOns);

  const isStandardWeeklyColiving =
    stayLengthId === "weekly" &&
    allowedCustomAddOns.includes("fullBoard") &&
    allowedCustomAddOns.includes("morningYoga");

  const customTotal = isStandardWeeklyColiving
    ? colivingWeeklyTotalForRoom(customRoomId, earlyBirdActive)
    : calculateStayTotal({
        roomId: customRoomId,
        stayLengthId,
        addOnIds: allowedCustomAddOns,
      });

  const addOnsTotal = roundMoney(
    nights * allowedCustomAddOns.reduce((sum, id) => sum + ADD_ONS[id].pricePerDay, 0),
  );
  const effectiveNightly = isStandardWeeklyColiving
    ? roundMoney((customTotal - addOnsTotal) / nights)
    : discountedNightlyRate(customRoomId, stayLengthId);
  const roomSubtotal = roundMoney(nights * effectiveNightly);
  const addOnsForUi = availableAddOns(stayLengthId);

  const activeLab =
    labSource === "flow"
      ? UPCOMING_FLOW_LIVING_LAB
      : labSource === "creators"
        ? UPCOMING_CREATORS_LAB
        : null;
  const labContextNote = activeLab
    ? `${activeLab.title} · ${formatLabDateRange(activeLab.startDate, activeLab.endDate)}`
    : null;

  function setStayLength(next: StayLengthId) {
    setStayLengthId(next);
    const wellnessDefault = next !== "monthly";
    setIncludeWellness(wellnessDefault);
    setCustomAddOns([...wellnessAddOns(wellnessDefault)]);
  }

  function setWellness(next: boolean) {
    setIncludeWellness(next);
    setCustomAddOns((prev) => {
      const without = prev.filter((id) => id !== "fullBoard" && id !== "morningYoga");
      return next ? [...without, ...wellnessAddOns(true)] : without;
    });
  }

  function toggleAddOn(id: AddOnId) {
    setCustomAddOns((prev) => {
      const next = prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id];
      setIncludeWellness(next.includes("fullBoard") && next.includes("morningYoga"));
      return next;
    });
  }

  function openPackageBooking(packageId: PackageId) {
    const def = PACKAGE_DEFS[packageId];
    const addOnIds = wellnessAddOns(includeWellness);
    setBooking({
      roomId: def.roomId,
      stayLengthId,
      addOnIds,
      packageId,
      title: def.name.replace(" Wellness", "").replace(" Retreat", ""),
      total: packageStayTotal({
        packageId,
        stayLengthId,
        includeWellness,
        earlyBirdActive,
      }),
      preferredCheckIn,
      contextNote: labContextNote,
    });
  }

  function openCustomBooking() {
    setBooking({
      roomId: customRoomId,
      stayLengthId,
      addOnIds: allowedCustomAddOns,
      title: ROOM_RATES[customRoomId].label,
      total: customTotal,
      preferredCheckIn,
      contextNote: labContextNote,
    });
  }

  function openBuildYourOwn() {
    setCustomRoomId("shared");
    setCustomOpen(true);
    window.setTimeout(() => {
      document.getElementById("build-your-own")?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 80);
  }

  return (
    <div className="px-5 sm:px-6 py-16 sm:py-20 min-h-screen min-w-0 overflow-x-hidden pb-10">
      <section className="max-w-6xl mx-auto pt-4 sm:pt-8 space-y-10 sm:space-y-14">
        <div className="max-w-2xl space-y-5 sm:space-y-6">
          <p className="text-xs uppercase tracking-[0.3em] text-[#EB8064] font-semibold">
            Casa do Sol · Óbidos
          </p>
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-black tracking-tight text-white leading-[1.08]">
            Rates &amp; <span className="gradient-text">booking</span>
          </h1>
          <button
            type="button"
            onClick={openBuildYourOwn}
            className="group inline-flex items-baseline gap-2.5 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[#EB8064]/50 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent rounded-sm"
            aria-label="Build your own stay from €30 per night, shared room"
          >
            <span className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight tabular-nums">
              From {formatEuro(fromNightly)}
              <span className="text-lg sm:text-xl md:text-2xl font-semibold text-white/55">/night</span>
            </span>
            <ArrowDown
              className="w-4 h-4 md:w-5 md:h-5 text-white/30 group-hover:text-white/55 group-hover:translate-y-0.5 transition-all duration-200 shrink-0 relative top-[-0.15em]"
              strokeWidth={1.75}
              aria-hidden
            />
          </button>
        </div>

        {activeLab && preferredCheckIn ? (
          <div className="rounded-2xl border border-[#EB8064]/30 bg-[#EB8064]/10 px-5 py-4 max-w-2xl">
            <p className="text-[10px] uppercase tracking-[0.22em] text-[#EB8064] font-semibold">
              {activeLab.title}
            </p>
            <p className="text-sm text-white/70 font-light mt-1 leading-relaxed">
              Arrival pre-selected for{" "}
              {formatLabDateRange(activeLab.startDate, activeLab.endDate)} (weekly stay). You can
              still change dates when you book.
            </p>
          </div>
        ) : null}

        <div className="flex flex-col gap-4">
          <p className="text-sm text-white/45 font-light leading-relaxed">
            {STAY_LENGTHS[stayLengthId].label} · {nights} nights
            {stayLengthId === "monthly" ? " · 40% off room rate" : ""}
            {includeWellness ? " · meals & morning yoga" : " · room only"}
            {" · "}
            open dates 1–14 Sep &amp; 1 Oct – 30 Nov 2026
          </p>
          <div className="flex flex-col xs:flex-row flex-wrap items-stretch sm:items-center gap-3">
            <MealsYogaToggle value={includeWellness} onChange={setWellness} />
            <StayLengthToggle value={stayLengthId} onChange={setStayLength} />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
          {PACKAGE_CARDS.map((card, i) => {
            const selectedPackageId =
              card.alsoPackageId && card.id === "private-suite"
                ? privateSuiteId
                : card.packageId;
            const extras = packageExtras(stayLengthId, includeWellness);
            const selectedRoomId = PACKAGE_DEFS[selectedPackageId].roomId;
            const showEarlyBird =
              earlyBirdActive && stayLengthId === "weekly" && includeWellness;
            const price = packageStayTotal({
              packageId: selectedPackageId,
              stayLengthId,
              includeWellness,
              earlyBirdActive,
            });
            const regularPrice = showEarlyBird
              ? COLIVING_WEEKLY_REGULAR_TOTALS_EUR[selectedRoomId]
              : null;
            const alsoPrice = card.alsoPackageId
              ? packageStayTotal({
                  packageId: card.alsoPackageId,
                  stayLengthId,
                  includeWellness,
                  earlyBirdActive,
                })
              : null;
            const [primaryPriceLabel, secondaryPriceLabel] = card.alsoPriceLabels ?? [];
            const activeFeatures =
              card.alsoPackageId &&
              card.alsoFeatures &&
              selectedPackageId === card.alsoPackageId
                ? card.alsoFeatures
                : card.features;

            return (
              <motion.article
                key={card.id}
                {...fadeUp(i * 0.08)}
                className={`relative flex h-full flex-col overflow-hidden transition-colors duration-300 ${
                  card.featured
                    ? "border border-[#7F5AA1]/45 bg-[#7F5AA1]/[0.1]"
                    : "border border-white/10 bg-white/[0.04]"
                }`}
              >
                {card.featured && (
                  <span className="absolute top-4 left-4 z-10 px-3 py-1 text-[10px] uppercase tracking-[0.22em] font-semibold text-white/90 border border-white/20 bg-black/40 backdrop-blur-sm">
                    Most Popular
                  </span>
                )}
                <div className="relative aspect-[5/4] shrink-0 overflow-hidden">
                  <img
                    src={card.image}
                    alt={card.imageAlt}
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#2f1d26] via-black/20 to-transparent" />
                  {showEarlyBird ? (
                    <span className="absolute bottom-3 left-3 z-10 px-3 py-1.5 text-[11px] uppercase tracking-[0.2em] font-bold text-white bg-[#EB8064] shadow-lg shadow-[#EB8064]/30">
                      Early Bird
                    </span>
                  ) : null}
                </div>

                <div className="flex flex-1 flex-col gap-4 p-6 md:p-7">
                  <div className="space-y-3">
                    <div className="flex items-start justify-between gap-3">
                      <h2 className="text-2xl font-black tracking-tight text-white leading-tight">
                        {card.title}
                      </h2>
                      <div className="text-right shrink-0">
                        {regularPrice !== null ? (
                          <div className="space-y-0.5">
                            <p className="text-sm leading-none line-through text-white/40 tabular-nums">
                              {formatEuro(regularPrice)}
                            </p>
                            <p className="text-2xl font-black text-[#EB8064] tabular-nums leading-tight">
                              {formatEuro(price)}
                            </p>
                            <p className="text-[10px] uppercase tracking-[0.18em] font-bold text-[#EB8064]">
                              Early Bird
                            </p>
                          </div>
                        ) : (
                          <p className="text-xl font-black text-white tabular-nums">
                            {formatEuro(price)}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="min-h-[2.25rem]">
                      {card.alsoPackageId ? (
                        <div className="inline-flex rounded-full border border-white/15 bg-white/[0.04] p-0.5">
                          {(
                            [
                              [card.packageId, primaryPriceLabel],
                              [card.alsoPackageId, secondaryPriceLabel],
                            ] as const
                          ).map(([id, label]) => (
                            <button
                              key={id}
                              type="button"
                              onClick={() => setPrivateSuiteId(id)}
                              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-colors ${
                                privateSuiteId === id
                                  ? "bg-white/15 text-white"
                                  : "text-white/45 hover:text-white/75"
                              }`}
                            >
                              {label}
                            </button>
                          ))}
                        </div>
                      ) : (
                        <p className="text-xs text-white/35 font-light">
                          {nights} nights · {STAY_LENGTHS[stayLengthId].label}
                        </p>
                      )}
                    </div>

                    <p className="text-sm text-white/50 font-light leading-relaxed">
                      {activeFeatures.join(" · ")}
                    </p>

                    {extras.length > 0 ? (
                      <p className="text-xs text-[#EB8064]/90 font-medium tracking-wide">
                        {extras.join(" · ")}
                      </p>
                    ) : (
                      <p className="text-xs text-white/30 font-light">Room only</p>
                    )}

                    {alsoPrice !== null && primaryPriceLabel && secondaryPriceLabel ? (
                      <p className="text-xs text-white/35 font-light">
                        {primaryPriceLabel}{" "}
                        {formatEuro(
                          packageStayTotal({
                            packageId: card.packageId,
                            stayLengthId,
                            includeWellness,
                            earlyBirdActive,
                          }),
                        )}{" "}
                        · {secondaryPriceLabel} {formatEuro(alsoPrice)}
                      </p>
                    ) : null}
                  </div>

                  <button
                    type="button"
                    onClick={() => openPackageBooking(selectedPackageId)}
                    className={`${bookBtnCls} mt-auto`}
                  >
                    Book
                  </button>
                </div>
              </motion.article>
            );
          })}
        </div>

        <div id="build-your-own" className="border border-white/10 bg-white/[0.03] scroll-mt-28">
          <button
            type="button"
            onClick={() => setCustomOpen((o) => !o)}
            aria-expanded={customOpen}
            className="w-full flex items-center justify-between gap-4 px-6 py-5 md:px-8 text-left hover:bg-white/[0.03] transition-colors"
          >
            <div className="space-y-1">
              <p className="text-lg md:text-xl font-semibold text-white">
                Prefer to build your own stay?
              </p>
              <p className="text-sm text-white/45 font-light">
                Pick a room, stay length, and add-ons.
              </p>
            </div>
            <span
              className={`shrink-0 text-white/40 text-2xl leading-none transition-transform duration-200 ${
                customOpen ? "rotate-45" : ""
              }`}
              aria-hidden
            >
              +
            </span>
          </button>

          <AnimatePresence initial={false}>
            {customOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="overflow-hidden"
              >
                <div className="border-t border-white/10 px-6 py-8 md:px-8 space-y-8">
                  <div className="space-y-3">
                    <p className="text-xs uppercase tracking-[0.2em] text-white/45 font-semibold">
                      Room type
                    </p>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      {ROOM_IDS.map((id) => (
                        <button
                          key={id}
                          type="button"
                          onClick={() => setCustomRoomId(id)}
                          className={`rounded-xl border px-4 py-3 text-left transition-colors ${
                            customRoomId === id
                              ? "border-[#EB8064] bg-[#EB8064]/15 text-white"
                              : "border-white/15 text-white/65 hover:border-white/30"
                          }`}
                        >
                          <span className="block text-sm font-semibold">{ROOM_RATES[id].label}</span>
                          <span className="block text-xs text-white/45 mt-1 tabular-nums">
                            {formatEuro(ROOM_RATES[id].nightlyRate)}/night
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-3">
                    <p className="text-xs uppercase tracking-[0.2em] text-white/45 font-semibold">
                      Stay length
                    </p>
                    <StayLengthToggle value={stayLengthId} onChange={setStayLength} />
                  </div>

                  <div className="space-y-3">
                    <p className="text-xs uppercase tracking-[0.2em] text-white/45 font-semibold">
                      Add-ons
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {addOnsForUi.map((id) => {
                        const addOn = ADD_ONS[id];
                        const checked = allowedCustomAddOns.includes(id);
                        return (
                          <button
                            key={id}
                            type="button"
                            onClick={() => toggleAddOn(id)}
                            aria-pressed={checked}
                            className={`rounded-full border px-4 py-2 text-left transition-colors ${
                              checked
                                ? "border-[#EB8064] bg-[#EB8064]/15 text-white"
                                : "border-white/15 text-white/65 hover:border-white/30 hover:text-white"
                            }`}
                          >
                            <span className="text-sm font-semibold">{addOn.label}</span>
                            <span className="ml-2 text-xs text-white/45 tabular-nums">
                              +{formatEuro(addOn.pricePerDay)}/day
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div className="rounded-xl border border-white/10 bg-white/[0.04] px-5 py-5 space-y-4">
                    <p className="text-xs uppercase tracking-[0.2em] text-white/45 font-semibold">
                      Price summary
                    </p>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between gap-4 text-white/65">
                        <span>
                          {nights} nights × {formatEuro(effectiveNightly)}
                          {STAY_LENGTHS[stayLengthId].discountPercent > 0
                            ? ` (${STAY_LENGTHS[stayLengthId].discountPercent}% off)`
                            : ""}
                        </span>
                        <span className="tabular-nums text-white/80 shrink-0">
                          {formatEuro(roomSubtotal)}
                        </span>
                      </div>
                      {allowedCustomAddOns.map((id) => {
                        const line = roundMoney(ADD_ONS[id].pricePerDay * nights);
                        return (
                          <div key={id} className="flex justify-between gap-4 text-white/65">
                            <span>
                              {ADD_ONS[id].label} × {nights} days
                            </span>
                            <span className="tabular-nums text-white/80 shrink-0">
                              {formatEuro(line)}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                    <div className="flex justify-between gap-4 border-t border-white/10 pt-3">
                      <span className="text-base font-semibold text-white">Total</span>
                      <span className="text-2xl font-black text-white tabular-nums">
                        {formatEuro(customTotal)}
                      </span>
                    </div>
                    <button type="button" onClick={openCustomBooking} className={bookBtnCls}>
                      Book this stay
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <p className="text-center text-sm text-white/35 font-light">
          Want the full story of the house first?{" "}
          <Link href="/coliving" className="text-white/55 underline underline-offset-4 hover:text-white">
            Back to coliving
          </Link>
        </p>
      </section>

      <AnimatePresence>
        {booking && (
          <BookStayModal draft={booking} onClose={() => setBooking(null)} />
        )}
      </AnimatePresence>
    </div>
  );
}
