const Footer = () => {
  return (
    <footer className="footer-section text-white py-5">
      <div className="container">
        <div className="row">
          {/* Company Info */}
          <div className="col-md-4 mb-4 mb-md-0">
            <div className="p-4 rounded-3">
              <h5 className="neon-glow mb-3">Innovative Management Solutions</h5>
              <p className="contact-info">
                440 North Wells; Suite 420, Chicago IL 60654<br />
                (312) 796-9463<br />
                <a href="mailto:contact@imsillinois.com" className="footer-link">
                  contact@imsillinois.com
                </a>
              </p>
            </div>
          </div>

          {/* Services Section */}
          <div className="col-md-4 mb-4 mb-md-0">
            <div className="p-4 rounded-3">
              <h5 className="neon-glow mb-3">Services</h5>
              <ul className="list-unstyled">
                <li><a href="/services" className="footer-link">Services</a></li>
                <li><a href="/workers-compensation" className="footer-link">Workers' Compensation</a></li>
                <li><a href="/client-intake" className="footer-link">New Client Intake Form</a></li>
              </ul>
            </div>
          </div>

          {/* Company Section */}
          <div className="col-md-4">
            <div className="p-4 rounded-3">
              <h5 className="neon-glow mb-3">Company</h5>
              <ul className="list-unstyled">
                <li><a href="/about" className="footer-link">About IMS</a></li>
                <li><a href="/privacy" className="footer-link">Privacy Policy</a></li>
                <li><a href="/terms" className="footer-link">Terms of Use</a></li>
              </ul>
            </div>
          </div>
        </div>
        <div className="text-center mt-4">
          <p className="mb-0">&copy; {new Date().getFullYear()} Innovative Management Solutions. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;