
import { lazy } from "react";

// This maps the string identifiers from Firestore to the actual lazy-loaded components.
export const componentMap: { [key: string]: React.LazyExoticComponent<React.ComponentType<any>> } = {
    // Admin
    admin: lazy(() => import("./pages/admin/adminDashboard")),

    // Layouts
    subjectLayout: lazy(() => import("./layouts/subjectLayout")),

    // English
    "identify-letter": lazy(() => import("./pages/english/identifyLetter")),

    // Hindi
    counting: lazy(() => import("./pages/hindi/hindiCounting")),
    numbers: lazy(() => import("./pages/hindi/hindiNumbers")),

    // Maths
    "learn-tables": lazy(() => import("./pages/maths/learnTables")),
    clock: lazy(() => import("./pages/maths/readTheClock")),
    "practice-tables": lazy(() => import("./pages/maths/practiceTables")),
    "identify-number": lazy(() => import("./pages/maths/identifyNumber")),
    "counting-1-20": lazy(() => import("./pages/maths/counting1To20")),
    "basic-addition": lazy(() => import("./pages/maths/basicAddition")),

    // STEM
    units: lazy(() => import("./pages/stem/units")),

    // World
    "capitals-of-india": lazy(() => import("./pages/world/capitalsOfIndia")),
    "capitals-of-countries": lazy(() => import("./pages/world/capitalsOfCountries")),
    "flags-of-countries": lazy(() => import("./pages/world/flagsOfCountries")),
    "challenge-flags": lazy(() => import("./pages/world/challengeFlags")),

    // Trivia
    "learn-animals": lazy(() => import("./pages/trivia/learnAnimals")),
};
