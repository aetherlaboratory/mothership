'use client';

import { useState } from "react";
import { useSession } from "next-auth/react";
import { postComment } from "../api/postComment";

export default function CommentForm({ postId, parentId = 0, onSuccess }) {
  const { data: session } = useSession();
  const [content, setContent] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  if (!session) return <div className="text-sm text-gray-600">Log in to comment.</div>;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");

    try {
      const res = await postComment({
        postId,
        parentId,
        content,
        token: session.user.token,
      });

      if (res.id) {
        setContent("");
        onSuccess?.(); // refetch or close reply form
      } else {
        throw new Error(res.message || "Failed to post comment");
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-2">
      <textarea
        className="w-full p-2 border rounded-md text-sm"
        rows={3}
        placeholder="Write your comment..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
        required
      />
      {error && <div className="text-red-500 text-xs">{error}</div>}
      <button
        type="submit"
        disabled={submitting}
        className="bg-blue-600 text-white px-4 py-1 rounded text-sm"
      >
        {submitting ? "Posting..." : "Post Comment"}
      </button>
    </form>
  );
}
