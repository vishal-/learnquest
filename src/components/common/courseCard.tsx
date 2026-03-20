import { Link } from "react-router-dom";
import { Icon } from "@iconify/react";
import type { Course } from "../../types/subject.types";

interface TabConfig {
  id: string;
  label: string;
  emoji: string;
  color: string;
  dark: string;
}

interface CourseCardProps {
  course: Course;
  tab: TabConfig;
  index: number;
}

const CourseCard: React.FC<CourseCardProps> = ({ course, tab, index }) => {
  return (
    <Link
      to={course.route}
      className="course-link"
      style={{
        animation: `slideUp 0.35s ${index * 0.06}s ease both`
      }}
    >
      <div
        className="course-card"
        style={{
          boxShadow: `4px 4px 0 ${tab.dark}, 4px 4px 0 1px #2D2016`
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLElement).style.boxShadow =
            `2px 2px 0 ${tab.dark}, 2px 2px 0 1px #2D2016`;
          (e.currentTarget as HTMLElement).style.transform =
            "translate(2px,2px)";
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLElement).style.boxShadow =
            `4px 4px 0 ${tab.dark}, 4px 4px 0 1px #2D2016`;
          (e.currentTarget as HTMLElement).style.transform = "translate(0,0)";
        }}
      >
        {/* Icon strip */}
        <div
          className="course-card__icon-strip"
          style={{ background: tab.color }}
        >
          {course.icon ? (
            <Icon icon={course.icon} className="course-card__icon" />
          ) : (
            <span className="course-card__default-icon">📚</span>
          )}
        </div>

        {/* Content */}
        <div className="course-card__content">
          <p className="course-card__title">{course.label}</p>
          <p className="course-card__description">{course.description}</p>
        </div>
      </div>
    </Link>
  );
};

export default CourseCard;
