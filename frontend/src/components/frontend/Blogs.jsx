/* eslint-disable react/jsx-key */
import Header from "../common/Header";
import Footer from "../common/footer";
import Hero from "../common/Hero";

import { useState, useEffect } from "react";
import { apiUrl, fileUrl} from "../common/http";

const Blogs = () => {
  const [articles, setArticles] = useState([]);
  const fetchArticles = async () => {
    const res = await fetch(apiUrl + "get-articles", {
      method: "GET",
    });
    const result = await res.json();
    console.log(result);
    setArticles(result.data);
  };

  useEffect(() => {
    fetchArticles();
  });
  return (
    <>
    <Header></Header>
    <Hero preHeading={'Quality. Integrity. Value'} heading={'Blogs'} text={'We excel at transforming visions into reality through outstanding craftsmanship and precise.'}>
    </Hero>

    <section className="section-6 bg-light py-5">
          <div className="container">
            <div className="section-header text-center">
              <span>Blog & News</span>
              <h2>Articles & Blog Posts</h2>
              <p>We offer a diverse array pf construction services, spanning residential, commerical and industrial projects.</p>
            </div>
            <div className="row">
            { articles&&
              articles.map((article) => {
                return (
                    <div className="col-md-4">
                    <div className="card shadow border-0">
                      <div className="card-img-top">
                      <img src={`${fileUrl}uploads/temp/${article.image}`} className="w-100" />
                      </div>
                      <div className="card-body p-4">
                        <div className="mb-3">
                          <a href="#" className="title">{article.title}</a>
                        </div>
                        <a href="#" className="btn btn-primary small">Read More</a>
                      </div>
                    </div>
                  </div> 
                );
              })}
            
            </div>
          </div>
        </section>

    <Footer></Footer>
    </>
  )
}

export default Blogs