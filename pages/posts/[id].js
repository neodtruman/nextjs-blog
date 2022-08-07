import path from 'path';
import fs from 'fs/promises';

export default function PostDetailPage(props) {
  const { post } = props;
  if (!post) {
    return <p>Loading...</p>;
  }

  return (
    <h1>Detail Page - {post.title}</h1>
  );
}

export async function getStaticProps(context) {
  const postId = context.params.id;

  const filePath = path.join(process.cwd(), 'public', 'posts.json');
  const jsonData = await fs.readFile(filePath);
  const data = JSON.parse(jsonData);

  const post = data.posts.find(p => p.id === postId);
  return {
    props: {
      post
    }
  }
}

export async function getStaticPaths() {
  return {
    paths: [
      { params: { id: '1' } },
      { params: { id: '3' } }
    ],
    fallback: true
  }
}
