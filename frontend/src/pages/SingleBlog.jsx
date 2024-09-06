import "../CSS/SingleBlog.css";
import { Link } from "react-router-dom";
import BreadCrumb from "../components/BreadCrumb";
import Meta from "../components/Meta";
import blog from "../assets/blog.jpeg";
import { FaArrowLeft } from "react-icons/fa";

const SingleBlog = () => {
  return (
    <>
      <Meta title="Blogs" />
      <BreadCrumb title="Blogs" />
      <div className="blog-wrapper-2 py-5">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="singleBlog-card">
                <Link to="/blogs" className="d-flex align-items-center gap-10"><FaArrowLeft/> Back to Blogs</Link>
                <h3 className="title">Explore the Technology</h3>
                <img src={blog} alt="Blog" className="img-fluid w-100 my-4" />
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Temporibus, magnam, rerum quas quae, veritatis fuga ab fugit
                  quisquam ullam corporis suscipit necessitatibus.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SingleBlog;
