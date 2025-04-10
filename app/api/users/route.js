import { NextResponse } from "next/server";

export async function GET() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_WP}/wp/v2/users`);
    if (!res.ok) throw new Error("Failed to fetch users");

    const users = await res.json();

    // Ensure we include the `slug` field
    const formattedUsers = users.map(user => ({
      id: user.id,
      name: user.name,
      slug: user.slug, // Ensure slug is included
      url: user.link,
      description: user.description || "",
      website: user.url || "",
      registered_date: user.registered_date || "",
    }));

    return NextResponse.json(formattedUsers);
  } catch (error) {
    console.error("❌ API Users Fetch Error:", error);
    return NextResponse.json({ error: "Failed to fetch users" }, { status: 500 });
  }
}