import "./PlanCard.css";

export default function PlanCard({ plan, onSelect }) {
  return (
    <button className="plan-card" type="button" onClick={onSelect}>
      <div className="plan-card__name">
        {plan.nameLines.map((line) => (
          <span key={line}>{line}</span>
        ))}
      </div>
      <div className="plan-card__divider" />
      <div className="plan-card__price">{plan.price}</div>
    </button>
  );
}
