import {
  adminMockSettings,
  adminSettingLimits,
  courseMockRows,
  machineStatusMockRows,
  revenueMockRows
} from "../mocks/adminMockData";
import { mockDelay } from "../../services/mockDelay";

let mutableSettings = structuredClone(adminMockSettings);
let mutableRevenueRows = [...revenueMockRows];
let mutableMachineRows = [...machineStatusMockRows];
let mutableCourseRows = [...courseMockRows];

function clone(value) {
  return structuredClone(value);
}

function toDateValue(dateTime) {
  return dateTime.slice(0, 10).replaceAll("/", "-");
}

function formatDatePart(value) {
  return String(value).padStart(2, "0");
}

export function createNowText(date = new Date()) {
  const year = date.getFullYear();
  const month = formatDatePart(date.getMonth() + 1);
  const day = formatDatePart(date.getDate());
  const hour = formatDatePart(date.getHours());
  const minute = formatDatePart(date.getMinutes());
  const second = formatDatePart(date.getSeconds());

  return `${year}/${month}/${day} ${hour}:${minute}:${second}`;
}

export const settingsService = {
  getMenuItems() {
    return mockDelay([
      { id: "revenue", label: "回収金額表示", mark: "売", tone: "blue" },
      { id: "general", label: "各種設定画", mark: "設", tone: "blue" },
      { id: "status", label: "ステータス情報", mark: "状", tone: "blue" },
      { id: "course-names", label: "コース名表示画", mark: "名", tone: "blue" },
      { id: "initialize", label: "初期化", mark: "初", tone: "danger" },
      { id: "card-cleaning", label: "カード清掃", mark: "清", tone: "yellow" },
      { id: "pin-change", label: "暗証番号変更", mark: "暗", tone: "blue" }
    ]);
  },

  getSettings() {
    return mockDelay({ settings: clone(mutableSettings), limits: clone(adminSettingLimits) });
  },

  saveOperationSettings(nextSettings) {
    mutableSettings.operation = { ...mutableSettings.operation, ...nextSettings };
    return mockDelay(clone(mutableSettings.operation));
  },

  saveCommunicationSettings(nextSettings) {
    mutableSettings.communication = { ...mutableSettings.communication, ...nextSettings };
    return mockDelay(clone(mutableSettings.communication));
  },

  setCardId(cardId) {
    mutableSettings.cardId = {
      value: cardId,
      updatedAt: createNowText(),
      readerStatus: "設定完了"
    };
    return mockDelay(clone(mutableSettings.cardId));
  },

  readCardIdMock() {
    return mockDelay(`CARD-${Math.floor(1000 + Math.random() * 9000)}`);
  },

  changeSystemTime(parts) {
    mutableSettings.system.mockPcTime = `${parts.year}/${formatDatePart(parts.month)}/${formatDatePart(parts.day)} ${formatDatePart(parts.hour)}:${formatDatePart(parts.minute)}:00`;
    mutableSettings.system.timeSyncStatus = "手動変更（mock）";
    return mockDelay(clone(mutableSettings.system));
  },

  validatePin(pin) {
    return mockDelay(pin === mutableSettings.pin);
  },

  changePin(currentPin, nextPin) {
    if (currentPin !== mutableSettings.pin) {
      return mockDelay({ ok: false, message: "現在の暗証番号が違います。" });
    }

    mutableSettings.pin = nextPin;
    return mockDelay({ ok: true, message: "暗証番号を変更しました。" });
  },

  initializeAllMockData() {
    mutableSettings = structuredClone(adminMockSettings);
    mutableRevenueRows = [...revenueMockRows];
    mutableMachineRows = [...machineStatusMockRows];
    mutableCourseRows = [...courseMockRows];
    return mockDelay({ ok: true });
  }
};

export const revenueService = {
  getRevenueRows() {
    return mockDelay(clone(mutableRevenueRows));
  },

  filterRows(rows, filters) {
    return rows.filter((row) => {
      const date = toDateValue(row.dateTime);
      const matchesMachine = filters.machineNumber === "all" || Number(filters.machineNumber) === row.machineNumber;
      const matchesStart = !filters.startDate || date >= filters.startDate;
      const matchesEnd = !filters.endDate || date <= filters.endDate;
      return matchesMachine && matchesStart && matchesEnd;
    });
  },

  sortRows(rows, sort) {
    const direction = sort.direction === "asc" ? 1 : -1;
    return [...rows].sort((a, b) => {
      const left = a[sort.key];
      const right = b[sort.key];
      if (left === right) return 0;
      return left > right ? direction : -direction;
    });
  },

  createSummary(rows) {
    const controllerRows = rows.filter((row) => row.source === "controller");
    const laundryRows = rows.filter((row) => row.source === "laundry");
    const sum = (items) => items.reduce((total, row) => total + row.amount, 0);
    const machines = [...new Set(rows.map((row) => row.machineNumber))].sort((a, b) => a - b);

    return {
      controller: { amount: sum(controllerRows), count: controllerRows.length },
      laundry: { amount: sum(laundryRows), count: laundryRows.length },
      byMachine: machines.map((machineNumber) => {
        const machineRows = rows.filter((row) => row.machineNumber === machineNumber);
        const controllerAmount = sum(machineRows.filter((row) => row.source === "controller"));
        const laundryAmount = sum(machineRows.filter((row) => row.source === "laundry"));
        return { machineNumber, controllerAmount, laundryAmount, total: controllerAmount + laundryAmount };
      })
    };
  }
};

export const csvExportService = {
  downloadRevenueCsv(displayedData) {
    return mockDelay({ ok: true, rowCount: displayedData.length });
  }
};

export const machineStatusService = {
  getRows() {
    return mockDelay(clone(mutableMachineRows));
  },

  setScenario(machineNumber, scenario) {
    const scenarios = {
      normal: { connection: "接続中", operation: "待機中", remainingMinutes: 0, errorStatus: "正常", errorCode: "-" },
      running: { connection: "接続中", operation: "運転中", remainingMinutes: 22, errorStatus: "正常", errorCode: "-" },
      communication: { connection: "通信エラー", operation: "不明", remainingMinutes: 0, errorStatus: "通信異常", errorCode: "COM-01" },
      machineError: { connection: "接続中", operation: "エラー停止", remainingMinutes: 0, errorStatus: "機器エラー", errorCode: "E-12" }
    };
    mutableMachineRows = mutableMachineRows.map((row) =>
      row.machineNumber === Number(machineNumber) ? { ...row, ...scenarios[scenario], lastCommunicationAt: createNowText() } : row
    );
    return mockDelay(clone(mutableMachineRows));
  }
};

export const courseNameService = {
  getRows() {
    return mockDelay(clone(mutableCourseRows));
  }
};

export const cardCleaningService = {
  waitCycle(cycle) {
    return mockDelay({ cycle, total: 8 }, 260);
  }
};
