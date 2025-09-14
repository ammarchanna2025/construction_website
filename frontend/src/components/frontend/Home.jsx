import { useState, useEffect } from "react";
import AboutImg from "../../assets/images/about-us.jpg";
import Header from "../common/Header";
import Footer from "../common/Footer";
import Hero from "../common/Hero";
import Section from "../common/Section";
import Card from "../common/Card";
import LoadingSpinner from "../common/LoadingSpinner";
import { apiUrl } from "../../http";

const Home = () => {
  const [services, setServices] = useState([]);
  const [projects, setProjects] = useState([]);
  const [articles, setArticles] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch dynamic content
  useEffect(() => {
    const fetchHomeData = async () => {
      try {
        setLoading(true);

        // Fetch all data in parallel
        const [servicesRes, projectsRes, articlesRes, testimonialsRes] = await Promise.all([
          fetch(`${apiUrl}get-services`).catch(() => null),
          fetch(`${apiUrl}get-projects`).catch(() => null),
          fetch(`${apiUrl}get-articles`).catch(() => null),
          fetch(`${apiUrl}get-testimonials`).catch(() => null)
        ]);

        // Process services
        if (servicesRes && servicesRes.ok) {
          const servicesData = await servicesRes.json();
          setServices(servicesData.data?.slice(0, 4) || []);
        }

        // Process projects
        if (projectsRes && projectsRes.ok) {
          const projectsData = await projectsRes.json();
          setProjects(projectsData.data?.slice(0, 3) || []);
        }

        // Process articles
        if (articlesRes && articlesRes.ok) {
          const articlesData = await articlesRes.json();
          setArticles(articlesData.data?.slice(0, 3) || []);
        }

        // Process testimonials
        if (testimonialsRes && testimonialsRes.ok) {
          const testimonialsData = await testimonialsRes.json();
          setTestimonials(testimonialsData.data?.slice(0, 3) || []);
        }

      } catch (err) {
        console.error('Error fetching home data:', err);
        setError('Failed to load content');
      } finally {
        setLoading(false);
      }
    };

    fetchHomeData();
  }, []);

  // Features data
  const features = [
    {
      icon: "bi-tools",
      title: "Expert Craftsmanship",
      description: "Our skilled professionals deliver exceptional quality with attention to every detail, ensuring your project exceeds expectations."
    },
    {
      icon: "bi-shield-check",
      title: "Quality Assurance",
      description: "We maintain the highest standards of quality control throughout every phase of construction, guaranteeing superior results."
    },
    {
      icon: "bi-clock-history",
      title: "Timely Delivery",
      description: "We understand the importance of deadlines and consistently deliver projects on time without compromising quality."
    },
    {
      icon: "bi-award",
      title: "Award-Winning Service",
      description: "Our commitment to excellence has earned us recognition and awards in the construction industry."
    }
  ];

  // Company stats
  const stats = [
    { value: "5+", label: "Years Experience" },
    { value: "55+", label: "Happy Clients" },
    { value: "85+", label: "Projects Done" },
    { value: "10+", label: "Awards Won" }
  ];

  if (loading) {
    return <LoadingSpinner fullScreen text="Loading ARC Construction..." />;
  }

  return (
    <>
      <Header />
      <main>
        {/* Hero Section */}
        <Hero
          preHeading="Quality. Integrity. Value."
          heading="We're Committed to Deliver High Quality Construction Services"
          text="We excel at transforming visions into reality through outstanding craftsmanship and precise attention to detail. With years of experience in the construction industry."
          showButtons={true}
          primaryButton={{ text: 'Get Quote', href: '/contact-us' }}
          secondaryButton={{ text: 'View Projects', href: '/projects' }}
          height="large"
        />

        {/* Features Section */}
        <Section
          title="Why Choose ARC Construction"
          subtitle="Our Expertise"
          description="We combine years of experience with innovative techniques to deliver exceptional construction services that exceed expectations."
          background="light"
          padding="large"
        >
          <div className="row g-4">
            {features.map((feature, index) => (
              <div key={index} className="col-lg-3 col-md-6">
                <Card
                  icon={feature.icon}
                  title={feature.title}
                  description={feature.description}
                  variant="service"
                />
              </div>
            ))}
          </div>
        </Section>

        {/* About Section */}
        <Section
          subtitle="About Us"
          title="Crafting Dreams with Precision and Excellence"
          background="white"
          padding="large"
          textAlign="left"
        >
          <div className="row align-items-center">
            <div className="col-lg-6">
              <div className="about-content">
                <p className="lead mb-4">
                  Our post construction services gives you peace of mind knowing that we are still here for you even after project completion. We build lasting relationships with our clients.
                </p>
                <p className="mb-4">
                  With a commitment to excellence and innovation, ARC Construction has established itself as a trusted partner in the construction industry. We combine traditional craftsmanship with modern techniques to deliver outstanding results.
                </p>

                {/* Stats Grid */}
                <div className="row g-4 mt-4">
                  {stats.map((stat, index) => (
                    <div key={index} className="col-6">
                      <div className="stat-card text-center p-3">
                        <h3 className="stat-number text-primary mb-2">{stat.value}</h3>
                        <p className="stat-label mb-0">{stat.label}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-4">
                  <a href="/about" className="btn btn-primary me-3">
                    Learn More About Us
                    <i className="bi bi-arrow-right ms-2"></i>
                  </a>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="about-image">
                <img src={AboutImg} alt="About ARC Construction" className="img-fluid rounded-3 shadow-lg" />
              </div>
            </div>
          </div>
        </Section>

        {/* Services Section */}
        {services.length > 0 && (
          <Section
            subtitle="Our Services"
            title="Comprehensive Construction Solutions"
            description="From residential to commercial projects, we offer a full range of construction services tailored to meet your specific needs."
            background="light"
            padding="large"
          >
            <div className="row g-4">
              {services.map((service, index) => (
                <div key={index} className="col-lg-3 col-md-6">
                  <Card
                    image={service.image ? `${apiUrl.replace('/api/', '/storage/')}${service.image}` : null}
                    icon="bi-tools"
                    title={service.title}
                    description={service.short_desc || service.content?.substring(0, 100) + '...'}
                    link={`/services`}
                    linkText="Learn More"
                    variant="service"
                    imageAlt={service.title}
                  />
                </div>
              ))}
            </div>
            <div className="text-center mt-5">
              <a href="/services" className="btn btn-outline btn-lg">
                View All Services
                <i className="bi bi-arrow-right ms-2"></i>
              </a>
            </div>
          </Section>
        )}

        {/* Projects Section */}
        {projects.length > 0 && (
          <Section
            subtitle="Our Portfolio"
            title="Featured Projects"
            description="Explore our portfolio of successful projects that showcase our expertise and commitment to quality construction."
            background="white"
            padding="large"
          >
            <div className="row g-4">
              {projects.map((project, index) => (
                <div key={index} className="col-lg-4 col-md-6">
                  <Card
                    image={project.image ? `${apiUrl.replace('/api/', '/storage/')}${project.image}` : null}
                    title={project.title}
                    description={project.short_desc || project.content?.substring(0, 120) + '...'}
                    link={`/projects`}
                    linkText="View Details"
                    variant="project"
                    imageAlt={project.title}
                    category={project.construction_type || 'Construction'}
                  />
                </div>
              ))}
            </div>
            <div className="text-center mt-5">
              <a href="/projects" className="btn btn-outline btn-lg">
                View All Projects
                <i className="bi bi-arrow-right ms-2"></i>
              </a>
            </div>
          </Section>
        )}

        {/* Testimonials Section */}
        {testimonials.length > 0 && (
          <Section
            subtitle="Client Testimonials"
            title="What Our Clients Say"
            description="Don't just take our word for it. Here's what our satisfied clients have to say about working with ARC Construction."
            background="primary"
            padding="large"
          >
            <div className="row g-4">
              {testimonials.map((testimonial, index) => (
                <div key={index} className="col-lg-4">
                  <div className="testimonial-card bg-white rounded-3 p-4 h-100 shadow">
                    <div className="testimonial-content mb-4">
                      <div className="quote-icon mb-3">
                        <i className="bi bi-quote text-primary" style={{fontSize: '2rem'}}></i>
                      </div>
                      <p className="testimonial-text mb-0">"{testimonial.review}"</p>
                    </div>
                    <div className="testimonial-author d-flex align-items-center">
                      <div className="author-avatar me-3">
                        <div className="avatar-placeholder bg-primary text-white rounded-circle d-flex align-items-center justify-content-center" style={{width: '50px', height: '50px'}}>
                          {testimonial.name?.charAt(0) || 'C'}
                        </div>
                      </div>
                      <div>
                        <h6 className="author-name mb-0 text-dark">{testimonial.name}</h6>
                        <small className="author-designation text-muted">{testimonial.designation || 'Valued Client'}</small>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Section>
        )}

        {/* Blog/Articles Section */}
        {articles.length > 0 && (
          <Section
            subtitle="Latest News"
            title="Construction Insights & Updates"
            description="Stay informed with the latest trends, tips, and news from the construction industry."
            background="light"
            padding="large"
          >
            <div className="row g-4">
              {articles.map((article, index) => (
                <div key={index} className="col-lg-4 col-md-6">
                  <Card
                    image={article.image ? `${apiUrl.replace('/api/', '/storage/')}${article.image}` : null}
                    title={article.title}
                    description={article.short_desc || article.content?.substring(0, 120) + '...'}
                    link={`/blogs`}
                    linkText="Read More"
                    variant="blog"
                    imageAlt={article.title}
                    date={new Date(article.created_at).toLocaleDateString()}
                    category="Construction"
                  />
                </div>
              ))}
            </div>
            <div className="text-center mt-5">
              <a href="/blogs" className="btn btn-outline btn-lg">
                View All Articles
                <i className="bi bi-arrow-right ms-2"></i>
              </a>
            </div>
          </Section>
        )}

        {/* CTA Section */}
        <Section
          title="Ready to Start Your Project?"
          description="Get in touch with our expert team today and let's bring your construction vision to life."
          background="gradient"
          padding="large"
        >
          <div className="row justify-content-center">
            <div className="col-lg-8 text-center">
              <div className="cta-buttons">
                <a href="/contact-us" className="btn btn-primary btn-lg me-3 mb-3">
                  <i className="bi bi-telephone me-2"></i>
                  Get Free Quote
                </a>
                <a href="/projects" className="btn btn-outline btn-lg mb-3">
                  <i className="bi bi-eye me-2"></i>
                  View Our Work
                </a>
              </div>
            </div>
          </div>
        </Section>

      </main>

      <Footer />

      <style>{`
        .lead {
          font-size: 1.25rem;
          font-weight: 400;
          color: #6c757d;
        }

        .stat-card {
          background: #f8f9fa;
          border-radius: 10px;
          transition: all 0.3s ease;
        }

        .stat-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
        }

        .stat-number {
          font-size: 2.5rem;
          font-weight: 800;
          line-height: 1;
        }

        .stat-label {
          font-size: 0.9rem;
          color: #6c757d;
          font-weight: 500;
        }

        .about-image {
          position: relative;
        }

        .about-image::before {
          content: '';
          position: absolute;
          top: -20px;
          left: -20px;
          right: 20px;
          bottom: 20px;
          background: linear-gradient(135deg, #2c5aa0 0%, #4a7bc8 100%);
          border-radius: 15px;
          z-index: -1;
        }

        .testimonial-card {
          transition: all 0.3s ease;
        }

        .testimonial-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15) !important;
        }

        .testimonial-text {
          font-style: italic;
          line-height: 1.6;
          color: #6c757d;
        }

        .cta-buttons {
          display: flex;
          justify-content: center;
          flex-wrap: wrap;
          gap: 1rem;
        }

        @media (max-width: 768px) {
          .stat-number {
            font-size: 2rem;
          }

          .about-image::before {
            top: -10px;
            left: -10px;
            right: 10px;
            bottom: 10px;
          }

          .cta-buttons {
            flex-direction: column;
            align-items: center;
          }

          .btn-lg {
            width: 100%;
            max-width: 300px;
          }
        }
      `}</style>
    </>
  );
};

export default Home;
