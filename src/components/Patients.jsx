import React, { useState } from 'react';
import { 
  HiOutlineSearch, 
  HiOutlineSupport, 
  HiOutlinePhone, 
  HiOutlineCurrencyDollar,
  HiOutlineArrowNarrowRight 
} from 'react-icons/hi';

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
      setLookupError('Name and full date of birth are required');
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
        setLookupError(data.error || 'No records found for provided details');
      }
    } catch {
      setLookupError('Service unavailable. Please call support.');
    } finally {
      setLookupLoading(false);
    }
  };

  return (
    <div className="patients-glass-wrapper">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;600;700&display=swap');

        .patients-glass-wrapper {
          background: #f8f6f2; 
          min-height: 100vh;
          padding: 160px 0 100px;
          color: #2d3436;
          font-family: 'Outfit', sans-serif;
          position: relative;
          overflow: hidden;
        }

        /* Abstract Orbs for blurring */
        .patient-orb {
          position: absolute;
          border-radius: 50%;
          filter: blur(100px);
          opacity: 0.35;
          z-index: 1;
        }
        .orb-teal { width: 450px; height: 450px; background: #0d9488; top: -50px; left: -100px; }
        .orb-gold { width: 550px; height: 550px; background: #fcd34d; bottom: -50px; right: -100px; }

        .glass-panel {
          background: rgba(255, 255, 255, 0.45);
          backdrop-filter: blur(20px) saturate(160%);
          -webkit-backdrop-filter: blur(20px) saturate(160%);
          border: 1px solid rgba(255, 255, 255, 0.7);
          border-radius: 35px;
          box-shadow: 0 15px 35px rgba(0,0,0,0.04);
          position: relative;
          z-index: 10;
        }

        .section-tag {
          color: #0d9488;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 2px;
          font-size: 0.8rem;
          display: block;
          margin-bottom: 1rem;
        }

        .modern-input-field {
          background: rgba(255, 255, 255, 0.6) !important;
          border: 1px solid #e2e8f0 !important;
          border-radius: 12px !important;
          padding: 12px 18px !important;
          color: #1a202c !important;
          transition: 0.3s;
        }

        .modern-input-field:focus {
          border-color: #0d9488 !important;
          box-shadow: 0 0 0 4px rgba(13, 148, 136, 0.1) !important;
          background: #fff !important;
        }

        .btn-action-teal {
          background: #0d9488;
          color: white;
          border-radius: 14px;
          padding: 14px 28px;
          font-weight: 700;
          border: none;
          transition: 0.3s;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          width: 100%;
        }

        .btn-action-teal:hover:not(:disabled) {
          background: #0f766e;
          transform: translateY(-2px);
          box-shadow: 0 10px 20px rgba(13, 148, 136, 0.2);
        }

        .balance-result {
          background: #ffffff;
          border-radius: 20px;
          padding: 25px;
          border: 1px solid #0d9488;
          box-shadow: 0 10px 25px rgba(0,0,0,0.05);
          margin-top: 25px;
        }

        .support-line-box {
          background: #ffffff;
          border-radius: 20px;
          padding: 20px;
          display: flex;
          align-items: center;
          gap: 15px;
          text-decoration: none;
          color: inherit;
          border: 1px solid #e2e8f0;
          transition: 0.3s;
        }

        .support-line-box:hover {
          border-color: #0d9488;
          transform: scale(1.02);
          color: #0d9488;
        }

        .icon-circle-teal {
          width: 45px;
          height: 45px;
          background: #f0fdfa;
          color: #0d9488;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.2rem;
        }
      `}</style>

      <div className="patient-orb orb-teal"></div>
      <div className="patient-orb orb-gold"></div>

      <div className="container">
        <div className="text-center mb-5 pb-4">
          <span className="section-tag">Patient Portal</span>
          <h1 className="display-4 fw-bold mb-3" style={{color: '#1e293b'}}>Account <span style={{color: '#0d9488'}}>Transparency</span></h1>
          <p className="text-muted fs-5 mx-auto" style={{maxWidth: '600px'}}>Access your balance information securely or reach out to our dedicated billing specialists for support.</p>
        </div>

        <div className="row g-5 justify-content-center">
          <div className="col-lg-6">
            <div className="glass-panel p-4 p-md-5 h-100">
              <div className="d-flex align-items-center gap-3 mb-4">
                <div className="icon-circle-teal"><HiOutlineCurrencyDollar /></div>
                <h3 className="h4 fw-bold mb-0">Balance Verification</h3>
              </div>
              
              <div className="row g-3">
                <div className="col-6">
                  <label className="small fw-bold text-muted mb-1">First Name</label>
                  <input type="text" className="form-control modern-input-field" placeholder="John" value={firstName} onChange={(e)=>setFirstName(e.target.value)} />
                </div>
                <div className="col-6">
                  <label className="small fw-bold text-muted mb-1">Last Name</label>
                  <input type="text" className="form-control modern-input-field" placeholder="Doe" value={lastName} onChange={(e)=>setLastName(e.target.value)} />
                </div>
                <div className="col-12">
                  <label className="small fw-bold text-muted mb-1">Date of Birth</label>
                  <div className="row g-2">
                    <div className="col-4">
                      <select className="form-select modern-input-field" value={dobMonth} onChange={(e)=>setDobMonth(e.target.value)}>
                        <option value="">Month</option>
                        {[...Array(12)].map((_, i) => <option key={i+1} value={i+1}>{i+1}</option>)}
                      </select>
                    </div>
                    <div className="col-4">
                      <select className="form-select modern-input-field" value={dobDay} onChange={(e)=>setDobDay(e.target.value)}>
                        <option value="">Day</option>
                        {[...Array(31)].map((_, i) => <option key={i+1} value={i+1}>{i+1}</option>)}
                      </select>
                    </div>
                    <div className="col-4">
                      <input type="text" className="form-control modern-input-field" placeholder="YYYY" value={dobYear} onChange={(e)=>setDobYear(e.target.value.replace(/\D/g, ''))} maxLength="4" />
                    </div>
                  </div>
                </div>
                <div className="col-12 pt-3">
                  <button className="btn-action-teal" onClick={checkBalance} disabled={lookupLoading}>
                    {lookupLoading ? 'Authenticating...' : <><HiOutlineSearch size={20} /> Verify Account</>}
                  </button>
                </div>
              </div>

              {lookupError && <div className="alert alert-danger mt-4 border-0 rounded-4 py-3 small text-center">{lookupError}</div>}
              
              {patientInfo && patientInfo.map((p, i) => (
                <div key={i} className="balance-result animate__animated animate__fadeInUp">
                  <div className="row align-items-center text-center text-md-start">
                    <div className="col-md-7 mb-3 mb-md-0">
                      <div className="text-uppercase small fw-bold text-teal mb-1" style={{color: '#0d9488'}}>Facility Name</div>
                      <div className="h5 fw-bold mb-0">{p.clinic}</div>
                    </div>
                    <div className="col-md-5 text-md-end border-md-start">
                      <div className="text-muted small fw-bold mb-1">Outstanding Balance</div>
                      <div className="h3 fw-bold mb-0 text-dark">${parseFloat(p.balance).toFixed(2)}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="col-lg-6">
            <div className="glass-panel p-4 p-md-5 h-100">
              <div className="d-flex align-items-center gap-3 mb-4">
                <div className="icon-circle-teal"><HiOutlineSupport /></div>
                <h3 className="h4 fw-bold mb-0">Billing Inquiry</h3>
              </div>
              
              <form onSubmit={handleSubmit}>
                <div className="row g-3">
                  <div className="col-md-6">
                    <label className="small fw-bold text-muted mb-1">Full Name</label>
                    <input type="text" name="name" placeholder="Full Name" className="form-control modern-input-field" value={formData.name} onChange={handleChange} required />
                  </div>
                  <div className="col-md-6">
                    <label className="small fw-bold text-muted mb-1">Email</label>
                    <input type="email" name="email" placeholder="Email Address" className="form-control modern-input-field" value={formData.email} onChange={handleChange} required />
                  </div>
                  <div className="col-12">
                    <select name="subject" className="form-select modern-input-field" value={formData.subject} onChange={handleChange}>
                      <option value="Billing Inquiry">Billing Inquiry</option>
                      <option value="Payment Options">Payment Options</option>
                      <option value="Insurance Question">Insurance Question</option>
                      <option value="Insurance Question">Other</option>
                    </select>
                  </div>
                  <div className="col-12">
                    <textarea name="message" placeholder="Please describe your billing concern..." className="form-control modern-input-field" rows="5" value={formData.message} onChange={handleChange} required></textarea>
                  </div>
                  <div className="col-12">
                    <button type="submit" className="btn-action-teal" disabled={loading}>
                      {loading ? 'Submitting...' : <>Send Inquiry <HiOutlineArrowNarrowRight /></>}
                    </button>
                  </div>
                </div>
                {status === 'success' && <p className="text-teal text-center mt-3 fw-bold" style={{color: '#0d9488'}}>✓ Your inquiry has been submitted.</p>}
              </form>

              <div className="mt-5 pt-4 border-top">
                <div className="row g-3">
                  <div className="col-md-6">
                    <a href="tel:+13127678959" className="support-line-box">
                      <div className="icon-circle-teal"><HiOutlinePhone /></div>
                      <div className="small fw-bold">Support Line A</div>
                      <div>(312) 767-8959</div>
                    </a>
                  </div>
                  <div className="col-md-6">
                    <a href="tel:+13125498354" className="support-line-box">
                      <div className="icon-circle-teal"><HiOutlinePhone /></div>
                      <div className="small fw-bold">Support Line B</div>
                      <div>(312) 549-8354</div>
                    </a>
                  </div>
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