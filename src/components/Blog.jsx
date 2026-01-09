import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import ReactQuill, { Quill } from 'react-quill-new';
import BlotFormatter from 'quill-blot-formatter';
import Modal from 'react-bootstrap/Modal';
import 'react-quill-new/dist/quill.snow.css';

Quill.register('modules/blotFormatter', BlotFormatter);

const Blog = () => {
  const [posts, setPosts] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [editingPost, setEditingPost] = useState(null); // Used for the Create/Edit Modal
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [selectedPost, setSelectedPost] = useState(null);

  // Form States for Editor
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const navigate = useNavigate();

  const ADMIN_USER = import.meta.env.VITE_ADMIN_USERNAME || 'admin';
  const ADMIN_PASS = import.meta.env.VITE_ADMIN_PASSWORD || 'password';
  const TOKEN_SECRET = import.meta.env.VITE_AUTH_TOKEN_SECRET || 'fallback-secret-2025';

  // 1. Check Login Status on Mount
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (!token) return;
    try {
      const decoded = atob(token).split(':');
      if (decoded[0] === ADMIN_USER && decoded[1] === ADMIN_PASS && decoded[3] === TOKEN_SECRET) {
        setIsLoggedIn(true);
      }
    } catch { 
      localStorage.removeItem('authToken'); 
    }
  }, []);

  // 2. Fetch Posts
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      fetch(`/api/blog?page=${page}&limit=6`)
        .then(r => r.json())
        .then(data => {
          if (data.posts) {
            setPosts(prev => (page === 1 ? data.posts : [...prev, ...data.posts]));
            setHasMore(data.pagination?.hasNext || false);
          }
          setLoading(false);
        }).catch(() => setLoading(false));
    }, 600);
  }, [page]);

  // Infinite Scroll Observer
  const observer = useRef();
  const lastPostRef = useCallback((node) => {
    if (loading) return;
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && hasMore) setPage(prev => prev + 1);
    });
    if (node) observer.current.observe(node);
  }, [loading, hasMore]);

  // 3. Handle Save (Create or Update)
  const handleSavePost = async () => {
    const method = editingPost?.id ? 'PUT' : 'POST';
    const url = editingPost?.id ? `/api/blog/${editingPost.id}` : '/api/blog';

    const response = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, content })
    });

    if (response.ok) {
      window.location.reload(); // Refresh to show new post
    } else {
      alert("Failed to save post");
    }
  };

  const handleShare = (platform) => {
    const url = window.location.href;
    if (platform === 'copy') {
      navigator.clipboard.writeText(url);
      alert("Link copied!");
    } else {
      const shareUrl = platform === 'linkedin' 
        ? `https://www.linkedin.com/sharing/share-offsite/?url=${url}`
        : `https://twitter.com/intent/tweet?url=${url}`;
      window.open(shareUrl, '_blank');
    }
  };

  return (
    <div className="blog-wrapper">
      <style>{`
        .blog-wrapper {
          background: #0f172a;
          background-image: 
            radial-gradient(at 0% 0%, rgba(0, 255, 204, 0.08) 0px, transparent 40%),
            radial-gradient(at 100% 0%, rgba(56, 189, 248, 0.08) 0px, transparent 40%);
          min-height: 100vh;
          padding: 140px 0 100px;
          color: #f8fafc;
        }
        .header-glass {
          background: rgba(255, 255, 255, 0.01);
          backdrop-filter: blur(25px);
          border: 1px solid rgba(255, 255, 255, 0.07);
          border-radius: 50px;
          padding: 70px 30px;
          margin-bottom: 60px;
        }
        .glass-card {
          background: rgba(255, 255, 255, 0.02);
          backdrop-filter: blur(15px);
          border: 1px solid rgba(255, 255, 255, 0.06);
          border-radius: 35px;
          transition: all 0.4s ease;
          height: 100%;
          cursor: pointer;
          position: relative;
        }
        .glass-card:hover {
          background: rgba(255, 255, 255, 0.05);
          border-color: rgba(0, 255, 204, 0.3);
          transform: translateY(-10px);
        }
        .admin-controls {
          position: absolute;
          top: 15px;
          right: 15px;
          display: flex;
          gap: 10px;
          z-index: 10;
        }
        .btn-edit {
          background: rgba(0, 255, 204, 0.2);
          border: 1px solid #00ffcc;
          color: #00ffcc;
          border-radius: 10px;
          padding: 5px 12px;
          font-size: 0.75rem;
        }
        .cyan-text { color: #00ffcc; text-shadow: 0 0 15px rgba(0, 255, 204, 0.2); }
        .modal-glass {
          background: rgba(15, 23, 42, 0.9) !important;
          backdrop-filter: blur(40px);
          border: 1px solid rgba(255, 255, 255, 0.1) !important;
          border-radius: 30px !important;
          color: white;
        }
        .ql-container { min-height: 300px; color: white; background: rgba(255,255,255,0.02); }
        .ql-toolbar { background: white !important; border-radius: 10px 10px 0 0; }
      `}</style>

      <div className="container">
        <div className="header-glass text-center">
          <div className="cyan-text fw-bold mb-2" style={{letterSpacing: '5px'}}>IMS EXCLUSIVE</div>
          <h1 className="display-4 fw-bold">Innovative <span className="cyan-text">Insights</span></h1>
          
          {/* ADMIN ACTION: Show Compose Button */}
          {isLoggedIn && (
            <div className="mt-4">
              <button className="btn btn-outline-info rounded-pill px-4" 
                onClick={() => { setEditingPost({}); setTitle(''); setContent(''); }}>
                + Compose New Post
              </button>
              <button className="btn btn-link text-danger ms-3" onClick={() => { localStorage.removeItem('authToken'); window.location.reload(); }}>Logout</button>
            </div>
          )}
        </div>

        {loading && page === 1 && (
          <div className="text-center py-5"><div className="spinner-grow text-info"></div></div>
        )}

        <div className="row g-4 justify-content-center">
          {posts.map((post, index) => {
            const isLast = index === posts.length - 1;
            const imageUrl = post.content.match(/src="([^"]+)"/)?.[1];
            return (
              <div key={post.id} className="col-lg-4 col-md-6" ref={isLast ? lastPostRef : null}>
                <div className="glass-card p-3">
                  {/* ADMIN ACTION: Edit Button on Card */}
                  {isLoggedIn && (
                    <div className="admin-controls">
                      <button className="btn-edit" onClick={(e) => {
                        e.stopPropagation();
                        setEditingPost(post);
                        setTitle(post.title);
                        setContent(post.content);
                      }}>EDIT</button>
                    </div>
                  )}

                  <div onClick={() => setSelectedPost(post)}>
                    <div className="rounded-4 overflow-hidden mb-4" style={{height: '200px', background: 'rgba(255,255,255,0.03)'}}>
                      {imageUrl ? <img src={imageUrl} alt="" className="w-100 h-100 object-fit-cover" /> : 
                        <div className="h-100 d-flex align-items-center justify-content-center opacity-10"><i className="fas fa-feather-alt fa-3x"></i></div>}
                    </div>
                    <div className="px-2 pb-2">
                      <span className="small text-secondary fw-bold text-uppercase">Article • {new Date(post.date || Date.now()).toLocaleDateString()}</span>
                      <h5 className="fw-bold mt-2 mb-3">{post.title}</h5>
                      <div className="cyan-text small fw-bold">READ ARTICLE <i className="fas fa-chevron-right ms-1"></i></div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* --- MODAL: VIEW POST --- */}
      <Modal show={!!selectedPost} onHide={() => setSelectedPost(null)} size="lg" centered contentClassName="modal-glass">
        <Modal.Header closeButton closeVariant="white" className="border-0 p-4"></Modal.Header>
        <Modal.Body className="px-4 px-md-5 pb-5">
          <div className="text-center mb-5">
            <h2 className="fw-bold mb-4">{selectedPost?.title}</h2>
            <div className="share-pill">
              <i className="fab fa-linkedin" onClick={() => handleShare('linkedin')}></i>
              <i className="fab fa-twitter" onClick={() => handleShare('twitter')}></i>
              <i className="fas fa-link" onClick={() => handleShare('copy')}></i>
            </div>
          </div>
          <div className="post-content ql-editor" dangerouslySetInnerHTML={{ __html: selectedPost?.content || '' }} />
        </Modal.Body>
      </Modal>

      {/* --- MODAL: CREATE / EDIT POST --- */}
      <Modal show={!!editingPost} onHide={() => setEditingPost(null)} size="xl" centered contentClassName="modal-glass">
        <Modal.Header closeButton closeVariant="white" className="border-0 px-4 pt-4">
          <Modal.Title className="fw-bold">{editingPost?.id ? 'Edit Post' : 'New Insight'}</Modal.Title>
        </Modal.Header>
        <Modal.Body className="p-4">
          <input 
            type="text" 
            className="form-control bg-dark text-white border-secondary mb-3 p-3" 
            placeholder="Article Title..." 
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <ReactQuill 
            theme="snow" 
            value={content} 
            onChange={setContent} 
            modules={{ toolbar: [[{ 'header': [1, 2, false] }], ['bold', 'italic', 'underline'], ['link', 'image'], [{ 'list': 'ordered'}, { 'list': 'bullet' }], ['clean']] }}
          />
          <div className="mt-4 text-end">
            <button className="btn btn-link text-secondary me-3" onClick={() => setEditingPost(null)}>Cancel</button>
            <button className="btn btn-info px-5 rounded-pill fw-bold" onClick={handleSavePost}>
              {editingPost?.id ? 'Update Post' : 'Publish Article'}
            </button>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Blog;
