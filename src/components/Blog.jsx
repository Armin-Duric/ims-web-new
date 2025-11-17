// src/components/Blog.jsx
import React, { useState, useEffect } from 'react';
import ReactQuill, { Quill } from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../blog-custom.css';

// Conditional image resize – works in dev, safe in production
let imageResizeModule = null;
if (import.meta.env.DEV) {
  try {
    const ImageResize = await import('quill-image-resize-module-react');
    Quill.register('modules/imageResize', ImageResize.default || ImageResize);
    imageResizeModule = {
      parchment: Quill.import('parchment'),
      modules: ['Resize', 'DisplaySize', 'Toolbar'],
    };
  } catch (e) {
    console.warn('Image resize not available in dev (optional)');
  }
}

const Blog = () => {
  const [posts, setPosts] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [editingPost, setEditingPost] = useState(null); // ← THIS WAS MISSING IN YOUR BUILD!

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
    ...(imageResizeModule && { imageResize: imageResizeModule }),
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
            posts.map((post) => (
              <div key={post.id} className="col-lg-4 col-md-6">
                <article className="card glass-card h-100 border-0 shadow-lg hover-lift">
                  {post.content?.includes('<img') && (
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
                    <div
                      className="text-light opacity-80 flex-grow-1 line-clamp-3"
                      dangerouslySetInnerHTML={{
                        __html: post.content.replace(/<img[^>]*>/g, ''),
                      }}
                    />
                    {isLoggedIn && (
                      <div className="mt-4 d-flex gap-2">
                        <button
                          onClick={() => setEditingPost(post)}
                          className="btn btn-outline-cyan btn-sm flex-fill"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => deletePost(post.id)}
                          className="btn btn-outline-danger btn-sm flex-fill"
                        >
                          Delete
                        </button>
                      </div>
                    )}
                  </div>
                </article>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
};

export default Blog;