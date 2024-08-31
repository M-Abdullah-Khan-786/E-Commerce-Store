import "../CSS/Header.css";
import { NavLink, Link } from "react-router-dom";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Dropdown from "react-bootstrap/Dropdown";
import { FaSearch } from "react-icons/fa";
import { MdOutlineCompareArrows } from "react-icons/md";
import { FaHeart } from "react-icons/fa";
import { FaRegUser } from "react-icons/fa";
import { LiaCartArrowDownSolid } from "react-icons/lia";
import { CgMenuGridR } from "react-icons/cg";

const Header = () => {
  return (
    <>
      <header className="header-top py-3">
        <div className="container">
          <div className="row">
            <div className="col-6">
              <p className="text-white mb-0">
                Free Shipping over 2500Rs & Free Returns
              </p>
            </div>
            <div className="col-6">
              <p className="text-end text-white mb-0">
                Toll Free:{" "}
                <a
                  className="text-white text-decoration-none"
                  href="tel:+92421111111"
                >
                  <p>+92421111111</p>
                </a>
              </p>
            </div>
          </div>
        </div>
      </header>
      <header className="header-mid py-3">
        <div className="container">
          <div className="row align-items-baseline">
            <div className="col-2">
              <h2>
                <Link to="/" className="text-white text-decoration-none">E-Store</Link>
              </h2>
            </div>
            <div className="col-5">
              <InputGroup>
                <Form.Control
                  placeholder="Search Here"
                  aria-label="Search Here"
                  aria-describedby="basic-addon2"
                  className="form-control py-2"
                />
                <InputGroup.Text id="basic-addon2" className="bg-warning px-3">
                  <FaSearch className="fs-5" />
                </InputGroup.Text>
              </InputGroup>
            </div>
            <div className="col-5">
              <div className="header-mid-links d-flex align-items-center justify-content-between">
                <div>
                  <Link className="text-decoration-none text-white d-flex align-items-center gap-10">
                    <MdOutlineCompareArrows className="text-white links" />
                    <p className="mb-0">
                      Compare <br /> Products
                    </p>
                  </Link>
                </div>
                <div>
                  <Link className="text-decoration-none text-white d-flex align-items-center gap-10">
                    <FaHeart className="text-white links" />
                    <p className="mb-0">
                      Favourite <br /> Wishlist
                    </p>
                  </Link>
                </div>
                <div>
                  <Link className="text-decoration-none text-white d-flex align-items-center gap-10">
                    <FaRegUser className="text-white links" />
                    <p className="mb-0">
                      Log in <br /> My Account
                    </p>
                  </Link>
                </div>
                <div>
                  <Link className="text-decoration-none text-white d-flex align-items-center gap-10">
                    <LiaCartArrowDownSolid className="text-white links" />
                    <div className="d-flex flex-column">
                      <span className="badge bg-white text-dark">0</span>
                      <p className="mb-0">Rs 500</p>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
      <header className="header-bottom py-3">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="menu-bottom d-flex align-items-center gap-30">
                <div className="dropdown">
                  <Dropdown>
                    <Dropdown.Toggle id="dropdown-basic" className="d-flex align-items-center bg-transparent gap-10">
                      <CgMenuGridR className="menu-icon" />
                      <span className="me-5 d-inline-block">More Categories</span>
                    </Dropdown.Toggle>

                    <Dropdown.Menu className="dropdown-menu">
                      <Dropdown.Item className="dropdown-item text-white" href="#/action-1">Action</Dropdown.Item>
                      <Dropdown.Item className="dropdown-item text-white" href="#/action-2">
                        Another action
                      </Dropdown.Item>
                      <Dropdown.Item className="dropdown-item text-white" href="#/action-3">
                        Something else
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </div>
                <div className="menu-links">
                  <div className="d-flex align-items-center gap-15">
                    <NavLink to="/">Home</NavLink>
                    <NavLink to="/store">Our Store</NavLink>
                    <NavLink to="/blogs">Blogs</NavLink>
                    <NavLink to="/">Cart</NavLink>
                    <NavLink to="/">Inquiry</NavLink>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
