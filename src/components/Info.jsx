import React, { useState } from 'react';
import { 
  HiOutlineShieldCheck, 
  HiOutlineChartBar, 
  HiOutlineUserGroup,
  HiX
} from 'react-icons/hi';

const Info = () => {
  const [activeFeature, setActiveFeature] = useState(null);

  const features = [
    {
      id: "security",
      title: "HIPAA-Compliant Security",
      shortDesc: "Enterprise-grade data protection designed for sensitive medical records.",
      icon: <HiOutlineShieldCheck />,
      details: "Our RCM platform uses 256-bit encryption and SOC-2 Type II certified protocols. We ensure that your patient data stays sovereign while maintaining 100% HIPAA compliance across all billing workflows.",
      color: "#2563eb"
    },
    {
      id: "rcm",
      title: "RCM Optimization",
      shortDesc: "Stop revenue leakage with surgical-grade billing and coding precision.",
      icon: <HiOutlineChartBar />,
      details: "By utilizing AI-driven claim scrubbing and expert human review, we reduce denial rates by an average of 38%. We specialize in complex orthopedic surgery and PT coding strings.",
      color: "#7c3aed"
    },
    {
      id: "team",
      title: "Specialized Expert Team",
      shortDesc: "Work with certified coders who understand the nuances of surgical claims.",
      icon: <HiOutlineUserGroup />,
      details: "Our team isn't just billing experts; they are specialists in Workers' Comp, No-Fault, and Personal Injury claims. We bridge the gap between clinical documentation and maximum reimbursement.",
      color: "#0f172a"
    }
  ];

  return (
    <section className="info-modern-section">
      <style>{`
        .info-modern-section {
          background: #fafaf9;
          padding: 100px 0;
          font-family: system-ui, -apple-system, sans-serif;
        }

        .bento-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 24px;
          margin-top: 48px;
        }

        .feature-card {
          background: #ffffff;
          border: 1px solid #e5e7eb;
          border-radius: 24px;
          padding: 40px;
          transition: all 0.3s ease;
          cursor: pointer;
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          text-align: left;
        }

        .feature-card:hover {
          border-color: #2563eb;
          transform: translateY(-5px);
          box-shadow: 0 20px 40px rgba(0,0,0,0.05);
        }

        .icon-box {
          font-size: 2.5rem;
          margin-bottom: 24px;
          color: #2563eb;
        }

        .learn-more-btn {
          margin-top: auto;
          background: none;
          border: none;
          color: #2563eb;
          font-weight: 700;
          padding: 0;
          font-size: 0.95rem;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        /* Modal / Window Styles */
        .modal-overlay {
          position: fixed;
          inset: 0;
          background: rgba(15, 23, 42, 0.6);
          backdrop-filter: blur(8px);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          padding: 20px;
        }

        .modal-window {
          background: white;
          width: 100%;
          max-width: 500px;
          border-radius: 32px;
          padding: 40px;
          position: relative;
          box-shadow: 0 30px 60px rgba(0,0,0,0.2);
          animation: modalSlide 0.3s ease-out;
        }

        @keyframes modalSlide {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .close-btn {
          position: absolute;
          top: 24px;
          right: 24px;
          background: #f1f5f9;
          border: none;
          border-radius: 50%;
          width: 36px;
          height: 36px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
        }
      `}</style>

      <div className="container">
        {/* SEO-Optimized Header */}
        <header className="text-center">
          <h2 className="display-5 fw-bold text-dark">Maximize Your Practice Revenue</h2>
          <p className="lead text-muted mx-auto" style={{ maxWidth: '650px' }}>
            IMS provides cutting-edge Medical Billing and Revenue Cycle Management (RCM) 
            tailored for Orthopedic and Surgical specialties.
          </p>
        </header>

        <div className="bento-grid">
          {features.map((feature) => (
            <article 
              key={feature.id} 
              className="feature-card"
              onClick={() => setActiveFeature(feature)}
            >
              <div className="icon-box" style={{ color: feature.color }}>
                {feature.icon}
              </div>
              <h3 className="h4 fw-bold mb-3 text-dark">{feature.title}</h3>
              <p className="text-muted mb-4">{feature.shortDesc}</p>
              <button className="learn-more-btn" aria-label={`Learn more about ${feature.title}`}>
                View Details <span>→</span>
              </button>
            </article>
          ))}
        </div>
      </div>

      {/* Detailed Info Window (Modal) */}
      {activeFeature && (
        <div className="modal-overlay" onClick={() => setActiveFeature(null)}>
          <div className="modal-window" onClick={e => e.stopPropagation()}>
            <button className="close-btn" onClick={() => setActiveFeature(null)}>
              <HiX />
            </button>
            <div className="icon-box" style={{ color: activeFeature.color }}>
              {activeFeature.icon}
            </div>
            <h3 className="h3 fw-bold mb-3 text-dark">{activeFeature.title}</h3>
            <p className="text-secondary fs-5 lh-lg">
              {activeFeature.details}
            </p>
            <button 
              className="btn btn-primary w-100 mt-4 py-3 rounded-pill fw-bold"
              onClick={() => window.location.href = '/contact'}
            >
              Speak to a Specialist
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default Info;