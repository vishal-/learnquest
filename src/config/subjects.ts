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
    description: "क्या आपको हिंदी में गिनती आती है?",
    image: "https://iili.io/FZcEYNt.jpg",
    route: "/hindi/counting",
    component: lazy(() => import("../components/pages/hindi/hindiCounting"))
  },
  {
    label: "हिंदी संख्या पहचानें (Numbers)",
    description: "0 से 1000 के बीच की हिन्दी संख्या पहचानें।",
    image: "https://iili.io/FZcEYNt.jpg",
    route: "/hindi/numbers",
    component: lazy(() => import("../components/pages/hindi/hindiNumbers"))
  }
];

const MathCourses: Course[] = [
  {
    label: "Multiplication Tables",
    description: "Learn and practice tables from 2 to 20.",
    image: "https://iili.io/FZl9DGV.jpg",
    route: "/maths/tables",
    component: lazy(() => import("../components/pages/maths/mathTables"))
  }
];

const StemCourses: Course[] = [
  {
    label: "Units of Measurement",
    description: "What category does this unit belong to?",
    image: "https://iili.io/FZlHtNs.jpg",
    route: "/stem/units",
    component: lazy(() => import("../components/pages/stem/units"))
  }
];

const WorldCourses: Course[] = [
  {
    label: "Capital Cities of India",
    description: "Do you know the capitals of Indian states?",
    image: "https://iili.io/FZlBdAB.jpg",
    route: "/world/capitals-of-india",
    component: lazy(() => import("../components/pages/world/capitalsOfIndia"))
  },
  {
    label: "Capital Cities of Countries",
    description: "Do you know the capitals of different countries?",
    image: "https://iili.io/FZlBdAB.jpg",
    route: "/world/capitals-of-countries",
    component: lazy(
      () => import("../components/pages/world/capitalsOfCountries")
    )
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
  {
    label: "World",
    description: "Learn about different cultures, geography, and history.",
    image: "https://iili.io/FZlBdAB.jpg",
    route: "/world",
    component: lazy(() => import("../components/pages/layouts/subjectLayout")),
    courses: WorldCourses
  },
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
  {
    label: "Maths",
    description: "Learn basic mathematics concepts and operations.",
    image: "https://iili.io/FZl9DGV.jpg",
    route: "/maths",
    component: lazy(() => import("../components/pages/layouts/subjectLayout")),
    courses: MathCourses
  },
  {
    label: "G.K",
    description: "Explore various topics in general knowledge.",
    image: "https://iili.io/FQh4m2R.jpg",
    route: "/general",
    component: lazy(() => import("../components/pages/layouts/subjectLayout")),
    courses: GeneralCourses
  }
];
