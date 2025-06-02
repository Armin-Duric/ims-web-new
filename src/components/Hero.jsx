const Hero = () => {
  return (
    <section
      className="gradient-bg text-white py-5"
      style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
    >
      <div className="container text-center">
        <h1 className="display-4 fw-bold neon-glow mb-4">
          Transform Your Business with Innovative Management Solutions
        </h1>
        <p className="lead mb-4">
          Discover cutting-edge medical billing strategies to drive growth and success.
        </p>
        <p className="fw-bold text-light neon-glow mb-5">
          Leading Revenue Management Company in Illinois.
        </p>
        <a
          href="/get-started"
          className="btn btn-primary btn-lg transition duration-300"
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
          Get Started Today
        </a>
      </div>
    </section>
  );
};

export default Hero;