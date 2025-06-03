const Team = () => {
  const teamMembers = [
    {
      name: "John Doe",
      title: "Chief Operating Officer",
      image: "/images/avatar.jpg",
      email: "john.doe@ims.com",
      phone: "+1-555-0101",
    },
    {
      name: "Jane Smith",
      title: "Lead Medical Coder",
      image: "/images/avatar.jpg",
      email: "jane.smith@ims.com",
      phone: "+1-555-0102",
    },
    {
      name: "Michael Brown",
      title: "Accounts Receivable Specialist",
      image: "/images/avatar.jpg",
      email: "michael.brown@ims.com",
      phone: "+1-555-0103",
    },
  ];

  return (
    <div className="py-5 gradient-bg"
    style={{minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
    >
      <div className="container text-white py-5">
        <h1 className="display-3 fw-bold mb-4 text-center">
          Meet Our Expert Team
        </h1>
        <p className="lead mb-5 text-center">
          Our dedicated professionals bring years of experience to ensure your success in revenue cycle management.
        </p>
        <div className="row g-4 justify-content-center">
          {teamMembers.map((member, index) => (
            <div className="col-md-4 col-6" key={index}>
              <div className="card h-100 text-white border-0 shadow-sm icon-bg">
                <img
                  src={member.image}
                  alt={`${member.name}'s profile`}
                  className="card-img-top rounded-circle"
                  style={{ height: '250px', objectFit: 'contain' }}
                />
                <div className="card-body text-center">
                  <h4 className="card-title fw-bold">{member.name}</h4>
                  <p className="card-text">{member.title}</p>
                  <p className="card-text">
                    <i className="fas fa-envelope me-2"></i>
                    <a href={`mailto:${member.email}`} className="text-white text-decoration-none">
                      {member.email}
                    </a>
                  </p>
                  <p className="card-text">
                    <i className="fas fa-phone me-2"></i>
                    <span>{member.phone}</span>
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-5">
          <a
            href="/contact"
            className="btn btn-lg btn-primary"
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
            Get in Touch With Our Team
          </a>
        </div>
      </div>
    </div>
  );
};

export default Team;