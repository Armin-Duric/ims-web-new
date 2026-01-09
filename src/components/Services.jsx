import React, { useState } from 'react';
import { 
  HiOutlineShieldCheck, 
  HiOutlineChartBar, 
  HiOutlineLightBulb, 
  HiOutlineCubeTransparent,
  HiOutlineArrowRight,
  HiOutlineChevronUp,
  HiCheckCircle
} from 'react-icons/hi';

const Services = () => {
  const [expandedIndex, setExpandedIndex] = useState(null);

  const services = [
    {
      title: "Revenue Cycle Management",
      description: "Advanced RCM workflows designed to minimize claim denials and maximize collection rates for medical practices.",
      points: [
        "IMS Advantage: AI-driven claim scrubbing reduces initial denials by up to 30%.",
        "Automated secondary insurance billing for faster reimbursement cycles.",
        "Real-time visibility into 'Days in AR' with custom performance dashboards.",
        "Proactive patient eligibility verification prior to every appointment."
      ],
      icon: <HiOutlineChartBar className="w-8 h-8" />,
      color: "text-blue-400",
      keywords: ["Medical Billing", "Claims", "Denials"]
    },
    {
      title: "Health Tech Integration",
      description: "Seamlessly connect your EHR and patient data with modern digital tools to reduce administrative friction.",
      points: [
        "IMS Advantage: Proprietary API bridges that connect legacy EHRs to modern SaaS tools.",
        "Bi-directional data syncing to eliminate duplicate manual entry.",
        "Secure patient portal integration for improved engagement and telehealth.",
        "HL7 and FHIR compliant data migration and management strategies."
      ],
      icon: <HiOutlineLightBulb className="w-8 h-8" />,
      color: "text-amber-400",
      keywords: ["EHR Sync", "Digital Infrastructure"]
    },
    {
      title: "HIPAA Compliance & Security",
      description: "Zero-compromise security protocols ensuring patient data remains protected and audits stay clean.",
      points: [
        "IMS Advantage: 24/7 automated monitoring for potential data breaches.",
        "Comprehensive annual HIPAA Risk Assessments and remediation plans.",
        "Employee security awareness training and phishing simulations.",
        "Encrypted cloud backups and disaster recovery for practice continuity."
      ],
      icon: <HiOutlineShieldCheck className="w-8 h-8" />,
      color: "text-emerald-400",
      keywords: ["Security", "Compliance", "Audits"]
    },
    {
      title: "Operational Automation",
      description: "Intelligent automation that handles repetitive tasks, allowing your staff to focus on patient outcomes.",
      points: [
        "IMS Advantage: Save administrative staff 15+ hours weekly via smart scheduling.",
        "Automated patient intake forms that sync directly to your clinical charts.",
        "AI-powered payment reminders that increase patient collections by 20%.",
        "Custom workflow design to identify and remove operational bottlenecks."
      ],
      icon: <HiOutlineCubeTransparent className="w-8 h-8" />,
      color: "text-purple-400",
      keywords: ["Automation", "Workflow", "ROI"]
    }
  ];

  const toggleExpand = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <div className="gradient-services-bg min-h-screen py-20 px-4">
      <div className="container mx-auto max-w-7xl pt-3">
        
        {/* Header Section */}
        <header className="text-center mb-2 pt-5">
          <span className="text-blue-400 font-bold tracking-widest uppercase text-sm mb-3 d-block">Our Expertise</span>
          <h1 className="display-3 fw-bold text-white mb-4">
            Optimizing Healthcare <br /> 
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">
              through Intelligence
            </span>
          </h1>
          <p className="lead text-white opacity-75 max-w-2xl mx-auto">
            We provide the infrastructure and strategy needed for medical practices to thrive in a digital-first world.
          </p>
        </header>

        {/* Modern Services Grid */}
        <div className="row g-4 align-items-stretch">
          {services.map((service, index) => (
            <div key={index} className="col-lg-3 col-md-6">
              <article 
                className={`h-100 p-4 border-0 position-relative transition-all cursor-pointer`}
                onClick={() => toggleExpand(index)}
                style={{
                  background: 'rgba(255, 255, 255, 0.05)',
                  backdropFilter: 'blur(15px)',
                  WebkitBackdropFilter: 'blur(15px)',
                  borderRadius: '24px',
                  border: expandedIndex === index ? '1px solid rgba(96, 165, 250, 0.5)' : '1px solid rgba(255, 255, 255, 0.1)',
                  transform: expandedIndex === index ? 'scale(1.02)' : 'none',
                  transition: 'all 0.3s ease-in-out'
                }}
              >
                {/* Icon Container */}
                <div className={`mb-4 p-3 d-inline-block rounded-4 ${service.color} bg-white bg-opacity-10`}>
                  {service.icon}
                </div>
                
                <h3 className="h4 fw-bold text-white mb-3">
                  {service.title}
                </h3>
                
                <p className="text-white opacity-75 mb-4 small">
                  {service.description}
                </p>

                {/* Bullet Points Expansion */}
                <div 
                  className="overflow-hidden transition-all duration-500"
                  style={{ 
                    maxHeight: expandedIndex === index ? '500px' : '0',
                    opacity: expandedIndex === index ? 1 : 0
                  }}
                >
                  <ul className="list-unstyled mb-4">
                    {service.points.map((point, i) => (
                      <li key={i} className="text-white small opacity-75 mb-2 d-flex align-items-start gap-2">
                        <HiCheckCircle className={`${service.color} flex-shrink-0 mt-1`} />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* SEO Keyword Pills */}
                <div className="d-flex flex-wrap gap-2 mb-4">
                  {service.keywords.map((word, i) => (
                    <span key={i} className="badge bg-white bg-opacity-10 text-white opacity-50 fw-light px-2 py-1" style={{ fontSize: '0.7rem'}}>
                      {word}
                    </span>
                  ))}
                </div>

                <div className="text-white small fw-bold d-flex align-items-center gap-2 mt-auto">
                  {expandedIndex === index ? (
                    <span className="d-flex align-items-center gap-2 opacity-50">View Less <HiOutlineChevronUp /></span>
                  ) : (
                    <span className="d-flex align-items-center gap-2">Learn More <HiOutlineArrowRight /></span>
                  )}
                </div>
              </article>
            </div>
          ))}
        </div>

        {/* Bottom Call to Action */}
        <div 
          className="mt-5 p-5 text-center text-white"
          style={{
            background: 'linear-gradient(90deg, rgba(59, 130, 246, 0.1), rgba(16, 185, 129, 0.1))',
            borderRadius: '30px',
            border: '1px solid rgba(255, 255, 255, 0.05)'
          }}
        >
          <h2 className="fw-bold mb-3">Ready to transform your practice?</h2>
          <p className="opacity-75 mb-4 max-w-xl mx-auto">
            Join 100+ healthcare providers who have optimized their revenue with IMS.
          </p>
          <a href="/contact">
            <button className="btn btn-primary btn-lg rounded-pill px-5 shadow-lg">
              Get a Free Revenue Audit
            </button>
          </a>
        </div>
        
      </div>
    </div>
  );
};

export default Services;