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
    <section
      className="py-5 black-bg"
    >
      <div className="container text-white py-5">
        <h2 className="display-4 fw-bold mb-5 text-center">
          Why Choose IMS?
        </h2>
        {features.map((feature, index) => (
          <div
            key={index}
            className={`row align-items-center mb-5 ${
              index % 2 === 0 ? '' : 'flex-row-reverse'
            }`}
          >
            <div className="col-md-6 text-center text-md-start">
              <h4 className="fw-bold mb-3">
                {feature.title}
              </h4>
              <p className="lead">{feature.description}</p>
            </div>
            <div className="col-md-6 text-center">
              <i
                className={`${feature.icon} fa-5x mb-3 icon-pulse`}
              ></i>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Info;