import "../CSS/ProductCard.css";
import { Link, useLocation } from "react-router-dom";
import product from "../assets/product.png";
import product1 from "../assets/product1.png";
import ReactStars from "react-rating-stars-component";
import { CiHeart } from "react-icons/ci";
import { FaEye } from "react-icons/fa";
import { MdCompareArrows } from "react-icons/md";
import PropTypes from "prop-types";

const ProductCard = ({ grid }) => {
  let location = useLocation();
  const gridClass = location.pathname === "/store" ? `gr-${grid}` : '';
  return (
    <>
      <div className={`${gridClass} col-3 mb-3`}>
        <Link to="/product/:id" className="Product-card position-relative">
          <div className="wishlist-icon position-absolute">
            <Link to="/">
              <CiHeart />
            </Link>
          </div>
          <div className="product-img">
            <img src={product1} alt="Product Image" className="img-fluid" />
            <img src={product} alt="Product Image" className="img-fluid" />
          </div>
          <div className="product-content">
            <h6 className="brand">Nike</h6>
            <h5 className="product-title">Wireless Headpones</h5>
            <ReactStars
              count={5}
              size={24}
              value="5"
              edit={false}
              activeColor="#ffd700"
            />
            <p className={`desc ${grid===12? "d-block": "d-none"}`}>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aspernatur nemo explicabo architecto dolores harum? Rem delectus aut, voluptate odio voluptates quisquam dolor.
            </p>
            <p className="price">Rs 1200</p>
          </div>
          <div className="action-bar position-absolute">
            <div className="d-flex flex-column gap-15">
              <Link to="/">
                <FaEye />
              </Link>
              <Link to="/">
                <MdCompareArrows />
              </Link>
              <Link to="/">
                <CiHeart />
              </Link>
            </div>
          </div>
        </Link>
      </div>
    </>
  );
};

ProductCard.propTypes = {
  grid: PropTypes.string.isRequired,
};

export default ProductCard;
