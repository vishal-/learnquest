// Layout component for Hindi language content
import React from "react";
import { Outlet } from "react-router-dom";

interface HindiLayoutProps {
  children: React.ReactNode;
}

const HindiLayout: React.FC<HindiLayoutProps> = () => {
  return (
    <div dir="ltr" lang="hi" className="hindi-layout">
      <Outlet />
    </div>
  );
};

export default HindiLayout;
