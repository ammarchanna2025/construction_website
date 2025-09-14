/* eslint-disable react/jsx-key */
import Header from "../common/Header";
import Footer from "../common/Footer";
import Hero from "../common/Hero";
import { useState, useEffect } from "react";
import { apiUrl, fileUrl} from "../../http";

const Services = () => {

  const [services, setservices] = useState([]);
  const fetchLatestServices = async () => {
    const res = await fetch(apiUrl + "get-services", {
      method: "GET",
    });
    const result = await res.json();
    console.log(result);
    setservices(result.data);
  };

  useEffect(() => {
    fetchLatestServices();
  });

  return (
    <>
      <Header>

      </Header>
      <Hero preHeading='Quality. Integrity. Value' heading='Services' text='We excel at transforming visions into reality through outstanding craftsmanship and precise.'>

      </Hero> 

       {/* Our Services */}
       <section className="section-3 bg-light py-5">
          <div className="container py-5">
            <div className="section-header text-center">
              <span>our services</span>
              <h2>Our Construction Services</h2>
              <p>
                We offer a diverse array of construction services, spanning
                residental, commercial and industrial projects.
              </p>
            </div>
            <div className="row pt-4">
            {services &&
              services.map((service) => {
                return (
                  <div className="col-md-4 col-lg-4">
                    <div className="item">
                      <div className="service-image">
                        <img src={`${fileUrl}uploads/temp/${service.image}`} className="w-100" />
                      </div>
                      <div className="service-body">
                        <div className="service-title">
                          <h3>{service.title}</h3>
                        </div>
                        <div className="service-content">
                          <p>
                            {service.short_desc}
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

export default Services
