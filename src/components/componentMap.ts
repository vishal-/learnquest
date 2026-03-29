import { lazy } from "react";
import { coursesData } from "@/lib/subjects";

// Auto-generate component map from courses data
// This ensures single source of truth - if a course component changes, it's reflected here automatically
export const componentMap: { [key: string]: React.LazyExoticComponent<React.ComponentType<any>> } = Object.fromEntries(
    coursesData.map((course) => [
        course.component,
        lazy(() =>
            import(`./pages/${course.subjectId}/${course.component}`).catch(() => {
                // Fallback for components with different naming conventions
                console.warn(`Could not find component: ${course.component} in ${course.subjectId}`);
                return import("./pages/notFound");
            })
        ),
    ])
);

// Also export adminDashboard separately as it's not part of courses
componentMap["admin"] = lazy(() => import("./pages/admin/adminDashboard"));
componentMap["subjectLayout"] = lazy(() => import("./layouts/subjectLayout"));
