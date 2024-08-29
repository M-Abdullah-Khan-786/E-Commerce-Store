import BreadCrumb from "../components/BreadCrumb";
import Meta from "../components/Meta";
import "../CSS/Store.css";
import ReactStars from "react-rating-stars-component";
import product from "../assets/product.png";

const Store = () => {
  return (
    <>
      <Meta title="Store" />
      <BreadCrumb title="Store" />
      <div className="store-wrapper home-wrapper-2 py-5">
        <div className="container">
          <div className="row">
            <div className="col-3">
              <div className="filter-card mb-3">
                <h3 className="filter-title">Shop By Categories</h3>
                <div>
                  <ul className="ps-0">
                    <li>Laptop</li>
                    <li>Gaming</li>
                    <li>Watch</li>
                    <li>Electronics</li>
                  </ul>
                </div>
              </div>
              <div className="filter-card mb-3">
                <h3 className="filter-title">Filter By</h3>
                <div>
                  <h5 className="sub-title">Availability</h5>
                  <div>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        value=""
                        id=""
                      />
                      <label className="form-check-label" htmlFor="">
                        In Stock (22)
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        value=""
                        id=""
                      />
                      <label className="form-check-label" htmlFor="">
                        Out of Stock (2)
                      </label>
                    </div>
                  </div>
                </div>
                <h5 className="sub-title">Price</h5>
                <div className="d-flex align-items-center gap-10">
                  <div className="form-floating">
                    <input
                      type="number"
                      className="form-control"
                      id="floatingInput"
                      placeholder="From"
                    />
                    <label htmlFor="floatingInput">From</label>
                  </div>
                  <div className="form-floating">
                    <input
                      type="number"
                      className="form-control"
                      id="floatingInput1"
                      placeholder="To"
                    />
                    <label htmlFor="floatingInput1">To</label>
                  </div>
                </div>
                <h5 className="sub-title">Colors</h5>
                <div>
                  <ul className="colors ps-0">
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                  </ul>
                </div>
                <h5 className="sub-title">Size</h5>
                <div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      value=""
                      id="size-1"
                    />
                    <label className="form-check-label" htmlFor="size-1">
                      SM
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      value=""
                      id="size-2"
                    />
                    <label className="form-check-label" htmlFor="size-2">
                      MD
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      value=""
                      id="size-3"
                    />
                    <label className="form-check-label" htmlFor="size-3">
                      XL
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      value=""
                      id="size-4"
                    />
                    <label className="form-check-label" htmlFor="size-4">
                      XXL
                    </label>
                  </div>
                </div>
              </div>
              <div className="filter-card mb-3">
                <h3 className="filter-title">Product Tags</h3>
                <div>
                  <div className="product-tags d-flex flex-wrap align-items-center gap-10">
                    <span className="badge bg-light text-secondary rounded-3 py-2 px-3">
                      Speakers
                    </span>
                    <span className="badge bg-light text-secondary rounded-3 py-2 px-3">
                      Charger
                    </span>
                    <span className="badge bg-light text-secondary rounded-3 py-2 px-3">
                      Mobile
                    </span>
                    <span className="badge bg-light text-secondary rounded-3 py-2 px-3">
                      Light
                    </span>
                    <span className="badge bg-light text-secondary rounded-3 py-2 px-3">
                      Watch
                    </span>
                    <span className="badge bg-light text-secondary rounded-3 py-2 px-3">
                      Glasses
                    </span>
                    <span className="badge bg-light text-secondary rounded-3 py-2 px-3">
                      Staionary
                    </span>
                    <span className="badge bg-light text-secondary rounded-3 py-2 px-3">
                      Books
                    </span>
                  </div>
                </div>
              </div>
              <div className="filter-card mb-3">
                <h3 className="filter-title">Random Products</h3>
                <div>
                  <div className="random-products py-3 d-flex">
                    <div className="w-50">
                      <img src={product} alt="Product" className="img-fluid" />
                    </div>
                    <div className="w-50">
                      <h5>Wireless Headphones</h5>
                      <ReactStars
                        count={5}
                        size={24}
                        value="5"
                        edit={false}
                        activeColor="#ffd700"
                      />
                      <b>Rs 2200</b>
                    </div>
                  </div>
                  <div className="random-products py-3 d-flex">
                    <div className="w-50">
                      <img src={product} alt="Product" className="img-fluid" />
                    </div>
                    <div className="w-50">
                      <h5>Wireless Headphones</h5>
                      <ReactStars
                        count={5}
                        size={24}
                        value="5"
                        edit={false}
                        activeColor="#ffd700"
                      />
                      <b>Rs 2200</b>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-9">main</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Store;
