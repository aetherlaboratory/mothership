"use client";
import React, { useState, useEffect } from "react";
import LayoutSwitcher from "../components/LayoutSwitcher";
import BlogGrid from "../components/BlogGrid";

// Blog API URL
const BLOG_API_URL = "https://mothership.wordifysites.com/wp-json/wp/v2/posts?_embed";

export default function BlogPage() {
  const [posts, setPosts] = useState([]);
  const [layout, setLayout] = useState("grid");

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch(BLOG_API_URL, { cache: "no-store" });
        const data = await res.json();
        setPosts(data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center my-6">Blog Posts</h1>

      <LayoutSwitcher currentLayout={layout} onChange={setLayout} />

      <BlogGrid posts={posts} layout={layout} />
    </div>
  );
}
