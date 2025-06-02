const Home = () => {
  return (
    <div className="py-5 text-center" style={{ background: '#f8f9fa', minHeight: '100vh' }}>
      <div className="container py-5">
        <h1 className="display-4 fw-bold text-primary">Welcome to IMS</h1>
        <p className="lead">
          Discover how Innovative Management Solutions can transform your medical billing and revenue cycle management.
        </p>
        <a href="/about" className="btn btn-primary btn-lg">
          Learn More
        </a>
      </div>
    </div>
  );
};

export default Home;