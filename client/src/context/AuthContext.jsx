import { createContext, useContext, useState, useEffect } from "react";
import {
  loginAPI,
  logoutAPI,
  signupAPI,
  getCurrentUserAPI, // ✅ You need this in your API file
} from "../api/auth";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Stores currently logged-in user
  const [loading, setLoading] = useState(true); // Controls loading state

  console.log("User =>", user);

  // In your AuthProvider
  useEffect(() => {
    fetchUser(); // ✅ Called on reload
  }, []);

  const fetchUser = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setLoading(false);
      return;
    }

    try {
      const res = await getCurrentUserAPI();
      console.log("Fetched user =>", res.data);
      setUser(res.data); // ✅ Update user in state
    } catch (error) {
      console.error("Failed to fetch user:", error);
      localStorage.removeItem("token");
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Handles login flow
  const login = async (data) => {
    try {
      setLoading(true);
      const res = await loginAPI(data); // { token, user }
      const { token } = res.data;

      localStorage.setItem("token", token); // Save token
      await fetchUser(); // Fetch user from token
      return { success: true };
    } catch (error) {
      console.error("Login failed:", error);
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };

  // ✅ Handles signup flow
  const signup = async (data) => {
    try {
      setLoading(true);
      const res = await signupAPI(data); // Assume API returns token
      const { token } = res.data;

      localStorage.setItem("token", token); // Save token
      await fetchUser(); // Fetch user from token
      return { success: true };
    } catch (error) {
      console.error("Signup failed:", error);
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };

  // ✅ Handles logout
  const logout = async () => {
    try {
      await logoutAPI(); // Optional backend cleanup
      localStorage.removeItem("token");
      setUser(null);
    } catch (error) {
      console.error("Logout API failed:", error);
    } finally {
      localStorage.removeItem("token");
      setUser(null);
    }
  };

  const value = {
    user,
    login,
    signup,
    logout,
    loading,
    isAuthenticated: !!user, // Bool for auth checks
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// ✅ Hook to use auth in any component
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
