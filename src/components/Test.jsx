import React, { useState, useEffect } from 'react';
import { 
  HiOutlineTrendingUp, HiOutlineShieldCheck, HiOutlineLightningBolt, 
  HiOutlineCalculator, HiOutlineSearchCircle, HiOutlineDocumentReport,
  HiOutlineArrowCircleUp, HiOutlineUserGroup, HiOutlinePresentationChartLine,
  HiOutlineOfficeBuilding
} from 'react-icons/hi';

const ServicesSuite = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [activePoints, setActivePoints] = useState({ baseline: [], ims: [] });
  const [practiceRevenue, setPracticeRevenue] = useState(250000); 

  const revenueMetrics = [
    { 
      title: "Orthopedic Revenue Lift", 
      icon: <HiOutlineTrendingUp />, 
      impact: "+37.5%", 
      label: "Surgical & Implant Recovery", 
      captureRate: 0.375, // Unique multiplier for Ortho
      pointsBaseline: [40, 42, 40, 41, 40, 42, 41, 41],
      pointsIms: [40, 55, 70, 88, 105, 120, 138, 150] 
    },
    { 
      title: "PT Reimbursement Velocity", 
      icon: <HiOutlinePresentationChartLine />, 
      impact: "+23%", 
      label: "8-Minute Rule Optimization", 
      captureRate: 0.23, // Unique multiplier for PT
      pointsBaseline: [50, 52, 51, 53, 52, 53, 52, 52],
      pointsIms: [50, 62, 75, 85, 95, 105, 115, 125]
    },
    { 
      title: "Surgical Center Yield", 
      icon: <HiOutlineOfficeBuilding />, 
      impact: "+27.4%", 
      label: "ASC Facility Fee Maxima", 
      captureRate: 0.274, // Unique multiplier for ASC
      pointsBaseline: [35, 37, 36, 38, 37, 39, 38, 38],
      pointsIms: [35, 50, 65, 85, 110, 130, 145, 160]
    },
    { 
      title: "Denial Recovery Engine", 
      icon: <HiOutlineShieldCheck />, 
      impact: "98.2%", 
      label: "Net Collection Ratio", 
      captureRate: 0.15, // Recovery of lost 15% denial avg
      pointsBaseline: [70, 72, 68, 70, 71, 69, 70, 71],
      pointsIms: [70, 82, 92, 96, 98, 98, 98, 99]
    },
    { 
      title: "Leakage & Underpayment", 
      icon: <HiOutlineSearchCircle />, 
      impact: "+$14k/mo", 
      label: "Contract Variance Recovery", 
      captureRate: 0.09, // Based on industry avg 9% leakage
      pointsBaseline: [30, 32, 28, 30, 29, 31, 30, 30],
      pointsIms: [30, 45, 60, 75, 85, 95, 105, 115]
    },
    { 
      title: "Cash Flow Velocity", 
      icon: <HiOutlineLightningBolt />, 
      impact: "-62%", 
      label: "Days in A/R", 
      captureRate: 0.12, // Cash flow efficiency value
      pointsBaseline: [95, 92, 98, 94, 96, 95, 97, 96],
      pointsIms: [95, 75, 60, 45, 35, 28, 24, 22] 
    }
  ];

  useEffect(() => {
    setActivePoints({ baseline: [], ims: [] });
    let current = 0;
    const interval = setInterval(() => {
      if (current < 8) {
        setActivePoints(prev => ({
          baseline: [...prev.baseline, revenueMetrics[selectedIndex].pointsBaseline[current]],
          ims: [...prev.ims, revenueMetrics[selectedIndex].pointsIms[current]]
        }));
        current++;
      } else {
        clearInterval(interval);
      }
    }, 40); 
    return () => clearInterval(interval);
  }, [selectedIndex]);

  return (
    <section className="revenue-optimization-suite py-5" style={{ background: '#0f172a', minHeight: '100vh' }}>
      <style>{`
        .glass-card { background: rgba(30, 41, 59, 0.7); backdrop-filter: blur(20px); border: 1px solid rgba(255,255,255,0.1); border-radius: 32px; }
        .sidebar-card { background: rgba(0, 255, 204, 0.08); transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1); cursor: pointer; border: 1px solid #e2e8f0; }
        .sidebar-card:hover { transform: translateX(8px); background: #ffffff; color: black; }
        .sidebar-card.active { background: rgba(0, 255, 204, 0.08); border: 2px solid #00ffcc; }
        .graph-ims { fill: none; stroke: #00ffcc; stroke-width: 5; filter: drop-shadow(0 0 10px rgba(0,255,204,0.4)); }
        .graph-baseline { fill: none; stroke: rgba(255,255,255,0.2); stroke-width: 2; stroke-dasharray: 6; }
        .calculator-box { background: rgba(2, 6, 23, 0.4); border-radius: 24px; padding: 30px; border: 1px solid rgba(0,255,204,0.3); }
        .sidebar-container { maxHeight: 800px; overflowY: auto; paddingRight: 10px; }
        .sidebar-container::-webkit-scrollbar { width: 4px; }
        .sidebar-container::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 10px; }
      `}</style>

      <div className="container py-4">
        <div className="row g-5">
          <div className="col-lg-7">
            <div className="glass-card p-5 sticky-top" style={{ top: '20px' }}>
              <div key={selectedIndex} className="animate__animated animate__fadeIn">
                <div className="d-flex justify-content-between align-items-start mb-5">
                  <div>
                    <span className="badge bg-info bg-opacity-20 text-white px-3 py-2 mb-2 fw-bold tracking-wider">IMS REVENUE OPTIMIZATION</span>
                    <h2 className="display-5 fw-bold text-white mb-1">{revenueMetrics[selectedIndex].title}</h2>
                    <p className="text-white-50 fs-5">{revenueMetrics[selectedIndex].label}</p>
                  </div>
                  <div className="text-end">
                    <div className="h1 fw-bold mb-0" style={{ color: '#00ffcc' }}>{revenueMetrics[selectedIndex].impact}</div>
                    <div className="small text-white-50 fw-bold">TOTAL GAIN</div>
                  </div>
                </div>

                <div className="mb-5 p-4 rounded-4" style={{ background: 'rgba(2, 6, 23, 0.4)' }}>
                  <div className="d-flex justify-content-between mb-4 small fw-bold text-white-50">
                    <span>180-DAY PERFORMANCE TRACKING</span>
                    <div className="d-flex gap-4">
                        <span><span className="text-info">●</span> IMS PLATFORM</span>
                        <span><span className="text-white-50">○</span> INDUSTRY AVG</span>
                    </div>
                  </div>
                  <svg viewBox="0 0 400 150" className="w-100" style={{ height: '220px' }}>
                    <polyline points={activePoints.baseline.map((p, i) => `${i * 57}, ${150 - p}`).join(' ')} className="graph-baseline" />
                    <polyline points={activePoints.ims.map((p, i) => `${i * 57}, ${150 - p}`).join(' ')} className="graph-ims" />
                  </svg>
                </div>

                {/* DYNAMIC LOGIC APPLIED HERE */}
                <div className="calculator-box">
                  <div className="row align-items-center">
                    <div className="col-md-5">
                      <label className="small text-info fw-bold mb-2">MONTHLY COLLECTIONS</label>
                      <div className="d-flex align-items-center">
                        <span className="h2 text-white-50 me-2">$</span>
                        <input type="number" className="bg-transparent border-0 h1 text-white fw-bold w-100 outline-none" 
                          value={practiceRevenue} onChange={(e) => setPracticeRevenue(e.target.value)} />
                      </div>
                    </div>
                    <div className="col-md-7 border-start border-white border-opacity-10 ps-md-5">
                      <div className="small text-white-50 fw-bold mb-1">
                        EST. ANNUAL {revenueMetrics[selectedIndex].title.toUpperCase()}
                      </div>
                      <div className="display-5 fw-bold" style={{color: "#00ff00"}}>
                        +${ (practiceRevenue * revenueMetrics[selectedIndex].captureRate * 12).toLocaleString(undefined, {maximumFractionDigits: 0}) }
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-5">
            <div className="ps-lg-3 sidebar-container">
              <h3 className="text-white mb-4 fw-bold d-flex align-items-center gap-2">
                <HiOutlineUserGroup className="text-info" /> Solution Modules
              </h3>
              
              {revenueMetrics.map((m, i) => (
                <div 
                  key={i} 
                  onClick={() => setSelectedIndex(i)} 
                  className={`sidebar-card p-4 mb-3 rounded-4 shadow-sm ${selectedIndex === i ? 'active' : ''}`}
                >
                  <div className="d-flex align-items-center gap-3">
                    <div className="p-3 rounded-3 fs-3 text-slate-400" style={{background: 'rgba(0,0,0,0.05)'}}>
                      {m.icon}
                    </div>
                    <div className="flex-grow-1">
                      <h4 className="h6 fw-bold mb-0 text-slate-700">{m.title}</h4>
                      <div className="small fw-bold text-info">{m.impact} Capture</div>
                    </div>
                    {selectedIndex === i && <HiOutlineArrowCircleUp className="fs-4 text-info animate-bounce" />}
                  </div>
                </div>
              ))}
              
              <div className="mt-5 p-4 rounded-4" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)' }}>
                <h5 className="text-white fw-bold mb-3 d-flex align-items-center gap-2 font-bold">
                   <HiOutlineDocumentReport className="text-info" /> Specialty Audit Guarantee
                </h5>
                <p className="small text-white opacity-60 leading-relaxed">
                  Ortho and PT clinics often lose up to <strong>22%</strong> of revenue to "silent leakage" in the 8-minute rule and implant billing. Our retrospective audit identifies these gaps in 72 hours.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSuite;