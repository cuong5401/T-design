import { CourseBand } from "../components/course/CourseCard";
import { createDryPlan, DRY_STEP_MINUTES, MAX_DRY_MINUTES, MIN_DRY_MINUTES } from "../data/plans";
import "./DryTimeSelectionScreen.css";

export default function DryTimeSelectionScreen({ state, dispatch }) {
  const plan = createDryPlan(state.dryMinutes, state.isExtension);
  const canDecrease = state.dryMinutes > MIN_DRY_MINUTES;
  const canIncrease = state.dryMinutes < MAX_DRY_MINUTES;

  return (
    <>
      <CourseBand className="course-band--price" parts={["dry"]} />
      <div className="dry-time">
        <div className="dry-time__title">{state.isExtension ? "延長時間を選択してください" : "乾燥時間を選択してください"}</div>
        <div className="dry-time__control">
          <button
            className="dry-time__step-button"
            type="button"
            disabled={!canDecrease}
            onClick={() => dispatch({ type: "CHANGE_DRY_MINUTES", diff: -DRY_STEP_MINUTES })}
          >
            −
          </button>
          <div className="dry-time__display">
            <div className="dry-time__minutes">{state.dryMinutes}分</div>
            <div className="dry-time__price">{plan.price}</div>
          </div>
          <button
            className="dry-time__step-button"
            type="button"
            disabled={!canIncrease}
            onClick={() => dispatch({ type: "CHANGE_DRY_MINUTES", diff: DRY_STEP_MINUTES })}
          >
            ＋
          </button>
        </div>
        <div className="dry-time__note">８分ごとに１００円です。最大４０分まで選択できます。</div>
        <button className="dry-time__confirm" type="button" onClick={() => dispatch({ type: "CONFIRM_DRY_TIME" })}>
          この時間で支払う
        </button>
      </div>
    </>
  );
}
