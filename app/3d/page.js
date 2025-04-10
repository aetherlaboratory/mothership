import React from "react";
import Link from "next/link";

const ART3D_API_URL = "https://mothership.wordifysites.com/wp-json/wp/v2/3darts?_embed";

// Function to fetch posts
async function getPosts() {
  try {
    const res = await fetch(ART3D_API_URL, { cache: "no-store" });
    return await res.json();
  } catch (error) {
    console.error("Error fetching posts:", error);
    return [];
  }
}

export default async function Art3DPage() {
  const posts = await getPosts();

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Page Title */}
      <h1 className="text-3xl font-bold text-center my-6">3D Models</h1>

      {/* Blog Posts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.length > 0 ? (
          posts.map((post) => (
            <div key={post.id} className="bg-white rounded-lg shadow-md p-4">
              {/* Featured Image (or Default) */}
              <img
                src={post._embedded?.["wp:featuredmedia"]?.[0]?.source_url || "https://fakeimg.pl/600x400/cccccc/a8a8a8?font=lobster"}
                alt={post.title.rendered}
                className="w-full h-48 object-cover rounded-md"
              />

              {/* Post Title */}
              <h2 className="text-xl font-semibold mt-4" dangerouslySetInnerHTML={{ __html: post.title.rendered }} />

              {/* Post Excerpt */}
              <div className="text-gray-600 mt-2" dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }} />

              {/* Read More Link */}
              <Link href={`/3d/${post.slug}`} className="text-blue-500 font-medium mt-2 inline-block">
                Read More
              </Link>
            </div>
          ))
        ) : (
          <p className="col-span-3 text-center text-gray-500">No 3D models found.</p>
        )}
      </div>
    </div>
  );
}
