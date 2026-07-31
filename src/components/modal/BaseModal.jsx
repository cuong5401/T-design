import "./BaseModal.css";

export default function BaseModal({ title, machineNumber, subtitle, confirmLabel, danger = false, onBack, onConfirm }) {
  return (
    <div className="base-modal__overlay" role="dialog" aria-modal="true" aria-labelledby="base-modal-title">
      <div className="base-modal__box">
        <div className="base-modal__title" id="base-modal-title">
          {title}
        </div>
        <div className="base-modal__machine-number">{machineNumber}</div>
        <div className="base-modal__subtitle">{subtitle}</div>
        <div className="base-modal__actions">
          <button
            className={`base-modal__confirm${danger ? " base-modal__confirm--danger" : ""}`}
            type="button"
            onClick={onConfirm}
          >
            {confirmLabel}
          </button>
          <button className="base-modal__back" type="button" onClick={onBack}>
            戻る
          </button>
        </div>
      </div>
    </div>
  );
}
