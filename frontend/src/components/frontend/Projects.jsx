/* eslint-disable react/jsx-key */
import Header from "../common/Header"
import Footer from "../common/footer"
import Hero from "../common/Hero"
import { useState, useEffect } from "react";
import { apiUrl, fileUrl} from "../common/http";

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const fetchProjects = async () => {
    const res = await fetch(apiUrl + "get-projects", {
      method: "GET",
    });
    const result = await res.json();
    console.log(result);
    setProjects(result.data);
  };

  useEffect(() => {
    fetchProjects();
  });

  return (

    
   <>
   <Header>
   </Header>

   <Hero preHeading={'Quality. Integrity. Value'} heading={'Our Projects'} text={'We excel at transforming visions into reality through outstanding craftsmanship and precise.'}>
   </Hero>
    {/* Our Projects */}
    <section className="section-3 bg-light py-5">
          <div className="container py-5">
            <div className="section-header text-center">
              <span>our projects</span>
              <h2>Discover our diverse range of projects</h2>
              <p>
                We offer a diverse array of construction services, spanning
                residental, commercial and industrial projects.
              </p>
            </div>
            <div className="row pt-4">
            { projects&&
              projects.map((project) => {
                return (
                  <div className="col-md-4 col-lg-4">
                    <div className="item">
                      <div className="service-image">
                        <img src={`${fileUrl}uploads/temp/${project.image}`} className="w-100" />
                      </div>
                      <div className="service-body">
                        <div className="service-title">
                          <h3>{project.title}</h3>
                        </div>
                        <div className="service-content">
                          <p>
                            {project.short_desc}
                          </p>
                        </div>
                        <a href="#" className="btn btn-primary small">
                          Read More
                        </a>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

   <Footer>
   </Footer>
   </>
  )
}

export default Projects