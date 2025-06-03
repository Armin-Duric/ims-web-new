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
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      setSubmitStatus(data.message);
    } catch (error) {
      setSubmitStatus('An error occurred. Please try again later.');
    }
  };

  return (
    <div
      className="py-5 gradient-bg"
      style={{minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
    >
      <div className="container text-white">
        <div className="row justify-content-center">
          <div className="col-md-8">
            <h1 className="display-3 fw-bold mb-4 text-center">
              Get in Touch
            </h1>
            <p className="lead mb-5 text-center">
              We’re here to help you with your revenue cycle needs. Fill out the form below, and our team will get back to you shortly.
            </p>
            <form onSubmit={handleSubmit} className="p-4 p-md-5 bg-dark rounded shadow-lg">
              <div className="mb-3">
                <input
                  type="text"
                  name="name"
                  className="form-control bg-transparent text-white border-secondary plholder"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <input
                  type="email"
                  name="email"
                  className="form-control bg-transparent text-white border-secondary plholder"
                  placeholder="Your Email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <input
                  type="text"
                  name="subject"
                  className="form-control bg-transparent text-white border-secondary plholder"
                  placeholder="Subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <textarea
                  name="message"
                  className="form-control bg-transparent text-white border-secondary plholder"
                  placeholder="Your Message"
                  rows="5"
                  value={formData.message}
                  onChange={handleChange}
                  required
                ></textarea>
              </div>
              <div className="text-center">
                <button
                  type="submit"
                  className="btn btn-lg btn-primary animate__animated animate__pulse"
                  style={{ backgroundColor: '#00ffcc', color: '#1a3c5e', border: 'none'}}
                >
                  Send Message
                </button>
                {submitStatus && <p className="mt-3 text-center">{submitStatus}</p>}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;