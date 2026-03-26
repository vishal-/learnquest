import { useState } from "react";
import { Link } from "react-router-dom";
import { Icon } from "@iconify/react";
import type { Course } from "@/types/subject.types";

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

const CourseCard: React.FC<CourseCardProps> = ({ course, tab }) => {
  const [isHovered, setIsHovered] = useState(false);

  const shadowStyle = isHovered
    ? `2px 2px 0 ${tab.dark}, 2px 2px 0 1px #2D2016`
    : `4px 4px 0 ${tab.dark}, 4px 4px 0 1px #2D2016`;

  return (
    <Link to={course.route} className="no-underline">
      <div
        className="w-full bg-white border-[3px] border-[#2D2016] rounded-[20px] overflow-hidden cursor-pointer transition-all duration-100 flex items-stretch"
        style={{
          boxShadow: shadowStyle,
          transform: isHovered ? "translate(2px, 2px)" : "translate(0, 0)"
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Icon strip */}
        <div
          className="w-16 flex-shrink-0 flex items-center justify-center text-[28px] border-r-[3px] border-[#2D2016]"
          style={{ background: tab.color }}
        >
          {course.icon ? (
            <Icon icon={course.icon} className="text-[32px]" />
          ) : (
            <span className="text-[28px]">📚</span>
          )}
        </div>

        {/* Content */}
        <div className="flex-1 p-[12px_13px]">
          <p className="font-poppins text-base text-[#2D2016] m-0 mb-1 leading-[1.2]">
            {course.label}
          </p>
          <p className="font-nunito font-semibold text-xs text-[#9B8B6E] m-0 leading-[1.3]">
            {course.description}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default CourseCard;
