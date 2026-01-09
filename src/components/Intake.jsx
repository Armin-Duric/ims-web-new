import React from 'react';

const ClientIntake = () => {
  const intakeSteps = [
    { step: "01", title: "Practice Profile", desc: "Basic information, specialty details, and provider credentials." },
    { step: "02", title: "System Integration", desc: "Secure connection to your existing EMR/EHR platforms." },
    { step: "03", title: "Credentialing", desc: "Verification of insurance enrollments and billing privileges." },
    { step: "04", title: "Launch", desc: "Final workflow sync and live revenue cycle commencement." }
  ];

  return (
    <div className="intake-wrapper">
      <style>{`
        .intake-wrapper {
          background: #0f172a;
          background-image: radial-gradient(circle at 0% 0%, rgba(0, 255, 204, 0.05) 0%, transparent 50%);
          min-height: 100vh;
          padding: 160px 0 100px;
          color: white;
        }
        .step-card {
          background: rgba(255, 255, 255, 0.02);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 30px;
          padding: 40px;
          transition: 0.4s ease;
          position: relative;
          overflow: hidden;
        }
        .step-card:hover {
          background: rgba(255, 255, 255, 0.05);
          border-color: #00ffcc;
          transform: translateY(-10px);
        }
        .step-number {
          font-size: 5rem;
          font-weight: 900;
          position: absolute;
          top: -10px;
          right: -10px;
          opacity: 0.05;
          color: #00ffcc;
        }
        .cyan-dot {
          width: 12px;
          height: 12px;
          background: #00ffcc;
          border-radius: 50%;
          display: inline-block;
          margin-right: 15px;
          box-shadow: 0 0 10px #00ffcc;
        }
      `}</style>

      <div className="container">
        <div className="text-center mb-5 animate__animated animate__fadeIn">
          <h1 className="display-4 fw-bold">Seamless <span style={{color: '#00ffcc'}}>Onboarding</span></h1>
          <p className="opacity-50">Transitioning your practice to IMS is handled with surgical precision.</p>
        </div>

        <div className="row g-4">
          {intakeSteps.map((item, idx) => (
            <div key={idx} className="col-md-6 col-lg-3">
              <div className="step-card h-100 animate__animated animate__fadeInUp" style={{animationDelay: `${idx * 0.1}s`}}>
                <div className="step-number">{item.step}</div>
                <div className="d-flex align-items-center mb-3">
                  <div className="cyan-dot"></div>
                  <h4 className="fw-bold mb-0">{item.title}</h4>
                </div>
                <p className="small opacity-60 mb-0">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-5 p-5 text-center step-card border-cyan">
          <h3 className="fw-bold mb-3">Ready to begin?</h3>
          <p className="opacity-60 mb-4">The average intake process takes less than 7 business days.</p>
          <a href="/contact">
              <button className="btn btn-main px-5 py-3 rounded-pill fw-bold" style={{background: '#00ffcc', color: '#0f172a'}}>START INTAKE FORM</button>
          </a>
        </div>
      </div>
    </div>
  );
};

export default ClientIntake;