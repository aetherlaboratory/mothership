"use client";
import React from "react";
import PostCard from "./PostCard";
import clsx from "clsx";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";


export default function BlogGrid({ posts, layout = "grid" }) {



    if (layout === "hero") {
        return (
          <div className="space-y-8">
            {posts.map((post, index) => {
              const image =
                post._embedded?.["wp:featuredmedia"]?.[0]?.source_url ||
                "https://fakeimg.pl/1200x600/cccccc/a8a8a8?font=lobster";
      
              const isEven = index % 2 === 0;
      
              return (
                <div
                  key={post.id}
                  className="relative w-full h-96 rounded-xl overflow-hidden shadow-lg"
                  style={{
                    backgroundImage: `url(${image})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                >
                  {/* Overlay */}
                  <div
                    className={clsx(
                      "absolute inset-0 bg-black/50 backdrop-blur-sm flex",
                      isEven ? "items-end justify-start text-left" : "items-end justify-end text-right"
                    )}
                  >
                    <div className="p-6 text-white max-w-2xl">
                      <h2
                        className="text-3xl font-bold drop-shadow"
                        dangerouslySetInnerHTML={{ __html: post.title.rendered }}
                      />
                      <div
                        className="mt-2 text-sm md:text-base text-gray-200 drop-shadow"
                        dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }}
                      />
                      <a
                        href={`/blog/${post.slug}`}
                        className="inline-block mt-4 text-sm bg-white text-black px-4 py-2 rounded shadow hover:bg-gray-200"
                      >
                        Read More →
                      </a>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        );
      }
      if (layout === "masonry") {
        return (
          <div className="px-2">
            <ResponsiveMasonry
              columnsCountBreakPoints={{ 350: 1, 750: 2, 1024: 3 }}
            >
          <Masonry gutter="12px">
  {posts.map((post) => (
    <PostCard key={post.id} post={post} layout="masonry" />
  ))}
</Masonry>

            </ResponsiveMasonry>
          </div>
        );
      }
      

    
  if (layout === "list") {
    return (
      <div className="space-y-4">
        {posts.length > 0 ? (
          posts.map((post) => (
            <div
              key={post.id}
              className="flex flex-col md:flex-row bg-white shadow-md rounded-lg overflow-hidden"
            >
              {/* Column 1: Image */}
              <img
                src={
                  post._embedded?.["wp:featuredmedia"]?.[0]?.source_url ||
                  "https://fakeimg.pl/200x150/cccccc/a8a8a8?font=lobster"
                }
                alt={post.title.rendered}
                className="w-full md:w-48 h-48 object-cover"
              />

              {/* Column 2: Text Content */}
              <div className="flex-1 p-4">
                <h2
                  className="text-lg font-semibold"
                  dangerouslySetInnerHTML={{ __html: post.title.rendered }}
                />
                <div
                  className="text-sm text-gray-600 mt-1"
                  dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }}
                />
              </div>

              {/* Column 3: Read More */}
              <div className="flex items-center justify-center p-4">
                <a
                  href={`/blog/${post.slug}`}
                  className="text-blue-500 hover:underline font-medium"
                >
                  Read More →
                </a>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">No posts found.</p>
        )}
      </div>
    );
  }

  // Default: Grid layout
  const layoutClasses = clsx({
    "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6": layout === "grid",
  });

  return (
    <div className={layoutClasses}>
      {posts.length > 0 ? (
        posts.map((post) => <PostCard key={post.id} post={post} />)
      ) : (
        <p className="col-span-3 text-center text-gray-500">No posts found.</p>
      )}
    </div>
  );
}
