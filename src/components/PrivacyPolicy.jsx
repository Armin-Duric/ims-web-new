import React from 'react';
import { HiOutlineShieldCheck, HiOutlineLockClosed, HiOutlineMail } from 'react-icons/hi';

const PrivacyPolicy = () => {
  return (
    <div className="legal-glass-wrapper">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;600;700&display=swap');

        .legal-glass-wrapper {
          background: #faf9f6;
          min-height: 100vh;
          padding: 160px 0 100px;
          color: #334155;
          font-family: 'Plus Jakarta Sans', sans-serif;
          position: relative;
          overflow: hidden;
        }

        /* Soft Background Accents */
        .legal-bg-orb {
          position: absolute;
          border-radius: 50%;
          filter: blur(120px);
          z-index: 1;
          opacity: 0.3;
        }
        .orb-teal { width: 600px; height: 600px; background: #0d9488; top: -200px; right: -100px; }
        .orb-warm { width: 500px; height: 500px; background: #fcd34d; bottom: -100px; left: -100px; }

        .legal-glass-card {
          background: rgba(255, 255, 255, 0.5);
          backdrop-filter: blur(30px) saturate(150%);
          -webkit-backdrop-filter: blur(30px) saturate(150%);
          border: 1px solid rgba(255, 255, 255, 0.8);
          border-radius: 48px;
          padding: 80px 60px;
          box-shadow: 0 20px 50px rgba(0, 0, 0, 0.04);
          position: relative;
          z-index: 10;
        }

        .policy-tag {
          color: #0d9488;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 4px;
          font-size: 0.75rem;
          display: block;
          margin-bottom: 1.5rem;
        }

        .legal-content h3 {
          margin-top: 50px;
          font-weight: 700;
          color: #1e293b;
          font-size: 1.75rem;
          display: flex;
          align-items: center;
          gap: 15px;
        }

        .legal-content h3::before {
          content: "";
          width: 8px;
          height: 24px;
          background: #0d9488;
          border-radius: 4px;
          display: inline-block;
        }

        .legal-content p, .legal-content li {
          color: #64748b;
          line-height: 1.9;
          font-size: 1.15rem;
          margin-bottom: 1.5rem;
        }

        .hipaa-badge {
          background: #f0fdfa;
          border: 1px solid #ccfbf1;
          border-radius: 20px;
          padding: 30px;
          display: flex;
          align-items: center;
          gap: 20px;
          margin: 40px 0;
        }

        .icon-box-warm {
          width: 50px;
          height: 50px;
          background: white;
          color: #0d9488;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.5rem;
          box-shadow: 0 4px 10px rgba(0,0,0,0.05);
        }

        @media (max-width: 768px) {
          .legal-glass-card { padding: 40px 25px; border-radius: 30px; }
        }
      `}</style>

      <div className="legal-bg-orb orb-teal"></div>
      <div className="legal-bg-orb orb-warm"></div>

      <div className="container">
        <div className="legal-glass-card">
          <div className="text-center mb-5 pb-4">
            <span className="policy-tag">Privacy Framework</span>
            <h1 className="display-3 fw-bold mb-3" style={{ color: '#1e293b', letterSpacing: '-2px' }}>
              Data <span style={{ color: '#0d9488' }}>Privacy</span>
            </h1>
            <p className="text-muted fw-medium">Effective Date: January 15, 2026</p>
          </div>

          <div className="row justify-content-center">
            <div className="col-lg-10">
              <div className="legal-content">
                <p className="lead">At IMS, we recognize that your data is your practice's most valuable asset. This policy outlines our rigorous standards for data collection, usage, and protection within the healthcare ecosystem.</p>

                <h3>1. Information We Collect</h3>
                <p>We collect information that you provide directly to us, such as when you initialize a Practice Profile, request a system integration, or contact our support team. This primarily includes clinical administrative data, provider credentials, and professional contact details.</p>

                <h3>2. How We Use Your Information</h3>
                <p>All data processed through our systems is used strictly to optimize your Revenue Cycle Management (RCM). This includes:</p>
                <ul className="list-unstyled ps-3">
                  <li><HiOutlineShieldCheck className="me-2 text-teal" style={{color: '#0d9488'}} /> Improving claim acceptance rates and workflow efficiency.</li>
                  <li><HiOutlineShieldCheck className="me-2 text-teal" style={{color: '#0d9488'}} /> Processing secure financial transactions.</li>
                  <li><HiOutlineShieldCheck className="me-2 text-teal" style={{color: '#0d9488'}} /> Ensuring full compliance with evolving healthcare regulations.</li>
                </ul>

                <div className="hipaa-badge">
                  <div className="icon-box-warm"><HiOutlineLockClosed /></div>
                  <div>
                    <h5 className="fw-bold mb-1" style={{color: '#0f766e'}}>HIPAA Certified Protocol</h5>
                    <p className="small mb-0 opacity-100">Our systems utilize AES-256 bit encryption and dedicated secure servers to maintain PHI integrity at all times.</p>
                  </div>
                </div>

                <h3>3. Data Security</h3>
                <p>We implement a multi-layered defense strategy to maintain the safety of your information. Our infrastructure is continuously monitored for unauthorized access attempts, and we conduct bi-annual security audits to ensure your data remains in a high-fortress environment.</p>

                <h3>4. Healthcare Compliance</h3>
                <p>As your RCM partner, we act as a Business Associate under HIPAA guidelines. We are committed to the security of Protected Health Information (PHI) and strictly follow the HITECH Act requirements for data breach notification and security management.</p>

                <div className="mt-5 p-5 border-top text-center">
                  <h4 className="fw-bold mb-4">Questions regarding your privacy?</h4>
                  <div className="d-flex justify-content-center gap-4">
                    <a href="mailto:support@ims-rcm.com" className="text-decoration-none d-flex align-items-center gap-2 fw-bold" style={{color: '#0d9488'}}>
                      <HiOutlineMail size={24} /> contact@imsillinois.com
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;