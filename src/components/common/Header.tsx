import { useState } from "react";
import { HiMenu } from "react-icons/hi";
import Drawer from "../ui/Drawer";
import { appSubjects } from "../../config/subjects";
import { randomQuote } from "../../lib/quotes";
import { Link } from "react-router-dom";

const DrawerItem: React.FC<{
  label: string;
  path: string;
}> = ({ label, path }) => (
  <Link
    to={path}
    className="block w-full p-2 text-left text-slate-300 hover:bg-slate-700 hover:text-cyan-400 rounded transition-colors"
  >
    {label}
  </Link>
);

const Header: React.FC = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  return (
    <header className="bg-slate-800 shadow-lg border-b border-slate-700 p-4 flex items-center justify-between text-slate-100">
      <button
        onClick={() => setIsDrawerOpen(true)}
        className="text-slate-300 hover:text-cyan-400 transition-colors z-10"
      >
        <HiMenu className="h-6 w-6" />
      </button>

      <Drawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)}>
        <nav className="space-y-2 py-9 px-4">
          <DrawerItem label="Home" path="/" />

          {appSubjects.map((subject) => (
            <DrawerItem
              key={subject.label}
              label={subject.label}
              path={subject.route}
            />
          ))}
        </nav>
      </Drawer>

      <div className="flex-1 overflow-hidden mx-4">
        <h1 className="text-xl text-slate-600 font-semibold whitespace-nowrap marquee">
          {randomQuote}
        </h1>
      </div>
    </header>
  );
};

export default Header;
