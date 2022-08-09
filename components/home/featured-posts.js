import { Fragment } from 'react';
import PostsGrid from '../posts/posts-grid';

function FeaturedPosts(props) {
  return (
    <Fragment>
      <h1>Home Page</h1>
      <PostsGrid posts={props.posts} />
    </Fragment>
  );
}
export default FeaturedPosts;
