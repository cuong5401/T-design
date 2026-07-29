import { COURSE_OPTIONS } from "../data/courses";
import { getPlansForCourse } from "../data/plans";
import { CourseBand } from "../components/course/CourseCard";
import PlanCard from "../components/course/PlanCard";
import "./PlanSelectionScreen.css";

function getCourseParts(courseId) {
  const course = COURSE_OPTIONS.find((option) => option.id === courseId);
  return course?.parts || ["dry"];
}

export default function PlanSelectionScreen({ state, dispatch }) {
  const plans = getPlansForCourse(state.selectedCourse, state.isExtension, state.dryMinutes);

  return (
    <>
      <CourseBand className="course-band--price" parts={getCourseParts(state.selectedCourse)} />
      <div className="plan-selection">
        {plans.map((plan, index) => (
          <PlanCard key={plan.id} plan={plan} onSelect={() => dispatch({ type: "SELECT_PLAN", index })} />
        ))}
      </div>
    </>
  );
}
