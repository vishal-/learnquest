import { HashRouter, Route, Routes, useLocation } from "react-router-dom";
import { useEffect, useRef } from "react";
import Header from "./common/header";
import Home from "./pages/home";
import ContentUpload from "./pages/contentUpload";
import SignIn from "./pages/signIn";
import { useSubjects } from "../hooks/useSubjects";
import { componentMap } from "./componentMap";
import { useAuthStore } from "../store/authStore";
import { useCourseHistoryStore } from "../store/courseHistoryStore";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../config/firebase.config";
import type { Subject, Course } from "../types/subject.types";

// Inner component that uses useLocation (needs to be inside Router)
const ContainerContent: React.FC = () => {
  const { subjects } = useSubjects();
  const location = useLocation();
  const { addCourseAccess } = useCourseHistoryStore();
  const lastTrackedPathRef = useRef<string | null>(null);

  // Track course access when route changes
  useEffect(() => {
    const currentPath = location.pathname;

    // Only track if path has changed
    if (lastTrackedPathRef.current === currentPath) {
      return;
    }

    // Find if this path matches a course route
    for (const subject of subjects) {
      const course = subject.courses?.find((c) => c.route === currentPath);
      if (course) {
        addCourseAccess(course);
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
      <Header />

      <div className="flex-1 overflow-y-auto">
        <Routes>
          {/* Static Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/content-upload" element={<ContentUpload />} />
          <Route path="/admin" element={renderComponent("admin", {})} />

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
        </Routes>
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
      <div className="min-h-screen max-w-[430px] mx-auto flex flex-col bg-[#FFFBF0]">
        <ContainerContent />
      </div>
    </HashRouter>
  );
};

export default Container;
