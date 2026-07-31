import { useCallback, useEffect, useReducer } from "react";
import KioskViewport from "./components/layout/KioskViewport";
import AppShell from "./components/layout/AppShell";
import MachineConfirmModal from "./components/modal/MachineConfirmModal";
import DoorConfirmModal from "./components/modal/DoorConfirmModal";
import StopConfirmModal from "./components/modal/StopConfirmModal";
import MachineSelectionScreen from "./screens/MachineSelectionScreen";
import CourseSelectionScreen from "./screens/CourseSelectionScreen";
import PlanSelectionScreen from "./screens/PlanSelectionScreen";
import DryTimeSelectionScreen from "./screens/DryTimeSelectionScreen";
import PaymentScreen from "./screens/PaymentScreen";
import CompleteScreen from "./screens/CompleteScreen";
import SettingsPinScreen from "./screens/SettingsPinScreen";
import SettingsModeScreen from "./screens/SettingsModeScreen";
import { COMPLETE_RETURN_DELAY_MS } from "./data/plans";
import { isMachineScreen } from "./data/machines";
import { useClock } from "./hooks/useClock";
import { useMachineTimer } from "./hooks/useMachineTimer";
import { adminAccessService } from "./services/adminAccessService";
import { appReducer } from "./state/appReducer";
import { initialState } from "./state/initialState";

function getContentMode(screen) {
  if (screen === "settings-pin" || screen === "settings") {
    return "settings";
  }

  if (screen === "payment") {
    return "payment";
  }

  if (screen === "complete") {
    return "complete";
  }

  if (screen === "course" || screen === "plan") {
    return "course";
  }

  return "machine";
}

function isFooterDisabled(screen) {
  return screen === "complete";
}

function shouldShowFooter(screen) {
  return !isMachineScreen(screen);
}

function isSettingsScreen(screen) {
  return screen === "settings-pin" || screen === "settings";
}

function CurrentScreen({ state, dispatch }) {
  if (state.screen === "course") {
    return <CourseSelectionScreen state={state} dispatch={dispatch} />;
  }

  if (state.screen === "plan") {
    return state.selectedCourse === "dry" ? (
      <DryTimeSelectionScreen state={state} dispatch={dispatch} />
    ) : (
      <PlanSelectionScreen state={state} dispatch={dispatch} />
    );
  }

  if (state.screen === "payment") {
    return <PaymentScreen state={state} dispatch={dispatch} />;
  }

  if (state.screen === "complete") {
    return <CompleteScreen state={state} dispatch={dispatch} />;
  }

  if (state.screen === "settings-pin") {
    return <SettingsPinScreen state={state} dispatch={dispatch} />;
  }

  if (state.screen === "settings") {
    return <SettingsModeScreen state={state} dispatch={dispatch} />;
  }

  return <MachineSelectionScreen state={state} dispatch={dispatch} />;
}

function CurrentModal({ state, dispatch }) {
  const { modal } = state;

  if (!modal.type) {
    return null;
  }

  const machine = state.machines.find((item) => item.number === modal.machineNumber);
  const commonProps = {
    machineNumber: modal.machineNumber,
    onBack: () => dispatch({ type: "CLOSE_MODAL" })
  };

  if (modal.type === "machine-confirm") {
    return (
      <MachineConfirmModal
        {...commonProps}
        action={modal.action}
        isBusy={machine?.status === "busy"}
        onConfirm={() => dispatch({ type: "CONFIRM_MACHINE_MODAL" })}
      />
    );
  }

  if (modal.type === "door-confirm") {
    return <DoorConfirmModal {...commonProps} onConfirm={() => dispatch({ type: "CONFIRM_DOOR_MODAL" })} />;
  }

  if (modal.type === "stop-confirm") {
    return <StopConfirmModal {...commonProps} onConfirm={() => dispatch({ type: "CONFIRM_STOP_MODAL" })} />;
  }

  return null;
}

export default function App() {
  const [state, dispatch] = useReducer(appReducer, initialState);
  const clockText = useClock();

  useMachineTimer(dispatch);

  const handleSettingsAccess = useCallback(async () => {
    const canEnter = await adminAccessService.canEnterSettings();

    if (canEnter) {
      dispatch({ type: "OPEN_SETTINGS_PIN" });
      return;
    }

    dispatch({ type: "SETTINGS_ACCESS_DENIED" });
  }, []);

  useEffect(() => {
    if (state.screen !== "complete") {
      return undefined;
    }

    const timeoutId = window.setTimeout(() => {
      dispatch({ type: "COMPLETE_RETURN" });
    }, COMPLETE_RETURN_DELAY_MS);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [state.screen]);

  return (
    <KioskViewport>
      <>
        <AppShell
          clockText={clockText}
          progressStep={state.progressStep}
          screen={state.screen}
          selectedMachine={state.selectedMachine}
          isExtension={state.isExtension}
          contentMode={getContentMode(state.screen)}
          showFooter={shouldShowFooter(state.screen)}
          showFooterCancel={!isSettingsScreen(state.screen)}
          footerDisabled={isFooterDisabled(state.screen)}
          hideProgress={isSettingsScreen(state.screen)}
          onBack={() => dispatch({ type: "BACK" })}
          onCancel={() => dispatch({ type: "CANCEL" })}
          onStepOneLongPress={isMachineScreen(state.screen) ? handleSettingsAccess : undefined}
        >
          <CurrentScreen state={state} dispatch={dispatch} />
        </AppShell>
        {isMachineScreen(state.screen) && state.settingsPinError && <div className="app-toast app-toast--error">{state.settingsPinError}</div>}
        <CurrentModal state={state} dispatch={dispatch} />
      </>
    </KioskViewport>
  );
}
