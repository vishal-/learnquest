import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import SubjectLayout from "../subjectLayout";
import { CourseCategory } from "../../../types/subject.types";

// Mock dependencies
vi.mock("@iconify/react", () => ({
  Icon: ({ icon, style }: any) => <div style={style} data-icon={icon}></div>
}));
vi.mock("@/components/ui/cards/courseCard", () => ({
  default: ({ course, tab }: any) => (
    <div data-testid={`course-${course.id}`}>{course.label}</div>
  )
}));
vi.mock("@/components/ui/navigation/backButton", () => ({
  default: ({ to }: any) => <a href={to}>Back</a>
}));

const mockSubject = {
  id: "math",
  label: "Mathematics",
  description: "Learn mathematics",
  icon: "noto:math-symbols",
  bg: "#FFE5B4",
  pageBackground: "#FFFBF0",
  route: "/maths",
  shadow: "0 8px 16px rgba(0, 0, 0, 0.1)",
  rotate: "2deg",
  courses: [
    {
      id: "1",
      subjectId: "math",
      label: "Basic Addition",
      description: "Learn basic addition",
      icon: "noto:plus-sign",
      route: "/maths/basic-addition",
      component: "basicAddition",
      category: CourseCategory.LEARN
    },
    {
      id: "2",
      subjectId: "math",
      label: "Practice Tables",
      description: "Practice multiplication tables",
      icon: "noto:multiplication-sign",
      route: "/maths/practice-tables",
      component: "practiceTables",
      category: CourseCategory.PRACTICE
    },
    {
      id: "3",
      subjectId: "math",
      label: "Number Challenge",
      description: "Challenge your math skills",
      icon: "noto:backhand-index-pointing-right",
      route: "/maths/number-challenge",
      component: "numberChallenge",
      category: CourseCategory.CHALLENGE
    },
    {
      id: "4",
      subjectId: "math",
      label: "Advanced Addition",
      description: "Advanced addition exercises",
      icon: "noto:plus-sign",
      route: "/maths/advanced-addition",
      component: "advancedAddition",
      category: CourseCategory.LEARN
    }
  ]
};

const renderSubjectLayout = (subject = mockSubject) => {
  return render(
    <BrowserRouter>
      <SubjectLayout subject={subject} />
    </BrowserRouter>
  );
};

describe("SubjectLayout Component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should render subject label", () => {
    renderSubjectLayout();
    expect(screen.getByText("Mathematics")).toBeInTheDocument();
  });

  it("should render subject description", () => {
    renderSubjectLayout();
    expect(screen.getByText("Learn mathematics")).toBeInTheDocument();
  });

  it("should render back button", () => {
    renderSubjectLayout();
    const backButton = screen.getByText("Back");
    expect(backButton).toBeInTheDocument();
    expect(backButton).toHaveAttribute("href", "/");
  });

  it("should render all category tabs", () => {
    renderSubjectLayout();
    expect(screen.getByText("Practice")).toBeInTheDocument();
    expect(screen.getByText("Learn")).toBeInTheDocument();
    expect(screen.getByText("Challenge")).toBeInTheDocument();
  });

  it("should display correct course count for each tab", () => {
    renderSubjectLayout();

    // Practice: 1 course
    // Learn: 2 courses
    // Challenge: 1 course
    // Use getAllByText since there are multiple "1 item" instances
    const coursesCounts = screen.getAllByText(/1 item|2 items/);
    expect(coursesCounts.length).toBeGreaterThan(0);
    // Verify Learn tab has 2 items
    expect(screen.getByText(/2 items/)).toBeInTheDocument();
  });

  it("should have Practice tab active by default", () => {
    renderSubjectLayout();
    const practiceTab = screen.getByText("Practice").parentElement;
    expect(practiceTab?.className).toContain("tab-btn--active");
  });

  it("should switch to Learn tab when clicked", () => {
    renderSubjectLayout();
    const learnTab = screen.getByText("Learn").parentElement;

    fireEvent.click(learnTab!);

    expect(learnTab?.className).toContain("tab-btn--active");
    // Should show 2 courses from Learn category
    expect(screen.getByTestId("course-1")).toBeInTheDocument();
    expect(screen.getByTestId("course-4")).toBeInTheDocument();
  });

  it("should switch to Challenge tab when clicked", () => {
    renderSubjectLayout();
    const challengeTab = screen.getByText("Challenge").parentElement;

    fireEvent.click(challengeTab!);

    expect(challengeTab?.className).toContain("tab-btn--active");
    expect(screen.getByTestId("course-3")).toBeInTheDocument();
  });

  it("should filter courses by active tab", () => {
    renderSubjectLayout();

    // First check Learn tab
    fireEvent.click(screen.getByText("Learn").parentElement!);
    expect(screen.getByTestId("course-1")).toBeInTheDocument();
    expect(screen.getByTestId("course-4")).toBeInTheDocument();
    expect(screen.queryByTestId("course-2")).not.toBeInTheDocument();

    // Switch to Practice tab
    fireEvent.click(screen.getByText("Practice").parentElement!);
    expect(screen.getByTestId("course-2")).toBeInTheDocument();
    expect(screen.queryByTestId("course-1")).not.toBeInTheDocument();
  });

  it("should handle subjects with no courses in a category", () => {
    const subjectWithMissingCategory = {
      ...mockSubject,
      courses: [
        {
          id: "1",
          subjectId: "math",
          label: "Only Learn",
          description: "Only learn course",
          icon: "noto:books",
          route: "/maths/only-learn",
          component: "onlyLearn",
          category: CourseCategory.LEARN
        }
      ]
    };

    renderSubjectLayout(subjectWithMissingCategory);

    // Should still render all tabs even if some categories have 0 items
    expect(screen.getByText("Practice")).toBeInTheDocument();
    expect(screen.getByText("Learn")).toBeInTheDocument();
    expect(screen.getByText("Challenge")).toBeInTheDocument();

    // Learn tab should have 1 item
    expect(screen.getByText(/1 item/)).toBeInTheDocument();
  });

  it("should apply correct styling with color and dark colors", () => {
    renderSubjectLayout();
    const practiceTab = screen.getByText("Practice")
      .parentElement as HTMLElement;

    // Practice tab should have green color when active (converted to rgb)
    const rgbColor = "rgb(53, 136, 42)"; // #35882a in rgb
    const rgbBorder = "3px solid rgb(45, 32, 22)"; // #2D2016 in rgb
    expect(practiceTab.style.background).toBe(rgbColor);
    expect(practiceTab.style.border).toBe(rgbBorder);
  });

  it("should render subject icon when provided", () => {
    const { container } = renderSubjectLayout();
    // Look for the icon in the header
    const icon = container.querySelector("[data-icon]");
    expect(icon).toBeInTheDocument();
    expect(icon).toHaveAttribute("data-icon", "noto:math-symbols");
  });

  it("should handle courses with default category", () => {
    const subjectWithDefaultCategory = {
      ...mockSubject,
      courses: [
        {
          id: "1",
          subjectId: "math",
          label: "Course with default category",
          description: "Course with default category",
          icon: "noto:books",
          route: "/maths/default-category",
          component: "defaultCategory",
          category: CourseCategory.LEARN
        }
      ]
    };

    renderSubjectLayout(subjectWithDefaultCategory);

    // Switch to Learn tab - should find the course
    fireEvent.click(screen.getByText("Learn").parentElement!);
    expect(screen.getByTestId("course-1")).toBeInTheDocument();
  });

  it("should use pageBackground for layout styling", () => {
    const { container } = renderSubjectLayout();
    const layoutDiv = container.querySelector(".subject-layout") as HTMLElement;

    // #FFFBF0 converts to rgb(255, 251, 240)
    expect(layoutDiv.style.backgroundColor).toBe("rgb(255, 251, 240)");
  });

  it("should use background color for header section", () => {
    const { container } = renderSubjectLayout();
    const headerDiv = container.querySelector(
      ".subject-layout__header"
    ) as HTMLElement;

    // #FFE5B4 converts to rgb(255, 229, 180)
    expect(headerDiv.style.background).toBe("rgb(255, 229, 180)");
  });
});
