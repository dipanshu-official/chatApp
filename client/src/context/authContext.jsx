import { createContext, useContext, useState, useEffect } from "react";
import { loginAPI, logoutAPI, signupAPI, getallusersAPI } from "../api/auth";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [allUser, setAllUser] = useState(null);
  const [loading, setLoading] = useState(true);

  console.log("user =>", user);
  console.log("allUser =>", allUser);

  const login = async (data) => {
    try {
      setLoading(true);
      const res = await loginAPI(data);
      setUser(res.data);

      localStorage.setItem("token", res.data.token);

      // Fetch user data after successful login
      await fetchUser();
      return { success: true };
    } catch (error) {
      console.error("Login failed:", error);
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };

  const signup = async (data) => {
    try {
      setLoading(true);
      const res = await signupAPI(data);
      localStorage.setItem("token", res.data.token);

      // Fetch user data after successful signup
      await fetchUser();
      return { success: true };
    } catch (error) {
      console.error("Signup failed:", error);
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      await logoutAPI();
    } catch (error) {
      console.error("Logout API failed:", error);
    } finally {
      setUser(null);
      localStorage.removeItem("token");
    }
  };

  const fetchUser = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setLoading(false);
      return;
    }

    try {
      const res = await getallusersAPI();
      setAllUser(res.data[0]);
    } catch (error) {
      console.error("Failed to fetch user:", error);
      // If token is invalid, remove it
      localStorage.removeItem("token");
      setAllUser(null);
    } finally {
      setLoading(false);
    }
  };

  // Check for existing token and fetch user on app load
  useEffect(() => {
    fetchUser();
  }, []);

  const value = {
    user,
    allUser,
    login,
    signup,
    logout,
    loading,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
