import type { Course } from "@/types/subject.types";
import { CourseCategory, SubjectId } from "@/types/subject.types";

export const hindiCourses: Course[] = [
    {
        id: "hindi_counting",
        subjectId: SubjectId.HINDI,
        label: "हिंदी की गिनती",
        description: "क्या आपको हिंदी में गिनती आती है?",
        icon: "noto:victory-hand",
        route: "/hindi/counting",
        component: "counting",
        category: CourseCategory.LEARN,
    },
    {
        id: "hindi_numbers",
        subjectId: SubjectId.HINDI,
        label: "हिंदी संख्या पहचानें (Numbers)",
        description: "0 से 1000 के बीच की हिन्दी संख्या पहचानें।",
        icon: "twemoji:hand-with-fingers-splayed",
        route: "/hindi/numbers",
        component: "numbers",
        category: CourseCategory.PRACTICE,
    },
];
