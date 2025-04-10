import { NextResponse } from "next/server";

export async function GET(req, context) {
  const { params } = context;
  if (!params || !params.slug) {
    return NextResponse.json({ error: "Missing user slug" }, { status: 400 });
  }

  const slug = params.slug;
  console.log("Fetching user with slug:", slug);

  try {
    const apiUrl = `${process.env.NEXT_PUBLIC_API_WP}/wp/v2/users?per_page=100`;
    console.log("Fetching from:", apiUrl);

    const res = await fetch(apiUrl);

    if (!res.ok) {
      console.error("❌ API Error:", res.status, res.statusText);
      return NextResponse.json(
        { error: `Users not found (Status ${res.status})` },
        { status: res.status }
      );
    }

    const users = await res.json();
    const user = users.find((u) => u.slug === slug || u.user_nicename === slug);

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    console.log("✅ User fetched:", user);

    return NextResponse.json({
      id: user.id,
      name: user.name,
      slug: user.slug || user.user_nicename,
      url: user.link,
      description: user.description || "No bio available.",
      website: user.url || "No website listed.",
      registered_date: user.registered_date || "Unknown",
    });
  } catch (error) {
    console.error("❌ API User Fetch Error:", error);
    return NextResponse.json({ error: "Failed to fetch user" }, { status: 500 });
  }
}
