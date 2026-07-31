import { mockConfig } from "./mockConfig";
import { mockDelay } from "./mockDelay";

const revenueRows = [
  { date: "2026/07/30", machineNumber: 3, course: "洗濯", amount: 700 },
  { date: "2026/07/30", machineNumber: 5, course: "乾燥", amount: 100 },
  { date: "2026/07/30", machineNumber: 8, course: "洗濯と乾燥", amount: 1300 }
];

function toCsvValue(value) {
  return `"${String(value).replace(/"/g, '""')}"`;
}

export const settingsMockService = {
  getSettingsSnapshot() {
    return mockDelay({
      physicalSwitchOn: mockConfig.physicalSwitchOn,
      cardId: mockConfig.cardId,
      cardCleaningRequired: mockConfig.cardCleaningRequired,
      usbMemoryAvailable: mockConfig.usbMemoryAvailable,
      softwareVersion: mockConfig.softwareVersion,
      systemClockChangeAllowed: mockConfig.systemClockChangeAllowed,
      waitSettings: mockConfig.waitSettings,
      communicationSettings: mockConfig.communicationSettings
    });
  },

  getRevenueData() {
    return mockDelay(revenueRows);
  },

  createRevenueCsv(rows = revenueRows) {
    const header = ["日付", "機械番号", "コース", "金額"];
    const lines = rows.map((row) => [row.date, row.machineNumber, row.course, row.amount].map(toCsvValue).join(","));

    return [header.map(toCsvValue).join(","), ...lines].join("\r\n");
  }
};
