'use client';
import { useEffect, useState } from 'react';
import PostListItem from './PostListItem';

export default function PostList({ meta, onSelect, selectedId }) {
  const [posts, setPosts] = useState([]);
  const [source, setSource] = useState('wp');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); // ✅ added this

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    setError(null); // ✅ now this won't throw
    console.log('[PostList] Fetching with meta:', meta);

    meta
      .fetchAll()
      .then((res) => {
        if (!mounted) return;
        const items = res?.data || res || [];
        setPosts(items);
        setSource(res.source || 'wp');
        console.log('[PostList] Posts loaded:', items.length);
      })
      .catch((err) => {
        if (!mounted) return;
        console.error('[PostList] Failed to fetch:', err);
        setError('Failed to load posts.');
      })
      .finally(() => mounted && setLoading(false));

    return () => {
      mounted = false;
    };
  }, [meta]);

  if (loading) return <p className="p-4 text-gray-500">Loading posts…</p>;
  if (error) return <p className="p-4 text-red-500">{error}</p>;
  if (posts.length === 0) return <p className="p-4 text-gray-500">No posts found.</p>;

  return (
    <ul>
      {posts.map((post) => (
        <PostListItem
          key={post.id}
          post={post}
          listType={meta.listType}
          isSelected={selectedId === post.id}
          onClick={() => onSelect({ id: post.id, source })}
        />
      ))}
    </ul>
  );
}
