const AboutUs = () => {
  return (
    <div
      className="py-5 position-relative gradient-bg"
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
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
          <div className="col-md-6 pt-5">
            <div className="text-white p-4 p-md-0">
              <h1 className="display-3 fw-bold mb-4">
                Your Revenue Cycle Partner
              </h1>
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
              <div className="text-center text-md-start">
                <a
                  href="/contact"
                  className="btn btn-lg btn-primary animate__animated animate__pulse"
                  style={{ backgroundColor: '#00ffcc', color: '#1a3c5e', border: 'none' }}
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;