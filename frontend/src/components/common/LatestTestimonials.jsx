/* eslint-disable react/jsx-key */
import { useState, useEffect } from "react";
import { apiUrl, fileUrl } from "../../http";
import StarRate from "../../assets/images/star-fill.svg"
import { Swiper, SwiperSlide } from 'swiper/react';
import {Pagination} from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

const LatestTestimonials = () => {
    const [testimonials, setTestimonials] = useState([]);

  
  const fetchTestimonials = async () => {
    const res = await fetch(apiUrl + "get-testimonials", {
      method: "GET",
    });

    const result = await res.json();
    console.log(result);
    setTestimonials(result.data);
  };
  useEffect(() => {
    fetchTestimonials();
  }, []);

  return (
    <>
    <section className="section-5 py-5">
          <div className="container">
          <div className="section-header text-center">
              <span>testimonials</span>
              <h2>What people are saying about us</h2>
              <p>
                We offer a diverse array of construction services, spanning
                residental, commercial and industrial projects.
              </p>
            </div>
            <Swiper
            modules={[Pagination]}
              spaceBetween={50}
              slidesPerView={3}
              pagination={{ clickable: true }}
              onSlideChange={() => console.log('slide change')}
               onSwiper={(swiper) => console.log(swiper)}
            >
           
            
            {
                testimonials && testimonials.map((testimonial) =>{
                    return(
                        <SwiperSlide>
              <div className="card shadow border-0">
                <div className="card-body p-4">
                  <div className="rating">
                  <img src={StarRate}/>
                  <img src={StarRate}/>
                  <img src={StarRate}/>
                  <img src={StarRate}/>
                  <img src={StarRate}/>
                  </div>
                  <div className="content pt-4 pb-3">
                    <p>{testimonial.testimonial}</p>
                   </div>
                  <hr />
                  <div className="d-flex meta">
                    <div>
                      <img src={`${fileUrl}uploads/temp/${testimonial.image}`} width={50} />
                    </div>
                    <div className="ps-3">
                      <div className="name">{testimonial.title}</div>
                      <div>{testimonial.citation}</div>
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
                    )
                })
            }
            
            
            </Swiper>
          </div>

        </section>
    
    </>
  )
}

export default LatestTestimonials