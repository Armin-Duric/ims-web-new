import { useState } from 'react';

const Test = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const services = [
    {
      title: "Custom Medical Billing",
      icon: "fas fa-pen-fancy",
      description:
        "Each medical billing solution we create is meticulously crafted to deliver a 100% unique experience tailored to your practice. Our expert team transforms your vision into a dynamic billing process that enhances visibility, boosts engagement, and drives revenue. We work hand-in-hand with you to understand your unique challenges and offer solutions that align with your goals.",
      image: "/images/medical-billingg.jpg",
    },
    {
      title: "Responsive Billing Solutions",
      icon: "fas fa-mobile-alt",
      description:
        "We deliver seamless billing experiences across all devices. Our responsive solutions adapt flawlessly to any screen size, ensuring your medical practice exceeds user expectations with consistent, engaging service. Accessibility and performance are at the heart of every layout we build.",
      image: "https://via.placeholder.com/452x358/222/eee?text=Responsive",
    },
    {
      title: "Website Redesign",
      icon: "fas fa-brush",
      description:
        "Whether you need a design refresh or a complete website overhaul, we analyze your site’s pain points to revitalize your digital presence. Our team enhances functionality and user experience for a modern billing platform. Improved conversion rates and clarity are our primary focus.",
      image: "https://via.placeholder.com/452x358/444/fff?text=Redesign",
    },
    {
      title: "UX/UI Billing Design",
      icon: "fas fa-desktop",
      description:
        "Our designers create engaging visual experiences and seamless user journeys for your billing system. We enhance your visual identity, ensuring your platform is both aesthetically pleasing and highly functional. Every interface is built to be intuitive and results-driven.",
      image: "https://via.placeholder.com/452x358/111/fff?text=UX+UI",
    },
    {
      title: "Search Engine Optimization",
      icon: "fas fa-search",
      description:
        "We boost your medical billing website’s ranking with comprehensive SEO services, attracting organic traffic. Our team provides actionable insights to enhance your online visibility. From technical audits to keyword strategy, we ensure you're found first.",
      image: "https://via.placeholder.com/452x358/000/0ff?text=SEO",
    },
    {
      title: "eCommerce Billing Integration",
      icon: "fas fa-shopping-cart",
      description:
        "We specialize in integrating billing with eCommerce platforms like Shopify. Our experts ensure a seamless online payment experience for your medical practice. The result is a reliable, secure, and patient-friendly checkout process.",
      image: "https://via.placeholder.com/452x358/900/fff?text=eCommerce",
    },
  ];

  const handleClick = (index) => {
    setSelectedIndex(index);
  };

  return (
    <section
      className="py-5 black-bg from-blue-900 to-blue-700 text-white d-flex align-items-center justify-content-center"
      style={{ minHeight: '100vh' }}
    >
      <div className="container">
        <div className="row align-items-start justify-content-center">
          {/* Left Column */}
          <div className="col-md-6 mb-4 mb-md-0">
            <div className="mb-4">
              <h2 className="text-blue-200 fw-bold mb-2">WHY DIGITAL IMS?</h2>
              <h3 className="h2 mb-3">Discover Our Expertise as a Medical Billing Company</h3>
              <p className="lead mb-4">
                As a full-service medical billing agency, Innovative Management Solutions (IMS) handles all your digital billing needs under one roof. Our custom billing services include thorough research and planning, bespoke designs, and strategies tailored to grow your reach, drive revenue, and encourage patient engagement.
              </p>
            </div>
            <div className="position-relative">
              <img
                src="/images/thinking.jpg"
                alt="Medical Billing Services"
                className="img-fluid rounded"
              />
            </div>
          </div>

          {/* Right Column with Background */}
          <div className="col-md-6 position-relative">
            {/* Background Image */}
            <div
              className="background-overlay"
              style={{
                backgroundImage: `url('${services[selectedIndex].image}')`,
              }}
            ></div>

            {/* Cards */}
            <div
              className="d-flex flex-column h-100 position-relative"
              style={{ zIndex: 1 }}
            >
              <div
                className="flex-grow-1 overflow-y-auto pe-2"
                style={{
                  maxHeight: '737px',
                  scrollbarWidth: 'none',
                  msOverflowStyle: 'none',
                }}
              >
                <style>{`
                  .flex-grow-1::-webkit-scrollbar {
                    display: none;
                  }
                  .card {
                    transition: transform 0.4s ease, box-shadow 0.4s ease;
                    z-index: 1;
                    overflow: visible;
                  }
                  .card.selected {
                    transform: scale(1.05);
                    z-index: 10;
                    box-shadow: 0 0 20px rgba(0,0,0,0.6);
                  }
                  .background-overlay {
                    position: absolute;
                    top: 0; left: 0;
                    width: 100%; height: 100%;
                    background-size: cover;
                    background-position: center;
                    opacity: 0.5;
                    z-index: 0;
                    border-radius: 12px;
                  }
                `}</style>
                {services.map((service, index) => (
                  <div
                    key={index}
                    className={`card mb-4 border-0 ${
                      selectedIndex === index
                        ? 'bg-dark bg-opacity-50 selected border-primary'
                        : 'bg-dark bg-opacity-75'
                    }`}
                    onClick={() => handleClick(index)}
                    style={{
                      cursor: 'pointer',
                      borderRadius: '12px',
                      padding: '1rem',
                    }}
                  >
                    <div className="card-body p-3">
                      <div className="d-flex align-items-center mb-2">
                        <i className={`${service.icon} fa-lg me-2 text-white`}></i>
                        <h5 className="card-title text-white mb-0">
                          {service.title}
                        </h5>
                      </div>
                      <p className="card-text text-white">
                        {service.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Test;
