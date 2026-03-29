import type { Course } from "@/types/subject.types";
import { CourseCategory, SubjectId } from "@/types/subject.types";

export const englishCourses: Course[] = [
    {
        id: "general_identify_letter",
        label: "Identify the Letter",
        description: "Listen to letters and identify them from multiple choices",
        icon: "noto:input-latin-uppercase",
        route: "/english/identify-letter",
        component: "identifyLetter",
        subjectId: SubjectId.ENGLISH,
        category: CourseCategory.PRACTICE,
    },
];
