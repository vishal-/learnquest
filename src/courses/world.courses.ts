import type { Course } from "@/types/subject.types";
import { CourseCategory, SubjectId } from "@/types/subject.types";

export const worldCourses: Course[] = [
    {
        id: "world_capitals_of_countries",
        subjectId: SubjectId.WORLD,
        label: "Capitals of Countries",
        description: "Learn capitals of countries around the world",
        icon: "noto:globe-with-meridians",
        route: "/world/capitals-of-countries",
        component: "capitals",
        category: CourseCategory.LEARN,
    },
    {
        id: "world_capitals_of_india",
        subjectId: SubjectId.WORLD,
        label: "Capitals of Indian States",
        description: "Learn capitals of all Indian states and union territories",
        icon: "noto:india",
        route: "/world/capitals-of-india",
        component: "india-capitals",
        category: CourseCategory.LEARN,
    },
    {
        id: "world_flags_of_countries",
        subjectId: SubjectId.WORLD,
        label: "Flags of Countries",
        description: "Learn the flags of countries around the world",
        icon: "twemoji:flag-england",
        route: "/world/flags-of-countries",
        component: "flags",
        category: CourseCategory.LEARN,
    },
    {
        id: "world_challenge_flags",
        subjectId: SubjectId.WORLD,
        label: "Challenge Flags",
        description: "Challenge yourself by identifying country flags",
        icon: "noto:triangular-flag",
        route: "/world/challenge-flags",
        component: "flags",
        category: CourseCategory.PRACTICE,
    },
];
