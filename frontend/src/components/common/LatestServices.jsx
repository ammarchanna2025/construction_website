/* eslint-disable react/jsx-key */


import { useState, useEffect } from "react";
import { apiUrl, fileUrl } from "./http";

const LatestServices = () => {
  const [services, setservices] = useState([]);
  const fetchServices = async () => {
    const res = await fetch(apiUrl + "get-latest-services?limit=4", {
      method: "GET",
    });
    const result = await res.json();
    console.log(result);
    setservices(result.data);
  };

  useEffect(() => {
    fetchServices();
  });
  return (
    <>
      {/* Our Services */}
      <section className="section-3 bg-light py-5">
        <div className="container-fluid">
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
                  <div className="col-md-3 col-lg-3">
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
            
            
            {/* <div className="col-md-3 col-lg-3">
              <div className="item">
                <div className="service-image">
                  <img src={CorporateImg} className="w-100" />
                </div>
                <div className="service-body">
                  <div className="service-title">
                    <h3>Corporate Construction</h3>
                  </div>
                  <div className="service-content">
                    <p>
                      Speciality construction is a niche sector within the
                      construction industry that focuses on projects requiring
                      specialized skills, materials and techniques.
                    </p>
                  </div>
                  <a href="#" className="btn btn-primary small">
                    Read More
                  </a>
                </div>
              </div>
            </div> */}
          </div>
        </div>
      </section>
    </>
  );
};

export default LatestServices;
