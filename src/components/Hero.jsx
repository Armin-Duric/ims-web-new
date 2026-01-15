import React from 'react';
import { HiOutlineShieldCheck, HiOutlineLightningBolt, HiOutlineTrendingUp, HiArrowRight } from 'react-icons/hi';

const Hero = () => {
  return (
    <section className="hero-elite-wrapper">
      <style>{`
        .hero-elite-wrapper {
          min-height: 100vh;
          background: #ffffff;
          position: relative;
          overflow: hidden;
          display: flex;
          align-items: center;
          padding: 120px 0 160px 0; /* Added extra bottom padding for transition */
          color: #0f172a;
        }

        /* 1. Subtle Background Texture */
        .grid-overlay {
          position: absolute;
          inset: 0;
          background-image: 
            linear-gradient(rgba(15, 23, 42, 0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(15, 23, 42, 0.03) 1px, transparent 1px);
          background-size: 50px 50px;
          mask-image: radial-gradient(circle at 60% 50%, black, transparent 70%);
          z-index: 1;
        }

        /* 2. Soft Ambient Glows */
        .blur-orb {
          position: absolute;
          width: 500px;
          height: 500px;
          border-radius: 50%;
          filter: blur(100px);
          opacity: 0.3;
          z-index: 0;
        }
        .orb-warm { top: -10%; right: -5%; background: #fff7ed; }
        .orb-blue { bottom: -10%; left: -5%; background: #eff6ff; }

        /* 3. Typography */
        .hero-content { z-index: 10; position: relative; }
        
        .badge-elite {
          background: #f8fafc;
          border: 1px solid #cbd5e1;
          padding: 10px 20px;
          border-radius: 100px;
          font-size: 0.8rem;
          font-weight: 700;
          letter-spacing: 1.5px;
          color: #334155;
          display: inline-flex;
          align-items: center;
          gap: 10px;
          box-shadow: 0 2px 5px rgba(0,0,0,0.05);
          margin-bottom: 2rem;
        }

        .hero-h1 {
          font-size: clamp(3.2rem, 6vw, 5rem);
          font-weight: 800;
          line-height: 1.1;
          letter-spacing: -0.04em;
          color: #020617;
          margin-bottom: 1.5rem;
        }

        .text-highlight {
          color: #2563eb;
          position: relative;
          display: inline-block;
        }
        
        .text-highlight::after {
          content: '';
          position: absolute;
          bottom: 5px;
          left: 0;
          width: 100%;
          height: 8px;
          background: rgba(37, 99, 235, 0.2);
          z-index: -1;
        }

        .hero-lead {
          font-size: 1.25rem;
          line-height: 1.6;
          color: #334155;
          font-weight: 500;
          max-width: 540px;
          margin-bottom: 2.5rem;
        }

        /* 4. Video Dock */
        .video-dock {
          position: relative;
          z-index: 10;
          perspective: 1500px;
        }

        .video-main-frame {
          width: 100%;
          height: 600px;
          border-radius: 30px;
          background: #0f172a;
          overflow: hidden;
          box-shadow: 0 40px 80px -20px rgba(15, 23, 42, 0.25);
          transform: rotateY(-12deg) rotateX(4deg);
          border: 12px solid #ffffff;
          transition: transform 0.5s ease;
        }
        
        .video-dock:hover .video-main-frame {
          transform: rotateY(-8deg) rotateX(2deg) scale(1.02);
        }

        .stat-floating-card {
          position: absolute;
          background: #ffffff;
          padding: 24px;
          border-radius: 24px;
          box-shadow: 0 20px 40px rgba(15, 23, 42, 0.12);
          border: 1px solid #e2e8f0;
          z-index: 20;
          animation: floatY 6s ease-in-out infinite;
          min-width: 220px;
        }

        .btn-elite-primary {
          background: #0f172a;
          color: #fff;
          padding: 20px 44px;
          border-radius: 14px;
          font-weight: 700;
          font-size: 1.1rem;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          gap: 10px;
          transition: all 0.3s ease;
          box-shadow: 0 10px 25px rgba(15, 23, 42, 0.15);
        }

        .btn-elite-primary:hover {
          transform: translateY(-3px);
          box-shadow: 0 20px 35px rgba(15, 23, 42, 0.25);
          color: white;
        }
        
        .avatar-circle {
          width: 42px;
          height: 42px;
          border-radius: 50%;
          border: 3px solid #fff;
          background-color: #e2e8f0;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: bold;
          font-size: 12px;
          color: #64748b;
        }

        /* 5. Smooth Bottom Transition Elements */
        .hero-bottom-fade {
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 150px;
          background: linear-gradient(to bottom, transparent, #ffffff);
          z-index: 5;
          pointer-events: none;
        }

        .scroll-indicator {
          position: absolute;
          bottom: 40px;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 12px;
          z-index: 10;
          opacity: 0.7;
        }

        .scroll-pill {
          width: 30px;
          height: 50px;
          border: 2px solid #94a3b8;
          border-radius: 20px;
          position: relative;
        }

        .scroll-pill::before {
          content: '';
          position: absolute;
          top: 8px;
          left: 50%;
          transform: translateX(-50%);
          width: 4px;
          height: 8px;
          background: #0f172a;
          border-radius: 4px;
          animation: scrollDown 2s infinite;
        }

        .scroll-text {
          font-size: 0.7rem;
          font-weight: 700;
          letter-spacing: 2px;
          color: #64748b;
        }

        @keyframes scrollDown {
          0% { transform: translate(-50%, 0); opacity: 0; }
          40% { transform: translate(-50%, 0); opacity: 1; }
          80% { transform: translate(-50%, 15px); opacity: 0; }
          100% { transform: translate(-50%, 15px); opacity: 0; }
        }

        @keyframes floatY {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }
      `}</style>

      <div className="grid-overlay"></div>
      <div className="blur-orb orb-warm"></div>
      <div className="blur-orb orb-blue"></div>

      <div className="container">
        <div className="row align-items-center">
          
          <div className="col-lg-6 hero-content pe-lg-5">
            <div className="badge-elite animate__animated animate__fadeIn">
              <HiOutlineShieldCheck className="text-primary fs-5" /> 
              TRUSTED BY 200+ CLINICS
            </div>

            <h1 className="hero-h1">
              Revenue <br />
              Optimization <br />
              <span className="text-highlight">Beyond Codes.</span>
            </h1>

            <p className="hero-lead">
              We specialize in the high-stakes intersection of <strong>Orthopedic Surgery</strong>, <strong>PT</strong>, and <strong>Legal Medical Claims</strong>. Stop leaving revenue on the table.
            </p>
            
            <div className="d-flex flex-wrap gap-3 mb-5">
               <span className="badge bg-white text-dark border border-2 px-3 py-2 rounded-pill fw-bold">Workers' Comp</span>
               <span className="badge bg-white text-dark border border-2 px-3 py-2 rounded-pill fw-bold">Personal Injury</span>
               <span className="badge bg-white text-dark border border-2 px-3 py-2 rounded-pill fw-bold">No-Fault</span>
            </div>

            <div className="d-flex flex-column flex-sm-row align-items-start align-items-sm-center gap-4">
              <a href="/contact" className="btn-elite-primary">
                Start Free Audit <HiArrowRight />
              </a>
              
              <div className="d-flex align-items-center gap-3">
                <div className="d-flex ps-2">
                  <div className="avatar-circle" style={{zIndex:3}}>JD</div>
                  <div className="avatar-circle" style={{marginLeft:'-12px', zIndex:2, background:'#cbd5e1'}}>SM</div>
                  <div className="avatar-circle" style={{marginLeft:'-12px', zIndex:1, background:'#94a3b8', color:'white'}}>+15</div>
                </div>
                <div className="d-flex flex-column">
                  <span className="fw-bold text-dark lh-1 small">Join New Clinics</span>
                  <span className="text-muted small" style={{fontSize: '0.75rem'}}>This Month</span>
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-6 mt-5 mt-lg-0">
            <div className="video-dock">
              <div className="stat-floating-card" style={{ top: '20px', left: '-40px' }}>
                <div className="d-flex align-items-center gap-3">
                  <div className="bg-blue-100 p-3 rounded-circle" style={{background: '#eff6ff'}}>
                    <HiOutlineLightningBolt className="text-primary fs-3" />
                  </div>
                  <div>
                    <div className="small text-secondary fw-bold text-uppercase tracking-wider">Denials Reduced</div>
                    <div className="h3 fw-bold text-dark mb-0">-38%</div>
                  </div>
                </div>
              </div>

              <div className="stat-floating-card" style={{ bottom: '80px', right: '-30px', animationDelay: '2s' }}>
                <div className="d-flex align-items-center gap-3">
                  <div className="bg-green-100 p-3 rounded-circle" style={{background: '#f0fdf4'}}>
                    <HiOutlineTrendingUp className="text-success fs-3" />
                  </div>
                  <div>
                    <div className="small text-secondary fw-bold text-uppercase tracking-wider">Revenue Lift</div>
                    <div className="h3 fw-bold text-dark mb-0">+24%</div>
                  </div>
                </div>
              </div>

              <div className="video-main-frame">
                <video
                  autoPlay muted loop playsInline
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                >
                  <source src="/images/videos/bg-video.mp4" type="video/mp4" />
                </video>
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(15,23,42,0.5), transparent)' }}></div>
              </div>

              <div className="mt-4 d-flex justify-content-center align-items-center gap-3 opacity-100">
                <img src="/images/SOC-2.png" alt="SOC2" style={{ height: '55px' }} />
                <div style={{ height: '40px', width: '2px', background: '#cbd5e1' }}></div>
                <div className="d-flex flex-column">
                  <span className="fw-bold text-dark small">SOC-2 TYPE II</span>
                  <span className="text-muted small" style={{fontSize:'0.7rem'}}>ENTERPRISE SECURITY</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Transition Elements */}
      <div className="hero-bottom-fade"></div>
      <div className="scroll-indicator">
        <div className="scroll-pill"></div>
        <span className="scroll-text">SCROLL</span>
      </div>
    </section>
  );
};

export default Hero;