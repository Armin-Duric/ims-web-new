import React, { useState } from 'react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitStatus('Sending...');
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      setSubmitStatus(data.message);
    } catch (error) {
      setSubmitStatus('An error occurred. Please try again later.');
    }
  };

  return (
    <div className="contact-wrapper">
      <style>{`
        .contact-wrapper {
          background: radial-gradient(circle at bottom right, #1e293b, #0f172a);
          min-height: 100vh;
          padding: 140px 0 80px;
          color: white;
          overflow: hidden;
        }

        .contact-info-panel h2 {
          background: linear-gradient(90deg, #fff, #00ffcc);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          font-weight: 800;
        }

        .info-item {
          display: flex;
          align-items: center;
          margin-bottom: 2rem;
          gap: 20px;
        }

        .icon-box {
          width: 50px;
          height: 50px;
          background: rgba(0, 255, 204, 0.1);
          border: 1px solid rgba(0, 255, 204, 0.2);
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #00ffcc;
          font-size: 1.2rem;
        }

        /* Modern Glass Form */
        .glass-form-card {
          background: rgba(255, 255, 255, 0.03);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 30px;
          padding: 40px;
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
        }

        .modern-input {
          background: rgba(255, 255, 255, 0.05) !important;
          border: 1px solid rgba(255, 255, 255, 0.1) !important;
          color: white !important;
          border-radius: 12px !important;
          padding: 12px 20px !important;
          transition: all 0.3s ease !important;
        }

        .modern-input:focus {
          background: rgba(255, 255, 255, 0.08) !important;
          border-color: #00ffcc !important;
          box-shadow: 0 0 0 4px rgba(0, 255, 204, 0.1) !important;
        }

        .modern-input::placeholder {
          color: rgba(255, 255, 255, 0.3);
        }

        .submit-btn {
          background: #00ffcc;
          color: #0f172a;
          font-weight: 700;
          border: none;
          border-radius: 12px;
          padding: 15px 30px;
          width: 100%;
          transition: all 0.3s ease;
          text-transform: uppercase;
          letter-spacing: 1px;
        }

        .submit-btn:hover {
          background: #fff;
          transform: translateY(-3px);
          box-shadow: 0 10px 20px rgba(0, 255, 204, 0.3);
        }

        .contact-accent-glow {
          position: absolute;
          top: 20%;
          right: -10%;
          width: 400px;
          height: 400px;
          background: rgba(0, 255, 204, 0.05);
          filter: blur(120px);
          pointer-events: none;
        }
      `}</style>

      <div className="contact-accent-glow"></div>

      <div className="container position-relative">
        <div className="row g-5 align-items-center">
          
          {/* Left Side: Contact Information */}
          <div className="col-lg-5 contact-info-panel">
            <span className="text-uppercase tracking-widest small fw-bold" style={{color: '#00ffcc', letterSpacing: '3px'}}>Connect With Us</span>
            <h2 className="display-4 mt-2 mb-4">Get in <br />Touch</h2>
            <p className="text-white-50 lead mb-5">
              Ready to optimize your revenue cycle? Our team is standing by to provide the support and technology your practice deserves.
            </p>

            <div className="info-item">
              <div className="icon-box"><i className="fas fa-phone-alt"></i></div>
              <div>
                <div className="text-white-50 small">Call Us Directly</div>
                <div className="fw-bold fs-5">+1 (312) 796-9483</div>
              </div>
            </div>

            <div className="info-item">
              <div className="icon-box"><i className="fas fa-envelope"></i></div>
              <div>
                <div className="text-white-50 small">Email Support</div>
                <div className="fw-bold fs-5">contact@imsillinois.com</div>
              </div>
            </div>

            <div className="info-item">
              <div className="icon-box"><i className="fas fa-clock"></i></div>
              <div>
                <div className="text-white-50 small">Business Hours</div>
                <div className="fw-bold fs-5">Mon — Fri, 8am – 6pm EST</div>
              </div>
            </div>
          </div>

          {/* Right Side: The Form */}
          <div className="col-lg-7">
            <div className="glass-form-card">
              <form onSubmit={handleSubmit}>
                <div className="row">
                  <div className="col-md-6 mb-4">
                    <label className="small mb-2 opacity-50">Full Name</label>
                    <input
                      type="text"
                      name="name"
                      className="form-control modern-input"
                      placeholder="John Doe"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="col-md-6 mb-4">
                    <label className="small mb-2 opacity-50">Email Address</label>
                    <input
                      type="email"
                      name="email"
                      className="form-control modern-input"
                      placeholder="john@example.com"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="mb-4">
                  <label className="small mb-2 opacity-50">Subject</label>
                  <input
                    type="text"
                    name="subject"
                    className="form-control modern-input"
                    placeholder="How can we help?"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="mb-4">
                  <label className="small mb-2 opacity-50">Message</label>
                  <textarea
                    name="message"
                    className="form-control modern-input"
                    placeholder="Tell us about your practice... (Include phone number for callback)"
                    rows="4"
                    value={formData.message}
                    onChange={handleChange}
                    required
                  ></textarea>
                </div>

                <button type="submit" className="submit-btn">
                  {submitStatus === 'Sending...' ? (
                    <span className="spinner-border spinner-border-sm me-2"></span>
                  ) : 'Initialize Contact'}
                </button>

                {submitStatus && submitStatus !== 'Sending...' && (
                  <div className={`mt-4 p-3 rounded-3 text-center small ${submitStatus.includes('error') ? 'bg-danger' : 'bg-success'} bg-opacity-10 border border-${submitStatus.includes('error') ? 'danger' : 'success'} border-opacity-25`}>
                    {submitStatus}
                  </div>
                )}
              </form>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Contact;