import React from "react";
import { notFound } from "next/navigation";

// ✅ Use environment variable for API URL
const BLOG_API_URL = `${process.env.NEXT_PUBLIC_API_WP}/wp/v2/posts`;

// ✅ Fetch post inside a helper function
async function getPost(slug) {
  if (!slug) return null;

  try {
    const res = await fetch(`${BLOG_API_URL}?slug=${slug}&_embed`, { cache: "no-store" });
    const data = await res.json();

    if (!data || data.length === 0) {
      return null; // ✅ Return null if post not found
    }

    return data[0]; // ✅ Return first post (WordPress API returns an array)
  } catch (error) {
    console.error("Error fetching post:", error);
    return null;
  }
}

// ✅ Fix: Await `params` inside `generateMetadata()`
export async function generateMetadata({ params: paramsPromise }) {
  const params = await paramsPromise; // ✅ Await params before using it
  return {
    title: `Blog Post - ${params.slug}`,
    description: "Read our latest blog post.",
  };
}

// ✅ Fix: Await `params` in the main component
export default async function BlogPostPage({ params: paramsPromise }) {
  const params = await paramsPromise; // ✅ Await params before using it
  const { slug } = params;

  if (!slug) {
    return notFound(); // ✅ Redirect to Next.js 404 page if slug is missing
  }

  const post = await getPost(slug);

  if (!post) {
    return notFound(); // ✅ Properly show 404 page if post doesn't exist
  }

  const defaultImage = "https://fakeimg.pl/600x400/cccccc/a8a8a8?font=lobster";
  const imageUrl = post._embedded?.["wp:featuredmedia"]?.[0]?.source_url || defaultImage;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Featured Image */}
      <img src={imageUrl} alt={post.title.rendered} className="w-full h-64 object-cover rounded-md" />

      {/* Post Title */}
      <h1 className="text-4xl font-bold mt-4" dangerouslySetInnerHTML={{ __html: post.title.rendered }} />

      {/* Post Content */}
      <div className="mt-4 text-lg leading-relaxed" dangerouslySetInnerHTML={{ __html: post.content.rendered }} />
    </div>
  );
}

// ✅ Fix: Define valid blog post paths before rendering the page
export async function generateStaticParams() {
  try {
    const res = await fetch(`${BLOG_API_URL}?per_page=10&_fields=slug`);
    const posts = await res.json();

    return posts.map((post) => ({
      slug: post.slug,
    }));
  } catch (error) {
    console.error("Error fetching static params:", error);
    return [];
  }
}
