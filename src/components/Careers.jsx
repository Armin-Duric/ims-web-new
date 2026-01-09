import React, { useState, useEffect } from 'react';

const API_ENDPOINT = '/api/careers';

const Careers = () => {
  const [jobPostings, setJobPostings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedId, setExpandedId] = useState(null);

  const fetchJobs = async () => {
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
    } catch (err) { console.error("Fetch error:", err); } finally { setLoading(false); }
  };

  useEffect(() => { fetchJobs(); }, []);

  return (
    <div className="careers-page">
      <style>{`
        .careers-page {
          background: radial-gradient(circle at top left, #1e293b, #0f172a);
          min-height: 100vh;
          padding: 120px 0 60px;
          color: #f8fafc;
        }

        .section-tag {
          color: #00ffcc;
          text-transform: uppercase;
          letter-spacing: 4px;
          font-size: 0.8rem;
          font-weight: 700;
        }

        /* Modern Glass Card */
        .modern-job-card {
          background: rgba(255, 255, 255, 0.02);
          backdrop-filter: blur(12px);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 24px;
          padding: 32px;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          cursor: pointer;
          position: relative;
          overflow: hidden;
        }

        .modern-job-card:hover {
          background: rgba(255, 255, 255, 0.05);
          border-color: rgba(0, 255, 204, 0.4);
          transform: translateY(-8px);
        }

        .modern-job-card.expanded {
          background: rgba(255, 255, 255, 0.04);
          border-color: #00ffcc;
          cursor: default;
        }

        /* Abstract Glow Orbs */
        .glow-orb {
          position: absolute;
          width: 300px;
          height: 300px;
          background: rgba(0, 255, 204, 0.05);
          filter: blur(100px);
          border-radius: 50%;
          z-index: 0;
        }

        /* General Application Section */
        .general-app-box {
          background: linear-gradient(135deg, rgba(0, 255, 204, 0.05) 0%, rgba(0, 255, 204, 0) 100%);
          border: 1px solid rgba(0, 255, 204, 0.2);
          border-radius: 32px;
          padding: 60px;
          text-align: center;
          margin-top: 100px;
        }

        .btn-modern-primary {
          background: #00ffcc;
          color: #0f172a;
          border: none;
          padding: 14px 32px;
          border-radius: 12px;
          font-weight: 700;
          transition: 0.3s;
          text-decoration: none;
          display: inline-block;
        }

        .btn-modern-primary:hover {
          background: #fff;
          box-shadow: 0 0 25px rgba(0, 255, 204, 0.4);
          transform: scale(1.02);
        }
      `}</style>

      <div className="glow-orb" style={{top: '10%', right: '-5%'}}></div>
      <div className="glow-orb" style={{bottom: '10%', left: '-5%'}}></div>

      <div className="container position-relative">
        <div className="text-center mb-5">
          <span className="section-tag">Opportunities</span>
          <h1 className="display-4 fw-bold mt-2">Join the Future of <span style={{color: '#00ffcc'}}>RCM</span></h1>
          <p className="text-white-50 mt-3">Shape the healthcare industry with a team that values innovation.</p>
        </div>

        {/* Job Listings Grid */}
        <div className="row g-4 justify-content-center">
          {loading ? (
            <div className="text-center py-5"><div className="spinner-border text-info"></div></div>
          ) : jobPostings.length > 0 ? (
            jobPostings.map((job) => (
              <div className={expandedId === job.id ? "col-12" : "col-md-6 col-lg-4"} key={job.id}>
                <div className={`modern-job-card ${expandedId === job.id ? 'expanded' : ''}`} 
                     onClick={() => expandedId !== job.id && setExpandedId(job.id)}>
                  
                  <div className="d-flex justify-content-between align-items-center mb-4">
                    <span className="badge rounded-pill" style={{background: 'rgba(255,255,255,0.05)', color: '#00ffcc', border: '1px solid rgba(0,255,204,0.2)'}}>
                      {job.location}
                    </span>
                    {expandedId === job.id && <button className="btn-close btn-close-white" onClick={() => setExpandedId(null)}></button>}
                  </div>

                  <h3 className="h4 fw-bold mb-3">{job.position}</h3>
                  <p className="text-white-50">{expandedId === job.id ? job.description : `${job.description.substring(0, 80)}...`}</p>

                  {expandedId === job.id && (
                    <div className="row mt-5 animate__animated animate__fadeIn">
                      <div className="col-md-6 mb-4">
                        <h6 className="fw-bold text-uppercase mb-3" style={{color: '#00ffcc', fontSize: '0.8rem'}}>The Requirements</h6>
                        <ul className="list-unstyled text-white-50">
                          {job.requirements.map((r, i) => <li key={i} className="mb-2">/ {r}</li>)}
                        </ul>
                      </div>
                      <div className="col-md-6 mb-4">
                        <h6 className="fw-bold text-uppercase mb-3" style={{color: '#00ffcc', fontSize: '0.8rem'}}>The Benefits</h6>
                        <ul className="list-unstyled text-white-50">
                          {job.benefits.map((b, i) => <li key={i} className="mb-2">+ {b}</li>)}
                        </ul>
                      </div>
                      <div className="col-12 mt-4">
                        <a href={`mailto:${job.applyEmail}`} className="btn-modern-primary">Apply for this Position</a>
                      </div>
                    </div>
                  )}
                  {!expandedId && <div className="mt-4 text-info small fw-bold">Click to view details →</div>}
                </div>
              </div>
            ))
          ) : (
            <div className="col-12 text-center py-5">
              <h5 className="text-white-50 italic">No specific openings currently available.</h5>
            </div>
          )}
        </div>

        {/* General Application Section */}
        <div className="row justify-content-center">
          <div className="col-lg-10">
            <div className="general-app-box">
              <h2 className="fw-bold mb-3">Don't see the right fit?</h2>
              <p className="text-white-50 mb-5 mx-auto" style={{maxWidth: '600px'}}>
                We're always looking for talented billing specialists, developers, and leaders. 
                Send us your resume and tell us how you can make an impact at IMS.
              </p>
              <a href="mailto:careers@imsillinois.com" className="btn-modern-primary shadow-lg">
                <i className="fas fa-paper-plane me-2"></i> Send General Application
              </a>
              <div className="mt-4 text-white-50 small">
                Email us at: <span className="text-white">careers@imsillinois.com</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Careers;