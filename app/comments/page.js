'use client';

import { useEffect, useState } from 'react';
import { getComments } from './api/getComments';
import CommentItem from './components/commentItem';

export default function CommentsHubPage() {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadAllComments = async () => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_PROD}/wp/v2/comments?_embed`);
      const data = await res.json();
      setComments(data);
      setLoading(false);
    };
    loadAllComments();
  }, []);

  if (loading) return <div className="p-8">Loading all comments...</div>;

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">🗂 All WordPress Comments</h1>

      {comments.length === 0 ? (
        <p>No comments found.</p>
      ) : (
        <div className="space-y-4">
          {comments.map(comment => (
            <CommentItem
              key={comment.id}
              comment={comment}
              allComments={comments}
              postId={comment.post} // this lets replies work
            />
          ))}
        </div>
      )}
    </div>
  );
}
