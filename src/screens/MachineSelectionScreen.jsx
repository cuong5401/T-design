import { canSelectMachine, getMachinePagination, getMachinesForScreen } from "../data/machines";
import MachineGrid from "../components/machine/MachineGrid";
import MachinePager from "../components/machine/MachinePager";

export default function MachineSelectionScreen({ state, dispatch }) {
  const machines = getMachinesForScreen(state.machines, state.screen);
  const pagination = getMachinePagination(state.screen);

  const handleSelectMachine = (machine) => {
    if (!canSelectMachine(machine)) {
      return;
    }

    dispatch({ type: "OPEN_MACHINE_CONFIRM", machineNumber: machine.number, action: "select" });
  };

  const handleStopMachine = (machine) => {
    if (machine.status !== "busy") {
      return;
    }

    dispatch({ type: "OPEN_MACHINE_CONFIRM", machineNumber: machine.number, action: "stop" });
  };

  return (
    <>
      <div className="app-shell__main">
        <MachineGrid machines={machines} onSelectMachine={handleSelectMachine} onStopMachine={handleStopMachine} />
      </div>
      <div className="app-shell__side">
        <MachinePager
          pagination={pagination}
          onPageChange={(screen) => {
            dispatch({ type: "GO_TO_MACHINE_PAGE", screen });
          }}
        />
      </div>
    </>
  );
}
