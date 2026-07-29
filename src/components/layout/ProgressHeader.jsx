import "./ProgressHeader.css";

const STEPS = [
  { id: 1, label: "機械選択" },
  { id: 2, label: "コース選択" },
  { id: 3, label: "支払い" },
  { id: 4, label: "運転開始" }
];

export default function ProgressHeader({ currentStep, clockText, storeName }) {
  return (
    <header className="progress-header">
      <div className="progress-header__steps" aria-label="進行状況">
        {STEPS.map((step) => (
          <div
            className={`progress-header__step${step.id <= currentStep ? " progress-header__step--active" : ""}`}
            key={step.id}
          >
            <span className="progress-header__step-num">{step.id}</span>
            <span className="progress-header__step-label">{step.label}</span>
          </div>
        ))}
      </div>
      <div className="progress-header__store">
        <div>{clockText}</div>
        <div>{storeName}</div>
      </div>
    </header>
  );
}
