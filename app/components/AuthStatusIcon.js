"use client";
import { useEffect, useState } from "react";
import { UserCheck, UserX } from "lucide-react";

const AuthStatusIcon = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("Guest");

  useEffect(() => {
    // 🔐 Get login token and nickname from localStorage
    const token = localStorage.getItem("userToken");
    const name = localStorage.getItem("userName");

    // ✅ Set login state and name
    setIsLoggedIn(!!token);
    setUsername(name || "Guest");
  }, []);

  return (
    <div className="group">
      {isLoggedIn ? (
        <div className="relative flex items-center">
          <UserCheck className="text-green-400 hover:text-green-600 cursor-pointer" />
          <span className="absolute top-8 right-0 mt-1 hidden group-hover:block bg-white text-black text-sm rounded shadow-md px-3 py-1 whitespace-nowrap">
            Logged in as: <strong>{username}</strong><br />
            👋 Hey {username}!
          </span>
        </div>
      ) : (
        <div className="relative flex items-center">
          <UserX className="text-red-400 hover:text-red-600 cursor-pointer" />
          <span className="absolute top-8 right-0 mt-1 hidden group-hover:block bg-white text-black text-sm rounded shadow-md px-3 py-1">
            Not logged in
          </span>
        </div>
      )}
    </div>
  );
};

export default AuthStatusIcon;
