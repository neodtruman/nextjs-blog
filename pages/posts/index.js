import { Fragment, useEffect, useState } from "react";

export default function AllPostsPage() {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    fetch('/posts.json')
      .then(response => response.json())
      .then(data => {
        setPosts(data.posts);
        setIsLoading(false);
      })
  }, []);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <Fragment>
      <h1>All Posts</h1>
      <ul>
        {posts.map(post =>
          <li key={post.id}>{post.title}</li>
        )}
      </ul>
    </Fragment>
  );
}
