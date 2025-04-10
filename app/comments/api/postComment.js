export async function postComment({ postId, content, parentId = 0, token }) {
  return await fetch(`${process.env.NEXT_PUBLIC_API_PROD}/wp/v2/comments`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({
      post: postId,
      content,
      parent: parentId
    })
  }).then(res => res.json());
}
