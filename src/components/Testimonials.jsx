import React from 'react';

const Testimonial = () => {
  const testimonials = [
    {
      quote: "IMS transformed our billing process! Their innovative solutions streamlined our operations and significantly improved our revenue cycle. Highly recommend!",
      reviewer: "Dr. Emily Carter",
      title: "Chief Financial Officer",
    },
    {
      quote: "The team at IMS provided exceptional support, turning our chaotic billing into a seamless process. Their expertise is unmatched!",
      reviewer: "Dr. John Smith",
      title: "Practice Manager",
    },
    {
      quote: "With IMS, we saw a noticeable increase in revenue and a reduction in administrative workload. A game-changer for our clinic!",
      reviewer: "Dr. Sarah Lee",
      title: "Medical Director",
    },
  ];

  return (
    <section className="testimonial-glass-section py-5">
      <style>{`
        .testimonial-glass-section {
          background: radial-gradient(circle at center, #1e293b, #0f172a);
          padding: 80px 0 100px;
          position: relative;
          overflow: hidden;
        }

        .carousel-inner {
          touch-action: pan-y pinch-zoom;
        }

        .testimonial-card {
          background: rgba(255, 255, 255, 0.02);
          backdrop-filter: blur(15px);
          -webkit-backdrop-filter: blur(15px);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 30px !important;
          padding: 3rem 1.5rem;
          margin: 15px;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4);
          min-height: 420px;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }

        .quote-icon {
          color: #00ffcc;
          opacity: 0.6;
          margin-bottom: 1rem;
          font-size: 2rem;
        }

        .testimonial-text {
          font-size: 1.25rem;
          font-style: italic;
          color: rgba(255, 255, 255, 0.9);
          line-height: 1.6;
          font-weight: 300;
        }

        .star-rating {
          margin-bottom: 1.5rem;
        }
        
        .star-rating i {
          color: #00ffcc;
          margin: 0 2px;
          font-size: 0.85rem;
          opacity: 0.9;
        }

        .reviewer-name {
          color: #ffffff;
          font-weight: 700;
          margin-bottom: 0;
          font-size: 1.1rem;
        }

        .reviewer-title {
          color: #00ffcc;
          font-size: 0.8rem;
          text-transform: uppercase;
          letter-spacing: 2px;
          opacity: 0.8;
        }

        .carousel-indicators {
          bottom: -50px;
        }

        .carousel-indicators [data-bs-target] {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background-color: #00ffcc;
          border: none;
          opacity: 0.3;
        }

        .carousel-indicators .active {
          opacity: 1;
        }

        .carousel-control-prev, .carousel-control-next {
          width: 50px;
          height: 50px;
          background: rgba(0, 255, 204, 0.05);
          border-radius: 50%;
          top: 50%;
          transform: translateY(-50%);
          border: 1px solid rgba(0, 255, 204, 0.2);
          transition: all 0.3s ease;
        }

        .carousel-control-prev { left: -80px; }
        .carousel-control-next { right: -80px; }

        .carousel-control-prev:hover, .carousel-control-next:hover {
          background: #00ffcc;
          color: #0f172a !important;
        }

        @media (max-width: 1200px) {
          .carousel-control-prev, .carousel-control-next { display: none; }
          .testimonial-card { padding: 2rem 1.2rem; min-height: 380px; }
          .testimonial-text { font-size: 1.1rem; }
        }
      `}</style>

      <div className="container">
        <div className="text-center mb-5">
          <h2 className="display-6 fw-bold text-white mb-2">Trusted by Industry Leaders</h2>
          <p className="text-white-50 small text-uppercase tracking-wider">Excellence in Revenue Cycle Management</p>
        </div>

        <div className="row justify-content-center">
          <div className="col-lg-10 position-relative">
            <div id="testimonialCarousel" className="carousel slide" data-bs-ride="carousel" data-bs-touch="true">
              <div className="carousel-indicators">
                {testimonials.map((_, index) => (
                  <button 
                    key={index}
                    type="button" 
                    data-bs-target="#testimonialCarousel" 
                    data-bs-slide-to={index} 
                    className={index === 0 ? 'active' : ''}
                  ></button>
                ))}
              </div>

              <div className="carousel-inner">
                {testimonials.map((testimonial, index) => (
                  <div className={`carousel-item ${index === 0 ? 'active' : ''}`} key={index}>
                    <div className="testimonial-card text-center">
                      <div className="mb-2">
                        <i className="fas fa-quote-left quote-icon"></i>
                      </div>
                      <blockquote className="mb-3">
                        <p className="testimonial-text">"{testimonial.quote}"</p>
                      </blockquote>
                      <div className="star-rating">
                        {[...Array(5)].map((_, i) => (
                          <i key={i} className="fas fa-star"></i>
                        ))}
                      </div>
                      <div className="reviewer-info">
                        <h5 className="reviewer-name">{testimonial.reviewer}</h5>
                        <p className="reviewer-title mb-0">{testimonial.title}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <button className="carousel-control-prev" type="button" data-bs-target="#testimonialCarousel" data-bs-slide="prev">
                <i className="fas fa-chevron-left"></i>
              </button>
              <button className="carousel-control-next" type="button" data-bs-target="#testimonialCarousel" data-bs-slide="next">
                <i className="fas fa-chevron-right"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonial;