import { useState, useEffect } from 'react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed-top transition-all duration-500 ${scrolled ? 'pt-3' : 'pt-4'}`}>
      <style>{`
        .nav-dock {
          transition: all 0.6s cubic-bezier(0.16, 1, 0.3, 1);
          background: ${scrolled ? 'rgba(15, 23, 42, 0.9)' : 'transparent'};
          backdrop-filter: ${scrolled ? 'blur(20px) saturate(180%)' : 'none'};
          border: 1px solid ${scrolled ? 'rgba(255, 255, 255, 0.1)' : 'transparent'};
          border-radius: ${scrolled ? '100px' : '0px'};
          padding: ${scrolled ? '10px 30px' : '10px 0'};
          width: ${scrolled ? '90%' : '100%'};
          max-width: 1200px;
          margin: 0 auto;
        }

        .nav-link {
          color: ${scrolled ? 'rgba(255, 255, 255, 0.8)' : '#0f172a'} !important;
          font-weight: 600;
          font-size: 0.9rem;
          letter-spacing: -0.01em;
          padding: 8px 18px !important;
          transition: all 0.3s ease;
          position: relative;
        }

        .nav-link:hover {
          color: #2563eb !important; /* Royal blue from Hero */
        }

        /* Cutting-edge Underline */
        .nav-link::before {
          content: '';
          position: absolute;
          bottom: 0;
          left: 50%;
          width: 0;
          height: 4px;
          background: #2563eb;
          border-radius: 10px;
          transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          transform: translateX(-50%);
          opacity: 0;
        }

        .nav-link:hover::before {
          width: 12px;
          opacity: 1;
          bottom: -4px;
        }

        /* Modern Magnetic CTA */
        .nav-cta {
          background: ${scrolled ? '#ffffff' : '#0f172a'};
          color: ${scrolled ? '#0f172a' : '#ffffff'} !important;
          padding: 10px 24px !important;
          border-radius: 100px;
          font-weight: 700;
          font-size: 0.85rem;
          margin-left: 15px;
          box-shadow: 0 10px 20px rgba(0,0,0,0.1);
          transition: all 0.3s ease;
        }

        .nav-cta:hover {
          transform: translateY(-2px);
          box-shadow: 0 15px 30px rgba(0,0,0,0.2);
          background: #2563eb;
          color: #fff !important;
        }

        .navbar-toggler {
          filter: ${scrolled ? 'invert(0)' : 'invert(1)'};
        }

        @media (max-width: 991px) {
          .nav-dock {
            width: 95%;
            border-radius: 25px;
            background: ${scrolled ? 'rgba(15, 23, 42, 0.95)' : 'rgba(255,255,255,0.98)'};
            padding: 15px 20px;
            border: 1px solid rgba(0,0,0,0.05);
          }
          .nav-link { color: #0f172a !important; }
          .scrolled .nav-link { color: #fff !important; }
        }
      `}</style>

      <div className={`nav-dock d-flex align-items-center justify-content-between ${scrolled ? 'scrolled' : ''}`}>
        <a className="d-flex align-items-center text-decoration-none" href="/">
          <img 
            src="/images/logo.png" 
            alt="IMS" 
            height={32} 
            style={{ 
              filter: !scrolled ? 'none' : 'brightness(0) invert(1)',
              transition: 'all 0.5s ease' 
            }} 
          />
        </a>

        {/* Desktop Menu */}
        <div className="d-none d-lg-flex align-items-center">
          <ul className="navbar-nav d-flex flex-row align-items-center">
            {['About', 'Services', 'Contact', 'Careers', 'Blog'].map((item) => (
              <li className="nav-item" key={item}>
                <a className="nav-link mx-1" href={`/${item.toLowerCase()}`}>
                  {item}
                </a>
              </li>
            ))}
            <li className="nav-item">
              <a className="nav-link mx-1" href="/patients">
                Patient Support
              </a>
            </li>
            <li>
              <a href="/contact" className="nav-cta text-decoration-none">
                Get Audit
              </a>
            </li>
          </ul>
        </div>

        {/* Mobile Toggle */}
        <button 
          className="d-lg-none border-0 bg-transparent" 
          onClick={() => setIsOpen(!isOpen)}
          style={{ color: scrolled ? '#fff' : '#0f172a' }}
        >
          <span style={{ fontSize: '1.5rem' }}>{isOpen ? '✕' : '☰'}</span>
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div className="d-lg-none position-fixed w-100 vh-100 bg-white p-5" style={{ top: 0, left: 0, zIndex: 999 }}>
          <button className="position-absolute border-0 bg-transparent" style={{ top: 30, right: 30, fontSize: '2rem' }} onClick={() => setIsOpen(false)}>✕</button>
          <ul className="list-unstyled">
            {['About', 'Services', 'Contact', 'Careers', 'Blog'].map((item) => (
              <li key={item} className="mb-4">
                <a className="h1 text-dark text-decoration-none fw-bold" href={`/${item.toLowerCase()}`} onClick={() => setIsOpen(false)}>
                  {item}
                </a>
              </li>
            ))}
            <li className="mb-4">
              <a className="h1 text-dark text-decoration-none fw-bold" href="/patients">
                Patient Support
              </a>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;