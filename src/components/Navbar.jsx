import { useState, useEffect } from 'react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Add scroll listener to change opacity on scroll
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`navbar navbar-expand-lg fixed-top transition-all duration-500 ${scrolled ? 'py-2' : 'py-4'}`}>
      <style>{`
        .navbar {
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .nav-glass {
          background: ${scrolled ? 'rgba(15, 23, 42, 0.8)' : 'rgba(255, 255, 255, 0.03)'};
          backdrop-filter: blur(15px);
          -webkit-backdrop-filter: blur(15px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 20px;
          margin: 0 20px;
          width: calc(100% - 40px);
        }

        .nav-link {
          color: rgba(255, 255, 255, 0.7) !important;
          font-weight: 500;
          letter-spacing: 0.5px;
          position: relative;
          transition: all 0.3s ease;
          padding: 0.5rem 1.2rem !important;
        }

        .nav-link:hover, .nav-link.active {
          color: #00ffcc !important;
        }

        .nav-link::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 50%;
          width: 0;
          height: 2px;
          background: #00ffcc;
          transition: all 0.3s ease;
          transform: translateX(-50%);
        }

        .nav-link:hover::after {
          width: 20px;
        }

        .brand-text {
          font-weight: 800;
          letter-spacing: -1px;
          background: linear-gradient(90deg, #fff, #00ffcc);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        @media (max-width: 991px) {
          .navbar-collapse {
            background: rgba(15, 23, 42, 0.95);
            border-radius: 15px;
            margin-top: 15px;
            padding: 20px;
            border: 1px solid rgba(255,255,255,0.1);
          }
        }
      `}</style>

      <div className="container-fluid nav-glass px-4 py-2">
        <a className="navbar-brand d-flex align-items-center" href="/">
          <img src="/images/logo.png" alt="IMS" height={40} className="me-2" />
          <span className="brand-text d-none d-lg-block">IMS</span>
        </a>

        <button className="navbar-toggler border-0 text-white" onClick={() => setIsOpen(!isOpen)}>
          <i className={`fas ${isOpen ? 'fa-times' : 'fa-bars'}`}></i>
        </button>

        <div className={`collapse navbar-collapse ${isOpen ? 'show' : ''}`}>
          <ul className="navbar-nav ms-auto">
            {['About', 'Services', 'Careers', 'Contact', 'Patient Support', 'Blog'].map((item) => (
              <li className="nav-item" key={item}>
                <a className="nav-link" href={`/${item.toLowerCase().replace(' ', '-')}`}>
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
};
export default Navbar