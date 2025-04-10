'use client';

import useAuthGuard from '../hooks/useAuthGuard'; // 🔄 Adjust path if needed

export default function GeneralAdminPage() {
  const { user, loading } = useAuthGuard();

  console.log('🔍 User Data:', user); // 🧪 Inspect structure

  if (loading) return null;

  // ✅ Check inside `roles` array (WordPress-style user structure)
  const allowedRoles = ['administrator', 'admin'];

  const userRoles = user?.roles?.map((r) => r.toLowerCase?.()) || [];

  const isAllowed = userRoles.some((role) => allowedRoles.includes(role));

  if (!isAllowed) {
    return (
      <div className="text-center py-10 text-lg text-red-600">
        ❌ You do not have permission to view this page.
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">🔐 Admin Page</h1>
      {/* 👇 Admin-only content goes here */}
    </div>
  );
}
