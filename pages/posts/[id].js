import { useRouter } from "next/router";

export default function PostDetailPage() {
  const router = useRouter();
  const postId = router.query.id;

  return (
    <h1>Detail Page - Post {postId}</h1>
  );
}
