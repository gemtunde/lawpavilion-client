"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import axiosApi from "@/services/axiosApi";

interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  isVerified: boolean;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  setUser: (user: User | null) => void;
  logout: () => Promise<void>;
  refreshAuth: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUserState] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const saveUserToLocalStorage = (user: User | null) => {
    if (user) {
      localStorage.setItem("authUser", JSON.stringify(user));
    } else {
      localStorage.removeItem("authUser");
    }
  };

  const setUser = (user: User | null) => {
    setUserState(user);
    saveUserToLocalStorage(user);
  };

  const refreshAuth = async () => {
    try {
      const response = await axiosApi.get("/auth/me");
      setUser(response.data.user);
    } catch (error) {
      console.error("Refresh auth error:", error);
      setUser(null);
      Cookies.remove("accessToken");
      Cookies.remove("refreshToken");
      localStorage.removeItem("authUser");
    }
  };

  const logout = async () => {
    try {
      await axiosApi.post("/auth/logout");
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      setUser(null);
      Cookies.remove("accessToken");
      Cookies.remove("refreshToken");
      router.push("/auth/login");
    }
  };

  useEffect(() => {
    const storedUser = localStorage.getItem("authUser");
    if (storedUser) {
      setUserState(JSON.parse(storedUser));
    }

    const initAuth = async () => {
      const accessToken = Cookies.get("accessToken");
      if (accessToken) {
        await refreshAuth();
      }
      setLoading(false);
    };

    initAuth();
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, setUser, loading, logout, refreshAuth }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
