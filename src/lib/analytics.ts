import { logEvent, setUserId, setUserProperties } from "firebase/analytics";
import { analytics } from "../config/firebase.config";
import type { User } from "firebase/auth";

/**
 * Analytics utility module for tracking user interactions and app usage
 * Firebase Analytics automatically collects:
 * - Geographic data (country, region, city)
 * - Device info (OS, browser, device type)
 * - Session duration
 * - First/last seen dates
 * - More...
 */

export const trackEvent = (
    eventName: string,
    eventData?: Record<string, any>
) => {
    if (!analytics) {
        console.warn("Firebase Analytics not initialized");
        return;
    }
    try {
        logEvent(analytics, eventName, eventData);
    } catch (error) {
        console.error("Error tracking event:", error);
    }
};

/**
 * Set user ID for logged-in users
 * This helps correlate user identity with analytics data
 */
export const setAnalyticsUserId = (user: User | null) => {
    if (!analytics) return;

    if (user) {
        try {
            setUserId(analytics, user.uid);
            // Also set user properties that will help with segmentation
            setUserProperties(analytics, {
                user_type: "logged_in",
                email: user.email || "",
            });
        } catch (error) {
            console.error("Error setting user ID:", error);
        }
    } else {
        try {
            setUserId(analytics, null as any);
            setUserProperties(analytics, {
                user_type: "guest",
            });
        } catch (error) {
            console.error("Error clearing user ID:", error);
        }
    }
};

/**
 * Track when a user accesses a course
 * @param courseId - ID of the course
 * @param courseName - Name of the course
 * @param subjectId - Subject the course belongs to
 */
export const trackCourseAccess = (
    courseId: string,
    courseName: string,
    subjectId: string
) => {
    trackEvent("course_access", {
        course_id: courseId,
        course_name: courseName,
        subject_id: subjectId,
        timestamp: new Date().toISOString(),
    });
};

/**
 * Track when a user completes a course/activity
 */
export const trackCourseCompletion = (
    courseId: string,
    courseName: string,
    timeSpentSeconds: number,
    score?: number
) => {
    trackEvent("course_completion", {
        course_id: courseId,
        course_name: courseName,
        time_spent_seconds: timeSpentSeconds,
        score: score || null,
        timestamp: new Date().toISOString(),
    });
};

/**
 * Track page/section views
 */
export const trackPageView = (pageName: string, pageRoute: string) => {
    trackEvent("page_view", {
        page_name: pageName,
        page_route: pageRoute,
        timestamp: new Date().toISOString(),
    });
};

/**
 * Track user sign in
 */
export const trackSignIn = (signInMethod: string = "email") => {
    trackEvent("user_sign_in", {
        sign_in_method: signInMethod,
        timestamp: new Date().toISOString(),
    });
};

/**
 * Track user sign out
 */
export const trackSignOut = () => {
    trackEvent("user_sign_out", {
        timestamp: new Date().toISOString(),
    });
};

/**
 * Track when user hovers or focuses on content
 */
export const trackContentInteraction = (
    contentType: string,
    contentId: string,
    interactionType: "start" | "pause" | "resume" | "complete"
) => {
    trackEvent("content_interaction", {
        content_type: contentType,
        content_id: contentId,
        interaction_type: interactionType,
        timestamp: new Date().toISOString(),
    });
};

/**
 * Track errors and exceptions
 */
export const trackError = (errorMessage: string, errorCode?: string) => {
    trackEvent("app_error", {
        error_message: errorMessage,
        error_code: errorCode || "unknown",
        timestamp: new Date().toISOString(),
    });
};

/**
 * Track feature usage
 */
export const trackFeatureUsage = (featureName: string, metadata?: Record<string, any>) => {
    trackEvent("feature_usage", {
        feature_name: featureName,
        ...metadata,
        timestamp: new Date().toISOString(),
    });
};
