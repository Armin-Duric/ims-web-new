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
    <section className="testimonial-section py-5">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <div id="testimonialCarousel" className="carousel slide" data-bs-ride="carousel">
              <div className="carousel-inner">
                {testimonials.map((testimonial, index) => (
                  <div className={`carousel-item ${index === 0 ? 'active' : ''}`} key={index}>
                    <div className="card testimonial-card bg-white p-4 rounded-3">
                      <div className="card-body text-center">
                        {/* Quote Icon */}
                        <i className="fas fa-quote-left fa-2x text-primary mb-4"></i>

                        {/* Testimonial Text */}
                        <blockquote className="blockquote mb-4">
                          <p className="mb-0">{testimonial.quote}</p>
                        </blockquote>

                        {/* Star Rating */}
                        <div className="star-rating mb-4">
                          <i className="fas fa-star"></i>
                          <i className="fas fa-star"></i>
                          <i className="fas fa-star"></i>
                          <i className="fas fa-star"></i>
                          <i className="fas fa-star"></i>
                        </div>

                        {/* Reviewer Info */}
                        <footer className="blockquote-footer">
                          <strong>{testimonial.reviewer}</strong>, {testimonial.title}
                        </footer>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Navigation Controls */}
              <button
                className="carousel-control-prev"
                type="button"
                data-bs-target="#testimonialCarousel"
                data-bs-slide="prev"
              >
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Previous</span>
              </button>
              <button
                className="carousel-control-next"
                type="button"
                data-bs-target="#testimonialCarousel"
                data-bs-slide="next"
              >
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Next</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonial;