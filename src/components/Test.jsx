import { useState } from 'react';

const Test = () => {
  const [selectedIndex, setSelectedIndex] = useState(null);

  const services = [
    {
      title: "Custom Medical Billing Services",
      icon: "fas fa-pen-fancy",
      description:
        "Our custom medical billing services are tailored to your practice’s unique needs, ensuring accurate claims processing and maximized revenue. As a leading medical billing company, Innovative Management Solutions (IMS) optimizes your billing workflow with personalized strategies.",
      image: "/images/custom-billing.png",
      details: (
        <ul className="list-unstyled text-white fs-5">
          <li><strong>Personalized Solutions:</strong> Tailored to your practice’s specific needs.</li>
          <li><strong>Accurate Claims:</strong> Ensures maximum revenue with precision coding.</li>
          <li><strong>Efficient Workflow:</strong> Streamlines billing for healthcare providers.</li>
          <li><strong>Expert Support:</strong> Dedicated team for your success.</li>
          <li><strong>Custom Reporting:</strong> Provides detailed insights for decision-making.</li>
          <li><strong>Flexible Plans:</strong> Adapts to your practice’s growth.</li>
        </ul>
      ),
    },
    {
      title: "Revenue Cycle Management",
      icon: "fas fa-chart-line",
      description:
        "Enhance your practice’s financial health with our expert revenue cycle management. We streamline billing, reduce denials, and improve cash flow, making IMS a trusted medical billing company for healthcare providers seeking efficiency.",
      image: "/images/revenue.png",
      details: (
        <ul className="list-unstyled text-white fs-5">
          <li><strong>Streamlined Billing:</strong> Reduces denials and delays.</li>
          <li><strong>Improved Cash Flow:</strong> Accelerates payments for your practice.</li>
          <li><strong>Efficiency Boost:</strong> Trusted by healthcare providers nationwide.</li>
          <li><strong>Denial Prevention:</strong> Minimizes revenue loss.</li>
          <li><strong>Analytics Tools:</strong> Offers real-time performance tracking.</li>
          <li><strong>Cost Reduction:</strong> Lowers operational expenses.</li>
        </ul>
      ),
    },
    {
      title: "HIPAA Compliant Billing",
      icon: "fas fa-shield-alt",
      description:
        "Ensure compliance with HIPAA regulations through our secure medical billing services. Innovative Management Solutions (IMS) protects your practice with robust data security and accurate billing, a top priority for any medical billing company.",
      image: "/images/hippa.png",
      details: (
        <ul className="list-unstyled text-white fs-5">
          <li><strong>Secure Data:</strong> Protects patient information with top-tier security.</li>
          <li><strong>HIPAA Compliance:</strong> Meets all regulatory standards.</li>
          <li><strong>Risk-Free Billing:</strong> Safeguards your practice’s reputation.</li>
          <li><strong>Regular Audits:</strong> Ensures ongoing compliance.</li>
          <li><strong>Training Support:</strong> Educates staff on compliance.</li>
          <li><strong>Emergency Protocols:</strong> Handles data breaches effectively.</li>
        </ul>
      ),
    },
    {
      title: "Medical Billing Optimization",
      icon: "fas fa-desktop",
      description:
        "Boost your billing efficiency with our optimization services. As a premier medical billing company, IMS enhances user experience and reduces errors, delivering a modern and effective billing platform for healthcare practices.",
      image: "/images/optimization.png",
      details: (
        <ul className="list-unstyled text-white fs-5">
          <li><strong>Error Reduction:</strong> Minimizes mistakes in billing processes.</li>
          <li><strong>Enhanced UX:</strong> Improves efficiency for your staff.</li>
          <li><strong>Modern Platform:</strong> Keeps your practice ahead of the curve.</li>
          <li><strong>Real-Time Updates:</strong> Tracks performance instantly.</li>
          <li><strong>Scalable Design:</strong> Grows with your practice.</li>
          <li><strong>Training Included:</strong> Supports staff adoption.</li>
        </ul>
      ),
    },
    {
      title: "Certified Coders",
      icon: "fas fa-user-md",
      description:
        "Simplify payments with our team of certified coders. Innovative Management Solutions (IMS), a leading medical billing company, offers expert coding that ensures accuracy and compliance, enhancing patient care and administrative efficiency.",
      image: "/images/coders.png",
      details: (
        <ul className="list-unstyled text-white fs-5">
          <li><strong>Expert Coding:</strong> Certified professionals ensure accuracy.</li>
          <li><strong>Compliance Guaranteed:</strong> Meets all industry standards.</li>
          <li><strong>Efficiency Gains:</strong> Speeds up your billing process.</li>
          <li><strong>Continuous Training:</strong> Keeps skills up-to-date.</li>
          <li><strong>Specialized Knowledge:</strong> Handles complex cases.</li>
          <li><strong>Quality Assurance:</strong> Double-checks every code.</li>
        </ul>
      ),
    },
    {
      title: "Electronic Health Record Integration",
      icon: "fas fa-file-medical",
      description:
        "Seamlessly integrate billing with electronic health records (EHR) using IMS services. As a leading medical billing company, we ensure a secure and efficient payment process, enhancing patient care and administrative workflows.",
      image: "/images/ehr.png",
      details: (
        <ul className="list-unstyled text-white fs-5">
          <li><strong>Seamless Integration:</strong> Connects EHR with billing effortlessly.</li>
          <li><strong>Secure Process:</strong> Protects sensitive patient data.</li>
          <li><strong>Workflow Boost:</strong> Enhances administrative efficiency.</li>
          <li><strong>Real-Time Access:</strong> Improves decision-making.</li>
          <li><strong>Custom Sync:</strong> Aligns with your EHR system.</li>
          <li><strong>Support Team:</strong> Assists with setup and updates.</li>
        </ul>
      ),
    },
    {
      title: "Medical Claims Processing",
      icon: "fas fa-file-invoice",
      description:
        "Our expert medical claims processing ensures timely submissions and higher approval rates. Innovative Management Solutions (IMS) streamlines the process, reducing delays and maximizing reimbursements for your practice.",
      image: "/images/claim-processing.png",
      details: (
        <ul className="list-unstyled text-white fs-5">
          <li><strong>Timely Submissions:</strong> Speeds up claim approvals.</li>
          <li><strong>Higher Approval:</strong> Maximizes reimbursements.</li>
          <li><strong>Reduced Delays:</strong> Minimizes wait times.</li>
          <li><strong>Expert Oversight:</strong> Ensures accuracy every step.</li>
          <li><strong>Follow-Up Services:</strong> Tracks claim status.</li>
          <li><strong>Appeal Assistance:</strong> Handles denied claims.</li>
        </ul>
      ),
    },
    {
      title: "Denial Management",
      icon: "fas fa-ban",
      description:
        "Minimize claim denials with our denial management services. As a top medical billing company, IMS identifies issues, resubmits claims, and recovers lost revenue efficiently for your healthcare practice.",
      image: "/images/denial.png",
      details: (
        <ul className="list-unstyled text-white fs-5">
          <li><strong>Denial Prevention:</strong> Identifies issues early.</li>
          <li><strong>Claim Resubmission:</strong> Recovers lost revenue.</li>
          <li><strong>Efficiency Gains:</strong> Saves time and resources.</li>
          <li><strong>Proactive Approach:</strong> Reduces future denials.</li>
          <li><strong>Detailed Analysis:</strong> Pinpoints root causes.</li>
          <li><strong>Recovery Support:</strong> Maximizes revenue recovery.</li>
        </ul>
      ),
    },
  ];

  const handleMouseEnter = (index) => {
    if (selectedIndex !== null) {
      setSelectedIndex(index);
    }
  };

  const handleClick = (index) => {
    setSelectedIndex(index);
  };

  return (
    <section
      className="py-5 black-bg from-blue-900 to-blue-700 text-white d-flex align-items-center justify-content-center"
      style={{ minHeight: '100vh' }}
    >
      <div className="container">
        <div className="row align-items-start justify-content-center">
          {/* Left Column */}
          <div className="col-md-6 mb-4 mb-md-0">
            <div className="mb-4">
              {selectedIndex !== null ? (
                services[selectedIndex].details
              ) : (
                <>
                  <h2 className="text-blue-200 fw-bold mb-2">WHY IMS?</h2>
                  <h3 className="h2 mb-3">Discover Our Expertise as a Medical Billing Company</h3>
                  <p className="lead mb-4">
                    As a full-service medical billing agency, Innovative Management Solutions (IMS) handles all your digital billing needs under one roof. Our custom billing services include thorough research and planning, bespoke designs, and strategies tailored to grow your reach, drive revenue, and encourage patient engagement.
                  </p>
                </>
              )}
            </div>
            <div className="position-relative">
              <img
                src={selectedIndex !== null ? services[selectedIndex].image : "/images/thinking.jpg"}
                alt={selectedIndex !== null ? `${services[selectedIndex].title} Image` : "Medical Billing Services"}
                className="img-fluid rounded"
              />
            </div>
          </div>

          {/* Right Column */}
          <div className="col-md-6">
            <div className="d-flex flex-column h-100">
              <div
                className="flex-grow-1 overflow-y-auto pe-2"
                style={{
                  maxHeight: '737px',
                  scrollbarWidth: 'none',
                  msOverflowStyle: 'none',
                }}
              >
                <style>{`
                  .flex-grow-1::-webkit-scrollbar {
                    display: none;
                  }
                  .card {
                    transition: transform 0.4s ease, box-shadow 0.4s ease;
                    z-index: 1;
                    overflow: visible;
                  }
                  .card.selected {
                    transform: scale(1.05);
                    z-index: 10;
                    box-shadow: 0 0 20px rgba(0,0,0,0.6);
                  }
                `}</style>
                {services.map((service, index) => (
                  <div
                    key={index}
                    className={`card mb-4 border-0 ${
                      selectedIndex === index
                        ? 'bg-dark bg-opacity-50 selected border-primary'
                        : 'bg-dark bg-opacity-75'
                    }`}
                    onMouseEnter={() => handleMouseEnter(index)}
                    onClick={() => handleClick(index)}
                    style={{
                      cursor: 'pointer',
                      borderRadius: '12px',
                      padding: '1rem',
                    }}
                  >
                    <div className="card-body p-3">
                      <div className="d-flex align-items-center mb-2">
                        <i className={`${service.icon} fa-lg me-2 text-white`}></i>
                        <h5 className="card-title text-white mb-0">
                          {service.title}
                        </h5>
                      </div>
                      <p className="card-text text-white">
                        {service.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Test;