import React from 'react';
import { HiOutlineDocumentText, HiOutlineScale, HiOutlineExclamationCircle } from 'react-icons/hi';

const TermsOfUse = () => {
  return (
    <div className="terms-glass-wrapper">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;600;700&display=swap');

        .terms-glass-wrapper {
          background: #faf9f6;
          min-height: 100vh;
          padding: 160px 0 100px;
          color: #334155;
          font-family: 'Plus Jakarta Sans', sans-serif;
          position: relative;
          overflow: hidden;
        }

        /* Subtle Geometric Background Orbs */
        .terms-bg-orb {
          position: absolute;
          border-radius: 50%;
          filter: blur(130px);
          z-index: 1;
          opacity: 0.25;
        }
        .orb-teal-top { width: 500px; height: 500px; background: #0d9488; top: -150px; left: 50%; transform: translateX(-50%); }
        .orb-bottom-gold { width: 400px; height: 400px; background: #fbbf24; bottom: -100px; right: 10%; }

        .terms-glass-card {
          background: rgba(255, 255, 255, 0.5);
          backdrop-filter: blur(35px) saturate(160%);
          -webkit-backdrop-filter: blur(35px) saturate(160%);
          border: 1px solid rgba(255, 255, 255, 0.85);
          border-radius: 48px;
          padding: 80px 60px;
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.03);
          position: relative;
          z-index: 10;
        }

        .terms-tag {
          color: #0d9488;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 4px;
          font-size: 0.75rem;
          display: block;
          margin-bottom: 1.5rem;
        }

        .terms-content h3 {
          margin-top: 45px;
          font-weight: 700;
          color: #1e293b;
          font-size: 1.6rem;
          display: flex;
          align-items: center;
          gap: 15px;
        }

        .terms-content h3::before {
          content: "";
          width: 6px;
          height: 24px;
          background: #fcd34d; /* Gold accent for Terms */
          border-radius: 3px;
        }

        .terms-content p, .terms-content li {
          color: #475569;
          line-height: 1.9;
          font-size: 1.1rem;
          margin-bottom: 1.4rem;
        }

        .license-callout {
          background: #ffffff;
          border: 1px solid #e2e8f0;
          border-radius: 24px;
          padding: 35px;
          margin: 30px 0;
          box-shadow: 0 10px 20px rgba(0,0,0,0.02);
        }

        .icon-circle-glass {
          width: 50px;
          height: 50px;
          background: #f0fdfa;
          color: #0d9488;
          border-radius: 14px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.4rem;
          margin-bottom: 20px;
        }

        @media (max-width: 768px) {
          .terms-glass-card { padding: 40px 25px; border-radius: 30px; }
        }
      `}</style>

      <div className="terms-bg-orb orb-teal-top"></div>
      <div className="terms-bg-orb orb-bottom-gold"></div>

      <div className="container">
        <div className="terms-glass-card">
          <div className="text-center mb-5">
            <span className="terms-tag">Service Agreement</span>
            <h1 className="display-4 fw-bold mb-3" style={{ color: '#1e293b', letterSpacing: '-2px' }}>
              Terms of <span style={{ color: '#0d9488' }}>Use</span>
            </h1>
            <p className="text-muted fw-medium">Last Revised: January 2026</p>
          </div>

          <div className="row justify-content-center">
            <div className="col-lg-10">
              <div className="terms-content">
                
                <h3>1. Acceptance of Terms</h3>
                <p>By accessing and using the IMS portal and RCM services, you acknowledge that you have read, understood, and agree to be bound by these Terms of Use and all applicable healthcare regulations. These terms constitute a legally binding agreement between you and IMS.</p>

                <div className="license-callout">
                  <div className="icon-circle-glass"><HiOutlineScale /></div>
                  <h4 className="fw-bold mb-3">2. Use License</h4>
                  <p className="mb-3">Permission is granted to temporarily access the materials on IMS's website for professional transitory viewing only. This is the grant of a license, not a transfer of title, and under this license, you may not:</p>
                  <ul className="list-unstyled">
                    <li className="d-flex align-items-start gap-2"><span style={{color:'#0d9488'}}>•</span> Modify or replicate proprietary billing algorithms.</li>
                    <li className="d-flex align-items-start gap-2"><span style={{color:'#0d9488'}}>•</span> Use materials for any unauthorized commercial data-mining.</li>
                    <li className="d-flex align-items-start gap-2"><span style={{color:'#0d9488'}}>•</span> Attempt to decompile or reverse engineer any software contained herein.</li>
                  </ul>
                </div>

                <h3>3. Service Disclaimer</h3>
                <p>The materials on IMS's website are provided on an 'as is' basis. IMS makes no warranties, expressed or implied, and hereby disclaims all other warranties including, without limitation, implied warranties or conditions of merchantability or fitness for a particular healthcare specialty.</p>

                <h3>4. Limitations of Liability</h3>
                <div className="d-flex gap-3 align-items-start p-3 rounded-4 mb-3" style={{background: '#fefce8', border: '1px solid #fef08a'}}>
                  <HiOutlineExclamationCircle className="mt-1" style={{color: '#ca8a04', flexShrink: 0}} />
                  <p className="small mb-0" style={{color: '#854d0e'}}>In no event shall IMS or its clinical partners be liable for any damages (including, without limitation, damages for loss of clinical data or profit, or due to business interruption) arising out of the use or inability to use the IMS platform.</p>
                </div>

                <h3>5. Governing Law</h3>
                <p>These terms and conditions are governed by and construed in accordance with the laws of your jurisdiction. You irrevocably submit to the exclusive jurisdiction of the courts in your specific State or location for the resolution of any disputes arising from these terms.</p>

                <div className="mt-5 pt-5 border-top">
                  <div className="d-flex flex-column align-items-center text-center">
                    <HiOutlineDocumentText size={40} className="mb-3 text-muted opacity-50" />
                    <p className="small text-muted mb-0">For legal inquiries or clarification regarding these terms, please contact our compliance department at <strong>legal@ims-rcm.com</strong>.</p>
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

export default TermsOfUse;