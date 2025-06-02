const Services = () => {
  return (
    <div className="py-5 gradient-bg">
      <div className="container text-white py-5">
        <h1 className="display-3 fw-bold mb-4 text-center">
          Our Expert Medical Billing Services
        </h1>
        <p className="lead mb-5 text-center">
          Elevate your practice with Innovative Management Solutions (IMS). We simplify the complexities of medical billing, ensuring maximum revenue and compliance with cutting-edge expertise.
        </p>
        <div className="row g-4 justify-content-center">
          <div className="col-md-4">
            <div className="card h-100 bg-dark text-white border-0 shadow-sm">
              <div className="card-body text-center">
                <i className="fas fa-code fa-3x mb-3"></i>
                <h4 className="card-title fw-bold">Medical Coding</h4>
                <p className="card-text">
                  Our certified coders optimize charge reimbursement, minimizing denials and appeals with precision and expertise tailored to your specialty.
                </p>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card h-100 bg-dark text-white border-0 shadow-sm">
              <div className="card-body text-center">
                <i className="fas fa-file-invoice-dollar fa-3x mb-3"></i>
                <h4 className="card-title fw-bold">Medical Billing</h4>
                <p className="card-text">
                  Customized billing solutions for all specialties, streamlining claims submission, appeals, and payment processing to enhance your revenue cycle.
                </p>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card h-100 bg-dark text-white border-0 shadow-sm">
              <div className="card-body text-center">
                <i className="fas fa-chart-line fa-3x mb-3"></i>
                <h4 className="card-title fw-bold">Accounts Receivable Services</h4>
                <p className="card-text">
                  Dedicated A/R specialists ensure timely follow-up with payers, accelerating claim processing and improving your cash flow efficiency.
                </p>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card h-100 bg-dark text-white border-0 shadow-sm">
              <div className="card-body text-center">
                <i className="fas fa-chart-pie fa-3x mb-3"></i>
                <h4 className="card-title fw-bold">Analytics & Reporting</h4>
                <p className="card-text">
                  Gain actionable insights with advanced analytics, empowering you to optimize your revenue cycle performance with confidence.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="text-center mt-5">
          <a
            href="/contact"
            className="btn btn-lg btn-primary"
            style={{ backgroundColor: '#00ffcc', color: '#1a3c5e', border: 'none' }}
            onMouseOver={(e) => {
              e.target.style.backgroundColor = '#00cc99';
              e.target.style.color = '#fff';
            }}
            onMouseOut={(e) => {
              e.target.style.backgroundColor = '#00ffcc';
              e.target.style.color = '#1a3c5e';
            }}
          >
            Request a Consultation
          </a>
        </div>
      </div>
    </div>
  );
};

export default Services;