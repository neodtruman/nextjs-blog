import NewPostForm from "../../components/posts/new-post-form";
import { adminGuard } from "../../utils/authen-guard";

export default function CreatePostPage() {
  return (
    <NewPostForm />
  );
}

export async function getServerSideProps(context) {
  const result = await adminGuard(context);
  return result;
}
