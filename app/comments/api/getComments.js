// GET /comments?post=POST_ID&_embed for avatars
export async function getComments(postId) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_PROD}/wp/v2/comments?post=${postId}&_embed`);
  return res.json();
}
