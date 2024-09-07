import "../CSS/Footer.css";
import { Link } from "react-router-dom";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { GrSend } from "react-icons/gr";
import { FaFacebook } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
const Footer = () => {
  return (
    <>
      <footer className="footer-top py-5">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-5">
              <div className="footer-top-data d-flex gap-30 align-items-center">
                <GrSend className="newsletter text-white" />
                <h2 className="text-white mb-0">Sign Up for Newsletter</h2>
              </div>
            </div>
            <div className="col-7">
              <InputGroup>
                <Form.Control
                  placeholder="Email Address"
                  aria-label="Email Address"
                  aria-describedby="basic-addon2"
                  className="form-control py-2"
                />
                <InputGroup.Text
                  id="basic-addon2"
                  className="bg-secondary text-white px-3"
                >
                  Subscribe
                </InputGroup.Text>
              </InputGroup>
            </div>
          </div>
        </div>
      </footer>
      <footer className="footer-mid py-4">
        <div className="container">
          <div className="row">
            <div className="col-4">
              <h4 className="text-white mb-4">Contact Us</h4>
              <div>
                <address className="text-white fs-6">
                  <strong>E-Store</strong>
                  <br />
                  123 Main St, Anytown, USA 12345
                  <br />
                  Phone: (123) 456-7890
                  <br />
                  Email: info@example.com
                </address>
                <div className="social-icons d-flex align-items-center gap-30">
                  <a href="https://www.facebook.com/">
                    <FaFacebook className="text-white fs-4" />
                  </a>
                  <a href="https://pk.linkedin.com/">
                    <FaLinkedin className="text-white fs-4" />
                  </a>
                  <a href="https://github.com/">
                    <FaGithub className="text-white fs-4" />
                  </a>
                  <a href="https://www.youtube.com/">
                    <FaYoutube className="text-white fs-4" />
                  </a>
                </div>
              </div>
            </div>
            <div className="col-3">
              <h4 className="text-white mb-4">Information</h4>
              <div className="footer-links d-flex flex-column">
                <Link
                  to="/privacy-policy"
                  className="text-white mb-1 py-2 text-decoration-none"
                >
                  Privacy Policy
                </Link>
                <Link
                  to="/refund-policy"
                  className="text-white mb-1 py-2 text-decoration-none"
                >
                  Refund Policy
                </Link>
                <Link
                  to="/shipping-policy"
                  className="text-white mb-1 py-2 text-decoration-none"
                >
                  Shipping Policy
                </Link>
                <Link
                  to="/term-conditions"
                  className="text-white mb-1 py-2 text-decoration-none"
                >
                  Term And Conditions
                </Link>
              </div>
            </div>
            <div className="col-3">
              <h4 className="text-white mb-4">Account</h4>
              <div className="footer-links d-flex flex-column">
                <Link
                  to="/"
                  className="text-white mb-1 py-2 text-decoration-none"
                >
                  About
                </Link>
                <Link
                  to="/"
                  className="text-white mb-1 py-2 text-decoration-none"
                >
                  Blogs
                </Link>
                <Link
                  to="/"
                  className="text-white mb-1 py-2 text-decoration-none"
                >
                  FAQ
                </Link>
                <Link
                  to="/"
                  className="text-white mb-1 py-2 text-decoration-none"
                >
                  Inquiry
                </Link>
              </div>
            </div>
            <div className="col-2">
              <h4 className="text-white mb-4">Quick Links</h4>
              <div className="footer-links d-flex flex-column">
                <Link
                  to="/"
                  className="text-white mb-1 py-2 text-decoration-none"
                >
                  Accesories
                </Link>
                <Link
                  to="/"
                  className="text-white mb-1 py-2 text-decoration-none"
                >
                  Mobile Phone
                </Link>
                <Link
                  to="/"
                  className="text-white mb-1 py-2 text-decoration-none"
                >
                  Watches
                </Link>
                <Link
                  to="/"
                  className="text-white mb-1 py-2 text-decoration-none"
                >
                  Laptop
                </Link>
                <Link
                  to="/"
                  className="text-white mb-1 py-2 text-decoration-none"
                >
                  Lights
                </Link>
              </div>
            </div>
          </div>
        </div>
      </footer>
      <footer className="footer-bottom py-4">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <p className="text-center text-white">
                &copy; 2022. All rights reserved
              </p>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
