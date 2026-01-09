import React from 'react';
import { HiOutlineLightBulb, HiOutlineSparkles, HiOutlineShieldCheck } from 'react-icons/hi';

const Content = () => {
  return (
    <div className="content-wrapper">
      <style>{`
        /* 1. Modern Mesh Background */
        .content-wrapper {
          position: relative;
          padding: 100px 0;
          background: #0f172a; /* Deep slate base */
          overflow: hidden;
        }

        .content-wrapper::before {
          content: "";
          position: absolute;
          top: -20%;
          right: -10%;
          width: 500px;
          height: 500px;
          background: radial-gradient(circle, rgba(0, 255, 204, 0.15) 0%, rgba(0, 255, 204, 0) 70%);
          z-index: 0;
        }

        /* 2. Enhanced Glass Panel */
        .action-glass-panel {
          background: rgba(255, 255, 255, 0.03);
          backdrop-filter: blur(25px) saturate(180%);
          -webkit-backdrop-filter: blur(25px) saturate(180%);
          border-radius: 48px;
          border: 1px solid rgba(255, 255, 255, 0.12);
          padding: 6rem 3rem;
          box-shadow: 
            0 25px 50px -12px rgba(0, 0, 0, 0.5),
            inset 0 0 24px rgba(255, 255, 255, 0.02);
          position: relative;
          transition: transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        .action-glass-panel:hover {
          transform: translateY(-5px);
          border-color: rgba(0, 255, 204, 0.3);
        }

        /* 3. Glowing Button */
        .cta-btn-glass {
          background: #00ffcc;
          color: #0f172a;
          padding: 18px 48px;
          border-radius: 16px; /* Modern slightly rounded vs pill */
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 1px;
          border: none;
          transition: all 0.3s ease;
          text-decoration: none;
          display: inline-block;
          box-shadow: 0 0 20px rgba(0, 255, 204, 0.2);
        }

        .cta-btn-glass:hover {
          background: #ffffff;
          transform: scale(1.03);
          box-shadow: 0 15px 40px rgba(0, 255, 204, 0.4);
          color: #0f172a;
        }

        /* 4. Floating Icons UX */
        .icon-float {
          position: absolute;
          color: #00ffcc;
          filter: drop-shadow(0 0 15px rgba(0, 255, 204, 0.4));
          animation: float 6s ease-in-out infinite;
          z-index: 0;
        }

        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(0deg); opacity: 0.1; }
          50% { transform: translateY(-20px) rotate(5deg); opacity: 0.25; }
        }

        .accent-text {
          background: linear-gradient(90deg, #00ffcc, #00d9ff);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          font-weight: 800;
        }
      `}</style>

      <div className="container">
        <div className="action-glass-panel text-center">
          
          {/* Decorative Icons with staggered animations */}
          <HiOutlineLightBulb className="icon-float" style={{ top: '10%', left: '8%', fontSize: '90px', animationDelay: '0s' }} />
          <HiOutlineSparkles className="icon-float" style={{ bottom: '15%', right: '8%', fontSize: '80px', animationDelay: '1s' }} />
          <HiOutlineShieldCheck className="icon-float" style={{ top: '15%', right: '12%', fontSize: '60px', animationDelay: '2s' }} />

          <div className="row justify-content-center position-relative" style={{ zIndex: 2 }}>
            <div className="col-lg-10 col-xl-8">
              <h2 className="display-4 fw-bold mb-4 text-white" style={{ lineHeight: 1.2 }}>
                Struggling with Medical Billing?<br /> 
                <span className="accent-text">Let’s Fix It Together.</span>
              </h2>

              <p className="lead mb-5 text-white-50 px-lg-5" style={{ fontSize: '1.25rem', fontWeight: '400' }}>
                Feeling overwhelmed by claims and denials? 
                At <span className="text-white fw-bold">IMS</span>, we simplify your workflow 
                to boost revenue and focus on what matters: <span className="text-white">your patients.</span>
              </p>

              <div className="d-flex align-items-center justify-content-center gap-3 mb-5">
                <div style={{ height: '1px', width: '40px', background: 'rgba(0, 255, 204, 0.3)' }}></div>
                <span className="small text-uppercase fw-semibold" style={{ letterSpacing: '4px', color: '#00ffcc' }}>
                  Trusted RCM Excellence
                </span>
                <div style={{ height: '1px', width: '40px', background: 'rgba(0, 255, 204, 0.3)' }}></div>
              </div>

              <a href="/contact" className="cta-btn-glass">
                Get a Free Billing Audit
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Content;