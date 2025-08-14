import { lazy } from "react";
import type { Course, Subject } from "../types/subject.types";

const GeneralCourses: Course[] = [
  {
    label: "What's the time?",
    description: "Can you read the clock?",
    image: "https://iili.io/FQh4m2R.jpg",
    route: "/general/clock",
    component: lazy(() => import("../components/pages/general/readTheClock"))
  }
];

const HindiCourses: Course[] = [
  {
    label: "हिंदी की गिनती",
    description: "Can you count in Hindi?",
    image: "https://iili.io/FZcEYNt.jpg",
    route: "/hindi/counting",
    component: lazy(() => import("../components/pages/hindi/hindiCounting"))
  }
];

const StemCourses: Course[] = [
  {
    label: "Units of Measurement",
    description: "Do you know the different units of measurement?",
    image: "https://iili.io/FZlHtNs.jpg",
    route: "/stem/units",
    component: lazy(() => import("../components/pages/stem/Units"))
  }
];

export const appSubjects: Subject[] = [
  {
    label: "STEM",
    description: "Explore basic science concepts and experiments.",
    image: "https://iili.io/FZlHtNs.jpg",
    route: "/stem",
    component: lazy(() => import("../components/pages/layouts/subjectLayout")),
    courses: StemCourses
  },
  // {
  //   label: "World",
  //   description: "Learn about different cultures, geography, and history.",
  //   image: "https://iili.io/FZlBdAB.jpg",
  //   route: "/world",
  //   component: lazy(() => import("../components/pages/layouts/subjectLayout")),
  //   courses: HindiCourses
  // },
  {
    label: "Hindi",
    description: "Learn Hindi language basics, vocabulary, and grammar.",
    image: "https://iili.io/FZKGbDb.jpg",
    route: "/hindi",
    component: lazy(() => import("../components/pages/layouts/subjectLayout")),
    courses: HindiCourses
  },
  // {
  //   label: "English",
  //   description: "Learn English language basics, vocabulary, and grammar.",
  //   image: "https://iili.io/FZcWGh7.jpg",
  //   route: "/english",
  //   component: lazy(() => import("../components/pages/layouts/subjectLayout")),
  //   courses: HindiCourses
  // },
  // {
  //   label: "Maths",
  //   description: "Learn basic mathematics concepts and operations.",
  //   image: "https://iili.io/FZl9DGV.jpg",
  //   route: "/maths",
  //   component: lazy(() => import("../components/pages/layouts/subjectLayout")),
  //   courses: HindiCourses
  // },
  {
    label: "G.K",
    description: "Explore various topics in general knowledge.",
    image: "https://iili.io/FQh4m2R.jpg",
    route: "/general",
    component: lazy(() => import("../components/pages/layouts/subjectLayout")),
    courses: GeneralCourses
  }
];
