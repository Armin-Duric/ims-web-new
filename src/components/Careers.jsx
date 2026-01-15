import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Modal from 'react-bootstrap/Modal';
import { 
  HiOutlineLocationMarker, 
  HiOutlineMail, 
  HiOutlinePlus, 
  HiOutlineTrash, 
  HiOutlinePencilAlt,
  HiOutlineBriefcase,
  HiOutlineArrowRight 
} from 'react-icons/hi';

const API_ENDPOINT = '/api/careers';

const Careers = () => {
  const [jobPostings, setJobPostings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedId, setExpandedId] = useState(null);
  
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [loginCreds, setLoginCreds] = useState({ user: '', pass: '' });
  const [editingJob, setEditingJob] = useState(null);

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
      alert("Invalid credentials");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('isAdmin');
    setIsLoggedIn(false);
    window.location.reload();
  };

  const fetchJobs = async () => {
    setLoading(true);
    try {
      const res = await fetch(API_ENDPOINT);
      const data = await res.json();
      const sanitizedData = data.map(job => ({
        ...job,
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

  const handleSaveJob = async () => {
    if (!editingJob.position || !editingJob.description) return alert("Position and Description required");
    setLoading(true);
    const isEdit = Boolean(editingJob.id);
    const method = isEdit ? 'PUT' : 'POST';
    const url = isEdit ? `${API_ENDPOINT}?id=${editingJob.id}` : API_ENDPOINT;

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
        fetchJobs();
      }
    } catch (err) {
      alert("Network error");
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

  const updateList = (field, index, value) => {
    const newList = [...editingJob[field]];
    newList[index] = value;
    setEditingJob({ ...editingJob, [field]: newList });
  };

  const addListItem = (field) => {
    setEditingJob({ ...editingJob, [field]: [...editingJob[field], ""] });
  };

  return (
    <div className="careers-warm-page">
      <style>{`
        .careers-warm-page { 
          background: #faf9f6; 
          min-height: 100vh; 
          padding: 140px 0 100px; 
          color: #334155; 
          font-family: 'Inter', system-ui, sans-serif;
        }

        .section-tag-warm {
          color: #0d9488;
          text-transform: uppercase;
          letter-spacing: 2px;
          font-weight: 700;
          font-size: 0.85rem;
        }

        .job-warm-card {
          background: #ffffff;
          border: 1px solid #e2e8f0;
          border-radius: 24px;
          padding: 40px;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          cursor: pointer;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
        }

        .job-warm-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
          border-color: #0d9488;
        }

        .job-warm-card.expanded {
          border-color: #0d9488;
          cursor: default;
          background: #fdfdfb;
        }

        .btn-warm-primary {
          background: #0d9488;
          color: #ffffff;
          border: none;
          padding: 12px 32px;
          border-radius: 12px;
          font-weight: 600;
          transition: 0.3s;
          text-decoration: none;
          display: inline-block;
        }

        .btn-warm-primary:hover {
          background: #0f766e;
          box-shadow: 0 10px 15px -3px rgba(13, 148, 136, 0.3);
          color: #fff;
        }

        .badge-warm {
          background: #f1f5f9;
          color: #475569;
          padding: 6px 14px;
          border-radius: 8px;
          font-size: 0.8rem;
          font-weight: 600;
        }

        .form-control-warm {
          background: #ffffff;
          border: 1px solid #e2e8f0;
          color: #1e293b;
          border-radius: 10px;
          padding: 12px;
        }

        .form-control-warm:focus {
          border-color: #0d9488;
          box-shadow: 0 0 0 3px rgba(13, 148, 136, 0.1);
        }

        .modal-warm .modal-content {
          background: #faf9f6;
          border-radius: 28px;
          border: none;
          padding: 20px;
        }

        .text-muted-warm {
          color: #64748b;
        }
      `}</style>

      <div className="container">
        <header className="text-center mb-5 pb-4">
          <span className="section-tag-warm d-block mb-3">Careers</span>
          <h1 className="display-4 fw-bold text-slate-900 mb-3">Join the <span style={{color: '#0d9488'}}>IMS</span> Team</h1>
          <p className="lead text-muted-warm mx-auto" style={{ maxWidth: '600px' }}>
            Elevate your career with a team focused on excellence, innovation, and high-complexity medical recovery.
          </p>
        </header>

        {isLoggedIn && (
          <div className="d-flex justify-content-center gap-3 mb-5">
            <button className="btn btn-outline-teal rounded-pill px-4 fw-bold" style={{borderColor: '#0d9488', color: '#0d9488'}} onClick={() => setEditingJob({ position: '', location: '', description: '', requirements: [''], benefits: [''], applyEmail: 'careers@imsillinois.com' })}>
              <HiOutlinePlus className="me-2" /> NEW POSTING
            </button>
            <button className="btn btn-outline-secondary rounded-pill px-4 fw-bold" onClick={handleLogout}>
              LOGOUT
            </button>
          </div>
        )}

        <div className="row g-4">
          {loading && !jobPostings.length ? (
            <div className="text-center py-5"><div className="spinner-border text-teal" style={{color: '#0d9488'}}></div></div>
          ) : jobPostings.length > 0 ? (
            jobPostings.map((job) => (
              <div className={expandedId === job.id ? "col-12" : "col-lg-4 col-md-6"} key={job.id}>
                <div className={`job-warm-card h-100 ${expandedId === job.id ? 'expanded' : ''}`} 
                     onClick={() => expandedId !== job.id && setExpandedId(job.id)}>
                  
                  {isLoggedIn && (
                    <div className="position-absolute" style={{ top: '20px', right: '20px', display: 'flex', gap: '8px' }}>
                      <button className="btn btn-light btn-sm rounded-circle shadow-sm" onClick={(e) => { e.stopPropagation(); setEditingJob(job); }}>
                        <HiOutlinePencilAlt className="text-primary" />
                      </button>
                      <button className="btn btn-light btn-sm rounded-circle shadow-sm" onClick={(e) => handleDeleteJob(e, job.id)}>
                        <HiOutlineTrash className="text-danger" />
                      </button>
                    </div>
                  )}

                  <div className="d-flex align-items-center mb-4">
                    <span className="badge-warm"><HiOutlineLocationMarker className="me-1" /> {job.location}</span>
                    {expandedId === job.id && <button className="btn-close ms-auto" onClick={() => setExpandedId(null)}></button>}
                  </div>

                  <h3 className="h4 fw-bold mb-3" style={{color: '#1e293b'}}>{job.position}</h3>
                  <p className="text-muted-warm lh-lg">{expandedId === job.id ? job.description : `${job.description.substring(0, 100)}...`}</p>

                  {expandedId === job.id && (
                    <div className="row mt-5 pt-4 border-top">
                      <div className="col-md-6 mb-4">
                        <h6 className="fw-bold text-uppercase mb-3" style={{ color: '#0d9488', fontSize: '0.75rem', letterSpacing: '1px' }}>What You'll Do</h6>
                        <ul className="list-unstyled text-muted-warm small">
                          {job.requirements.map((r, i) => <li key={i} className="mb-2 d-flex gap-2"><span>•</span> {r}</li>)}
                        </ul>
                      </div>
                      <div className="col-md-6 mb-4">
                        <h6 className="fw-bold text-uppercase mb-3" style={{ color: '#0d9488', fontSize: '0.75rem', letterSpacing: '1px' }}>Perks & Benefits</h6>
                        <ul className="list-unstyled text-muted-warm small">
                          {job.benefits.map((b, i) => <li key={i} className="mb-2 d-flex gap-2"><span>+</span> {b}</li>)}
                        </ul>
                      </div>
                      <div className="col-12 mt-4 text-center">
                        <a href={`mailto:${job.applyEmail}`} className="btn-warm-primary">Apply Now</a>
                      </div>
                    </div>
                  )}
                  {!expandedId && <div className="mt-4 text-teal fw-bold d-flex align-items-center gap-2" style={{color: '#0d9488', fontSize: '0.9rem'}}>Read Details <HiOutlineArrowRight /></div>}
                </div>
              </div>
            ))
          ) : (
            <div className="col-12 text-center py-5">
              <HiOutlineBriefcase size={40} className="mb-3 opacity-25" />
              <h5 className="text-muted">No open roles at the moment.</h5>
            </div>
          )}
        </div>

        {/* General Application Banner */}
        <div className="mt-5 pt-5">
          <div className="job-warm-card text-center py-5" style={{ background: '#f8fafc', borderStyle: 'dashed' }}>
            <h2 className="fw-bold mb-3">Don't see the right role?</h2>
            <p className="text-muted-warm mb-5 mx-auto" style={{ maxWidth: '600px' }}>
              We're always looking for brilliant minds. Send your CV to our general talent pool.
            </p>
            <a href="mailto:careers@imsillinois.com" className="btn-warm-primary shadow-sm">
              <HiOutlineMail className="me-2" /> General Application
            </a>
          </div>
        </div>
      </div>

      {/* Admin Login Modal */}
      <Modal show={showLoginModal} onHide={() => setShowLoginModal(false)} centered className="modal-warm">
        <Modal.Header closeButton className="border-0">
          <Modal.Title className="fw-bold">Admin Portal</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleLogin}>
            <div className="mb-3">
              <input type="text" className="form-control form-control-warm" placeholder="User" onChange={e => setLoginCreds({ ...loginCreds, user: e.target.value })} required />
            </div>
            <div className="mb-4">
              <input type="password" className="form-control form-control-warm" placeholder="Password" onChange={e => setLoginCreds({ ...loginCreds, pass: e.target.value })} required />
            </div>
            <button type="submit" className="btn-warm-primary w-100 py-3">Login</button>
          </form>
        </Modal.Body>
      </Modal>

      {/* Post/Edit Modal */}
      <Modal show={!!editingJob} onHide={() => setEditingJob(null)} size="lg" centered className="modal-warm">
        <Modal.Header closeButton className="border-0">
          <Modal.Title className="fw-bold" style={{ color: '#0d9488' }}>
            {editingJob?.id ? 'Update Posting' : 'Add New Position'}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row">
            <div className="col-md-8 mb-3">
              <label className="small fw-bold mb-2">Role Title</label>
              <input type="text" className="form-control form-control-warm" value={editingJob?.position || ''} onChange={e => setEditingJob({ ...editingJob, position: e.target.value })} />
            </div>
            <div className="col-md-4 mb-3">
              <label className="small fw-bold mb-2">Office Location</label>
              <input type="text" className="form-control form-control-warm" value={editingJob?.location || ''} onChange={e => setEditingJob({ ...editingJob, location: e.target.value })} />
            </div>
            <div className="col-12 mb-4">
              <label className="small fw-bold mb-2">Job Description</label>
              <textarea rows="4" className="form-control form-control-warm" value={editingJob?.description || ''} onChange={e => setEditingJob({ ...editingJob, description: e.target.value })}></textarea>
            </div>
            
            <div className="col-md-6 mb-3">
              <div className="d-flex justify-content-between mb-2"><label className="small fw-bold">Requirements</label><span className="text-teal small pointer" style={{color: '#0d9488'}} onClick={() => addListItem('requirements')}>+ New Row</span></div>
              {editingJob?.requirements.map((req, i) => (
                <input key={i} type="text" className="form-control form-control-warm mb-2" value={req} onChange={e => updateList('requirements', i, e.target.value)} />
              ))}
            </div>

            <div className="col-md-6 mb-3">
              <div className="d-flex justify-content-between mb-2"><label className="small fw-bold">Benefits</label><span className="text-teal small pointer" style={{color: '#0d9488'}} onClick={() => addListItem('benefits')}>+ New Row</span></div>
              {editingJob?.benefits.map((ben, i) => (
                <input key={i} type="text" className="form-control form-control-warm mb-2" value={ben} onChange={e => updateList('benefits', i, e.target.value)} />
              ))}
            </div>
          </div>
          <button className="btn-warm-primary w-100 mt-4 py-3" onClick={handleSaveJob} disabled={loading}>
            {loading ? 'Publishing...' : 'Save Job Posting'}
          </button>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Careers;