// src/components/ClientIntakeForm.jsx
import React, { useState } from 'react';

const ClientIntakeForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    practiceName: '',
    specialty: '',
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
    <div className="py-5" style={{ minHeight: '100vh', background: 'linear-gradient(to bottom, #1a3c5e, #0a1e2f)' }}>
      <div className="container text-white py-5">
        <h1 className="display-4 fw-bold mb-4 text-center">New Client Intake Form</h1>
        <p className="lead mb-5 text-center">
          Please fill out the form below to provide us with information about your practice. Our team will review your submission and get in touch shortly.
        </p>
        <form onSubmit={handleSubmit} className="bg-dark p-5 rounded shadow-lg">
          <div className="mb-3">
            <label htmlFor="name" className="form-label">Full Name</label>
            <input type="text" className="form-control" id="name" name="name" value={formData.name} onChange={handleChange} required />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email Address</label>
            <input type="email" className="form-control" id="email" name="email" value={formData.email} onChange={handleChange} required />
          </div>
          <div className="mb-3">
            <label htmlFor="phone" className="form-label">Phone Number</label>
            <input type="tel" className="form-control" id="phone" name="phone" value={formData.phone} onChange={handleChange} required />
          </div>
          <div className="mb-3">
            <label htmlFor="practiceName" className="form-label">Practice Name</label>
            <input type="text" className="form-control" id="practiceName" name="practiceName" value={formData.practiceName} onChange={handleChange} required />
          </div>
          <div className="mb-3">
            <label htmlFor="specialty" className="form-label">Specialty</label>
            <input type="text" className="form-control" id="specialty" name="specialty" value={formData.specialty} onChange={handleChange} required />
          </div>
          <div className="mb-3">
            <label htmlFor="message" className="form-label">Additional Information</label>
            <textarea className="form-control" id="message" name="message" rows="4" value={formData.message} onChange={handleChange}></textarea>
          </div>
          <div className="text-center">
            <button type="submit" className="btn btn-primary btn-lg" style={{ backgroundColor: '#00ffcc', color: '#1a3c5e', border: 'none' }}>
              Submit Form
            </button>
            {submitStatus && <p className="mt-3 text-center">{submitStatus}</p>}
          </div>
        </form>
      </div>
    </div>
  );
};

export default ClientIntakeForm;