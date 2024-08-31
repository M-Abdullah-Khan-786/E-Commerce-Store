import "../CSS/BlogCard.css";
import { Link } from "react-router-dom";
import blog from "../assets/blog.jpeg";

const BlogCard = () => {
  return (
    <>
      <div className="blog-card">
        <div className="blog-img">
          <img src={blog} alt="Blog Image" className="img-fluid w-100" />
        </div>
        <div className="blog-content">
          <p className="date">22 August 2024</p>
          <h5 className="title">My Blog</h5>
          <p className="desc">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel iure
            pariatur non minima, iste id, ut repellendus possimus, placeat
            nostrum sit. Vel!
          </p>
          <Link to="/" className="button text-decoration-none">
            Read more
          </Link>
        </div>
      </div>
    </>
  );
};

export default BlogCard;
