import React from 'react';
import { HiOutlineMail, HiOutlinePhone, HiOutlineLocationMarker, HiChevronRight, HiShieldCheck } from 'react-icons/hi';
import { FaLinkedinIn, FaFacebookF, FaTwitter } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="footer-premium">
      <style>{`
        .footer-premium {
          background: #ffffff;
          padding: 0;
          position: relative;
          color: #1e293b;
          overflow: hidden;
        }

        /* The Curved "Wave" Top */
        .footer-top-shape {
          width: 100%;
          height: 80px;
          background: #fafaf9;
          border-radius: 100% 100% 0 0 / 100% 100% 0 0;
          transform: scaleX(1.1);
        }

        .footer-main-content {
          background: #fafaf9; /* Warm Bone White */
          padding: 80px 0 40px;
        }

        /* Modern Typography */
        .footer-brand-title {
          font-size: 1.8rem;
          font-weight: 900;
          letter-spacing: -0.04em;
          color: #0f172a;
          margin-bottom: 1.5rem;
        }

        .blue-dot { color: #2563eb; }

        .footer-section-label {
          font-size: 0.75rem;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 0.15em;
          color: #94a3b8;
          margin-bottom: 2rem;
          display: block;
        }

        /* Interactive Links */
        .modern-link {
          color: #475569;
          text-decoration: none;
          font-weight: 600;
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 1.2rem;
          transition: all 0.3s ease;
          position: relative;
          width: fit-content;
        }

        .modern-link::after {
          content: '';
          position: absolute;
          bottom: -2px;
          left: 0;
          width: 0;
          height: 2px;
          background: #2563eb;
          transition: width 0.3s ease;
        }

        .modern-link:hover {
          color: #2563eb;
        }

        .modern-link:hover::after {
          width: 100%;
        }

        /* Floating Contact Widget */
        .contact-widget {
          background: #ffffff;
          border-radius: 32px;
          padding: 40px;
          box-shadow: 0 20px 50px rgba(0,0,0,0.04);
          border: 1px solid rgba(255,255,255,1);
          position: relative;
          transition: transform 0.3s ease;
        }

        .contact-widget:hover {
          transform: translateY(-10px);
        }

        .social-btn-modern {
          width: 48px;
          height: 48px;
          border-radius: 16px;
          background: #f1f5f9;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #64748b;
          transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }

        .social-btn-modern:hover {
          background: #2563eb;
          color: #fff;
          transform: scale(1.1) rotate(5deg);
        }

        /* Trust Bar */
        .trust-bar {
          background: #0f172a;
          color: #fff;
          padding: 20px 0;
          border-radius: 20px;
          margin-top: 60px;
          display: flex;
          justify-content: space-around;
          align-items: center;
          flex-wrap: wrap;
          gap: 20px;
        }

        .trust-item {
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 0.85rem;
          font-weight: 600;
          opacity: 0.9;
        }

        @media (max-width: 991px) {
          .footer-top-shape { height: 40px; }
          .contact-widget { margin-top: 40px; }
        }
      `}</style>

      <div className="footer-top-shape"></div>

      <div className="footer-main-content">
        <div className="container">
          <div className="row g-5">
            
            {/* Column 1: Navigation Links */}
            <div className="col-6 col-lg-2">
              <span className="footer-section-label">Solutions</span>
              <a href="/audit" className="modern-link">RCM Audit</a>
              <a href="/workers-comp" className="modern-link">Workers' Comp</a>
              <a href="/intake" className="modern-link">Client Intake</a>
              <a href="/audit" className="modern-link">Analytics</a>
            </div>

            <div className="col-6 col-lg-2">
              <span className="footer-section-label">Company</span>
              <a href="/about" className="modern-link">Our Story</a>
              <a href="/careers" className="modern-link">Careers</a>
              <a href="/contact" className="modern-link">Contact</a>
            </div>

            {/* Column 2: Brand & Address */}
            <div className="col-lg-4 text-center px-lg-5">
              <div className="footer-brand-title">IMS<span className="blue-dot">.</span></div>
              <p className="text-muted mb-4 px-lg-3">
                Precision-engineered revenue cycle management for the modern surgical practice. Since 1991.
              </p>
              <div className="d-flex justify-content-center gap-3">
                <a href="#" className="social-btn-modern"><FaLinkedinIn /></a>
                <a href="#" className="social-btn-modern"><FaTwitter /></a>
                <a href="#" className="social-btn-modern"><FaFacebookF /></a>
              </div>
            </div>

            {/* Column 3: Contact Widget */}
            <div className="col-lg-4">
              <div className="contact-widget">
                <span className="footer-section-label">Get in Touch</span>
                <div className="mb-4">
                  <div className="d-flex align-items-center gap-3 mb-3">
                    <HiOutlineLocationMarker className="text-primary fs-4" />
                    <span className="small fw-bold">440 North Wells, Chicago IL</span>
                  </div>
                  <div className="d-flex align-items-center gap-3 mb-3">
                    <HiOutlinePhone className="text-primary fs-4" />
                    <span className="small fw-bold">(312) 796-9463</span>
                  </div>
                  <div className="d-flex align-items-center gap-3">
                    <HiOutlineMail className="text-primary fs-4" />
                    <span className="small fw-bold">contact@imsillinois.com</span>
                  </div>
                </div>
                <a href="/contact">
                  <button className="btn btn-primary w-100 py-3 rounded-pill fw-bold shadow-sm">
                    Schedule Free Audit <HiChevronRight />
                  </button>
                </a>
              </div>
            </div>
          </div>

          {/* Dark Trust Bar */}
          <div className="trust-bar">
            <div className="trust-item"><HiShieldCheck size={20} className="text-primary" /> HIPAA Compliant</div>
            <div className="trust-item"><HiShieldCheck size={20} className="text-primary" /> SOC-2 Verified</div>
            <div className="trust-item"><HiShieldCheck size={20} className="text-primary" /> 35+ Years Excellence</div>
            <div className="trust-item"><HiShieldCheck size={20} className="text-primary" /> Secure Data Encryption</div>
          </div>

          {/* Final Copyright */}
          <div className="mt-5 pt-4 text-center">
            <p className="small text-muted mb-0">
              &copy; {new Date().getFullYear()} Innovative Management Solutions. 
              <span className="mx-2">|</span> 
              <a href="/privacy" className="text-muted text-decoration-none">Privacy</a> 
              <span className="mx-2">|</span> 
              <a href="/terms" className="text-muted text-decoration-none">Terms</a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;