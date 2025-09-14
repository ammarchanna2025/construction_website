
const Footer = () => {
  const currentYear = new Date().getFullYear();

  const serviceLinks = [
    { name: "Residential Construction", href: "/services" },
    { name: "Commercial Building", href: "/services" },
    { name: "Industrial Construction", href: "/services" },
    { name: "Renovation Services", href: "/services" },
    { name: "Interior Design", href: "/services" },
    { name: "Project Management", href: "/services" }
  ];

  const quickLinks = [
    { name: "About Us", href: "/about" },
    { name: "Our Services", href: "/services" },
    { name: "Portfolio", href: "/projects" },
    { name: "Latest News", href: "/blogs" },
    { name: "Contact Us", href: "/contact-us" },
    { name: "Get Quote", href: "/contact-us" }
  ];

  const socialLinks = [
    { name: "Facebook", icon: "bi-facebook", href: "#" },
    { name: "Twitter", icon: "bi-twitter", href: "#" },
    { name: "LinkedIn", icon: "bi-linkedin", href: "#" },
    { name: "Instagram", icon: "bi-instagram", href: "#" },
    { name: "YouTube", icon: "bi-youtube", href: "#" }
  ];

  return (
    <footer className="modern-footer">
      {/* Main Footer Content */}
      <div className="footer-main">
        <div className="container">
          <div className="row">
            {/* Company Info */}
            <div className="col-lg-4 col-md-6 mb-4">
              <div className="footer-section">
                <div className="footer-brand">
                  <div className="brand-icon">
                    <i className="bi bi-building-gear"></i>
                  </div>
                  <div className="brand-text">
                    <h3>ARC Construction</h3>
                    <p className="brand-tagline">Building Dreams, Creating Reality</p>
                  </div>
                </div>
                <p className="footer-description">
                  With over a decade of experience, ARC Construction delivers exceptional
                  construction services with unmatched quality, integrity, and value.
                  We transform visions into reality through outstanding craftsmanship.
                </p>
                <div className="social-links">
                  {socialLinks.map((social, index) => (
                    <a key={index} href={social.href} className="social-link" title={social.name}>
                      <i className={social.icon}></i>
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Services */}
            <div className="col-lg-2 col-md-6 mb-4">
              <div className="footer-section">
                <h4 className="footer-title">Our Services</h4>
                <ul className="footer-links">
                  {serviceLinks.map((link, index) => (
                    <li key={index}>
                      <a href={link.href}>
                        <i className="bi bi-chevron-right"></i>
                        {link.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Quick Links */}
            <div className="col-lg-2 col-md-6 mb-4">
              <div className="footer-section">
                <h4 className="footer-title">Quick Links</h4>
                <ul className="footer-links">
                  {quickLinks.map((link, index) => (
                    <li key={index}>
                      <a href={link.href}>
                        <i className="bi bi-chevron-right"></i>
                        {link.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Contact Info */}
            <div className="col-lg-4 col-md-6 mb-4">
              <div className="footer-section">
                <h4 className="footer-title">Get In Touch</h4>
                <div className="contact-info">
                  <div className="contact-item">
                    <div className="contact-icon">
                      <i className="bi bi-geo-alt"></i>
                    </div>
                    <div className="contact-details">
                      <h5>Address</h5>
                      <p>Gulshan-e-Iqbal Block-11<br />Karachi, Sindh, Pakistan</p>
                    </div>
                  </div>
                  <div className="contact-item">
                    <div className="contact-icon">
                      <i className="bi bi-telephone"></i>
                    </div>
                    <div className="contact-details">
                      <h5>Phone</h5>
                      <p>+92 21 000 000 111</p>
                    </div>
                  </div>
                  <div className="contact-item">
                    <div className="contact-icon">
                      <i className="bi bi-envelope"></i>
                    </div>
                    <div className="contact-details">
                      <h5>Email</h5>
                      <p>info@arcconstruction.com</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="footer-bottom">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-6">
              <p className="copyright">
                © {currentYear} ARC Construction. All rights reserved.
              </p>
            </div>
            <div className="col-md-6">
              <div className="footer-bottom-links">
                <a href="/privacy">Privacy Policy</a>
                <a href="/terms">Terms of Service</a>
                <a href="/sitemap">Sitemap</a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .modern-footer {
          background: linear-gradient(135deg, #1a1a1a 0%, #2c2c2c 100%);
          color: #ffffff;
          margin-top: auto;
        }

        .footer-main {
          padding: 4rem 0 2rem;
        }

        .footer-section {
          height: 100%;
        }

        .footer-brand {
          display: flex;
          align-items: center;
          margin-bottom: 1.5rem;
        }

        .brand-icon {
          width: 60px;
          height: 60px;
          background: linear-gradient(135deg, #2c5aa0 0%, #4a7bc8 100%);
          border-radius: 15px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-right: 1rem;
        }

        .brand-icon i {
          font-size: 1.8rem;
          color: white;
        }

        .brand-text h3 {
          color: #ffffff;
          font-size: 1.5rem;
          font-weight: 700;
          margin: 0;
          line-height: 1.2;
        }

        .brand-tagline {
          color: #b0b0b0;
          font-size: 0.9rem;
          margin: 0;
          font-style: italic;
        }

        .footer-description {
          color: #b0b0b0;
          line-height: 1.6;
          margin-bottom: 2rem;
        }

        .social-links {
          display: flex;
          gap: 1rem;
        }

        .social-link {
          width: 45px;
          height: 45px;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #ffffff;
          text-decoration: none;
          transition: all 0.3s ease;
          backdrop-filter: blur(10px);
        }

        .social-link:hover {
          background: linear-gradient(135deg, #2c5aa0 0%, #4a7bc8 100%);
          transform: translateY(-3px);
          box-shadow: 0 5px 15px rgba(44, 90, 160, 0.4);
          color: #ffffff;
        }

        .social-link i {
          font-size: 1.2rem;
        }

        .footer-title {
          color: #ffffff;
          font-size: 1.2rem;
          font-weight: 600;
          margin-bottom: 1.5rem;
          position: relative;
          padding-bottom: 0.5rem;
        }

        .footer-title::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 40px;
          height: 3px;
          background: linear-gradient(135deg, #2c5aa0 0%, #4a7bc8 100%);
          border-radius: 2px;
        }

        .footer-links {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .footer-links li {
          margin-bottom: 0.75rem;
        }

        .footer-links a {
          color: #b0b0b0;
          text-decoration: none;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          font-size: 0.95rem;
        }

        .footer-links a:hover {
          color: #4a7bc8;
          transform: translateX(5px);
        }

        .footer-links a i {
          font-size: 0.8rem;
          margin-right: 0.5rem;
          transition: all 0.3s ease;
        }

        .footer-links a:hover i {
          color: #2c5aa0;
        }

        .contact-info {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .contact-item {
          display: flex;
          align-items: flex-start;
          gap: 1rem;
        }

        .contact-icon {
          width: 45px;
          height: 45px;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          backdrop-filter: blur(10px);
        }

        .contact-icon i {
          font-size: 1.2rem;
          color: #4a7bc8;
        }

        .contact-details h5 {
          color: #ffffff;
          font-size: 1rem;
          font-weight: 600;
          margin: 0 0 0.25rem 0;
        }

        .contact-details p {
          color: #b0b0b0;
          margin: 0;
          line-height: 1.5;
          font-size: 0.95rem;
        }

        .footer-bottom {
          background: rgba(0, 0, 0, 0.3);
          padding: 1.5rem 0;
          border-top: 1px solid rgba(255, 255, 255, 0.1);
        }

        .copyright {
          color: #b0b0b0;
          margin: 0;
          font-size: 0.9rem;
        }

        .footer-bottom-links {
          display: flex;
          justify-content: flex-end;
          gap: 2rem;
        }

        .footer-bottom-links a {
          color: #b0b0b0;
          text-decoration: none;
          font-size: 0.9rem;
          transition: all 0.3s ease;
        }

        .footer-bottom-links a:hover {
          color: #4a7bc8;
        }

        @media (max-width: 768px) {
          .footer-main {
            padding: 3rem 0 1.5rem;
          }

          .footer-brand {
            flex-direction: column;
            text-align: center;
            margin-bottom: 2rem;
          }

          .brand-icon {
            margin-right: 0;
            margin-bottom: 1rem;
          }

          .social-links {
            justify-content: center;
          }

          .contact-item {
            flex-direction: column;
            text-align: center;
            gap: 0.5rem;
          }

          .footer-bottom-links {
            justify-content: center;
            margin-top: 1rem;
            flex-wrap: wrap;
            gap: 1rem;
          }

          .copyright {
            text-align: center;
          }
        }

        @media (max-width: 576px) {
          .footer-bottom-links {
            flex-direction: column;
            align-items: center;
            gap: 0.5rem;
          }
        }
      `}</style>
    </footer>
  );
};

export default Footer;