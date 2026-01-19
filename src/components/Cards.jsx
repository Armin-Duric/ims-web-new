import React from 'react';
import { HiOutlineLightBulb, HiOutlineArrowRight } from 'react-icons/hi';

const Cards = () => {
  return (
    <section className="py-5" style={{ background: '#fcfaf7' }}>
      <style>{`
        .minimal-surface {
          background: #ffffff;
          border: 1px solid #e2e8f0;
          border-radius: 40px;
          padding: 5rem 3rem;
          box-shadow: 0 20px 40px rgba(15, 23, 42, 0.03);
          position: relative;
          overflow: hidden;
        }

        .text-carbon { color: #0f172a; }
        .text-slate-medium { color: #475569; }
        
        .accent-circle {
          position: absolute;
          top: -100px;
          right: -100px;
          width: 300px;
          height: 300px;
          background: radial-gradient(circle, rgba(14, 165, 233, 0.05) 0%, transparent 70%);
          pointer-events: none;
        }

        .performance-badge {
          background: #f0f9ff;
          color: #0369a1;
          padding: 6px 16px;
          border-radius: 100px;
          font-size: 0.8rem;
          font-weight: 700;
          letter-spacing: 1px;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 2rem;
        }

        .quote-accent {
          font-size: 4rem;
          line-height: 0;
          color: #0ea5e9;
          opacity: 0.2;
          font-family: serif;
          position: absolute;
          top: 2rem;
          left: 2rem;
        }

        .stat-card {
           border-left: 2px solid #e2e8f0;
           padding-left: 1.5rem;
           transition: border-color 0.3s ease;
        }
        .stat-card:hover {
           border-left-color: #0ea5e9;
        }
      `}</style>

      <div className="container">
        <div className="minimal-surface">
          <div className="accent-circle"></div>
          
          <div className="row g-5 align-items-center">
            {/* Left Column: The Problem & Brand */}
            <div className="col-lg-6">
              <div className="performance-badge">
                <HiOutlineLightBulb /> THE IMS STANDARD
              </div>
              
              <h2 className="display-5 fw-bold text-carbon mb-4" style={{ lineHeight: 1.2 }}>
                Beyond <span className="text-info">Medical Billing.</span> <br />
                A Strategic Partnership.
              </h2>
              
              <p className="fs-5 text-slate-medium mb-5">
                We replace the administrative chaos of specialty billing with a 
                structured, high-velocity revenue engine.
              </p>

              <div className="d-flex flex-wrap gap-4">
                 <div className="stat-card">
                    <div className="h3 fw-bold text-carbon mb-0">+18%</div>
                    <div className="small text-uppercase tracking-wider text-slate-medium">Avg Revenue Lift</div>
                 </div>
                 <div className="stat-card">
                    <div className="h3 fw-bold text-carbon mb-0">98%</div>
                    <div className="small text-uppercase tracking-wider text-slate-medium">Clean Claim Rate</div>
                 </div>
              </div>
            </div>

            {/* Right Column: The Solution */}
            <div className="col-lg-5 offset-lg-1">
              <div className="p-5 rounded-4 position-relative" style={{ background: '#f8fafc', border: '1px solid #f1f5f9' }}>
                <span className="quote-accent">“</span>
                <p className="lead text-carbon fw-medium mb-4" style={{ position: 'relative', zIndex: 1 }}>
                  Medical billing shouldn't be a nightmare. We’ve engineered IMS to be the solution surgeons and administrators actually enjoy using.
                </p>
                <p className="text-slate-medium mb-4">
                  By optimizing every touchpoint—from initial submission to final appeal—we reclaim your time and maximize your financial outcomes.
                </p>
                
                <a href="/contact">             
                  <button className="btn btn-outline-info rounded-pill px-4 py-2 fw-bold d-flex align-items-center gap-2">
                    See Our Process <HiOutlineArrowRight />
                  </button>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Cards;