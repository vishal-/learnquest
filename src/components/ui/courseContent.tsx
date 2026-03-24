import * as React from "react";
import BackButton from "../common/backButton";
import { useSubjects } from "../../hooks/useSubjects";
import type { Course } from "../../types/subject.types";

interface CourseContentProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  course?: Course;
}

interface TitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
  title?: string;
  description: string;
  variant?: "primary" | "secondary";
}

interface SubTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
  children: React.ReactNode;
  variant?: "primary" | "secondary";
}

interface FramedProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "success" | "question";
}

interface OptionsGridProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  columns?: 1 | 2 | 3 | 4;
}

/**
 * Main CourseContent wrapper - container for consistent course styling
 */
const CourseContent = React.forwardRef<HTMLDivElement, CourseContentProps>(
  ({ children, course, className = "", ...props }, ref) => {
    const { subjects } = useSubjects();

    const handleContextMenu = (event: React.MouseEvent<HTMLDivElement>) => {
      event.preventDefault();
    };

    // Get subject route if course is provided
    const subjectRoute = course
      ? subjects.find((s) => s.id === course.subjectId)?.route || "/"
      : null;

    return (
      <div
        ref={ref}
        className={`w-full max-w-[430px] mx-auto px-4 py-6 ${className}`}
        onContextMenu={handleContextMenu}
        {...props}
      >
        {/* Back Button */}
        {course && subjectRoute && (
          <div className="mb-6">
            <BackButton to={subjectRoute} />
          </div>
        )}
        {children}
      </div>
    );
  }
);

CourseContent.displayName = "CourseContent";

/**
 * Title component - displays course title and description
 */
const Title = React.forwardRef<HTMLDivElement, TitleProps>(
  (
    { title, description, variant = "primary", className = "", ...props },
    ref
  ) => {
    const variants = {
      primary:
        "text-[#2D2016] bg-gradient-to-r from-[#FFE5B4] to-[#FFE5EC] rounded-2xl p-4 border-3 border-[#2D2016]",
      secondary: "text-white bg-[#FF6B9D] rounded-xl p-3"
    };

    return (
      <div
        ref={ref}
        className={`font-poppins font-bold text-center mb-8 ${variants[variant]} ${className}`}
        {...props}
      >
        {/* {title && <h2 className="text-2xl mb-2">{title}</h2>} */}
        <p className={title ? "text-sm" : "text-2xl"}>{description}</p>
      </div>
    );
  }
);

Title.displayName = "CourseContent.Title";

/**
 * SubTitle component - section headings within course
 */
const SubTitle = React.forwardRef<HTMLHeadingElement, SubTitleProps>(
  ({ children, variant = "primary", className = "", ...props }, ref) => {
    const variants = {
      primary: "text-[#2D2016] border-b-4 border-[#FF6B9D] pb-2",
      secondary: "text-[#2D2016] border-l-4 border-[#FF6B9D] pl-3"
    };

    return (
      <h3
        ref={ref}
        className={`font-poppins font-bold text-xl my-6 ${variants[variant]} ${className}`}
        {...props}
      >
        {children}
      </h3>
    );
  }
);

SubTitle.displayName = "CourseContent.SubTitle";

/**
 * Framed component - displays important content in a highlighted box
 */
const Framed = React.forwardRef<HTMLDivElement, FramedProps>(
  ({ children, variant = "primary", className = "", ...props }, ref) => {
    const variants = {
      primary: {
        bg: "bg-white",
        border: "border-4 border-[#2D2016]",
        shadow: "shadow-[0_6px_0_#2D2016]",
        text: "text-[#2D2016]"
      },
      secondary: {
        bg: "bg-[#FFE5B4]",
        border: "border-3 border-[#2D2016]",
        shadow: "shadow-[0_4px_0_#2D2016]",
        text: "text-[#2D2016]"
      },
      success: {
        bg: "bg-[#90EE90]",
        border: "border-3 border-[#2D2016]",
        shadow: "shadow-[0_4px_0_#2D2016]",
        text: "text-[#2D2016]"
      },
      question: {
        bg: "bg-[#A2D2FF]",
        border: "border-4 border-[#2D2016]",
        shadow: "shadow-[0_6px_0_#2D2016]",
        text: "text-[#2D2016]"
      }
    };

    const style = variants[variant];

    return (
      <div
        ref={ref}
        className={`
          rounded-3xl p-8 my-8 transition-all duration-100
          ${style.bg} ${style.border} ${style.shadow} ${style.text}
          hover:shadow-[0_4px_0_#2D2016] hover:translate-y-[2px]
          ${className}
        `}
        {...props}
      >
        <div className="font-poppins font-bold text-3xl text-center leading-relaxed">
          {children}
        </div>
      </div>
    );
  }
);

Framed.displayName = "CourseContent.Framed";

/**
 * OptionsGrid component - responsive grid for multiple choice options
 */
const OptionsGrid = React.forwardRef<HTMLDivElement, OptionsGridProps>(
  ({ children, columns = 2, className = "", ...props }, ref) => {
    const colClasses = {
      1: "grid-cols-1",
      2: "grid-cols-2",
      3: "grid-cols-3",
      4: "grid-cols-4"
    };

    return (
      <div
        ref={ref}
        className={`grid ${colClasses[columns]} gap-4 my-6 ${className}`}
        {...props}
      >
        {children}
      </div>
    );
  }
);

OptionsGrid.displayName = "CourseContent.OptionsGrid";

/**
 * Card component - generic content card with consistent styling
 */
const Card = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ children, className = "", ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={`
          bg-white rounded-2xl border-3 border-[#2D2016]
          p-6 shadow-[0_4px_0_#2D2016]
          transition-all duration-100 ease-out
          hover:shadow-[0_2px_0_#2D2016] hover:translate-y-[2px]
          ${className}
        `}
      {...props}
    >
      {children}
    </div>
  );
});

Card.displayName = "CourseContent.Card";

/**
 * Badges/Labels component
 */
const Badge = React.forwardRef<
  HTMLSpanElement,
  React.HTMLAttributes<HTMLSpanElement> & {
    variant?: "default" | "success" | "warning" | "error";
  }
>(({ children, variant = "default", className = "", ...props }, ref) => {
  const variants = {
    default: "bg-[#FFE5B4] text-[#2D2016]",
    success: "bg-[#90EE90] text-[#2D2016]",
    warning: "bg-[#FFD699] text-[#2D2016]",
    error: "bg-[#FF6B6B] text-white"
  };

  return (
    <span
      ref={ref}
      className={`
        inline-block px-4 py-2 rounded-full
        font-poppins font-semibold text-sm
        border-2 border-[#2D2016]
        ${variants[variant]} ${className}
      `}
      {...props}
    >
      {children}
    </span>
  );
});

Badge.displayName = "CourseContent.Badge";

/**
 * Compose all sub-components
 */
export default Object.assign(CourseContent, {
  Title,
  SubTitle,
  Framed,
  OptionsGrid,
  Card,
  Badge
});
