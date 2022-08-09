
import { getFeaturedPosts } from '../utils/posts-util';
import FeaturedPosts from "../components/home/featured-posts";

export default function Home(props) {
  return (
    <FeaturedPosts posts={props.posts} />
  )
}

export function getStaticProps() {
  const featuredPosts = getFeaturedPosts();
  return {
    props: {
      posts: featuredPosts
    },
    revalidate: 3600
  }
}
