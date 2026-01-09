import React from 'react';

const Cards = () => {
  return (
    <section className="py-5 position-relative overflow-hidden gradient-bg">
      <style>{`
        /* The "Chaos vs Solution" Container */
        .console-glass {
          background: rgba(10, 15, 25, 0.4);
          backdrop-filter: blur(20px) saturate(140%);
          -webkit-backdrop-filter: blur(20px) saturate(140%);
          border-radius: 50px;
          border: 1px solid rgba(255, 255, 255, 0.1);
          padding: 4rem 2rem;
          position: relative;
          overflow: hidden;
        }

        /* Decorative Background Orbs for extra glass depth */
        .glass-orb {
          position: absolute;
          width: 300px;
          height: 300px;
          border-radius: 50%;
          filter: blur(80px);
          z-index: -1;
          opacity: 0.2;
        }

        .orb-1 { top: -100px; left: -100px; background: #00ffcc; }
        .orb-2 { bottom: -100px; right: -100px; background: #224380; }

        .neon-glow-text {
          color: #fff;
          text-shadow: 0 0 20px rgba(0, 255, 204, 0.4);
          letter-spacing: -1px;
        }

        .highlight-cyan {
          color: #00ffcc;
          font-weight: 800;
          text-transform: uppercase;
        }

        .glass-divider {
          height: 1px;
          width: 100px;
          background: linear-gradient(90deg, transparent, #00ffcc, transparent);
          margin: 2rem auto;
        }

        .fade-up {
          animation: fadeInUp 1s ease-out;
        }

        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      <div className="container position-relative">
        {/* Decorative Orbs behind the glass */}
        <div className="glass-orb orb-1"></div>
        <div className="glass-orb orb-2"></div>

        <div className="console-glass fade-up text-white text-center shadow-2xl">
          <div className="row justify-content-center">
            <div className="col-lg-10">
              
              <h3 className="display-5 fw-bold neon-glow-text mb-4">
                Medical Billing Chaos? <br />
                <span className="fs-2 opacity-75">Meet Your New Best Friend:</span> <br />
                <span className="highlight-cyan">Innovative Management Solutions</span>
              </h3>

              <div className="glass-divider"></div>

              <div className="row mt-5 text-start g-4">
                <div className="col-md-6">
                  <div className="p-4 rounded-4" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)' }}>
                    <p className="lead mb-0 opacity-90 italic">
                      "Let’s be honest—medical billing is a nightmare. That's where <span className="text-info fw-bold">IMS</span> hops in!"
                    </p>
                  </div>
                </div>
                <div className="col-md-6">
                  <p className="mb-3 opacity-75">
                    Our specialized services optimize <span className="text-white fw-bold">claims submission</span>, 
                    appeals, and payment processing to reduce administrative burdens and improve financial outcomes.
                  </p>
                  <p className="mb-0 opacity-75 border-start border-info ps-3 border-3">
                    IMS is more than a medical billing company. With our trained staff, 
                    we are built to overcome every hurdle you face.
                  </p>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Cards;