import BreadCrumb from "../components/BreadCrumb";
import Meta from "../components/Meta";
import "../CSS/Store.css";

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
                <div>
                  <h5 className="sub-title"></h5>
                </div>
                <div>
                  <h5 className="sub-title"></h5>
                </div>
                <div>
                  <h5 className="sub-title"></h5>
                </div>
              </div>
              <div className="filter-card mb-3">
                <h3 className="filter-title">Product Tags</h3>
              </div>
              <div className="filter-card mb-3">
                <h3 className="filter-title">Random Products</h3>
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
