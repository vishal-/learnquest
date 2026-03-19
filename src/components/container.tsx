import { HashRouter, Route, Routes } from "react-router-dom";
import { useEffect } from "react";
import Header from "./common/header";
import Home from "./pages/home";
import ContentUpload from "./pages/contentUpload";
import SignIn from "./pages/signIn";
import { useSubjects } from "../hooks/useSubjects";
import { componentMap } from "./componentMap";
import { useAuthStore } from "../store/authStore";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../config/firebase.config";
import type { Subject, Course } from "../types/subject.types";

const Container: React.FC = () => {
  const { subjects } = useSubjects();
  const { setUser, setLoading: setAuthLoading } = useAuthStore();

  // Initialize auth state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setAuthLoading(false);
    });

    return unsubscribe;
  }, [setUser, setAuthLoading]);

  const renderComponent = (componentName: string, props: any) => {
    const Component = componentMap[componentName];
    return Component ? <Component {...props} /> : null;
  };

  return (
    <HashRouter>
      <Header />

      <div className="container mx-auto bg-background p-4 text-text min-h-screen">
        <Routes>
          {/* Static Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/content-upload" element={<ContentUpload />} />

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
    </HashRouter>
  );
};

export default Container;
