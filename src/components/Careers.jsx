// src/components/Careers.jsx
import React, { useState, useEffect } from 'react';

const API_ENDPOINT = '/api/careers';

const Careers = () => {
  const [jobPostings, setJobPostings] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [expandedId, setExpandedId] = useState(null);

  const [newJob, setNewJob] = useState({
    position: '',
    description: '',
    requirements: [''],
    benefits: [''],
    location: '',
    applyEmail: 'careers@ims.com'
  });

  const ADMIN_USER = import.meta.env.VITE_ADMIN_USERNAME || 'admin';
  const ADMIN_PASS = import.meta.env.VITE_ADMIN_PASSWORD || 'password';
  const TOKEN_SECRET = import.meta.env.VITE_AUTH_TOKEN_SECRET || 'fallback-secret-2025';

  const fetchJobs = async () => {
    try {
      const res = await fetch(API_ENDPOINT);
      const data = await res.json();
      const sanitizedData = data.map(job => ({
        ...job,
        requirements: typeof job.requirements === 'string' ? JSON.parse(job.requirements) : (job.requirements || []),
        benefits: typeof job.benefits === 'string' ? JSON.parse(job.benefits) : (job.benefits || [])
      }));
      setJobPostings(sanitizedData);
    } catch (err) { console.error("Fetch error:", err); } finally { setLoading(false); }
  };

  useEffect(() => {
    // RESTORED LOGIN LOGIC
    const token = localStorage.getItem('authToken');
    if (token) {
      try {
        const decoded = atob(token).split(':');
        if (decoded[0] === ADMIN_USER && decoded[1] === ADMIN_PASS && decoded[3] === TOKEN_SECRET) {
          setIsLoggedIn(true);
        }
      } catch (e) { localStorage.removeItem('authToken'); }
    }
    fetchJobs();
  }, [ADMIN_USER, ADMIN_PASS, TOKEN_SECRET]);

  const logout = () => {
    localStorage.removeItem('authToken');
    setIsLoggedIn(false);
    alert('Logged out');
  };

  const addField = (type) => setNewJob(prev => ({ ...prev, [type]: [...prev[type], ''] }));
  const updateField = (type, index, value) => setNewJob(prev => {
    const list = [...prev[type]]; list[index] = value; return { ...prev, [type]: list };
  });
  const removeField = (type, index) => setNewJob(prev => ({
    ...prev, [type]: prev[type].filter((_, i) => i !== index)
  }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(API_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newJob)
      });
      if (response.ok) { fetchJobs(); setShowForm(false); }
    } catch (err) { alert('Save failed'); }
  };

  const deleteJob = async (id) => {
    if (!confirm('Delete this posting?')) return;
    try {
      const response = await fetch(`${API_ENDPOINT}?id=${id}`, { method: 'DELETE' });
      if (response.ok) setJobPostings(prev => prev.filter(j => j.id !== id));
    } catch (err) { alert('Delete failed'); }
  };

  return (
    <div className="py-5" style={{ background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)', minHeight: '100vh' }}>
      <div className="container py-5">
        <div className="text-center mb-5 text-white">
          <h1 className="display-4 fw-bold mb-3">Careers at IMS</h1>
          {isLoggedIn && (
            <div className="d-flex justify-content-center gap-3 mt-3">
              <button onClick={() => setShowForm(true)} className="btn btn-success px-4">Add New Job</button>
              <button onClick={logout} className="btn btn-outline-danger px-4">Logout</button>
            </div>
          )}
        </div>

        {/* ... (Keep your Form JSX here if needed) ... */}

        <div className="row g-4 justify-content-center">
          {jobPostings.map((job) => {
            const isExpanded = expandedId === job.id;
            return (
              <div className={isExpanded ? "col-12" : "col-md-6 col-lg-4"} key={job.id}>
                <div 
                  className={`card h-100 border-0 shadow-lg ${isExpanded ? 'bg-white text-dark' : 'text-white'}`}
                  style={{ 
                    borderRadius: '20px',
                    background: isExpanded ? '#fff' : 'rgba(255, 255, 255, 0.08)',
                    backdropFilter: isExpanded ? 'none' : 'blur(12px)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    transition: 'all 0.3s ease'
                  }}
                >
                  {isLoggedIn && (
                    <button onClick={(e) => {e.stopPropagation(); deleteJob(job.id);}} 
                      className="btn btn-danger btn-sm position-absolute top-0 end-0 m-3 z-3">×</button>
                  )}
                  
                  <div className="card-body p-4 border border-white rounded-4">
                    <span className={`badge ${isExpanded ? 'bg-primary' : 'bg-info'} mb-3 card-body-st`} style={{fontSize: "15px"}}>{job.location}</span>
                    <h4 className={`fw-bold mb-3 ${isExpanded ? 'text-primary' : 'text-white'}`}>{job.position}</h4>
                    
                    {!isExpanded ? (
                      <div onClick={() => setExpandedId(job.id)} style={{ cursor: 'pointer' }}>
                        <p className="small opacity-75 mb-3">{job.description.substring(0, 100)}...</p>
                        
                        <div className="row mb-3">
                          <div className="col-6">
                            <p className="text-info small fw-bold mb-1">REQ:</p>
                            <ul className="list-unstyled mb-0" style={{ fontSize: '0.75rem' }}>
                              {job.requirements?.slice(0, 2).map((r, i) => <li key={i} className="text-truncate">• {r}</li>)}
                            </ul>
                          </div>
                          <div className="col-6">
                            <p className="text-success small fw-bold mb-1">BENEFITS:</p>
                            <ul className="list-unstyled mb-0" style={{ fontSize: '0.75rem' }}>
                              {job.benefits?.slice(0, 2).map((b, i) => <li key={i} className="text-truncate">✦ {b}</li>)}
                            </ul>
                          </div>
                        </div>
                        <button className="btn btn-sm btn-outline-info w-100 rounded-pill">View Full Posting</button>
                      </div>
                    ) : (
                      <div className="animate__animated animate__fadeIn">
                        <hr />
                        <p className="lead">{job.description}</p>
                        <div className="row mt-4">
                          <div className="col-md-6 mb-3">
                            <h6 className="fw-bold text-primary text-uppercase small mb-3">Requirements</h6>
                            <ul className="list-unstyled">
                              {job.requirements?.map((r, i) => <li key={i} className="mb-2 small">✔ {r}</li>)}
                            </ul>
                          </div>
                          <div className="col-md-6 mb-3">
                            <h6 className="fw-bold text-success text-uppercase small mb-3">Benefits</h6>
                            <ul className="list-unstyled">
                              {job.benefits?.map((b, i) => <li key={i} className="mb-2 small">✦ {b}</li>)}
                            </ul>
                          </div>
                        </div>
                        <div className="d-flex gap-2 mt-4">
                          <a href={`mailto:${job.apply_email}`} className="btn btn-primary px-4">Apply Now</a>
                          <button onClick={() => setExpandedId(null)} className="btn btn-outline-secondary">Close</button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Careers;