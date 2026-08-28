"use client";

import { useMemo, useState } from "react";
import {
  addDays,
  addMonths,
  eachDayOfInterval,
  endOfMonth,
  endOfWeek,
  format,
  isBefore,
  isSameDay,
  isSameMonth,
  isWithinInterval,
  parseISO,
  startOfDay,
  startOfMonth,
  startOfWeek,
  subMonths,
} from "date-fns";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { STAY_LENGTHS, type StayLengthId } from "@/lib/pricing";
import { isValidCheckIn } from "@/lib/stayAvailability";

function toIso(date: Date): string {
  return format(date, "yyyy-MM-dd");
}

type StayCalendarProps = {
  stayLengthId: StayLengthId;
  checkInIso: string | null;
  onSelectCheckIn: (iso: string) => void;
};

export function StayCalendar({
  stayLengthId,
  checkInIso,
  onSelectCheckIn,
}: StayCalendarProps) {
  const nights = STAY_LENGTHS[stayLengthId].nights;
  const checkIn = checkInIso ? startOfDay(parseISO(`${checkInIso}T12:00:00`)) : null;
  const checkOut = checkIn ? addDays(checkIn, nights) : null;

  const initialMonth = checkIn ?? startOfDay(parseISO("2026-09-01"));
  const [currentMonth, setCurrentMonth] = useState(
    () => startOfMonth(initialMonth),
  );

  const days = useMemo(() => {
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(currentMonth);
    const calendarStart = startOfWeek(monthStart);
    const calendarEnd = endOfWeek(monthEnd);

    return eachDayOfInterval({ start: calendarStart, end: calendarEnd }).map((date) => {
      const iso = toIso(date);
      const selectable = isValidCheckIn(stayLengthId, iso);
      const inRange =
        Boolean(checkIn && checkOut) &&
        isWithinInterval(date, { start: checkIn!, end: checkOut! });
      const isStart = checkIn ? isSameDay(date, checkIn) : false;
      const isEnd = checkOut ? isSameDay(date, checkOut) : false;

      return {
        date,
        iso,
        selectable,
        inRange,
        isStart,
        isEnd,
        isCurrentMonth: isSameMonth(date, currentMonth),
      };
    });
  }, [currentMonth, stayLengthId, checkIn, checkOut]);

  return (
    <div className="w-full max-w-[320px] mx-auto">
      <div className="flex items-center justify-between mb-4">
        <button
          type="button"
          onClick={() => setCurrentMonth((m) => subMonths(m, 1))}
          className="p-2 rounded-xl text-white/35 hover:text-white hover:bg-white/[0.06] transition-colors"
          aria-label="Previous month"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
        <h3 className="text-xs font-semibold text-white uppercase tracking-[0.22em]">
          {format(currentMonth, "MMMM yyyy")}
        </h3>
        <button
          type="button"
          onClick={() => setCurrentMonth((m) => addMonths(m, 1))}
          className="p-2 rounded-xl text-white/35 hover:text-white hover:bg-white/[0.06] transition-colors"
          aria-label="Next month"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      <div className="grid grid-cols-7 gap-1.5 mb-2 text-center text-[9px] font-semibold text-white/30 uppercase tracking-[0.18em]">
        {["S", "M", "T", "W", "T", "F", "S"].map((d, i) => (
          <div key={`${d}-${i}`} className="py-1">
            {d}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1.5">
        {days.map(
          ({ date, iso, selectable, inRange, isStart, isEnd, isCurrentMonth }) => {
            const past = isBefore(date, startOfDay(new Date()));
            const disabled = !selectable || past;

            let dayClass = "text-white/75 hover:bg-white/[0.08]";
            if (!isCurrentMonth) {
              dayClass = inRange
                ? isStart || isEnd
                  ? "bg-gradient-to-br from-[#EB8064]/70 to-[#D16678]/70 text-white/80 font-semibold"
                  : "bg-[#EB8064]/15 text-white/40"
                : "text-white/15";
            } else if (isStart || isEnd) {
              dayClass =
                "bg-gradient-to-br from-[#EB8064] to-[#D16678] text-white font-semibold shadow-md shadow-[#EB8064]/25";
            } else if (inRange) {
              dayClass = "bg-[#EB8064]/30 text-white";
            } else if (disabled) {
              dayClass = "text-white/20 cursor-not-allowed opacity-40";
            }

            return (
              <button
                key={iso}
                type="button"
                disabled={disabled}
                onClick={() => {
                  onSelectCheckIn(iso);
                  setCurrentMonth(startOfMonth(date));
                }}
                className={`aspect-square flex items-center justify-center rounded-lg text-xs transition-all relative ${dayClass}`}
              >
                {format(date, "d")}
              </button>
            );
          },
        )}
      </div>

      {checkIn && checkOut ? (
        <p className="mt-4 text-center text-[11px] text-white/40 font-light tracking-wide">
          {format(checkIn, "d MMM")} – {format(checkOut, "d MMM yyyy")} · {nights} nights
        </p>
      ) : (
        <p className="mt-4 text-center text-[11px] text-white/35 font-light tracking-wide">
          Tap your arrival date
        </p>
      )}
    </div>
  );
}
