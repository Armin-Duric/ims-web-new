import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const Blog = () => {
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState({ title: '', content: '', author: '', links: [] });
  const [editPost, setEditPost] = useState(null);
  const [editForm, setEditForm] = useState({ title: '', content: '', author: '', links: [] });
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('authToken'));
  const [loginVisible, setLoginVisible] = useState(false);
  const [newLink, setNewLink] = useState('');
  const [editLink, setEditLink] = useState('');
  const [error, setError] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch('/api');
        if (!res.ok) throw new Error('Failed to fetch posts');
        const data = await res.json();
        setPosts(data);
      } catch (err) {
        setError(err.message);
      }
    };
    fetchPosts();
    setLoginVisible(location.pathname === '/blog');
  }, [location]);

  const handleLogin = () => {
    const username = prompt('Enter username:');
    const password = prompt('Enter password:');
    if (username === 'admin' && password === 'password') {
      localStorage.setItem('authToken', 'dummyToken');
      setIsLoggedIn(true);
    } else {
      alert('Invalid credentials');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    setIsLoggedIn(false);
    setEditPost(null);
    setEditForm({ title: '', content: '', author: '', links: [] });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (editPost) {
      setEditForm({ ...editForm, [name]: value });
    } else {
      setNewPost({ ...newPost, [name]: value });
    }
  };

  const handleAddLink = (isEditMode) => {
    if (isEditMode && editLink.trim()) {
      setEditForm(prev => ({ ...prev, links: [...prev.links, editLink.trim()] }));
      setEditLink('');
    } else if (!isEditMode && newLink.trim()) {
      setNewPost(prev => ({ ...prev, links: [...prev.links, newLink.trim()] }));
      setNewLink('');
    }
  };

  const handleRemoveLink = (isEditMode, linkToRemove) => {
    if (isEditMode) {
      setEditForm(prev => ({
        ...prev,
        links: prev.links.filter(link => link !== linkToRemove),
      }));
    } else {
      setNewPost(prev => ({
        ...prev,
        links: prev.links.filter(link => link !== linkToRemove),
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = '/api';
      const body = JSON.stringify({
        ...newPost,
        date: new Date().toISOString(),
      });
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body,
      });
      if (!res.ok) throw new Error('Failed to create post');
      setNewPost({ title: '', content: '', author: '', links: [] });
      const fetchRes = await fetch('/api');
      if (!fetchRes.ok) throw new Error('Failed to fetch posts');
      const data = await fetchRes.json();
      setPosts(data);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleEdit = (post) => {
    setEditPost(post.id);
    setEditForm({ title: post.title, content: post.content, author: post.author, links: post.links || [] });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const url = `/api?id=${editPost}`;
      const res = await fetch(url, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editForm),
      });
      if (!res.ok) throw new Error('Failed to update post');
      setEditPost(null);
      setEditForm({ title: '', content: '', author: '', links: [] });
      const fetchRes = await fetch('/api');
      if (!fetchRes.ok) throw new Error('Failed to fetch posts');
      const data = await fetchRes.json();
      setPosts(data);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      try {
        const url = `/api?id=${id}`;
        const res = await fetch(url, { method: 'DELETE' });
        if (!res.ok) throw new Error('Failed to delete post');
        const fetchRes = await fetch('/api');
        if (!fetchRes.ok) throw new Error('Failed to fetch posts');
        const data = await fetchRes.json();
        setPosts(data);
      } catch (err) {
        setError(err.message);
      }
    }
  };

  return (
    <div
      className="py-5 gradient-bg"
      style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
    >
      <div className="container text-white">
        <div className="d-flex justify-content-end mb-4">
          {loginVisible && (
            <div>
              {isLoggedIn ? (
                <button
                  onClick={handleLogout}
                  className="btn btn-lg btn-primary animate__animated animate__pulse login-btn"
                  style={{ backgroundColor: '#00ffcc', color: '#1a3c5e', border: 'none' }}
                >
                  Logout
                </button>
              ) : (
                <button
                  onClick={handleLogin}
                  className="btn btn-lg btn-primary animate__animated animate__pulse login-btn"
                  style={{ backgroundColor: '#00ffcc', color: '#1a3c5e', border: 'none' }}
                >
                  Login
                </button>
              )}
            </div>
          )}
        </div>
        <h1 className="display-3 fw-bold mb-4 text-center">Blog</h1>
        {error && <p className="text-danger text-center">{error}</p>}
        <div className="mb-5">
          {isLoggedIn ? (
            <form onSubmit={handleSubmit} className="p-4 bg-dark rounded shadow-lg">
              <div className="mb-3">
                <input
                  type="text"
                  name="title"
                  className="form-control bg-transparent text-white border-secondary plholder"
                  placeholder="Title"
                  value={newPost.title}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <textarea
                  name="content"
                  className="form-control bg-transparent text-white border-secondary plholder"
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
                  className="form-control bg-transparent text-white border-secondary plholder"
                  placeholder="Author"
                  value={newPost.author}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label text-white">Add Link (e.g., to studies or related posts)</label>
                <div className="input-group">
                  <input
                    type="url"
                    className="form-control bg-transparent text-white border-secondary plholder"
                    placeholder="https://example.com"
                    value={newLink}
                    onChange={(e) => setNewLink(e.target.value)}
                  />
                  <button
                    type="button"
                    className="btn btn-primary"
                    style={{ backgroundColor: '#00ffcc', color: '#1a3c5e', border: 'none' }}
                    onClick={() => handleAddLink(false)}
                  >
                    Add
                  </button>
                </div>
                {newPost.links.length > 0 && (
                  <ul className="list-group mt-2">
                    {newPost.links.map((link, index) => (
                      <li key={index} className="list-group-item bg-dark text-white d-flex justify-content-between align-items-center">
                        <a href={link} target="_blank" rel="noopener noreferrer" className="text-white">{link}</a>
                        <button
                          type="button"
                          className="btn btn-sm btn-danger"
                          onClick={() => handleRemoveLink(false, link)}
                        >
                          Remove
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              <button
                type="submit"
                className="btn btn-lg btn-primary animate__animated animate__pulse"
                style={{ backgroundColor: '#00ffcc', color: '#1a3c5e', border: 'none' }}
              >
                Add Post
              </button>
            </form>
          ) : (
            <p className="text-center">Please log in to add a new post.</p>
          )}
        </div>
        <div>
          <h3 className="mb-3 text-center">Posts</h3>
          {posts.map((post) => (
            <div key={post.id} className="p-3 mb-3 bg-dark rounded shadow-sm">
              <h4>{post.title}</h4>
              <p>{post.content}</p>
              <small>By {post.author} on {new Date(post.date).toLocaleDateString()}</small>
              {isLoggedIn && (
                <div className="mt-2">
                  <button
                    onClick={() => handleEdit(post)}
                    className="btn btn-sm btn-primary me-2 animate__animated animate__pulse"
                    style={{ backgroundColor: '#00ffcc', color: '#1a3c5e', border: 'none' }}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(post.id)}
                    className="btn btn-sm btn-danger animate__animated animate__pulse"
                    style={{ backgroundColor: '#ff4444', border: 'none' }}
                  >
                    Delete
                  </button>
                </div>
              )}
              {editPost === post.id && (
                <form onSubmit={handleUpdate} className="mt-3 p-3 bg-dark rounded shadow-sm">
                  <div className="mb-3">
                    <input
                      type="text"
                      name="title"
                      className="form-control bg-transparent text-white border-secondary plholder"
                      placeholder="Title"
                      value={editForm.title}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <textarea
                      name="content"
                      className="form-control bg-transparent text-white border-secondary plholder"
                      placeholder="Content"
                      rows="3"
                      value={editForm.content}
                      onChange={handleChange}
                      required
                    ></textarea>
                  </div>
                  <div className="mb-3">
                    <input
                      type="text"
                      name="author"
                      className="form-control bg-transparent text-white border-secondary plholder"
                      placeholder="Author"
                      value={editForm.author}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label text-white">Add Link (e.g., to studies or related posts)</label>
                    <div className="input-group">
                      <input
                        type="url"
                        className="form-control bg-transparent text-white border-secondary plholder"
                        placeholder="https://example.com"
                        value={editLink}
                        onChange={(e) => setEditLink(e.target.value)}
                      />
                      <button
                        type="button"
                        className="btn btn-primary"
                        style={{ backgroundColor: '#00ffcc', color: '#1a3c5e', border: 'none' }}
                        onClick={() => handleAddLink(true)}
                      >
                        Add
                      </button>
                    </div>
                    {editForm.links.length > 0 && (
                      <ul className="list-group mt-2">
                        {editForm.links.map((link, index) => (
                          <li key={index} className="list-group-item bg-dark text-white d-flex justify-content-between align-items-center">
                            <a href={link} target="_blank" rel="noopener noreferrer" className="text-white">{link}</a>
                            <button
                              type="button"
                              className="btn btn-sm btn-danger"
                              onClick={() => handleRemoveLink(true, link)}
                            >
                              Remove
                            </button>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                  <button
                    type="submit"
                    className="btn btn-lg btn-primary animate__animated animate__pulse"
                    style={{ backgroundColor: '#00ffcc', color: '#1a3c5e', border: 'none' }}
                  >
                    Update Post
                  </button>
                  <button
                    type="button"
                    onClick={() => setEditPost(null)}
                    className="btn btn-sm btn-secondary ms-2 animate__animated animate__pulse"
                    style={{ backgroundColor: '#6c757d', border: 'none' }}
                  >
                    Cancel
                  </button>
                </form>
              )}
              {post.links && post.links.length > 0 && (
                <div className="mt-3">
                  <h5 className="mb-2">Related Links:</h5>
                  <ul className="list-unstyled">
                    {post.links.map((link, index) => (
                      <li key={index}>
                        <a href={link} target="_blank" rel="noopener noreferrer" className="text-white">
                          {link}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Blog;