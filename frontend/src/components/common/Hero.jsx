

const Hero = ({preHeading,heading,text}) => {
  return (
    <>
    <section className="section-7">
          <div className="hero d-flex align-items-center">
            <div className="container">
              <div className="text-left">
                <span>{preHeading}</span>
                <h2>{heading}</h2>
                <p>
                 {text}
                </p>
                <div className="mt-4">
                  <a className="btn btn-primary large">Contact Now</a>
                  <a className="btn btn-secondary large ms-4">View Projects</a>
                </div>
              </div>
            </div>
          </div>
        </section>
    </>
  )
}

export default Hero