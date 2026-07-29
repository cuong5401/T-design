import { COURSE_LABELS } from "../../data/courses";
import { PREPAID_CARD_BALANCE } from "../../data/plans";
import { CourseBand } from "../course/CourseCard";
import { formatCurrency } from "../../utils/formatCurrency";
import "./PaymentPanel.css";

function getCourseParts(course) {
  if (course === "wash-dry") {
    return ["wash", "dry"];
  }

  return [course || "dry"];
}

function planName(plan) {
  return plan?.nameLines?.join(" ") || "-";
}

export default function PaymentPanel({ state, onInsertCard, onDecision }) {
  const plan = state.selectedPlan || { nameLines: ["-"], price: "-" };
  const statusName = state.isExtension ? "追加" : "新使用";
  const courseName = COURSE_LABELS[state.selectedCourse || "dry"] || "-";

  return (
    <>
      <CourseBand className="course-band--price" parts={getCourseParts(state.selectedCourse)} />
      <div className="payment-panel">
        <div className="payment-panel__summary">
          <div className="payment-panel__row">
            <div className="payment-panel__label">ステータス</div>
            <div className="payment-panel__value">{statusName}</div>
          </div>
          <div className="payment-panel__row">
            <div className="payment-panel__label">コース</div>
            <div className="payment-panel__value">{courseName}</div>
          </div>
          <div className="payment-panel__row">
            <div className="payment-panel__label">プラン</div>
            <div className="payment-panel__value">{planName(plan)}</div>
          </div>
          <div className="payment-panel__row">
            <div className="payment-panel__label">金額</div>
            <div className="payment-panel__value payment-panel__value--price">{plan.price}</div>
          </div>
        </div>

        <div className={`payment-panel__card${state.cardInserted ? " payment-panel__card--inserted" : ""}`}>
          <div className="payment-panel__card-title">プリペイドカード</div>
          <button className="payment-panel__guide" type="button" onClick={onInsertCard}>
            {state.cardInserted ? "プリペイドカードを読み取りました" : "プリペイドカードを挿入してください"}
          </button>

          {state.cardInserted ? (
            <>
              <div className="payment-panel__balance">カード残高: {formatCurrency(PREPAID_CARD_BALANCE)}</div>
              <div className="payment-panel__actions">
                <button className="payment-panel__button payment-panel__button--yes" type="button" onClick={() => onDecision("yes")}>
                  支払う
                </button>
                <button className="payment-panel__button payment-panel__button--no" type="button" onClick={() => onDecision("no")}>
                  支払わない
                </button>
              </div>
            </>
          ) : (
            <div className="payment-panel__note">プリペイドカードのみご利用いただけます</div>
          )}
        </div>
      </div>
    </>
  );
}
