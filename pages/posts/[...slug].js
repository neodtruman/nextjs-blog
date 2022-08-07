import { useRouter } from "next/router";

export default function AnotherPostDetailPage() {
  const router = useRouter();
  console.log(router.query);

  const postDate = router.query.slug?.join('/');

  return (
    <h1>Another Detail Page - Post {postDate}</h1>
  );
}
