import { useState, useRef, useEffect } from 'react';

const Strengths = () => {
  const [hoveredIndex, setHoveredIndex] = useState(0);
  const videoRef = useRef(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [opacity, setOpacity] = useState(1);

  const strengths = [
    {
      title: "Proven Expertise",
      description: "35+ years of industry leadership.",
      icon: "fas fa-star",
      videoSrc: "/images/videos/proven-expertise.mp4",
      textContent: [
        "<strong>35+ years</strong> leading RCM, driving consistent revenue growth.",
        "<strong>Expert team</strong> reduces in-house costs via efficient outsourcing.",
        "<strong>Certified specialists</strong> excel in maximizing complex claims.",
        "<strong>$60M+</strong> in annual collections for over 50 clients."
      ]
    },
    {
      title: "Innovative Tech",
      description: "State-of-the-art billing tools.",
      icon: "fas fa-laptop",
      videoSrc: "/images/videos/ai.mp4",
      textContent: [
        "<strong>Cutting-edge software</strong> accelerates billing by 25%.",
        "<strong>Real-time analytics</strong> dashboards for cash flow insights.",
        "<strong>Automated claims</strong> workflows minimize denials by 20%.",
        "<strong>AI-driven tools</strong> predict payment trends accurately."
      ]
    },
    {
      title: "Tailored Support",
      description: "Customized services for your practice.",
      icon: "fas fa-users",
      videoSrc: "/images/videos/support.mp4",
      textContent: [
        "<strong>Custom RCM plans</strong> built for your specific specialty.",
        "<strong>Dedicated account teams</strong> for fast, accurate billing.",
        "<strong>24/7 support</strong> to maintain operational efficiency.",
        "<strong>Proactive communication</strong> on all billing outcomes."
      ]
    },
    {
      title: "Compliance",
      description: "Unwavering regulatory standards.",
      icon: "fas fa-shield-alt",
      videoSrc: "/images/videos/compliance.mp4",
      textContent: [
        "<strong>Strict adherence</strong> to HIPAA and federal regulations.",
        "<strong>Audited transactions</strong> to protect against legal risks.",
        "<strong>Expert risk management</strong> minimizes financial penalties.",
        "<strong>Robust encryption</strong> safeguards sensitive patient data."
      ]
    }
  ];

  const handleHover = (index) => {
    if (hoveredIndex !== index && !isTransitioning) {
      setIsTransitioning(true);
      setOpacity(0);
      setTimeout(() => {
        setHoveredIndex(index);
        setOpacity(1);
        setTimeout(() => setIsTransitioning(false), 400);
      }, 400);
    }
  };

  return (
    <section className="strengths-wrapper">
      <style>{`
        .strengths-wrapper {
          position: relative;
          min-height: 850px;
          display: flex;
          align-items: center;
          overflow: hidden;
          background: #000;
        }

        .video-bg {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          z-index: 0;
          transition: opacity 0.6s ease-in-out;
        }

        .video-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(to right, rgba(15, 23, 42, 0.95) 30%, rgba(15, 23, 42, 0.4) 100%);
          z-index: 1;
        }

        .glass-tab-container {
          background: rgba(255, 255, 255, 0.03);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 30px;
          padding: 40px;
          z-index: 2;
          box-shadow: 0 25px 50px rgba(0,0,0,0.3);
        }

        .strength-nav-btn {
          background: transparent;
          border: 1px solid rgba(255, 255, 255, 0.1);
          color: white;
          border-radius: 15px;
          padding: 20px;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          margin-bottom: 15px;
          width: 100%;
          text-align: left;
          display: flex;
          align-items: center;
          gap: 15px;
        }

        .strength-nav-btn.active {
          background: rgba(0, 255, 204, 0.1);
          border-color: #00ffcc;
          box-shadow: 0 0 20px rgba(0, 255, 204, 0.2);
          transform: translateX(10px);
        }

        .strength-nav-btn.active i {
          color: #00ffcc;
        }

        .list-item-animate {
          animation: fadeInUp 0.5s ease forwards;
          opacity: 0;
          list-style: none;
          position: relative;
          padding-left: 30px;
          margin-bottom: 15px;
          font-size: 1.1rem;
          color: rgba(255,255,255,0.85);
        }

        .list-item-animate::before {
          content: '→';
          position: absolute;
          left: 0;
          color: #00ffcc;
          font-weight: bold;
        }

        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .strength-title-main {
          background: linear-gradient(90deg, #fff, #00ffcc);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          font-weight: 800;
        }
      `}</style>

      <video
        ref={videoRef}
        key={strengths[hoveredIndex].videoSrc}
        className="video-bg"
        autoPlay
        muted
        loop
        playsInline
        style={{ opacity }}
      >
        <source src={strengths[hoveredIndex].videoSrc} type="video/mp4" />
      </video>
      <div className="video-overlay"></div>

      <div className="container position-relative" style={{ zIndex: 3 }}>
        <div className="row align-items-center">
          {/* Navigation Sidebar */}
          <div className="col-lg-5">
            <h2 className="display-5 mb-2 text-white fw-bold">IMS <span className="strength-title-main">Strengths</span></h2>
            <p className="text-white-50 mb-5">Click to explore our pillars of excellence.</p>
            
            <div className="nav-wrapper">
              {strengths.map((strength, index) => (
                <button
                  key={index}
                  className={`strength-nav-btn ${hoveredIndex === index ? 'active' : ''}`}
                  onClick={() => handleHover(index)}
                  onMouseEnter={() => handleHover(index)}
                >
                  <i className={`${strength.icon} fa-xl`}></i>
                  <div>
                    <div className="fw-bold">{strength.title}</div>
                    <small className="opacity-50 d-none d-md-block">{strength.description}</small>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Content Display */}
          <div className="col-lg-6 offset-lg-1">
            <div className="glass-tab-container">
              <h3 className="h2 mb-4 text-white">
                {strengths[hoveredIndex].title}
              </h3>
              <ul className="p-0">
                {strengths[hoveredIndex].textContent.map((text, idx) => (
                  <li 
                    key={`${hoveredIndex}-${idx}`} 
                    className="list-item-animate"
                    style={{ animationDelay: `${idx * 0.1}s` }}
                    dangerouslySetInnerHTML={{ __html: text }} 
                  />
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