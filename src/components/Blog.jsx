import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import ReactQuill, { Quill } from 'react-quill-new';
import BlotFormatter from 'quill-blot-formatter';
import Modal from 'react-bootstrap/Modal';
import { HiOutlinePlusCircle, HiOutlineLogout, HiOutlinePencilAlt, HiOutlineTrash, HiOutlineArrowRight } from 'react-icons/hi';
import { FaLinkedinIn, FaTwitter, FaLink, FaFeatherAlt } from 'react-icons/fa';
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

  const ADMIN_USER = import.meta.env.VITE_ADMIN_USERNAME;
  const ADMIN_PASS = import.meta.env.VITE_ADMIN_PASSWORD;
  
  const location = useLocation();

  useEffect(() => {
    const authStatus = localStorage.getItem('isAdmin') === 'true';
    setIsLoggedIn(authStatus);
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
  }, []);

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
        fetchPage(1, false);
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
    <div className="blog-glass-wrapper">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;600;800&display=swap');

        .blog-glass-wrapper {
          background: #faf9f6;
          min-height: 100vh;
          padding: 160px 0 100px;
          color: #334155;
          font-family: 'Plus Jakarta Sans', sans-serif;
        }

        .header-glass-section {
          background: rgba(255, 255, 255, 0.4);
          backdrop-filter: blur(25px);
          -webkit-backdrop-filter: blur(25px);
          border: 1px solid rgba(255, 255, 255, 0.8);
          border-radius: 50px;
          padding: 80px 30px;
          margin-bottom: 80px;
          box-shadow: 0 10px 30px rgba(0,0,0,0.02);
        }

        .post-glass-card {
          background: #ffffff;
          border: 1px solid #e2e8f0;
          border-radius: 35px;
          transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          height: 100%;
          cursor: pointer;
          overflow: hidden;
          position: relative;
          box-shadow: 0 4px 15px rgba(0,0,0,0.02);
        }

        .post-glass-card:hover {
          transform: translateY(-12px);
          border-color: #0d9488;
          box-shadow: 0 20px 40px rgba(13, 148, 136, 0.1);
        }

        .accent-teal-text { color: #0d9488; font-weight: 800; }

        .loader-ring {
          width: 50px; height: 50px;
          border: 4px solid #f3f3f3;
          border-top: 4px solid #0d9488;
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }
        @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }

        .modal-glass-light {
          background: rgba(255, 255, 255, 0.9) !important;
          backdrop-filter: blur(40px) saturate(180%);
          border-radius: 40px !important;
          border: 1px solid white !important;
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.1) !important;
        }

        .share-pill-light {
          background: #f8fafc;
          padding: 12px 30px;
          border-radius: 100px;
          display: inline-flex;
          gap: 25px;
          border: 1px solid #e2e8f0;
          font-size: 1.2rem;
          color: #64748b;
        }
        .share-pill-light i:hover { color: #0d9488; cursor: pointer; }

        .admin-action-btn {
          width: 38px; height: 38px;
          border-radius: 12px;
          display: flex; align-items: center; justify-content: center;
          transition: 0.3s;
          background: white;
          border: 1px solid #e2e8f0;
          color: #64748b;
        }
        .admin-action-btn:hover { background: #0d9488; color: white; border-color: #0d9488; }

        /* Custom Quill Overrides for White Theme */
        .editor-container-light {
          background: white;
          border-radius: 24px;
          border: 1px solid #e2e8f0;
          overflow: hidden;
        }
        .ql-toolbar.ql-snow { border: none !important; border-bottom: 1px solid #f1f5f9 !important; background: #f8fafc; }
        .ql-container.ql-snow { border: none !important; }
      `}</style>

      <div className="container">
        <div className="header-glass-section text-center">
          <div className="accent-teal-text mb-2" style={{letterSpacing: '5px', fontSize: '0.75rem', textTransform: 'uppercase'}}>Global Perspective</div>
          <h1 className="display-3 fw-bold mb-3" style={{letterSpacing: '-2px'}}>Innovative <span className="accent-teal-text">Insights</span></h1>
          
          {isLoggedIn ? (
            <div className="d-flex justify-content-center gap-3 mt-4">
              <button 
                className="btn btn-dark rounded-pill px-4 py-2 d-flex align-items-center gap-2 fw-bold"
                onClick={() => setEditingPost({ title: '', content: '', author: ADMIN_USER })}
              >
                <HiOutlinePlusCircle size={20} /> CREATE INSIGHT
              </button>
              <button className="btn btn-outline-danger rounded-pill px-4 py-2 d-flex align-items-center gap-2 fw-bold" onClick={handleLogout}>
                <HiOutlineLogout /> LOGOUT
              </button>
            </div>
          ) : (
            <p className="text-muted mx-auto fs-5" style={{maxWidth: '550px'}}>Elevating healthcare through expert knowledge and technological strategy.</p>
          )}
        </div>

        {loading && page === 1 && (
          <div className="text-center py-5">
            <div className="loader-ring mx-auto"></div>
            <p className="mt-4 accent-teal-text small fw-bold tracking-widest">SYNCHRONIZING...</p>
          </div>
        )}

        <div className="row g-4 justify-content-center">
          {posts.map((post, index) => {
            const isLast = index === posts.length - 1;
            const imageUrl = post.content.match(/src="([^"]+)"/)?.[1];
            return (
              <div key={post.id} className="col-lg-4 col-md-6" ref={isLast ? lastPostRef : null}>
                <div className="post-glass-card p-3" onClick={() => setSelectedPost(post)}>
                  
                  {isLoggedIn && (
                    <div className="position-absolute top-0 end-0 p-3 d-flex gap-2" style={{zIndex: 10}}>
                      <button className="admin-action-btn" 
                        onClick={(e) => { e.stopPropagation(); setEditingPost(post); }}>
                        <HiOutlinePencilAlt />
                      </button>
                      <button className="admin-action-btn" 
                        onClick={(e) => handleDelete(e, post.id)}>
                        <HiOutlineTrash />
                      </button>
                    </div>
                  )}

                  <div className="rounded-4 overflow-hidden mb-4" style={{height: '220px', background: '#f8fafc'}}>
                    {imageUrl ? <img src={imageUrl} alt="" className="w-100 h-100 object-fit-cover" /> : 
                      <div className="h-100 d-flex align-items-center justify-content-center text-muted opacity-20">
                        <FaFeatherAlt size={50} />
                      </div>
                    }
                  </div>
                  <div className="px-2 pb-2">
                    <span className="small text-muted fw-bold text-uppercase tracking-wider" style={{fontSize: '0.7rem'}}>
                      {new Date(post.date || Date.now()).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                    </span>
                    <h4 className="fw-bold mt-2 mb-3" style={{color: '#1e293b', lineHeight: '1.3'}}>{post.title}</h4>
                    <div className="accent-teal-text small fw-bold d-flex align-items-center gap-2">
                      READ FULL INSIGHT <HiOutlineArrowRight />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {loading && page > 1 && (
          <div className="text-center py-5">
            <div className="spinner-border text-teal" style={{color: '#0d9488'}}></div>
          </div>
        )}
      </div>

      {/* LOGIN MODAL */}
      <Modal show={showLoginModal} onHide={() => setShowLoginModal(false)} centered contentClassName="modal-glass-light">
        <Modal.Header closeButton className="border-0 px-4 pt-4">
          <Modal.Title className="fw-bold accent-teal-text">ADMIN GATEWAY</Modal.Title>
        </Modal.Header>
        <Modal.Body className="p-4">
          <form onSubmit={handleLogin}>
            <div className="mb-3">
              <label className="small fw-bold text-muted mb-2">Access Identity</label>
              <input 
                type="text" 
                className="form-control border-light-subtle py-2 rounded-3"
                onChange={e => setLoginCreds({...loginCreds, user: e.target.value})} 
                required
              />
            </div>
            <div className="mb-4">
              <label className="small fw-bold text-muted mb-2">Secure Key</label>
              <input 
                type="password" 
                className="form-control border-light-subtle py-2 rounded-3"
                onChange={e => setLoginCreds({...loginCreds, pass: e.target.value})} 
                required
              />
            </div>
            <button type="submit" className="btn btn-dark w-100 rounded-pill fw-bold py-3 shadow-sm">AUTHENTICATE SYSTEM</button>
          </form>
        </Modal.Body>
      </Modal>

      {/* VIEW POST MODAL */}
      <Modal show={!!selectedPost} onHide={() => setSelectedPost(null)} size="lg" centered contentClassName="modal-glass-light">
        <Modal.Header closeButton className="border-0 p-4"></Modal.Header>
        <Modal.Body className="px-4 px-md-5 pb-5">
          <div className="text-center mb-5">
            <h1 className="fw-bold mb-4" style={{color: '#1e293b', letterSpacing: '-1px'}}>{selectedPost?.title}</h1>
            <div className="share-pill-light">
              <FaLinkedinIn onClick={() => handleShare('linkedin')} />
              <FaTwitter onClick={() => handleShare('twitter')} />
              <FaLink onClick={() => handleShare('copy')} />
            </div>
          </div>
          <div className="post-content ql-editor px-0" 
               style={{color: '#475569', fontSize: '1.2rem', lineHeight: '1.8'}} 
               dangerouslySetInnerHTML={{ __html: selectedPost?.content || '' }} />
        </Modal.Body>
      </Modal>

      {/* EDIT/CREATE MODAL */}
      <Modal show={!!editingPost} onHide={() => setEditingPost(null)} size="xl" centered contentClassName="modal-glass-light">
        <Modal.Header closeButton className="border-0 px-4">
          <Modal.Title className="fw-bold accent-teal-text">
            {editingPost?.id ? 'REFINE INSIGHT' : 'NEW SYSTEM INSIGHT'}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="p-4">
          <input 
            type="text" 
            className="form-control form-control-lg border-light-subtle mb-4 rounded-3 fw-bold"
            placeholder="Insight Title"
            value={editingPost?.title || ''}
            onChange={(e) => setEditingPost({...editingPost, title: e.target.value})}
          />
          <div className="editor-container-light">
            <ReactQuill 
              theme="snow"
              value={editingPost?.content || ''}
              onChange={(content) => setEditingPost({...editingPost, content})}
              modules={{
                blotFormatter: {},
                toolbar: [
                  [{ 'header': [1, 2, 3, false] }],
                  ['bold', 'italic', 'underline', 'strike'],
                  [{'list': 'ordered'}, {'list': 'bullet'}],
                  ['link', 'image', 'video'],
                  ['clean']
                ],
              }}
            />
          </div>
          <button 
            className="btn btn-dark w-100 mt-4 py-3 fw-bold rounded-pill shadow" 
            onClick={handleSavePost}
            disabled={loading}
          >
            {loading ? 'PROCESSING...' : (editingPost?.id ? 'COMMIT UPDATES' : 'PUBLISH TO NETWORK')}
          </button>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Blog;