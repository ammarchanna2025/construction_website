import Header from "../common/Header";
import Footer from "../common/Footer";
import Hero from "../common/Hero";

const ContactUs = () => {
  return (
    <>
      <Header></Header>
      <Hero
        preHeading={"Quality. Integrity. Value"}
        heading={"Contact Us"}
        text={
          "We excel at transforming visions into reality through outstanding craftsmanship and precise."
        }
      ></Hero>

      <section className="section-9 py-5">
        <div className="section-header text-center">
          <span></span>
          <h2>Contact Us</h2>
          <p>
            Our dedicated experts are here to help you with any of your
            questions, contact us by <br />
            filling out the form below and we will be in touch shortly.
          </p>
        </div>

        <div className="row py-5 mt-5">
          <div className="col-md-3">
            <div className="card shadow border-0 mb-3">
              <div className="card-body">
                <h3 className="mt-4">Call Us</h3>
                <div>
                  <a href="#">000-888-999</a>
                </div>
                <div>
                  <a href="#">000-888-999</a>
                </div>

                <h3 className="mt-4">You can write us</h3>
                <div>
                  <a href="#">example@mail.com</a>
                </div>
                <div>
                  <a href="#">info@example.com</a>
                </div>

                <h3 className="mt-4">Address</h3>
                <p>
                  Gulshan-e-Iqbal Block-11
                  <br />
                  Karachi
                </p>
              </div>
            </div>
          </div>
          
          <div className="col-md-9">
            <div className="card shadow border-0">
             <div className="card-body p-5">
             <form action="#">
                <div className="row">
                  <div className="col-md-6 mb-4">
                    <label htmlFor="" className="form-label">Name</label>
                    <input type="text" className="form-control form-control-lg" placeholder="Enter Name"/>
                  </div>
                  <div className="col-md-6 mb-4">
                    <label htmlFor="" className="form-label">Email</label>
                    <input type="email" className="form-control form-control-lg" placeholder="Enter Email"/>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6 mb-4">
                    <label htmlFor="" className="form-label">Phone</label>
                    <input type="text" className="form-control form-control-lg" placeholder="Enter Phone No."/>
                  </div>
                  <div className="col-md-6 mb-4">
                    <label htmlFor="" className="form-label">Subject</label>
                    <input type="text" className="form-control form-control-lg" placeholder="Enter Subject"/>
                  </div>
                </div>
                <div>
                  <label htmlFor="" className="form-label">Message</label>
                  <textarea name="" id="" placeholder='Message'rows={5} className="form-control form-control-lg"></textarea>
                </div>
                <button className="btn btn-primary large mt-3">Submit</button>
              </form>
             </div>
            </div>
          </div>
          </div>
      </section>
      <Footer></Footer>
    </>
  );
};

export default ContactUs;
