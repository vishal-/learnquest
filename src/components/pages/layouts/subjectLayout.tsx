import { Link } from "react-router-dom";
import type { Subject } from "../../../types/subject.types";

const SubjectLayout: React.FC<{ subject: Subject }> = ({ subject }) => {
  const { description, courses, pageBackground } = subject;

  return (
    <div className="min-h-screen" style={{ backgroundColor: pageBackground }}>
      <div className="px-5 py-6 max-w-[430px] mx-auto">
        <p className="mb-6 text-lg text-center text-[#2D2016] font-nunito">
          {description}
        </p>

        <div className="flex flex-col gap-4 items-center">
          {courses.map((course) => (
            <Link
              key={course.label}
              to={course.route}
              className="w-full max-w-md flex items-center gap-3 px-6 py-3 rounded-lg bg-[var(--color-primary)] text-white font-semibold shadow-md transition hover:opacity-80 active:scale-95"
              style={{ fontFamily: "var(--font-nunito)" }}
            >
              <span>{course.label}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SubjectLayout;
