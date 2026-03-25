import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import {
    trackPageView,
    setAnalyticsUserId,
} from "../lib/analytics";

/**
 * Hook to automatically track page views and manage session analytics
 */
export const useAnalytics = () => {
    const location = useLocation();
    const { user } = useAuthStore();
    const previousPathRef = useRef<string | null>(null);
    const userTrackingRef = useRef<string | null>(null);

    // Track page views when route changes
    useEffect(() => {
        if (location.pathname !== previousPathRef.current) {
            trackPageView(location.pathname, location.pathname);
            previousPathRef.current = location.pathname;
        }
    }, [location.pathname]);

    // Track user ID when auth state changes
    useEffect(() => {
        const currentUid = user?.uid || null;

        // Only update if user state actually changed
        if (currentUid !== userTrackingRef.current) {
            setAnalyticsUserId(user);
            userTrackingRef.current = currentUid;
        }
    }, [user]);
};

/**
 * Hook for tracking time spent on a page/course
 * @param courseName - Name of the course being viewed
 * @returns Functions to track timing
 */
export const useSessionTimer = (courseName?: string) => {
    const sessionStartTimeRef = useRef<number>(Date.now());

    // Return a function to record the session when component unmounts
    useEffect(() => {
        return () => {
            if (courseName) {
                const timeSpentSeconds = Math.round(
                    (Date.now() - sessionStartTimeRef.current) / 1000
                );

                // Track time spent metadata
                console.log(
                    `User spent ${timeSpentSeconds} seconds on ${courseName}`
                );
            }
        };
    }, [courseName]);

    return {
        getSessionDuration: () =>
            Math.round((Date.now() - sessionStartTimeRef.current) / 1000),
        resetSessionTimer: () => {
            sessionStartTimeRef.current = Date.now();
        },
    };
};
