import { useState, useRef, useEffect } from 'react';

const Strengths = () => {
  const [hoveredIndex, setHoveredIndex] = useState(0); // State for hovered strength
  const videoRef = useRef(null); // Ref for video element
  const [isTransitioning, setIsTransitioning] = useState(false); // State to manage transition
  const [opacity, setOpacity] = useState(1); // State to control video opacity

  const strengths = [
    {
      title: "Proven Expertise",
      description: "Over 35 years of industry leadership, delivering reliable revenue cycle solutions for healthcare providers across the U.S.",
      icon: "fas fa-star",
      videoSrc: "/images/videos/proven-expertise.mp4",
      textContent: [
        "<strong>35+ years</strong> leading RCM, driving consistent revenue growth for U.S. healthcare providers.",
        "<strong>Expert team</strong> reduces in-house costs through efficient outsourced billing solutions.",
        "<strong>Certified specialists</strong> excel in maximizing collections for work-related and personal injury claims.",
        "<strong>24/7 billing services</strong> support over 50 clients, achieving $60M+ in collections annually.",
        "<strong>Full-service RCM</strong> ensures regulatory compliance, minimizing errors and risks.",
        "<strong>IMS</strong> accelerates collection timelines, delivering profitable outcomes for practices.",
        "<strong>Trusted partner</strong> for $1B+ in historical billing, ensuring financial stability.",
        "<strong>Dedicated support</strong> allows providers to focus on patient care, not paperwork."
      ]
    },
    {
      title: "Innovative Technology",
      description: "State-of-the-art tools and software to streamline billing processes, enhance financial performance, and ensure operational efficiency.",
      icon: "fas fa-laptop",
      videoSrc: "/images/videos/ai.mp4",
      textContent: [
        "<strong>Cutting-edge software</strong> accelerates billing by 25%, reducing manual errors significantly.",
        "<strong>Real-time analytics</strong> dashboards provide insights to optimize revenue and cash flow.",
        "<strong>Automated claims</strong> workflows minimize denials, boosting collection rates by up to 20%.",
        "<strong>Secure cloud platforms</strong> offer scalable, efficient data management for all practice sizes.",
        "<strong>AI-driven tools</strong> predict payment trends, enabling proactive financial decision-making.",
        "<strong>Machine learning</strong> customizes billing strategies to meet each practice’s unique needs.",
        "<strong>Integrated systems</strong> ensure seamless compatibility with existing practice software.",
        "<strong>Advanced encryption</strong> safeguards sensitive financial data, enhancing trust and security."
      ]
    },
    {
      title: "Tailored Support",
      description: "Customized services designed to meet the unique needs of every medical practice, ensuring maximum efficiency.",
      icon: "fas fa-users",
      videoSrc: "/images/videos/support.mp4",
      textContent: [
        "<strong>Custom RCM plans</strong> address the specific needs of each medical practice.",
        "<strong>Dedicated account teams</strong> ensure fast, accurate billing and collections processes.",
        "<strong>24/7 support</strong> resolves issues promptly, maintaining operational efficiency.",
        "<strong>Personalized strategies</strong> maximize revenue with minimal administrative burden.",
        "<strong>Flexible services</strong> adapt to practice size, specialty, and financial goals.",
        "<strong>Regular consultations</strong> identify opportunities to enhance financial performance.",
        "<strong>Proactive communication</strong> keeps clients informed on billing progress and outcomes."
      ]
    },
    {
      title: "Compliance Excellence",
      description: "Unwavering commitment to regulatory standards, protecting your practice with every transaction.",
      icon: "fas fa-shield-alt",
      videoSrc: "/images/videos/compliance.mp4",
      textContent: [
        "<strong>Strict adherence</strong> to HIPAA and federal regulations ensures full compliance.",
        "<strong>Every transaction</strong> is audited to protect practices from financial and legal risks.",
        "<strong>Expert compliance team</strong> minimizes penalties through proactive risk management.",
        "<strong>Regular staff training</strong> keeps teams updated on evolving regulatory requirements.",
        "<strong>Robust systems</strong> secure billing processes, safeguarding sensitive patient data.",
        "<strong>Comprehensive audits</strong> ensure accuracy and transparency in all financial operations.",
        "<strong>Compliance-focused workflows</strong> reduce errors, enhancing trust with payers and patients."
      ]
    }
  ];

  const handleHover = (index) => {
    if (hoveredIndex !== index && !isTransitioning) {
      setIsTransitioning(true);
      setOpacity(0); // Start fade-out
      setTimeout(() => {
        setHoveredIndex(index);
        setOpacity(1); // Start fade-in after fade-out
        setTimeout(() => setIsTransitioning(false), 400); // Complete transition
      }, 400); // Match fade-out duration
    }
  };

  const handleSlide = (direction) => {
    const newIndex = direction === 'left' ? (hoveredIndex > 0 ? hoveredIndex - 1 : strengths.length - 1) : (hoveredIndex < strengths.length - 1 ? hoveredIndex + 1 : 0);
    if (hoveredIndex !== newIndex && !isTransitioning) {
      setIsTransitioning(true);
      setOpacity(0); // Start fade-out
      setTimeout(() => {
        setHoveredIndex(newIndex);
        setOpacity(1); // Start fade-in after fade-out
        setTimeout(() => setIsTransitioning(false), 400); // Complete transition
      }, 400); // Match fade-out duration
    }
  };

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.style.transition = 'opacity 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
      videoRef.current.style.opacity = opacity;
    }
  }, [opacity]);

  return (
    <div
      className="py-5 position-relative"
      style={{
        minHeight: '400px',
        background: `url(${strengths[hoveredIndex].videoSrc}) no-repeat center center/cover`
      }}
    >
      <video
        ref={videoRef}
        key={strengths[hoveredIndex].videoSrc} // Force video re-render on src change
        className="position-absolute top-0 start-0 w-100 h-100"
        autoPlay
        muted
        loop
        playsInline
        style={{ objectFit: 'cover', zIndex: 0, opacity }}
      >
        <source src={strengths[hoveredIndex].videoSrc} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="container text-white py-5 position-relative transparent-bg" style={{ zIndex: 1 }}>
        <h2 className="display-4 fw-bold mb-4 text-center">IMS Strengths</h2>
        <p className="lead mb-5 text-center">
          Discover why Innovative Management Solutions stands out as your trusted partner in medical billing.
        </p>
        <div className="d-none d-md-flex justify-content-center mb-4">
          {strengths.map((strength, index) => (
            <button
              key={index}
              className={`btn hover ${hoveredIndex === index ? 'btn-light text-dark' : 'btn-outline-light'} rounded-0 p-3 me-3`}
              style={{ width: '170px', height: '120px', border: 'none', padding: '10px' }}
              onMouseEnter={() => handleHover(index)}
            >
              <i className={`${strength.icon} fa-2x mb-2`}></i>
              <div className="fw-bold">{strength.title}</div>
            </button>
          ))}
        </div>
        <div className="d-md-none">
          <div
            id="strengthsCarousel"
            className="carousel slide"
            data-bs-touch="true"
            data-bs-interval="false"
          >
            <div className="carousel-inner">
              {strengths.map((strength, index) => (
                <div
                  key={index}
                  className={`carousel-item ${index === hoveredIndex ? 'active' : ''}`}
                >
                  <button
                    className={`btn ${hoveredIndex === index ? 'btn-light text-dark' : 'btn-outline-light'} rounded-0 p-3 mx-auto d-block`}
                    style={{ width: '150px', height: '120px', border: 'none', color: 'white', padding: '10px' }}
                    onClick={() => handleHover(index)}
                  >
                    <i className={`${strength.icon} fa-2x mb-2`}></i>
                    <div className="fw-bold">{strength.title}</div>
                  </button>
                </div>
              ))}
            </div>
            <button
              className="carousel-control-prev"
              type="button"
              data-bs-target="#strengthsCarousel"
              data-bs-slide="prev"
              onClick={() => handleSlide('left')}
            >
              <span className="carousel-control-prev-icon" aria-hidden="true"></span>
              <span className="visually-hidden">Previous</span>
            </button>
            <button
              className="carousel-control-next"
              type="button"
              data-bs-target="#strengthsCarousel"
              data-bs-slide="next"
              onClick={() => handleSlide('right')}
            >
              <span className="carousel-control-next-icon" aria-hidden="true"></span>
              <span className="visually-hidden">Next</span>
            </button>
          </div>
        </div>
        <div className="text-left p-4 rounded mt-4">
          <div className="d-flex flex-column flex-md-column align-items-start position-relative" style={{ minHeight: '400px' }}>
            <div className="col-12 p-3 fs-5">
              <ul className="list-disc text-white pl-6 ml-0">
                {strengths[hoveredIndex].textContent.map((text, idx) => (
                  <li key={idx} className="mb-2" dangerouslySetInnerHTML={{ __html: text }} />
                ))}
              </ul>
            </div>
            <div className="col-12 p-3"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Strengths;