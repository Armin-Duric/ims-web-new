import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Modal from 'react-bootstrap/Modal';

const API_ENDPOINT = '/api/careers';

const Careers = () => {
  const [jobPostings, setJobPostings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedId, setExpandedId] = useState(null);
  
  // Admin & Auth States
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [loginCreds, setLoginCreds] = useState({ user: '', pass: '' });
  const [editingJob, setEditingJob] = useState(null);

  const ADMIN_USER = import.meta.env.VITE_ADMIN_USERNAME;
  const ADMIN_PASS = import.meta.env.VITE_ADMIN_PASSWORD;
  const location = useLocation();

  // 1. Reuse Login Logic
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
      alert("Invalid credentials");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('isAdmin');
    setIsLoggedIn(false);
    window.location.reload();
  };

  // 2. Data Fetching
  const fetchJobs = async () => {
    setLoading(true);
    try {
      const res = await fetch(API_ENDPOINT);
      const data = await res.json();
      const sanitizedData = data.map(job => ({
        ...job,
        // Ensure lists are actual arrays for the UI
        requirements: Array.isArray(job.requirements) ? job.requirements : JSON.parse(job.requirements || "[]"),
        benefits: Array.isArray(job.benefits) ? job.benefits : JSON.parse(job.benefits || "[]"),
        applyEmail: job.applyEmail || job.apply_email || 'careers@imsillinois.com'
      }));
      setJobPostings(sanitizedData);
    } catch (err) { 
      console.error("Fetch error:", err); 
    } finally { 
      setLoading(false); 
    }
  };

  useEffect(() => { fetchJobs(); }, []);

  // 3. Admin Actions - FIXED SAVE LOGIC
  const handleSaveJob = async () => {
    if (!editingJob.position || !editingJob.description) return alert("Position and Description required");
    
    setLoading(true);
    const isEdit = Boolean(editingJob.id);
    const method = isEdit ? 'PUT' : 'POST';
    const url = isEdit ? `${API_ENDPOINT}?id=${editingJob.id}` : API_ENDPOINT;

    // We send requirements and benefits as clean ARRAYS, not JSON strings
    // This matches standard REST API expectations.
    const payload = {
      ...editingJob,
      requirements: editingJob.requirements.filter(item => item.trim() !== ""),
      benefits: editingJob.benefits.filter(item => item.trim() !== ""),
    };

    try {
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      
      if (res.ok) {
        setEditingJob(null);
        fetchJobs(); // Refresh the list
      } else {
        const errData = await res.json();
        alert(`Error: ${errData.message || "Failed to save"}`);
      }
    } catch (err) {
      alert("Network error: Failed to save job");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteJob = async (e, id) => {
    e.stopPropagation();
    if (!window.confirm("Delete this job posting?")) return;
    try {
      const res = await fetch(`${API_ENDPOINT}?id=${id}`, { method: 'DELETE' });
      if (res.ok) fetchJobs();
    } catch (err) {
      alert("Delete failed");
    }
  };

  // List Item Helpers
  const updateList = (field, index, value) => {
    const newList = [...editingJob[field]];
    newList[index] = value;
    setEditingJob({ ...editingJob, [field]: newList });
  };

  const addListItem = (field) => {
    setEditingJob({ ...editingJob, [field]: [...editingJob[field], ""] });
  };

  return (
    <div className="careers-page">
      <style>{`
        .careers-page { background: radial-gradient(circle at top left, #1e293b, #0f172a); min-height: 100vh; padding: 140px 0 60px; color: #f8fafc; }
        .section-tag { color: #00ffcc; text-transform: uppercase; letter-spacing: 4px; font-size: 0.8rem; font-weight: 700; }
        .modern-job-card { background: rgba(255, 255, 255, 0.02); backdrop-filter: blur(12px); border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 24px; padding: 32px; transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1); cursor: pointer; position: relative; overflow: hidden; height: 100%; }
        .modern-job-card:hover { background: rgba(255, 255, 255, 0.05); border-color: rgba(0, 255, 204, 0.4); transform: translateY(-8px); }
        .modern-job-card.expanded { background: rgba(255, 255, 255, 0.04); border-color: #00ffcc; cursor: default; }
        .btn-modern-primary { background: #00ffcc; color: #0f172a; border: none; padding: 14px 32px; border-radius: 12px; font-weight: 700; transition: 0.3s; text-decoration: none; display: inline-block; cursor: pointer; }
        .btn-modern-primary:hover { background: #fff; box-shadow: 0 0 25px rgba(0, 255, 204, 0.4); transform: scale(1.02); }
        .admin-controls { position: absolute; top: 15px; right: 15px; display: flex; gap: 8px; z-index: 10; }
        .modal-glass { background: rgba(15, 23, 42, 0.95) !important; backdrop-filter: blur(25px); border: 1px solid rgba(255,255,255,0.1) !important; border-radius: 30px !important; color: white; }
        .form-control-dark { background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); color: white; }
        .form-control-dark:focus { background: rgba(255,255,255,0.1); color: white; border-color: #00ffcc; box-shadow: none; }
        .glow-orb { position: absolute; width: 300px; height: 300px; background: rgba(0, 255, 204, 0.05); filter: blur(100px); border-radius: 50%; z-index: 0; }
        .general-app-box { background: linear-gradient(135deg, rgba(0, 255, 204, 0.05) 0%, rgba(0, 255, 204, 0) 100%); border: 1px solid rgba(0, 255, 204, 0.2); border-radius: 32px; padding: 60px; text-align: center; margin-top: 100px; }
      `}</style>

      <div className="glow-orb" style={{top: '10%', right: '-5%'}}></div>
      <div className="glow-orb" style={{bottom: '10%', left: '-5%'}}></div>

      <div className="container position-relative">
        <div className="text-center mb-5">
          <span className="section-tag">Opportunities</span>
          <h1 className="display-4 fw-bold mt-2">Join the Future of <span style={{color: '#00ffcc'}}>RCM</span></h1>
          
          {isLoggedIn && (
            <div className="d-flex justify-content-center gap-3 mt-4">
              <button 
                className="btn btn-outline-info rounded-pill px-5 fw-bold"
                onClick={() => setEditingJob({ position: '', location: '', description: '', requirements: [''], benefits: [''], applyEmail: 'careers@imsillinois.com' })}
              >
                <i className="fas fa-plus-circle me-2"></i> POST NEW JOB
              </button>
              <button className="btn btn-outline-danger rounded-pill px-5 fw-bold" onClick={handleLogout}>
                LOGOUT
              </button>
            </div>
          )}
        </div>

        <div className="row g-4 justify-content-center">
          {loading && !jobPostings.length ? (
            <div className="text-center py-5"><div className="spinner-border text-info"></div></div>
          ) : jobPostings.length > 0 ? (
            jobPostings.map((job) => (
              <div className={expandedId === job.id ? "col-12" : "col-md-6 col-lg-4"} key={job.id}>
                <div className={`modern-job-card ${expandedId === job.id ? 'expanded' : ''}`} 
                     onClick={() => expandedId !== job.id && setExpandedId(job.id)}>
                  
                  {isLoggedIn && (
                    <div className="admin-controls">
                      <button className="btn btn-dark btn-sm rounded-circle" onClick={(e) => { e.stopPropagation(); setEditingJob(job); }}>
                        <i className="fas fa-edit text-warning"></i>
                      </button>
                      <button className="btn btn-dark btn-sm rounded-circle" onClick={(e) => handleDeleteJob(e, job.id)}>
                        <i className="fas fa-trash text-danger"></i>
                      </button>
                    </div>
                  )}

                  <div className="d-flex justify-content-between align-items-center mb-4">
                    <span className="badge rounded-pill" style={{background: 'rgba(255,255,255,0.05)', color: '#00ffcc', border: '1px solid rgba(0,255,204,0.2)'}}>
                      {job.location}
                    </span>
                    {expandedId === job.id && <button className="btn-close btn-close-white" onClick={() => setExpandedId(null)}></button>}
                  </div>

                  <h3 className="h4 fw-bold mb-3">{job.position}</h3>
                  <p className="text-white-50">{expandedId === job.id ? job.description : `${job.description.substring(0, 80)}...`}</p>

                  {expandedId === job.id && (
                    <div className="row mt-5">
                      <div className="col-md-6 mb-4">
                        <h6 className="fw-bold text-uppercase mb-3" style={{color: '#00ffcc', fontSize: '0.8rem'}}>Requirements</h6>
                        <ul className="list-unstyled text-white-50 small">
                          {job.requirements.map((r, i) => <li key={i} className="mb-2">/ {r}</li>)}
                        </ul>
                      </div>
                      <div className="col-md-6 mb-4">
                        <h6 className="fw-bold text-uppercase mb-3" style={{color: '#00ffcc', fontSize: '0.8rem'}}>Benefits</h6>
                        <ul className="list-unstyled text-white-50 small">
                          {job.benefits.map((b, i) => <li key={i} className="mb-2">+ {b}</li>)}
                        </ul>
                      </div>
                      <div className="col-12 mt-4 text-center">
                        <a href={`mailto:${job.applyEmail}`} className="btn-modern-primary">Apply for this Position</a>
                      </div>
                    </div>
                  )}
                  {!expandedId && <div className="mt-4 text-info small fw-bold">Click to view details →</div>}
                </div>
              </div>
            ))
          ) : (
            <div className="col-12 text-center py-5"><h5 className="text-white-50 italic">No specific openings available.</h5></div>
          )}
        </div>

        <div className="row justify-content-center">
          <div className="col-lg-10">
            <div className="general-app-box">
              <h2 className="fw-bold mb-3">Don't see the right fit?</h2>
              <p className="text-white-50 mb-5 mx-auto" style={{maxWidth: '600px'}}>
                We're always looking for talented billing specialists, developers, and leaders. 
                Send us your resume and tell us how you can make an impact.
              </p>
              <a href="mailto:careers@imsillinois.com" className="btn-modern-primary shadow-lg">
                <i className="fas fa-paper-plane me-2"></i> Send General Application
              </a>
            </div>
          </div>
        </div>
      </div>

      <Modal show={showLoginModal} onHide={() => setShowLoginModal(false)} centered contentClassName="modal-glass">
        <Modal.Header closeButton closeVariant="white" className="border-0">
          <Modal.Title className="fw-bold" style={{color: '#00ffcc'}}>ADMIN ACCESS</Modal.Title>
        </Modal.Header>
        <Modal.Body className="p-4">
          <form onSubmit={handleLogin}>
            <input type="text" className="form-control bg-dark text-white mb-3" placeholder="Username" onChange={e => setLoginCreds({...loginCreds, user: e.target.value})} required />
            <input type="password" className="form-control bg-dark text-white mb-4" placeholder="Password" onChange={e => setLoginCreds({...loginCreds, pass: e.target.value})} required />
            <button type="submit" className="btn btn-info w-100 rounded-pill fw-bold">UNLOCK</button>
          </form>
        </Modal.Body>
      </Modal>

      <Modal show={!!editingJob} onHide={() => setEditingJob(null)} size="lg" centered contentClassName="modal-glass">
        <Modal.Header closeButton closeVariant="white" className="border-0">
          <Modal.Title className="fw-bold" style={{color: '#00ffcc'}}>
            {editingJob?.id ? 'EDIT POSTING' : 'CREATE POSTING'}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="p-4">
          <div className="row">
            <div className="col-md-8 mb-3"><label className="small opacity-50">Position</label><input type="text" className="form-control form-control-dark" value={editingJob?.position || ''} onChange={e => setEditingJob({...editingJob, position: e.target.value})} /></div>
            <div className="col-md-4 mb-3"><label className="small opacity-50">Location</label><input type="text" className="form-control form-control-dark" value={editingJob?.location || ''} onChange={e => setEditingJob({...editingJob, location: e.target.value})} /></div>
            <div className="col-12 mb-3"><label className="small opacity-50">Description</label><textarea rows="3" className="form-control form-control-dark" value={editingJob?.description || ''} onChange={e => setEditingJob({...editingJob, description: e.target.value})}></textarea></div>
            
            <div className="col-md-6 mb-3">
              <div className="d-flex justify-content-between mb-2"><label className="small opacity-50">Requirements</label><span className="text-info small pointer" onClick={() => addListItem('requirements')}>+ Add</span></div>
              {editingJob?.requirements.map((req, i) => (
                <input key={i} type="text" className="form-control form-control-dark mb-1" value={req} onChange={e => updateList('requirements', i, e.target.value)} />
              ))}
            </div>

            <div className="col-md-6 mb-3">
              <div className="d-flex justify-content-between mb-2"><label className="small opacity-50">Benefits</label><span className="text-info small pointer" onClick={() => addListItem('benefits')}>+ Add</span></div>
              {editingJob?.benefits.map((ben, i) => (
                <input key={i} type="text" className="form-control form-control-dark mb-1" value={ben} onChange={e => updateList('benefits', i, e.target.value)} />
              ))}
            </div>
          </div>
          <button className="btn-modern-primary w-100 mt-4" onClick={handleSaveJob} disabled={loading}>
            {loading ? 'SAVING...' : 'SAVE POSTING'}
          </button>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Careers;