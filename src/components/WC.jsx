import React from 'react';
import { 
  HiOutlineShieldCheck, 
  HiOutlineDocumentReport, 
  HiOutlineScale, 
  HiOutlineCheckCircle,
  HiOutlineTrendingUp
} from 'react-icons/hi';

const WorkersComp = () => {
  return (
    <div className="wc-glass-wrapper">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;600;800&display=swap');

        .wc-glass-wrapper {
          background: #faf9f6;
          min-height: 100vh;
          padding: 160px 0 100px;
          color: #334155;
          font-family: 'Plus Jakarta Sans', sans-serif;
          position: relative;
          overflow: hidden;
        }

        /* Frosted Background Elements */
        .wc-bg-orb {
          position: absolute;
          border-radius: 50%;
          filter: blur(100px);
          z-index: 1;
          opacity: 0.25;
        }
        .orb-teal-wc { width: 500px; height: 500px; background: #0d9488; top: -100px; right: -50px; }
        .orb-blue-wc { width: 600px; height: 600px; background: #38bdf8; bottom: -150px; left: -100px; }

        .dashboard-glass-card {
          background: rgba(255, 255, 255, 0.45);
          backdrop-filter: blur(30px) saturate(160%);
          -webkit-backdrop-filter: blur(30px) saturate(160%);
          border: 1px solid rgba(255, 255, 255, 0.8);
          border-radius: 48px;
          padding: 60px;
          box-shadow: 0 20px 40px rgba(0,0,0,0.03);
          position: relative;
          z-index: 10;
        }

        .wc-feature-tag {
          background: #f0fdfa;
          color: #0d9488;
          padding: 6px 18px;
          border-radius: 100px;
          font-size: 0.75rem;
          font-weight: 800;
          letter-spacing: 1.5px;
          border: 1px solid #ccfbf1;
          text-transform: uppercase;
        }

        .stat-badge-frosted {
          background: #ffffff;
          border: 1px solid #e2e8f0;
          border-radius: 30px;
          padding: 40px;
          text-align: center;
          transition: 0.4s;
          box-shadow: 0 10px 20px rgba(0,0,0,0.02);
        }

        .stat-badge-frosted:hover {
          border-color: #0d9488;
          transform: translateY(-5px);
        }

        .wc-status-box {
          background: rgba(255, 255, 255, 0.6);
          border: 1px solid #f1f5f9;
          border-radius: 24px;
          padding: 30px;
          height: 100%;
        }

        .status-line {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 18px 0;
          border-bottom: 1px solid #f1f5f9;
        }

        .status-line:last-child { border-bottom: none; }

        .icon-circle-wc {
          width: 42px;
          height: 42px;
          background: #f0fdfa;
          color: #0d9488;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.2rem;
        }

        .doc-list-item {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 10px 0;
          font-weight: 600;
          color: #475569;
        }
      `}</style>

      <div className="wc-bg-orb orb-teal-wc"></div>
      <div className="wc-bg-orb orb-blue-wc"></div>

      <div className="container">
        <div className="dashboard-glass-card">
          <div className="row align-items-center mb-5">
            <div className="col-lg-7">
              <span className="wc-feature-tag mb-3 d-inline-block">Specialized RCM</span>
              <h1 className="display-4 fw-bold mb-3" style={{ color: '#1e293b', letterSpacing: '-2px' }}>
                Workers' <span style={{ color: '#0d9488' }}>Compensation</span>
              </h1>
              <p className="lead text-muted fs-5">
                We navigate the complexity of adjusters and attorneys, 
                streamlining the bridge between clinical care and legal reimbursement.
              </p>
            </div>
            <div className="col-lg-5">
              <div className="stat-badge-frosted">
                <div className="d-flex justify-content-center align-items-center gap-3 mb-2">
                  <HiOutlineTrendingUp className="text-teal" style={{color:'#0d9488'}} size={32} />
                  <h2 className="display-4 fw-bold mb-0" style={{color: '#1e293b'}}>98.4%</h2>
                </div>
                <p className="fw-bold text-muted small mb-0 uppercase tracking-widest" style={{letterSpacing: '2px'}}>Claim Approval Velocity</p>
              </div>
            </div>
          </div>

          <div className="row g-4">
            <div className="col-md-6">
              <div className="wc-status-box">
                <div className="d-flex align-items-center gap-3 mb-4">
                  <div className="icon-circle-wc"><HiOutlineShieldCheck /></div>
                  <h5 className="fw-bold mb-0">The IMS Difference</h5>
                </div>
                
                <div className="status-line">
                  <span className="fw-medium">Aggressive Adjuster Follow-up</span>
                  <HiOutlineCheckCircle style={{color: '#0d9488'}} size={22} />
                </div>
                <div className="status-line">
                  <span className="fw-medium">E-Billing Compliance</span>
                  <HiOutlineCheckCircle style={{color: '#0d9488'}} size={22} />
                </div>
                <div className="status-line">
                  <span className="fw-medium">Legal Liaison Support</span>
                  <HiOutlineCheckCircle style={{color: '#0d9488'}} size={22} />
                </div>
              </div>
            </div>

            <div className="col-md-6">
              <div className="wc-status-box" style={{ background: '#ffffff' }}>
                <div className="d-flex align-items-center gap-3 mb-4">
                  <div className="icon-circle-wc" style={{background: '#eff6ff', color: '#3b82f6'}}><HiOutlineDocumentReport /></div>
                  <h5 className="fw-bold mb-0">Required Documentation</h5>
                </div>
                <p className="small text-muted mb-4">Automated securing and tracking for all essential clinical attachments:</p>
                
                <div className="doc-list-item">
                  <HiOutlineScale className="text-primary" style={{color: '#3b82f6'}} />
                  <span>PR-2 & PR-4 Reports</span>
                </div>
                <div className="doc-list-item">
                  <HiOutlineScale className="text-primary" style={{color: '#3b82f6'}} />
                  <span>Request for Authorization (RFA)</span>
                </div>
                <div className="doc-list-item">
                  <HiOutlineScale className="text-primary" style={{color: '#3b82f6'}} />
                  <span>Proof of Service Documentation</span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-5 text-center p-4 border-top">
            <p className="text-muted small mb-0">
              Need immediate assistance with a complex claim? 
              <a href="/contact" className="ms-2 fw-bold text-decoration-none" style={{color: '#0d9488'}}>Contact Specialist →</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkersComp;