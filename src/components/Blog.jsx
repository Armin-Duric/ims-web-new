import React, { useState, useEffect } from 'react'; 

const Blog = () => {
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState({ title: '', content: '', author: '' });

  useEffect(() => {
    fetch('/api/blog')
      .then((res) => res.json())
      .then((data) => setPosts(data));
  }, []);

  const handleChange = (e) => {
    setNewPost({ ...newPost, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch('/api/blog', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newPost),
    });
    setNewPost({ title: '', content: '', author: '' });
    fetch('/api/blog')
      .then((res) => res.json())
      .then((data) => setPosts(data));
  };

  return (
    <div
      className="py-5 gradient-bg"
      style={{minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
    >
      <div className="container text-white">
        <h1 className="display-3 fw-bold mb-4 text-center">
          Blog
        </h1>
        <div className="mb-5">
          <h3 className="mb-3">Add New Post</h3>
          <form onSubmit={handleSubmit} className="p-4 bg-dark rounded shadow-lg">
            <div className="mb-3">
              <input
                type="text"
                name="title"
                className="form-control bg-transparent text-white border-secondary"
                placeholder="Title"
                value={newPost.title}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <textarea
                name="content"
                className="form-control bg-transparent text-white border-secondary"
                placeholder="Content"
                rows="3"
                value={newPost.content}
                onChange={handleChange}
                required
              ></textarea>
            </div>
            <div className="mb-3">
              <input
                type="text"
                name="author"
                className="form-control bg-transparent text-white border-secondary"
                placeholder="Author"
                value={newPost.author}
                onChange={handleChange}
                required
              />
            </div>
            <button
              type="submit"
              className="btn btn-lg btn-primary animate__animated animate__pulse"
              style={{ backgroundColor: '#00ffcc', color: '#1a3c5e', border: 'none' }}
            >
              Add Post
            </button>
          </form>
        </div>
        <div>
          <h3 className="mb-3">Posts</h3>
          {posts.map((post) => (
            <div key={post.id} className="p-3 mb-3 bg-dark rounded shadow-sm">
              <h4>{post.title}</h4>
              <p>{post.content}</p>
              <small>By {post.author} on {new Date(post.date).toLocaleDateString()}</small>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Blog;