import React from "react";
import { HiX } from "react-icons/hi";

interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Drawer: React.FC<DrawerProps> = ({ isOpen, onClose, children }) => {
  return (
    <>
      <div
        className={`fixed inset-0 bg-black/51 z-40 ${
          isOpen ? "block" : "hidden"
        }`}
        onClick={onClose}
      ></div>
      <div
        className={`fixed top-0 h-full bg-white shadow-lg transition-all duration-300 ease-in-out z-50 overflow-y-auto w-64 ${
          isOpen ? "left-0" : "-left-full"
        }`}
      >
        <button onClick={onClose} className="float-right m-4">
          <HiX className="h-5 w-5" />
        </button>
        {children}
      </div>
    </>
  );
};

export default Drawer;
