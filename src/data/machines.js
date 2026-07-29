export const MACHINE_COUNT = 30;
export const MACHINE_GRID_COLUMNS = 3;
export const MACHINE_GRID_ROWS = 3;
export const MACHINES_PER_PAGE = MACHINE_GRID_COLUMNS * MACHINE_GRID_ROWS;
export const MACHINE_PAGE_COUNT = Math.ceil(MACHINE_COUNT / MACHINES_PER_PAGE);

const INITIAL_STATUSES = [
  "available",
  "available",
  "busy",
  "available",
  "available",
  "busy",
  "busy",
  "available",
  "available",
  "busy",
  "busy",
  "broken",
  "busy",
  "available",
  "available",
  "busy",
  "available",
  "available",
  "busy",
  "available",
  "available",
  "busy",
  "busy",
  "available",
  "available",
  "busy",
  "busy",
  "busy",
  "busy",
  "available"
];

const INITIAL_REMAINING_MINUTES = [
  0,
  0,
  1,
  0,
  0,
  1,
  2,
  0,
  0,
  4,
  5,
  7,
  8,
  0,
  0,
  1,
  0,
  0,
  10,
  0,
  0,
  6,
  20,
  0,
  0,
  20,
  17,
  14,
  30,
  0
];

const WASH_ONLY_MACHINES = new Set([8, 9, 24, 25]);
const DRY_ONLY_MACHINES = new Set([14, 15, 30]);

export function getMachineType(number) {
  if (WASH_ONLY_MACHINES.has(number)) {
    return "wash-only";
  }

  if (DRY_ONLY_MACHINES.has(number)) {
    return "dry-only";
  }

  return "wash-dry";
}

export function createInitialMachines() {
  return Array.from({ length: MACHINE_COUNT }, (_, index) => {
    const number = index + 1;

    return {
      number,
      type: getMachineType(number),
      status: INITIAL_STATUSES[index],
      remainingMinutes: INITIAL_REMAINING_MINUTES[index]
    };
  });
}

export function isMachineScreen(screen) {
  return /^machine-\d+$/.test(screen);
}

export function pageToMachineScreen(page) {
  const safePage = Math.min(MACHINE_PAGE_COUNT, Math.max(1, Number(page) || 1));
  return `machine-${safePage}`;
}

export function getMachinePageNumber(screen) {
  const match = /^machine-(\d+)$/.exec(screen || "");
  return Math.min(MACHINE_PAGE_COUNT, Math.max(1, Number(match?.[1]) || 1));
}

export function normalizeMachineScreen(screen) {
  return pageToMachineScreen(getMachinePageNumber(screen));
}

export function getMachinePage(number) {
  return pageToMachineScreen(Math.ceil(number / MACHINES_PER_PAGE));
}

export function getMachinesForScreen(machines, screen) {
  const page = getMachinePageNumber(screen);
  const start = (page - 1) * MACHINES_PER_PAGE + 1;
  const end = Math.min(page * MACHINES_PER_PAGE, MACHINE_COUNT);
  return machines.filter((machine) => machine.number >= start && machine.number <= end);
}

export function getMachinePagination(screen) {
  const page = getMachinePageNumber(screen);

  return {
    page,
    pageCount: MACHINE_PAGE_COUNT,
    hasPrevious: page > 1,
    hasNext: page < MACHINE_PAGE_COUNT,
    previousScreen: pageToMachineScreen(page - 1),
    nextScreen: pageToMachineScreen(page + 1)
  };
}

export function canExtendMachine(machine) {
  if (!machine) {
    return false;
  }

  return machine.status === "busy" && (machine.type === "wash-dry" || machine.type === "dry-only");
}

export function canSelectMachine(machine) {
  if (!machine || machine.status === "broken") {
    return false;
  }

  if (machine.status === "available") {
    return true;
  }

  return canExtendMachine(machine);
}
