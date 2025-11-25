
import { lazy } from "react";

// This maps the string identifiers from Firestore to the actual lazy-loaded components.
export const componentMap: { [key: string]: React.LazyExoticComponent<React.ComponentType<any>> } = {
    // Layouts
    subjectLayout: lazy(() => import("./pages/layouts/subjectLayout")),

    // General
    clock: lazy(() => import("./pages/general/readTheClock")),
    "identify-letter": lazy(() => import("./pages/general/identifyLetter")),

    // Hindi
    counting: lazy(() => import("./pages/hindi/hindiCounting")),
    numbers: lazy(() => import("./pages/hindi/hindiNumbers")),

    // Maths
    tables: lazy(() => import("./pages/maths/mathTables")),
    "identify-number": lazy(() => import("./pages/maths/identifyNumber")),
    "counting-1-20": lazy(() => import("./pages/maths/counting1To20")),

    // STEM
    units: lazy(() => import("./pages/stem/units")),

    // World
    "capitals-of-india": lazy(() => import("./pages/world/capitalsOfIndia")),
    "capitals-of-countries": lazy(() => import("./pages/world/capitalsOfCountries")),
    "flags-of-countries": lazy(() => import("./pages/world/flagsOfCountries")),
    "challenge-flags": lazy(() => import("./pages/world/challengeFlags")),
};
