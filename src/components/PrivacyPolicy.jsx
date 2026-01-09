import React from 'react';

const PrivacyPolicy = () => {
  return (
    <div className="legal-wrapper">
      <style>{`
        .legal-wrapper {
          background: #0f172a;
          background-image: radial-gradient(at 0% 0%, rgba(56, 189, 248, 0.05) 0px, transparent 50%);
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
        }
        .cyan-text { color: #00ffcc; }
        .legal-content h3 { margin-top: 30px; font-weight: 700; color: #38bdf8; }
        .legal-content p, .legal-content li { opacity: 0.8; line-height: 1.8; font-size: 1.1rem; }
      `}</style>

      <div className="container">
        <div className="legal-glass animate__animated animate__fadeIn">
          <div className="text-center mb-5">
            <h6 className="text-uppercase fw-bold mb-3" style={{letterSpacing: '3px', color: '#38bdf8'}}>Compliance</h6>
            <h1 className="display-4 fw-bold">Privacy <span className="cyan-text">Policy</span></h1>
            <p className="opacity-50">Last Updated: January 2026</p>
          </div>

          <div className="legal-content">
            <h3>1. Information We Collect</h3>
            <p>We collect information that you provide directly to us, such as when you create an account, request a demo, or contact our support team. This may include your name, email address, job title, and clinic information.</p>

            <h3>2. How We Use Your Information</h3>
            <p>We use the information we collect to:</p>
            <ul>
              <li>Provide, maintain, and improve our RCM services.</li>
              <li>Process transactions and send related information.</li>
              <li>Respond to your comments, questions, and requests.</li>
              <li>Comply with HIPAA and other healthcare regulatory requirements.</li>
            </ul>

            <h3>3. Data Security</h3>
            <p>We implement a variety of security measures to maintain the safety of your personal information. We use state-of-the-art encryption and secure servers to ensure your data remains protected from unauthorized access.</p>

            <h3>4. HIPAA Compliance</h3>
            <p>As a provider of revenue cycle management services, we are committed to maintaining the privacy and security of Protected Health Information (PHI) in accordance with the Health Insurance Portability and Accountability Act (HIPAA).</p>

            <h3>5. Contact Us</h3>
            <p>If you have any questions about this Privacy Policy, please contact our data protection officer at support@ims-rcm.com.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;