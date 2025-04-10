"use client";

import { useEffect, useState } from "react";

const useAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("userToken");

    if (!token) {
      console.warn("🔴 No user token found.");
      setUser(null);
    } else {
      console.log("✅ Token found, user is authenticated.");
      setUser({ token }); // Placeholder, replace with actual user-fetching logic
    }

    setLoading(false);
  }, []);

  return { user, loading };
};

export default useAuth;
