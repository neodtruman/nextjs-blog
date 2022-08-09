import { Fragment } from 'react';
import PostGrid from './posts-grid';

function AllPosts(props) {
  return (
    <Fragment>
      <h1>All Posts</h1>
      <PostGrid posts={props.posts} />
    </Fragment>
  );
}
export default AllPosts;
