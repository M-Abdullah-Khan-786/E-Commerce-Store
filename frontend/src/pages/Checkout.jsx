import { Link } from "react-router-dom";
import "../CSS/Checkout.css";
import BreadCrumb from "../components/BreadCrumb";
import Meta from "../components/Meta";
import { IoChevronBack } from "react-icons/io5";
import product from "../assets/product.png";

const Checkout = () => {
  return (
    <>
      <Meta title="Checkout" />
      <BreadCrumb title="Checkout" />
      <div className="checkout-wrapper home-wrapper-2 py-5">
        <div className="container">
          <div className="row">
            <div className="col-7">
              <div className="left-checkout-aside">
                <h3 className="store-name">E-Store</h3>
                <nav
                  style={{ "--bs-breadcrumb-divider": ">" }}
                  aria-label="breadcrumb"
                >
                  <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                      <Link to="/cart" className=" total-price">
                        Cart
                      </Link>
                    </li>
                    &nbsp; /
                    <li className="breadcrumb-item active total-price" aria-current="page">
                      Information
                    </li>
                    &nbsp; /
                    <li className="breadcrumb-item active total-price" aria-current="page">
                      Shipping
                    </li>
                    &nbsp; /
                    <li className="breadcrumb-item active total-price" aria-current="page">
                      Payment
                    </li>
                  </ol>
                </nav>
                <h4 className="title total">Contact Information</h4>
                <p className="user-data total">User Test (Usertest@gmail.com)</p>
                <h4 className="mb-3">Shipping Address</h4>
                <form
                  action=""
                  className="d-flex flex-wrap gap-15 justify-content-between"
                >
                  <div className="w-100">
                    <select
                      name=""
                      className="form-control  form-select bg-white"
                      id=""
                    >
                      <option value="" selected disabled>
                        Select Country
                      </option>
                    </select>
                  </div>
                  <div className="flex-grow-1">
                    <input
                      type="text"
                      placeholder="First Name"
                      className="form-control bg-white"
                    />
                  </div>
                  <div className="flex-grow-1">
                    <input
                      type="text"
                      placeholder="Last Name"
                      className="form-control bg-white"
                    />
                  </div>
                  <div className="w-100">
                    <input
                      type="text"
                      placeholder="Address"
                      className="form-control bg-white"
                    />
                  </div>
                  <div className="flex-grow-1">
                    <input
                      type="text"
                      placeholder="City"
                      className="form-control bg-white"
                    />
                  </div>
                  <div className="flex-grow-1">
                    <select
                      name=""
                      className="form-control px-4 form-select bg-white"
                      id=""
                    >
                      <option value="" selected disabled>
                        Select State
                      </option>
                    </select>
                  </div>
                  <div className="flex-grow-1">
                    <input
                      type="text"
                      placeholder="Zip Code"
                      className="form-control bg-white"
                    />
                  </div>
                  <div className="w-100">
                    <div className="d-flex align-items-center justify-content-between">
                      <Link to="/cart" className="text-dark">
                        <IoChevronBack className="me-1 mb-1" /> Back to Cart
                      </Link>
                      <Link to="/cart" className="button">
                        Continue Shipping
                      </Link>
                    </div>
                  </div>
                </form>
              </div>
            </div>
            <div className="col-5">
              <div className="border-bottom py-4">
                <div className="d-flex gap-10 mb-2 align-items-center">
                  <div className="w-75 d-flex">
                    <div className="w-25 position-relative">
                        <span className="badge checkout-badge position-absolute bg-warning rounded-circle">1</span>
                      <img src={product} alt="product" className="img-fluid" />
                    </div>
                    <div>
                    <h5 className="total-price">Wireless Headphones</h5>
                    <p className="total-price">Rs 2200</p>
                  </div>
                  </div>
                  <div className="flex-grow-1">
                    <h5>Rs 2200</h5>
                  </div>
                </div>
              </div>
              <div className="border-bottom py-4">
                <div className="d-flex align-items-center justify-content-between">
                  <p className="mb-0 total">Subtotal</p>
                  <p className="mb-0 total-price">Rs 2200</p>
                </div>
                <div className="d-flex align-items-center justify-content-between">
                  <p className="mb-0 total">Shipping fee</p>
                  <p className="mb-0 total-price">Rs 70</p>
                </div>
              </div>
              <div className="d-flex align-items-center justify-content-between border-bottom py-4">
                <h4 className="total">Total</h4>
                <h5 className="total-price">Rs 2270</h5>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Checkout;
