import { HashRouter, Route, Routes } from "react-router-dom";
import Header from "./common/header";
import Home from "./pages/home";
import { appSubjects } from "../config/subjects";
import ContentUpload from "./pages/contentUpload";

const Container: React.FC = () => {
  return (
    <HashRouter>
      <Header />

      <div className="container mx-auto bg-background p-4 text-text min-h-screen">
        <Routes>
          {appSubjects.map((subject) => (
            <>
              <Route
                key={`subject_${subject.label}`}
                path={subject.route}
                element={<subject.component subject={subject} />}
              />
              {subject.courses.map((course) => (
                <Route
                  key={`subject_${subject.label}_course_${course.label}`}
                  path={course.route}
                  element={<course.component course={course} />}
                />
              ))}
            </>
          ))}

          {/* <Route path="/hindi" element={<div>Hindi Courses</div>} /> */}

          {/* <Route path="/poc" element={<POC />} /> */}
          <Route path="/content-upload" element={<ContentUpload />} />
          <Route path="/" element={<Home />} />
          {/* <Route path="/" element={<Navigate to="/home" />} /> */}
        </Routes>
      </div>
    </HashRouter>
  );
};

export default Container;
