import { useEffect, useState } from "react";
import {
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  onAuthStateChanged
} from "firebase/auth";
import { auth } from "../../config/firebase.config";
import { useAuthStore } from "../../store/authStore";
import { useNavigate } from "react-router-dom";
import Button from "../ui/button";
import { FcGoogle } from "react-icons/fc";

const SignIn: React.FC = () => {
  const navigate = useNavigate();
  const { user, setUser, setLoading } = useAuthStore();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Monitor auth state changes
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return unsubscribe;
  }, [setUser, setLoading]);

  if (!user) {
    const handleGoogleSignIn = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const provider = new GoogleAuthProvider();
        const result = await signInWithPopup(auth, provider);
        setUser(result.user);
        navigate("/");
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to sign in with Google"
        );
      } finally {
        setIsLoading(false);
      }
    };

    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 to-slate-800 p-4">
        <div className="bg-slate-800 rounded-lg shadow-2xl p-8 max-w-md w-full border border-slate-700">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-slate-100 mb-2">
              LearnQuest
            </h1>
            <p className="text-slate-400">Sign in to continue learning</p>
          </div>

          {error && (
            <div className="mb-6 p-3 bg-red-900/30 border border-red-700 rounded text-red-300 text-sm">
              {error}
            </div>
          )}

          <button
            onClick={handleGoogleSignIn}
            disabled={isLoading}
            className="w-full flex items-center justify-center gap-3 bg-white hover:bg-slate-100 text-slate-900 font-semibold py-3 px-4 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <FcGoogle className="h-5 w-5" />
            {isLoading ? "Signing in..." : "Sign in with Google"}
          </button>

          <p className="text-center text-slate-400 text-sm mt-6">
            Sign in is optional. Skip to{" "}
            <button
              onClick={() => navigate("/")}
              className="text-cyan-400 hover:text-cyan-300 underline"
            >
              home
            </button>{" "}
            without signing in.
          </p>
        </div>
      </div>
    );
  }

  // User is already signed in
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 to-slate-800 p-4">
      <div className="bg-slate-800 rounded-lg shadow-2xl p-8 max-w-md w-full border border-slate-700">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-slate-100 mb-4">
            Welcome, {user.displayName || user.email}!
          </h1>
          {user.photoURL && (
            <img
              src={user.photoURL}
              alt={user.displayName || "User"}
              className="h-20 w-20 rounded-full mx-auto mb-4"
            />
          )}
        </div>

        <div className="space-y-4">
          <Button
            onClick={() => navigate("/")}
            variant="primary"
            label="Go to Home"
          />
          <button
            onClick={async () => {
              try {
                await signOut(auth);
                setUser(null);
                navigate("/signin");
              } catch (err) {
                setError(
                  err instanceof Error ? err.message : "Failed to sign out"
                );
              }
            }}
            className="w-full bg-red-900/50 hover:bg-red-900 text-red-300 font-semibold py-2 px-4 rounded-lg transition-colors"
          >
            Sign Out
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
