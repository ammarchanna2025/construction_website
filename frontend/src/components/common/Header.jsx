import { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { path: '/', label: 'Home', icon: 'bi-house' },
    { path: '/about', label: 'About Us', icon: 'bi-people' },
    { path: '/services', label: 'Services', icon: 'bi-tools' },
    { path: '/projects', label: 'Projects', icon: 'bi-building' },
    { path: '/blogs', label: 'Blog', icon: 'bi-newspaper' },
    { path: '/contact-us', label: 'Contact', icon: 'bi-envelope' }
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <header className={`modern-header ${isScrolled ? 'scrolled' : ''}`}>
      <nav className="navbar navbar-expand-lg">
        <div className="container">
          {/* Brand Logo */}
          <Link to="/" className="navbar-brand">
            <div className="brand-container">
              <div className="brand-icon">
                <i className="bi bi-building-gear"></i>
              </div>
              <div className="brand-text">
                <span className="brand-name">ARC</span>
                <span className="brand-subtitle">Construction</span>
              </div>
            </div>
          </Link>

          {/* Mobile Menu Toggle */}
          <button
            className={`mobile-toggle ${isMobileMenuOpen ? 'active' : ''}`}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle navigation"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>

          {/* Navigation Menu */}
          <div className={`navbar-collapse ${isMobileMenuOpen ? 'show' : ''}`}>
            <ul className="navbar-nav ms-auto">
              {navItems.map((item, index) => (
                <li key={index} className="nav-item">
                  <Link
                    to={item.path}
                    className={`nav-link ${isActive(item.path) ? 'active' : ''}`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <i className={`${item.icon} me-2 d-lg-none`}></i>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>

            {/* CTA Button */}
            <div className="header-cta ms-lg-3">
              <Link to="/contact-us" className="btn btn-primary">
                <i className="bi bi-telephone me-2"></i>
                Get Quote
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <style>{`
        .modern-header {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 1030;
          background: rgba(44, 62, 80, 0.95);
          backdrop-filter: blur(10px);
          transition: all 0.3s ease;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        }

        .modern-header.scrolled {
          background: rgba(44, 62, 80, 0.98);
          box-shadow: 0 2px 20px rgba(0, 0, 0, 0.3);
        }

        .navbar {
          padding: 1rem 0;
          transition: all 0.3s ease;
        }

        .scrolled .navbar {
          padding: 0.5rem 0;
        }

        .brand-container {
          display: flex;
          align-items: center;
          text-decoration: none;
          color: inherit;
        }

        .brand-icon {
          width: 50px;
          height: 50px;
          background: linear-gradient(135deg, #2c5aa0 0%, #4a7bc8 100%);
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-right: 12px;
          transition: all 0.3s ease;
        }

        .brand-icon i {
          font-size: 1.5rem;
          color: white;
        }

        .brand-text {
          display: flex;
          flex-direction: column;
        }

        .brand-name {
          font-size: 1.5rem;
          font-weight: 800;
          color: #ffffff;
          line-height: 1;
          letter-spacing: -0.5px;
        }

        .brand-subtitle {
          font-size: 0.9rem;
          color: #ecf0f1;
          font-weight: 500;
          line-height: 1;
        }

        .navbar-brand:hover .brand-icon {
          transform: scale(1.05);
          box-shadow: 0 4px 15px rgba(44, 90, 160, 0.3);
        }

        .mobile-toggle {
          display: none;
          flex-direction: column;
          background: none;
          border: none;
          width: 30px;
          height: 30px;
          cursor: pointer;
          padding: 0;
          position: relative;
        }

        .mobile-toggle span {
          display: block;
          height: 3px;
          width: 100%;
          background: #ffffff;
          margin: 3px 0;
          transition: all 0.3s ease;
          border-radius: 2px;
        }

        .mobile-toggle.active span:nth-child(1) {
          transform: rotate(45deg) translate(6px, 6px);
        }

        .mobile-toggle.active span:nth-child(2) {
          opacity: 0;
        }

        .mobile-toggle.active span:nth-child(3) {
          transform: rotate(-45deg) translate(6px, -6px);
        }

        .navbar-nav {
          align-items: center;
        }

        .nav-link {
          font-weight: 500;
          color: #ecf0f1 !important;
          padding: 0.75rem 1.25rem !important;
          border-radius: 8px;
          transition: all 0.3s ease;
          position: relative;
          text-decoration: none;
        }

        .nav-link:hover {
          color: #ffffff !important;
          background: rgba(255, 255, 255, 0.1);
        }

        .nav-link.active {
          color: #ffffff !important;
          background: rgba(255, 255, 255, 0.15);
        }

        .nav-link.active::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 50%;
          transform: translateX(-50%);
          width: 20px;
          height: 3px;
          background: #3498db;
          border-radius: 2px;
        }

        .btn-primary {
          background: linear-gradient(135deg, #3498db 0%, #2980b9 100%);
          border: none;
          padding: 0.75rem 1.5rem;
          border-radius: 8px;
          font-weight: 600;
          transition: all 0.3s ease;
          text-decoration: none;
          color: white;
        }

        .btn-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 15px rgba(52, 152, 219, 0.4);
          color: white;
        }

        @media (max-width: 991px) {
          .mobile-toggle {
            display: flex;
          }

          .navbar-collapse {
            position: absolute;
            top: 100%;
            left: 0;
            right: 0;
            background: rgba(44, 62, 80, 0.98);
            border-radius: 0 0 15px 15px;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
            padding: 1rem;
            transform: translateY(-10px);
            opacity: 0;
            visibility: hidden;
            transition: all 0.3s ease;
          }

          .navbar-collapse.show {
            transform: translateY(0);
            opacity: 1;
            visibility: visible;
          }

          .navbar-nav {
            flex-direction: column;
            align-items: stretch;
          }

          .nav-link {
            padding: 1rem !important;
            border-bottom: 1px solid rgba(255, 255, 255, 0.1);
          }

          .nav-link:last-child {
            border-bottom: none;
          }

          .header-cta {
            margin-top: 1rem;
            text-align: center;
          }

          .btn-primary {
            width: 100%;
          }
        }

        @media (max-width: 576px) {
          .brand-name {
            font-size: 1.25rem;
          }

          .brand-subtitle {
            font-size: 0.8rem;
          }

          .brand-icon {
            width: 40px;
            height: 40px;
          }

          .brand-icon i {
            font-size: 1.25rem;
          }
        }
      `}</style>
    </header>
  );
};

export default Header;
