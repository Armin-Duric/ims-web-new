import React from 'react';

const Home = () => {
  return (
    <div className="hero-viewport">
      <style>{`
        .hero-viewport {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #0f172a; /* Matches the Content component deep slate */
          position: relative;
          overflow: hidden;
          color: white;
          text-align: center;
        }

        /* Ambient Background Orbs */
        .orb {
          position: absolute;
          border-radius: 50%;
          filter: blur(80px);
          z-index: 0;
          opacity: 0.4;
          animation: drift 15s infinite alternate ease-in-out;
        }

        .orb-1 {
          width: 400px;
          height: 400px;
          background: #00ffcc;
          top: -10%;
          left: -10%;
        }

        .orb-2 {
          width: 500px;
          height: 500px;
          background: #3b82f6;
          bottom: -15%;
          right: -10%;
          animation-delay: -5s;
        }

        @keyframes drift {
          from { transform: translate(0, 0) scale(1); }
          to { transform: translate(100px, 50px) scale(1.1); }
        }

        /* Glass Content Styling */
        .hero-content {
          position: relative;
          z-index: 1;
          backdrop-filter: blur(5px);
          padding: 2rem;
        }

        .hero-title {
          font-size: clamp(3rem, 8vw, 5rem);
          font-weight: 800;
          letter-spacing: -2px;
          margin-bottom: 1.5rem;
          background: linear-gradient(180deg, #ffffff 0%, rgba(255,255,255,0.7) 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .hero-lead {
          font-size: 1.25rem;
          color: rgba(255, 255, 255, 0.7);
          max-width: 700px;
          margin: 0 auto 3rem auto;
          line-height: 1.6;
        }

        /* Modern Button Duo */
        .btn-stack {
          display: flex;
          gap: 1rem;
          justify-content: center;
          align-items: center;
        }

        .btn-main {
          background: #00ffcc;
          color: #0f172a;
          padding: 16px 36px;
          border-radius: 12px;
          font-weight: 600;
          text-decoration: none;
          transition: all 0.3s ease;
          border: 1px solid #00ffcc;
        }

        .btn-main:hover {
          background: transparent;
          color: #00ffcc;
          transform: translateY(-3px);
          box-shadow: 0 10px 30px rgba(0, 255, 204, 0.2);
        }

        .btn-outline {
          background: rgba(255, 255, 255, 0.05);
          color: white;
          padding: 16px 36px;
          border-radius: 12px;
          font-weight: 600;
          text-decoration: none;
          border: 1px solid rgba(255, 255, 255, 0.2);
          backdrop-filter: blur(10px);
          transition: all 0.3s ease;
        }

        .btn-outline:hover {
          background: rgba(255, 255, 255, 0.1);
          border-color: white;
        }
      `}</style>

      {/* Background elements */}
      <div className="orb orb-1"></div>
      <div className="orb orb-2"></div>

      <div className="container">
        <div className="hero-content">
          <div className="badge rounded-pill bg-dark border border-secondary mb-4 py-2 px-4 text-uppercase fw-bold" style={{ fontSize: '0.75rem', letterSpacing: '2px', color: '#00ffcc' }}>
            Next-Gen Revenue Cycle Management
          </div>
          
          <h1 className="hero-title">
            Welcome to <span style={{ color: '#00ffcc', WebkitTextFillColor: '#00ffcc' }}>IMS</span>
          </h1>
          
          <p className="hero-lead">
            Discover how Innovative Management Solutions can transform your 
            medical billing and revenue cycle management with data-driven precision.
          </p>

          <div className="btn-stack">
            <a href="/about" className="btn-main">
              Learn More
            </a>
            <a href="/contact" className="btn-outline">
              Contact Us
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;