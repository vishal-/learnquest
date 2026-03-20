import { useState } from "react";
import { Link } from "react-router-dom";
import { Icon } from "@iconify/react";
import type { Subject, Course } from "../../../types/subject.types";

type Category = "learn" | "practice" | "challenge";

interface TabConfig {
  id: Category;
  label: string;
  emoji: string;
  color: string;
  dark: string;
}

const TABS: TabConfig[] = [
  {
    id: "learn",
    label: "Learn",
    emoji: "📖",
    color: "#5B9BFF",
    dark: "#2D6FD4",
  },
  {
    id: "practice",
    label: "Practice",
    emoji: "✏️",
    color: "#FF9F43",
    dark: "#C97A20",
  },
  {
    id: "challenge",
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
  const [activeTab, setActiveTab] = useState<Category>("learn");

  // Group courses by category
  const coursesByCategory = courses.reduce(
    (acc, course) => {
      const category = (course.category as Category) || "learn";
      acc[category] = acc[category] || [];
      acc[category].push(course);
      return acc;
    },
    {} as Record<Category, Course[]>,
  );

  const tab = TABS.find((t) => t.id === activeTab)!;
  const filteredCourses = coursesByCategory[activeTab] || [];

  return (
    <div style={{ backgroundColor: pageBackground, minHeight: "100dvh" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fredoka+One&family=Nunito:wght@400;600;700;800;900&display=swap');
        * { box-sizing: border-box; -webkit-tap-highlight-color: transparent; }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(16px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes tabSlide {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes headerIn {
          from { opacity: 0; transform: translateY(-12px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes popIn {
          0% { transform: scale(0.8); opacity: 0; }
          70% { transform: scale(1.06); }
          100% { transform: scale(1); opacity: 1; }
        }
        .tab-btn { cursor: pointer; user-select: none; transition: transform 0.12s; }
        .tab-btn:active { transform: scale(0.93); }
        .course-card {
          animation: slideUp 0.35s ease both;
          opacity: 0;
        }
      `}</style>

      {/* Dot-grid background */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          backgroundImage:
            "radial-gradient(circle, #e2d9c8 1.5px, transparent 1.5px)",
          backgroundSize: "28px 28px",
          opacity: 0.45,
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      <div
        style={{
          position: "relative",
          zIndex: 1,
          maxWidth: "430px",
          margin: "0 auto",
        }}
      >
        {/* Hero Header */}
        <div
          style={{
            background: bg,
            borderBottom: "3.5px solid #2D2016",
            padding: "16px 20px 18px",
            animation: "headerIn 0.4s ease both",
            overflow: "hidden",
            position: "relative",
          }}
        >
          {/* Decorative circles */}
          <div
            style={{
              position: "absolute",
              right: "-30px",
              top: "-30px",
              width: "120px",
              height: "120px",
              borderRadius: "50%",
              background: "rgba(255,255,255,0.18)",
              pointerEvents: "none",
            }}
          />
          <div
            style={{
              position: "absolute",
              right: "40px",
              bottom: "-40px",
              width: "90px",
              height: "90px",
              borderRadius: "50%",
              background: "rgba(255,255,255,0.12)",
              pointerEvents: "none",
            }}
          />

          {/* Title and Tagline */}
          <div
            style={{
              position: "relative",
              zIndex: 1,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-end",
            }}
          >
            <div>
              <h1
                style={{
                  fontFamily: "'Fredoka One', cursive",
                  fontSize: "38px",
                  color: "#2D2016",
                  margin: 0,
                  lineHeight: 1,
                  letterSpacing: "0.5px",
                }}
              >
                {label}
              </h1>
              <p
                style={{
                  fontFamily: "'Nunito', sans-serif",
                  fontWeight: 700,
                  fontSize: "13px",
                  color: "#2D2016",
                  margin: "4px 0 0",
                }}
              >
                {description}
              </p>
            </div>

            {/* Big emoji/icon */}
            {subjectIcon && (
              <div
                style={{
                  fontSize: "72px",
                  lineHeight: 1,
                  animation: "popIn 0.5s 0.2s ease both",
                  opacity: 0,
                  animationFillMode: "forwards",
                  filter: "drop-shadow(4px 4px 0 rgba(0,0,0,0.15))",
                }}
              >
                <Icon icon={subjectIcon} style={{ fontSize: "72px" }} />
              </div>
            )}
          </div>
        </div>

        {/* Category Tabs */}
        <div
          style={{
            padding: "16px 20px 0",
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr",
            gap: "10px",
            animation: "tabSlide 0.4s 0.15s ease both",
            opacity: 0,
            animationFillMode: "forwards",
          }}
        >
          {TABS.map((t) => {
            const isActive = t.id === activeTab;
            const count = coursesByCategory[t.id]?.length || 0;

            return (
              <div
                key={t.id}
                className="tab-btn"
                onClick={() => setActiveTab(t.id)}
                style={{
                  background: isActive ? t.color : "#fff",
                  border: "3px solid #2D2016",
                  borderRadius: "18px",
                  boxShadow: isActive
                    ? `0 5px 0 ${t.dark}, 0 5px 0 1px #2D2016`
                    : "3px 3px 0 #2D2016",
                  padding: "10px 8px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "4px",
                  transform: isActive ? "translateY(-2px)" : "none",
                  transition: "all 0.18s ease",
                }}
              >
                <span style={{ fontSize: "22px", lineHeight: 1 }}>
                  {t.emoji}
                </span>
                <span
                  style={{
                    fontFamily: "'Fredoka One', cursive",
                    fontSize: "14px",
                    color: isActive ? "#fff" : "#2D2016",
                    textShadow: isActive ? "0 1px 0 rgba(0,0,0,0.15)" : "none",
                  }}
                >
                  {t.label}
                </span>
                <span
                  style={{
                    fontFamily: "'Nunito', sans-serif",
                    fontWeight: 700,
                    fontSize: "10px",
                    color: isActive ? "rgba(255,255,255,0.8)" : "#9B8B6E",
                  }}
                >
                  {count} {count === 1 ? "item" : "items"}
                </span>
              </div>
            );
          })}
        </div>

        {/* Course List */}
        <div
          style={{
            padding: "14px 20px 32px",
            display: "flex",
            flexDirection: "column",
            gap: "12px",
          }}
        >
          {filteredCourses.map((course, index) => (
            <Link
              key={course.id}
              to={course.route}
              style={{
                animation: `slideUp 0.35s ${index * 0.06}s ease both`,
                opacity: 0,
                animationFillMode: "forwards",
                textDecoration: "none",
              }}
            >
              <div
                style={{
                  background: "#fff",
                  border: "3px solid #2D2016",
                  borderRadius: "20px",
                  boxShadow: `4px 4px 0 ${tab.dark}, 4px 4px 0 1px #2D2016`,
                  overflow: "hidden",
                  cursor: "pointer",
                  transition: "all 0.1s",
                  display: "flex",
                  alignItems: "stretch",
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
                  style={{
                    width: "64px",
                    flexShrink: 0,
                    background: tab.color,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "28px",
                    borderRight: "3px solid #2D2016",
                  }}
                >
                  {course.icon ? (
                    <Icon icon={course.icon} style={{ fontSize: "32px" }} />
                  ) : (
                    <span>📚</span>
                  )}
                </div>

                {/* Content */}
                <div style={{ flex: 1, padding: "12px 13px" }}>
                  <p
                    style={{
                      fontFamily: "'Fredoka One', cursive",
                      fontSize: "16px",
                      color: "#2D2016",
                      margin: "0 0 4px",
                      lineHeight: 1.2,
                    }}
                  >
                    {course.label}
                  </p>
                  <p
                    style={{
                      fontFamily: "'Nunito', sans-serif",
                      fontWeight: 600,
                      fontSize: "12px",
                      color: "#9B8B6E",
                      margin: 0,
                      lineHeight: 1.3,
                    }}
                  >
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
