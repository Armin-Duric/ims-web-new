import React from 'react';

const Info = () => {
  const features = [
    {
      title: "Secure Solutions",
      description:
        "Our cutting-edge technology ensures your data is protected with state-of-the-art security measures, building trust with every transaction.",
      icon: "fas fa-shield-alt",
    },
    {
      title: "Real-Time Insights",
      description:
        "Gain actionable insights with our advanced analytics, delivered in real-time to optimize your business performance with confidence.",
      icon: "fas fa-chart-line",
    },
    {
      title: "Expert Team",
      description:
        "Our certified professionals bring years of experience, ensuring reliable and trustworthy service tailored to your needs.",
      icon: "fas fa-user-md",
    },
  ];

  return (
    <section className="info-section">
      <style>{`
        .info-section {
          background: #0f172a; /* Deep slate to match Home/Content */
          padding: 100px 0;
          position: relative;
        }

        .info-card-glass {
          background: rgba(255, 255, 255, 0.02);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border-radius: 32px;
          border: 1px solid rgba(255, 255, 255, 0.08);
          padding: 3rem;
          transition: all 0.5s ease;
          position: relative;
          overflow: hidden;
        }

        .info-card-glass:hover {
          background: rgba(255, 255, 255, 0.05);
          border-color: rgba(0, 255, 204, 0.3);
          transform: translateY(-10px);
        }

        /* The glass circle behind icons */
        .icon-box-glass {
          width: 120px;
          height: 120px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(0, 255, 204, 0.05);
          border-radius: 24px;
          border: 1px solid rgba(0, 255, 204, 0.2);
          color: #00ffcc;
          margin: 0 auto;
          transition: all 0.4s ease;
        }

        .info-card-glass:hover .icon-box-glass {
          background: #00ffcc;
          color: #0f172a;
          box-shadow: 0 0 30px rgba(0, 255, 204, 0.4);
          transform: rotate(-5deg) scale(1.1);
        }

        .feature-title {
          font-weight: 800;
          letter-spacing: -0.5px;
          margin-bottom: 1.25rem;
        }

        .feature-desc {
          color: rgba(255, 255, 255, 0.6);
          line-height: 1.8;
          font-size: 1.1rem;
        }

        .section-header-tag {
          color: #00ffcc;
          text-transform: uppercase;
          letter-spacing: 5px;
          font-size: 0.8rem;
          font-weight: 700;
          display: block;
          margin-bottom: 1rem;
        }
      `}</style>

      <div className="container text-white">
        <div className="text-center mb-5">
          <span className="section-header-tag">The IMS Advantage</span>
          <h2 className="display-4 fw-bold mb-4">Why Choose IMS?</h2>
          <div style={{ height: '3px', width: '80px', background: '#00ffcc', margin: '0 auto' }}></div>
        </div>

        {features.map((feature, index) => (
          <div key={index} className="row mb-4">
            <div className="col-12">
              <div className="info-card-glass">
                <div className={`row align-items-center ${index % 2 === 0 ? '' : 'flex-md-row-reverse'}`}>
                  
                  {/* Text Side */}
                  <div className="col-md-7 text-center text-md-start px-md-5">
                    <h3 className="feature-title display-6">
                      {feature.title}
                    </h3>
                    <p className="feature-desc">
                      {feature.description}
                    </p>
                    <div className="d-flex gap-2 mt-4 justify-content-center justify-content-md-start">
                       <span className="badge rounded-pill" style={{ background: 'rgba(255,255,255,0.1)', fontWeight: '500' }}>Reliability</span>
                       <span className="badge rounded-pill" style={{ background: 'rgba(255,255,255,0.1)', fontWeight: '500' }}>Compliance</span>
                    </div>
                  </div>

                  {/* Icon Side */}
                  <div className="col-md-5 text-center mt-4 mt-md-0">
                    <div className="icon-box-glass">
                      <i className={`${feature.icon} fa-4x`}></i>
                    </div>
                  </div>

                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Info;