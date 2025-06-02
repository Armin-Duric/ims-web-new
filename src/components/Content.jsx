const Content = () => {
  return (
    <div className="py-5 text-white gradient-bg">
      <div className="container text-center py-5">
        <h2 className="display-4 fw-bold mb-4">
          Struggling with Medical Billing? Let’s Fix It Together!
        </h2>
        <p className="lead mb-4">
          Feeling overwhelmed by claims, denials, or coding errors? You’re not alone. At IMS, we understand the challenges and deliver tailored solutions to simplify your workflow, boost revenue, and ensure compliance—letting you focus on patient care.
        </p>
        <p className="fw-bold mb-5">
          Your Trusted Partner in Revenue Cycle Management.
        </p>
        <a
          href="/free-audit"
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
          Get a Free Billing Audit Now!
        </a>
      </div>
    </div>
  );
};

export default Content;