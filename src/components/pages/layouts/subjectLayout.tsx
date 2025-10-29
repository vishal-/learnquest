import { Link } from "react-router-dom";
import type { Subject } from "../../../types/subject.types";

const SubjectLayout: React.FC<{ subject: Subject }> = ({
  subject: { description, courses }
}) => {
  return (
    <div>
      <p className="mb-6 text-lg text-center">{description}</p>

      <div className="flex flex-col gap-4 items-center">
        {courses.map((course) => (
          <Link
            key={course.label}
            to={course.route}
            className="w-full max-w-md flex items-center gap-3 px-6 py-3 rounded-lg bg-[var(--color-primary)] text-[var(--color-text)] font-semibold shadow-md transition hover:bg-[var(--color-accent)] hover:scale-105 active:scale-95"
            style={{ fontFamily: "var(--font-kids)" }}
          >
            {/* <img
              src={course.image}
              alt={course.label}
              className="w-10 h-10 rounded-full object-cover"
            /> */}
            <span>{course.label}</span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SubjectLayout;
