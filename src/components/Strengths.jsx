const Strengths = () => {
  const strengths = [
    {
      title: "Proven Expertise",
      description: "Over 30 years of industry leadership, delivering reliable revenue cycle solutions for healthcare providers across the U.S.",
      icon: "fas fa-star",
    },
    {
      title: "Innovative Technology",
      description: "State-of-the-art tools and analytics to streamline billing processes and enhance financial performance.",
      icon: "fas fa-laptop",
    },
    {
      title: "Tailored Support",
      description: "Customized services designed to meet the unique needs of every medical practice, ensuring maximum efficiency.",
      icon: "fas fa-users",
    },
    {
      title: "Compliance Excellence",
      description: "Unwavering commitment to regulatory standards, protecting your practice with every transaction.",
      icon: "fas fa-shield-alt",
    },
  ];

  return (
    <div className="py-5 gradient-bg">
      <div className="container text-white py-5">
        <h2 className="display-4 fw-bold mb-4 text-center">
          IMS Strengths
        </h2>
        <p className="lead mb-5 text-center">
          Discover why Innovative Management Solutions stands out as your trusted partner in medical billing.
        </p>
        <div className="row g-4 justify-content-center">
          {strengths.map((strength, index) => (
            <div className="col-md-3" key={index}>
              <div className="card h-100 bg-dark text-white border-0 shadow-sm">
                <div className="card-body text-center">
                  <i className={`${strength.icon} fa-3x mb-3`}></i>
                  <h4 className="card-title fw-bold">{strength.title}</h4>
                  <p className="card-text">{strength.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Strengths;