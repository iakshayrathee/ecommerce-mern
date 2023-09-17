import React from "react";

const Footer = () => {
  return (
    <footer
      className="text-center text-lg-start text-white pt-1"
      style={{ backgroundColor: "#337CCF" }}
    >
      <section className="design">
        <div className="container text-center text-md-start mt-5">
          <div className="row mt-3">
            <div className="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">
              <h6 className="text-uppercase fw-bold">The Mordern Market</h6>
              <hr
                className="mb-4 mt-0 d-inline-block mx-auto"
                style={{ width: 60, backgroundColor: "#7c4dff", height: 2 }}
              />
              <p>
                Explore fashion at its finest in our store. From classic to
                trendy, find quality clothing and accessories for your perfect
                look.
              </p>
            </div>

            <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4 list-unstyled">
              <h6 className="text-uppercase fw-bold ">Our Collections</h6>
              <hr
                className="mb-4 mt-0 d-inline-block mx-auto"
                style={{ width: 60, backgroundColor: "#7c4dff", height: 2 }}
              />
              <p>
                <li className="text-white">Men Collections</li>
              </p>
              <p>
                <li className="text-white">Women Collections</li>
              </p>
              <p>
                <li className="text-white">Kids Collections</li>
              </p>
              <p>
                <li className="text-white">Footwear</li>
              </p>
            </div>

            <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mb-4 list-unstyled">
              {/* Links */}
              <h6 className="text-uppercase fw-bold">Help</h6>
              <hr
                className="mb-4 mt-0 d-inline-block mx-auto"
                style={{ width: 60, backgroundColor: "#7c4dff", height: 2 }}
              />
              <p>
                <li className="text-white ">Payment</li>
              </p>
              <p>
                <li className="text-white">Return</li>
              </p>
              <p>
                <li className="text-white">Cancellation and Return</li>
              </p>
              <p>
                <li className="text-white">FAQ</li>
              </p>
            </div>

            <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
              {/* Links */}
              <h6 className="text-uppercase fw-bold">Contact US</h6>
              <hr
                className="mb-4 mt-0 d-inline-block mx-auto"
                style={{ width: 60, backgroundColor: "#7c4dff", height: 2 }}
              />
              <p>
                <i className="fas fa-home mr-3" /> New York, NY 10012, US
              </p>
              <p>
                <i className="fas fa-envelope mr-3" />{" "}
                themordernmarket@gmail.com
              </p>
              <p>
                <i className="fas fa-phone mr-3" /> + 01 234 567 88
              </p>
              <p>
                <i className="fas fa-print mr-3" /> + 01 234 567 89
              </p>
            </div>
            {/* Grid column */}
          </div>
          {/* Grid row */}
        </div>
        <p className="text-center mb-1 fs-5">© 2023 TheMordernMarket</p>
      </section>
      <div
        className="pt-3 d-flex justify-content-center"
        style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}
      >
        Made with ❤️ by &nbsp;
        <p className="text-decoration-underline">Akshay Rathee</p>
      </div>
    </footer>
  );
};

export default Footer;
