import { useEffect, useState } from "react";
import { useAuthStore } from "@/store/authStore";
import { useNavigate } from "react-router-dom";
import { getIdTokenResult } from "firebase/auth";
import AdminLayout from "@/components/layouts/adminLayout";
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
      <AdminLayout title="Loading...">
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading...</p>
          </div>
        </div>
      </AdminLayout>
    );
  }

  if (!isAdmin) {
    return (
      <AdminLayout title="Access Denied">
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <FiAlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
            <h2 className="text-lg font-bold text-gray-900 mb-2">
              Access Denied
            </h2>
            <p className="text-gray-600">
              You don't have permission to access this page.
            </p>
          </div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout
      title="Admin Dashboard"
      subtitle="Manage quiz questions, users, and content"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Quiz Management Card */}
        <div
          onClick={() => navigate("/admin/add-questions")}
          className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-lg hover:border-blue-500 transition-all cursor-pointer"
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="p-3 bg-blue-100 rounded-lg">
              <span className="text-2xl">📝</span>
            </div>
            <h3 className="font-semibold text-gray-900">Add Quiz Questions</h3>
          </div>
          <p className="text-gray-600 text-sm mb-4">
            Import questions from JSON, edit, and save to database
          </p>
          <div className="inline-flex items-center gap-2 text-blue-600 font-medium text-sm hover:gap-3 transition-all">
            Manage
            <span>→</span>
          </div>
        </div>

        {/* View & Edit Questions Card */}
        <div
          onClick={() => navigate("/admin/questions")}
          className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-lg hover:border-purple-500 transition-all cursor-pointer"
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="p-3 bg-purple-100 rounded-lg">
              <span className="text-2xl">🔍</span>
            </div>
            <h3 className="font-semibold text-gray-900">View & Edit Questions</h3>
          </div>
          <p className="text-gray-600 text-sm mb-4">
            Browse, search, and edit existing questions with filters
          </p>
          <div className="inline-flex items-center gap-2 text-purple-600 font-medium text-sm hover:gap-3 transition-all">
            Browse
            <span>→</span>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 opacity-50 cursor-not-allowed">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-3 bg-gray-100 rounded-lg">
              <span className="text-2xl">👥</span>
            </div>
            <h3 className="font-semibold text-gray-900">Users Management</h3>
          </div>
          <p className="text-gray-600 text-sm mb-4">
            Manage user accounts and permissions
          </p>
          <div className="inline-flex items-center gap-2 text-gray-400 font-medium text-sm">
            Coming Soon
          </div>
        </div>

        {/* Content Management Card */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 opacity-50 cursor-not-allowed">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-3 bg-gray-100 rounded-lg">
              <span className="text-2xl">📚</span>
            </div>
            <h3 className="font-semibold text-gray-900">Content Management</h3>
          </div>
          <p className="text-gray-600 text-sm mb-4">
            Create and edit course content
          </p>
          <div className="inline-flex items-center gap-2 text-gray-400 font-medium text-sm">
            Coming Soon
          </div>
        </div>

        {/* Analytics Card */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 opacity-50 cursor-not-allowed">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-3 bg-gray-100 rounded-lg">
              <span className="text-2xl">📊</span>
            </div>
            <h3 className="font-semibold text-gray-900">Analytics</h3>
          </div>
          <p className="text-gray-600 text-sm mb-4">
            View user activity and learning trends
          </p>
          <div className="inline-flex items-center gap-2 text-gray-400 font-medium text-sm">
            Coming Soon
          </div>
        </div>

        {/* Settings Card */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 opacity-50 cursor-not-allowed">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-3 bg-gray-100 rounded-lg">
              <span className="text-2xl">⚙️</span>
            </div>
            <h3 className="font-semibold text-gray-900">Settings</h3>
          </div>
          <p className="text-gray-600 text-sm mb-4">
            Configure app settings and features
          </p>
          <div className="inline-flex items-center gap-2 text-gray-400 font-medium text-sm">
            Coming Soon
          </div>
        </div>
      </div>

      {/* Info Section */}
      <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
        <h3 className="font-semibold text-blue-900 mb-2">
          ℹ️ Admin Panel Info
        </h3>
        <p className="text-sm text-blue-800">
          You have access to admin features through Firebase custom claims. This
          panel is where you can manage all quiz-related content and system
          settings. Started with Quiz question management - more features coming
          soon!
        </p>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
