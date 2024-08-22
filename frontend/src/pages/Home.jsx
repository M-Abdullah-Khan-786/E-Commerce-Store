import "../CSS/Home.css";
import { Link } from "react-router-dom";
import image1 from "../assets/main-banner-1.jpg";
import { FaShippingFast } from "react-icons/fa";
import { FaGift } from "react-icons/fa";
import { MdOutlineSupportAgent } from "react-icons/md";
import { RiDiscountPercentFill } from "react-icons/ri";
import { FaRegCreditCard } from "react-icons/fa";

const Home = () => {
  return (
    <>
      <section className="home-wrapper-1 py-5">
        <div className="container">
          <div className="row">
            <div className="col-6">
              <div className="main-banner position-relative">
                <img
                  src={image1}
                  alt="main-banner"
                  className="img-fluid rounded-3"
                />
                <div className="main-banner-content position-absolute">
                  <h4 className="text-white">SUPERCHARGED</h4>
                  <h5 className="text-white">FOR ALL PRODUCTS</h5>
                  <p className="text-white">From Rs 10,000</p>
                  <Link to="/" className="buttton text-decoration-none">
                    BUY NOW
                  </Link>
                </div>
              </div>
            </div>
            <div className="col-6">
              <div className="d-flex flex-wrap gap-10 justify-content-between align-items-center">
                <div className="small-banner position-relative">
                  <img
                    src={image1}
                    alt="main-banner"
                    className="img-fluid rounded-3"
                  />
                  <div className="small-banner-content position-absolute">
                    <h4 className="text-white">SUPERCHARGED</h4>
                    <h5 className="text-white">FOR ALL PRODUCTS</h5>
                    <p className="text-white">From Rs 10,000</p>
                  </div>
                </div>
                <div className="small-banner position-relative">
                  <img
                    src={image1}
                    alt="main-banner"
                    className="img-fluid rounded-3"
                  />
                  <div className="small-banner-content position-absolute">
                    <h4 className="text-white">SUPERCHARGED</h4>
                    <h5 className="text-white">FOR ALL PRODUCTS</h5>
                    <p className="text-white">From Rs 10,000</p>
                  </div>
                </div>
                <div className="small-banner position-relative">
                  <img
                    src={image1}
                    alt="main-banner"
                    className="img-fluid rounded-3"
                  />
                  <div className="small-banner-content position-absolute">
                    <h4 className="text-white">SUPERCHARGED</h4>
                    <h5 className="text-white">FOR ALL PRODUCTS</h5>
                    <p className="text-white">From Rs 10,000</p>
                  </div>
                </div>
                <div className="small-banner position-relative">
                  <img
                    src={image1}
                    alt="main-banner"
                    className="img-fluid rounded-3"
                  />
                  <div className="small-banner-content position-absolute">
                    <h4 className="text-white">SUPERCHARGED</h4>
                    <h5 className="text-white">FOR ALL PRODUCTS</h5>
                    <p className="text-white">From Rs 10,000</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="home-wrapper-2 py-5">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="services d-flex align-items-center justify-content-between">
                <div className="d-flex align-items-center gap-15">
                  <FaShippingFast className="services-icon" />
                  <div>
                    <h6>Free Shipping</h6>
                    <p className="mb-0">From All Orders over Rs 2000</p>
                  </div>
                </div>
                <div className="d-flex align-items-center gap-15">
                  <FaGift className="services-icon" />
                  <div>
                    <h6>Daily Gifts offer</h6>
                    <p className="mb-0">Save upto 30%</p>
                  </div>
                </div>
                <div className="d-flex align-items-center gap-15">
                  <MdOutlineSupportAgent className="services-icon" />
                  <div>
                    <h6>Support 24/7</h6>
                    <p className="mb-0">Shop with an Expert</p>
                  </div>
                </div>
                <div className="d-flex align-items-center gap-15">
                  <RiDiscountPercentFill className="services-icon" />
                  <div>
                    <h6>Affordable Prices</h6>
                    <p className="mb-0">Factory Default Prices</p>
                  </div>
                </div>
                <div className="d-flex align-items-center gap-15">
                  <FaRegCreditCard className="services-icon" />
                  <div>
                    <h6>Secue Payments</h6>
                    <p className="mb-0">100% Secure Transfer</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
