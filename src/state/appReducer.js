import { getMachinePage, getMachineType, isMachineScreen, normalizeMachineScreen } from "../data/machines";
import {
  clampDryMinutes,
  createDryPlan,
  DRY_STEP_MINUTES,
  EXTENSION_PLANS_BY_COURSE,
  getPlansForCourse,
  PREPAID_CARD_BALANCE
} from "../data/plans";
import { parseCurrency } from "../utils/formatCurrency";

function getProgressStep(screen) {
  if (screen === "complete") {
    return 4;
  }

  if (screen === "payment") {
    return 3;
  }

  if (screen === "course" || screen === "plan") {
    return 2;
  }

  return 1;
}

function withScreen(state, screen) {
  return {
    ...state,
    screen,
    progressStep: getProgressStep(screen)
  };
}

function closeModal(state) {
  return {
    ...state,
    modal: {
      type: null,
      machineNumber: null,
      action: "select"
    }
  };
}

function resetToMachineScreen(state, screen = "machine-1") {
  return withScreen(
    {
      ...state,
      selectedMachine: null,
      selectedCourse: null,
      selectedPlan: null,
      dryMinutes: 8,
      paymentPrice: 0,
      cardInserted: false,
      remainingBalance: null,
      completeMode: "start",
      isExtension: false,
      settingsPin: "",
      settingsPinError: "",
      settingsPage: null,
      modal: {
        type: null,
        machineNumber: null,
        action: "select"
      }
    },
    screen
  );
}

function findMachine(state, machineNumber) {
  return state.machines.find((machine) => machine.number === machineNumber);
}

function updateMachine(state, machineNumber, updater) {
  return state.machines.map((machine) => {
    if (machine.number !== machineNumber) {
      return machine;
    }

    return updater(machine);
  });
}

function startCourseFlow(state, machineNumber, isExtension) {
  const type = getMachineType(machineNumber);
  let nextCourse = null;
  let nextScreen = "course";

  if (type === "wash-only") {
    nextCourse = "wash";
    nextScreen = "plan";
  } else if (type === "dry-only") {
    nextCourse = "dry";
    nextScreen = "plan";
  } else if (isExtension) {
    nextCourse = "dry";
    nextScreen = "plan";
  }

  return withScreen(
    {
      ...state,
      selectedMachine: machineNumber,
      selectedCourse: nextCourse,
      selectedPlan: null,
      dryMinutes: 8,
      paymentPrice: 0,
      cardInserted: false,
      remainingBalance: null,
      completeMode: "start",
      isExtension: Boolean(isExtension),
      settingsPin: "",
      settingsPinError: "",
      settingsPage: null,
      modal: {
        type: null,
        machineNumber: null,
        action: "select"
      }
    },
    nextScreen
  );
}

function shouldShowCourseSelect(state) {
  return state.selectedMachine && getMachineType(state.selectedMachine) === "wash-dry" && !state.isExtension;
}

function getSelectedMachinePage(state) {
  return state.selectedMachine ? getMachinePage(state.selectedMachine) : "machine-1";
}

export function appReducer(state, action) {
  switch (action.type) {
    case "GO_TO_MACHINE_PAGE": {
      return withScreen(state, normalizeMachineScreen(action.screen));
    }

    case "OPEN_MACHINE_CONFIRM": {
      const machine = findMachine(state, action.machineNumber);

      if (!machine) {
        return state;
      }

      return {
        ...state,
        modal: {
          type: "machine-confirm",
          machineNumber: machine.number,
          action: action.action || "select"
        }
      };
    }

    case "CLOSE_MODAL": {
      return closeModal(state);
    }

    case "CONFIRM_MACHINE_MODAL": {
      const { machineNumber, action: modalAction } = state.modal;
      const machine = findMachine(state, machineNumber);

      if (!machine) {
        return closeModal(state);
      }

      if (modalAction === "stop") {
        return {
          ...state,
          modal: {
            type: "stop-confirm",
            machineNumber,
            action: "stop"
          }
        };
      }

      if (machine.status === "busy") {
        return startCourseFlow(state, machineNumber, true);
      }

      return {
        ...state,
        modal: {
          type: "door-confirm",
          machineNumber,
          action: "select"
        }
      };
    }

    case "CONFIRM_DOOR_MODAL": {
      const machineNumber = state.modal.machineNumber;

      if (!machineNumber) {
        return closeModal(state);
      }

      return startCourseFlow(state, machineNumber, false);
    }

    case "CONFIRM_STOP_MODAL": {
      const machineNumber = state.modal.machineNumber;

      if (!machineNumber) {
        return closeModal(state);
      }

      return closeModal({
        ...state,
        machines: updateMachine(state, machineNumber, (machine) => ({
          ...machine,
          status: "available",
          remainingMinutes: 0
        }))
      });
    }

    case "SELECT_COURSE": {
      const machine = findMachine(state, state.selectedMachine);

      if (!machine || state.screen !== "course") {
        return state;
      }

      if (state.isExtension && machine.type === "wash-dry" && action.course !== "dry") {
        return state;
      }

      return withScreen(
        {
          ...state,
          selectedCourse: action.course,
          selectedPlan: null,
          paymentPrice: 0,
          cardInserted: false
        },
        "plan"
      );
    }

    case "CHANGE_DRY_MINUTES": {
      return {
        ...state,
        dryMinutes: clampDryMinutes(state.dryMinutes + action.diff)
      };
    }

    case "CONFIRM_DRY_TIME": {
      const plan = createDryPlan(state.dryMinutes, state.isExtension);

      return withScreen(
        {
          ...state,
          selectedPlan: plan,
          paymentPrice: parseCurrency(plan.price),
          cardInserted: false
        },
        "payment"
      );
    }

    case "SELECT_PLAN": {
      const plans = getPlansForCourse(state.selectedCourse, state.isExtension, state.dryMinutes);
      const plan = plans[action.index];

      if (!plan) {
        return state;
      }

      return withScreen(
        {
          ...state,
          selectedPlan: plan,
          paymentPrice: parseCurrency(plan.price),
          cardInserted: false
        },
        "payment"
      );
    }

    case "INSERT_CARD": {
      if (state.screen !== "payment") {
        return state;
      }

      return {
        ...state,
        cardInserted: true
      };
    }

    case "OPEN_SETTINGS_PIN": {
      return withScreen(
        {
          ...state,
          selectedMachine: null,
          selectedCourse: null,
          selectedPlan: null,
          paymentPrice: 0,
          cardInserted: false,
          remainingBalance: null,
          settingsPin: "",
          settingsPinError: "",
          settingsPage: null
        },
        "settings-pin"
      );
    }

    case "SETTINGS_ACCESS_DENIED": {
      return {
        ...state,
        settingsPin: "",
        settingsPinError: "設定モードに入れません。"
      };
    }

    case "APPEND_SETTINGS_PIN_DIGIT": {
      if (state.screen !== "settings-pin" || !/^\d$/.test(action.digit) || state.settingsPin.length >= 4) {
        return state;
      }

      return {
        ...state,
        settingsPin: `${state.settingsPin}${action.digit}`,
        settingsPinError: ""
      };
    }

    case "DELETE_SETTINGS_PIN_DIGIT": {
      if (state.screen !== "settings-pin") {
        return state;
      }

      return {
        ...state,
        settingsPin: state.settingsPin.slice(0, -1),
        settingsPinError: ""
      };
    }

    case "SETTINGS_PIN_VALID": {
      return withScreen(
        {
          ...state,
          settingsPin: "",
          settingsPinError: "",
          settingsPage: null
        },
        "settings"
      );
    }

    case "SETTINGS_PIN_INVALID": {
      return {
        ...resetToMachineScreen(state),
        settingsPinError: "暗証番号が違います。"
      };
    }

    case "EXIT_SETTINGS": {
      return resetToMachineScreen(state);
    }

    case "OPEN_SETTINGS_PAGE": {
      if (state.screen !== "settings") {
        return state;
      }

      return {
        ...state,
        settingsPage: action.page
      };
    }

    case "PAYMENT_DECISION": {
      if (action.decision !== "yes") {
        return withScreen(
          {
            ...state,
            cardInserted: false,
            remainingBalance: null,
            completeMode: "failed"
          },
          "complete"
        );
      }

      if (!state.selectedMachine || !state.selectedPlan) {
        return state;
      }

      const price = parseCurrency(state.selectedPlan.price);

      return withScreen(
        {
          ...state,
          remainingBalance: Math.max(PREPAID_CARD_BALANCE - price, 0),
          completeMode: state.isExtension ? "add" : "start",
          machines: updateMachine(state, state.selectedMachine, (machine) => ({
            ...machine,
            status: "busy",
            remainingMinutes: machine.remainingMinutes + state.selectedPlan.time
          }))
        },
        "complete"
      );
    }

    case "BACK": {
      if (state.modal.type) {
        return closeModal(state);
      }

      if (state.screen === "course") {
        return withScreen(
          {
            ...state,
            selectedCourse: null,
            selectedPlan: null,
            paymentPrice: 0,
            cardInserted: false,
            remainingBalance: null,
            isExtension: false
          },
          getSelectedMachinePage(state)
        );
      }

      if (state.screen === "plan") {
        if (shouldShowCourseSelect(state)) {
          return withScreen(
            {
              ...state,
              selectedCourse: null,
              selectedPlan: null,
              paymentPrice: 0,
              cardInserted: false,
              remainingBalance: null
            },
            "course"
          );
        }

        return withScreen(
          {
            ...state,
            selectedCourse: null,
            selectedPlan: null,
            paymentPrice: 0,
            cardInserted: false,
            remainingBalance: null,
            isExtension: false
          },
          getSelectedMachinePage(state)
        );
      }

      if (state.screen === "payment") {
        return withScreen(
          {
            ...state,
            selectedPlan: null,
            paymentPrice: 0,
            cardInserted: false,
            remainingBalance: null
          },
          "plan"
        );
      }

      if (state.screen === "settings" && state.settingsPage) {
        return {
          ...state,
          settingsPage: null
        };
      }

      if (state.screen === "settings-pin" || state.screen === "settings") {
        return resetToMachineScreen(state);
      }

      return state;
    }

    case "CANCEL": {
      if (state.screen === "settings-pin" || state.screen === "settings") {
        return resetToMachineScreen(state);
      }

      if (isMachineScreen(state.screen) || state.screen === "complete") {
        return state;
      }

      return resetToMachineScreen(state);
    }

    case "COMPLETE_RETURN": {
      if (state.screen !== "complete") {
        return state;
      }

      return resetToMachineScreen(state);
    }

    case "ADD_EXTENSION_FROM_COMPLETE": {
      if (!state.selectedMachine) {
        return state;
      }

      const course = getMachineType(state.selectedMachine) === "wash-only" ? "wash" : "dry";
      const addPlan = EXTENSION_PLANS_BY_COURSE[course][0];
      const addPrice = parseCurrency(addPlan.price);
      const cardBalance = state.remainingBalance == null ? PREPAID_CARD_BALANCE : state.remainingBalance;

      if (cardBalance < addPrice) {
        return state;
      }

      return {
        ...state,
        remainingBalance: cardBalance - addPrice,
        completeMode: "add",
        machines: updateMachine(state, state.selectedMachine, (machine) => ({
          ...machine,
          status: "busy",
          remainingMinutes: machine.remainingMinutes + addPlan.time
        }))
      };
    }

    case "TICK_MACHINES": {
      let changed = false;
      const machines = state.machines.map((machine) => {
        if (machine.remainingMinutes <= 0) {
          return machine;
        }

        changed = true;
        const remainingMinutes = Math.max(machine.remainingMinutes - 1, 0);

        return {
          ...machine,
          remainingMinutes,
          status: remainingMinutes === 0 && machine.status === "busy" ? "available" : machine.status
        };
      });

      return changed ? { ...state, machines } : state;
    }

    case "RESET_TO_MACHINE": {
      return resetToMachineScreen(state);
    }

    default:
      return state;
  }
}
