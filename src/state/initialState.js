import { createInitialMachines } from "../data/machines";

export const initialState = {
  screen: "machine-1",
  progressStep: 1,
  selectedMachine: null,
  selectedCourse: null,
  selectedPlan: null,
  dryMinutes: 8,
  paymentPrice: 0,
  cardInserted: false,
  remainingBalance: null,
  completeMode: "start",
  isExtension: false,
  modal: {
    type: null,
    machineNumber: null,
    action: "select"
  },
  machines: createInitialMachines()
};
