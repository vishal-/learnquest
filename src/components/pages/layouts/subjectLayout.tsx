import { useState } from "react";
import { Link } from "react-router-dom";
import { Icon } from "@iconify/react";
import type { Subject, Course } from "../../../types/subject.types";
import { CourseCategory } from "../../../types/subject.types";
import "../../../styles/subjectLayout.css";

interface TabConfig {
  id: CourseCategory;
  label: string;
  emoji: string;
  color: string;
  dark: string;
}

const TABS: TabConfig[] = [
  {
    id: CourseCategory.LEARN,
    label: "Learn",
    emoji: "📖",
    color: "#5B9BFF",
    dark: "#2D6FD4",
  },
  {
    id: CourseCategory.PRACTICE,
    label: "Practice",
    emoji: "✏️",
    color: "#FF9F43",
    dark: "#C97A20",
  },
  {
    id: CourseCategory.CHALLENGE,
    label: "Challenge",
    emoji: "🏆",
    color: "#FF6B6B",
    dark: "#C94B4B",
  },
];

const SubjectLayout: React.FC<{ subject: Subject }> = ({ subject }) => {
  const {
    label,
    description,
    courses,
    bg,
    icon: subjectIcon,
    pageBackground,
  } = subject;
  const [activeTab, setActiveTab] = useState<CourseCategory>(
    CourseCategory.LEARN,
  );

  // Group courses by category
  const coursesByCategory = courses.reduce(
    (acc, course) => {
      const category = course.category || CourseCategory.LEARN;
      acc[category] = acc[category] || [];
      acc[category].push(course);
      return acc;
    },
    {} as Record<CourseCategory, Course[]>,
  );

  const tab = TABS.find((t) => t.id === activeTab)!;
  const filteredCourses = coursesByCategory[activeTab] || [];

  return (
    <div className="subject-layout" style={{ backgroundColor: pageBackground }}>
      {/* Dot-grid background */}
      <div className="subject-layout__bg-dots" />

      <div className="subject-layout__wrapper">
        {/* Hero Header */}
        <div className="subject-layout__header" style={{ background: bg }}>
          {/* Decorative circles */}
          <div className="subject-layout__header-decoration subject-layout__header-decoration--top" />
          <div className="subject-layout__header-decoration subject-layout__header-decoration--bottom" />

          {/* Title and Tagline */}
          <div className="subject-layout__header-content">
            <div>
              <h1 className="subject-layout__header-title">{label}</h1>
              <p className="subject-layout__header-description">
                {description}
              </p>
            </div>

            {/* Big emoji/icon */}
            {subjectIcon && (
              <div className="subject-layout__header-icon">
                <Icon icon={subjectIcon} style={{ fontSize: "72px" }} />
              </div>
            )}
          </div>
        </div>

        {/* Category Tabs */}
        <div className="subject-layout__tabs">
          {TABS.map((t) => {
            const isActive = t.id === activeTab;
            const count = coursesByCategory[t.id]?.length || 0;

            return (
              <div
                key={t.id}
                className={`tab-btn ${isActive ? "tab-btn--active" : ""}`}
                onClick={() => setActiveTab(t.id)}
                style={{
                  background: isActive ? t.color : "#fff",
                  border: "3px solid #2D2016",
                  boxShadow: isActive
                    ? `0 5px 0 ${t.dark}, 0 5px 0 1px #2D2016`
                    : "3px 3px 0 #2D2016",
                }}
              >
                <span className="tab-btn__emoji">{t.emoji}</span>
                <span
                  className={`tab-btn__label ${isActive ? "tab-btn__label--active" : ""}`}
                >
                  {t.label}
                </span>
                <span
                  className={`tab-btn__count ${isActive ? "tab-btn__count--active" : ""}`}
                >
                  {count} {count === 1 ? "item" : "items"}
                </span>
              </div>
            );
          })}
        </div>

        {/* Course List */}
        <div className="subject-layout__courses">
          {filteredCourses.map((course, index) => (
            <Link
              key={course.id}
              to={course.route}
              className="course-link"
              style={{
                animation: `slideUp 0.35s ${index * 0.06}s ease both`,
              }}
            >
              <div
                className="course-card"
                style={{
                  boxShadow: `4px 4px 0 ${tab.dark}, 4px 4px 0 1px #2D2016`,
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
                  (e.currentTarget as HTMLElement).style.transform =
                    "translate(0,0)";
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
                  <p className="course-card__description">
                    {course.description}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SubjectLayout;
