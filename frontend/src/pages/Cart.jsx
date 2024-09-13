import "../CSS/Cart.css";
import Meta from "../components/Meta";
import BreadCrumb from "../components/BreadCrumb";
import { MdDelete } from "react-icons/md";
import product from "../assets/product.png";
import { Link } from "react-router-dom";

const Cart = () => {
  return (
    <>
      <Meta title="Cart" />
      <BreadCrumb title="Cart" />
      <section className="cart-wrapper home-wrapper-2 py-5">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="cart-header py-3 d-flex justify-content-between align-content-center">
                <h4 className="cart-col-1">Product</h4>
                <h4 className="cart-col-2">Price</h4>
                <h4 className="cart-col-3">Quantity</h4>
                <h4 className="cart-col-4">Total</h4>
              </div>
              <div className="cart-content py-3 d-flex justify-content-between align-items-center">
                <div className="cart-col-1 d-flex align-items-center  gap-15">
                  <div className="w-25">
                    <img
                      src={product}
                      alt="cart-product"
                      className="img-fluid"
                    />
                  </div>
                  <div className="w-75">
                    <p>Wireless Headphones</p>
                    <p>Size: </p>
                    <p>Color: </p>
                  </div>
                </div>
                <div className="cart-col-2">
                  <h5 className="price">Rs. 2200.00</h5>
                </div>
                <div className="cart-col-3 d-flex align-items-center gap-15">
                  <div>
                    <input
                      className="form-control bg-white"
                      type="number"
                      name=""
                      id=""
                      min={1}
                      max={10}
                      defaultValue={1}
                    />
                  </div>
                  <div>
                    <MdDelete className="text-danger fs-4" />
                  </div>
                </div>
                <div className="cart-col-4">
                  <h5 className="price">Rs. 2200.00</h5>
                </div>
              </div>
              <div className="col-12 py-2 mt-4">
                <div className="d-flex justify-content-between align-items-baseline">
                <Link to="/store" className="button">Continue Shopping</Link>
                <div className="d-flex flex-column align-items-end">
                    <h4>Subtotal: Rs. 2200.00</h4>
                <Link to="/checkout" className="button">Checkout</Link>

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

export default Cart;
