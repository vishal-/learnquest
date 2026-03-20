import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Course } from "../types/subject.types";

interface CourseHistoryEntry extends Course {
    accessedAt: number; // timestamp
}

interface CourseHistoryState {
    history: CourseHistoryEntry[];
    addCourseAccess: (course: Course) => void;
    getRecentCourses: (limit: number) => CourseHistoryEntry[];
    clearHistory: () => void;
}

export const useCourseHistoryStore = create<CourseHistoryState>()(
    persist(
        (set, get) => ({
            history: [],

            addCourseAccess: (course: Course) => {
                set((state) => {
                    // Remove duplicate if it exists
                    const filtered = state.history.filter((c) => c.id !== course.id);

                    // Add to the beginning with current timestamp
                    const updated = [
                        { ...course, accessedAt: Date.now() },
                        ...filtered
                    ];

                    return { history: updated };
                });
            },

            getRecentCourses: (limit: number) => {
                return get().history.slice(0, limit);
            },

            clearHistory: () => {
                set({ history: [] });
            }
        }),
        {
            name: "course-history-storage"
        }
    )
);
