import Link from "next/link";
import { Fragment } from "react";
import path from 'path';
import fs from 'fs';

export default function AllPostsPage(props) {
  const { posts } = props;
  return (
    <Fragment>
      <h1>All Posts</h1>
      <ul>
        {posts && posts.map(post =>
          <li key={post.id}>
            <Link href={`/posts/${post.id}`}>
              <a>{post.title}</a>
            </Link>
          </li>
        )}
      </ul>
    </Fragment>
  );
}

export function getStaticProps() {
  let now = new Date();
  console.log("getStaticProps was called at ", now.toString());

  const filePath = path.join(process.cwd(), 'public', 'posts.json');
  const jsonData = fs.readFileSync(filePath);
  const data = JSON.parse(jsonData);

  return {
    props: {
      posts: data.posts
    },
    revalidate: 20
  }
}
