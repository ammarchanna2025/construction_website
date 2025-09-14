// import React from 'react'
// import AboutImg from "../../assets/images/about-us.jpg";
import AboutImg from "../../assets/images/about-us.jpg";
import ProfilePic3 from "../../assets/images/author-3.jpg"

import Header from "../common/Header";
import Footer from "../common/Footer";

import Hero from "../common/Hero";

const About = () => {
  return (
    <>
      <Header />

      <main>
      <Hero preHeading='Quality. Integrity. Value' heading='About Us' text='We excel at transforming visions into reality through outstanding craftsmanship and precise.'>

</Hero> 

        {/*About Section */}
        <section className="section-2 py-5">
          <div className="container">
            <div className="row">
              <div className="col-md-6">
                <img src={AboutImg} className="w-100" alt="About Us" />
              </div>
              <div className="col-md-6">
                <span>about us</span>
                <h2>Crafting structures that last a lifetime</h2>
                <p>
                  Building enduring structures requires a comprehensive approach
                  that combines advanced materials, resilient design, routine
                  maintenance, and sustainable practices. By drawing on
                  historical insights and utilizing modern technology.
                </p>
                <p>
                  Designing structures that stand the test of time involves a
                  seamless blend of cutting-edge materials, durable design,
                  ongoing upkeep, and eco-friendly practices. By combining
                  lessons from the past with the power of modern technology.
                </p>
              </div>
            </div>
          </div>
        </section>
                    {/* Our Team */}
        <section className="section-8 bg-light py-5">
          <div className="container">
          <div className="section-header text-center">
              <span>team</span>
              <h2>Our Team</h2>
              <p>We specialize in a wide range of construction services, including residential, commercial and industrial projects.</p>
            </div>
            <div className="row pt-3">
              <div className="col-md-6 col-lg-3 mb-3">
                <div className="card shadow border-0">
                  <div className="card-img-top">
                    <img src={ProfilePic3} className="w-100" alt="Ammar Rasool"/>
                  </div>
                  <div className="card-body p-4">
                    <div className="card-title pb-0 mb-0">
                        Ammar Rasool
                    </div>
                    <div className="card-sub-title mb-3">
                          React & Laravel Developer
                    </div>
                    <a href="https://www.linkedin.com/in/ammar-rasool-5226a3247/" target="">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-linkedin" viewBox="0 0 16 16">
  <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854zm4.943 12.248V6.169H2.542v7.225zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248S2.4 3.226 2.4 3.934c0 .694.521 1.248 1.327 1.248zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016l.016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225z"/>
</svg>
                    </a>
                   
                  </div>
                </div>
              </div>
              <div className="col-md-6 col-lg-3 mb-3">
                <div className="card shadow border-0">
                  <div className="card-img-top">
                    <img src={ProfilePic3} className="w-100" alt="Team Member"/>
                  </div>
                  <div className="card-body p-4">
                    <div className="card-title pb-0 mb-0">
                        Team Member
                    </div>
                    <div className="card-sub-title mb-3">
                          Senior Developer
                    </div>
                    <a href="https://www.linkedin.com/in/ammar-rasool-5226a3247/" target="_blank" rel="noopener noreferrer">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-linkedin" viewBox="0 0 16 16">
  <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854zm4.943 12.248V6.169H2.542v7.225zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248S2.4 3.226 2.4 3.934c0 .694.521 1.248 1.327 1.248zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016l.016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225z"/>
</svg>
                    </a>
                   
                  </div>
                </div>
              </div>
              <div className="col-md-6 col-lg-3 mb-3">
                <div className="card shadow border-0">
                  <div className="card-img-top">
                    <img src={ProfilePic3} className="w-100" alt="Team Member"/>
                  </div>
                  <div className="card-body p-4">
                    <div className="card-title pb-0 mb-0">
                        Team Member
                    </div>
                    <div className="card-sub-title mb-3">
                          Project Manager
                    </div>
                    <a href="https://www.linkedin.com/in/ammar-rasool-5226a3247/" target="_blank" rel="noopener noreferrer">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-linkedin" viewBox="0 0 16 16">
  <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854zm4.943 12.248V6.169H2.542v7.225zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248S2.4 3.226 2.4 3.934c0 .694.521 1.248 1.327 1.248zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016l.016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225z"/>
</svg>
                    </a>
                   
                  </div>
                </div>
              </div>
              <div className="col-md-6 col-lg-3 mb-3">
                <div className="card shadow border-0">
                  <div className="card-img-top">
                    <img src={ProfilePic3} className="w-100" alt="Team Member"/>
                  </div>
                  <div className="card-body p-4">
                    <div className="card-title pb-0 mb-0">
                        Team Member
                    </div>
                    <div className="card-sub-title mb-3">
                          Construction Engineer
                    </div>
                    <a href="https://www.linkedin.com/in/ammar-rasool-5226a3247/" target="_blank" rel="noopener noreferrer">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-linkedin" viewBox="0 0 16 16">
  <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854zm4.943 12.248V6.169H2.542v7.225zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248S2.4 3.226 2.4 3.934c0 .694.521 1.248 1.327 1.248zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016l.016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225z"/>
</svg>
                    </a>
                   
                  </div>
                </div>
              </div>
            </div>
          </div>

        </section>

      </main>
      <Footer />
    </>
  );
};

export default About;
