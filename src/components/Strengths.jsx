import { useState } from 'react';

const Strengths = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const strengths = [
    {
      title: "Proven Expertise",
      description: "Over 30 years of industry leadership, delivering reliable revenue cycle solutions for healthcare providers across the U.S.",
      icon: "fas fa-star",
      content: (
        <div className="d-flex flex-column flex-md-row align-items-center">
          {/* Text Carousel Section (Left Side) */}
          <div className="col-12 col-md-6 p-3">
            <div
              id="textCarousel"
              className="carousel slide"
              data-bs-ride="carousel"
              data-bs-interval="5000"
            >
              <div className="carousel-inner">
                {[
                  <p key="1" className="text-white carousel-item active">
                    **Over 30 years** of industry leadership by Innovative Management Solutions (IMS) has transformed revenue cycle management (RCM) for U.S. healthcare providers.
                  </p>,
                  <p key="2" className="text-white carousel-item">
                    Our **proven expertise** empowers clinics with consistent revenue growth by outsourcing billing and eliminating in-house costs.
                  </p>,
                  <p key="3" className="text-white carousel-item">
                    Certified team delivers **tailored solutions**, specializing in **work-related** and **personal injury recovery** for maximum collections.
                  </p>,
                  <p key="4" className="text-white carousel-item">
                    **24-hour billing** and lien preparation, serving **50+ clients** with **$60M+** in collections and **$1B+** in historical billing.
                  </p>,
                  <p key="5" className="text-white carousel-item">
                    **Full-service RCM** with **24-hour support** ensures compliance, reduces errors, and lets you focus on patient care.
                  </p>,
                  <p key="6" className="text-white carousel-item">
                    Partner with IMS for **profitable outcomes**, reduced collection times, and **peace of mind**.
                  </p>,
                ]}
              </div>
              <button
                className="carousel-control-prev"
                type="button"
                data-bs-target="#textCarousel"
                data-bs-slide="prev"
              >
                <span className="carousel-control-prev-icon" aria-hidden="true"
                style={{position: 'relative', right: '50px'}}
                ></span>
                <span className="visually-hidden">Previous</span>
              </button>
              <button
                className="carousel-control-next"
                type="button"
                data-bs-target="#textCarousel"
                data-bs-slide="next"
              >
                <span className="carousel-control-next-icon" aria-hidden="true"
                style={{position: 'relative', left: '50px'}}
                ></span>
                <span className="visually-hidden">Next</span>
              </button>
            </div>
          </div>
          {/* Video Section (Right Side, Static) */}
          <div className="col-12 col-md-6 p-3">
            <video
              className="img-fluid str-video"
              autoPlay
              muted
              loop
              playsInline
              style={{ width: '100%', height: 'auto' }}
            >
              <source src="/images/videos/experience.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      ),
    },
    {
      title: "Innovative Technology",
      description: "State-of-the-art tools and analytics to streamline billing processes and enhance financial performance.",
      icon: "fas fa-laptop",
      content: (
        <div className="text-white">
          <p>Advanced analytics dashboards help optimize your billing workflow.</p>
          <img src="https://via.placeholder.com/300x200" alt="Technology Example" className="img-fluid mt-3" />
        </div>
      ),
    },
    {
      title: "Tailored Support",
      description: "Customized services designed to meet the unique needs of every medical practice, ensuring maximum efficiency.",
      icon: "fas fa-users",
      content: (
        <div className="text-white">
          <p>Personalized support plans tailored to your practice’s size and needs.</p>
          <img src="https://via.placeholder.com/300x200" alt="Support Example" className="img-fluid mt-3" />
        </div>
      ),
    },
    {
      title: "Compliance Excellence",
      description: "Unwavering commitment to regulatory standards, protecting your practice with every transaction.",
      icon: "fas fa-shield-alt",
      content: (
        <div className="text-white">
          <p>Ensuring full compliance with HIPAA and other regulations.</p>
          <img src="https://via.placeholder.com/300x200" alt="Compliance Example" className="img-fluid mt-3" />
        </div>
      ),
    },
  ];

  const handleClick = (index) => {
    setSelectedIndex(index);
  };

  const handleSlide = (direction) => {
    setSelectedIndex((prev) => {
      if (direction === 'left') return prev > 0 ? prev - 1 : strengths.length - 1;
      return prev < strengths.length - 1 ? prev + 1 : 0;
    });
  };

  return (
    <div className="py-5 gradient-bg">
      <div className="container text-white py-5">
        <h2 className="display-4 fw-bold mb-4 text-center">IMS Strengths</h2>
        <p className="lead mb-5 text-center">
          Discover why Innovative Management Solutions stands out as your trusted partner in medical billing.
        </p>
        <div className="d-none d-md-flex justify-content-center mb-4">
          {strengths.map((strength, index) => (
            <button
              key={index}
              className={`btn ${selectedIndex === index ? 'btn-light text-dark' : 'btn-outline-light'} rounded-0 p-3 me-3`}
              style={{ width: '170px', height: '120px', border: 'none', color: 'white', padding: '10px' }}
              onClick={() => handleClick(index)}
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
                  className={`carousel-item ${index === selectedIndex ? 'active' : ''}`}
                >
                  <button
                    className={`btn ${selectedIndex === index ? 'btn-light text-dark' : 'btn-outline-light'} rounded-0 p-3 mx-auto d-block`}
                    style={{ width: '150px', height: '100px', border: 'none', color: 'white', padding: '10px' }}
                    onClick={() => handleClick(index)}
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
        <div className="text-center p-4 rounded mt-4">
          {strengths[selectedIndex].content}
        </div>
      </div>
    </div>
  );
};

export default Strengths;