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
  const [editingPost, setEditingPost] = useState(null);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [selectedPost, setSelectedPost] = useState(null);

  const ADMIN_USER = import.meta.env.VITE_ADMIN_USERNAME || 'admin';
  const ADMIN_PASS = import.meta.env.VITE_ADMIN_PASSWORD || 'password';
  const TOKEN_SECRET = import.meta.env.VITE_AUTH_TOKEN_SECRET || 'fallback-secret-2025';

  const observer = useRef();
  const lastPostRef = useCallback((node) => {
    if (loading) return;
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && hasMore) setPage(prev => prev + 1);
    });
    if (node) observer.current.observe(node);
  }, [loading, hasMore]);

  useEffect(() => {
    setLoading(true);
    // Simulating a slight delay for smoother transition
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
          -webkit-backdrop-filter: blur(25px);
          border: 1px solid rgba(255, 255, 255, 0.07);
          border-radius: 50px;
          padding: 70px 30px;
          margin-bottom: 60px;
        }

        .glass-card {
          background: rgba(255, 255, 255, 0.02);
          backdrop-filter: blur(15px);
          -webkit-backdrop-filter: blur(15px);
          border: 1px solid rgba(255, 255, 255, 0.06);
          border-radius: 35px;
          transition: all 0.4s ease;
          height: 100%;
          cursor: pointer;
          overflow: hidden;
        }

        .glass-card:hover {
          background: rgba(255, 255, 255, 0.05);
          border-color: rgba(0, 255, 204, 0.3);
          transform: translateY(-10px);
        }

        .cyan-text { color: #00ffcc; text-shadow: 0 0 15px rgba(0, 255, 204, 0.2); }

        /* Custom Loading Icon */
        .loader-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 50px;
        }

        .loader-pulse {
          width: 60px;
          height: 60px;
          background: #00ffcc;
          border-radius: 50%;
          animation: pulse 1.5s infinite ease-in-out;
          box-shadow: 0 0 20px rgba(0, 255, 204, 0.4);
        }

        @keyframes pulse {
          0% { transform: scale(0.8); opacity: 0.5; }
          50% { transform: scale(1.1); opacity: 1; }
          100% { transform: scale(0.8); opacity: 0.5; }
        }

        /* Modal Styles */
        .modal-glass {
          background: rgba(15, 23, 42, 0.8) !important;
          backdrop-filter: blur(40px);
          border-radius: 40px !important;
          border: 1px solid rgba(255, 255, 255, 0.1) !important;
        }

        .share-pill {
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(10px);
          padding: 10px 24px;
          border-radius: 100px;
          display: inline-flex;
          gap: 20px;
          border: 1px solid rgba(255,255,255,0.08);
          margin-top: 20px;
        }

        .share-pill i { 
          color: rgba(255,255,255,0.6); 
          transition: 0.3s; 
          cursor: pointer; 
        }
        .share-pill i:hover { color: #00ffcc; transform: scale(1.2); }
      `}</style>

      <div className="container">
        <div className="header-glass text-center animate__animated animate__fadeIn">
          <div className="cyan-text fw-bold mb-2" style={{letterSpacing: '5px', fontSize: '0.8rem'}}>IMS EXCLUSIVE</div>
          <h1 className="display-4 fw-bold">Innovative <span className="cyan-text">Insights</span></h1>
          <p className="opacity-50 mx-auto" style={{maxWidth: '550px'}}>Elevating healthcare through expert knowledge and technological strategy.</p>
        </div>

        {/* Loading Spinner for Initial Load */}
        {loading && page === 1 && (
          <div className="loader-container">
            <div className="loader-pulse"></div>
            <p className="mt-4 cyan-text small fw-bold">SYNCING DATA...</p>
          </div>
        )}

        <div className="row g-4 justify-content-center">
          {posts.map((post, index) => {
            const isLast = index === posts.length - 1;
            const imageUrl = post.content.match(/src="([^"]+)"/)?.[1];
            return (
              <div key={post.id} className="col-lg-4 col-md-6" ref={isLast ? lastPostRef : null}>
                <div className="glass-card p-3 animate__animated animate__zoomIn" onClick={() => setSelectedPost(post)}>
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

        {/* Bottom Loading for Infinite Scroll */}
        {loading && page > 1 && (
          <div className="text-center py-5">
            <div className="spinner-border text-info spinner-border-sm"></div>
          </div>
        )}
      </div>

      <Modal show={!!selectedPost} onHide={() => setSelectedPost(null)} size="lg" centered contentClassName="modal-glass">
        <Modal.Header closeButton closeVariant="white" className="border-0 p-4"></Modal.Header>
        <Modal.Body className="px-4 px-md-5 pb-5">
          <div className="text-center mb-5">
            <h2 className="fw-bold mb-4 text-white">{selectedPost?.title}</h2>
            <div className="share-pill">
              <i className="fab fa-linkedin" onClick={() => handleShare('linkedin')}></i>
              <i className="fab fa-twitter" onClick={() => handleShare('twitter')}></i>
              <i className="fas fa-link" onClick={() => handleShare('copy')}></i>
            </div>
          </div>
          <div className="post-content ql-editor" 
               style={{color: 'rgba(255,255,255,0.8)', fontSize: '1.1rem'}} 
               dangerouslySetInnerHTML={{ __html: selectedPost?.content || '' }} />
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Blog;