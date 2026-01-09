import React from 'react';

const TermsOfUse = () => {
  return (
    <div className="legal-wrapper">
      <style>{`
        .legal-wrapper {
          background: #0f172a;
          background-image: radial-gradient(at 50% 0%, rgba(0, 255, 204, 0.05) 0px, transparent 50%);
          min-height: 100vh;
          padding: 160px 0 100px;
          color: #f8fafc;
        }
        .legal-glass {
          background: rgba(255, 255, 255, 0.02);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 40px;
          padding: 60px;
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
        }
        .cyan-text { color: #00ffcc; }
        .legal-content h3 { margin-top: 30px; font-weight: 700; color: #00ffcc; }
        .legal-content p, .legal-content li { opacity: 0.8; line-height: 1.8; font-size: 1.1rem; }
        @media (max-width: 768px) { .legal-glass { padding: 30px; border-radius: 25px; } }
      `}</style>

      <div className="container">
        <div className="legal-glass animate__animated animate__fadeIn">
          <div className="text-center mb-5">
            <h6 className="text-uppercase fw-bold mb-3" style={{letterSpacing: '3px', color: '#00ffcc'}}>Legal Documentation</h6>
            <h1 className="display-4 fw-bold">Terms of <span className="cyan-text">Use</span></h1>
            <p className="opacity-50">Last Updated: January 2026</p>
          </div>

          <div className="legal-content">
            <h3>1. Acceptance of Terms</h3>
            <p>By accessing and using the IMS website and services, you agree to be bound by these Terms of Use and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using or accessing this site.</p>

            <h3>2. Use License</h3>
            <p>Permission is granted to temporarily download one copy of the materials on IMS's website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license, you may not:</p>
            <ul>
              <li>Modify or copy the materials.</li>
              <li>Use the materials for any commercial purpose.</li>
              <li>Attempt to decompile or reverse engineer any software contained on the website.</li>
              <li>Remove any copyright or other proprietary notations from the materials.</li>
            </ul>

            <h3>3. Disclaimer</h3>
            <p>The materials on IMS's website are provided on an 'as is' basis. IMS makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.</p>

            <h3>4. Limitations</h3>
            <p>In no event shall IMS or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on IMS's website.</p>

            <h3>5. Governing Law</h3>
            <p>These terms and conditions are governed by and construed in accordance with the laws of your jurisdiction and you irrevocably submit to the exclusive jurisdiction of the courts in that State or location.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsOfUse;