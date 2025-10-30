"use client";
import { useRouter } from "next/navigation";

export default function LogoutButton() {
  const router = useRouter();

  const handleLogout = () => {
    // ✅ Clear any stored login/session tokens
    localStorage.removeItem("authToken");
    sessionStorage.removeItem("authToken");

    // ✅ Optionally show a toast or alert
    alert("Logged out successfully!");

    // ✅ Redirect to login page
    router.push("/login");
  };

  return (
    <button
      onClick={handleLogout}
      className="bg-red-600 hover:bg-red-700 text-white font-semibold px-4 py-2 rounded-md shadow-md transition"
    >
      Logout
    </button>
  );
}
