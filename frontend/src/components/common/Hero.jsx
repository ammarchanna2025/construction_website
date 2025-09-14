
const Hero = ({
  preHeading,
  heading,
  text,
  showButtons = false,
  primaryButton = { text: 'Get Started', href: '/contact-us' },
  secondaryButton = { text: 'Learn More', href: '/about' },
  backgroundImage = null,
  overlay = true,
  height = 'medium' // small, medium, large, full
}) => {

  const heightClasses = {
    small: 'hero-sm',
    medium: 'hero-md',
    large: 'hero-lg',
    full: 'hero-full'
  };

  return (
    <section
      className={`modern-hero ${heightClasses[height]} ${backgroundImage ? 'has-background' : ''}`}
      style={{
        '--hero-text-color': backgroundImage ? '#ffffff' : '#2c3e50',
        '--hero-description-color': backgroundImage ? 'rgba(255,255,255,0.9)' : '#6c757d',
        '--hero-border-color': backgroundImage ? 'rgba(255,255,255,0.8)' : '#2c5aa0'
      }}
    >
      {backgroundImage && (
        <div
          className="hero-background"
          style={{ backgroundImage: `url(${backgroundImage})` }}
        />
      )}
      {overlay && backgroundImage && <div className="hero-overlay" />}

      <div className="hero-content">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8 text-center">
              {preHeading && (
                <span className="hero-pre-heading animate-fade-in">
                  {preHeading}
                </span>
              )}

              <h1 className="hero-heading animate-slide-up">
                {heading}
              </h1>

              {text && (
                <p className="hero-text animate-slide-up">
                  {text}
                </p>
              )}

              {showButtons && (
                <div className="hero-buttons animate-fade-in">
                  <a href={primaryButton.href} className="btn btn-primary btn-lg me-3">
                    {primaryButton.text}
                    <i className="bi bi-arrow-right ms-2"></i>
                  </a>
                  <a href={secondaryButton.href} className="btn btn-outline btn-lg">
                    {secondaryButton.text}
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .modern-hero {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #ffffff;
          overflow: hidden;
          margin-top: 80px; /* Account for fixed header */
        }

        .hero-sm { min-height: 300px; }
        .hero-md { min-height: 500px; }
        .hero-lg { min-height: 700px; }
        .hero-full { min-height: 100vh; }

        .hero-background {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
          z-index: 1;
        }

        .hero-overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(135deg, rgba(44, 90, 160, 0.8) 0%, rgba(74, 123, 200, 0.6) 100%);
          z-index: 2;
        }

        .hero-content {
          position: relative;
          z-index: 3;
          width: 100%;
          padding: 4rem 0;
        }

        .hero-pre-heading {
          display: inline-block;
          background: rgba(44, 90, 160, 0.1);
          color: var(--hero-text-color);
          padding: 0.5rem 1.5rem;
          border-radius: 50px;
          font-size: 0.9rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 1px;
          margin-bottom: 1.5rem;
          border: 1px solid rgba(44, 90, 160, 0.2);
        }

        .has-background .hero-pre-heading {
          background: rgba(255, 255, 255, 0.2);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.3);
        }

        .hero-heading {
          font-size: 3.5rem;
          font-weight: 800;
          color: var(--hero-text-color);
          line-height: 1.2;
          margin-bottom: 1.5rem;
        }

        .has-background .hero-heading {
          text-shadow: 0 2px 4px rgba(0,0,0,0.3);
        }

        .hero-text {
          font-size: 1.25rem;
          color: var(--hero-description-color);
          line-height: 1.6;
          margin-bottom: 2.5rem;
        }

        .has-background .hero-text {
          text-shadow: 0 1px 2px rgba(0,0,0,0.3);
        }

        .hero-buttons {
          display: flex;
          gap: 1rem;
          justify-content: center;
          flex-wrap: wrap;
        }

        .btn-lg {
          padding: 1rem 2rem;
          font-size: 1.1rem;
          font-weight: 600;
          border-radius: 50px;
          transition: all 0.3s ease;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
        }

        .btn-primary {
          background: linear-gradient(135deg, #2c5aa0 0%, #4a7bc8 100%);
          border: none;
          color: white;
          box-shadow: 0 4px 15px rgba(44, 90, 160, 0.3);
        }

        .btn-primary:hover {
          transform: translateY(-3px);
          box-shadow: 0 6px 20px rgba(44, 90, 160, 0.4);
          color: white;
        }

        .btn-outline {
          background: transparent;
          border: 2px solid var(--hero-border-color);
          color: var(--hero-text-color);
          backdrop-filter: blur(10px);
        }

        .btn-outline:hover {
          background: #2c5aa0;
          color: #ffffff;
          transform: translateY(-3px);
          box-shadow: 0 6px 20px rgba(44, 90, 160, 0.3);
        }

        .has-background .btn-outline {
          border-color: rgba(255,255,255,0.8);
          color: #ffffff;
        }

        .has-background .btn-outline:hover {
          background: rgba(255,255,255,0.2);
          color: #ffffff;
        }

        .animate-fade-in {
          animation: fadeIn 1s ease-out;
        }

        .animate-slide-up {
          animation: slideUp 1s ease-out;
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes slideUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @media (max-width: 768px) {
          .hero-heading {
            font-size: 2.5rem;
          }

          .hero-text {
            font-size: 1.1rem;
          }

          .hero-buttons {
            flex-direction: column;
            align-items: center;
          }

          .btn-lg {
            width: 100%;
            max-width: 300px;
            justify-content: center;
          }

          .hero-content {
            padding: 2rem 0;
          }
        }

        @media (max-width: 576px) {
          .hero-heading {
            font-size: 2rem;
          }

          .hero-text {
            font-size: 1rem;
          }

          .hero-pre-heading {
            font-size: 0.8rem;
            padding: 0.4rem 1rem;
          }
        }
      `}</style>
    </section>
  );
};

export default Hero;