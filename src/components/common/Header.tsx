import { useState } from "react";
import { HiMenu } from "react-icons/hi";
import Drawer from "../ui/Drawer";

const Header: React.FC = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  return (
    <header className="bg-slate-800 shadow-lg border-b border-slate-700 px-4 py-6 mb-6 flex items-center justify-between text-slate-100">
      <div className="flex items-center gap-4">
        <button onClick={() => setIsDrawerOpen(true)} className="text-slate-300 hover:text-cyan-400 transition-colors">
          <HiMenu className="h-6 w-6" />
        </button>

        <Drawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)}>
          <nav className="space-y-2 py-9 px-4">
            <a
              href="#"
              className="block px-3 py-2 text-slate-300 hover:bg-slate-700 hover:text-cyan-400 rounded transition-colors"
            >
              Home
            </a>
            <a
              href="#"
              className="block px-3 py-2 text-slate-300 hover:bg-slate-700 hover:text-cyan-400 rounded transition-colors"
            >
              About
            </a>
            <a
              href="#"
              className="block px-3 py-2 text-slate-300 hover:bg-slate-700 hover:text-cyan-400 rounded transition-colors"
            >
              Services
            </a>
            <a
              href="#"
              className="block px-3 py-2 text-slate-300 hover:bg-slate-700 hover:text-cyan-400 rounded transition-colors"
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
