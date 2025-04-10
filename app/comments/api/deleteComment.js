export async function deleteComment(id, token) {
  return await fetch(`${process.env.NEXT_PUBLIC_API_PROD}/wp/v2/comments/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`
    }
  }).then(res => res.json());
}
