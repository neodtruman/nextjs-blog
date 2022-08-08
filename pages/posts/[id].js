import { useState, useEffect } from "react";
import { useRouter } from "next/router";

export default function PostDetailPage() {
  const [post, setPost] = useState(null);
  const router = useRouter();
  const postId = router.query.id;

  useEffect(() => {
    fetch(`/api/posts/${postId}`)
      .then(response => response.json())
      .then(data => setPost(data.post))
  }, [postId]);

  if (!post) {
    return <p>Loading...</p>;
  }

  return (
    <h1>Detail Page - {post.title}</h1>
  );
}
