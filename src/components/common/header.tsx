import { useState } from "react";
import { HiMenu } from "react-icons/hi";
import Drawer from "../ui/drawer";
import { useSubjects } from "../../hooks/useSubjects";
import { randomQuote } from "../../lib/quotes";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../../store/authStore";
import { signOut } from "firebase/auth";
import { auth } from "../../config/firebase.config";
import { FiLogOut, FiLogIn } from "react-icons/fi";

const DrawerItem: React.FC<{
  label: string;
  path: string;
  onClick?: () => void;
}> = ({ label, path, onClick }) => (
  <Link
    onClick={onClick}
    to={path}
    className="block w-full p-2 text-left text-slate-300 hover:bg-slate-700 hover:text-cyan-400 rounded transition-colors"
  >
    {label}
  </Link>
);

const Header: React.FC = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const { subjects } = useSubjects();
  const { user } = useAuthStore();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      setIsDrawerOpen(false);
      navigate("/");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

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
          <DrawerItem
            label="Home"
            path="/"
            onClick={() => setIsDrawerOpen(false)}
          />

          {subjects.map((subject) => (
            <DrawerItem
              key={subject.id}
              onClick={() => setIsDrawerOpen(false)}
              label={subject.label}
              path={subject.route}
            />
          ))}

          <div className="border-t border-slate-700 mt-4 pt-4">
            {user ? (
              <>
                <div className="text-slate-300 text-sm mb-3">
                  Signed in as:
                  <div className="font-semibold text-cyan-400 mt-1">
                    {user.displayName || user.email}
                  </div>
                </div>
                <button
                  onClick={handleSignOut}
                  className="w-full flex items-center gap-2 p-2 text-left text-red-400 hover:bg-slate-700 rounded transition-colors"
                >
                  <FiLogOut className="h-4 w-4" />
                  Sign Out
                </button>
              </>
            ) : (
              <Link
                onClick={() => setIsDrawerOpen(false)}
                to="/signin"
                className="block w-full p-2 text-left text-cyan-400 hover:bg-slate-700 rounded transition-colors flex items-center gap-2"
              >
                <FiLogIn className="h-4 w-4" />
                Sign In
              </Link>
            )}
          </div>
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
