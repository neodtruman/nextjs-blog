import { getSession } from 'next-auth/react';
import NewPostForm from "../../components/posts/new-post-form";

export default function CreatePostPage() {
  return (
    <NewPostForm />
  );
}

export async function getServerSideProps(context) {
  const session = await getSession({ req: context.req });
  if (!session) {
    return {
      redirect: {
        destination: '/user/login',
        permanent: true
      }
    }
  }

  return {
    props: {}
  }
}
