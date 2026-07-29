import MachineCard from "./MachineCard";
import { MACHINES_PER_PAGE } from "../../data/machines";
import "./MachineGrid.css";

export default function MachineGrid({ machines, onSelectMachine, onStopMachine }) {
  const placeholders = Array.from({ length: Math.max(0, MACHINES_PER_PAGE - machines.length) }, (_, index) => `placeholder-${index}`);

  return (
    <div className="machine-grid">
      {machines.map((machine) => (
        <MachineCard
          key={machine.number}
          machine={machine}
          onSelect={() => onSelectMachine(machine)}
          onLongPressStop={() => onStopMachine(machine)}
        />
      ))}
      {placeholders.map((id) => (
        <MachineCard key={id} isPlaceholder />
      ))}
    </div>
  );
}
