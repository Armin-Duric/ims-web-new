import React, { useState } from 'react';
import { 
  HiOutlineLightningBolt, 
  HiOutlineShare,        
  HiOutlineFingerPrint,  
  HiOutlineTemplate,     
  HiOutlineScale,        // For Personal Injury (Justice/Legal)
  HiOutlineBriefcase,    // For Workers' Comp (Employment/Labor)
  HiOutlineArrowRight,
  HiOutlineChevronUp,
  HiCheckCircle
} from 'react-icons/hi';

const Services = () => {
  const [expandedIndex, setExpandedIndex] = useState(null);

  const services = [
    {
      title: "Workers' Comp Specialist",
      description: "Dedicated management of work-related injury claims with complex fee schedules and reporting requirements.",
      points: [
        "Expert navigation of state-specific DWC fee schedules to ensure maximum legal reimbursement.",
        "Management of PR-4 and PR-2 reporting cycles to keep claims moving.",
        "Direct coordination with adjusters and nurse case managers to reduce friction.",
        "Specialized tracking of 'Utilization Review' (UR) and Independent Bill Review (IBR)."
      ],
      icon: <HiOutlineBriefcase />,
      color: "#0f172a", 
      keywords: ["Workers Comp", "DWC", "Fee Schedules"]
    },
    {
      title: "Personal Injury Lien Recovery",
      description: "Full-cycle management for PI cases, ensuring your liens are protected and recovery is maximized at settlement.",
      points: [
        "Strategic lien filing and protection throughout the litigation process.",
        "Proactive communication with law firms for case status updates.",
        "Detailed ledger maintenance for accurate settlement negotiations.",
        "Lien collection specialists trained in negotiation and reduction management."
      ],
      icon: <HiOutlineScale />, 
      color: "#2563eb",
      keywords: ["PI Liens", "Legal Coordination", "Med-Legal"]
    },
    {
      title: "Revenue Cycle Management",
      description: "Advanced RCM workflows designed to minimize claim denials and maximize collection rates.",
      points: [
        "IMS Advantage: AI-driven claim scrubbing reduces initial denials by up to 30%.",
        "Automated secondary insurance billing for faster reimbursement cycles.",
        "Real-time visibility into 'Days in AR' with custom performance dashboards.",
        "Proactive patient eligibility verification prior to every appointment."
      ],
      icon: <HiOutlineLightningBolt />,
      color: "#2563eb", 
      keywords: ["Billing", "Claims", "AR Management"]
    },
    {
      title: "Health Tech Integration",
      description: "Seamlessly connect your EHR and patient data with modern digital tools to reduce administrative friction.",
      points: [
        "IMS Advantage: Proprietary API bridges that connect legacy EHRs to modern tools.",
        "Bi-directional data syncing to eliminate duplicate manual entry.",
        "Secure patient portal integration for improved engagement.",
        "HL7 and FHIR compliant data migration and management strategies."
      ],
      icon: <HiOutlineShare />,
      color: "#0f172a", 
      keywords: ["EHR Sync", "API", "Interoperability"]
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
      icon: <HiOutlineFingerPrint />,
      color: "#2563eb",
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
      icon: <HiOutlineTemplate />,
      color: "#0f172a",
      keywords: ["Automation", "Workflow", "ROI"]
    }
  ];

  const toggleExpand = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <div className="services-warm-white py-5">
      <style>{`
        .services-warm-white {
          background-color: #ffffff;
          color: #1e293b;
        }

        .section-tag {
          color: #2563eb;
          font-weight: 800;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          font-size: 0.75rem;
        }

        .service-card-modern {
          background: #ffffff;
          border: 1px solid #f1f5f9;
          border-radius: 32px;
          padding: 2rem;
          height: 100%;
          transition: all 0.5s cubic-bezier(0.2, 1, 0.3, 1);
          position: relative;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.02);
          overflow: hidden;
          display: flex;
          flex-direction: column;
        }

        .service-card-modern::before {
          content: '';
          position: absolute;
          top: -20px;
          right: -20px;
          width: 100px;
          height: 100px;
          background: radial-gradient(circle, rgba(37, 99, 235, 0.03) 0%, transparent 70%);
          border-radius: 50%;
        }

        .service-card-modern:hover {
          transform: translateY(-12px);
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.08);
          border-color: #2563eb;
        }

        .icon-box-modern {
          width: 56px;
          height: 56px;
          border-radius: 18px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.5rem;
          margin-bottom: 1.5rem;
          background: #f8fafc;
          border: 1px solid #f1f5f9;
          transition: all 0.3s ease;
        }

        .service-card-modern:hover .icon-box-modern {
          background: #2563eb;
          color: #ffffff !important;
          transform: scale(1.1);
        }

        .keyword-pill {
          background: #f1f5f9;
          color: #64748b;
          font-size: 0.6rem;
          font-weight: 700;
          padding: 4px 10px;
          border-radius: 6px;
          text-transform: uppercase;
        }

        .cta-glass-banner {
          background: #0f172a;
          border-radius: 48px;
          padding: 5rem 2rem;
          color: white;
          margin-top: 6rem;
          position: relative;
          overflow: hidden;
          box-shadow: 0 30px 60px -12px rgba(15, 23, 42, 0.3);
        }
      `}</style>

      <div className="container py-5">
        <header className="text-center mb-5 pb-4">
          <span className="section-tag d-block mb-3">Specialized Expertise</span>
          <h2 className="display-4 fw-bold text-dark mb-3" style={{ letterSpacing: '-0.04em' }}>
            High-Complexity <br /> 
            <span className="text-primary">Medical Billing</span>
          </h2>
          <p className="lead text-muted mx-auto" style={{ maxWidth: '700px' }}>
            From high-stakes Personal Injury liens to the intricate regulations of Workers' Comp, we provide the technical infrastructure your practice needs.
          </p>
        </header>

        

        <div className="row g-4">
          {services.map((service, index) => (
            <div key={index} className="col-lg-4 col-md-6">
              <article 
                className="service-card-modern cursor-pointer"
                onClick={() => toggleExpand(index)}
              >
                <div 
                  className="icon-box-modern" 
                  style={{ color: service.color }}
                >
                  {React.cloneElement(service.icon)}
                </div>
                
                <h3 className="h5 fw-bold text-dark mb-2">
                  {service.title}
                </h3>
                
                <p className="text-muted small mb-3 lh-relaxed">
                  {service.description}
                </p>

                <div className="d-flex flex-wrap gap-2 mb-4">
                  {service.keywords.map((word, i) => (
                    <span key={i} className="keyword-pill">
                      {word}
                    </span>
                  ))}
                </div>

                <div 
                  className="overflow-hidden"
                  style={{ 
                    maxHeight: expandedIndex === index ? '600px' : '0',
                    opacity: expandedIndex === index ? 1 : 0,
                    transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)'
                  }}
                >
                  <ul className="list-unstyled mb-4 pt-3 border-top">
                    {service.points.map((point, i) => (
                      <li key={i} className="text-muted small mb-3 d-flex align-items-start gap-2">
                        <HiCheckCircle className="text-primary flex-shrink-0 mt-1" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="text-primary small fw-bold d-flex align-items-center gap-2 mt-auto pt-3">
                  {expandedIndex === index ? 'Minimize' : 'Explore Capabilities'} 
                  <HiOutlineArrowRight style={{ transform: expandedIndex === index ? 'rotate(-90deg)' : 'none', transition: '0.3s' }} />
                </div>
              </article>
            </div>
          ))}
        </div>

        <div className="cta-glass-banner text-center">
          <div className="position-relative" style={{ zIndex: 1 }}>
            <h2 className="display-5 fw-bold mb-4">Master Your Revenue Stream</h2>
            <p className="opacity-75 mb-5 mx-auto" style={{ maxWidth: '550px' }}>
              Specialized billing requires specialized technology. Schedule a deep-dive into our Personal Injury and Workers' Comp workflows.
            </p>
            <a href="/contact" className="btn btn-primary btn-lg rounded-pill px-5 py-3 fw-bold border-0 shadow-lg">
              Initialize Free Audit
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services;