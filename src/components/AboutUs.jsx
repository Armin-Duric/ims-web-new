import { useState, useRef, useEffect } from 'react';

const AboutUs = () => {
  const [showHistory, setShowHistory] = useState(false);
  const historyRef = useRef(null);

  const toggleHistory = () => {
    setShowHistory((prev) => !prev);
  };

  useEffect(() => {
    if (showHistory && historyRef.current) {
      historyRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [showHistory]);

  return (
    <>
    <div className='gradient-bg'>
      <div
        className="py-5 position-relative"
        style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
        }}
      >
        <div className="container position-relative">
          <div className="row align-items-center g-5">
            <div className="col-md-6">
              <img
                src="/images/ims-team.jpg"
                alt="IMS Team at Work"
                className="img-fluid rounded shadow-lg animate__animated animate__fadeInLeft pt-5 pt-lg-1"
                style={{ maxWidth: '100%', height: 'auto' }}
              />
            </div>
            <div className="col-md-6 pt-5 text-white">
              <h1 className="display-3 fw-bold mb-4">Your Revenue Cycle Partner</h1>
              <p className="lead mb-4">
                Welcome to Innovative Management Solutions (IMS), where over 30 years of expertise in healthcare revenue cycle management (RCM) meets cutting-edge innovation. Based in the heart of Chicago, IL, we’re more than just a billing company—we’re your strategic partner in transforming financial challenges into opportunities.
              </p>
              <p className="mb-3">
                Our passionate team, spanning the US and beyond, brings tailored solutions to every step of your revenue cycle. From certified coders to seasoned A/R specialists, we’re committed to driving efficiency, reducing errors, and maximizing your revenue—all while keeping compliance at the core.
              </p>
              <p className="mb-3">
                As a growing force with over 100 dedicated professionals, IMS thrives on delivering affordable, high-quality service. Our multilingual team and state-of-the-art technology empower medical practices of all sizes to focus on what matters most: patient care.
              </p>
              <p className="fw-bold mb-4">
                Ready to see the difference? Let’s build your success story together.
              </p>
              <div className="text-center text-md-start mb-3">
                <a
                  href="/contact"
                  className="btn btn-lg animate__animated animate__pulse"
                  style={{
                    backgroundColor: '#00ffcc',
                    color: '#1a3c5e',
                    border: 'none',
                  }}
                  onMouseOver={(e) => {
                    e.target.style.backgroundColor = '#00cc99';
                    e.target.style.color = '#fff';
                  }}
                  onMouseOut={(e) => {
                    e.target.style.backgroundColor = '#00ffcc';
                    e.target.style.color = '#1a3c5e';
                  }}
                >
                  Connect With Us Today
                </a>
              </div>
              <div className="text-center text-md-start">
                <button
                  onClick={toggleHistory}
                  className="btn btn-outline-light btn-sm"
                >
                  {showHistory ? 'Hide IMS History' : 'Learn About IMS History'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* History Section */}
{showHistory && (
  <section
    ref={historyRef}
    className="py-5"
  >
    <div className="container">
      <div
        className="p-5 rounded shadow-lg bg-dark"
        style={{
          color: '#ffffffff',
          maxWidth: '960px',
          margin: '0 auto',
        }}
      >
        <h3 className="fw-bold mb-4 d-flex flex-column flex-lg-row align-items-center gap-2">
          <i className="fas fa-building me-3 text-primary"></i>
          Our Story: Built on Expertise Driven by Innovation
        </h3>

        <p className="mb-3">
          <i className="fas fa-bullseye text-success me-2"></i>
          <strong>Mission-Driven:</strong> IMS was founded with a bold vision—to help medical practices maximize profitability and simplify the complexities of workers' compensation and personal injury claims.
        </p>

        <p className="mb-3">
          <i className="fas fa-location-dot text-danger me-2"></i>
          <strong>Based in Chicago:</strong> Our headquarters in downtown Chicago is the heart of our operation—led by a legal industry expert with 20+ years of RCM expertise.
        </p>

        <p className="mb-3">
          <i className="fas fa-chart-line text-warning me-2"></i>
          <strong>Rapid Growth:</strong> From humble beginnings, we’ve grown to over 100 dedicated team members and proudly serve more than 50 medical clients across the U.S. and internationally.
        </p>

        <p className="mb-3">
          <i className="fas fa-globe text-info me-2"></i>
          <strong>Global Team:</strong> With offices in Chicago and overseas, we ensure 24/7 accessibility. Our multilingual support includes English, German, Spanish, and Slavic languages.
        </p>

        <p className="mb-3">
          <i className="fas fa-microchip text-secondary me-2"></i>
          <strong>Technology-Forward:</strong> Leveraging cutting-edge billing platforms, our team ensures error reduction, compliance, and revenue maximization.
        </p>

        <p className="fw-bold fs-5 mt-4">
          <i className="fas fa-hands-helping text-primary me-2"></i>
          At IMS, we don’t just manage revenue—we build partnerships that drive medical success.
        </p>
      </div>
    </div>
  </section>
)}
    </div>
    </>
  );
};

export default AboutUs;
