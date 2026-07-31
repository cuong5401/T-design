import { useCallback, useRef } from "react";
import { canExtendMachine, canSelectMachine } from "../../data/machines";
import { useLongPress } from "../../hooks/useLongPress";
import { LaundryTypeIcon } from "../icons/LaundryTypeIcon";
import "./MachineCard.css";

function MachineLabel({ type, single = false }) {
  const label = type === "dry" ? "乾燥" : "洗濯";

  return (
    <div className={`machine-card__label machine-card__label--${type}${single ? " machine-card__label--single" : ""}`}>
      <LaundryTypeIcon className="machine-card__label-icon" type={type} />
      <span>{label}</span>
    </div>
  );
}

function MachineLabels({ type }) {
  if (type === "wash-only") {
    return (
      <div className="machine-card__labels">
        <MachineLabel type="wash" single />
      </div>
    );
  }

  if (type === "dry-only") {
    return (
      <div className="machine-card__labels">
        <MachineLabel type="dry" single />
      </div>
    );
  }

  return (
    <div className="machine-card__labels">
      <MachineLabel type="wash" />
      <MachineLabel type="dry" />
    </div>
  );
}

function getStatusText(machine) {
  if (machine.status === "available") {
    return "使用できます";
  }

  if (machine.status === "broken") {
    return "調整中";
  }

  return `残り${machine.remainingMinutes}分`;
}

export default function MachineCard({ machine, isPlaceholder = false, onSelect, onLongPressStop }) {
  const suppressNextClickRef = useRef(false);
  const isSelectable = canSelectMachine(machine);
  const isExtendable = canExtendMachine(machine);
  const canLongPressStop = machine?.status === "busy";

  const handleLongPress = useCallback(() => {
    suppressNextClickRef.current = true;
    onLongPressStop?.();

    window.setTimeout(() => {
      suppressNextClickRef.current = false;
    }, 600);
  }, [onLongPressStop]);

  const longPressHandlers = useLongPress(handleLongPress, { enabled: canLongPressStop });

  const handleClick = () => {
    if (suppressNextClickRef.current) {
      suppressNextClickRef.current = false;
      return;
    }

    if (!isSelectable) {
      return;
    }

    onSelect?.();
  };

  if (isPlaceholder) {
    return <div className="machine-card machine-card--placeholder" aria-hidden="true" />;
  }

  return (
    <button
      className={`machine-card machine-card--${machine.type} machine-card--${machine.status}${isSelectable ? " machine-card--selectable" : ""}`}
      type="button"
      disabled={machine.status === "broken"}
      onClick={handleClick}
      {...longPressHandlers}
    >
      <MachineLabels type={machine.type} />
      <div className="machine-card__number">{machine.number}</div>
      <div className="machine-card__status">{getStatusText(machine)}</div>
      {isExtendable && <div className="machine-card__extend">延長できます</div>}
    </button>
  );
}
