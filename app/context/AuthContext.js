"use client";

// app/context/AuthContext.js

import { createContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const storedToken = localStorage.getItem("userToken");
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  const login = async (username, password) => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_WP}/jwt-auth/v1/token`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username, password }),
        }
      );

      if (!res.ok) throw new Error("Invalid credentials");
      const data = await res.json();

      setToken(data.token);
      localStorage.setItem("userToken", data.token);
      setUser({
        username: data.user_nicename,
        email: data.user_email,
        displayName: data.user_display_name,
      });
    } catch (error) {
      console.error("❌ Login error:", error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, token, login }}>
      {children}
    </AuthContext.Provider>
  );
};
