import { HashRouter, Navigate, Route, Routes } from "react-router-dom";
import Header from "./common/Header";
import Home from "./pages/home";
import POC from "./pages/poc";

// Container component that serves as a wrapper with default styling
const Container: React.FC = () => {
  return (
    <>
      <Header />

      <div className="container mx-auto bg-background p-4 text-text min-h-screen">
        <HashRouter>
          <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/poc" element={<POC />} />
            <Route path="/" element={<Navigate to="/poc" />} />
          </Routes>
        </HashRouter>
      </div>
    </>
  );
};

export default Container;
