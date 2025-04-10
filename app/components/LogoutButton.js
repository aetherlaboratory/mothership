"use client";

import { useRouter } from "next/navigation";

const LogoutButton = () => {
  const router = useRouter();

  const handleLogout = () => {
    console.log("🚪 Logging out...");
    localStorage.removeItem("userToken"); // ✅ Clear token
    router.push("/login"); // ✅ Redirect to login page

    // ✅ Ensure the page fully reloads to clear all user data
    setTimeout(() => {
      window.location.reload();
    }, 500);
  };

  return (
    <button
      onClick={handleLogout}
      className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
    >
      Logout
    </button>
  );
};

export default LogoutButton;
