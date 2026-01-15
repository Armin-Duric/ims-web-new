import React from 'react';
import { 
  HiOutlineShieldCheck, 
  HiOutlinePresentationChartLine, 
  HiOutlineDocumentSearch, 
  HiOutlineRefresh,
  HiOutlineLightningBolt
} from 'react-icons/hi';

const Audit = () => {
  const auditSteps = [
    { 
      title: "Compliance Review", 
      desc: "Checking adherence to the latest HIPAA & state-specific billing regulations.", 
      icon: <HiOutlineShieldCheck />
    },
    { 
      title: "Revenue Recovery", 
      desc: "Identifying underpaid claims and missed revenue opportunities from previous cycles.", 
      icon: <HiOutlinePresentationChartLine />
    },
    { 
      title: "Coding Accuracy", 
      desc: "Verifying ICD-10 and CPT codes to minimize denials and audit risks.", 
      icon: <HiOutlineDocumentSearch />
    },
    { 
      title: "Workflow Analysis", 
      desc: "Optimizing the path from patient intake to final payment collection.", 
      icon: <HiOutlineRefresh />
    }
  ];

  return (
    <div className="audit-glass-wrapper">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;600;800&display=swap');

        .audit-glass-wrapper {
          background: #faf9f6;
          min-height: 100vh;
          padding: 160px 0 100px;
          color: #334155;
          font-family: 'Plus Jakarta Sans', sans-serif;
          position: relative;
          overflow: hidden;
        }

        /* Soft Ambient Orbs */
        .audit-orb {
          position: absolute;
          border-radius: 50%;
          filter: blur(120px);
          z-index: 1;
          opacity: 0.3;
        }
        .orb-teal-audit { width: 600px; height: 600px; background: #0d9488; top: -100px; left: -100px; }
        .orb-gold-audit { width: 500px; height: 500px; background: #fbbf24; bottom: -100px; right: -50px; }

        .hero-glass-container {
          background: rgba(255, 255, 255, 0.4);
          backdrop-filter: blur(30px) saturate(160%);
          -webkit-backdrop-filter: blur(30px) saturate(160%);
          border: 1px solid rgba(255, 255, 255, 0.8);
          border-radius: 60px;
          padding: 80px 40px;
          margin-bottom: 60px;
          position: relative;
          z-index: 10;
          box-shadow: 0 20px 40px rgba(0,0,0,0.02);
          overflow: hidden;
        }

        /* Subtle Pearlescent Sweep */
        .hero-glass-container::after {
          content: "";
          position: absolute;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          background: conic-gradient(from 180deg at 50% 50%, transparent 0deg, rgba(13, 148, 136, 0.04) 180deg, transparent 360deg);
          animation: rotate-slow 25s linear infinite;
          z-index: -1;
        }

        @keyframes rotate-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        .audit-step-card {
          background: #ffffff;
          border: 1px solid #e2e8f0;
          border-radius: 40px;
          padding: 45px 35px;
          height: 100%;
          transition: all 0.5s cubic-bezier(0.2, 1, 0.3, 1);
          position: relative;
          z-index: 10;
          box-shadow: 0 10px 30px rgba(0,0,0,0.02);
        }

        .audit-step-card:hover {
          transform: translateY(-10px);
          border-color: #0d9488;
          box-shadow: 0 30px 60px -15px rgba(13, 148, 136, 0.15);
        }

        .icon-blob {
          width: 70px;
          height: 70px;
          background: #f0fdfa;
          border-radius: 20px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 25px;
          color: #0d9488;
          font-size: 2rem;
          transition: 0.4s;
        }

        .audit-step-card:hover .icon-blob {
          background: #0d9488;
          color: #ffffff;
          transform: rotate(8deg);
        }

        .btn-teal-action {
          background: #0d9488;
          color: white;
          border: none;
          padding: 16px 45px;
          border-radius: 100px;
          font-weight: 700;
          letter-spacing: 1px;
          transition: 0.4s;
          box-shadow: 0 10px 20px rgba(13, 148, 136, 0.2);
        }

        .btn-teal-action:hover {
          background: #0f766e;
          transform: scale(1.05);
          color: white;
        }

        .accent-text-teal {
          color: #0d9488;
          font-weight: 800;
        }

        .score-circle-bg {
          fill: none;
          stroke: #f1f5f9;
          stroke-width: 6;
        }

        .score-circle-value {
          fill: none;
          stroke: #0d9488;
          stroke-width: 6;
          stroke-linecap: round;
          transition: stroke-dasharray 1s ease;
        }
      `}</style>

      <div className="audit-orb orb-teal-audit"></div>
      <div className="audit-orb orb-gold-audit"></div>

      <div className="container">
        <div className="hero-glass-container text-center">
          <div className="mb-4 d-inline-flex align-items-center gap-2 px-4 py-2 rounded-pill" style={{background: '#ffffff', border: '1px solid #ccfbf1'}}>
            <HiOutlineLightningBolt className="accent-text-teal" />
            <span className="small fw-bold accent-text-teal uppercase tracking-widest" style={{letterSpacing: '2px'}}>Advanced Diagnostics</span>
          </div>
          <h1 className="display-3 fw-bold mb-4" style={{letterSpacing: '-2px'}}>The Revenue <span className="accent-text-teal">Audit</span></h1>
          <p className="lead text-muted mx-auto mb-5" style={{maxWidth: '650px'}}>
            A deep-dive investigation into your practice's billing DNA to unlock hidden capital and ensure permanent regulatory compliance.
          </p>
          <a href="/contact">
            <button className="btn-teal-action">INITIATE FREE REVIEW</button>
          </a>
        </div>

        <div className="row g-4">
          {auditSteps.map((step, idx) => (
            <div key={idx} className="col-lg-3 col-md-6">
              <div className="audit-step-card">
                <div className="icon-blob">
                  {step.icon}
                </div>
                <h4 className="fw-bold mb-3" style={{color: '#1e293b'}}>{step.title}</h4>
                <p className="text-muted small" style={{lineHeight: '1.7', fontSize: '1rem'}}>{step.desc}</p>
                <div className="mt-4 pt-3 border-top border-light">
                  <span className="small fw-bold opacity-30 tracking-widest">IM-00{idx + 1} MODULE</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Dynamic Insight Section */}
        <div className="mt-5 p-5 hero-glass-container">
          <div className="row align-items-center text-center text-md-start">
            <div className="col-md-8">
              <h2 className="fw-bold mb-3" style={{letterSpacing: '-1px'}}>Enterprise Insight Engine</h2>
              <p className="text-muted mb-4 fs-5">Our proprietary audits leverage machine learning to scan for CPT mismatches and payer-specific denial patterns across historical data.</p>
              <div className="d-flex justify-content-center justify-content-md-start gap-5">
                <div>
                  <h3 className="accent-text-teal mb-0">15%</h3>
                  <span className="small fw-bold text-muted">Avg. Revenue Lift</span>
                </div>
                <div className="border-start ps-5">
                  <h3 className="accent-text-teal mb-0">24hr</h3>
                  <span className="small fw-bold text-muted">Turnaround Time</span>
                </div>
              </div>
            </div>
            <div className="col-md-4 text-center mt-5 mt-md-0">
              <div style={{position: 'relative', display: 'inline-block'}}>
                <svg width="160" height="160" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="45" className="score-circle-bg" />
                  <circle cx="50" cy="50" r="45" className="score-circle-value" strokeDasharray="210 283" />
                </svg>
                <div style={{position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)'}}>
                  <h2 className="mb-0 fw-bold" style={{color: '#1e293b'}}>94</h2>
                </div>
              </div>
              <p className="small fw-bold mt-3 text-muted tracking-widest">COMPLIANCE RATING</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Audit;