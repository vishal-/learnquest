import { lazy } from "react";
import type { Course, Subject } from "../types/subject.types";

const HindiCourses: Course[] = [
  {
    label: "हिंदी की गिनती",
    description: "An introductory course to learn basic Hindi.",
    image: "https://iili.io/FZcEYNt.jpg",
    route: "/hindi/counting",
    component: lazy(() => import("../components/pages/hindi/hindiCounting"))
  }
];

export const appSubjects: Subject[] = [
  {
    label: "STEM",
    description: "Explore basic science concepts and experiments.",
    image: "https://iili.io/FZlHtNs.jpg",
    route: "/science",
    component: lazy(() => import("../components/pages/layouts/subjectLayout")),
    courses: HindiCourses
  },
  {
    label: "World",
    description: "Learn about different cultures, geography, and history.",
    image: "https://iili.io/FZlBdAB.jpg",
    route: "/world",
    component: lazy(() => import("../components/pages/layouts/subjectLayout")),
    courses: HindiCourses
  },
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
    image: "https://iili.io/FZcWGh7.jpg",
    route: "/english",
    component: lazy(() => import("../components/pages/layouts/subjectLayout")),
    courses: HindiCourses
  },
  {
    label: "Maths",
    description: "Learn basic mathematics concepts and operations.",
    image: "https://iili.io/FZl9DGV.jpg",
    route: "/maths",
    component: lazy(() => import("../components/pages/layouts/subjectLayout")),
    courses: HindiCourses
  },
  {
    label: "G.K",
    description: "Explore various topics in general knowledge.",
    image: "https://iili.io/FQh4m2R.jpg",
    route: "/general",
    component: lazy(() => import("../components/pages/layouts/subjectLayout")),
    courses: HindiCourses
  }
];
