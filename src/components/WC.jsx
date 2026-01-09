import React from 'react';

const WorkersComp = () => {
  return (
    <div className="wc-wrapper">
      <style>{`
        .wc-wrapper {
          background: #0f172a;
          background-image: radial-gradient(at 100% 100%, rgba(56, 189, 248, 0.06) 0%, transparent 50%);
          min-height: 100vh;
          padding: 160px 0 100px;
          color: white;
        }
        .dashboard-glass {
          background: rgba(255, 255, 255, 0.02);
          backdrop-filter: blur(30px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 40px;
          padding: 50px;
        }
        .feature-tag {
          background: rgba(0, 255, 204, 0.1);
          color: #00ffcc;
          padding: 5px 15px;
          border-radius: 100px;
          font-size: 0.8rem;
          font-weight: 700;
          border: 1px solid rgba(0, 255, 204, 0.2);
        }
        .status-item {
          border-bottom: 1px solid rgba(255,255,255,0.05);
          padding: 20px 0;
        }
        .status-item:last-child { border: none; }
      `}</style>

      <div className="container">
        <div className="dashboard-glass">
          <div className="row align-items-center mb-5">
            <div className="col-lg-7">
              <span className="feature-tag mb-3 d-inline-block">SPECIALIZED RCM</span>
              <h1 className="display-4 fw-bold">Workers' <span style={{color: '#38bdf8'}}>Compensation</span></h1>
              <p className="lead opacity-60">We eliminate the friction of adjusters and attorneys, ensuring your claims are paid at the highest possible rate.</p>
            </div>
            <div className="col-lg-5 text-center">
              <div className="p-4 rounded-4" style={{background: 'rgba(56, 189, 248, 0.05)', border: '1px solid rgba(56, 189, 248, 0.2)'}}>
                <h2 className="fw-bold mb-0">98.4%</h2>
                <p className="small mb-0 opacity-50">CLAIM APPROVAL RATE</p>
              </div>
            </div>
          </div>

          <div className="row g-4">
            <div className="col-md-6">
              <div className="p-4 rounded-4 h-100" style={{background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)'}}>
                <h5 className="fw-bold mb-4">The IMS Difference</h5>
                <div className="status-item d-flex justify-content-between align-items-center">
                  <span>Aggressive Adjuster Follow-up</span>
                  <i className="fas fa-check-circle" style={{color: '#00ffcc'}}></i>
                </div>
                <div className="status-item d-flex justify-content-between align-items-center">
                  <span>E-Billing Compliance</span>
                  <i className="fas fa-check-circle" style={{color: '#00ffcc'}}></i>
                </div>
                <div className="status-item d-flex justify-content-between align-items-center">
                  <span>Legal Liaison Support</span>
                  <i className="fas fa-check-circle" style={{color: '#00ffcc'}}></i>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="p-4 rounded-4 h-100" style={{background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)'}}>
                <h5 className="fw-bold mb-4">Required Documentation</h5>
                <p className="small opacity-50">Our automated system tracks and secures all necessary attachments:</p>
                <ul className="list-unstyled">
                  <li className="mb-2"><i className="fas fa-file-invoice-dollar me-2" style={{color: '#38bdf8'}}></i> PR-2 & PR-4 Reports</li>
                  <li className="mb-2"><i className="fas fa-file-invoice-dollar me-2" style={{color: '#38bdf8'}}></i> Request for Authorization (RFA)</li>
                  <li className="mb-2"><i className="fas fa-file-invoice-dollar me-2" style={{color: '#38bdf8'}}></i> Proof of Service Documentation</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkersComp;