const Section = ({ 
  children, 
  title, 
  subtitle, 
  description,
  background = 'white', // white, light, dark, primary, gradient
  padding = 'large', // small, medium, large, none
  textAlign = 'center', // left, center, right
  className = '',
  id = null
}) => {
  
  const backgroundClasses = {
    white: 'bg-white',
    light: 'bg-light',
    dark: 'bg-dark',
    primary: 'bg-primary',
    gradient: 'bg-gradient'
  };

  const paddingClasses = {
    none: 'py-0',
    small: 'py-3',
    medium: 'py-5',
    large: 'py-6'
  };

  const textAlignClasses = {
    left: 'text-start',
    center: 'text-center',
    right: 'text-end'
  };

  return (
    <section
      id={id}
      className={`modern-section ${backgroundClasses[background]} ${paddingClasses[padding]} ${className}`}
      style={{
        '--section-text-color': background === 'dark' || background === 'primary' ? '#ffffff' : '#2c5aa0',
        '--section-subtitle-bg': background === 'dark' || background === 'primary' ? 'rgba(255, 255, 255, 0.2)' : 'rgba(44, 90, 160, 0.1)',
        '--section-subtitle-border': background === 'dark' || background === 'primary' ? 'rgba(255, 255, 255, 0.3)' : 'rgba(44, 90, 160, 0.2)',
        '--section-title-color': background === 'dark' || background === 'primary' ? '#ffffff' : '#2c5aa0',
        '--section-desc-color': background === 'dark' || background === 'primary' ? 'rgba(255, 255, 255, 0.9)' : '#6c757d'
      }}
    >
      <div className="container">
        {(title || subtitle || description) && (
          <div className={`section-header ${textAlignClasses[textAlign]} mb-5`}>
            {subtitle && (
              <span className="section-subtitle">
                {subtitle}
              </span>
            )}
            {title && (
              <h2 className="section-title">
                {title}
              </h2>
            )}
            {description && (
              <p className="section-description">
                {description}
              </p>
            )}
          </div>
        )}
        
        <div className="section-content">
          {children}
        </div>
      </div>

      <style>{`
        .modern-section {
          position: relative;
          overflow: hidden;
        }

        .bg-white {
          background-color: #ffffff;
          color: #343a40;
        }

        .bg-light {
          background-color: #f8f9fa;
          color: #343a40;
        }

        .bg-dark {
          background-color: #343a40;
          color: #ffffff;
        }

        .bg-primary {
          background: linear-gradient(135deg, #2c5aa0 0%, #4a7bc8 100%);
          color: #ffffff;
        }

        .bg-gradient {
          background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 50%, #f8f9fa 100%);
          color: #343a40;
        }

        .py-0 { padding-top: 0; padding-bottom: 0; }
        .py-3 { padding-top: 3rem; padding-bottom: 3rem; }
        .py-5 { padding-top: 5rem; padding-bottom: 5rem; }
        .py-6 { padding-top: 6rem; padding-bottom: 6rem; }

        .section-header {
          max-width: 800px;
          margin: 0 auto;
        }

        .section-subtitle {
          display: inline-block;
          background: var(--section-subtitle-bg);
          color: var(--section-text-color);
          padding: 0.5rem 1.5rem;
          border-radius: 50px;
          font-size: 0.9rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 1px;
          margin-bottom: 1.5rem;
          backdrop-filter: blur(10px);
          border: 1px solid var(--section-subtitle-border);
        }

        .section-title {
          font-size: 3rem;
          font-weight: 800;
          line-height: 1.2;
          margin-bottom: 1.5rem;
          color: var(--section-title-color);
        }

        .section-description {
          font-size: 1.2rem;
          line-height: 1.6;
          color: var(--section-desc-color);
          margin-bottom: 0;
        }

        .text-start {
          text-align: left !important;
        }

        .text-center {
          text-align: center !important;
        }

        .text-end {
          text-align: right !important;
        }

        .mb-5 {
          margin-bottom: 3rem !important;
        }

        /* Responsive Design */
        @media (max-width: 768px) {
          .section-title {
            font-size: 2.25rem;
          }

          .section-description {
            font-size: 1.1rem;
          }

          .section-subtitle {
            font-size: 0.8rem;
            padding: 0.4rem 1rem;
          }

          .py-3 { padding-top: 2rem; padding-bottom: 2rem; }
          .py-5 { padding-top: 3rem; padding-bottom: 3rem; }
          .py-6 { padding-top: 4rem; padding-bottom: 4rem; }
        }

        @media (max-width: 576px) {
          .section-title {
            font-size: 1.875rem;
          }

          .section-description {
            font-size: 1rem;
          }
        }

        /* Animation Classes */
        .animate-fade-in {
          animation: fadeIn 0.8s ease-out;
        }

        .animate-slide-up {
          animation: slideUp 0.8s ease-out;
        }

        .animate-slide-left {
          animation: slideLeft 0.8s ease-out;
        }

        .animate-slide-right {
          animation: slideRight 0.8s ease-out;
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes slideUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes slideLeft {
          from { opacity: 0; transform: translateX(-30px); }
          to { opacity: 1; transform: translateX(0); }
        }

        @keyframes slideRight {
          from { opacity: 0; transform: translateX(30px); }
          to { opacity: 1; transform: translateX(0); }
        }

        /* Background Patterns */
        .bg-gradient::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-image: 
            radial-gradient(circle at 25% 25%, rgba(44, 90, 160, 0.05) 0%, transparent 50%),
            radial-gradient(circle at 75% 75%, rgba(74, 123, 200, 0.05) 0%, transparent 50%);
          pointer-events: none;
        }

        .bg-primary::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-image: 
            radial-gradient(circle at 20% 80%, rgba(255, 255, 255, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, rgba(255, 255, 255, 0.1) 0%, transparent 50%);
          pointer-events: none;
        }

        .bg-dark::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-image: 
            radial-gradient(circle at 30% 70%, rgba(255, 255, 255, 0.05) 0%, transparent 50%),
            radial-gradient(circle at 70% 30%, rgba(255, 255, 255, 0.05) 0%, transparent 50%);
          pointer-events: none;
        }
      `}</style>
    </section>
  );
};

export default Section;
