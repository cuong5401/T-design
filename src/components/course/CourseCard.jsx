import { COURSE_PART_LABELS } from "../../data/courses";
import "./CourseCard.css";

export function CourseBand({ parts, className = "" }) {
  const isSingle = parts.length === 1;

  return (
    <div className={`course-band${isSingle ? " course-band--single" : ""}${className ? ` ${className}` : ""}`}>
      {parts.map((part) => (
        <div className={`course-band__part course-band__part--${part}`} key={part}>
          <span>{COURSE_PART_LABELS[part]}</span>
        </div>
      ))}
    </div>
  );
}

export default function CourseCard({ course, enabled = true, highlighted = false, onSelect }) {
  return (
    <button
      className={`course-card${highlighted ? " course-card--highlight" : ""}`}
      type="button"
      disabled={!enabled}
      onClick={() => enabled && onSelect(course.id)}
    >
      <CourseBand parts={course.parts} />
      <div className="course-card__body">{course.label}</div>
    </button>
  );
}
