import React from 'react';
import { 
  HiOutlineShieldCheck, 
  HiOutlineChartBar, 
  HiOutlineLightBulb, 
  HiOutlineCubeTransparent,
  HiOutlineArrowRight
} from 'react-icons/hi';

const Services = () => {
  const services = [
    {
      title: "Revenue Cycle Management",
      description: "Advanced RCM workflows designed to minimize claim denials and maximize collection rates for medical practices.",
      icon: <HiOutlineChartBar className="w-8 h-8" />,
      color: "text-blue-400",
      keywords: ["Medical Billing", "Claims", "Denials"]
    },
    {
      title: "Health Tech Integration",
      description: "Seamlessly connect your EHR and patient data with modern digital tools to reduce administrative friction.",
      icon: <HiOutlineLightBulb className="w-8 h-8" />,
      color: "text-amber-400",
      keywords: ["EHR Sync", "Digital Infrastructure"]
    },
    {
      title: "HIPAA Compliance & Security",
      description: "Zero-compromise security protocols ensuring patient data remains protected and audits stay clean.",
      icon: <HiOutlineShieldCheck className="w-8 h-8" />,
      color: "text-emerald-400",
      keywords: ["Security", "Compliance", "Audits"]
    },
    {
      title: "Operational Automation",
      description: "Intelligent automation that handles repetitive tasks, allowing your staff to focus on patient outcomes.",
      icon: <HiOutlineCubeTransparent className="w-8 h-8" />,
      color: "text-purple-400",
      keywords: ["Automation", "Workflow", "ROI"]
    }
  ];

  return (
    <div className="gradient-bg min-h-screen py-20 px-4">
      <div className="container mx-auto max-w-7xl">
        
        {/* Header Section */}
        <header className="text-center mb-20">
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
        <div className="row g-4">
          {services.map((service, index) => (
            <div key={index} className="col-lg-3 col-md-6">
              <article 
                className="h-100 p-4 border-0 position-relative transition-all"
                style={{
                  background: 'rgba(255, 255, 255, 0.05)',
                  backdropFilter: 'blur(15px)',
                  WebkitBackdropFilter: 'blur(15px)',
                  borderRadius: '24px',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  transition: 'transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
                }}
                onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05) translateY(-10px)'}
                onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1) translateY(0)'}
              >
                {/* Icon Container */}
                <div className={`mb-4 p-3 d-inline-block rounded-4 ${service.color} bg-white bg-opacity-10`}>
                  {service.icon}
                </div>
                
                <h3 className="h4 fw-bold text-white mb-3">
                  {service.title}
                </h3>
                
                <p className="text-white opacity-50 mb-4 lh-lg small">
                  {service.description}
                </p>

                {/* SEO Keyword Pills */}
                <div className="d-flex flex-wrap gap-2 mb-4">
                  {service.keywords.map((word, i) => (
                    <span key={i} className="badge bg-white bg-opacity-10 text-white opacity-75 fw-normal px-2 py-1">
                      {word}
                    </span>
                  ))}
                </div>

                <a href="#contact" className="text-white text-decoration-none small fw-bold d-flex align-items-center gap-2 group">
                  Learn More <HiOutlineArrowRight className="transition-all" />
                </a>
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
          <button className="btn btn-primary btn-lg rounded-pill px-5 shadow-lg">
            Get a Free Revenue Audit
          </button>
        </div>
        
      </div>
    </div>
  );
};

export default Services;