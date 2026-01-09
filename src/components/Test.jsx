import React, { useState, useEffect } from 'react';
import { 
  HiOutlinePencilAlt, HiOutlineChartBar, HiOutlineShieldCheck, 
  HiOutlineDesktopComputer, HiOutlineUserCircle, HiOutlineFolderAdd, 
  HiOutlineClipboardCheck, HiOutlineXCircle, HiCheckCircle,
  HiOutlineLightningBolt
} from 'react-icons/hi';

const ServicesSuite = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [activePoints, setActivePoints] = useState([]);

  useEffect(() => {
    setActivePoints([]);
    const points = [25, 40, 30, 50, 75, 65, 90, 100]; 
    let current = 0;
    const interval = setInterval(() => {
      if (current < points.length) {
        setActivePoints(prev => [...prev, points[current]]);
        current++;
      } else {
        clearInterval(interval);
      }
    }, 50); 
    return () => clearInterval(interval);
  }, [selectedIndex]);

  const services = [
    { 
      title: "Custom Medical Billing", 
      icon: <HiOutlinePencilAlt />, 
      impact: "98%", 
      label: "Accuracy Rate", 
      details: ["ICD-10 Precision", "Custom CPT Audits", "Bespoke Reporting", "Specialty Coding", "Payer Rule Sync", "Claim Scrubbing"] 
    },
    { 
      title: "Revenue Cycle Management", 
      icon: <HiOutlineChartBar />, 
      impact: "+35%", 
      label: "Monthly Revenue", 
      details: ["A/R Optimization", "Denial Analytics", "Leakage Audits", "Fee Analysis", "Cash Flow Sync", "Contract Loads"] 
    },
    { 
      title: "HIPAA & Cyber Security", 
      icon: <HiOutlineShieldCheck />, 
      impact: "Zero", 
      label: "Breach History", 
      details: ["AES-256 Encryption", "Bi-Annual SRA", "MFA Protocols", "Audit Trails", "Cloud Backups", "Staff Training"] 
    },
    { 
      title: "Billing Optimization", 
      icon: <HiOutlineDesktopComputer />, 
      impact: "2.4x", 
      label: "Workflow Speed", 
      details: ["Auto-Post ERA", "EHR Syncing", "API Integration", "Batch Processing", "Smart Queues", "Staff KPIs"] 
    },
    { 
      title: "Certified Coders", 
      icon: <HiOutlineUserCircle />, 
      impact: "96%", 
      label: "First-Pass Rate", 
      details: ["AAPC Certified", "AHIMA Experts", "CMS Compliance", "HCC Coding", "Modifier Logic", "Peer Reviews"] 
    },
    { 
      title: "EHR Integration", 
      icon: <HiOutlineFolderAdd />, 
      impact: "Real-time", 
      label: "Data Sync", 
      details: ["HL7 Standards", "FHIR API", "Athena Bridge", "Epic Interop", "ECW Syncing", "Patient Portal"] 
    },
    { 
      title: "Medical Claims Processing", 
      icon: <HiOutlineClipboardCheck />, 
      impact: "24hr", 
      label: "Turnaround", 
      details: ["Daily Submissions", "Instant Edits", "Payer Scrapes", "COB Handling", "Attachment Ops", "Tracking ID"] 
    },
    { 
      title: "Denial Management", 
      icon: <HiOutlineXCircle />, 
      impact: "74%", 
      label: "Recovery Rate", 
      details: ["Level 1 Appeals", "Root Cause IDs", "Payer Disputes", "Lost Revenue Tracking", "Code Correction", "Clinical Notes"] 
    }
  ];

  return (
    <section className="service-detail-section">
      <style>{`
        @keyframes gradientShift { 0% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } 100% { background-position: 0% 50%; } }
        .service-detail-section {
          background: linear-gradient(-45deg, #256883, #1e676b, #225466, #224380);
          background-size: 400% 400%; animation: gradientShift 15s ease infinite;
          min-height: 100vh; padding: 60px 0; display: flex; align-items: center; color: white;
        }
        .glass-panel {
          background: rgba(255, 255, 255, 0.08); backdrop-filter: blur(40px) saturate(180%);
          border-radius: 40px; border: 1px solid rgba(255, 255, 255, 0.25);
          box-shadow: 0 40px 80px rgba(0, 0, 0, 0.4);
        }
        .micro-glass-card {
          background: rgba(255, 255, 255, 0.06);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 16px;
          padding: 12px;
          transition: all 0.3s ease;
        }
        .micro-glass-card:hover {
          background: rgba(255, 255, 255, 0.12);
          border-color: rgba(255, 255, 255, 0.3);
          transform: translateY(-3px);
        }
        .service-card {
          background: rgba(255, 255, 255, 0.04); border: 1px solid rgba(255, 255, 255, 0.1);
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1); cursor: pointer;
        }
        .service-card.active {
          background: rgba(255, 255, 255, 0.15); border: 1px solid rgba(255, 255, 255, 0.4);
          transform: translateX(12px) scale(1.02);
        }
        .graph-line { fill: none; stroke: #0dcaf0; stroke-width: 4; stroke-linecap: round; }
        .scroll-container::-webkit-scrollbar { display: none; }
      `}</style>

      <div className="container max-w-7xl mx-auto px-4">
        <div className="row g-5">
          {/* Detailed Visualization */}
          <div className="col-lg-7">
            <div className="glass-panel p-5 sticky-top" style={{ top: '40px' }}>
              <div key={selectedIndex} className="animate__animated animate__fadeIn">
                <div className="d-flex justify-content-between align-items-end mb-4">
                  <div>
                    <span className="text-info fw-bold tracking-widest small mb-1 d-block">REAL-TIME METRICS</span>
                    <h2 className="display-6 fw-bold text-white mb-0">{services[selectedIndex].title}</h2>
                  </div>
                  <div className="text-end">
                    <div className="h2 fw-bold text-info mb-0">{services[selectedIndex].impact}</div>
                    <div className="small text-white opacity-50 fw-bold">{services[selectedIndex].label}</div>
                  </div>
                </div>

                {/* Growth Graph Container */}
                
                <div className="bg-dark bg-opacity-20 rounded-4 p-4 border border-white border-opacity-10 mb-4 position-relative">
                  <svg viewBox="0 0 400 150" className="w-100">
                    <polyline
                      points={activePoints.map((p, i) => `${i * 57}, ${150 - p}`).join(' ')}
                      className="graph-line"
                      style={{ filter: 'drop-shadow(0 0 12px #0dcaf0)' }}
                    />
                    {activePoints.length > 0 && (
                      <circle cx={(activePoints.length - 1) * 57} cy={150 - activePoints[activePoints.length - 1]} r="6" fill="#0dcaf0" />
                    )}
                  </svg>
                  <div className="d-flex justify-content-between mt-3 opacity-30 small font-monospace">
                    <span>BASELINE</span>
                    <span>IMS OPTIMIZED</span>
                  </div>
                </div>

                {/* 6 Feature Points in Glass Micro-Cards */}
                <div className="row g-3">
                  {services[selectedIndex].details.map((item, i) => (
                    <div key={i} className="col-md-4 col-6">
                      <div className="micro-glass-card h-100 d-flex flex-column align-items-center justify-content-center text-center">
                        <HiCheckCircle className="text-info mb-2 fs-5" />
                        <span className="small text-white opacity-90 fw-bold lh-sm">{item}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Service Selector */}
          <div className="col-lg-5">
            <div className="mb-4 ps-3">
                <h2 className="display-5 fw-bold text-white">Service Ecosystem</h2>
                <p className="text-info opacity-75">Select a module to view impact</p>
            </div>
            <div className="scroll-container pe-2" style={{ maxHeight: '720px', overflowY: 'auto' }}>
              {services.map((service, index) => (
                <div
                  key={index}
                  onClick={() => setSelectedIndex(index)}
                  className={`service-card p-3 mb-3 rounded-4 ${selectedIndex === index ? 'active' : ''}`}
                >
                  <div className="d-flex align-items-center justify-content-between">
                    <div className="d-flex align-items-center gap-3">
                        <div className="p-2 rounded-3 bg-white bg-opacity-10 text-info fs-5">{service.icon}</div>
                        <h4 className="h6 fw-bold mb-0 text-white">{service.title}</h4>
                    </div>
                    {selectedIndex === index && <HiOutlineLightningBolt className="text-info animate-pulse" />}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSuite;