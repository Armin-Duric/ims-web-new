import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  HiOutlineTrendingUp, HiOutlineUsers, HiOutlineClock, 
  HiOutlineGlobeAlt, HiOutlineLockClosed, HiOutlineDownload, 
  HiOutlineDocumentText 
} from 'react-icons/hi';

const AnalyticsDashboard = () => {
  const [isAdmin, setIsAdmin] = useState(localStorage.getItem('isAdmin') === 'true');
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState(null);
  const navigate = useNavigate();



useEffect(() => {
  // Re-check auth on mount
  const authStatus = localStorage.getItem('isAdmin') === 'true';
  setIsAdmin(authStatus);

  if (!authStatus && window.location.pathname === '/analytics') {
    navigate('/blog');
    return;
  }

  const fetchRealData = async () => {
    try {
      const response = await fetch('/api/stats');
      
      if (!response.ok) {
          // Log the actual text from the server to see what's wrong
          const errorText = await response.text();
          console.error(`Server returned ${response.status}: ${errorText}`);
          throw new Error(`Server error: ${response.status}`);
      }
      
      const data = await response.json();
      setStats(data);
    } catch (err) {
      console.error("Dashboard error detail:", err.message); // Use .message
    } finally {
      setLoading(false);
    }
  };

    if (authStatus) fetchRealData();
    else setLoading(false);
  }, [navigate]);

  if (!isAdmin) return null;

  // Map your API data to the UI
  const kpiData = [
    { label: 'TOTAL VIEWS', val: stats?.views || '0', change: stats?.viewsChange || '+0%', icon: <HiOutlineTrendingUp />, class: 'bg-teal-soft' },
    { label: 'UNIQUE VISITORS', val: stats?.visitors || '0', change: stats?.visitorsChange || '+0%', icon: <HiOutlineUsers />, class: 'bg-blue-soft' },
    { label: 'AVG. SESSION', val: stats?.avgSession || '0s', change: stats?.bounceRate || '0%', icon: <HiOutlineClock />, class: 'bg-gold-soft' },
    { label: 'TOP REGION', val: stats?.topRegion || 'N/A', change: 'Live', icon: <HiOutlineGlobeAlt />, class: 'bg-purple-soft' }
  ];

  return (
    <div className="analytics-page-wrapper">
      <style>{`
        .analytics-page-wrapper { background: #faf9f6; min-height: 100vh; padding: 140px 0 100px; color: #334155; font-family: 'Plus Jakarta Sans', sans-serif; }
        .stat-card { background: white; border: 1px solid #e2e8f0; border-radius: 30px; padding: 30px; box-shadow: 0 4px 20px rgba(0,0,0,0.02); }
        .icon-box { width: 50px; height: 50px; border-radius: 15px; display: flex; align-items: center; justify-content: center; font-size: 1.5rem; margin-bottom: 20px; }
        .bg-teal-soft { background: #f0fdfa; color: #0d9488; }
        .bg-blue-soft { background: #eff6ff; color: #3b82f6; }
        .bg-gold-soft { background: #fffbeb; color: #d97706; }
        .bg-purple-soft { background: #faf5ff; color: #9333ea; }
      `}</style>

      <div className="container">
        <div className="mb-5">
           <span className="badge rounded-pill px-3 py-2 mb-3" style={{background: '#f0fdfa', color: '#0d9488', border: '1px solid #ccfbf1'}}>
              <HiOutlineLockClosed className="me-1" /> ADMIN SECURE AREA
           </span>
           <h1 className="display-5 fw-bold">System <span style={{color: '#0d9488'}}>Performance</span></h1>
        </div>

        {loading ? (
          <div className="text-center py-5"><div className="spinner-border text-teal" style={{color: '#0d9488'}}></div></div>
        ) : (
          <div className="row g-4 mb-5">
            {kpiData.map((stat, i) => (
              <div key={i} className="col-md-3">
                <div className="stat-card">
                  <div className={`icon-box ${stat.class}`}>{stat.icon}</div>
                  <p className="small fw-bold text-muted mb-1">{stat.label}</p>
                  <h2 className="fw-bold">{stat.val}</h2>
                  <span className="small fw-bold text-success">{stat.change}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AnalyticsDashboard;