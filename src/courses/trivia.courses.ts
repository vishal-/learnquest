import type { Course } from "@/types/subject.types";
import { CourseCategory, SubjectId } from "@/types/subject.types";

export const triviaCourses: Course[] = [
    {
        id: "trivia_learn_animals",
        subjectId: SubjectId.TRIVIA,
        label: "Learn Animals",
        description: "Learn about different animals around the world",
        icon: "noto:lion",
        route: "/trivia/learn-animals",
        component: "animals",
        category: CourseCategory.LEARN,
    },
];
