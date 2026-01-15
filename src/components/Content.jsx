import React from 'react';
// Added HiOutlinePresentationChartLine to the import list below
import { 
  HiOutlineLightBulb, 
  HiOutlineSparkles, 
  HiOutlineShieldCheck, 
  HiArrowRight, 
  HiOutlineGlobeAlt, 
  HiOutlinePresentationChartLine 
} from 'react-icons/hi';

const Content = () => {
  return (
    <div className="content-modern-wrapper">
      <style>{`
        .content-modern-wrapper {
          position: relative;
          padding: 180px 0;
          background: #fafaf9; /* Warm Bone/White */
          overflow: hidden;
        }

        /* Abstract Mesh Gradient Background */
        .mesh-gradient {
          position: absolute;
          top: 0;
          left: 50%;
          transform: translateX(-50%);
          width: 100%;
          height: 100%;
          background: 
            radial-gradient(at 10% 20%, rgba(37, 99, 235, 0.05) 0px, transparent 50%),
            radial-gradient(at 90% 80%, rgba(124, 58, 237, 0.05) 0px, transparent 50%);
          z-index: 0;
        }

        /* The "Glass Portal" Container */
        .premium-action-card {
          background: rgba(255, 255, 255, 0.7);
          backdrop-filter: blur(20px) saturate(160%);
          -webkit-backdrop-filter: blur(20px) saturate(160%);
          border-radius: 50px;
          border: 1px solid rgba(255, 255, 255, 0.8);
          padding: 6rem 4rem;
          box-shadow: 
            0 20px 50px rgba(0, 0, 0, 0.03),
            0 1px 2px rgba(0, 0, 0, 0.02);
          position: relative;
          z-index: 2;
          text-align: center;
        }

        /* Floating Accent Elements */
        .floating-element {
          position: absolute;
          background: #ffffff;
          border-radius: 20px;
          padding: 15px;
          box-shadow: 0 10px 25px rgba(0,0,0,0.05);
          display: flex;
          align-items: center;
          gap: 12px;
          font-weight: 700;
          font-size: 0.9rem;
          color: #0f172a;
          animation: floatUpDown 6s ease-in-out infinite;
          z-index: 3;
          border: 1px solid #f1f5f9;
        }

        @keyframes floatUpDown {
          0%, 100% { transform: translateY(0) translateX(0); }
          50% { transform: translateY(-20px) translateX(10px); }
        }

        .cta-headline {
          font-size: clamp(2.5rem, 5vw, 4rem);
          font-weight: 900;
          line-height: 1.1;
          letter-spacing: -0.04em;
          color: #0f172a;
          margin-bottom: 1.5rem;
        }

        .text-gradient-blue {
          background: linear-gradient(90deg, #2563eb, #7c3aed);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .btn-premium-cta {
          background: #0f172a;
          color: #ffffff;
          padding: 24px 50px;
          border-radius: 100px;
          font-weight: 800;
          font-size: 1.1rem;
          display: inline-flex;
          align-items: center;
          gap: 15px;
          transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
          text-decoration: none;
          box-shadow: 0 15px 30px rgba(15, 23, 42, 0.2);
        }

        .btn-premium-cta:hover {
          transform: scale(1.05);
          background: #2563eb;
          box-shadow: 0 20px 40px rgba(37, 99, 235, 0.3);
          color: #fff;
        }

        .audit-tag {
          display: inline-block;
          background: #eff6ff;
          color: #2563eb;
          padding: 8px 20px;
          border-radius: 100px;
          font-weight: 800;
          font-size: 0.75rem;
          text-transform: uppercase;
          letter-spacing: 2px;
          margin-bottom: 2rem;
        }

        .bg-line {
          position: absolute;
          height: 1px;
          background: linear-gradient(90deg, transparent, #e2e8f0, transparent);
          width: 100%;
          left: 0;
        }
      `}</style>

      <div className="mesh-gradient"></div>
      
      <div className="bg-line" style={{ top: '20%' }}></div>
      <div className="bg-line" style={{ top: '50%' }}></div>
      <div className="bg-line" style={{ top: '80%' }}></div>

      <div className="container position-relative">
        
        {/* Floating "Success Indicators" */}
        <div className="floating-element d-none d-lg-flex" style={{ top: '-40px', left: '0' }}>
          <div className="p-2 bg-primary rounded-lg text-white" style={{display: 'flex'}}><HiOutlinePresentationChartLine /></div>
          <span>+24% Revenue Lift</span>
        </div>

        <div className="floating-element d-none d-lg-flex" style={{ bottom: '20px', right: '0', animationDelay: '2s' }}>
          <div className="p-2 bg-success rounded-lg text-white" style={{display: 'flex'}}><HiOutlineShieldCheck /></div>
          <span>HIPAA Certified</span>
        </div>

        <div className="premium-action-card">
          <div className="audit-tag">Complimentary Practice Analysis</div>
          
          <h2 className="cta-headline">
            Stop guessing your <br />
            <span className="text-gradient-blue">Financial Health.</span>
          </h2>

          <p className="lead mx-auto mb-5 text-secondary" style={{ maxWidth: '750px', fontSize: '1.25rem', fontWeight: 500 }}>
            We provide specialized RCM audits for Orthopedic and PT practices. 
            Identify coding gaps, reduce denials, and uncover hidden revenue in 48 hours.
          </p>

          <div className="d-flex flex-column align-items-center gap-4">
            <a href="/contact" className="btn-premium-cta">
              Run Performance Audit <HiArrowRight />
            </a>
            
            <div className="d-flex align-items-center gap-4 mt-2">
              <div className="d-flex align-items-center gap-2 text-muted small fw-bold">
                <HiOutlineGlobeAlt className="text-primary" /> SOC-2 Verified
              </div>
              <div className="d-flex align-items-center gap-2 text-muted small fw-bold">
                <HiOutlineSparkles className="text-primary" /> Zero Initial Cost
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Content;