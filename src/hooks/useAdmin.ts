import { useEffect, useState } from "react";
import { useAuthStore } from "../store/authStore";
import { getIdTokenResult } from "firebase/auth";

export const useAdmin = () => {
    const { user } = useAuthStore();
    const [isAdmin, setIsAdmin] = useState(false);
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
                setIsAdmin(idTokenResult.claims?.role === "admin");
            } catch (error) {
                console.error("Error checking admin status:", error);
                setIsAdmin(false);
            } finally {
                setLoading(false);
            }
        };

        checkAdminRole();
    }, [user]);

    return { isAdmin, loading };
};
