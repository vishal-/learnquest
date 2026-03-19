import { useState } from "react";
import { HiMenu } from "react-icons/hi";
import { useLocation } from "react-router-dom";
import Drawer from "../ui/drawer";
import { useSubjects } from "../../hooks/useSubjects";
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
    className="block w-full p-3 text-left text-[#2D2016] hover:bg-[#F5EBE0] font-nunito font-semibold rounded transition-colors"
  >
    {label}
  </Link>
);

// Helper function to get greeting based on time of day
const getGreeting = (): { text: string; emoji: string } => {
  const hour = new Date().getHours();

  if (hour >= 5 && hour < 12) {
    return { text: "Good morning", emoji: "🌅" };
  } else if (hour >= 12 && hour < 17) {
    return { text: "Good afternoon", emoji: "☀️" };
  } else {
    return { text: "Good evening", emoji: "🌆" };
  }
};

const Header: React.FC = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const { subjects } = useSubjects();
  const { user } = useAuthStore();
  const navigate = useNavigate();
  const location = useLocation();

  // Find matching subject based on current route (includes course routes)
  const currentSubject = subjects.find((subject) => {
    // Direct match for subject pages
    if (location.pathname === subject.route) return true;
    // Check if on a course page (starts with subject route + /)
    if (location.pathname.startsWith(subject.route + "/")) return true;
    return false;
  });

  // Find matching course based on current route
  let currentCourse = null;
  if (currentSubject) {
    currentCourse = currentSubject.courses.find(
      (course) => location.pathname === course.route
    );
  }

  // Determine header background - use subject's pageBackground on colored pages, cream on home
  const headerBackgroundColor = currentSubject
    ? currentSubject.pageBackground
    : "#FFFBF0";

  // Get contextual description for header
  const getHeaderDescription = (): string => {
    if (currentCourse) {
      return currentCourse.description;
    } else if (currentSubject) {
      return currentSubject.description;
    } else {
      return "What shall we learn today?";
    }
  };

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
    <header
      className="w-full shadow-md border-b-[3px] border-[#2D2016] p-4 flex items-center justify-between gap-3"
      style={{
        backgroundColor: headerBackgroundColor
      }}
    >
      <button
        onClick={() => setIsDrawerOpen(true)}
        className="text-[#2D2016] hover:opacity-70 transition-opacity z-10 flex-shrink-0"
      >
        <HiMenu className="h-6 w-6" />
      </button>

      <Drawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)}>
        <nav className="space-y-2 py-6 px-4">
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

          <div className="border-t-[2px] border-[#D4C4B0] mt-4 pt-4">
            {user ? (
              <>
                <div className="text-[#9B8B6E] text-sm mb-3 font-nunito">
                  Signed in as:
                  <div className="font-semibold text-[#2D2016] mt-1">
                    {user.displayName || user.email}
                  </div>
                </div>
                <button
                  onClick={handleSignOut}
                  className="w-full flex items-center gap-2 p-3 text-left text-[#C93C20] hover:bg-[#F5EBE0] rounded transition-colors font-nunito font-semibold"
                >
                  <FiLogOut className="h-4 w-4" />
                  Sign Out
                </button>
              </>
            ) : (
              <Link
                onClick={() => setIsDrawerOpen(false)}
                to="/signin"
                className="block w-full p-3 text-left text-[#2D2016] hover:bg-[#F5EBE0] rounded transition-colors flex items-center gap-2 font-nunito font-semibold"
              >
                <FiLogIn className="h-4 w-4" />
                Sign In
              </Link>
            )}
          </div>
        </nav>
      </Drawer>

      <div className="flex-1 flex flex-col justify-center">
        <p className="font-nunito text-[12px] font-bold text-[#333] m-0 tracking-[0.5px] uppercase">
          {getGreeting().text}! {getGreeting().emoji}
        </p>
        <h1 className="font-fredoka text-[16px] text-[#2D2016] m-0 leading-tight">
          {getHeaderDescription()}
        </h1>
      </div>

      <div className="flex items-center gap-2 flex-shrink-0">
        {user ? (
          <div
            className="w-10 h-10 rounded-full bg-[#FFD93D] border-[2px] border-[#2D2016] shadow-[2px_2px_0_#2D2016] flex items-center justify-center text-lg flex-shrink-0 cursor-pointer hover:scale-105 transition-transform"
            onClick={() => setIsDrawerOpen(true)}
          >
            🦊
          </div>
        ) : (
          <Link
            to="/signin"
            className="px-3 py-1.5 bg-[#FF6B6B] text-white rounded-lg font-nunito font-semibold text-sm hover:bg-[#E55555] transition-colors flex items-center gap-1"
          >
            <FiLogIn className="h-4 w-4" />
            Sign In
          </Link>
        )}
      </div>
    </header>
  );
};

export default Header;
