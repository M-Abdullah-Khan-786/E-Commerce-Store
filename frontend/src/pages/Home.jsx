import "../CSS/Home.css";
import { Link } from "react-router-dom";
import Marquee from "react-fast-marquee";
import image1 from "../assets/main-banner-1.jpg";
import product from "../assets/product.png";
import camera from "../assets/camera.jpg";
import brand1 from "../assets/brand1.png";
import BlogCard from "../components/BlogCard";
import ProductCard from "../components/ProductCard";
import SpecialProduct from "../components/SpecialProduct";
import Meta from "../components/Meta";
import { services } from "../utils/Data";

const Home = () => {
  return (
    <>
      <Meta title="Home" />
      <section className="home-wrapper-1 py-5">
        <div className="container">
          <div className="row">
            <div className="col-6">
              <div className="main-banner position-relative">
                <img
                  src={image1}
                  alt="main-banner"
                  className="img-fluid rounded-3"
                />
                <div className="main-banner-content position-absolute">
                  <h4 className="text-white">SUPERCHARGED</h4>
                  <h5 className="text-white">FOR ALL PRODUCTS</h5>
                  <p className="text-white">From Rs 10,000</p>
                  <Link to="/" className="button text-decoration-none">
                    BUY NOW
                  </Link>
                </div>
              </div>
            </div>
            <div className="col-6">
              <div className="d-flex flex-wrap gap-10 justify-content-between align-items-center">
                <div className="small-banner position-relative">
                  <img
                    src={image1}
                    alt="main-banner"
                    className="img-fluid rounded-3"
                  />
                  <div className="small-banner-content position-absolute">
                    <h4 className="text-white">SUPERCHARGED</h4>
                    <h5 className="text-white">FOR ALL PRODUCTS</h5>
                    <p className="text-white">From Rs 10,000</p>
                  </div>
                </div>
                <div className="small-banner position-relative">
                  <img
                    src={image1}
                    alt="main-banner"
                    className="img-fluid rounded-3"
                  />
                  <div className="small-banner-content position-absolute">
                    <h4 className="text-white">SUPERCHARGED</h4>
                    <h5 className="text-white">FOR ALL PRODUCTS</h5>
                    <p className="text-white">From Rs 10,000</p>
                  </div>
                </div>
                <div className="small-banner position-relative">
                  <img
                    src={image1}
                    alt="main-banner"
                    className="img-fluid rounded-3"
                  />
                  <div className="small-banner-content position-absolute">
                    <h4 className="text-white">SUPERCHARGED</h4>
                    <h5 className="text-white">FOR ALL PRODUCTS</h5>
                    <p className="text-white">From Rs 10,000</p>
                  </div>
                </div>
                <div className="small-banner position-relative">
                  <img
                    src={image1}
                    alt="main-banner"
                    className="img-fluid rounded-3"
                  />
                  <div className="small-banner-content position-absolute">
                    <h4 className="text-white">SUPERCHARGED</h4>
                    <h5 className="text-white">FOR ALL PRODUCTS</h5>
                    <p className="text-white">From Rs 10,000</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="home-wrapper-2 py-5">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="services d-flex align-items-center justify-content-between">
                {services.map((service, id)=>{
                  return(
                    <div className="d-flex align-items-center gap-15" key={id}>
                    <service.icon className="services-icon" />
                    <div>
                      <h6>{service.title}</h6>
                      <p className="mb-0">{service.tagline}</p>
                    </div>
                  </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="home-wrapper-2 py-5">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="categories d-flex justify-content-between flex-wrap align-items-center">
                <div className="d-flex gap-30 align-items-center">
                  <div>
                    <h5>Cameras</h5>
                    <p>Discover the latest cameras</p>
                  </div>
                  <img
                    src={camera}
                    alt="camera"
                    className="img-fluid category-img"
                  />
                </div>
                <div className="d-flex gap-30 align-items-center">
                  <div>
                    <h5>Cameras</h5>
                    <p>Discover the latest cameras</p>
                  </div>
                  <img
                    src={camera}
                    alt="camera"
                    className="img-fluid category-img"
                  />
                </div>
                <div className="d-flex gap-30 align-items-center">
                  <div>
                    <h5>Cameras</h5>
                    <p>Discover the latest cameras</p>
                  </div>
                  <img
                    src={camera}
                    alt="camera"
                    className="img-fluid category-img"
                  />
                </div>
                <div className="d-flex gap-30 align-items-center">
                  <div>
                    <h5>Cameras</h5>
                    <p>Discover the latest cameras</p>
                  </div>
                  <img
                    src={camera}
                    alt="camera"
                    className="img-fluid category-img"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="feature-wrapper home-wrapper-2 py-5">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <h3 className="section-heading">Featured Collections</h3>
            </div>
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
          </div>
        </div>
      </section>
      <section className="feature-wrapper home-wrapper-2 py-5">
        <div className="container">
          <div className="row">
            <div className="col-3">
              <div className="famous-card bg-dark position-relative">
                <img src={product} alt="Famous Images" className="img-fluid" />
                <div className="famous-content position-absolute">
                  <h5>Noise Cancellation</h5>
                  <h6>Wireless Headphone</h6>
                  <p>2000 Rs</p>
                </div>
              </div>
            </div>
            <div className="col-3">
              <div className="famous-card bg-dark position-relative">
                <img src={product} alt="Famous Images" className="img-fluid" />
                <div className="famous-content position-absolute">
                  <h5>Noise Cancellation</h5>
                  <h6>Wireless Headphone</h6>
                  <p>2000 Rs</p>
                </div>
              </div>
            </div>
            <div className="col-3">
              <div className="famous-card bg-dark position-relative">
                <img src={product} alt="Famous Images" className="img-fluid" />
                <div className="famous-content position-absolute">
                  <h5>Noise Cancellation</h5>
                  <h6>Wireless Headphone</h6>
                  <p>2000 Rs</p>
                </div>
              </div>
            </div>
            <div className="col-3">
              <div className="famous-card bg-dark position-relative">
                <img src={product} alt="Famous Images" className="img-fluid" />
                <div className="famous-content position-absolute">
                  <h5>Noise Cancellation</h5>
                  <h6>Wireless Headphone</h6>
                  <p>2000 Rs</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="special-wrapper home-wrapper-2 py-5">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <h3 className="section-heading">Special Products</h3>
            </div>
          </div>
          <div className="row">
            <SpecialProduct />
            <SpecialProduct />
            <SpecialProduct />
            <SpecialProduct />
            <SpecialProduct />
            <SpecialProduct />
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
      <section className="marquee-wrapper home-wrapper-2 py-5">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="marquee-inner-wrapper card-wrapper">
                <Marquee className="d-flex">
                  <div className="mx-4 w-25">
                    <img
                      src={brand1}
                      alt="brand-Images"
                      className="img-fluid"
                    />
                  </div>
                  <div className="mx-4 w-25">
                    <img
                      src={brand1}
                      alt="brand-Images"
                      className="img-fluid"
                    />
                  </div>
                  <div className="mx-4 w-25">
                    <img
                      src={brand1}
                      alt="brand-Images"
                      className="img-fluid"
                    />
                  </div>
                  <div className="mx-4 w-25">
                    <img
                      src={brand1}
                      alt="brand-Images"
                      className="img-fluid"
                    />
                  </div>
                  <div className="mx-4 w-25">
                    <img
                      src={brand1}
                      alt="brand-Images"
                      className="img-fluid"
                    />
                  </div>
                  <div className="mx-4 w-25">
                    <img
                      src={brand1}
                      alt="brand-Images"
                      className="img-fluid"
                    />
                  </div>
                  <div className="mx-4 w-25">
                    <img
                      src={brand1}
                      alt="brand-Images"
                      className="img-fluid"
                    />
                  </div>
                  <div className="mx-4 w-25">
                    <img
                      src={brand1}
                      alt="brand-Images"
                      className="img-fluid"
                    />
                  </div>
                </Marquee>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="blog-wrapper home-wrapper-2 py-5">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <h3 className="section-heading">Blogs</h3>
            </div>
          </div>
          <div className="row">
            <div className="col-3 mb-3">
              <BlogCard />
            </div>
            <div className="col-3 mb-3">
              <BlogCard />
            </div>
            <div className="col-3 mb-3">
              <BlogCard />
            </div>
            <div className="col-3 mb-3">
              <BlogCard />
            </div>
            <div className="col-3 mb-3">
              <BlogCard />
            </div>
            <div className="col-3 mb-3">
              <BlogCard />
            </div>
            <div className="col-3 mb-3">
              <BlogCard />
            </div>
            <div className="col-3 mb-3">
              <BlogCard />
            </div>
            <div className="col-3 mb-3">
              <BlogCard />
            </div>
            <div className="col-3 mb-3">
              <BlogCard />
            </div>
            <div className="col-3 mb-3">
              <BlogCard />
            </div>
            <div className="col-3 mb-3">
              <BlogCard />
            </div>
            <div className="col-3 mb-3">
              <BlogCard />
            </div>
            <div className="col-3 mb-3">
              <BlogCard />
            </div>
            <div className="col-3 mb-3">
              <BlogCard />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
