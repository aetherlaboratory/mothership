"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getUserData } from "../utils/api";
import LogoutButton from "../components/LogoutButton";
import UserInfo from "./UserInfo"; // ✅ Import the new component

const DashboardPage = () => {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("userToken");

    console.log("🔍 Checking stored token:", token);

    if (!token) {
      console.warn("🔴 No user token found, redirecting to login...");
      setTimeout(() => {
        router.push("/login");
      }, 1000); // ✅ Delay to prevent immediate redirect issues
      return;
    }

    const fetchUser = async () => {
      try {
        const userData = await getUserData(token);

        if (userData) {
          console.log("✅ User Data:", userData);
          setUser(userData);
        } else {
          router.push("/login");
        }
      } catch (error) {
        console.error("❌ Error fetching user:", error);
        router.push("/login");
      }

      setLoading(false);
    };

    fetchUser();
  }, []);

  if (loading) return <p className="text-center text-lg">🔄 Loading Dashboard...</p>;

  return (
    <div>
      {/* ✅ Modularized User Profile Component */}
      <UserInfo user={user} />

      {/* ✅ Logout Button */}
      <div className="text-center mt-4">
        <LogoutButton />
      </div>
    </div>
  );
};

export default DashboardPage;