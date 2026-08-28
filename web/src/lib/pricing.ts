/**
 * Casa do Sol — Stay Packages pricing (single source of truth).
 * Package cards and the a-la-carte builder should import from here only.
 */

export const CURRENCY = "EUR" as const;
export const CURRENCY_SYMBOL = "€" as const;

/** Nightly room rates (€) */
export const ROOM_RATES = {
  shared: {
    id: "shared",
    label: "Shared Room",
    nightlyRate: 30,
  },
  private: {
    id: "private",
    label: "Private Room (shared bathroom)",
    nightlyRate: 50,
  },
  suite: {
    id: "suite",
    label: "Suite",
    nightlyRate: 75,
  },
  studio: {
    id: "studio",
    label: "Studio",
    nightlyRate: 85,
  },
} as const;

export type RoomId = keyof typeof ROOM_RATES;

/** Stay length + discount off nightly room rate */
export const STAY_LENGTHS = {
  weekly: {
    id: "weekly",
    label: "Weekly",
    nights: 7,
    discountPercent: 0,
  },
  monthly: {
    id: "monthly",
    label: "Monthly",
    nights: 28,
    discountPercent: 40,
  },
} as const;

export type StayLengthId = keyof typeof STAY_LENGTHS;

/** Add-ons priced per day (€). Meal add-ons apply to weekly packages / a la carte. */
export const ADD_ONS = {
  fullBoard: {
    id: "fullBoard",
    label: "Meals included",
    pricePerDay: 20,
  },
  morningYoga: {
    id: "morningYoga",
    label: "Morning yoga session",
    pricePerDay: 15,
  },
} as const;

export type AddOnId = keyof typeof ADD_ONS;

/** Ordered list for a-la-carte UI */
export const ADD_ON_IDS = Object.keys(ADD_ONS) as AddOnId[];

export const ROOM_IDS = Object.keys(ROOM_RATES) as RoomId[];

/** Meal add-ons (kept for clarity / future rules) */
export const MEAL_ADD_ON_IDS = ["fullBoard"] as const satisfies readonly AddOnId[];

export function isMealAddOn(id: AddOnId): boolean {
  return (MEAL_ADD_ON_IDS as readonly string[]).includes(id);
}

/** Add-ons available for a stay length (meals & yoga for both weekly and monthly) */
export function availableAddOns(_stayLengthId: StayLengthId): AddOnId[] {
  return [...ADD_ON_IDS];
}

/**
 * Packages are room-only. Meals + yoga are optional via the rates UI toggle
 * (or build-your-own add-ons).
 */
export const WELLNESS_ADD_ON_IDS = ["fullBoard", "morningYoga"] as const satisfies readonly AddOnId[];

export const PACKAGE_DEFS = {
  sharedWellness: {
    id: "sharedWellness",
    name: "Shared Room Wellness",
    roomId: "shared" as const,
    includesAddOns: {
      weekly: [] as const,
      monthly: [] as const,
    },
  },
  privateWellness: {
    id: "privateWellness",
    name: "Private Room Wellness",
    roomId: "private" as const,
    includesAddOns: {
      weekly: [] as const,
      monthly: [] as const,
    },
  },
  studioRetreat: {
    id: "studioRetreat",
    name: "Studio Retreat",
    roomId: "studio" as const,
    includesAddOns: {
      weekly: [] as const,
      monthly: [] as const,
    },
  },
  suiteRetreat: {
    id: "suiteRetreat",
    name: "Suite Retreat",
    roomId: "suite" as const,
    includesAddOns: {
      weekly: [] as const,
      monthly: [] as const,
    },
  },
} as const;

export type PackageId = keyof typeof PACKAGE_DEFS;

/** Effective nightly room rate after stay-length discount */
export function discountedNightlyRate(roomId: RoomId, stayLengthId: StayLengthId): number {
  const nightly = ROOM_RATES[roomId].nightlyRate;
  const { discountPercent } = STAY_LENGTHS[stayLengthId];
  return roundMoney(nightly * (1 - discountPercent / 100));
}

/** Sum of selected add-ons for one day */
export function addOnsPerDay(addOnIds: readonly AddOnId[]): number {
  return addOnIds.reduce((sum, id) => sum + ADD_ONS[id].pricePerDay, 0);
}

/** Normalize add-ons for a stay (no stay-length exclusions currently) */
export function filterAddOnsForStay(
  _stayLengthId: StayLengthId,
  addOnIds: readonly AddOnId[],
): AddOnId[] {
  return [...addOnIds];
}

/**
 * Total for a stay:
 * nights × discounted room rate + nights × (sum of add-on €/day)
 */
export function calculateStayTotal(options: {
  roomId: RoomId;
  stayLengthId: StayLengthId;
  addOnIds?: readonly AddOnId[];
}): number {
  const { roomId, stayLengthId, addOnIds = [] } = options;
  const { nights } = STAY_LENGTHS[stayLengthId];
  const allowedAddOns = filterAddOnsForStay(stayLengthId, addOnIds);
  const roomTotal = nights * discountedNightlyRate(roomId, stayLengthId);
  const addOnsTotal = nights * addOnsPerDay(allowedAddOns);
  return roundMoney(roomTotal + addOnsTotal);
}

/** Package add-ons for a given stay length */
export function packageAddOns(
  packageId: PackageId,
  stayLengthId: StayLengthId,
): readonly AddOnId[] {
  return PACKAGE_DEFS[packageId].includesAddOns[stayLengthId];
}

/** Precomputed package totals (weekly + monthly) from the formulas above */
export const PACKAGE_PRICES = Object.fromEntries(
  (Object.keys(PACKAGE_DEFS) as PackageId[]).map((packageId) => {
    const def = PACKAGE_DEFS[packageId];
    return [
      packageId,
      {
        weekly: calculateStayTotal({
          roomId: def.roomId,
          stayLengthId: "weekly",
          addOnIds: def.includesAddOns.weekly,
        }),
        monthly: calculateStayTotal({
          roomId: def.roomId,
          stayLengthId: "monthly",
          addOnIds: def.includesAddOns.monthly,
        }),
      },
    ];
  }),
) as Record<PackageId, { weekly: number; monthly: number }>;

export function roundMoney(value: number): number {
  return Math.round(value * 100) / 100;
}

export function formatEuro(amount: number): string {
  return `${CURRENCY_SYMBOL}${amount.toFixed(amount % 1 === 0 ? 0 : 2)}`;
}

/**
 * Early-bird promo for weekly co-living stays (Casa do Sol rates).
 * - Applies only to weekly stays with the standard inclusions:
 *   meals + morning yoga (fullBoard + morningYoga).
 */
export const COLIVING_WEEKLY_EARLY_BIRD_END_ISO = "2026-09-01";

export const COLIVING_WEEKLY_EARLY_BIRD_TOTALS_EUR: Record<RoomId, number> = {
  shared: 444,
  private: 666,
  suite: 750,
  studio: 777,
};

// Regular totals are set as a consistent premium over early-bird.
// (Used only when early-bird is not active; we don't expose these values elsewhere.)
export const COLIVING_WEEKLY_REGULAR_TOTALS_EUR: Record<RoomId, number> = {
  shared: 493,
  private: 740,
  suite: 833,
  studio: 863,
};

export function isEarlyBirdActive(now: Date = new Date()): boolean {
  const endUtc = new Date(`${COLIVING_WEEKLY_EARLY_BIRD_END_ISO}T23:59:59.999Z`);
  return now.getTime() <= endUtc.getTime();
}

export function colivingWeeklyTotalForRoom(roomId: RoomId, earlyBirdActive: boolean): number {
  return earlyBirdActive
    ? COLIVING_WEEKLY_EARLY_BIRD_TOTALS_EUR[roomId]
    : COLIVING_WEEKLY_REGULAR_TOTALS_EUR[roomId];
}

/** Optional meals + yoga add-ons for package cards / booking */
export function wellnessAddOns(include: boolean): AddOnId[] {
  return include ? [...WELLNESS_ADD_ON_IDS] : [];
}

/**
 * Package total: room (+ optional wellness).
 * Weekly + wellness uses fixed early-bird / regular coliving totals.
 */
export function packageStayTotal(options: {
  packageId: PackageId;
  stayLengthId: StayLengthId;
  includeWellness: boolean;
  earlyBirdActive?: boolean;
}): number {
  const { packageId, stayLengthId, includeWellness, earlyBirdActive = isEarlyBirdActive() } =
    options;
  const roomId = PACKAGE_DEFS[packageId].roomId;
  if (stayLengthId === "weekly" && includeWellness) {
    return colivingWeeklyTotalForRoom(roomId, earlyBirdActive);
  }
  return calculateStayTotal({
    roomId,
    stayLengthId,
    addOnIds: wellnessAddOns(includeWellness),
  });
}
