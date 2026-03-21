import { useState, useEffect } from "react";
import { useSubjects } from "../../hooks/useSubjects";
import { useCourseHistoryStore } from "../../store/courseHistoryStore";
import { useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react";
import CourseCard from "../common/courseCard";
import "../../styles/home.css";

const HomePage = () => {
  const { subjects } = useSubjects();
  const { getRecentCourses } = useCourseHistoryStore();
  const navigate = useNavigate();
  const [activeSubject, setActiveSubject] = useState<string | null>(null);
  const recentCourses = getRecentCourses(3);

  // Helper function to find subject for a course
  const findSubjectForCourse = (courseId: string) => {
    for (const subject of subjects) {
      if (subject.courses?.some((c) => c.id === courseId)) {
        return subject;
      }
    }
    return null;
  };

  useEffect(() => {
    setActiveSubject(null);
  }, []);

  return (
    <div className="min-h-screen max-w-[430px] mx-auto bg-[#FFFBF0] font-nunito overflow-x-hidden relative">
      {/* Content */}
      <div className="relative z-10">
        {/* Subject Grid */}
        <div
          className="px-3 pt-9 grid gap-4 animate-slide-up"
          style={{
            gridTemplateColumns: "repeat(2, 1fr)",
            animationDelay: "0s"
          }}
        >
          {subjects.map((subject, i) => {
            return (
              <div
                key={subject.id}
                className="subject-card"
                style={
                  {
                    "--r": subject.rotate,
                    animation: `popIn 0.5s ${i * 0.07}s ease both`,
                    opacity: 0,
                    animationFillMode: "forwards"
                  } as React.CSSProperties
                }
                onClick={() => {
                  setActiveSubject(subject.id);
                  navigate(subject.route);
                }}
              >
                <div
                  className="border-[2px] border-[#2D2016] rounded-[24px] p-3 flex flex-col items-center gap-3 transition-all duration-150"
                  style={{
                    background: subject.bg,
                    boxShadow: `0 6px 0 ${subject.shadow}, 0 6px 0 1px #2D2016`,
                    transform: `rotate(${subject.rotate})`,
                    ...(activeSubject === subject.id
                      ? {
                          transform: `rotate(${subject.rotate}) scale(1.08)`,
                          boxShadow: `0 8px 0 ${subject.shadow}, 0 8px 0 1px #2D2016`
                        }
                      : {})
                  }}
                >
                  <span className="text-5xl leading-none">
                    <Icon icon={subject.icon} width="60" height="60" />
                  </span>
                  <span className="font-poppins text-[13px] text-white tracking-[0.3px] text-shadow text-center w-full overflow-hidden text-ellipsis whitespace-nowrap">
                    {subject.label}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Recent Activity - Show last 3 accessed courses */}
        {recentCourses.length > 0 && (
          <div
            className="px-5 pb-5 animate-slide-up"
            style={{ animationDelay: "0.35s" }}
          >
            <div className="section-label my-5">
              <div className="divider-line" />
              <span className="divider-text">RECENT ACTIVITY</span>
              <div className="divider-line" />
            </div>

            <div className="flex flex-col gap-3">
              {recentCourses.map((course, i) => {
                const subject = findSubjectForCourse(course.id);
                if (!subject) return null;

                return (
                  <div
                    key={course.id}
                    style={{
                      animation: `slideUp 0.4s ${0.5 + i * 0.1}s ease both`,
                      opacity: 0,
                      animationFillMode: "forwards"
                    }}
                  >
                    <CourseCard
                      course={course}
                      tab={{
                        id: subject.id,
                        label: subject.label,
                        emoji: subject.icon,
                        color: subject.bg,
                        dark: subject.shadow
                      }}
                      index={i}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Bottom spacer */}
        <div className="h-8" />
      </div>
    </div>
  );
};

export default HomePage;
