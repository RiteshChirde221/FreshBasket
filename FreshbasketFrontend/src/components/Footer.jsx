import React from "react";
import "../css/home.css";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <div>
      <footer className="bg-dark text-white pt-5 pb-4">
        <div className="container text-center text-md-left">
          <div className="row text-center text-md-left">
            <div className="col-md-3 col-lg-3 col-xl-3 mx-auto mt-3">
              <h5 className="text-uppercase mb-4 font-weight-bold text-warning">
                Freshbasket.com
              </h5>
              <p>
                "FreshBasket is committed to bringing you the freshest groceries
                with convenience at your fingertips. We ensure quality,
                affordability, and timely delivery to make your shopping
                hassle-free. Shop fresh, live healthy!"
              </p>
            </div>

            <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mt-3">
              <h5 className="text-uppercase mb-4 font-weight-bold text-warning">
                Information
              </h5>
              <p>
                <a
                  href="https://www.worldanimalprotection.org.in/news"
                  className="text-white"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  News
                </a>
              </p>
              <p>
                <a
                  href="https://www.worldanimalprotection.org.in/blogs"
                  className="text-white"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Blogs
                </a>
              </p>
            </div>

            <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mt-3">
              <h5 className="text-uppercase mb-4 font-weight-bold text-warning">
                Useful Links
              </h5>
              <p>
                <Link to="/home" className="text-white">
                  Home
                </Link>
              </p>
              <p>
                <Link to="/complaint" className="text-white">
                  Complaint
                </Link>
              </p>
              <p>
                <Link to="/useradopt" className="text-white">
                  Adopt
                </Link>
              </p>
              <p>
                <Link to="/profile" className="text-white">
                  Profile
                </Link>
              </p>
            </div>

            <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mt-3">
              <h5 className="text-uppercase mb-4 font-weight-bold text-warning">
                Contact
              </h5>
              <p>
                <i className="fa fa-home mr-3"></i> CDAC, IACSD
              </p>
              <p>
                <i className="fa fa-envelope mr-3"></i> freshbasket@gmail.com
              </p>
              <p>
                <i className="fa fa-phone mr-3"></i> +91 8007592194
              </p>
              <p>
                <i className="fa fa-phone mr-3"></i> +91 9284926333
              </p>
            </div>
          </div>

          <hr className="mb-4" />

          <div className="row align-items-center">
            <div className="col-md-7 col-lg-12 mx-auto text-center">
              <p>
                &copy; {new Date().getFullYear()} All rights reserved by:
                <a href="#" className="text-warning ml-2">
                  <strong>FreshBasket</strong>
                </a>
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Footer;
