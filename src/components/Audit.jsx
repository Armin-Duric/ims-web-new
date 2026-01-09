import React from 'react';

const Audit = () => {
  const auditSteps = [
    { 
      title: "Compliance Review", 
      desc: "Checking adherence to the latest HIPAA & state-specific billing regulations.", 
      // SVG: Shield with pulse
      icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="M8 12h8"/></svg>
    },
    { 
      title: "Revenue Recovery", 
      desc: "Identifying underpaid claims and missed revenue opportunities from previous cycles.", 
      // SVG: Chart with upward trend
      icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>
    },
    { 
      title: "Coding Accuracy", 
      desc: "Verifying ICD-10 and CPT codes to minimize denials and audit risks.", 
      // SVG: Medical Document
      icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><path d="M14 2v6h6M12 18v-6M9 15h6"/></svg>
    },
    { 
      title: "Workflow Analysis", 
      desc: "Optimizing the path from patient intake to final payment collection.", 
      // SVG: Orbiting sync
      icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/><path d="M12 7v5l3 3"/></svg>
    }
  ];

  return (
    <div className="audit-wrapper">
      <style>{`
        .audit-wrapper {
          background: #0b0f1a;
          background-image: 
            radial-gradient(circle at 20% 20%, rgba(0, 255, 204, 0.05) 0%, transparent 40%),
            radial-gradient(circle at 80% 80%, rgba(56, 189, 248, 0.05) 0%, transparent 40%);
          min-height: 100vh;
          padding: 140px 0 100px;
          color: #f8fafc;
        }

        .hero-glass-panel {
          background: rgba(255, 255, 255, 0.01);
          backdrop-filter: blur(30px);
          -webkit-backdrop-filter: blur(30px);
          border: 1px solid rgba(255, 255, 255, 0.05);
          border-radius: 60px;
          padding: 80px 40px;
          margin-bottom: 80px;
          position: relative;
          overflow: hidden;
        }

        .hero-glass-panel::before {
          content: "";
          position: absolute;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          background: conic-gradient(from 180deg at 50% 50%, transparent 0deg, rgba(0, 255, 204, 0.03) 180deg, transparent 360deg);
          animation: rotate 20s linear infinite;
        }

        @keyframes rotate {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        .audit-card {
          background: rgba(255, 255, 255, 0.02);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 40px;
          padding: 45px 35px;
          height: 100%;
          transition: all 0.5s cubic-bezier(0.2, 1, 0.3, 1);
          position: relative;
        }

        .audit-card:hover {
          background: rgba(255, 255, 255, 0.06);
          border-color: rgba(0, 255, 204, 0.5);
          transform: scale(1.05);
          box-shadow: 0 30px 60px -12px rgba(0, 0, 0, 0.5);
        }

        .visual-blob {
          width: 80px;
          height: 80px;
          background: linear-gradient(135deg, rgba(0, 255, 204, 0.2), rgba(56, 189, 248, 0.1));
          border-radius: 24px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 30px;
          color: #00ffcc;
          position: relative;
          transition: 0.5s ease;
        }

        .audit-card:hover .visual-blob {
          transform: rotate(10deg);
          background: #00ffcc;
          color: #0b0f1a;
          box-shadow: 0 0 30px rgba(0, 255, 204, 0.4);
        }

        .visual-blob svg {
          width: 35px;
          height: 35px;
        }

        .cyan-glow-text {
          color: #00ffcc;
          text-shadow: 0 0 20px rgba(0, 255, 204, 0.4);
        }

        .btn-modern {
          background: transparent;
          border: 1px solid rgba(0, 255, 204, 0.5);
          color: #00ffcc;
          padding: 14px 45px;
          border-radius: 100px;
          font-weight: 600;
          letter-spacing: 1px;
          transition: 0.4s;
          position: relative;
          z-index: 2;
        }

        .btn-modern:hover {
          background: #00ffcc;
          color: #0b0f1a;
          box-shadow: 0 0 30px rgba(0, 255, 204, 0.3);
        }
      `}</style>

      <div className="container">
        <div className="hero-glass-panel text-center animate__animated animate__fadeIn">
          <div className="mb-4 d-inline-block px-3 py-1 rounded-pill" style={{background: 'rgba(0,255,204,0.05)', border: '1px solid rgba(0,255,204,0.1)'}}>
            <span className="small fw-bold cyan-glow-text">ADVANCED DIAGNOSTICS</span>
          </div>
          <h1 className="display-3 fw-bold mb-4">The Revenue <span className="cyan-glow-text">Audit</span></h1>
          <p className="lead opacity-50 mx-auto mb-5" style={{maxWidth: '600px'}}>
            A deep-dive investigation into your practice's billing DNA to unlock hidden capital and ensure compliance.
          </p>
            <a href="/contact">
                <button className="btn btn-modern">INITIATE FREE REVIEW</button>
            </a>
        </div>

        <div className="row g-5">
          {auditSteps.map((step, idx) => (
            <div key={idx} className="col-lg-3 col-md-6">
              <div className="audit-card animate__animated animate__fadeInUp" style={{animationDelay: `${idx * 0.1}s`}}>
                <div className="visual-blob">
                  {step.icon}
                </div>
                <h4 className="fw-bold mb-3">{step.title}</h4>
                <p className="small opacity-40 line-height-lg" style={{fontSize: '0.95rem'}}>{step.desc}</p>
                <div className="mt-4 pt-3 border-top border-white border-opacity-10">
                   <span className="small fw-bold opacity-30">IM-00{idx + 1} MODULE</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Dynamic Glass Scoreboard */}
        <div className="mt-5 p-5 hero-glass-panel">
          <div className="row align-items-center">
             <div className="col-md-8">
                <h2 className="fw-bold mb-3">Enterprise Insight</h2>
                <p className="opacity-40 mb-4">Our audits leverage machine learning to scan for CPT mismatches and payer-specific denial patterns.</p>
                <div className="d-flex gap-4">
                   <div>
                      <h4 className="cyan-glow-text mb-0">15%</h4>
                      <span className="small opacity-50">Avg. Revenue Increase</span>
                   </div>
                   <div className="border-start border-white border-opacity-10 ps-4">
                      <h4 className="cyan-glow-text mb-0">24hr</h4>
                      <span className="small opacity-50">Turnaround Time</span>
                   </div>
                </div>
             </div>
             <div className="col-md-4 text-center mt-5 mt-md-0">
                 <div style={{position: 'relative', display: 'inline-block'}}>
                    <svg width="150" height="150" viewBox="0 0 100 100">
                       <circle cx="50" cy="50" r="45" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="5" />
                       <circle cx="50" cy="50" r="45" fill="none" stroke="#00ffcc" strokeWidth="5" strokeDasharray="210 283" strokeLinecap="round" />
                    </svg>
                    <div style={{position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)'}}>
                       <h3 className="mb-0 fw-bold">94</h3>
                    </div>
                 </div>
                 <p className="small fw-bold mt-3 opacity-50">COMPLIANCE RATING</p>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Audit;