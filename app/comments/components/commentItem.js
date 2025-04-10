'use client';

import { useState, useEffect } from "react";
import CommentForm from "./commentForm";
import { getComments } from "../api/getComments";

export default function CommentItem({ comment, postId, allComments }) {
  const [showReply, setShowReply] = useState(false);
  const [replies, setReplies] = useState([]);

  useEffect(() => {
    // Load nested replies from allComments or fetch manually
    const nested = allComments?.filter(c => c.parent === comment.id) || [];
    setReplies(nested);
  }, [allComments, comment.id]);

  return (
    <div className="border p-4 rounded-md">
      <div className="text-sm font-semibold">{comment.author_name}</div>
      <div className="text-xs text-gray-500 mb-2">{new Date(comment.date).toLocaleString()}</div>
      <div className="text-base" dangerouslySetInnerHTML={{ __html: comment.content.rendered }} />

      <button
        onClick={() => setShowReply(prev => !prev)}
        className="text-blue-500 text-xs mt-2"
      >
        {showReply ? "Cancel" : "Reply"}
      </button>

      {showReply && (
        <div className="mt-3 pl-4 border-l">
          <CommentForm postId={postId} parentId={comment.id} onSuccess={() => setShowReply(false)} />
        </div>
      )}

      {replies.length > 0 && (
        <div className="mt-4 pl-4 border-l space-y-4">
          {replies.map(reply => (
            <CommentItem key={reply.id} comment={reply} allComments={allComments} postId={postId} />
          ))}
        </div>
      )}
    </div>
  );
}
