"use client";
import React from "react";
import Link from "next/link";

export default function PostCard({ post, layout = "grid" }) {
  const image =
    post._embedded?.["wp:featuredmedia"]?.[0]?.source_url ||
    "https://fakeimg.pl/600x400/cccccc/a8a8a8?font=lobster";

  const fullExcerpt = post.excerpt.rendered.replace(/<[^>]+>/g, ""); // strip HTML
  const shortExcerpt =
    fullExcerpt.split(" ").slice(0, 10).join(" ") + (fullExcerpt.split(" ").length > 10 ? "..." : "");

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <img
        src={image}
        alt={post.title.rendered}
        className="w-full h-auto rounded-md object-contain"
      />
      <div className="p-4">
        <h2
          className="text-xl font-semibold"
          dangerouslySetInnerHTML={{ __html: post.title.rendered }}
        />
        <div className="text-gray-600 mt-2">
          {layout === "masonry" ? shortExcerpt : (
            <span dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }} />
          )}
        </div>
        <Link
          href={`/blog/${post.slug}`}
          className="text-blue-500 font-medium mt-2 inline-block"
        >
          Read More →
        </Link>
      </div>
    </div>
  );
}
