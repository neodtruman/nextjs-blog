import { getSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useEffect, useState } from "react";
import NewPostForm from "../../components/posts/new-post-form";

export default function CreatePostPage() {
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    getSession().then(session => {
      if (!session) {
        router.replace('/user/login');
      }
      else {
        setIsLoading(false);
      }
    });
  }, [router]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <NewPostForm />
  );
}
