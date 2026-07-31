export const adminMockSettings = {
  pin: "1234",
  cardId: {
    value: "CARD-0001",
    updatedAt: "2026/07/30 09:00:00",
    readerStatus: "待機中"
  },
  operation: {
    humanSensorEnabled: true,
    startupWaitSeconds: 10,
    screenWaitSeconds: 30,
    cautionWaitSeconds: 15,
    settlementWaitSeconds: 60
  },
  communication: {
    retryCount: 1,
    responseWaitMs: 500
  },
  system: {
    mcuVersion: "v0.0.0",
    pcAppVersion: "v0.0.0",
    timeSyncStatus: "同期待機中"
  }
};

export const adminSettingLimits = {
  // TODO: 実機仕様が確定したら範囲を正式値に合わせる。
  waitSeconds: { min: 0, max: 999, step: 1 },
  retryCount: { min: 0, max: 10, step: 1 },
  responseWaitMs: { min: 100, max: 5000, step: 100 }
};

export const revenueMockRows = [
  { id: "m-001", source: "controller", dateTime: "2026/07/30 08:12:10", machineNumber: 1, amount: 700, action: "洗濯 標準25分" },
  { id: "m-002", source: "laundry", dateTime: "2026/07/30 08:22:40", machineNumber: 2, amount: 500, action: "乾燥 40分" },
  { id: "m-003", source: "controller", dateTime: "2026/07/30 09:05:31", machineNumber: 3, amount: 700, action: "洗濯 標準25分" },
  { id: "m-004", source: "laundry", dateTime: "2026/07/30 09:18:09", machineNumber: 4, amount: 300, action: "乾燥 24分" },
  { id: "m-005", source: "controller", dateTime: "2026/07/30 10:11:53", machineNumber: 5, amount: 100, action: "乾燥 8分" },
  { id: "m-006", source: "controller", dateTime: "2026/07/30 10:50:03", machineNumber: 6, amount: 700, action: "洗濯 標準25分" },
  { id: "m-007", source: "laundry", dateTime: "2026/07/29 08:42:18", machineNumber: 1, amount: 700, action: "洗濯 標準25分" },
  { id: "m-008", source: "controller", dateTime: "2026/07/29 09:15:44", machineNumber: 2, amount: 200, action: "乾燥 16分" },
  { id: "m-009", source: "laundry", dateTime: "2026/07/29 10:33:21", machineNumber: 3, amount: 700, action: "洗濯 標準25分" },
  { id: "m-010", source: "controller", dateTime: "2026/07/29 11:08:36", machineNumber: 4, amount: 400, action: "乾燥 32分" },
  { id: "m-011", source: "controller", dateTime: "2026/07/29 12:01:05", machineNumber: 5, amount: 300, action: "乾燥 24分" },
  { id: "m-012", source: "laundry", dateTime: "2026/07/29 13:27:17", machineNumber: 6, amount: 700, action: "洗濯 標準25分" },
  { id: "m-013", source: "controller", dateTime: "2026/07/28 08:04:55", machineNumber: 1, amount: 200, action: "乾燥 16分" },
  { id: "m-014", source: "laundry", dateTime: "2026/07/28 08:40:11", machineNumber: 2, amount: 700, action: "洗濯 標準25分" },
  { id: "m-015", source: "controller", dateTime: "2026/07/28 09:12:06", machineNumber: 3, amount: 500, action: "乾燥 40分" },
  { id: "m-016", source: "controller", dateTime: "2026/07/28 10:45:50", machineNumber: 4, amount: 700, action: "洗濯 標準25分" },
  { id: "m-017", source: "laundry", dateTime: "2026/07/28 11:06:30", machineNumber: 5, amount: 100, action: "乾燥 8分" },
  { id: "m-018", source: "controller", dateTime: "2026/07/28 12:52:02", machineNumber: 6, amount: 300, action: "乾燥 24分" },
  { id: "m-019", source: "laundry", dateTime: "2026/07/27 08:19:44", machineNumber: 1, amount: 700, action: "洗濯 標準25分" },
  { id: "m-020", source: "controller", dateTime: "2026/07/27 09:21:14", machineNumber: 2, amount: 400, action: "乾燥 32分" },
  { id: "m-021", source: "laundry", dateTime: "2026/07/27 10:44:28", machineNumber: 3, amount: 700, action: "洗濯 標準25分" },
  { id: "m-022", source: "controller", dateTime: "2026/07/27 11:31:57", machineNumber: 4, amount: 100, action: "乾燥 8分" },
  { id: "m-023", source: "controller", dateTime: "2026/07/27 12:17:39", machineNumber: 5, amount: 700, action: "洗濯 標準25分" },
  { id: "m-024", source: "laundry", dateTime: "2026/07/27 13:59:00", machineNumber: 6, amount: 500, action: "乾燥 40分" },
  { id: "m-025", source: "controller", dateTime: "2026/07/26 08:13:03", machineNumber: 1, amount: 300, action: "乾燥 24分" },
  { id: "m-026", source: "laundry", dateTime: "2026/07/26 09:39:48", machineNumber: 2, amount: 700, action: "洗濯 標準25分" },
  { id: "m-027", source: "controller", dateTime: "2026/07/26 10:48:20", machineNumber: 3, amount: 200, action: "乾燥 16分" },
  { id: "m-028", source: "laundry", dateTime: "2026/07/26 11:14:16", machineNumber: 4, amount: 700, action: "洗濯 標準25分" },
  { id: "m-029", source: "controller", dateTime: "2026/07/26 12:34:41", machineNumber: 5, amount: 500, action: "乾燥 40分" },
  { id: "m-030", source: "laundry", dateTime: "2026/07/26 13:23:09", machineNumber: 6, amount: 300, action: "乾燥 24分" },
  { id: "m-031", source: "controller", dateTime: "2026/07/25 09:02:22", machineNumber: 1, amount: 700, action: "洗濯 標準25分" },
  { id: "m-032", source: "laundry", dateTime: "2026/07/25 10:17:35", machineNumber: 2, amount: 100, action: "乾燥 8分" }
];

export const machineStatusMockRows = [
  { machineNumber: 1, type: "洗濯乾燥機", connection: "接続中", operation: "待機中", remainingMinutes: 0, errorStatus: "正常", errorCode: "-", lastCommunicationAt: "2026/07/30 13:00:11" },
  { machineNumber: 2, type: "洗濯機", connection: "接続中", operation: "運転中", remainingMinutes: 18, errorStatus: "正常", errorCode: "-", lastCommunicationAt: "2026/07/30 13:00:20" },
  { machineNumber: 3, type: "乾燥機", connection: "接続中", operation: "完了", remainingMinutes: 0, errorStatus: "正常", errorCode: "-", lastCommunicationAt: "2026/07/30 12:59:44" },
  { machineNumber: 4, type: "乾燥機", connection: "通信エラー", operation: "不明", remainingMinutes: 0, errorStatus: "通信異常", errorCode: "COM-01", lastCommunicationAt: "2026/07/30 12:41:02" },
  { machineNumber: 5, type: "洗濯機", connection: "接続中", operation: "エラー停止", remainingMinutes: 0, errorStatus: "機器エラー", errorCode: "E-12", lastCommunicationAt: "2026/07/30 12:58:19" },
  { machineNumber: 6, type: "洗濯乾燥機", connection: "接続中", operation: "待機中", remainingMinutes: 0, errorStatus: "正常", errorCode: "-", lastCommunicationAt: "2026/07/30 13:00:09" }
];

export const courseMockRows = [
  { machineNumber: 1, type: "洗濯乾燥機", courseName: "洗濯と乾燥", price: 900, communication: "正常", updatedAt: "2026/07/30 12:58:00" },
  { machineNumber: 1, type: "洗濯乾燥機", courseName: "洗濯", price: 700, communication: "正常", updatedAt: "2026/07/30 12:58:00" },
  { machineNumber: 1, type: "洗濯乾燥機", courseName: "乾燥", price: 100, communication: "正常", updatedAt: "2026/07/30 12:58:00" },
  { machineNumber: 2, type: "洗濯機", courseName: "標準 25分", price: 700, communication: "正常", updatedAt: "2026/07/30 12:58:00" },
  { machineNumber: 3, type: "乾燥機", courseName: "8分", price: 100, communication: "正常", updatedAt: "2026/07/30 12:57:45" },
  { machineNumber: 4, type: "乾燥機", courseName: "8分", price: 100, communication: "通信エラー", updatedAt: "2026/07/30 12:20:10" },
  { machineNumber: 5, type: "洗濯機", courseName: "標準 25分", price: 700, communication: "正常", updatedAt: "2026/07/30 12:57:58" },
  { machineNumber: 6, type: "洗濯乾燥機", courseName: "洗濯と乾燥", price: 900, communication: "正常", updatedAt: "2026/07/30 12:58:05" },
  { machineNumber: 6, type: "洗濯乾燥機", courseName: "乾燥", price: 100, communication: "正常", updatedAt: "2026/07/30 12:58:05" }
];
