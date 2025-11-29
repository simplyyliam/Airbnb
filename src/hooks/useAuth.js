import { useState, useEffect } from "react";
import axios from "axios";

export function useAuth() {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const res = await axios.get("http://localhost:5000/api/auth/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setCurrentUser(res.data);
      } catch (err) {
        console.error("Error fetching user:", err);
        setCurrentUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  return {
    currentUser,
    isLoggedIn: !!currentUser,
    isHost: currentUser?.isHost || false,
    loading,
    token: localStorage.getItem("token") || "",
  };
}
