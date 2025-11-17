// src/components/Blog.jsx
import React, { useState, useEffect } from 'react';
import ReactQuill, { Quill } from 'react-quill-new';
import BlotFormatter from 'quill-blot-formatter'; // ← NEW: Production-safe image resize
import 'react-quill-new/dist/quill.snow.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../blog-custom.css';

// Register the new formatter (works everywhere – no crashes!)
Quill.register('modules/blotFormatter', BlotFormatter);
BlotFormatter.whitelist = false; // Allow custom sizes

const Blog = () => {
  const [posts, setPosts] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [editingPost, setEditingPost] = useState(null);

  // VITE + VERCEL env vars
  const ADMIN_USER = import.meta.env.VITE_ADMIN_USERNAME || 'admin';
  const ADMIN_PASS = import.meta.env.VITE_ADMIN_PASSWORD || 'password';
  const TOKEN_SECRET = import.meta.env.VITE_AUTH_TOKEN_SECRET || 'fallback-secret-2025';

  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, false] }],
      ['bold', 'italic', 'underline'],
      [{ color: [] }, { background: [] }],
      [{ list: 'ordered' }, { list: 'bullet' }],
      ['link', 'image'],
      ['clean'],
    ],
    blotFormatter: {} // This enables resize + align toolbar
  };

  // Validate token on load
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

  // Load posts
  useEffect(() => {
    fetch('/api/blog')
      .then(r => r.ok ? r.json() : [])
      .then(data => setPosts(data || []))
      .catch(() => setPosts([]));
  }, []);

  // Sync form when editing
  useEffect(() => {
    if (editingPost) {
      setTitle(editingPost.title || '');
      setContent(editingPost.content || '');
    } else {
      setTitle('');
      setContent('');
    }
  }, [editingPost]);

  const login = () => {
    const u = prompt('Username:')?.trim() || '';
    const p = prompt('Password:')?.trim() || '';

    if (u === ADMIN_USER && p === ADMIN_PASS) {
      const token = btoa(`${u}:${p}:${Date.now()}:${TOKEN_SECRET}`);
      localStorage.setItem('authToken', token);
      setIsLoggedIn(true);
      alert('Welcome back, Admin!');
    } else {
      alert('Wrong credentials');
    }
  };

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
    const method = editingPost ? 'PUT' : 'POST';
    const url = editingPost ? `/api/blog?id=${editingPost.id}` : '/api/blog';

    await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    alert(editingPost ? 'Post updated!' : 'Post published!');
    setEditingPost(null);
    fetch('/api/blog').then(r => r.json()).then(setPosts);
  };

  const deletePost = async (id) => {
    if (!confirm('Delete this post forever?')) return;
    await fetch(`/api/blog?id=${id}`, { method: 'DELETE' });
    setPosts(posts.filter(p => p.id !== id));
  };

  return (
    <>
      {/* Hero */}
      <div className="blog-hero position-relative overflow-hidden">
        <div className="hero-overlay"></div>
        <div className="container position-relative z-10 py-5">
          <div className="text-center py-5 my-5">
            <h1 className="display-3 fw-bold text-white mb-3">
              IMS <span className="text-cyan">Blog</span>
            </h1>
            <p className="lead text-cyan-300 mb-4">
              Innovation • Strategy • Revenue Growth
            </p>

            {!isLoggedIn ? (
              <button onClick={login} className="btn btn-cyan btn-lg px-5 py-3 mt-4">
                Admin Login
              </button>
            ) : (
              <button onClick={logout} className="btn btn-outline-danger btn-lg px-5 py-3 mt-4">
                Logout
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="container py-5">
        {/* Admin Panel */}
        {isLoggedIn && (
          <div className="row g-5 mb-5">
            <div className="col-lg-6">
              <div className="card glass-card border-0 shadow-lg">
                <div className="card-header bg-gradient-cyan text-white text-center py-4">
                  <h3 className="mb-0 fw-bold">{editingPost ? 'Edit Post' : 'Create New Post'}</h3>
                </div>
                <div className="card-body p-4">
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Enter an epic title..."
                    className="form-control form-control-lg mb-4 bg-dark text-white border-cyan"
                  />
                  <div className="quill-container">
                    <ReactQuill
                      value={content}
                      onChange={setContent}
                      modules={modules}
                      theme="snow"
                      placeholder="Start writing something legendary..."
                    />
                  </div>
                  <div className="d-flex gap-3 mt-4">
                    <button onClick={savePost} className="btn btn-cyan btn-lg flex-fill">
                      {editingPost ? 'Update Post' : 'Publish Post'}
                    </button>
                    {editingPost && (
                      <button onClick={() => setEditingPost(null)} className="btn btn-outline-secondary btn-lg">
                        Cancel
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-6">
              <div className="card border-0 shadow-lg">
                <div className="card-header bg-gradient-cyan text-white text-center py-4">
                  <h3 className="mb-0 fw-bold">Live Preview</h3>
                </div>
                <div className="card-body bg-white text-dark p-5" style={{ minHeight: '600px' }}>
                  <h1 className="display-5 fw-bold mb-4">{title || 'Your Title Will Appear Here'}</h1>
                  {content ? (
                    <div dangerouslySetInnerHTML={{ __html: content }} />
                  ) : (
                    <p className="text-muted fs-4 italic">
                      Start typing to see your masterpiece come alive...
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Posts Grid */}
        <div className="row g-4">
          {posts.length === 0 ? (
            <div className="col-12 text-center py-5">
              <p className="text-cyan-300 fs-3">No posts yet. Time to write the first one!</p>
            </div>
          ) : (
            posts.map((post) => {
              const excerpt = post.content.replace(/<[^>]*>/g, '').substring(0, 150) + '...'; // Plain text preview
              const hasImage = post.content?.includes('<img');
              const fullPostUrl = `/blog/${post.id}`; // Route for full post

              return (
                <div key={post.id} className="col-lg-4 col-md-6">
                  <article className="card glass-card h-100 border-0 shadow-lg hover-lift">
                    {hasImage && (
                      <div className="position-relative overflow-hidden">
                        <div
                          dangerouslySetInnerHTML={{
                            __html: post.content.match(/<img[^>]+>/)?.[0] || '',
                          }}
                          className="post-featured-img"
                        />
                        <div className="img-overlay"></div>
                      </div>
                    )}
                    <div className="card-body d-flex flex-column p-4">
                      <h3 className="card-title text-cyan fw-bold fs-4 mb-3">{post.title}</h3>
                      <p className="text-cyan-300 small mb-3">
                        {new Date(post.date || Date.now()).toLocaleDateString('en-US', {
                          month: 'long',
                          day: 'numeric',
                          year: 'numeric',
                        })}
                      </p>
                      <div className="text-light opacity-80 flex-grow-1 mb-4">
                        <div
                          className="excerpt"
                          dangerouslySetInnerHTML={{ __html: excerpt }}
                        />
                        {post.isExpanded && (
                          <div
                            className="full-content mt-3"
                            dangerouslySetInnerHTML={{ __html: post.content }}
                          />
                        )}
                      </div>
                      <div className="d-flex gap-2 flex-column">
                        <button
                          onClick={() => setEditingPost(post)}
                          className={`btn ${isLoggedIn ? 'btn-outline-cyan btn-sm flex-fill' : 'd-none'}`}
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => deletePost(post.id)}
                          className={`btn ${isLoggedIn ? 'btn-outline-danger btn-sm flex-fill' : 'd-none'}`}
                        >
                          Delete
                        </button>
                        {!isLoggedIn && (
                          <>
                            <button
                              onClick={() => {
                                setPosts(prev =>
                                  prev.map(p =>
                                    p.id === post.id ? { ...p, isExpanded: !post.isExpanded } : p
                                  )
                                );
                              }}
                              className="btn btn-outline-light btn-sm flex-fill"
                            >
                              {post.isExpanded ? 'Show Less' : 'Read More'}
                            </button>
                            <a href={fullPostUrl} target="_blank" rel="noopener noreferrer" className="btn btn-cyan btn-sm flex-fill">
                              View Full Post →
                            </a>
                          </>
                        )}
                      </div>
                    </div>
                  </article>
                </div>
              );
            })
          )}
        </div>
      </div>
    </>
  );
};

export default Blog;