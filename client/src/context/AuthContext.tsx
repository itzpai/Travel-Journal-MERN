import { createContext, useContext, useEffect, useState } from "react";
import { User } from "../types/index";
import { AuthContextType } from "../types/index";
import api from "../lib/axios";

const AuthContext = createContext<AuthContextType | null>(null);

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  async function register(username: string, email: string, password: string) {
    try {
      const response = await api.post("/auth/register", {
        username,
        email,
        password,
      });
      const responseData = response.data;
      const payload = responseData.data;

      if (responseData.code !== "200") {
        throw new Error(responseData.message);
      }
      api.defaults.headers.common["Authorization"] = `Bearer ${payload.token}`;
      setUser(payload.user);
      return payload;
    } catch (error: any) {
      if (error.response?.status === 500) {
        throw new Error("Server error");
      }
      const errorMessage = error.response?.data?.message || error.message;
      throw new Error(errorMessage);
    }
  }

  async function login(email: string, password: string) {
    try {
      const response = await api.post(
        "/auth/login",
        { email, password },
        { withCredentials: true },
      );
      const responseData = response.data;
      const payload = responseData.data;

      if (responseData.code !== "200") {
        throw new Error(responseData.message);
      }
      api.defaults.headers.common["Authorization"] = `Bearer ${payload.token}`;
      setUser(payload.user);
      return payload;
    } catch (error: any) {
      if (error.response?.status === 500) {
        throw new Error("Server error");
      }
      const errorMessage = error.response?.data?.message || error.message;
      throw new Error(errorMessage);
    }
  }

  async function logout() {
    await api.post("/auth/logout", {}, { withCredentials: true });
    setUser(null);
    delete api.defaults.headers.common["Authorization"];
  }

  useEffect(() => {
    async function refreshUser() {
      try {
        const response = await api.post(
          "/auth/refresh-token",
          {},
          { withCredentials: true },
        );
        const responseData = response.data;
        const payload = responseData.data;

        if (responseData.code === "200" && payload) {
          api.defaults.headers.common["Authorization"] =
            `Bearer ${payload.token}`;
          setUser(payload.user);
        }
      } catch (error) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    }
    refreshUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        register,
        login,
        logout,
        isAuthenticated: !!user,
      }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
