// Layout component for Hindi language content
import React from "react";
import { Outlet } from "react-router-dom";
import type { Course } from "../../../types/subject.types";

interface HindiLayoutProps {
  courses: Course[];
}

const HindiLayout: React.FC<HindiLayoutProps> = () => {
  return (
    <div dir="ltr" lang="hi" className="hindi-layout">
      <span>This is the hindi layout</span>
      <Outlet />
    </div>
  );
};

export default HindiLayout;
