import React from 'react';

const WorkersCompensation = () => {
  return (
    <div className="py-5" style={{ minHeight: '100vh', background: 'linear-gradient(to bottom, #1a3c5e, #0a1e2f)' }}>
      <div className="container text-white py-5">
        <h1 className="display-4 fw-bold mb-4 text-center">Workers' Compensation Services</h1>
        <p className="lead mb-5 text-center">
          At Innovative Medical Solutions (IMS), we specialize in handling workers' compensation claims to ensure maximum reimbursement and compliance for your practice.
        </p>
        <div className="row g-4">
          <div className="col-md-6">
            <div className="card h-100 bg-dark text-white border-0 shadow-lg rounded-lg p-4">
              <h4 className="fw-bold mb-3">Expert Claim Management</h4>
              <p>
                Our certified team manages all aspects of workers' comp billing, from submission to appeals, reducing denials and accelerating payments.
              </p>
            </div>
          </div>
          <div className="col-md-6">
            <div className="card h-100 bg-dark text-white border-0 shadow-lg rounded-lg p-4">
              <h4 className="fw-bold mb-3">Compliance Assurance</h4>
              <p>
                We ensure full adherence to state-specific regulations and guidelines, minimizing risks and penalties for your practice.
              </p>
            </div>
          </div>
          <div className="col-md-6">
            <div className="card h-100 bg-dark text-white border-0 shadow-lg rounded-lg p-4">
              <h4 className="fw-bold mb-3">Revenue Optimization</h4>
              <p>
                Using advanced analytics, we identify opportunities to maximize collections on work-related injury claims.
              </p>
            </div>
          </div>
          <div className="col-md-6">
            <div className="card h-100 bg-dark text-white border-0 shadow-lg rounded-lg p-4">
              <h4 className="fw-bold mb-3">Dedicated Support</h4>
              <p>
                24/7 access to our specialists for prompt resolution of issues and personalized strategies tailored to your needs.
              </p>
            </div>
          </div>
        </div>
        <div className="text-center mt-5">
          <a
            href="/contact"
            className="btn btn-lg"
            style={{ backgroundColor: '#00ffcc', color: '#1a3c5e', border: 'none' }}
          >
            Contact Us for More Information
          </a>
        </div>
      </div>
    </div>
  );
};

export default WorkersCompensation;