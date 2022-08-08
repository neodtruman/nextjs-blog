import { Fragment, useRef, useState } from "react";

function NewPostForm() {
  const [slugLabel, setSlugLabel] = useState('<slug>');
  const slugInputRef = useRef();
  const titleInputRef = useRef();
  const thumbnailInputRef = useRef();
  const excerptInputRef = useRef();
  const contentInputRef = useRef();

  function updatePostUrl() {
    setSlugLabel(slugInputRef.current.value);
  }

  function submitPost(event) {
    event.preventDefault();

    const formData = {
      slug: slugInputRef.current.value,
      title: titleInputRef.current.value,
      thumb: thumbnailInputRef.current.value,
      excerpt: excerptInputRef.current.value,
      content: contentInputRef.current.value,
    };

    fetch('/api/posts', {
      method: "POST",
      body: JSON.stringify(formData),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => response.json())
      .then(data => console.log(data));
  }

  return (
    <Fragment>
      <h1>Create New Post</h1>
      <form onSubmit={submitPost}>
        <div className="row">
          <div className="col-label">
            <label htmlFor="slug">Slug</label>
          </div>
          <div className="col-input">
            <input type="text"
              id="slug"
              name="slug"
              onChange={updatePostUrl}
              ref={slugInputRef} />
            <div>Post&apos;s url: /posts/{slugLabel}</div>
          </div>
        </div>
        <div className="row">
          <div className="col-label">
            <label htmlFor="title">Title</label>
          </div>
          <div className="col-input">
            <input type="text"
              id="title"
              name="title"
              ref={titleInputRef} />
          </div>
        </div>
        <div className="row">
          <div className="col-label">
            <label htmlFor="thumb">Thumbnail</label>
          </div>
          <div className="col-input">
            <input type="text"
              id="thumb"
              name="thumb"
              ref={thumbnailInputRef} />
          </div>
        </div>
        <div className="row">
          <div className="col-label">
            <label htmlFor="excerpt">Excerpt</label>
          </div>
          <div className="col-input">
            <textarea id="excerpt"
              name="excerpt"
              rows="2"
              ref={excerptInputRef}></textarea>
          </div>
        </div>
        <div className="row">
          <div className="col-label">
            <label htmlFor="content">Content</label>
          </div>
          <div className="col-input">
            <textarea id="content"
              name="content"
              rows="8"
              ref={contentInputRef}></textarea>
          </div>
        </div>
        <input type="submit" value="Submit" />
      </form>
    </Fragment>
  );
}

export default NewPostForm;
