import React from 'react';

const Hero = () => {
  return (
    <section
      className="hero-glass-section"
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
        flexDirection: 'column',
      }}
    >
      <style>{`
        .video-container {
          position: absolute;
          top: 0; left: 0; width: 100%; height: 100%;
          z-index: -1;
        }
        .background-video {
          width: 100%; height: 100%; object-fit: cover;
          filter: brightness(0.6) contrast(1.1);
        }
        
        /* Main Glass Card */
        .glass-hero-card {
          background: rgba(255, 255, 255, 0.07);
          backdrop-filter: blur(25px) saturate(160%);
          -webkit-backdrop-filter: blur(25px) saturate(160%);
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-top: 1px solid rgba(255, 255, 255, 0.4);
          border-left: 1px solid rgba(255, 255, 255, 0.4);
          border-radius: 40px;
          padding: 4rem 2rem;
          box-shadow: 0 40px 100px rgba(0, 0, 0, 0.4);
          max-width: 900px;
        }

        /* Modern Gradient Text */
        .gradient-heading {
          background: linear-gradient(to right, #ffffff, #a5f3fc);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          line-height: 1.1;
        }

        /* High-Gloss Button */
        .glass-btn {
          background: rgba(0, 255, 204, 0.15);
          color: #00ffcc;
          border: 1px solid rgba(0, 255, 204, 0.5);
          backdrop-filter: blur(10px);
          padding: 16px 40px;
          border-radius: 100px;
          font-weight: 700;
          letter-spacing: 1px;
          text-transform: uppercase;
          transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          text-decoration: none;
          display: inline-block;
        }

        .glass-btn:hover {
          background: #00ffcc;
          color: #1a3c5e;
          transform: translateY(-5px);
          box-shadow: 0 0 30px rgba(0, 255, 204, 0.4);
        }

        /* Glass Badge for SOC-2 */
        .trust-badge-glass {
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(15px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 24px;
          padding: 20px;
          display: inline-block;
          margin-top: 30px;
          transition: transform 0.3s ease;
        }
        
        .trust-badge-glass:hover {
          transform: scale(1.05);
          border-color: rgba(255, 255, 255, 0.3);
        }

        .floating-anim {
          animation: floating 3s ease-in-out infinite;
        }

        @keyframes floating {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
      `}</style>

      <div className="video-container">
        <video
          className="background-video"
          autoPlay
          muted
          loop
          playsInline
        >
          <source src="/images/videos/bg-video.mp4" type="video/mp4" />
        </video>
      </div>

      <div className="container text-center mt-5 pt-4">
        <div className="glass-hero-card mx-auto animate__animated animate__fadeInUp">
          <h1 className="display-3 fw-bold mb-4 gradient-heading pb-3">
            Transform Your Business with Innovative Management Solutions
          </h1>
          
          <p className="fs-4 mb-4 text-white opacity-90" style={{ maxWidth: '700px', margin: '0 auto' }}>
            Discover cutting-edge medical billing strategies to drive growth and success.
          </p>
          
          <div className="d-flex align-items-center justify-content-center gap-3 mb-5">
            <div style={{ height: '1px', width: '30px', background: '#00ffcc' }}></div>
            <p className="fw-bold text-info mb-0 text-uppercase tracking-widest small">
              Leading Revenue Management in Illinois
            </p>
            <div style={{ height: '1px', width: '30px', background: '#00ffcc' }}></div>
          </div>

          <a href="/contact" className="glass-btn">
            Get Started Today
          </a>
        </div>

        {/* SOC-2 Badge */}
        <div className="trust-badge-glass floating-anim mt-5">
          <img 
            src="/images/SOC-2.png" 
            alt="SOC-2 Certified" 
            style={{ 
              height: '120px', 
              width: 'auto', 
              filter: 'drop-shadow(0 0 10px rgba(255,255,255,0.2))' 
            }}
          />
          <p className="small fw-bold text-white opacity-50 mt-2 mb-0">COMPLIANCE CERTIFIED</p>
        </div>
      </div>
    </section>
  );
};

export default Hero;