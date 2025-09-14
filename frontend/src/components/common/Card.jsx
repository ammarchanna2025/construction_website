const Card = ({ 
  image, 
  icon, 
  title, 
  description, 
  link, 
  linkText = 'Learn More',
  variant = 'default', // default, service, project, blog, team
  className = '',
  imageAlt = '',
  date = null,
  category = null,
  stats = null
}) => {
  
  const getCardClass = () => {
    const baseClass = 'modern-card';
    const variantClass = `card-${variant}`;
    return `${baseClass} ${variantClass} ${className}`;
  };

  return (
    <div className={getCardClass()}>
      {/* Card Image */}
      {image && (
        <div className="card-image">
          <img src={image} alt={imageAlt || title} />
          {category && <span className="card-category">{category}</span>}
          {date && <span className="card-date">{date}</span>}
        </div>
      )}

      {/* Card Icon (for service cards) */}
      {icon && !image && (
        <div className="card-icon">
          <i className={icon}></i>
        </div>
      )}

      {/* Card Content */}
      <div className="card-content">
        {title && <h3 className="card-title">{title}</h3>}
        {description && <p className="card-description">{description}</p>}
        
        {/* Stats (for project cards) */}
        {stats && (
          <div className="card-stats">
            {stats.map((stat, index) => (
              <div key={index} className="stat-item">
                <span className="stat-value">{stat.value}</span>
                <span className="stat-label">{stat.label}</span>
              </div>
            ))}
          </div>
        )}

        {/* Card Link */}
        {link && (
          <a href={link} className="card-link">
            {linkText}
            <i className="bi bi-arrow-right ms-2"></i>
          </a>
        )}
      </div>

      <style>{`
        .modern-card {
          background: white;
          border-radius: 15px;
          overflow: hidden;
          transition: all 0.3s ease;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
          height: 100%;
          display: flex;
          flex-direction: column;
        }

        .modern-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15);
        }

        .card-image {
          position: relative;
          width: 100%;
          height: 250px;
          overflow: hidden;
        }

        .card-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.3s ease;
        }

        .modern-card:hover .card-image img {
          transform: scale(1.05);
        }

        .card-category {
          position: absolute;
          top: 1rem;
          left: 1rem;
          background: linear-gradient(135deg, #2c5aa0 0%, #4a7bc8 100%);
          color: white;
          padding: 0.5rem 1rem;
          border-radius: 20px;
          font-size: 0.8rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .card-date {
          position: absolute;
          top: 1rem;
          right: 1rem;
          background: rgba(255, 255, 255, 0.9);
          color: #2c5aa0;
          padding: 0.5rem 1rem;
          border-radius: 20px;
          font-size: 0.8rem;
          font-weight: 600;
          backdrop-filter: blur(10px);
        }

        .card-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 80px;
          height: 80px;
          background: linear-gradient(135deg, #2c5aa0 0%, #4a7bc8 100%);
          border-radius: 20px;
          margin: 2rem auto 1rem;
          transition: all 0.3s ease;
        }

        .card-icon i {
          font-size: 2rem;
          color: white;
        }

        .modern-card:hover .card-icon {
          transform: scale(1.1);
          box-shadow: 0 8px 25px rgba(44, 90, 160, 0.3);
        }

        .card-content {
          padding: 2rem;
          flex-grow: 1;
          display: flex;
          flex-direction: column;
        }

        .card-title {
          font-size: 1.5rem;
          font-weight: 700;
          color: #2c5aa0;
          margin-bottom: 1rem;
          line-height: 1.3;
        }

        .card-description {
          color: #6c757d;
          line-height: 1.6;
          margin-bottom: 1.5rem;
          flex-grow: 1;
        }

        .card-stats {
          display: flex;
          gap: 1rem;
          margin-bottom: 1.5rem;
          padding: 1rem;
          background: #f8f9fa;
          border-radius: 10px;
        }

        .stat-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          flex: 1;
        }

        .stat-value {
          font-size: 1.5rem;
          font-weight: 700;
          color: #2c5aa0;
          line-height: 1;
        }

        .stat-label {
          font-size: 0.8rem;
          color: #6c757d;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          margin-top: 0.25rem;
        }

        .card-link {
          display: inline-flex;
          align-items: center;
          color: #2c5aa0;
          text-decoration: none;
          font-weight: 600;
          transition: all 0.3s ease;
          margin-top: auto;
        }

        .card-link:hover {
          color: #4a7bc8;
          transform: translateX(5px);
        }

        .card-link i {
          transition: transform 0.3s ease;
        }

        .card-link:hover i {
          transform: translateX(3px);
        }

        /* Service Card Variant */
        .card-service {
          text-align: center;
        }

        .card-service .card-content {
          padding: 1.5rem;
        }

        .card-service .card-title {
          font-size: 1.25rem;
          margin-bottom: 0.75rem;
        }

        /* Project Card Variant */
        .card-project .card-image {
          height: 200px;
        }

        /* Blog Card Variant */
        .card-blog .card-image {
          height: 220px;
        }

        .card-blog .card-title {
          font-size: 1.25rem;
          margin-bottom: 0.75rem;
        }

        /* Team Card Variant */
        .card-team {
          text-align: center;
        }

        .card-team .card-image {
          height: 280px;
        }

        .card-team .card-image img {
          border-radius: 50%;
          width: 200px;
          height: 200px;
          margin: 2rem auto;
          object-fit: cover;
        }

        .card-team .card-content {
          padding: 1rem 2rem 2rem;
        }

        .card-team .card-title {
          font-size: 1.25rem;
          margin-bottom: 0.5rem;
        }

        .card-team .card-description {
          font-size: 0.9rem;
          color: #f39c12;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          margin-bottom: 1rem;
        }

        @media (max-width: 768px) {
          .card-content {
            padding: 1.5rem;
          }

          .card-title {
            font-size: 1.25rem;
          }

          .card-icon {
            width: 60px;
            height: 60px;
            margin: 1.5rem auto 0.75rem;
          }

          .card-icon i {
            font-size: 1.5rem;
          }

          .card-stats {
            flex-direction: column;
            gap: 0.5rem;
          }

          .stat-item {
            flex-direction: row;
            justify-content: space-between;
          }
        }
      `}</style>
    </div>
  );
};

export default Card;
