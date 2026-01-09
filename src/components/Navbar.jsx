import { useState } from 'react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="navbar navbar-expand-md nav-bg text-white shadow-lg fixed-top px-5">
      <div className="container-fluid px-4">
        {/* Logo and Text */}
        <a className="navbar-brand text-white neon-glow d-flex align-items-end" href="/">
          <img src="/images/logo.png" alt="IMS Logo" height={50} className="me-2" />
          <span className='d-none d-lg-flex'>Innovative Management Solutions</span>
        </a>

        {/* Hamburger Toggle */}
        <button
          className="navbar-toggler"
          type="button"
          onClick={toggleMenu}
          aria-controls="navbarNav"
          aria-expanded={isOpen}
          aria-label="Toggle navigation"
        >
          <i className={isOpen ? 'fas fa-times text-2xl text-light'  : 'fas fa-bars text-2xl text-light'}></i>
        </button>

        {/* Collapsible Menu */}
        <div className={`collapse navbar-collapse ${isOpen ? 'show' : ''}`} id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <a
                className="nav-link text-white neon-glow transition duration-300"
                href="/about"
                onClick={toggleMenu}
              >
                About
              </a>
            </li>
            <li className="nav-item">
              <a
                className="nav-link text-white neon-glow transition duration-300"
                href="/services"
                onClick={toggleMenu}
              >
                Services
              </a>
            </li>
            <li className="nav-item">
              <a
                className="nav-link text-white neon-glow transition duration-300"
                href="/careers"
                onClick={toggleMenu}
              >
                Careers
              </a>
            </li>
            <li className="nav-item">
              <a
                className="nav-link text-white neon-glow transition duration-300"
                href="/contact"
                onClick={toggleMenu}
              >
                Contact
              </a>
            </li>
            <li className="nav-item">
              <a
                className="nav-link text-white neon-glow transition duration-300"
                href="/patients"
                onClick={toggleMenu}
              >
                Patient Support
              </a>
            </li>
            <li className="nav-item">
              <a
                className="nav-link text-white neon-glow transition duration-300"
                href="/blog"
                onClick={toggleMenu}
              >
                Blog
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;