import CourseCard from "../components/course/CourseCard";
import { COURSE_OPTIONS } from "../data/courses";
import { getMachineType } from "../data/machines";
import "./CourseSelectionScreen.css";

function getCoursesForMachine(type) {
  if (type === "wash-only") {
    return COURSE_OPTIONS.filter((course) => course.id === "wash");
  }

  if (type === "dry-only") {
    return COURSE_OPTIONS.filter((course) => course.id === "dry");
  }

  return COURSE_OPTIONS;
}

export default function CourseSelectionScreen({ state, dispatch }) {
  const machineType = state.selectedMachine ? getMachineType(state.selectedMachine) : "wash-dry";
  const courses = getCoursesForMachine(machineType);

  return (
    <div className="course-selection">
      {courses.map((course) => {
        const extendWashDry = state.isExtension && machineType === "wash-dry";
        const enabled = !extendWashDry || course.id === "dry";

        return (
          <CourseCard
            course={course}
            enabled={enabled}
            highlighted={extendWashDry && course.id === "dry"}
            key={course.id}
            onSelect={(courseId) => dispatch({ type: "SELECT_COURSE", course: courseId })}
          />
        );
      })}
    </div>
  );
}
