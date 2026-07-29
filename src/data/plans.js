import { formatCurrency } from "../utils/formatCurrency";

export const PREPAID_CARD_BALANCE = 3000;
export const COMPLETE_RETURN_DELAY_MS = 2000;
export const LONG_PRESS_STOP_MS = 2000;
export const DRY_STEP_MINUTES = 8;
export const MIN_DRY_MINUTES = 8;
export const MAX_DRY_MINUTES = 40;

export const STANDARD_PLANS_BY_COURSE = {
  "wash-dry": [
    { id: "wash-dry-large", nameLines: ["洗乾多", "６０分"], price: "1,100円", time: 60 },
    { id: "wash-dry-normal", nameLines: ["洗乾普", "８０分"], price: "1,300円", time: 80 },
    { id: "wash-dry-small", nameLines: ["洗乾少", "１００分"], price: "1,500円", time: 100 }
  ],
  wash: [{ id: "wash-standard", nameLines: ["標準", "２５分"], price: "700円", time: 25 }]
};

export const EXTENSION_PLANS_BY_COURSE = {
  wash: [{ id: "wash-extension", nameLines: ["延長", "１０分"], price: "100円", time: 10 }],
  dry: [{ id: "dry-extension", nameLines: ["延長", "１０分"], price: "100円", time: 10 }]
};

export function clampDryMinutes(minutes) {
  return Math.min(MAX_DRY_MINUTES, Math.max(MIN_DRY_MINUTES, minutes));
}

export function createDryPlan(minutes, isExtension = false) {
  const safeMinutes = clampDryMinutes(minutes || MIN_DRY_MINUTES);
  const priceValue = (safeMinutes / DRY_STEP_MINUTES) * 100;

  return {
    id: `${isExtension ? "dry-extension" : "dry"}-${safeMinutes}`,
    nameLines: [isExtension ? "延長" : "乾燥", `${safeMinutes}分`],
    price: formatCurrency(priceValue),
    time: safeMinutes
  };
}

export function getPlansForCourse(course, isExtension, dryMinutes) {
  if (course === "dry") {
    return [createDryPlan(dryMinutes, isExtension)];
  }

  if (isExtension && EXTENSION_PLANS_BY_COURSE[course]) {
    return EXTENSION_PLANS_BY_COURSE[course];
  }

  return STANDARD_PLANS_BY_COURSE[course] || [];
}
