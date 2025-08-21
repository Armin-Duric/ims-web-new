import { useState } from 'react';

const Services = () => {
  const [activeCard, setActiveCard] = useState(null);

  const services = [
    {
      id: 'coding',
      title: 'Medical Coding',
      icon: 'fas fa-code fa-3x mb-3',
      description: 'Our certified coders optimize charge reimbursement, minimizing denials and appeals with precision and expertise tailored to your specialty.',
      details: 'Our team of AAPC-certified coders ensures accurate CPT, ICD-10, and HCPCS coding, reducing claim denials by up to 30%. We stay updated with the latest coding regulations and provide specialty-specific solutions for practices ranging from orthopedics to cardiology.',
      bgImage: 'url(/images/coding-bg.jpg)',
    },
    {
      id: 'billing',
      title: 'Medical Billing',
      icon: 'fas fa-file-invoice-dollar fa-3x mb-3',
      description: 'Customized billing solutions for all specialties, streamlining claims submission, appeals, and payment processing to enhance your revenue cycle.',
      details: 'We handle end-to-end billing, from claim creation to payment posting. Our solutions reduce claim rejection rates and accelerate reimbursement timelines, with a focus on workers’ compensation and personal injury claims for maximum revenue recovery.',
      bgImage: 'url(/images/billing-bg.jpg)',
    },
    {
      id: 'ar',
      title: 'Accounts Receivable Services',
      icon: 'fas fa-chart-line fa-3x mb-3',
      description: 'Dedicated A/R specialists ensure timely follow-up with payers, accelerating claim processing and improving your cash flow efficiency.',
      details: 'Our A/R team proactively manages outstanding claims, reducing days in A/R by 25% on average. We provide detailed follow-up reports and work directly with payers to resolve disputes, ensuring faster payments and improved financial health.',
      bgImage: 'url(/images/ar-bg.jpg)',
    },
    {
      id: 'analytics',
      title: 'Analytics & Reporting',
      icon: 'fas fa-chart-pie fa-3x mb-3',
      description: 'Gain actionable insights with advanced analytics, empowering you to optimize your revenue cycle performance with confidence.',
      details: 'Our analytics platform provides real-time insights into your practice’s financial performance. From denial trends to revenue forecasting, our customized reports help you make data-driven decisions to boost profitability.',
      bgImage: 'url(/images/analytics-bg.jpg)',
    },
  ];

  const handleCardClick = (id) => {
    setActiveCard(activeCard === id ? null : id);
  };

  return (
    <div
      className="py-5 transition-all duration-500 gradient-bg"
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="container text-white py-5">
        <h1 className="display-3 fw-bold mb-4 text-center animate__animated animate__fadeIn">
          Our Expert Medical Billing Services
        </h1>
        <p className="lead mb-5 text-center animate__animated animate__fadeIn animate__delay-1s">
          Elevate your practice with Innovative Management Solutions (IMS). We simplify the complexities of medical billing, ensuring maximum revenue and compliance with cutting-edge expertise.
        </p>
        <div className="row g-4 justify-content-center">
          {services.map((service) => (
            <div key={service.id} className="col-md-6">
              <div
                className="card h-100 bg-dark text-white border-0 shadow-lg rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:bg-gray-800 cursor-pointer group"
                onClick={() => handleCardClick(service.id)}
              >
                <div className="card-body text-center p-4" style={{cursor: 'pointer'}}>
                  <i className={`${service.icon} text-primary group-hover:text-blue-300 transition-colors duration-300`}></i>
                  <h4 className="card-title fw-bold mt-3 group-hover:text-blue-300 transition-colors duration-300">{service.title}</h4>
                  <p className="card-text">{service.description}</p>
                  {activeCard === service.id && (
                    <div className="mt-3 p-3 bg-secondary bg-opacity-50 rounded animate__animated animate__fadeIn border-l-4 border-primary">
                      <p className="mb-0">{service.details}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-5">
          <a
            href="/contact"
            className="btn btn-lg animate__animated animate__pulse"
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
            Request a Consultation
          </a>
        </div>
      </div>
    </div>
  );
};

export default Services;