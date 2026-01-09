import React, { useState } from 'react';

const Patients = () => {
  // --- FORM STATE ---
  const [formData, setFormData] = useState({
    name: '', email: '', phone: '', patientId: '', subject: 'Billing Inquiry', message: ''
  });
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);

  // --- LOOKUP STATE ---
  const [lastName, setLastName] = useState('');
  const [firstName, setFirstName] = useState('');
  const [dobMonth, setDobMonth] = useState('');
  const [dobDay, setDobDay] = useState('');
  const [dobYear, setDobYear] = useState('');
  const [patientInfo, setPatientInfo] = useState(null);
  const [lookupLoading, setLookupLoading] = useState(false);
  const [lookupError, setLookupError] = useState('');

  // --- LOGIC FUNCTIONS ---
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
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
        setFormData({ name: '', email: '', phone: '', patientId: '', subject: 'Billing Inquiry', message: '' });
      } else { throw new Error(); }
    } catch (err) { setStatus('error'); } 
    finally { setLoading(false); }
  };

  const checkBalance = async () => {
    if (!lastName.trim() || !firstName.trim() || !dobMonth || !dobDay || !dobYear) {
      setLookupError('Last name, first name, and full date of birth are required');
      return;
    }
    setLookupError('');
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
        body: JSON.stringify({ lastName: lastName.trim(), firstName: firstName.trim(), dob: formattedDob })
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
    <div className="patients-wrapper">
      <style>{`
        .patients-wrapper {
          background: radial-gradient(circle at top right, #1e293b, #0f172a);
          min-height: 100vh;
          padding: 140px 0 80px;
          color: white;
        }
        .lookup-card {
          background: rgba(0, 255, 204, 0.03);
          backdrop-filter: blur(15px);
          border: 1px solid rgba(0, 255, 204, 0.2);
          border-radius: 30px;
          overflow: hidden;
          margin-bottom: 50px;
        }
        .lookup-header {
          background: rgba(0, 255, 204, 0.1);
          padding: 20px;
          text-align: center;
          font-weight: 700;
          color: #00ffcc;
          text-transform: uppercase;
          letter-spacing: 2px;
        }

        /* Fixed Modern Input & Select Styling */
        .patient-input {
          background: rgba(255, 255, 255, 0.05) !important;
          border: 1px solid rgba(255, 255, 255, 0.1) !important;
          color: white !important;
          border-radius: 12px !important;
          padding: 12px 15px !important;
          appearance: none; /* Removes default arrow to style better */
          background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3e%3cpath fill='none' stroke='%2300ffcc' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='m2 5 6 6 6-6'/%3e%3c/svg%3e") !important;
          background-repeat: no-repeat !important;
          background-position: right 0.75rem center !important;
          background-size: 16px 12px !important;
        }

        /* THIS FIXES THE WHITE DROPDOWN ISSUE */
        .patient-input option {
          background-color: #1e293b !important; /* Solid dark background for options */
          color: white !important;
        }

        .patient-input:focus {
          border-color: #00ffcc !important;
          box-shadow: 0 0 0 4px rgba(0, 255, 204, 0.1) !important;
          outline: none;
        }

        .record-found-item {
          background: rgba(255, 255, 255, 0.05);
          border-left: 4px solid #00ffcc;
          border-radius: 12px;
          padding: 20px;
          margin-top: 20px;
        }
        .btn-lookup {
          background: #00ffcc;
          color: #0f172a;
          font-weight: 700;
          border: none;
          border-radius: 12px;
          padding: 12px 30px;
          transition: 0.3s;
          width: 100%;
        }
        .btn-lookup:hover:not(:disabled) {
          background: white;
          transform: translateY(-2px);
        }
        .support-card {
          background: rgba(255, 255, 255, 0.02);
          backdrop-filter: blur(15px);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 30px;
          padding: 40px;
        }
        .phone-link {
          color: #00ffcc;
          text-decoration: none;
          font-weight: 700;
          font-size: 1.1rem;
        }
      `}</style>

      <div className="container">
        <div className="text-center mb-5">
          <h1 className="display-4 fw-bold">Patient <span style={{color: '#00ffcc'}}>Support</span></h1>
          <p className="text-white-50 lead">Check your balance or contact our billing specialists.</p>
        </div>

        <div className="row justify-content-center">
          <div className="col-lg-9">
            
            {/* LOOKUP TOOL */}
            <div className="lookup-card">
              <div className="lookup-header">Quick Balance Lookup</div>
              <div className="p-4 p-md-5">
                <div className="row g-3">
                  <div className="col-md-6">
                    <label className="small opacity-50 mb-1">First Name</label>
                    <input type="text" className="form-control patient-input" value={firstName} onChange={(e)=>setFirstName(e.target.value)} />
                  </div>
                  <div className="col-md-6">
                    <label className="small opacity-50 mb-1">Last Name</label>
                    <input type="text" className="form-control patient-input" value={lastName} onChange={(e)=>setLastName(e.target.value)} />
                  </div>
                  <div className="col-12">
                    <label className="small opacity-50 mb-1">Date of Birth</label>
                    <div className="row g-2">
                      <div className="col-4">
                        <select className="form-select patient-input" value={dobMonth} onChange={(e)=>setDobMonth(e.target.value)}>
                          <option value="">Month</option>
                          {[...Array(12)].map((_, i) => <option key={i+1} value={i+1}>{i+1}</option>)}
                        </select>
                      </div>
                      <div className="col-4">
                        <select className="form-select patient-input" value={dobDay} onChange={(e)=>setDobDay(e.target.value)}>
                          <option value="">Day</option>
                          {[...Array(31)].map((_, i) => <option key={i+1} value={i+1}>{i+1}</option>)}
                        </select>
                      </div>
                      <div className="col-4">
                        <input type="text" className="form-control patient-input" placeholder="YYYY" value={dobYear} onChange={(e)=>setDobYear(e.target.value.replace(/\D/g, ''))} maxLength="4" />
                      </div>
                    </div>
                  </div>
                  <button className="btn-lookup mt-4" onClick={checkBalance} disabled={lookupLoading}>
                    {lookupLoading ? 'Searching...' : 'Check Balance'}
                  </button>
                </div>

                {lookupError && <div className="alert alert-danger mt-4 bg-danger bg-opacity-10 border-0 text-white">{lookupError}</div>}
                {patientInfo && patientInfo.map((p, i) => (
                  <div key={i} className="record-found-item animate__animated animate__fadeIn">
                    <div className="d-flex justify-content-between align-items-center">
                      <div>
                        <div className="small text-info text-uppercase">Clinic</div>
                        <div className="fw-bold">{p.clinic}</div>
                      </div>
                      <div className="text-end">
                        <div className="small text-white-50">Current Balance</div>
                        <div className="h4 mb-0 text-warning">${parseFloat(p.balance).toFixed(2)}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* CONTACT FORM */}
            <div className="support-card">
              <h3 className="h4 fw-bold mb-4">Submit a Billing Inquiry</h3>
              <form onSubmit={handleSubmit}>
                <div className="row g-3">
                  <div className="col-md-6">
                    <input type="text" name="name" placeholder="Full Name" className="form-control patient-input" value={formData.name} onChange={handleChange} required />
                  </div>
                  <div className="col-md-6">
                    <input type="email" name="email" placeholder="Email Address" className="form-control patient-input" value={formData.email} onChange={handleChange} required />
                  </div>
                  <div className="col-12">
                    <select name="subject" className="form-select patient-input" value={formData.subject} onChange={handleChange}>
                      <option value="Billing Inquiry">Billing Inquiry</option>
                      <option value="Payment Options">Payment Options</option>
                      <option value="Insurance Question">Insurance Question</option>
                    </select>
                  </div>
                  <div className="col-12">
                    <textarea name="message" placeholder="Describe your concern..." className="form-control patient-input" rows="4" value={formData.message} onChange={handleChange} required></textarea>
                  </div>
                  <button type="submit" className="btn-lookup" disabled={loading}>{loading ? 'Sending...' : 'Submit Inquiry'}</button>
                </div>
                {status === 'success' && <p className="text-success mt-3 text-center">Inquiry sent!</p>}
              </form>
              
              <div className="mt-5 text-center pt-4 border-top border-white border-opacity-10">
                <p className="mb-1 opacity-50">Patient Support Lines:</p>
                <a href="tel:+13127678959" className="phone-link d-block mb-1">(312) 767-8959</a>
                <a href="tel:+13125498354" className="phone-link d-block">(312) 549-8354</a>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Patients;