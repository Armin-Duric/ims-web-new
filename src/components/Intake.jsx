import React from 'react';
import { 
  HiOutlineClipboardCheck, 
  HiOutlineCloudUpload, 
  HiOutlineShieldCheck, 
  HiOutlineLightningBolt,
  HiOutlineArrowRight
} from 'react-icons/hi';

const ClientIntake = () => {
  const steps = [
    { 
      step: "01", 
      icon: <HiOutlineClipboardCheck />,
      title: "Practice Profile", 
      desc: "Comprehensive data collection focused on your specialty's unique billing DNA.",
      size: "col-lg-7" // Bento span
    },
    { 
      step: "02", 
      icon: <HiOutlineCloudUpload />,
      title: "Integration", 
      desc: "Deep-link EMR syncing with zero data-entry lag.",
      size: "col-lg-5" 
    },
    { 
      step: "03", 
      icon: <HiOutlineShieldCheck />,
      title: "Credentialing", 
      desc: "Ironclad enrollment verification.",
      size: "col-lg-5"
    },
    { 
      step: "04", 
      icon: <HiOutlineLightningBolt />,
      title: "Live Launch", 
      desc: "Real-time RCM commencement with immediate transparency dashboards.",
      size: "col-lg-7"
    }
  ];

  return (
    <div className="intake-luxury-wrapper">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;600;800&display=swap');

        .intake-luxury-wrapper {
          background: #fdfdfc;
          min-height: 100vh;
          padding: 180px 0 120px;
          color: #1a1a1a;
          font-family: 'Plus Jakarta Sans', sans-serif;
          overflow: hidden;
        }

        /* Cutting edge background texture */
        .intake-luxury-wrapper::before {
          content: "";
          position: absolute;
          top: 0; left: 0; width: 100%; height: 100%;
          background-image: radial-gradient(#0d9488 0.5px, transparent 0.5px);
          background-size: 32px 32px;
          opacity: 0.15;
          pointer-events: none;
        }

        .bento-card {
          background: #ffffff;
          border: 1px solid rgba(0,0,0,0.06);
          border-radius: 40px;
          padding: 50px;
          transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
          position: relative;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          height: 100%;
        }

        .bento-card:hover {
          background: #ffffff;
          border-color: #0d9488;
          box-shadow: 0 40px 80px -20px rgba(0, 0, 0, 0.08);
          transform: translateY(-5px) scale(1.01);
        }

        .icon-accent-box {
          width: 64px;
          height: 64px;
          background: #1a1a1a;
          color: #fff;
          border-radius: 20px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.8rem;
          margin-bottom: 30px;
          transition: 0.3s;
        }

        .bento-card:hover .icon-accent-box {
          background: #0d9488;
          transform: rotate(-5deg);
        }

        .step-pill {
          background: #f1f5f9;
          padding: 6px 16px;
          border-radius: 100px;
          font-weight: 800;
          font-size: 0.75rem;
          color: #0d9488;
          margin-bottom: 20px;
          display: inline-block;
        }

        .btn-luxury {
          background: #1a1a1a;
          color: #fff;
          padding: 20px 50px;
          border-radius: 100px;
          font-weight: 700;
          border: none;
          transition: 0.4s;
          display: inline-flex;
          align-items: center;
          gap: 15px;
          text-decoration: none;
        }

        .btn-luxury:hover {
          background: #0d9488;
          padding-right: 60px;
          color: #fff;
        }

        .title-reveal {
          font-size: clamp(2.5rem, 5vw, 4.5rem);
          font-weight: 800;
          letter-spacing: -2px;
          line-height: 0.95;
        }

        .floating-label {
          position: absolute;
          bottom: 40px;
          right: 40px;
          font-size: 5rem;
          font-weight: 900;
          color: rgba(0,0,0,0.03);
          user-select: none;
        }
      `}</style>

      <div className="container position-relative" style={{ zIndex: 2 }}>
        <header className="mb-5 pb-5">
          <div className="row align-items-end">
            <div className="col-lg-7">
              <span className="step-pill">Protocol v2.0</span>
              <h1 className="title-reveal">
                Engineered for <br />
                <span style={{ color: '#0d9488' }}>High Velocity.</span>
              </h1>
            </div>
            <div className="col-lg-5">
              <p className="lead text-muted mb-0">
                Forget traditional onboarding. We use a high-fidelity deployment model to sync your practice in record time.
              </p>
            </div>
          </div>
        </header>

        <div className="row g-4">
          {steps.map((item, idx) => (
            <div key={idx} className={item.size}>
              <div className="bento-card">
                <div className="floating-label">{item.step}</div>
                <div>
                  <div className="icon-accent-box shadow-sm">
                    {item.icon}
                  </div>
                  <h3 className="fw-bold mb-3 h2">{item.title}</h3>
                  <p className="text-muted fs-5 lh-base" style={{ maxWidth: '400px' }}>
                    {item.desc}
                  </p>
                </div>
                <div className="mt-4">
                  <span className="text-uppercase fw-bold small" style={{ letterSpacing: '2px', color: '#0d9488' }}>
                    Phase {item.step} Complete
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-5 pt-5">
          <div className="bento-card text-center align-items-center" style={{ background: '#f8fafc' }}>
            <h2 className="display-5 fw-bold mb-4">Ready to accelerate?</h2>
            <a href="/contact" className="btn-luxury">
              Initialize Intake <HiOutlineArrowRight size={24} />
            </a>
            <div className="mt-4 opacity-50 small">
              Deployment typical in &lt; 168 hours.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientIntake;