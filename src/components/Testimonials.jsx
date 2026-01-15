import React from 'react';
import { HiStar, HiChevronLeft, HiChevronRight, HiCheckBadge } from 'react-icons/hi2'; // Using Hi2 for a thicker, modern look
import { ImQuotesLeft } from 'react-icons/im';

const Testimonial = () => {
  const testimonials = [
    {
      quote: "IMS transformed our billing process! Their innovative solutions streamlined our operations and significantly improved our revenue cycle. Highly recommend!",
      reviewer: "Dr. Emily Carter",
      title: "Chief Financial Officer",
      stat: "+22% Revenue"
    },
    {
      quote: "The team at IMS provided exceptional support, turning our chaotic billing into a seamless process. Their expertise is unmatched!",
      reviewer: "Dr. John Smith",
      title: "Practice Manager",
      stat: "-40% Denials"
    },
    {
      quote: "With IMS, we saw a noticeable increase in revenue and a reduction in administrative workload. A game-changer for our clinic!",
      reviewer: "Dr. Sarah Lee",
      title: "Medical Director",
      stat: "100% Compliance"
    },
  ];

  return (
    <section className="testimonial-premium-wrapper">
      <style>{`
        .testimonial-premium-wrapper {
          background: #ffffff;
          padding: 140px 0;
          position: relative;
          overflow: hidden;
        }

        /* Soft Mesh Background Decoration */
        .mesh-sphere {
          position: absolute;
          width: 600px;
          height: 600px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(37, 99, 235, 0.05) 0%, rgba(255, 255, 255, 0) 70%);
          z-index: 0;
          filter: blur(60px);
        }

        .testimonial-glass-card {
          background: rgba(255, 255, 255, 0.8);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 1);
          border-radius: 48px;
          padding: 5rem 4rem;
          margin: 0 auto;
          max-width: 900px;
          box-shadow: 
            0 4px 6px -1px rgba(0, 0, 0, 0.01),
            0 20px 70px -10px rgba(0, 0, 0, 0.08),
            inset 0 0 20px rgba(255, 255, 255, 0.5);
          position: relative;
          z-index: 2;
        }

        .stat-badge {
          position: absolute;
          top: -15px;
          right: 50px;
          background: #2563eb;
          color: white;
          padding: 10px 20px;
          border-radius: 100px;
          font-weight: 800;
          font-size: 0.8rem;
          box-shadow: 0 10px 20px rgba(37, 99, 235, 0.2);
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .large-quote-mark {
          position: absolute;
          top: 40px;
          left: 40px;
          font-size: 5rem;
          color: #2563eb;
          opacity: 0.05;
          font-family: serif;
        }

        .testimonial-main-text {
          font-size: 1.75rem;
          color: #0f172a;
          line-height: 1.4;
          font-weight: 600;
          letter-spacing: -0.03em;
          margin-bottom: 2.5rem;
          position: relative;
        }

        .premium-stars {
          display: flex;
          justify-content: center;
          gap: 6px;
          margin-bottom: 2rem;
        }

        .premium-stars svg {
          color: #fbbf24;
          font-size: 1.4rem;
        }

        .author-box {
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .author-name {
          font-size: 1.3rem;
          font-weight: 800;
          color: #1e293b;
          margin: 0;
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .author-title {
          color: #64748b;
          font-size: 0.9rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.15em;
          margin-top: 4px;
        }

        /* Sleek Navigation */
        .nav-btn-round {
          width: 64px;
          height: 64px;
          background: #ffffff;
          border: none;
          border-radius: 50%;
          color: #0f172a;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          box-shadow: 0 10px 25px rgba(0,0,0,0.06);
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          z-index: 10;
        }

        .nav-btn-round:hover {
          transform: translateY(-50%) scale(1.1);
          background: #0f172a;
          color: #ffffff;
        }

        .btn-prev { left: -32px; }
        .btn-next { right: -32px; }

        .indicator-pill-container {
          display: flex;
          justify-content: center;
          gap: 12px;
          margin-top: 60px;
        }

        .indicator-pill {
          width: 40px;
          height: 6px;
          border-radius: 100px;
          background: #e2e8f0;
          border: none;
          transition: all 0.3s ease;
        }

        .indicator-pill.active {
          background: #2563eb;
          width: 80px;
        }

        @media (max-width: 768px) {
          .testimonial-glass-card { padding: 3.5rem 2rem; }
          .testimonial-main-text { font-size: 1.3rem; }
          .nav-btn-round { display: none; }
          .stat-badge { right: 20px; }
        }
      `}</style>

      {/* Decorative background spheres */}
      <div className="mesh-sphere" style={{top: '-10%', left: '-10%'}}></div>
      <div className="mesh-sphere" style={{bottom: '-10%', right: '-10%', background: 'radial-gradient(circle, rgba(124, 58, 237, 0.05) 0%, rgba(255, 255, 255, 0) 70%)'}}></div>

      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-10 position-relative">
            <div id="testimonialCarousel" className="carousel slide" data-bs-ride="carousel">
              
              <div className="carousel-inner">
                {testimonials.map((t, index) => (
                  <div className={`carousel-item ${index === 0 ? 'active' : ''}`} key={index}>
                    <div className="testimonial-glass-card text-center">
                      <div className="stat-badge mt-5">
                        <HiCheckBadge size={18} /> {t.stat}
                      </div>
                      
                      <div className="large-quote-mark">“</div>
                      
                      <div className="premium-stars">
                        {[...Array(5)].map((_, i) => <HiStar key={i} />)}
                      </div>

                      <div className="testimonial-main-text">
                        "{t.quote}"
                      </div>

                      <div className="author-box">
                        <h5 className="author-name">
                          {t.reviewer}
                        </h5>
                        <p className="author-title">{t.title}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Controls */}
              <button className="nav-btn-round btn-prev" type="button" data-bs-target="#testimonialCarousel" data-bs-slide="prev">
                <HiChevronLeft size={28} />
              </button>
              <button className="nav-btn-round btn-next" type="button" data-bs-target="#testimonialCarousel" data-bs-slide="next">
                <HiChevronRight size={28} />
              </button>

              {/* Modern Indicators */}
              <div className="indicator-pill-container">
                {testimonials.map((_, index) => (
                  <button 
                    key={index}
                    data-bs-target="#testimonialCarousel" 
                    data-bs-slide-to={index} 
                    className={`indicator-pill ${index === 0 ? 'active' : ''}`}
                  />
                ))}
              </div>
              
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonial;