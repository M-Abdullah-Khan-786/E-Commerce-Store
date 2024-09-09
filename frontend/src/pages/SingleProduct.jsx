import "../CSS/SingleProduct.css";
import ReactStars from "react-rating-stars-component";
import BreadCrumb from "../components/BreadCrumb";
import Meta from "../components/Meta";
import ProductCard from "../components/ProductCard";
import { useState } from "react";

const SingleProduct = () => {
  const [orderProduct, setOrderProduct] = useState(true);
  return (
    <>
      <Meta title="Product" />
      <BreadCrumb title="Product" />
      <div className="main-product-wrapper py-5 home-wrapper-2">
        <div className="container">
          <div className="row">
            <div className="col-6"></div>
            <div className="col-6"></div>
          </div>
        </div>
      </div>
      <section className="description-wrapper home-wrapper-2 py-5">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="bg-white p-3">
                <h4>Description</h4>
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

      <section className="reviews-wrapper home-wrapper-2 py-5">
        <div className="container">
          <div className="row">
            <div className="col-12">
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
                    <a href="" className="text-dark text-decoration-underline">
                      Write a Review
                    </a>
                  </div>
                )}
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
