const Footer = () => {
  return (
    <footer className="footer-glass-section">
      <style>{`
        .footer-glass-section {
          background: #0f172a;
          padding: 80px 0 30px 0;
          border-top: 1px solid rgba(255, 255, 255, 0.05);
        }

        .footer-column h5 {
          color: #00ffcc;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 2px;
          font-size: 0.9rem;
          margin-bottom: 1.5rem;
        }

        .footer-link {
          color: rgba(255, 255, 255, 0.5);
          text-decoration: none;
          transition: all 0.3s ease;
          display: block;
          margin-bottom: 0.8rem;
          font-weight: 400;
        }

        .footer-link:hover {
          color: #fff;
          transform: translateX(5px);
        }

        .contact-card {
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 20px;
          padding: 25px;
        }

        .social-circle {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.05);
          display: inline-flex;
          align-items: center;
          justify-content: center;
          color: white;
          margin-right: 10px;
          transition: 0.3s;
        }

        .social-circle:hover {
          background: #00ffcc;
          color: #0f172a;
          transform: translateY(-3px);
        }
      `}</style>

      <div className="container">
        <div className="row g-5">
          {/* Brand Info */}
          <div className="col-lg-4 footer-column">
            <div className="contact-card">
              <h5 className="mb-4">Innovative Management Solutions</h5>
              <p className="text-white-50 small mb-4">
                Redefining Revenue Cycle Management through expertise and technology since 1991.
              </p>
              <div className="mb-2 small">
                <i className="fas fa-map-marker-alt text-primary me-2"></i> 
                440 North Wells; Suite 420, Chicago IL 60654
              </div>
              <div className="mb-2 small">
                <i className="fas fa-phone text-primary me-2"></i> (312) 796-9463
              </div>
              <a href="mailto:contact@imsillinois.com" className="footer-link small">
                <i className="fas fa-envelope text-primary me-2"></i> contact@imsillinois.com
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="col-md-4 col-lg-2 offset-lg-1 footer-column">
            <h5>Services</h5>
            <a href="/services" className="footer-link">RCM Solutions</a>
            <a href="/workers-comp" className="footer-link">Workers' Comp</a>
            <a href="/intake" className="footer-link">Client Intake</a>
            <a href="/audit" className="footer-link">Free Audit</a>
          </div>

          <div className="col-md-4 col-lg-2 footer-column">
            <h5>Company</h5>
            <a href="/about" className="footer-link">Our Story</a>
            {/* <a href="/history" className="footer-link">IMS History</a> */}
            <a href="/careers" className="footer-link">Join Our Team</a>
            <a href="/blog" className="footer-link">Insights</a>
          </div>

          <div className="col-md-4 col-lg-3 footer-column">
            <h5>Legal & Support</h5>
            <a href="/privacy" className="footer-link">Privacy Policy</a>
            <a href="/terms" className="footer-link">Terms of Use</a>
            <div className="mt-4">
              <a href="#" className="social-circle"><i className="fab fa-linkedin-in"></i></a>
              <a href="#" className="social-circle"><i className="fab fa-facebook-f"></i></a>
            </div>
          </div>
        </div>

        <hr className="my-5" style={{ borderColor: 'rgba(255,255,255,0.1)' }} />
        
        <div className="row align-items-center">
          <div className="col-md-6 text-center text-md-start">
            <p className="text-white-50 small mb-0">
              &copy; {new Date().getFullYear()} IMS. All rights reserved.
            </p>
          </div>
          <div className="col-md-6 text-center text-md-end mt-3 mt-md-0">
            <span className="text-white-50 small">Built for Healthcare Excellence</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
export default Footer