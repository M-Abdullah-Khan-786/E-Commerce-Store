import { useState } from "react";
import "../CSS/SingleProduct.css";
import ReactStars from "react-rating-stars-component";
import BreadCrumb from "../components/BreadCrumb";
import Meta from "../components/Meta";
import ProductCard from "../components/ProductCard";
import ReactImageZoom from "react-image-zoom";

const SingleProduct = () => {
  const [orderProduct, setOrderProduct] = useState(true);

  const props = {
    width: 400,
    height: 500,
    zoomWidth: 500,
    img: "https://images.unsplash.com/photo-1599012307530-d163bd04ecab?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  };

  return (
    <>
      <Meta title="Product" />
      <BreadCrumb title="Product" />
      <div className="main-product-wrapper py-5 home-wrapper-2">
        <div className="container">
          <div className="row">
            <div className="col-6">
              <div className="main-product-image">
                <div>
                  <ReactImageZoom {...props} />
                </div>
              </div>
              <div className="other-product-images d-flex flex-wrap gap-15">
                <div>
                  {" "}
                  <img
                    src="https://images.unsplash.com/photo-1599012307530-d163bd04ecab?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    alt=""
                    className="img-fluid"
                  />{" "}
                </div>
                <div>
                  {" "}
                  <img
                    src="https://images.unsplash.com/photo-1599012307530-d163bd04ecab?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    alt=""
                    className="img-fluid"
                  />{" "}
                </div>
                <div>
                  {" "}
                  <img
                    src="https://images.unsplash.com/photo-1599012307530-d163bd04ecab?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    alt=""
                    className="img-fluid"
                  />{" "}
                </div>
                <div>
                  {" "}
                  <img
                    src="https://images.unsplash.com/photo-1599012307530-d163bd04ecab?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    alt=""
                    className="img-fluid"
                  />{" "}
                </div>
              </div>
            </div>
            <div className="col-6">
              <div className="main-product-details">
                <div className="border-bottom">
                  <h3 className="title">Polo T-Shirts</h3>
                </div>
                <div className="border-bottom py-3">
                  <p className="price">Rs 2200</p>
                  <div className="d-flex align-items-center gap-10">
                  <ReactStars
                        count={5}
                        size={24}
                        value="4.5"
                        edit={false}
                        activeColor="#ffd700"
                      />
                      <p className="mb-0">4.5 out of 5</p>
                  </div>
                  <a href="#review">Write a Review</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <section className="description-wrapper home-wrapper-2 py-5">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <h4>Description</h4>
              <div className="bg-white p-3">
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Voluptas ullam, ratione sint sequi aliquid pariatur quas
                  molestiae autem saepe expedita atque veniam!
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="reviews-wrapper home-wrapper-2 p-5">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <h4  id="review">Reviews</h4>
              <div className="review-inner-wrapper">
                <div className="review-head d-flex justify-content-between align-items-end">
                  <div>
                    <h4 className="mb-2">Customer Reviews</h4>
                    <div className="d-flex align-items-center gap-10">
                      <ReactStars
                        count={5}
                        size={24}
                        value="4.5"
                        edit={false}
                        activeColor="#ffd700"
                      />
                      <p className="mb-0">4.5 out of 5</p>
                    </div>
                  </div>
                  {orderProduct && (
                    <div>
                      <a
                        href=""
                        className="text-dark text-decoration-underline"
                      >
                        Write a Review
                      </a>
                    </div>
                  )}
                </div>
                <div className="review-form py-4">
                  <form action="" className="d-flex flex-column gap-15">
                    <h4>Write a Review</h4>
                    <div>
                      <ReactStars
                        count={5}
                        size={24}
                        value="5"
                        edit={true}
                        activeColor="#ffd700"
                      />
                    </div>
                    <div>
                      <textarea
                        name=""
                        className="w-100 form-control"
                        cols="30"
                        rows="4"
                        id=""
                        placeholder="Write a Review"
                      ></textarea>
                    </div>
                    <div className="d-flex justify-content-end">
                      <button className="button" type="submit">
                        Submit Review
                      </button>
                    </div>
                  </form>
                </div>
                <div className="reviews mt-3">
                  <div className="review">
                    <div className="d-flex gap-10 align-items-center">
                      <h6 className="mb-0">buyer</h6>
                      <ReactStars
                        count={5}
                        size={24}
                        value="4.5"
                        edit={false}
                        activeColor="#ffd700"
                      />
                    </div>
                    <p className="mt-3">
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="popular-wrapper home-wrapper-2 py-5">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <h3 className="section-heading">Our Popular Products</h3>
            </div>

            <div className="row">
              <ProductCard />
              <ProductCard />
              <ProductCard />
              <ProductCard />
              <ProductCard />
              <ProductCard />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default SingleProduct;
