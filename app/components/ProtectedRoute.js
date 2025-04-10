"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const ProtectedRoute = ({ children }) => {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("userToken");

    if (!token) {
      console.warn("🔴 No user token found, redirecting to login...");
      router.push("/login");
    } else {
      console.log("✅ User token found, allowing access to profile.");
      setIsAuthenticated(true);
    }

    setLoading(false);
  }, []);

  if (loading) return <p>🔄 Checking Authentication...</p>;

  return isAuthenticated ? children : null;
};

export default ProtectedRoute;
