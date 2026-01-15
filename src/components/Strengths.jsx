import { useState } from 'react';
import { HiOutlineStar, HiOutlineDesktopComputer, HiOutlineUserGroup, HiOutlineShieldCheck, HiChevronRight } from 'react-icons/hi';

const Strengths = () => {
  const [active, setActive] = useState(0);

  const strengths = [
    {
      title: "Proven Expertise",
      description: "35+ years of industry leadership.",
      icon: <HiOutlineStar />,
      videoSrc: "/images/videos/proven-expertise.mp4", 
      textContent: [
        "<strong>35+ years</strong> leading RCM with consistent revenue growth.",
        "<strong>Expert team</strong> reduces in-house overhead costs.",
        "<strong>Certified specialists</strong> in complex surgical claims.",
        "<strong>$60M+</strong> in annual collections for 50+ clients."
      ]
    },
    {
      title: "Innovative Tech",
      description: "State-of-the-art billing tools.",
      icon: <HiOutlineDesktopComputer />,
      videoSrc: "/images/videos/ai.mp4",
      textContent: [
        "<strong>Proprietary software</strong> accelerates billing by 25%.",
        "<strong>Real-time analytics</strong> for instant cash flow insights.",
        "<strong>Automated workflows</strong> minimize denials by 20%.",
        "<strong>AI-driven tools</strong> for accurate payment prediction."
      ]
    },
    {
      title: "Tailored Support",
      description: "Customized services for your practice.",
      icon: <HiOutlineUserGroup />,
      videoSrc: "/images/videos/support.mp4",
      textContent: [
        "<strong>Custom RCM plans</strong> built for your specialty.",
        "<strong>Dedicated account teams</strong> for personalized service.",
        "<strong>24/7 support</strong> to maintain operational flow.",
        "<strong>Proactive reporting</strong> on all billing outcomes."
      ]
    },
    {
      title: "Compliance",
      description: "Unwavering regulatory standards.",
      icon: <HiOutlineShieldCheck />,
      videoSrc: "/images/videos/compliance.mp4",
      textContent: [
        "<strong>Strict adherence</strong> to HIPAA regulations.",
        "<strong>Audited transactions</strong> to protect against legal risk.",
        "<strong>Expert risk management</strong> avoids financial penalties.",
        "<strong>Robust encryption</strong> for sensitive patient data."
      ]
    },
  ];

  return (
    <section className="strengths-hero-style">
      <style>{`
        .strengths-hero-style {
          background: #fdfcfb;
          padding: 120px 0;
          overflow: hidden;
        }

        .strength-selector {
          background: #ffffff;
          border: 1px solid #f1f5f9;
          border-radius: 24px;
          padding: 12px;
          cursor: pointer;
          transition: all 0.2s ease; /* Snappy transition */
          display: flex;
          align-items: center;
          gap: 16px;
          margin-bottom: 12px;
          border-left: 4px solid transparent;
        }

        .strength-selector:hover {
          background: #f8fafc;
        }

        .strength-selector.active {
          background: #ffffff;
          border-color: #e2e8f0;
          border-left: 4px solid #2563eb;
          box-shadow: 0 10px 25px rgba(0,0,0,0.05);
        }

        .icon-box-sm {
          width: 48px;
          height: 48px;
          background: #f1f5f9;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #64748b;
          font-size: 1.25rem;
          transition: all 0.2s ease;
        }

        .active .icon-box-sm {
          background: #2563eb;
          color: #ffffff;
        }

        /* The Video Container mimicking a High-Tech Display */
        .video-display-frame {
          position: relative;
          background: #0f172a;
          border-radius: 40px;
          padding: 12px;
          box-shadow: 0 40px 80px rgba(0,0,0,0.15);
          border: 8px solid #ffffff;
        }

        .video-display-frame video {
          width: 100%;
          border-radius: 28px;
          display: block;
          aspect-ratio: 16/9;
          object-fit: cover;
        }

        .feature-list {
          list-style: none;
          padding: 0;
          margin-top: 30px;
        }

        .feature-list li {
          margin-bottom: 16px;
          padding-left: 28px;
          position: relative;
          color: #475569;
          font-size: 1.1rem;
        }

        .feature-list li::before {
          content: '→';
          position: absolute;
          left: 0;
          color: #2563eb;
          font-weight: bold;
        }

        .strength-header-tag {
          color: #2563eb;
          font-weight: 800;
          letter-spacing: 2px;
          text-transform: uppercase;
          font-size: 0.85rem;
          display: block;
          margin-bottom: 8px;
        }
      `}</style>

      <div className="container">
        <div className="row align-items-center g-5">
          
          {/* Left: Interaction Layer */}
          <div className="col-lg-5">
            <span className="strength-header-tag">Why IMS?</span>
            <h2 className="display-5 fw-bold text-dark mb-4">Core Pillars of <br/> Clinical Success</h2>
            
            <div className="mt-4">
              {strengths.map((s, i) => (
                <div 
                  key={i} 
                  className={`strength-selector ${active === i ? 'active' : ''}`}
                  onMouseEnter={() => setActive(i)}
                >
                  <div className="icon-box-sm">{s.icon}</div>
                  <div className="flex-grow-1">
                    <div className="fw-bold text-dark">{s.title}</div>
                    <div className="small text-muted">{s.description}</div>
                  </div>
                  <HiChevronRight className={`text-primary opacity-${active === i ? '100' : '0'}`} />
                </div>
              ))}
            </div>
          </div>

          {/* Right: Dynamic Video Display */}
          <div className="col-lg-7">
            <div className="video-display-frame">
              <video
                key={strengths[active].videoSrc}
                autoPlay
                muted
                loop
                playsInline
              >
                <source src={strengths[active].videoSrc} type="video/mp4" />
              </video>
            </div>

            {/* Content for the active strength rendered below or beside video */}
            <div className="mt-4 px-3">
              <h3 className="h3 fw-bold text-dark">{strengths[active].title}</h3>
              <ul className="feature-list">
                {strengths[active].textContent.map((text, idx) => (
                  <li key={idx} dangerouslySetInnerHTML={{ __html: text }} />
                ))}
              </ul>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Strengths;