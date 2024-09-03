import "../CSS/Wishlist.css"
import BreadCrumb from "../components/BreadCrumb";
import Meta from "../components/Meta";
import product from "../assets/product.png";
import { IoMdCloseCircleOutline } from "react-icons/io";

const Wishlist = () => {
  return (
    <>
      <Meta title="Wishlist" />
      <BreadCrumb title="Wishlist" />
      <div className="wishlist-wrapper home-wrapper-2 py-5">
        <div className="container">
          <div className="row">
            <div className="col-3 mb-3">
              <div className="wishlist-card position-relative">
                <IoMdCloseCircleOutline className="position-absolute close-icon" />
                <div className="wishlist-img">
                    <img src={product} alt="Wishlist Image" className="img-fluid w-100 bg-white" />
                </div>
                <div className="wishlist-content p-3">
                  <h5 className="title">Wireless Headphone</h5>
                  <h6 className="proce">Rs 2200</h6>
                  </div>
              </div>
            </div>
            <div className="col-3 mb-3">
              <div className="wishlist-card position-relative">
                <IoMdCloseCircleOutline className="position-absolute close-icon" />
                <div className="wishlist-img">
                    <img src={product} alt="Wishlist Image" className="img-fluid w-100 bg-white" />
                </div>
                <div className="wishlist-content p-3">
                  <h5 className="title">Wireless Headphone</h5>
                  <h6 className="proce">Rs 2200</h6>
                  </div>
              </div>
            </div>
            <div className="col-3 mb-3">
              <div className="wishlist-card position-relative">
                <IoMdCloseCircleOutline className="position-absolute close-icon" />
                <div className="wishlist-img">
                    <img src={product} alt="Wishlist Image" className="img-fluid w-100 bg-white" />
                </div>
                <div className="wishlist-content p-3">
                  <h5 className="title">Wireless Headphone</h5>
                  <h6 className="proce">Rs 2200</h6>
                  </div>
              </div>
            </div>
            <div className="col-3 mb-3">
              <div className="wishlist-card position-relative">
                <IoMdCloseCircleOutline className="position-absolute close-icon" />
                <div className="wishlist-img">
                    <img src={product} alt="Wishlist Image" className="img-fluid w-100 bg-white" />
                </div>
                <div className="wishlist-content p-3">
                  <h5 className="title">Wireless Headphone</h5>
                  <h6 className="proce">Rs 2200</h6>
                  </div>
              </div>
            </div>
            <div className="col-3 mb-3">
              <div className="wishlist-card position-relative">
                <IoMdCloseCircleOutline className="position-absolute close-icon" />
                <div className="wishlist-img">
                    <img src={product} alt="Wishlist Image" className="img-fluid w-100 bg-white" />
                </div>
                <div className="wishlist-content p-3">
                  <h5 className="title">Wireless Headphone</h5>
                  <h6 className="proce">Rs 2200</h6>
                  </div>
              </div>
            </div>
            <div className="col-3 mb-3">
              <div className="wishlist-card position-relative">
                <IoMdCloseCircleOutline className="position-absolute close-icon" />
                <div className="wishlist-img">
                    <img src={product} alt="Wishlist Image" className="img-fluid w-100 bg-white" />
                </div>
                <div className="wishlist-content p-3">
                  <h5 className="title">Wireless Headphone</h5>
                  <h6 className="proce">Rs 2200</h6>
                  </div>
              </div>
            </div>
            <div className="col-3 mb-3">
              <div className="wishlist-card position-relative">
                <IoMdCloseCircleOutline className="position-absolute close-icon" />
                <div className="wishlist-img">
                    <img src={product} alt="Wishlist Image" className="img-fluid w-100 bg-white" />
                </div>
                <div className="wishlist-content p-3">
                  <h5 className="title">Wireless Headphone</h5>
                  <h6 className="proce">Rs 2200</h6>
                  </div>
              </div>
            </div>
            <div className="col-3 mb-3">
              <div className="wishlist-card position-relative">
                <IoMdCloseCircleOutline className="position-absolute close-icon" />
                <div className="wishlist-img">
                    <img src={product} alt="Wishlist Image" className="img-fluid w-100 bg-white" />
                </div>
                <div className="wishlist-content p-3">
                  <h5 className="title">Wireless Headphone</h5>
                  <h6 className="proce">Rs 2200</h6>
                  </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Wishlist;
