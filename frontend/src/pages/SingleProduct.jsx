import { useState } from "react";
import "../CSS/SingleProduct.css";
import ReactStars from "react-rating-stars-component";
import BreadCrumb from "../components/BreadCrumb";
import Meta from "../components/Meta";
import Color from "../components/Color";
import ProductCard from "../components/ProductCard";
import ReactImageZoom from "react-image-zoom";
import { MdCompareArrows } from "react-icons/md";
import { CiHeart } from "react-icons/ci";

const SingleProduct = () => {
  const [orderProduct, setOrderProduct] = useState(true);

  const props = {
    width: 400,
    height: 600,
    zoomWidth: 600,
    img: "https://images.unsplash.com/photo-1599012307530-d163bd04ecab?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  };

  const copyToClipboard = (text) => {
    var textField = document.createElement('textarea')
    textField.innerText = text
    document.body.appendChild(textField)
    textField.select()
    document.execCommand('copy')
    textField.remove()
  }

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
            <div className="col-6 py-10">
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
                    <p className="mb-0 review-text">4.5 out of 5</p>
                  </div>
                  <a href="#review" className="review-btn">
                    Write a Review
                  </a>
                </div>
                <div className="border-bottom py-3">
                  <div className="my-2 d-flex gap-10 align-items-center">
                    <h3 className="mb-0 product-head">Type : </h3>
                    <p className="mb-0 product-content">T-Shirt</p>
                  </div>
                  <div className="my-2 d-flex gap-10 align-items-center">
                    <h3 className="mb-0 product-head">Brand : </h3>
                    <p className="mb-0 product-content">POLO</p>
                  </div>
                  <div className="my-2 d-flex gap-10 align-items-center">
                    <h3 className="mb-0 product-head">Category : </h3>
                    <p className="mb-0 product-content">Clothes</p>
                  </div>
                  <div className="my-2 d-flex gap-10 align-items-center">
                    <h3 className="mb-0 product-head">Tags : </h3>
                    <p className="mb-0 product-content">Dress, Clothes</p>
                  </div>
                  <div className="my-2 d-flex gap-10 align-items-center">
                    <h3 className="mb-0 product-head">Availability : </h3>
                    <p className="mb-0 product-content">In Stock</p>
                  </div>
                  <div className="mt-2 mb-3 d-flex flex-column gap-10">
                    <h3 className="mb-0 product-head">Size : </h3>
                    <div className="d-flex flex-wrap gap-10">
                      <span className="badge border border-1 bg-white text-dark border-secondary">
                        SM
                      </span>
                      <span className="badge border border-1 bg-white text-dark border-secondary">
                        XL
                      </span>
                      <span className="badge border border-1 bg-white text-dark border-secondary">
                        XXL
                      </span>
                    </div>
                  </div>
                  <div className="mt-2 mb-3 d-flex flex-column gap-10">
                    <h3 className="mb-0 product-head">Color : </h3>
                    <Color />
                  </div>
                  <div className="mt-2 mb-3 d-flex flex-row gap-15 align-items-center">
                    <h3 className="mb-0 product-head">Quantity : </h3>
                    <div>
                      <input
                        type="number"
                        name=""
                        min={1}
                        max={10}
                        defaultValue={1}
                        className="form-control"
                        style={{ width: "65px" }}
                        id=""
                      />
                    </div>
                    <div className="d-flex align-items-center gap-10 ms-5">
                      <button className="button border-0" type="submit">
                        Add to Cart
                      </button>
                      <button className="button">
                        Buy Now
                      </button>
                    </div>
                  </div>
                  <div className="d-flex align-items-center gap-15">
                    <div><a href=""><MdCompareArrows className="fs-5" /> Add to Compare</a></div>
                    <div><a href=""><CiHeart className="fs-5" /> Add to Wishlist</a></div>
                  </div>
                  <div className="my-3 d-flex flex-column gap-10">
                    <h3 className="mb-0 product-head">Shipping & Returns</h3>
                    <p className="mb-0 product-content">Free return of the product. <br/>
                    30 days of reflection after receiving the product.</p>
                  </div>
                  <div className="my-2 d-flex align-items-center gap-10">
                    <h3 className="mb-0 product-head">Product Link : </h3>
                    <a href="javascript:void(0)" onClick={()=>copyToClipboard("https://images.unsplash.com/photo-1599012307530-d163bd04ecab?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")} >Copy Link</a>
                  </div>
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
              <h4 id="review">Reviews</h4>
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
