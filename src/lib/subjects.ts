import type { Subject, Course } from "../types/subject.types";
import { SubjectId } from "../types/subject.types";
import { englishCourses } from "../courses/english.courses";
import { hindiCourses } from "../courses/hindi.courses";
import { mathsCourses } from "../courses/maths.courses";
import { worldCourses } from "../courses/world.courses";
import { stemCourses } from "../courses/stem.courses";
import { triviaCourses } from "../courses/trivia.courses";
import { subjectStyles } from "./subjectStyles";

const subjectMetadata = [
    {
        id: SubjectId.TRIVIA,
        label: "Trivia",
        description: "Explore various topics in general knowledge.",
        route: "/trivia",
        icon: "twemoji:brain",
    },
    {
        id: SubjectId.STEM,
        label: "STEM",
        description: "Explore basic science concepts and experiments.",
        route: "/stem",
        icon: "twemoji:microscope",
    },
    {
        id: SubjectId.MATHS,
        label: "Maths",
        description: "Learn basic mathematics concepts and operations.",
        route: "/maths",
        icon: "twemoji:input-numbers",
    },
    {
        id: SubjectId.HINDI,
        label: "Hindi",
        description: "Learn & Practice Hindi language",
        route: "/hindi",
        icon: "noto:om",
    },
    {
        id: SubjectId.ENGLISH,
        label: "English",
        description: "Learn & Practice English language",
        route: "/english",
        icon: "noto:input-latin-uppercase",
    },
    {
        id: SubjectId.WORLD,
        label: "World",
        description: "Learn about different cultures, geography, and history.",
        route: "/world",
        icon: "twemoji:globe-showing-asia-australia",
    },
];

export const subjectsData: Subject[] = subjectMetadata.map((metadata) => ({
    ...metadata,
    ...subjectStyles[metadata.id as keyof typeof subjectStyles],
    courses: [],
}));

// Combine all courses from subject-specific files
const allCourses: Course[] = [
    ...englishCourses,
    ...hindiCourses,
    ...mathsCourses,
    ...worldCourses,
    ...stemCourses,
    ...triviaCourses,
];

// Build the combined data with courses attached to subjects
export const getCombinedSubjectsData = (): Subject[] => {
    return subjectsData.map((subject) => ({
        ...subject,
        courses: allCourses.filter((course) => course.subjectId === subject.id),
    }));
};

// For backward compatibility, export allCourses as coursesData
export const coursesData = allCourses;
