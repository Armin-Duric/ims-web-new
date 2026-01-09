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
      icon: <HiOutlineScale className="w-8 h-8" />,
      color: "text-blue-400"
    },
    {
      title: "Chicago Roots",
      description: "Headquartered in the heart of Chicago, led by experts with 20+ years of RCM mastery.",
      points: [
        "Deep understanding of Illinois and National healthcare regulations.",
        "Leadership with legal-medical backgrounds for superior audit defense.",
        "Centrally located to serve clients across all US time zones."
      ],
      icon: <HiOutlineLibrary className="w-8 h-8" />,
      color: "text-emerald-400"
    },
    {
      title: "Global Operations",
      description: "A 24/7 global workforce ensuring your revenue cycle never sleeps.",
      points: [
        "Multilingual support: English, German, Spanish, and Slavic languages.",
        "Over 100+ dedicated professionals across international offices.",
        "Real-time data processing and overnight claim scrubbing cycles."
      ],
      icon: <HiOutlineGlobeAlt className="w-8 h-8" />,
      color: "text-purple-400"
    },
    {
      title: "Tech-Forward",
      description: "Proprietary technology designed to eliminate human error and maximize ROI.",
      points: [
        "IMS Advantage: AI-driven workflows that identify revenue leakage.",
        "Seamless integration with 50+ different EHR/EMR platforms.",
        "Advanced cybersecurity measures exceeding HIPAA requirements."
      ],
      icon: <HiOutlineChip className="w-8 h-8" />,
      color: "text-amber-400"
    }
  ];

  return (
    <div className="gradient-services-bg min-h-screen py-20 px-4 mt-5">
      <div className="container mx-auto max-w-7xl">
        
        {/* Hero Section */}
        <div className="row align-items-center g-5 mb-5 pb-5">
          <div className="col-lg-7">
            <span className="text-blue-400 font-bold tracking-widest uppercase text-sm mb-3 d-block">Established Excellence</span>
            <h1 className="display-3 fw-bold text-white mb-4">
              Your Revenue <br /> 
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">
                Cycle Partner
              </span>
            </h1>
            
            <p className="lead text-white opacity-75 mb-4">
              Innovative Management Solutions (IMS) blends 30+ years of healthcare expertise with modern intelligence to transform your practice's financial health.
            </p>

            {/* Repositioned Expertise Badge & Stats */}
            <div className="d-flex flex-wrap gap-3 mb-5">
              <div className="p-3 rounded-4 bg-white bg-opacity-10 border border-white border-opacity-20 flex-grow-1">
                <h4 className="text-white fw-bold mb-0">30+ Years</h4>
                <p className="text-blue-400 small mb-0 font-bold uppercase tracking-tighter">Leadership</p>
              </div>
              <div className="p-3 rounded-4 bg-white bg-opacity-10 border border-white border-opacity-20 flex-grow-1">
                <h4 className="text-white fw-bold mb-0">100+</h4>
                <p className="text-emerald-400 small mb-0 font-bold uppercase tracking-tighter">Specialists</p>
              </div>
              <div className="p-3 rounded-4 bg-white bg-opacity-10 border border-white border-opacity-20 flex-grow-1">
                <h4 className="text-white fw-bold mb-0">50+</h4>
                <p className="text-purple-400 small mb-0 font-bold uppercase tracking-tighter">Medical Clients</p>
              </div>
            </div>

            <div className="d-flex flex-column flex-sm-row gap-3">
              <a href="/contact" className="btn btn-primary btn-lg rounded-pill px-5 shadow-lg border-0">
                Connect With Us Today
              </a>
            </div>
          </div>

          <div className="col-lg-5">
            <div className="position-relative">
              {/* Glow Behind Image */}
              <div className="position-absolute top-50 start-50 translate-middle w-100 h-100 bg-blue-500 rounded-circle opacity-10" style={{ filter: 'blur(100px)' }}></div>
              <img
                src="/images/ims-team.jpg"
                alt="IMS Team"
                className="img-fluid rounded-5 shadow-2xl position-relative z-index-1"
                style={{ 
                  border: '1px solid rgba(255,255,255,0.1)',
                  boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
                }}
              />
            </div>
          </div>
        </div>

        {/* Story Section Header */}
        <div className="text-center mb-5 mt-5">
          <h2 className="display-5 fw-bold text-white mb-2">Our Foundation</h2>
          <p className="text-white opacity-50">Click a card to see the IMS Advantage</p>
        </div>

        {/* History Cards Grid */}
        <div className="row g-4 mb-4">
          {historyCards.map((card, index) => (
            <div key={index} className="col-lg-3 col-md-6">
              <article 
                className="h-100 p-4 border-0 position-relative transition-all cursor-pointer"
                onClick={() => toggleExpand(index)}
                style={{
                  background: 'rgba(255, 255, 255, 0.05)',
                  backdropFilter: 'blur(15px)',
                  WebkitBackdropFilter: 'blur(15px)',
                  borderRadius: '24px',
                  border: expandedIndex === index ? '1px solid rgba(96, 165, 250, 0.5)' : '1px solid rgba(255, 255, 255, 0.1)',
                  transform: expandedIndex === index ? 'translateY(-10px)' : 'none',
                  transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
                }}
              >
                <div className={`mb-4 p-3 d-inline-block rounded-4 ${card.color} bg-white bg-opacity-10`}>
                  {card.icon}
                </div>
                
                <h3 className="h4 fw-bold text-white mb-3">{card.title}</h3>
                <p className="text-white opacity-10 mb-4 small lh-lg">{card.description}</p>

                {/* Expanded Bullet Points */}
                <div 
                  className="overflow-hidden transition-all duration-500"
                  style={{ 
                    maxHeight: expandedIndex === index ? '400px' : '0',
                    opacity: expandedIndex === index ? 1 : 0
                  }}
                >
                  <ul className="list-unstyled mb-4">
                    {card.points.map((point, i) => (
                      <li key={i} className="text-white small opacity-75 mb-2 d-flex align-items-start gap-2">
                        <HiCheckCircle className={`${card.color} flex-shrink-0 mt-1`} />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="text-white small fw-bold d-flex align-items-center gap-2 mt-auto">
                  {expandedIndex === index ? (
                    <span className="opacity-20 d-flex align-items-center gap-2 cursor-pointer" style={{cursor: "pointer"}}>Show Less <HiOutlineChevronUp /></span>
                  ) : (
                    <span className="d-flex align-items-center gap-2 pointer" style={{cursor: "pointer"}}>Learn More <HiOutlineArrowRight /></span>
                  )}
                </div>
              </article>
            </div>
          ))}
        </div>

        {/* Matches Services CTA */}
        <div 
          className="p-5 text-center text-white"
          style={{
            background: 'linear-gradient(90deg, rgba(59, 130, 246, 0.1), rgba(16, 185, 129, 0.1))',
            borderRadius: '30px',
            border: '1px solid rgba(255, 255, 255, 0.05)'
          }}
        >
          <h2 className="fw-bold mb-3">Build Your Success Story</h2>
          <p className="opacity-75 mb-4 max-w-xl mx-auto">
            Experience the efficiency of a world-class revenue cycle team.
          </p>
          <a href="/contact">
            <button className="btn btn-primary btn-lg rounded-pill px-5 shadow-lg border-0">
              Get a Free Consultation
            </button>
          </a>
        </div>
        
      </div>
    </div>
  );
};

export default AboutUs;