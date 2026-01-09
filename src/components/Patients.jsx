// src/components/Patients.jsx
import React, { useState } from 'react';

const Patients = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    patientId: '',
    subject: 'Billing Inquiry',
    message: ''
  });

  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);

  // Balance lookup state
  const [lastName, setLastName] = useState('');
  const [firstName, setFirstName] = useState('');
  const [dobMonth, setDobMonth] = useState('');
  const [dobDay, setDobDay] = useState('');
  const [dobYear, setDobYear] = useState('');
  const [patientInfo, setPatientInfo] = useState(null);
  const [lookupLoading, setLookupLoading] = useState(false);
  const [lookupError, setLookupError] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus('');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (res.ok) {
        setStatus('success');
        setFormData({
          name: '',
          email: '',
          phone: '',
          patientId: '',
          subject: 'Billing Inquiry',
          message: ''
        });
      } else {
        throw new Error('Failed to send message');
      }
    } catch (err) {
      setStatus('error');
    } finally {
      setLoading(false);
    }
  };

  const checkBalance = async () => {
    if (!lastName.trim() || !firstName.trim() || !dobMonth || !dobDay || !dobYear) {
      setLookupError('Last name, first name, and full date of birth are required');
      return;
    }

    // Clear previous error
    setLookupError('');

    // Pad month and day with leading zero
    const month = dobMonth.toString().padStart(2, '0');
    const day = dobDay.toString().padStart(2, '0');
    const year = dobYear.length === 2 ? '20' + dobYear : dobYear;
    const formattedDob = `${year}-${month}-${day}`;

    setLookupLoading(true);
    setPatientInfo(null);

    try {
      const res = await fetch('/api/patient-lookup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          lastName: lastName.trim(), 
          firstName: firstName.trim(), 
          dob: formattedDob  
        })
      });

      const data = await res.json();

      if (res.ok && data.patients && data.patients.length > 0) {
        setPatientInfo(data.patients);
      } else {
        setLookupError(data.error || 'No records found for this name and date of birth');
      }
    } catch {
      setLookupError('Service temporarily unavailable. Please call our billing team.');
    } finally {
      setLookupLoading(false);
    }
  };

  return (
    <div
      className="py-5 gradient-bg"
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-lg-8 col-md-10">
            <div className="text-center text-white mb-5">
              <h1 className="display-3 fw-bold mb-4">Patient Support</h1>
              <p className="lead mb-4">
                We're here to help with your billing questions, payment options, insurance inquiries, and more.
              </p>
              <p className="fs-5">
                Common inquiries: Where to pay bills • Payment plans • Insurance coverage • Statement questions
              </p>
            </div>

            {/* Balance & Clinic Lookup */}
            <div className="card bg-dark text-white border-0 shadow-lg mb-5">
              <div className="card-header bg-gold text-white fw-bold text-center">
                Quick Balance & Clinic Lookup
              </div>
              <div className="card-body p-4">
                <p className="text-center mb-4">
                  Enter your name and date of birth to see your current balance and clinic information.
                </p>

                <div className="row g-3">
                  <div className="col-md-6">
                    <label className="form-label">Last Name</label>
                    <input
                      type="text"
                      className="form-control bg-secondary text-white border-0"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      placeholder="Last Name"
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">First Name</label>
                    <input
                      type="text"
                      className="form-control bg-secondary text-white border-0"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      placeholder="First Name"
                    />
                  </div>

                  <div className="col-12">
                    <label className="form-label">Date of Birth (MM/DD/YYYY)</label>
                    <div className="row g-2">
                      <div className="col-4">
                        <select
                          className="form-select bg-secondary text-white border-0"
                          value={dobMonth}
                          onChange={(e) => setDobMonth(e.target.value)}
                        >
                          <option value="">Month</option>
                          {[...Array(12)].map((_, i) => (
                            <option key={i+1} value={i+1}>{i+1}</option>
                          ))}
                        </select>
                      </div>
                      <div className="col-4">
                        <select
                          className="form-select bg-secondary text-white border-0"
                          value={dobDay}
                          onChange={(e) => setDobDay(e.target.value)}
                        >
                          <option value="">Day</option>
                          {[...Array(31)].map((_, i) => (
                            <option key={i+1} value={i+1}>{i+1}</option>
                          ))}
                        </select>
                      </div>
                      <div className="col-4">
                        <input
                          type="text"
                          className="form-control bg-secondary text-white border-0"
                          placeholder="Year"
                          value={dobYear}
                          onChange={(e) => setDobYear(e.target.value.replace(/\D/g, '').slice(0,4))}
                          maxLength="4"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="col-12 text-center mt-3">
                    <button
                      className="btn btn-gold px-5"
                      onClick={checkBalance}
                      disabled={lookupLoading}
                    >
                      {lookupLoading ? 'Searching...' : 'Check Balance'}
                    </button>
                  </div>
                </div>

                {lookupError && (
                  <div className="alert alert-danger text-center mt-4">
                    {lookupError}
                  </div>
                )}

                {Array.isArray(patientInfo) && patientInfo.length > 0 && (
                <div className="mt-4">
                    <h5 className="text-gold text-center mb-3">
                    Found {patientInfo.length} record{patientInfo.length > 1 ? 's' : ''} for {patientInfo[0].name}
                    </h5>
                    {patientInfo.map((p, i) => (
                    <div key={i} className="alert alert-info mb-3 text-start">
                        <strong>Clinic:</strong> {p.clinic} • <strong>Chart #:</strong> {p.chart_number}<br/>
                        <strong>Balance:</strong>{' '}
                        <span className={parseFloat(p.balance) > 0 ? 'text-warning' : 'text-success'}>
                        ${parseFloat(p.balance).toFixed(2)}
                        </span>
                        {p.injury_date ? (
                        <><br/><strong>Injury Date:</strong> {new Date(p.injury_date).toLocaleDateString('en-US')}</>
                        ) : (
                        <><br/><em>No injury date recorded</em></>
                        )}
                    </div>
                    ))}
                </div>
                )}
              </div>
            </div>

            {/* Contact Form */}
            <div className="card bg-dark text-white border-0 shadow-lg">
              <div className="card-body p-5">
                <h3 className="text-center mb-4 text-gold">Send Us Your Inquiry</h3>

                {status === 'success' && (
                  <div className="alert alert-success text-center mb-4">
                    Thank you! Your message has been sent. Our patient services team will respond within 1-2 business days.
                  </div>
                )}

                {status === 'error' && (
                  <div className="alert alert-danger text-center mb-4">
                    Sorry, there was an error sending your message. Please try again or call us directly.
                  </div>
                )}

                <form onSubmit={handleSubmit}>
                  <div className="row g-4">
                    <div className="col-md-6">
                      <label className="form-label">Full Name *</label>
                      <input
                        type="text"
                        name="name"
                        className="form-control bg-secondary border-0 text-white"
                        value={formData.name}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div className="col-md-6">
                      <label className="form-label">Email Address *</label>
                      <input
                        type="email"
                        name="email"
                        className="form-control bg-secondary border-0 text-white"
                        value={formData.email}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div className="col-md-6">
                      <label className="form-label">Phone Number</label>
                      <input
                        type="tel"
                        name="phone"
                        className="form-control bg-secondary border-0 text-white"
                        value={formData.phone}
                        onChange={handleChange}
                      />
                    </div>

                    <div className="col-md-6">
                      <label className="form-label">Patient ID / Account Number (optional)</label>
                      <input
                        type="text"
                        name="patientId"
                        className="form-control bg-secondary border-0 text-white"
                        value={formData.patientId}
                        onChange={handleChange}
                        placeholder="Help us find your records faster"
                      />
                    </div>

                    <div className="col-12">
                      <label className="form-label">Subject *</label>
                      <select
                        name="subject"
                        className="form-select bg-secondary border-0 text-white"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                      >
                        <option value="Billing Inquiry">Billing Inquiry</option>
                        <option value="Payment Options">Payment Options / Plans</option>
                        <option value="Insurance Question">Insurance Coverage Question</option>
                        <option value="Statement Request">Request Copy of Statement</option>
                        <option value="Financial Assistance">Financial Assistance Info</option>
                        <option value="Other">Other Patient Concern</option>
                      </select>
                    </div>

                    <div className="col-12">
                      <label className="form-label">Message *</label>
                      <textarea
                        name="message"
                        className="form-control bg-secondary border-0 text-white"
                        rows="6"
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Please describe your question or concern in detail..."
                        required
                      />
                    </div>

                    <div className="col-12 text-center">
                      <button
                        type="submit"
                        className="btn btn-gold btn-lg px-5"
                        disabled={loading}
                      >
                        {loading ? 'Sending...' : 'Submit Inquiry'}
                      </button>
                    </div>
                  </div>
                </form>

                <div className="text-center mt-4">
                  <p className="mb-0">
                    Prefer to speak with someone? Call our Patient Billing Support:<br />
                    <strong className="text-gold fs-4">+1 (312) 767-8959</strong><br />
                    <strong className="text-gold fs-4">+1 (312) 549-8354</strong><br />
                    Monday–Friday, 8am–6pm EST
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Patients;