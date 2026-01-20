import React, { useState } from 'react';
import { 
  HiOutlineClipboardCheck, HiOutlineTrendingUp, 
  HiOutlineBeaker, HiOutlineArrowRight 
} from 'react-icons/hi';

const SpecialtyOptimization = () => {
  const [activeSpecialty, setActiveSpecialty] = useState(0);

  const specialties = [
    {
      name: "Orthopedics",
      impact: "+24% Revenue",
      focus: "Global Period & Modifier Logic",
      desc: "We master the complexity of surgical global periods and the correct application of modifiers (-25, -57, -59) to ensure every evaluation and procedure is paid.",
      points: ["Surgical Package Management", "Implant Reimbursement Tracking", "MRI/Imaging Pre-auth"]
    },
    {
      name: "Surgical Centers",
      impact: "-40% Denial Rate",
      focus: "Facility vs. Professional Fee",
      desc: "Optimizing the split between ASC facility fees and professional components. We ensure clean claim submission for complex multi-surgeon cases.",
      points: ["ASC Revenue Cycle", "Anesthesia Coding", "Workers' Comp Fee Schedule Mastery"]
    },
    {
      name: "Physical Therapy",
      impact: "+18% Per Visit",
      focus: "CPT Unit Optimization",
      desc: "Moving beyond flat-rate thinking. We optimize 8-minute rule applications and therapeutic procedure coding to maximize unit-based reimbursement.",
      points: ["8-Minute Rule Compliance", "Functional Limitation Reporting", "Plan of Care Tracking"]
    }
  ];

  return (
    <section className="py-5" style={{ background: '#f8fafc' }}>
      <style>{`
        .specialty-card {
          border-radius: 24px;
          background: white;
          border: 1px solid #e2e8f0;
          transition: all 0.3s ease;
          cursor: pointer;
          height: 100%;
        }
        .specialty-card.active {
          border-color: #0ea5e9;
          box-shadow: 0 20px 25px -5px rgba(14, 165, 233, 0.1);
          transform: translateY(-5px);
        }
        .check-item {
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 0.9rem;
          margin-bottom: 8px;
          color: #475569;
        }
        .check-icon { color: #0ea5e9; flex-shrink: 0; }
      `}</style>

      <div className="container">
        <div className="text-center mb-5">
          <h2 className="display-6 fw-bold text-dark">Specialty-Specific <span className="text-info">Optimization</span></h2>
          <p className="text-muted">High-complexity billing requires more than general software. It requires expertise.</p>
        </div>

        <div className="row g-4">
          {specialties.map((spec, index) => (
            <div className="col-lg-4" key={index} onClick={() => setActiveSpecialty(index)}>
              <div className={`specialty-card p-4 ${activeSpecialty === index ? 'active' : ''}`}>
                <div className="d-flex justify-content-between align-items-start mb-4">
                  <div>
                    <h4 className="fw-bold mb-1">{spec.name}</h4>
                    <span className="badge bg-info bg-opacity-10 text-info rounded-pill px-3" style={{fontSize: '25px'}}>
                      {spec.impact}
                    </span>
                  </div>
                  <HiOutlineTrendingUp className={`fs-3 ${activeSpecialty === index ? 'text-info' : 'text-light'}`} />
                </div>

                <div className="mb-4">
                  <div className="small fw-bold text-uppercase text-muted tracking-widest mb-2" style={{ fontSize: '0.7rem' }}>Primary Leverage</div>
                  <div className="fw-bold text-dark">{spec.focus}</div>
                </div>

                <p className="small text-muted mb-4" style={{ lineHeight: '1.6' }}>
                  {spec.desc}
                </p>

                <div className="pt-3 border-top">
                  {spec.points.map((point, i) => (
                    <div key={i} className="check-item">
                      <HiOutlineClipboardCheck className="check-icon" />
                      {point}
                    </div>
                  ))}
                </div>
                
                {activeSpecialty === index && (
                  <a href="/contact">
                   <button className="btn btn-dark w-100 mt-4 rounded-pill py-2 fw-bold small">
                     Request {spec.name} Audit <HiOutlineArrowRight className="ms-2" />
                   </button>
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SpecialtyOptimization;