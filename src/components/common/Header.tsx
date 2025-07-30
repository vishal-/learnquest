import { useState } from "react";
import { HiMenu } from "react-icons/hi";
import Drawer from "../ui/Drawer";

const Header: React.FC = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  return (
    <header className="bg-white shadow-sm px-4 py-6 mb-6 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <button onClick={() => setIsDrawerOpen(true)}>
          <HiMenu className="h-6 w-6" />
        </button>

        <Drawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)}>
          <nav className="space-y-2 py-9 px-4">
            <a
              href="#"
              className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded"
            >
              Home
            </a>
            <a
              href="#"
              className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded"
            >
              About
            </a>
            <a
              href="#"
              className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded"
            >
              Services
            </a>
            <a
              href="#"
              className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded"
            >
              Contact
            </a>
          </nav>
        </Drawer>

        <h1 className="text-xl align-center font-semibold">LearnQuest</h1>
      </div>
    </header>
  );
};

export default Header;
