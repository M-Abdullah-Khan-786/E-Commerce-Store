import BreadCrumb from "../components/BreadCrumb";
import Meta from "../components/Meta";
import "../CSS/Contact.css";
import { FaLocationDot } from "react-icons/fa6";
import { BiSupport } from "react-icons/bi";
import { IoIosMail } from "react-icons/io";
import { FaInfoCircle } from "react-icons/fa";

const Contact = () => {
  return (
    <>
      <Meta title="Contact Us" />
      <BreadCrumb title="Contact Us" />
      <div className="contact-wrapper home-wrapper py-5">
        <div className="container ">
          <div className="row">
            <div className="col-12">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d217759.99380853778!2d74.3343893!3d31.482940349999996!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39190483e58107d9%3A0xc23abe6ccc7e2462!2sLahore%2C%20Punjab!5e0!3m2!1sen!2s!4v1725092135507!5m2!1sen!2s"
                width="600"
                height="450"
                style={{ border: "0" }}
                className="w-100"
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
            <div className="col-12 mt-5">
              <div className="contact-inner-wrapper d-flex justify-content-between">
                <div>
                  <h3 className="contact-title mb-4">Contact Us</h3>
                  <form action="" className="d-flex flex-column gap-15">
                    <div>
                      <input
                        type="text"
                        name=""
                        id=""
                        className="form-control"
                        placeholder="Name"
                      />
                    </div>
                    <div>
                      <input
                        type="email"
                        name=""
                        id=""
                        className="form-control"
                        placeholder="Email Address"
                      />
                    </div>
                    <div>
                      <input
                        type="tel"
                        name=""
                        id=""
                        className="form-control"
                        placeholder="Phone Number"
                      />
                    </div>
                    <div>
                      <textarea
                        name=""
                        className="w-100 form-control"
                        cols="30"
                        rows="4"
                        id=""
                        placeholder="Comment"
                      ></textarea>
                    </div>
                    <div>
                      <button className="button" type="submit">
                        Send Message
                      </button>
                    </div>
                  </form>
                </div>
                <div>
                  <h3 className="contact-title mb-4">Get in Touch with us</h3>
                  <div>
                    <ul className="ps-0">
                      <li className="mb-3 d-flex gap-15 align-items-center">
                        <FaLocationDot className="fs-5" />
                        <address className="mb-0">
                          Lahore, PK
                        </address>
                      </li>
                      <li className="mb-3 d-flex gap-15 align-items-center">
                        <BiSupport className="fs-5" />
                        <a href="tel:+123456789">+123456789</a>
                      </li>
                      <li className="mb-3 d-flex gap-15 align-items-center">
                        <IoIosMail className="fs-5" />
                        <a href="mailto:info@example.com">
                          info@example.com
                        </a>
                      </li>
                      <li className="mb-3 d-flex gap-15 align-items-center">
                        <FaInfoCircle className="fs-5" />
                        <a href="#">
                          Read More about our Company
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;
