import { lazy } from "react";
import type { Course, Subject } from "../types/subject.types";

const HindiCourses: Course[] = [
  {
    label: "हिंदी की गिनती",
    description: "An introductory course to learn basic Hindi.",
    image: "https://iili.io/FZKGbDb.jpg",
    route: "/hindi/counting",
    component: lazy(() => import("../components/pages/hindi/hindiCounting"))
  }
];

export const appSubjects: Subject[] = [
  {
    label: "Hindi",
    description: "Learn Hindi language basics, vocabulary, and grammar.",
    image: "https://iili.io/FZKGbDb.jpg",
    route: "/hindi",
    component: lazy(() => import("../components/pages/layouts/subjectLayout")),
    courses: HindiCourses
  },
  {
    label: "English",
    description: "Learn English language basics, vocabulary, and grammar.",
    image: "https://iili.io/FZKGbDb.jpg",
    route: "/english",
    component: lazy(() => import("../components/pages/layouts/subjectLayout")),
    courses: HindiCourses
  }
];
