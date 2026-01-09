import React from 'react';

const Hero = () => {
  return (
    <section
      className="text-white py-5"
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
        flexDirection: 'column'
      }}
    >
      <div className="video-container">
        <video
          className="background-video"
          autoPlay
          muted
          loop
          playsInline
        >
          <source src="/images/videos/bg-video.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
      <div className="container text-center shadow-box mt-5">
        <h1
          className="display-4 fw-bold mb-4"
          style={{
            textShadow: '0 10px 20px rgba(173, 216, 230, 0.8), 0 0 10px rgba(173, 216, 230, 0.6)',
          }}
        >
          Transform Your Business with Innovative Management Solutions
        </h1>
        <p className="lead mb-4">
          Discover cutting-edge medical billing strategies to drive growth and success.
        </p>
        <p className="fw-bold text-light neon-glow mb-5">
          Leading Revenue Management Company in Illinois.
        </p>
        <a
          href="/contact"
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
      <div className="container text-center shadow-box m-4">
        <div>
          <img src="/images/SOC-2.png" className='falling-img' alt="ISO" height='200px' width='200px'/>
        </div>
      </div>
    </section>
  );
};

export default Hero;