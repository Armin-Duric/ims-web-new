const Info = () => {
  return (
    <section className="cards-section py-5 d-flex flex-column px-5 px-md-0 px-lg-2 flex-md-row gap-2 gap-lg-4 rounded">
        <div className="card cards card-option rounded-3 p-4">
            <div className="card-body text-center">
                <i className="fas fa-shield-alt fa-3x mb-3 icon-pulse"></i>
                <h5 className="card-title card-title-neon mb-3">Secure Solutions</h5>
                <p className="card-text">
                Our cutting-edge technology ensures your data is protected with state-of-the-art security measures, building trust with every transaction.
                </p>
            </div>
        </div>
        <div className="card cards card-option rounded-3 p-4">
            <div className="card-body text-center">
                <i className="fas fa-chart-line fa-3x mb-3 icon-pulse"></i>
                <h5 className="card-title card-title-neon mb-3">Real-Time Insights</h5>
                <p className="card-text">
                Gain actionable insights with our advanced analytics, delivered in real-time to optimize your business performance with confidence.
                </p>
            </div>
        </div>
        <div className="card cards card-option rounded-3 p-4">
            <div className="card-body text-center">
                <i className="fas fa-user-md fa-3x mb-3 icon-pulse"></i>
                <h5 className="card-title card-title-neon mb-3">Expert Team</h5>
                <p className="card-text">
                Our certified professionals bring years of experience, ensuring reliable and trustworthy service tailored to your needs.
                </p>
            </div>
        </div>
    </section>
  );
};

export default Info;