import AboutImg from "../../assets/images/about-us.jpg";
import Icon1 from "../../assets/images/icon-1.svg"
import Icon2 from "../../assets/images/icon-2.svg"
import Icon3 from "../../assets/images/icon-3.svg"
import LatestTestimonails from "../common/LatestTestimonials";
import Header from "../common/Header";
import Footer from "../common/footer";
import LatestServices from "../common/LatestServices";
import LatestProjects from "../common/LatestProjects";
import LatestArticles from "../common/LatestArticles";

const Home = () => {
  
  return (
    <>
      <Header />
      <main>
        <section className="section-1">
          <div className="hero d-flex align-items-center">
            <div className="container-fluid">
              <div className="text-center">
                <span>Welcome ARC Constructions</span>
                <h2>
                  Crafting dreams with <br />
                  precision and excellence.
                </h2>
                <p>
                  We excel at transforming visions into reality through
                  outstanding craftsmanship and precise <br />
                  attention to detail. With years of experience and a dedication
                  to quality.
                </p>
                <div className="mt-4">
                  <a className="btn btn-primary large">Contact Now</a>
                  <a className="btn btn-secondary large ms-4">View Projects</a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/*About Section */}
        <section className="section-2 py-5">
          <div className="container">
            <div className="row">
              <div className="col md-6">
                <img src={AboutImg} className="w-100" />
              </div>
              <div className="col md-6">
                <span>about us</span>
                <h2>Crafting structures that last a lifetime</h2>
                <p>
                  Building enduring structures requires a comprehensive approach
                  that combines advanced materials, resilient design, routine
                  maintaince, and sustainable practices. By drawing on
                  historical insights and utilizing modern technologyy.
                </p>
                <p>
                  Designing structures that stand the test of time involves a
                  seamless blend of cutting-edge materials, durable design,
                  ongoing upkeep, and eco-friendly practices. By combining
                  lessons from the past with the power modern technology.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Our Services */}
        <LatestServices/>

        {/* Why choose us */}
        <section className="section-4 py-5">
          <div className="container py-5">
          <div className="section-header text-center">
              <span>why choose us</span>
              <h2>Discover our wide variety of projects</h2>
              <p>
                Created in close partnership with our clients and collaborators, this approach merges industry expertise,<br/> decades of experience, innovation and flexibility to consistently deliver excellence.
              </p>
            </div>
            <div className="row pt-4">
              <div className="col-md-4">
                <div className="card shadow border-0 p-4">
                    <div className="card-icon">
                      <img src={Icon1}/>
                    </div>
                    <div className="card-title mt-3">
                      <h4>Cutting Edge Solutions</h4>
                    </div>
                    
                      <p>Small actions create big impacts. It all begins and ends with each employee committing to safer work practices daily, ensuring they return home safely.</p>
                    
                </div>
              </div>

              <div className="col-md-4">
                <div className="card shadow border-0 p-4">
                    <div className="card-icon">
                      <img src={Icon2}/>
                    </div>
                    <div className="card-title mt-3">
                      <h4>Superior Craftsmanship</h4>
                    </div>
                    
                      <p>Small actions create big impacts. It all begins and ends with each employee committing to safer work practices daily, ensuring they return home safely.</p>
                    
                </div>
              </div>

              <div className="col-md-4">
                <div className="card shadow border-0 p-4">
                    <div className="card-icon">
                      <img src={Icon3}/>
                    </div>
                    <div className="card-title mt-3">
                      <h4>Knowledge and Expertise</h4>
                    </div>
                    
                      <p>Small actions create big impacts. It all begins and ends with each employee committing to safer work practices daily, ensuring they return home safely.</p>
                    
                </div>
              </div>
            </div>

          </div>

        </section>

        {/* Our Projects */}
        <LatestProjects/>
          {/* Testimonials */}
          <LatestTestimonails/>

            {/* Articles */}
        {/* <section className="section-6 bg-light py-5">
          <div className="container">
            <div className="section-header text-center">
              <span>Blog & News</span>
              <h2>Articles & Blog Posts</h2>
              <p>We offer a diverse array pf construction services, spanning residential, commerical and industrial projects.</p>
            </div>
            <div className="row">
              <div className="col-md-4">
                <div className="card shadow border-0">
                  <div className="card-img-top">
                    <img src={Blog1} className="w-100"/>
                  </div>
                  <div className="card-body p-4">
                    <div className="mb-3">
                      <a href="#" className="title">Blog-1</a>
                    </div>
                    <a href="#" className="btn btn-primary small">Read More</a>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="card shadow border-0">
                  <div className="card-img-top">
                    <img src={Blog2} className="w-100"/>
                  </div>
                  <div className="card-body p-4">
                    <div className="mb-3">
                      <a href="#" className="title">Blog-2</a>
                    </div>
                    <a href="#" className="btn btn-primary small">Read More</a>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="card shadow border-0">
                  <div className="card-img-top">
                    <img src={Blog3} className="w-100"/>
                  </div>
                  <div className="card-body p-4">
                    <div className="mb-3">
                      <a href="#" className="title">Blog-3</a>
                    </div>
                    <a href="#" className="btn btn-primary small">Read More</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section> */}
        <LatestArticles/>

        
      </main>

      <Footer />
    </>
  );
};

export default Home;
