import "../CSS/CompareProduct.css";
import BreadCrumb from "../components/BreadCrumb";
import Meta from "../components/Meta";
import { IoMdCloseCircleOutline } from "react-icons/io";
import product from "../assets/product.png";
import Color from "../components/Color";

const CompareProduct = () => {
  return (
    <>
      <Meta title="Compare Products" />
      <BreadCrumb title="Compare Products" />
      <div className="compare-product-wrapper py-5 home-wrapper-2">
        <div className="container">
          <div className="row">
            <div className="col-3">
              <div className="compare-product-card position-relative">
                <IoMdCloseCircleOutline className="position-absolute close-icon" />
                <div className="product-card-image">
                  <img
                    src={product}
                    alt="Compare Image"
                    className="img-fluid"
                  />
                </div>
                <div className="product-card-content">
                  <h5 className="title">Wireless Headphone</h5>
                  <h6 className="price mb-4 mt-3">Rs 2200</h6>
                  <div>
                    <div className="product-details d-flex flex-row align-items-center justify-content-between">
                      <h5>Brand:</h5>
                      <p className="mb-0">Apple</p>
                    </div>
                    <div className="product-details d-flex flex-row align-items-center justify-content-between">
                      <h5>Type:</h5>
                      <p className="mb-0">Headphones</p>
                    </div>
                    <div className="product-details d-flex flex-row align-items-center justify-content-between">
                      <h5>Availability:</h5>
                      <p className="mb-0">In Stock</p>
                    </div>
                    <div className="product-details d-flex flex-row align-items-center justify-content-between">
                      <h5>Color:</h5>
                      <Color/>
                    </div>
                    <div className="product-details d-flex flex-row align-items-center justify-content-between">
                      <h5>Size:</h5>
                      <div className="d-flex gap-10">
                        <p className="mb-0">M</p>
                        <p className="mb-0">L</p>
                        <p className="mb-0">XL</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-3">
              <div className="compare-product-card position-relative">
                <IoMdCloseCircleOutline className="position-absolute close-icon" />
                <div className="product-card-image">
                  <img
                    src={product}
                    alt="Compare Image"
                    className="img-fluid"
                  />
                </div>
                <div className="product-card-content">
                  <h5 className="title">Wireless Headphone</h5>
                  <h6 className="price mb-4 mt-3">Rs 2200</h6>
                  <div>
                    <div className="product-details d-flex flex-row align-items-center justify-content-between">
                      <h5>Brand:</h5>
                      <p className="mb-0">Apple</p>
                    </div>
                    <div className="product-details d-flex flex-row align-items-center justify-content-between">
                      <h5>Type:</h5>
                      <p className="mb-0">Headphones</p>
                    </div>
                    <div className="product-details d-flex flex-row align-items-center justify-content-between">
                      <h5>Availability:</h5>
                      <p className="mb-0">In Stock</p>
                    </div>
                    <div className="product-details d-flex flex-row align-items-center justify-content-between">
                      <h5>Color:</h5>
                      <Color/>
                    </div>
                    <div className="product-details d-flex flex-row align-items-center justify-content-between">
                      <h5>Size:</h5>
                      <div className="d-flex gap-10">
                        <p className="mb-0">M</p>
                        <p className="mb-0">L</p>
                        <p className="mb-0">XL</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-3">
              <div className="compare-product-card position-relative">
                <IoMdCloseCircleOutline className="position-absolute close-icon" />
                <div className="product-card-image">
                  <img
                    src={product}
                    alt="Compare Image"
                    className="img-fluid"
                  />
                </div>
                <div className="product-card-content">
                  <h5 className="title">Wireless Headphone</h5>
                  <h6 className="price mb-4 mt-3">Rs 2200</h6>
                  <div>
                    <div className="product-details d-flex flex-row align-items-center justify-content-between">
                      <h5>Brand:</h5>
                      <p className="mb-0">Apple</p>
                    </div>
                    <div className="product-details d-flex flex-row align-items-center justify-content-between">
                      <h5>Type:</h5>
                      <p className="mb-0">Headphones</p>
                    </div>
                    <div className="product-details d-flex flex-row align-items-center justify-content-between">
                      <h5>Availability:</h5>
                      <p className="mb-0">In Stock</p>
                    </div>
                    <div className="product-details d-flex flex-row align-items-center justify-content-between">
                      <h5>Color:</h5>
                      <Color/>
                    </div>
                    <div className="product-details d-flex flex-row align-items-center justify-content-between">
                      <h5>Size:</h5>
                      <div className="d-flex gap-10">
                        <p className="mb-0">M</p>
                        <p className="mb-0">L</p>
                        <p className="mb-0">XL</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-3">
              <div className="compare-product-card position-relative">
                <IoMdCloseCircleOutline className="position-absolute close-icon" />
                <div className="product-card-image">
                  <img
                    src={product}
                    alt="Compare Image"
                    className="img-fluid"
                  />
                </div>
                <div className="product-card-content">
                  <h5 className="title">Wireless Headphone</h5>
                  <h6 className="price mb-4 mt-3">Rs 2200</h6>
                  <div>
                    <div className="product-details d-flex flex-row align-items-center justify-content-between">
                      <h5>Brand:</h5>
                      <p className="mb-0">Apple</p>
                    </div>
                    <div className="product-details d-flex flex-row align-items-center justify-content-between">
                      <h5>Type:</h5>
                      <p className="mb-0">Headphones</p>
                    </div>
                    <div className="product-details d-flex flex-row align-items-center justify-content-between">
                      <h5>Availability:</h5>
                      <p className="mb-0">In Stock</p>
                    </div>
                    <div className="product-details d-flex flex-row align-items-center justify-content-between">
                      <h5>Color:</h5>
                      <Color/>
                    </div>
                    <div className="product-details d-flex flex-row align-items-center justify-content-between">
                      <h5>Size:</h5>
                      <div className="d-flex gap-10">
                        <p className="mb-0">M</p>
                        <p className="mb-0">L</p>
                        <p className="mb-0">XL</p>
                      </div>
                    </div>
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

export default CompareProduct;
