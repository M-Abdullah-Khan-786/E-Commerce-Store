import "../CSS/SpecialProduct.css";
import { Link } from "react-router-dom";
import ReactStars from "react-rating-stars-component";
import product from "../assets/product1.png";

const SpecialProduct = () => {
  return (
    <>
      <div className="col-6 mb-3">
        <div className="special-product-card">
          <div className="d-flex justify-content-between">
            <div>
              <img src={product} alt="Product Image" className="img-fluid" />
            </div>
            <div className="special-product-content">
              <h5 className="brand">Nike</h5>
              <h6 className="title">
                Wireless Headpones with noise Cancellation
              </h6>
              <ReactStars
                count={5}
                size={24}
                value="5"
                edit={false}
                activeColor="#ffd700"
              />
              <p className="price">
                <span className="red-p">Rs 1500</span>&nbsp;{" "}
                <strike>Rs 2500</strike>
              </p>
              <div className="discount-till d-flex align-items-center gap-10">
                <p className="mb-0">
                  <b>22 days</b>
                </p>
                <div className="d-flex gap-10 align-items-center">
                  <span className="badge rounded-circle p-3 bg-danger">4</span>:
                  <span className="badge rounded-circle p-3 bg-danger">5</span>:
                  <span className="badge rounded-circle p-3 bg-danger">5</span>
                </div>
              </div>
              <div className="product-count my-3">
                <p>Stock: 22</p>
                <div className="progress">
                  <div
                    className="progress-bar bg-warning"
                    role="progressbar"
                    style={{ width: "25%" }}
                    aria-valuenow="25"
                    aria-valuemin="0"
                    aria-valuemax="100"
                  ></div>
                </div>
              </div>
              <Link className="button text-decoration-none">Add to Cart</Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SpecialProduct;
