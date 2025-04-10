"use client";

import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";

export default function UserProfile() {
  const params = useParams(); // ✅ Correct way to access params in Next.js 14+
  const slug = params?.slug; // Ensure it's available

  const { data: user, error, isLoading } = useQuery({
    queryKey: ["user", slug],
    queryFn: async () => {
      const res = await fetch(`/api/users/${slug}`);
      if (!res.ok) throw new Error("Failed to fetch user");
      return res.json();
    },
    enabled: !!slug, // ✅ Only fetch when slug is available
  });

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading user: {error.message}</p>;

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">
      <h1 className="text-3xl font-bold">{user.name}</h1>
      <p className="text-gray-600">
        Joined: {new Date(user.registered_date).toDateString()}
      </p>
      <p className="mt-4">{user.description || "No bio available."}</p>
      <a
        href={user.website}
        target="_blank"
        className="text-blue-500 hover:underline block mt-4"
      >
        Visit Website
      </a>
    </div>
  );
}
