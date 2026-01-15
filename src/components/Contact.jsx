import React, { useState } from 'react';
import { 
  HiOutlinePhone, 
  HiOutlineMail, 
  HiOutlineClock,
  HiOutlineChatAlt2 
} from 'react-icons/hi';

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
    <div className="contact-warm-wrapper">
      <style>{`
        .contact-warm-wrapper {
          background: #faf9f6;
          min-height: 100vh;
          padding: 160px 0 100px;
          color: #334155;
          font-family: 'Inter', system-ui, sans-serif;
          position: relative;
        }

        .contact-tag {
          color: #0d9488;
          text-transform: uppercase;
          letter-spacing: 3px;
          font-weight: 700;
          font-size: 0.85rem;
        }

        .contact-title {
          color: #1e293b;
          font-weight: 800;
          line-height: 1.1;
        }

        .info-card-warm {
          display: flex;
          align-items: flex-start;
          margin-bottom: 2.5rem;
          gap: 20px;
        }

        .icon-circle {
          width: 54px;
          height: 54px;
          background: #ffffff;
          border: 1px solid #e2e8f0;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #0d9488;
          font-size: 1.4rem;
          box-shadow: 0 4px 6px rgba(0,0,0,0.02);
          flex-shrink: 0;
        }

        .form-card-warm {
          background: #ffffff;
          border: 1px solid #e2e8f0;
          border-radius: 32px;
          padding: 50px;
          box-shadow: 0 20px 40px -15px rgba(0, 0, 0, 0.05);
        }

        .label-warm {
          font-weight: 600;
          font-size: 0.85rem;
          color: #64748b;
          margin-bottom: 8px;
          display: block;
        }

        .input-warm {
          background: #f8fafc !important;
          border: 1px solid #e2e8f0 !important;
          color: #1e293b !important;
          border-radius: 12px !important;
          padding: 14px 20px !important;
          transition: all 0.3s ease !important;
        }

        .input-warm:focus {
          background: #ffffff !important;
          border-color: #0d9488 !important;
          box-shadow: 0 0 0 4px rgba(13, 148, 136, 0.1) !important;
        }

        .btn-send-warm {
          background: #0d9488;
          color: white;
          font-weight: 700;
          border: none;
          border-radius: 14px;
          padding: 16px;
          width: 100%;
          transition: 0.3s;
          text-transform: uppercase;
          letter-spacing: 1px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
        }

        .btn-send-warm:hover {
          background: #0f766e;
          transform: translateY(-2px);
          box-shadow: 0 12px 20px -5px rgba(13, 148, 136, 0.3);
        }

        .status-alert {
          border-radius: 12px;
          padding: 15px;
          text-align: center;
          font-weight: 500;
          margin-top: 20px;
        }
        
        .bg-soft-teal { background: #f0fdfa; color: #0d9488; border: 1px solid #ccfbf1; }
        .bg-soft-red { background: #fef2f2; color: #b91c1c; border: 1px solid #fee2e2; }
      `}</style>

      <div className="container position-relative">
        <div className="row g-5 align-items-center">
          
          {/* Information Section */}
          <div className="col-lg-5">
            <span className="contact-tag">Connect With Us</span>
            <h2 className="display-4 contact-title mt-2 mb-4">Let's start a <br />conversation.</h2>
            <p className="text-muted mb-5 fs-5">
              Whether you're looking to optimize your billing or have a specific question about our recovery process, our specialists are here to help.
            </p>

            <div className="info-card-warm">
              <div className="icon-circle shadow-sm"><HiOutlinePhone /></div>
              <div>
                <div className="text-muted small fw-bold text-uppercase">Direct Line</div>
                <div className="fw-bold fs-5 text-slate-800">+1 (312) 796-9483</div>
              </div>
            </div>

            <div className="info-card-warm">
              <div className="icon-circle shadow-sm"><HiOutlineMail /></div>
              <div>
                <div className="text-muted small fw-bold text-uppercase">Email Inquiries</div>
                <div className="fw-bold fs-5 text-slate-800">contact@imsillinois.com</div>
              </div>
            </div>

            <div className="info-card-warm">
              <div className="icon-circle shadow-sm"><HiOutlineClock /></div>
              <div>
                <div className="text-muted small fw-bold text-uppercase">Operating Hours</div>
                <div className="fw-bold fs-5 text-slate-800">Mon — Fri, 8am – 6pm EST</div>
              </div>
            </div>
          </div>

          {/* Form Section */}
          <div className="col-lg-7">
            <div className="form-card-warm">
              <form onSubmit={handleSubmit}>
                <div className="row">
                  <div className="col-md-6 mb-4">
                    <label className="label-warm">Full Name</label>
                    <input
                      type="text"
                      name="name"
                      className="form-control input-warm"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="col-md-6 mb-4">
                    <label className="label-warm">Email Address</label>
                    <input
                      type="email"
                      name="email"
                      className="form-control input-warm"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="mb-4">
                  <label className="label-warm">Subject</label>
                  <input
                    type="text"
                    name="subject"
                    className="form-control input-warm"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="mb-4">
                  <label className="label-warm">Message</label>
                  <textarea
                    name="message"
                    className="form-control input-warm"
                    rows="5"
                    value={formData.message}
                    onChange={handleChange}
                    required
                  ></textarea>
                </div>

                <button type="submit" className="btn-send-warm shadow-sm">
                  {submitStatus === 'Sending...' ? (
                    <span className="spinner-border spinner-border-sm"></span>
                  ) : (
                    <>Send Message <HiOutlineChatAlt2 size={20} /></>
                  )}
                </button>

                {submitStatus && submitStatus !== 'Sending...' && (
                  <div className={`status-alert ${submitStatus.includes('error') ? 'bg-soft-red' : 'bg-soft-teal'}`}>
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