
import { Fragment } from "react";
import Head from "next/head";

import { getPostData, getPostsFiles } from '../../utils/posts-util';
import PostDetail from "../../components/posts/post-detail";

export default function PostDetailPage(props) {
  const { post } = props;
  if (!post) {
    return <p>Loading...</p>
  }

  return (
    <Fragment>
      <Head>
        <title>{post.title}</title>
      </Head>
      <PostDetail post={post} />
    </Fragment>
  );
}

export function getStaticProps(context) {
  const { id } = context.params;

  const postData = getPostData(id);
  return {
    props: {
      post: postData
    },
    revalidate: 600
  }
}

export function getStaticPaths() {
  const postFilenames = getPostsFiles();

  const slugs = postFilenames.map(fileName => fileName.replace(/\.md$/, ''));

  return {
    paths: slugs.map(slug => ({ params: { id: slug } })),
    fallback: true
  };
}
