import { HashRouter, Route, Routes, useLocation } from "react-router-dom";
import { useEffect, useRef } from "react";
import Header from "./layouts/header";
import Home from "./pages/home";
import SignIn from "./pages/signIn";
import AdminDashboard from "./pages/admin/adminDashboard";
import AddQuestions from "./pages/admin/addQuestions";
import NotFound from "./pages/notFound";
import { useSubjects } from "@/hooks/useSubjects";
import { componentMap } from "./componentMap";
import { useAuthStore } from "@/store/authStore";
import { useCourseHistoryStore } from "@/store/courseHistoryStore";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/config/firebase.config";
import { useAnalytics, useSessionTimer } from "@/hooks/useAnalytics";
import { trackCourseAccess } from "@/lib/analytics";
import type { Subject, Course } from "@/types/subject.types";

// Inner component that uses useLocation (needs to be inside Router)
const ContainerContent: React.FC = () => {
  const { subjects } = useSubjects();
  const location = useLocation();
  const { addCourseAccess } = useCourseHistoryStore();
  const lastTrackedPathRef = useRef<string | null>(null);

  // Initialize analytics tracking
  useAnalytics();
  useSessionTimer();

  // Check if current route is an admin route
  const isAdminRoute = location.pathname.startsWith("/admin");

  // Track course access when route changes
  useEffect(() => {
    const currentPath = location.pathname;

    // Only track if path has changed
    if (lastTrackedPathRef.current === currentPath) {
      return;
    }

    // Find if this path matches a course route and track it
    for (const subject of subjects) {
      const course = subject.courses?.find((c) => c.route === currentPath);
      if (course) {
        addCourseAccess(course);
        trackCourseAccess(course.id, course.label, subject.id);
        lastTrackedPathRef.current = currentPath;
        break;
      }
    }
  }, [location.pathname, subjects, addCourseAccess]);

  const renderComponent = (componentName: string, props: any) => {
    const Component = componentMap[componentName];
    return Component ? <Component {...props} /> : null;
  };

  return (
    <>
      {!isAdminRoute && <Header />}

      <div className={isAdminRoute ? "w-full" : "flex-1 overflow-y-auto"}>
        <div className={isAdminRoute ? "w-full" : "max-w-[430px] mx-auto"}>
          <Routes>
            {/* Static Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/add-questions" element={<AddQuestions />} />

            {/* Dynamic Routes */}
            {subjects.map((subject: Subject) => (
              <>
                <Route
                  key={`subject_${subject.id}`}
                  path={subject.route}
                  element={renderComponent("subjectLayout", { subject })}
                />
                {subject.courses?.map((course: Course) => (
                  <Route
                    key={`course_${course.id}`}
                    path={course.route}
                    element={renderComponent(course.component, { course })}
                  />
                ))}
              </>
            ))}

            {/* 404 Catch-all Route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </div>
    </>
  );
};

const Container: React.FC = () => {
  const { setUser, setLoading: setAuthLoading } = useAuthStore();

  // Initialize auth state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setAuthLoading(false);
    });

    return unsubscribe;
  }, [setUser, setAuthLoading]);

  return (
    <HashRouter>
      <div className="min-h-screen flex flex-col bg-[#FFFBF0]">
        <ContainerContent />
      </div>
    </HashRouter>
  );
};

export default Container;
