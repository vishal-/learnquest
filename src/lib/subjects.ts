import { lazy } from "react";

const HindiCourses = [
  {
    title: "हिंदी की गिनती",
    description: "An introductory course to learn basic Hindi.",
    image: "https://iili.io/FZKGbDb.jpg",
    route: "counting",
    element: lazy(() => import("../components/pages/hindi/hindiCounting"))
  }
];

export const Subjects = [
  {
    label: "Hindi",
    description: "Learn Hindi language basics, vocabulary, and grammar.",
    image: "https://iili.io/FZKGbDb.jpg",
    route: "/hindi",
    courses: HindiCourses
  }
] as const;

export type Subject = (typeof Subjects)[number];
