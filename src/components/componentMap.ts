
import { lazy } from "react";

// This maps the string identifiers from Firestore to the actual lazy-loaded components.
export const componentMap: { [key: string]: React.LazyExoticComponent<React.ComponentType<any>> } = {
    // Layouts
    subjectLayout: lazy(() => import("./pages/layouts/subjectLayout")),

    // General
    clock: lazy(() => import("./pages/general/readTheClock")),

    // Hindi
    counting: lazy(() => import("./pages/hindi/hindiCounting")),
    numbers: lazy(() => import("./pages/hindi/hindiNumbers")),

    // Maths
    tables: lazy(() => import("./pages/maths/mathTables")),

    // STEM
    units: lazy(() => import("./pages/stem/units")),

    // World
    "capitals-of-india": lazy(() => import("./pages/world/capitalsOfIndia")),
    "capitals-of-countries": lazy(() => import("./pages/world/capitalsOfCountries")),
    "flags-of-countries": lazy(() => import("./pages/world/flagsOfCountries")),
};
