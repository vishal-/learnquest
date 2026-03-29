import type { Course } from "@/types/subject.types";
import { CourseCategory, SubjectId } from "@/types/subject.types";

export const stemCourses: Course[] = [
    {
        id: "stem_units",
        subjectId: SubjectId.STEM,
        label: "Units",
        description: "Learn about different measurement units",
        icon: "noto:science",
        route: "/stem/units",
        component: "units",
        category: CourseCategory.LEARN,
    },
];
