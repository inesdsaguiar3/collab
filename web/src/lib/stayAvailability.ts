import { STAY_LENGTHS, type StayLengthId } from "@/lib/pricing";

/** Open booking windows (inclusive last night of stay). */
export const AVAILABILITY_WINDOWS = [
  {
    id: "sep-2026",
    label: "1–14 September 2026",
    shortLabel: "Sep 1–14",
    start: "2026-09-01",
    end: "2026-09-14",
  },
  {
    id: "oct-nov-2026",
    label: "1 October – 30 November 2026",
    shortLabel: "Oct 1 – Nov 30",
    start: "2026-10-01",
    end: "2026-11-30",
  },
] as const;

export type AvailabilityWindowId = (typeof AVAILABILITY_WINDOWS)[number]["id"];

export type CheckInOption = {
  checkIn: string;
  checkOut: string;
  windowId: AvailabilityWindowId;
  windowLabel: string;
};

function parseDay(iso: string): Date {
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(y, m - 1, d);
}

function formatDay(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

export function addDaysIso(iso: string, days: number): string {
  const date = parseDay(iso);
  date.setDate(date.getDate() + days);
  return formatDay(date);
}

export function formatStayDate(iso: string): string {
  return parseDay(iso).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export function formatStayRange(checkIn: string, checkOut: string): string {
  return `${formatStayDate(checkIn)} → ${formatStayDate(checkOut)}`;
}

/** Valid check-ins where the full stay fits inside an open window. */
export function validCheckInOptions(stayLengthId: StayLengthId): CheckInOption[] {
  const nights = STAY_LENGTHS[stayLengthId].nights;
  const options: CheckInOption[] = [];

  for (const window of AVAILABILITY_WINDOWS) {
    const windowEnd = parseDay(window.end);
    let cursor = parseDay(window.start);

    while (cursor <= windowEnd) {
      const checkIn = formatDay(cursor);
      const lastNight = addDaysIso(checkIn, nights - 1);
      if (parseDay(lastNight) <= windowEnd) {
        options.push({
          checkIn,
          checkOut: addDaysIso(checkIn, nights),
          windowId: window.id,
          windowLabel: window.label,
        });
      }
      cursor.setDate(cursor.getDate() + 1);
    }
  }

  return options;
}

export function isValidCheckIn(stayLengthId: StayLengthId, checkIn: string): boolean {
  return validCheckInOptions(stayLengthId).some((o) => o.checkIn === checkIn);
}

export function checkOutForStay(stayLengthId: StayLengthId, checkIn: string): string {
  return addDaysIso(checkIn, STAY_LENGTHS[stayLengthId].nights);
}
