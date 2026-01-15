import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import ReactQuill, { Quill } from 'react-quill-new';
import BlotFormatter from 'quill-blot-formatter';
import Modal from 'react-bootstrap/Modal';
import 'react-quill-new/dist/quill.snow.css';

Quill.register('modules/blotFormatter', BlotFormatter);

const Blog = () => {
  const [posts, setPosts] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [loginCreds, setLoginCreds] = useState({ user: '', pass: '' });
  
  const [editingPost, setEditingPost] = useState(null);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [selectedPost, setSelectedPost] = useState(null);

  // Secure credentials from Vite environment variables
  const ADMIN_USER = import.meta.env.VITE_ADMIN_USERNAME;
  const ADMIN_PASS = import.meta.env.VITE_ADMIN_PASSWORD;
  
  const location = useLocation();

  // 1. Secure Authentication Effect
  useEffect(() => {
    const authStatus = localStorage.getItem('isAdmin') === 'true';
    setIsLoggedIn(authStatus);

    // Prompt login if accessing admin route without being logged in
    if (location.pathname.includes('admin') && !authStatus) {
      setShowLoginModal(true);
    }
  }, [location.pathname]);

  const handleLogin = (e) => {
    e.preventDefault();
    if (loginCreds.user === ADMIN_USER && loginCreds.pass === ADMIN_PASS) {
      localStorage.setItem('isAdmin', 'true');
      setIsLoggedIn(true);
      setShowLoginModal(false);
    } else {
      alert("Invalid credentials. Please check your .env settings.");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('isAdmin');
    setIsLoggedIn(false);
    window.location.reload();
  };

  // 2. Data Fetching (Scroll Fix logic)
  const fetchPage = useCallback(async (pageNum, shouldAppend = false) => {
    if (loading) return;
    setLoading(true);
    try {
      const r = await fetch(`/api/blog?page=${pageNum}&limit=6`);
      const data = await r.json();
      if (data.posts) {
        setPosts(prev => (shouldAppend ? [...prev, ...data.posts] : data.posts));
        setHasMore(data.pagination?.hasNext || false);
      }
    } catch (err) {
      console.error("Fetch error", err);
    } finally {
      setLoading(false);
    }
  }, [loading]);

  useEffect(() => {
    fetchPage(1, false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // 3. Infinite Scroll Observer
  const observer = useRef();
  const lastPostRef = useCallback((node) => {
    if (loading) return;
    if (observer.current) observer.current.disconnect();
    
    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && hasMore) {
        const nextPage = page + 1;
        setPage(nextPage);
        fetchPage(nextPage, true);
      }
    });
    
    if (node) observer.current.observe(node);
  }, [loading, hasMore, page, fetchPage]);

  // 4. API Actions (Save/Delete)
  const handleSavePost = async () => {
    if (!editingPost.title || !editingPost.content) return alert("Title and Content required");
    setLoading(true);
    const method = editingPost.id ? 'PUT' : 'POST';
    const url = editingPost.id ? `/api/blog?id=${editingPost.id}` : '/api/blog';

    try {
      const res = await fetch(url, {
        method: method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...editingPost, author: ADMIN_USER })
      });
      if (res.ok) {
        setEditingPost(null);
        setPage(1); 
        fetchPage(1, false); // Refresh to start of list
      }
    } catch (err) {
      alert("Failed to save post");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (e, id) => {
    e.stopPropagation();
    if (!window.confirm("Delete this post permanently?")) return;
    try {
      const res = await fetch(`/api/blog?id=${id}`, { method: 'DELETE' });
      if (res.ok) setPosts(prev => prev.filter(p => p.id !== id));
    } catch (err) {
      alert("Delete failed");
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
          overflow: hidden;
          position: relative;
        }
        .glass-card:hover {
          background: rgba(255, 255, 255, 0.05);
          border-color: rgba(0, 255, 204, 0.3);
          transform: translateY(-10px);
        }
        .cyan-text { color: #00ffcc; text-shadow: 0 0 15px rgba(0, 255, 204, 0.2); }
        .loader-pulse {
          width: 60px; height: 60px; background: #00ffcc; border-radius: 50%;
          animation: pulse 1.5s infinite ease-in-out;
        }
        @keyframes pulse {
          0%, 100% { transform: scale(0.8); opacity: 0.5; }
          50% { transform: scale(1.1); opacity: 1; }
        }
        .modal-glass {
          background: rgba(15, 23, 42, 0.9) !important;
          backdrop-filter: blur(40px);
          border-radius: 40px !important;
          border: 1px solid rgba(255, 255, 255, 0.1) !important;
          color: white;
        }
        .share-pill {
          background: rgba(255, 255, 255, 0.05);
          padding: 10px 24px;
          border-radius: 100px;
          display: inline-flex;
          gap: 20px;
          border: 1px solid rgba(255,255,255,0.08);
        }
        .admin-controls {
          position: absolute; top: 15px; right: 15px; display: flex; gap: 8px; z-index: 10;
        }
        .ql-container { font-size: 16px; min-height: 300px; }
        .ql-editor.ql-blank::before { color: rgba(255,255,255,0.3) !important; }
      `}</style>

      <div className="container">
        <div className="header-glass text-center">
          <div className="cyan-text fw-bold mb-2" style={{letterSpacing: '5px', fontSize: '0.8rem'}}>IMS EXCLUSIVE</div>
          <h1 className="display-4 fw-bold">Innovative <span className="cyan-text">Insights</span></h1>
          
          {isLoggedIn ? (
            <div className="d-flex justify-content-center gap-3 mt-4">
              <button 
                className="btn btn-outline-info rounded-pill px-5 fw-bold"
                onClick={() => setEditingPost({ title: '', content: '', author: ADMIN_USER })}
              >
                <i className="fas fa-plus-circle me-2"></i> CREATE NEW POST
              </button>
              <button className="btn btn-outline-danger rounded-pill px-5 fw-bold" onClick={handleLogout}>
                LOGOUT
              </button>
            </div>
          ) : (
            <p className="opacity-50 mx-auto" style={{maxWidth: '550px'}}>Elevating healthcare through expert knowledge and technological strategy.</p>
          )}
        </div>

        {loading && page === 1 && (
          <div className="text-center py-5">
            <div className="loader-pulse mx-auto"></div>
            <p className="mt-4 cyan-text small fw-bold">SYNCING DATA...</p>
          </div>
        )}

        <div className="row g-4 justify-content-center">
          {posts.map((post, index) => {
            const isLast = index === posts.length - 1;
            const imageUrl = post.content.match(/src="([^"]+)"/)?.[1];
            return (
              <div key={post.id} className="col-lg-4 col-md-6" ref={isLast ? lastPostRef : null}>
                <div className="glass-card p-3" onClick={() => setSelectedPost(post)}>
                  
                  {isLoggedIn && (
                    <div className="admin-controls">
                      <button className="btn btn-dark btn-sm rounded-circle border-secondary" 
                        onClick={(e) => { e.stopPropagation(); setEditingPost(post); }}>
                        <i className="fas fa-edit text-warning"></i>
                      </button>
                      <button className="btn btn-dark btn-sm rounded-circle border-secondary" 
                        onClick={(e) => handleDelete(e, post.id)}>
                        <i className="fas fa-trash text-danger"></i>
                      </button>
                    </div>
                  )}

                  <div className="rounded-4 overflow-hidden mb-4" style={{height: '200px', background: 'rgba(255,255,255,0.03)'}}>
                    {imageUrl ? <img src={imageUrl} alt="" className="w-100 h-100 object-fit-cover opacity-75" /> : 
                      <div className="h-100 d-flex align-items-center justify-content-center opacity-10"><i className="fas fa-feather-alt fa-3x"></i></div>}
                  </div>
                  <div className="px-2 pb-2">
                    <span className="small text-secondary fw-bold text-uppercase" style={{fontSize: '0.65rem'}}>Article • {new Date(post.date || Date.now()).toLocaleDateString()}</span>
                    <h5 className="fw-bold mt-2 mb-3">{post.title}</h5>
                    <div className="cyan-text small fw-bold">CONTINUE READING <i className="fas fa-chevron-right ms-1"></i></div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {loading && page > 1 && (
          <div className="text-center py-5">
            <div className="spinner-border text-info spinner-border-sm"></div>
          </div>
        )}
      </div>

      {/* SECURE LOGIN MODAL */}
      <Modal show={showLoginModal} onHide={() => setShowLoginModal(false)} centered contentClassName="modal-glass">
        <Modal.Header closeButton closeVariant="white" className="border-0">
          <Modal.Title className="fw-bold cyan-text">ADMIN LOGIN</Modal.Title>
        </Modal.Header>
        <Modal.Body className="p-4">
          <form onSubmit={handleLogin}>
            <div className="mb-3">
              <label className="small opacity-50 mb-2">Username</label>
              <input 
                type="text" 
                className="form-control bg-dark text-white border-secondary"
                onChange={e => setLoginCreds({...loginCreds, user: e.target.value})} 
                required
              />
            </div>
            <div className="mb-4">
              <label className="small opacity-50 mb-2">Password</label>
              <input 
                type="password" 
                className="form-control bg-dark text-white border-secondary"
                onChange={e => setLoginCreds({...loginCreds, pass: e.target.value})} 
                required
              />
            </div>
            <button type="submit" className="btn btn-info w-100 rounded-pill fw-bold py-2">AUTHENTICATE</button>
          </form>
        </Modal.Body>
      </Modal>

      {/* VIEW POST MODAL */}
      <Modal show={!!selectedPost} onHide={() => setSelectedPost(null)} size="lg" centered contentClassName="modal-glass">
        <Modal.Header closeButton closeVariant="white" className="border-0 p-4"></Modal.Header>
        <Modal.Body className="px-4 px-md-5 pb-5">
          <div className="text-center mb-5">
            <h2 className="fw-bold mb-4 text-white">{selectedPost?.title}</h2>
            <div className="share-pill">
              <i className="fab fa-linkedin pointer" onClick={() => handleShare('linkedin')}></i>
              <i className="fab fa-twitter pointer" onClick={() => handleShare('twitter')}></i>
              <i className="fas fa-link pointer" onClick={() => handleShare('copy')}></i>
            </div>
          </div>
          <div className="post-content ql-editor" 
               style={{color: 'rgba(255,255,255,0.8)', fontSize: '1.1rem'}} 
               dangerouslySetInnerHTML={{ __html: selectedPost?.content || '' }} />
        </Modal.Body>
      </Modal>

      {/* EDIT/CREATE MODAL */}
      <Modal show={!!editingPost} onHide={() => setEditingPost(null)} size="xl" centered contentClassName="modal-glass">
        <Modal.Header closeButton closeVariant="white" className="border-0">
          <Modal.Title className="fw-bold cyan-text">{editingPost?.id ? 'EDIT POST' : 'CREATE NEW INSIGHT'}</Modal.Title>
        </Modal.Header>
        <Modal.Body className="p-4">
          <input 
            type="text" 
            className="form-control form-control-lg bg-dark text-white border-secondary mb-4"
            placeholder="Insight Title"
            value={editingPost?.title || ''}
            onChange={(e) => setEditingPost({...editingPost, title: e.target.value})}
          />
          <div className="editor-container bg-light rounded-3 overflow-hidden text-dark">
            <ReactQuill 
              theme="snow"
              value={editingPost?.content || ''}
              onChange={(content) => setEditingPost({...editingPost, content})}
              modules={{
                blotFormatter: {},
                toolbar: [
                  [{ 'header': [1, 2, 3, false] }],
                  ['bold', 'italic', 'underline', 'strike', 'blockquote'],
                  [{'list': 'ordered'}, {'list': 'bullet'}],
                  ['link', 'image', 'video'],
                  ['clean']
                ],
              }}
            />
          </div>
          <button 
            className="btn btn-info w-100 mt-4 py-3 fw-bold rounded-pill" 
            onClick={handleSavePost}
            disabled={loading}
          >
            {loading ? 'PROCESSING...' : (editingPost?.id ? 'UPDATE INSIGHT' : 'PUBLISH INSIGHT')}
          </button>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Blog;