export async function updateComment(id, content, token) {
  return await fetch(`${process.env.NEXT_PUBLIC_API_PROD}/wp/v2/comments/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({ content })
  }).then(res => res.json());
}
