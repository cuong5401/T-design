import { useLongPress } from "../../hooks/useLongPress";
import "./ProgressHeader.css";

const STEPS = [
  { id: 1, label: "機械選択" },
  { id: 2, label: "コース選択" },
  { id: 3, label: "支払い" },
  { id: 4, label: "運転開始" }
];

export default function ProgressHeader({ currentStep, clockText, storeName, onStepOneLongPress }) {
  const stepOneLongPressHandlers = useLongPress(onStepOneLongPress, {
    delay: 3000,
    enabled: Boolean(onStepOneLongPress)
  });

  return (
    <header className="progress-header">
      <div className="progress-header__steps" aria-label="進行状況">
        {STEPS.map((step) => {
          const className = `progress-header__step${step.id <= currentStep ? " progress-header__step--active" : ""}`;
          const content = (
            <>
              <span className="progress-header__step-num">{step.id}</span>
              <span className="progress-header__step-label">{step.label}</span>
            </>
          );

          if (step.id === 1) {
            return (
              <button className={className} key={step.id} type="button" {...stepOneLongPressHandlers}>
                {content}
              </button>
            );
          }

          return (
            <div className={className} key={step.id}>
              {content}
            </div>
          );
        })}
      </div>
      <div className="progress-header__store">
        <div className="progress-header__store-time">{clockText}</div>
        <div>{storeName}</div>
      </div>
    </header>
  );
}
