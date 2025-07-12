"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
//import { api } from './api';
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
  //login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  refreshAuth: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const refreshAuth = async () => {
    try {
      const response = await axiosApi.get("/auth/me");
      setUser(response.data.user);
    } catch (error) {
      console.error("Refresh auth error:", error);
      setUser(null);
      Cookies.remove("accessToken");
      Cookies.remove("refreshToken");
    }
  };

  // const login = async (email: string, password: string) => {
  //   const response = await axiosApi.post('/auth/login', { email, password });
  //   setUser(response.data.user);
  // };

  const logout = async () => {
    try {
      await axiosApi.post("/auth/logout");
      router.push("/login");
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      setUser(null);
      router.push("/login");
      Cookies.remove("accessToken");
      Cookies.remove("refreshToken");
    }
  };

  useEffect(() => {
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
