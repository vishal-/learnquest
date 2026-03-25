import { useEffect, useState } from "react";
import { useAuthStore } from "../../../store/authStore";
import { useNavigate } from "react-router-dom";
import { getIdTokenResult } from "firebase/auth";
import { FiAlertCircle } from "react-icons/fi";

const AdminDashboard: React.FC = () => {
  const { user } = useAuthStore();
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAdminRole = async () => {
      setLoading(true);
      try {
        if (!user) {
          setIsAdmin(false);
          setLoading(false);
          return;
        }

        const idTokenResult = await getIdTokenResult(user);
        const isUserAdmin = idTokenResult.claims?.role === "admin";
        setIsAdmin(isUserAdmin);

        // Redirect if not admin
        if (!isUserAdmin) {
          navigate("/");
        }
      } catch (error) {
        console.error("Error checking admin status:", error);
        setIsAdmin(false);
        navigate("/");
      } finally {
        setLoading(false);
      }
    };

    checkAdminRole();
  }, [user, navigate]);

  if (loading) {
    return (
      <div className="w-full max-w-[430px] mx-auto h-screen bg-[#FFFBF0] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#FF6B6B] mx-auto mb-4"></div>
          <p className="text-[#2D2016] font-nunito">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="w-full max-w-[430px] mx-auto h-screen bg-[#FFFBF0] flex items-center justify-center p-4">
        <div className="text-center">
          <FiAlertCircle className="h-12 w-12 text-[#C93C20] mx-auto mb-4" />
          <h2 className="text-[#2D2016] font-poppins text-lg font-bold mb-2">
            Access Denied
          </h2>
          <p className="text-[#9B8B6E] font-nunito text-sm">
            You don't have permission to access this page.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-[430px] mx-auto bg-[#FFFBF0] p-6 pb-20">
      {/* Admin Dashboard Header */}
      <div className="mb-8">
        <h1 className="text-[#2D2016] font-poppins text-xl font-bold mb-2">
          Admin Dashboard
        </h1>
        <p className="text-[#9B8B6E] font-nunito text-sm">
          Welcome back, admin! Manage LearnQuest content and users.
        </p>
      </div>

      {/* Dashboard Cards - Placeholder */}
      <div className="space-y-4">
        {/* Users Management Card */}
        <div className="bg-white border-2 border-[#D4C4B0] rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow cursor-pointer">
          <h3 className="text-[#2D2016] font-poppins font-bold mb-1 flex items-center gap-2">
            <span className="text-xl">👥</span>
            Users Management
          </h3>
          <p className="text-[#9B8B6E] font-nunito text-xs mb-3">
            Manage user accounts and permissions
          </p>
          <div className="bg-[#F5EBE0] rounded px-3 py-1.5 text-[#2D2016] text-xs font-semibold w-fit">
            Coming Soon
          </div>
        </div>

        {/* Content Management Card */}
        <div className="bg-white border-2 border-[#D4C4B0] rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow cursor-pointer">
          <h3 className="text-[#2D2016] font-poppins font-bold mb-1 flex items-center gap-2">
            <span className="text-xl">📚</span>
            Content Management
          </h3>
          <p className="text-[#9B8B6E] font-nunito text-xs mb-3">
            Create and edit course content
          </p>
          <div className="bg-[#F5EBE0] rounded px-3 py-1.5 text-[#2D2016] text-xs font-semibold w-fit">
            Coming Soon
          </div>
        </div>

        {/* Analytics Card */}
        <div className="bg-white border-2 border-[#D4C4B0] rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow cursor-pointer">
          <h3 className="text-[#2D2016] font-poppins font-bold mb-1 flex items-center gap-2">
            <span className="text-xl">📊</span>
            Analytics
          </h3>
          <p className="text-[#9B8B6E] font-nunito text-xs mb-3">
            View user activity and learning trends
          </p>
          <div className="bg-[#F5EBE0] rounded px-3 py-1.5 text-[#2D2016] text-xs font-semibold w-fit">
            Coming Soon
          </div>
        </div>

        {/* Settings Card */}
        <div className="bg-white border-2 border-[#D4C4B0] rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow cursor-pointer">
          <h3 className="text-[#2D2016] font-poppins font-bold mb-1 flex items-center gap-2">
            <span className="text-xl">⚙️</span>
            Settings
          </h3>
          <p className="text-[#9B8B6E] font-nunito text-xs mb-3">
            Configure app settings and features
          </p>
          <div className="bg-[#F5EBE0] rounded px-3 py-1.5 text-[#2D2016] text-xs font-semibold w-fit">
            Coming Soon
          </div>
        </div>
      </div>

      {/* Admin Info Card */}
      <div className="mt-8 bg-[#E8F4F8] border-2 border-[#7DD3C0] rounded-lg p-4">
        <p className="text-[#2D2016] font-nunito text-xs">
          <strong>Admin Info:</strong> You have access to admin features through
          Firebase custom claims. This dashboard is a placeholder for admin
          functionality.
        </p>
      </div>
    </div>
  );
};

export default AdminDashboard;
