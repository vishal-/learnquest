// Layout component for Hindi language content
import React from "react";
import { Outlet } from "react-router-dom";
import type { Course } from "../../../types/subject.types";

interface EnglishLayoutProps {
  courses: Course[];
}

const EnglishLayout: React.FC<EnglishLayoutProps> = ({ courses }) => {
  return (
    <div dir="ltr" lang="en" className="english-layout">
      <Outlet />
    </div>
  );
};

export default EnglishLayout;
