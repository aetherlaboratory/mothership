import React from "react";
import Link from "next/link";

const BlogPost = ({ post }) => {
  // Default image URL
  const defaultImage = "https://fakeimg.pl/600x400/cccccc/a8a8a8?font=lobster";

  // Get post thumbnail or default image
  const imageUrl =
    post._embedded?.["wp:featuredmedia"]?.[0]?.source_url || defaultImage;

  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      {/* Thumbnail (or default image) */}
      <img
        src={imageUrl}
        alt={post.title.rendered}
        className="w-full h-48 object-cover rounded-md"
      />
      
      {/* Title */}
      <h2
        className="text-xl font-semibold mt-4"
        dangerouslySetInnerHTML={{ __html: post.title.rendered }}
      />
      
      {/* Excerpt */}
      <div
        className="text-gray-600 mt-2"
        dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }}
      />
      
      {/* Read More Button */}
      <Link href={`/blog/${post.slug}`}>
        <span className="text-blue-500 font-medium mt-2 inline-block">
          Read More
        </span>
      </Link>
    </div>
  );
};

export default BlogPost;
