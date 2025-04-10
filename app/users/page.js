'use client';

import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import useAuthGuard from '../hooks/useAuthGuard'; // 🔐 Auth protection hook

export default function UsersPage() {
  const { user, loading } = useAuthGuard();

  // 🧪 Debug logs
  console.log("👤 Loading UsersPage...");
  console.log("🔐 Hook user:", user);
  console.log("🔄 Hook loading:", loading);

  // ⏳ Block rendering until user is ready
  if (loading || !user) {
    return <p className="text-center p-4">🔄 Loading session...</p>;
  }

  // ✅ Admin access check (after user exists)
  const allowedRoles = ['administrator', 'admin'];
  const userRoles = user.roles?.map((r) => r.toLowerCase?.()) || [];
  const isAdmin = userRoles.some((role) => allowedRoles.includes(role));

  if (!isAdmin) {
    return (
      <div className="text-center py-10 text-lg text-red-600">
        ❌ You do not have permission to view this page.
      </div>
    );
  }

  // ✅ Safe user fetch - only runs after auth is ready
  const fetchUsers = async () => {
    const res = await fetch('/api/users');
    if (!res.ok) throw new Error('Failed to fetch users');
    return res.json();
  };

  const { data: users, isLoading, error } = useQuery({
    queryKey: ['users'],
    queryFn: fetchUsers,
    enabled: !!user, // ✅ Don't trigger until auth hook resolves
  });

  if (isLoading) return <p className="text-center p-4">Loading users...</p>;
  if (error) return <p className="text-red-500 text-center p-4">Error: {error.message}</p>;

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">WordPress Users</h1>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 shadow-md">
          <thead className="bg-gray-100">
            <tr>
              <th className="border px-4 py-2 text-left">ID</th>
              <th className="border px-4 py-2 text-left">Username</th>
              <th className="border px-4 py-2 text-left">Website</th>
              <th className="border px-4 py-2 text-left">Date Joined</th>
              <th className="border px-4 py-2 text-left">Profile</th>
            </tr>
          </thead>
          <tbody>
            {users.length > 0 ? (
              users.map((user) => (
                <tr key={user.id} className="border-b">
                  <td className="border px-4 py-2">{user.id}</td>
                  <td className="border px-4 py-2">
                    <Link href={`/users/${user.slug}`} className="text-blue-500 underline">
                      {user.name}
                    </Link>
                  </td>
                  <td className="border px-4 py-2">
                    {user.url ? (
                      <a
                        href={user.url}
                        className="text-blue-500 underline"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {user.url}
                      </a>
                    ) : (
                      'N/A'
                    )}
                  </td>
                  <td className="border px-4 py-2">
                    {new Date(user.registered_date).toLocaleDateString()}
                  </td>
                  <td className="border px-4 py-2">
                    <Link href={`/users/${user.slug}`} className="text-blue-500 underline">
                      View Profile
                    </Link>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center p-4">
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
