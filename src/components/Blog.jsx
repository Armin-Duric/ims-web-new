// src/components/Blog.jsx
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import ReactQuill, { Quill } from 'react-quill-new';
import BlotFormatter from 'quill-blot-formatter';
import Modal from 'react-bootstrap/Modal';
import 'react-quill-new/dist/quill.snow.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../blog-custom.css';

Quill.register('modules/blotFormatter', BlotFormatter);
BlotFormatter.whitelist = false;

const Blog = () => {
  const [posts, setPosts] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [editingPost, setEditingPost] = useState(null);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [selectedPost, setSelectedPost] = useState(null);
  const loginAttempted = useRef(false);

  const location = useLocation();
  const navigate = useNavigate();

  const ADMIN_USER = import.meta.env.VITE_ADMIN_USERNAME || 'admin';
  const ADMIN_PASS = import.meta.env.VITE_ADMIN_PASSWORD || 'password';
  const TOKEN_SECRET = import.meta.env.VITE_AUTH_TOKEN_SECRET || 'fallback-secret-2025';

  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, false] }],
      ['bold', 'italic', 'underline'],
      [{ color: [] }, { background: [] }],
      [{ list: 'ordered' }, { list: 'bullet' }],
      [{ 'align': [] }], // Added text alignment
      ['link', 'image'],
      ['clean'],
    ],
    blotFormatter: {}
  };

  const observer = useRef();

  const lastPostRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPage(prev => prev + 1);
        }
      });

      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );

  // Auth check from localStorage
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (!token) return setIsLoggedIn(false);

    try {
      const decoded = atob(token).split(':');
      if (decoded[0] === ADMIN_USER && decoded[1] === ADMIN_PASS && decoded[3] === TOKEN_SECRET) {
        setIsLoggedIn(true);
      } else {
        localStorage.removeItem('authToken');
      }
    } catch {
      localStorage.removeItem('authToken');
    }
  }, [ADMIN_USER, ADMIN_PASS, TOKEN_SECRET]);

  // Trigger login prompt on /admin-login (exact or subpath)
    useEffect(() => {
      const path = location.pathname.toLowerCase();
      if ((path === '/admin-login' || path.endsWith('/admin-login')) && !isLoggedIn && !loginAttempted.current) {
        loginAttempted.current = true; // Mark as attempted immediately

        const u = prompt('Username:')?.trim() || '';
        const p = prompt('Password:')?.trim() || '';

        if (u === ADMIN_USER && p === ADMIN_PASS) {
          const token = btoa(`${u}:${p}:${Date.now()}:${TOKEN_SECRET}`);
          localStorage.setItem('authToken', token);
          setIsLoggedIn(true);
          alert('Welcome back, Admin!');
          navigate('/blog');
        } else if (u || p) {
          alert('Wrong credentials');
          navigate('/blog');
        }
        // No need to reset ref — it persists across renders
      } else if (isLoggedIn && (path === '/admin-login' || path.endsWith('/admin-login'))) {
        navigate('/blog'); // Redirect logged-in users away from login page
      }
    }, [location.pathname, isLoggedIn, navigate, ADMIN_USER, ADMIN_PASS, TOKEN_SECRET]);

  // Fetch posts
  useEffect(() => {
    if (!hasMore && page !== 1) return;
    setLoading(true);

    fetch(`/api/blog?page=${page}&limit=6`)
      .then(r => r.json())
      .then(data => {
        if (data.posts) {
          setPosts(prev => [...prev, ...data.posts]);
          setHasMore(data.pagination?.hasNext || false);
        }
        setLoading(false);
      })
      .catch(() => {
        setHasMore(false);
        setLoading(false);
      });
  }, [page]);

  // Reset on login/logout
  useEffect(() => {
    setPosts([]);
    setPage(1);
    setHasMore(true);
  }, [isLoggedIn]);

  // Form sync for editing
  useEffect(() => {
    if (editingPost) {
      setTitle(editingPost.title || '');
      setContent(editingPost.content || '');
    } else {
      setTitle('');
      setContent('');
    }
  }, [editingPost]);

  const logout = () => {
    localStorage.removeItem('authToken');
    setIsLoggedIn(false);
    setEditingPost(null);
    alert('Logged out');
  };

  const savePost = async () => {
    if (!title.trim() || !content.trim()) return alert('Title & content required');

    const cleanContent = content.replace(
      /<a(?![^>]*\starget=)/g,
      '<a target="_blank" rel="noopener noreferrer"'
    );

    const payload = { title, content: cleanContent, author: 'IMS Team' };
    const method = editingPost?.id ? 'PUT' : 'POST';
    const url = editingPost?.id ? `/api/blog?id=${editingPost.id}` : '/api/blog';

    try {
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error('Failed to save post');

      const newPost = await res.json();

      if (editingPost?.id) {
        setPosts(prev => prev.map(p => p.id === newPost.id ? newPost : p));
      } else {
        setPosts(prev => [newPost, ...prev]);
      }

      alert(editingPost ? 'Post updated!' : 'Post published!');
      setEditingPost(null);
      setTitle('');
      setContent('');
    } catch (err) {
      console.error(err);
      alert('Error saving post');
    }
  };

  const deletePost = async (id) => {
    if (!confirm('Delete this post forever?')) return;
    try {
      const res = await fetch(`/api/blog?id=${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Failed to delete post');
      setPosts(prev => prev.filter(p => p.id !== id));
      alert('Post deleted successfully!');
    } catch (err) {
      console.error(err);
      alert('Error deleting post');
    }
  };

  const openFullPost = (post) => {
    setSelectedPost(post);
  };

  const closeFullPost = () => {
    setSelectedPost(null);
  };

  return (
    <>
      {/* Hero Section */}
      <section className="gradient-bg text-center text-white py-5 position-relative">
        <div className="hero-overlay"></div>
        <div className="container position-relative mt-5" style={{ zIndex: 1 }}>
          <h1 className="display-3 fw-bold mb-3">IMS Blog</h1>
          <p className="lead mb-4 text-gold">Innovation • Strategy • Revenue Growth</p>
          {isLoggedIn && (
            <div className="d-flex justify-content-center gap-3 mb-4">
              <button onClick={() => setEditingPost({})} className="btn btn-gold px-5 py-3">
                New Post
              </button>
              <button onClick={logout} className="btn btn-outline-danger px-5 py-3">
                Logout
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Main Content */}
      <div className="gradient-bg py-5">
        <div className="container">
          {/* Admin Editor */}
          {isLoggedIn && (
            <div className="card mb-5 shadow-lg border-0">
              <div className="card-header bg-gold text-dark fw-bold">
                {editingPost?.id ? 'Edit Post' : 'Create New Post'}
              </div>
              <div className="card-body">
                <input
                  type="text"
                  className="form-control mb-4 fs-4"
                  placeholder="Post Title"
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                />
                <ReactQuill
                  theme="snow"
                  value={content}
                  onChange={setContent}
                  modules={modules}
                  className="mb-4"
                  style={{ minHeight: '300px' }}
                />
                <div className="d-flex gap-3">
                  <button onClick={savePost} className="btn btn-gold flex-fill">
                    {editingPost?.id ? 'Update Post' : 'Publish Post'}
                  </button>
                  {editingPost?.id && (
                    <button onClick={() => setEditingPost(null)} className="btn btn-secondary flex-fill">
                      Cancel
                    </button>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Posts Grid */}
{/* Posts Grid */}
<div className="row g-4 justify-content-center">
  {posts.length === 0 && !loading ? (
    <p className="text-center text-white fs-3 mt-5">No posts yet. Check back soon!</p>
  ) : (
    posts.map((post, index) => {
      const isLast = index === posts.length - 1;
      const excerpt = post.content.replace(/<[^>]*>/g, '').substring(0, 100) + (post.content.length > 100 ? '...' : '');
      const hasImage = post.content?.includes('<img');
      const imageUrl = post.content.match(/src="([^"]+)"/)?.[1];

      return (
        /* col-lg-3 makes the cards smaller (4 per row on large screens) */
        <div key={post.id} className="col-md-6 col-lg-3" ref={isLast ? lastPostRef : null}>
          <div className="card h-100 shadow border-1 rounded-3 border-warning-subtle overflow-hidden bg-white blog-card-hover">
            
            {/* Header/Image Area */}
            <div className="position-relative" style={{ height: '180px', overflow: 'hidden' }}>
              {hasImage ? (
                <>
                  <img
                    src={imageUrl}
                    alt=""
                    className="w-100 h-100"
                    style={{ objectFit: 'cover' }}
                  />
                  {/* Overlay for text readability */}
                  <div className="position-absolute bottom-0 start-0 w-100 p-3" 
                       style={{ background: 'linear-gradient(transparent, rgba(0,0,0,0.8))' }}>
                    <h6 className="card-title text-white fw-bold mb-0">{post.title}</h6>
                  </div>
                </>
              ) : (
                /* Fallback if no image: solid gold background with centered title */
                <div className="w-100 h-100 bg-gold d-flex align-items-center p-3">
                  <h6 className="card-title text-dark fw-bold mb-0">{post.title}</h6>
                </div>
              )}
            </div>

            <div className="card-body d-flex flex-column p-3">
              <p className="text-white mb-2" style={{ fontSize: '0.75rem' }}>
                {new Date(post.date || Date.now()).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
              </p>
              <p className="text-dark small flex-grow-1 mb-3">{excerpt}</p>
              
              <div className="mt-auto">
                {isLoggedIn ? (
                  <div className="d-flex gap-2">
                    <button onClick={() => setEditingPost(post)} className="btn btn-sm btn-outline-gold flex-fill">
                      Edit
                    </button>
                    <button onClick={() => deletePost(post.id)} className="btn btn-sm btn-outline-danger flex-fill">
                      Delete
                    </button>
                  </div>
                ) : (
                  <button onClick={() => openFullPost(post)} className="btn btn-sm btn-gold w-100">Read More</button>
                )}
              </div>
            </div>
          </div>
        </div>
      );
    })
  )}
</div>

          {loading && (
            <div className="text-center my-5">
              <div className="spinner-border text-gold" style={{ width: '3rem', height: '3rem' }}></div>
              <p className="mt-3 text-white">Loading more posts...</p>
            </div>
          )}
        </div>
      </div>

      <Modal show={!!selectedPost} onHide={closeFullPost} size="lg" centered>
        <Modal.Header closeButton className="bg-gold text-dark">
          <Modal.Title>{selectedPost?.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body className="ql-editor p-0"> {/* Key: Add ql-editor class */}
          <div className="p-4">
            <p className="text-white small mb-4">
              {new Date(selectedPost?.date || Date.now()).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
            </p>
            <div 
              className="post-content" 
              dangerouslySetInnerHTML={{ __html: selectedPost?.content || '' }} 
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <button onClick={closeFullPost} className="btn btn-secondary">Close</button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Blog;