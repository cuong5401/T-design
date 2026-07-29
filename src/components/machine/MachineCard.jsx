import { useCallback, useRef } from "react";
import { canExtendMachine, canSelectMachine } from "../../data/machines";
import { useLongPress } from "../../hooks/useLongPress";
import "./MachineCard.css";

function MachineLabels({ type }) {
  if (type === "wash-only") {
    return (
      <div className="machine-card__labels">
        <div className="machine-card__label machine-card__label--wash machine-card__label--single">洗濯</div>
      </div>
    );
  }

  if (type === "dry-only") {
    return (
      <div className="machine-card__labels">
        <div className="machine-card__label machine-card__label--dry machine-card__label--single">乾燥</div>
      </div>
    );
  }

  return (
    <div className="machine-card__labels">
      <div className="machine-card__label machine-card__label--wash">洗濯</div>
      <div className="machine-card__label machine-card__label--dry">乾燥</div>
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
