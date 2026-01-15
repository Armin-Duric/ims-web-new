import React, { useState } from 'react';
import { 
  HiOutlineGlobeAlt, 
  HiOutlineTrendingUp, 
  HiOutlineLibrary, 
  HiOutlineChip,
  HiOutlineScale,
  HiOutlineArrowRight,
  HiOutlineChevronUp,
  HiCheckCircle
} from 'react-icons/hi';

const AboutUs = () => {
  const [expandedIndex, setExpandedIndex] = useState(null);

  const toggleExpand = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  const historyCards = [
    {
      title: "Mission-Driven",
      description: "Founded to simplify the complexities of workers' compensation and personal injury claims.",
      points: [
        "IMS Advantage: Specialized focus on high-complexity legal medical billing.",
        "Maximizing profitability for multi-specialty practices.",
        "Streamlining the bridge between medical providers and legal representatives."
      ],
      icon: <HiOutlineScale />,
      color: "blue"
    },
    {
      title: "Chicago Roots",
      description: "Headquartered in the heart of Chicago, led by experts with 30+ years of RCM mastery.",
      points: [
        "Deep understanding of Illinois and National healthcare regulations.",
        "Leadership with legal-medical backgrounds for superior audit defense.",
        "Centrally located to serve clients across all US time zones."
      ],
      icon: <HiOutlineLibrary />,
      color: "indigo"
    },
    {
      title: "Global Operations",
      description: "A 24/7 global workforce ensuring your revenue cycle never sleeps.",
      points: [
        "Multilingual support: English, German, Spanish, and Slavic languages.",
        "Over 100+ dedicated professionals across international offices.",
        "Real-time data processing and overnight claim scrubbing cycles."
      ],
      icon: <HiOutlineGlobeAlt />,
      color: "blue"
    },
    {
      title: "Tech-Forward",
      description: "Proprietary technology designed to eliminate human error and maximize ROI.",
      points: [
        "IMS Advantage: AI-driven workflows that identify revenue leakage.",
        "Seamless integration with 50+ different EHR/EMR platforms.",
        "Advanced cybersecurity measures exceeding HIPAA requirements."
      ],
      icon: <HiOutlineChip />,
      color: "indigo"
    }
  ];

  return (
    <div className="about-modern-warm py-5">
      <style>{`
        .about-modern-warm {
          background: #ffffff;
          color: #1e293b;
        }

        .hero-tag {
          color: #2563eb;
          font-weight: 800;
          letter-spacing: 2px;
          text-transform: uppercase;
          font-size: 0.85rem;
          display: block;
        }

        .stat-pill {
          background: #fafaf9;
          border: 1px solid #f1f5f9;
          padding: 24px;
          border-radius: 24px;
          transition: all 0.3s ease;
        }

        .stat-pill:hover {
          background: #ffffff;
          box-shadow: 0 10px 30px rgba(0,0,0,0.05);
          transform: translateY(-5px);
        }

        .stat-number {
          font-size: 2rem;
          font-weight: 800;
          color: #0f172a;
          margin-bottom: 0;
        }

        .stat-label {
          color: #2563eb;
          font-weight: 700;
          font-size: 0.75rem;
          text-transform: uppercase;
          letter-spacing: 1px;
        }

        .about-image-container {
          position: relative;
          padding: 20px;
        }

        .image-border-decoration {
          position: absolute;
          top: 0;
          right: 0;
          width: 80%;
          height: 80%;
          border: 2px solid #e2e8f0;
          border-radius: 40px;
          z-index: 0;
        }

        .history-card {
          background: #ffffff;
          border: 1px solid #f1f5f9;
          border-radius: 32px;
          padding: 40px;
          transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          cursor: pointer;
          height: 100%;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.02);
        }

        .history-card:hover {
          border-color: #2563eb;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.05);
        }

        .history-card.active {
          background: #fafaf9;
          border-color: #2563eb;
        }

        .icon-circle {
          width: 60px;
          height: 60px;
          border-radius: 18px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.5rem;
          margin-bottom: 24px;
          background: #f1f5f9;
          color: #2563eb;
        }

        .cta-box-modern {
          background: #0f172a;
          border-radius: 48px;
          padding: 80px 40px;
          color: #ffffff;
          margin-top: 100px;
          position: relative;
          overflow: hidden;
        }

        .cta-box-modern::before {
          content: '';
          position: absolute;
          top: -50%;
          left: -10%;
          width: 300px;
          height: 300px;
          background: rgba(37, 99, 235, 0.2);
          filter: blur(80px);
          border-radius: 50%;
        }
      `}</style>

      <div className="container mt-5 pt-5">
        {/* Hero Section */}
        <div className="row align-items-center g-5 mb-5 pb-5">
          <div className="col-lg-6">
            <span className="hero-tag mb-3">Established Excellence</span>
            <h1 className="display-4 fw-bold text-dark mb-4" style={{ letterSpacing: '-0.02em' }}>
              Your Revenue <br /> 
              <span className="text-primary">Cycle Partner</span>
            </h1>
            
            <p className="lead text-muted mb-5">
              Innovative Management Solutions (IMS) blends 30+ years of healthcare expertise with modern intelligence to transform your practice's financial health.
            </p>

            <div className="row g-3">
              <div className="col-4">
                <div className="stat-pill">
                  <div className="stat-number">30+</div>
                  <div className="stat-label">Years</div>
                </div>
              </div>
              <div className="col-4">
                <div className="stat-pill">
                  <div className="stat-number">100+</div>
                  <div className="stat-label">Experts</div>
                </div>
              </div>
              <div className="col-4">
                <div className="stat-pill">
                  <div className="stat-number">50+</div>
                  <div className="stat-label">Clients</div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-6">
            <div className="about-image-container">
              <div className="image-border-decoration"></div>
              <img
                src="/images/ims-team.jpg"
                alt="IMS Team"
                className="img-fluid rounded-5 shadow-lg position-relative z-index-1"
                style={{ objectFit: 'cover', height: '450px', width: '100%' }}
              />
            </div>
          </div>
        </div>

        {/* Story Section */}
        <div className="text-center mb-5 mt-5">
          <h2 className="display-5 fw-bold text-dark mb-3">Our Foundation</h2>
          <p className="text-muted">Explore the core pillars of the IMS Advantage</p>
        </div>

        <div className="row g-4 mb-5">
          {historyCards.map((card, index) => (
            <div key={index} className="col-lg-3 col-md-6">
              <div 
                className={`history-card ${expandedIndex === index ? 'active' : ''}`}
                onClick={() => toggleExpand(index)}
              >
                <div className="icon-circle">
                  {card.icon}
                </div>
                
                <h3 className="h5 fw-bold text-dark mb-3">{card.title}</h3>
                <p className="text-muted small mb-4">{card.description}</p>

                <div 
                  className="overflow-hidden transition-all"
                  style={{ 
                    maxHeight: expandedIndex === index ? '300px' : '0',
                    opacity: expandedIndex === index ? 1 : 0,
                    transition: 'all 0.5s ease'
                  }}
                >
                  <ul className="list-unstyled mb-4">
                    {card.points.map((point, i) => (
                      <li key={i} className="small text-muted mb-3 d-flex align-items-start gap-2">
                        <HiCheckCircle className="text-primary mt-1 flex-shrink-0" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="text-primary small fw-bold d-flex align-items-center gap-2">
                  {expandedIndex === index ? (
                    <>Show Less <HiOutlineChevronUp /></>
                  ) : (
                    <>Learn More <HiOutlineArrowRight /></>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Modern CTA */}
        <div className="cta-box-modern text-center">
          <div className="position-relative z-index-1">
            <h2 className="display-5 fw-bold mb-3">Build Your Success Story</h2>
            <p className="opacity-75 mb-5 mx-auto" style={{ maxWidth: '600px' }}>
              Experience the efficiency of a world-class revenue cycle team. Let's optimize your practice today.
            </p>
            <a href="/contact" className="btn btn-primary btn-lg rounded-pill px-5 py-3 fw-bold shadow-lg">
              Get a Free Consultation
            </a>
          </div>
        </div>
        
      </div>
    </div>
  );
};

export default AboutUs;