import { Table } from "antd";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getBlogs } from "../features/blog/blogSlice";
import { Link } from "react-router-dom";
import { CiEdit } from "react-icons/ci";
import { MdDeleteOutline } from "react-icons/md";

const columns = [
  {
    title: "Sr No",
    dataIndex: "key",
  },
  {
    title: "Title",
    dataIndex: "title",
    sorter: (a, b) => a.title.length - b.title.length,
    sortDirections: ["descend"],
  },
  {
    title: "Category",
    dataIndex: "category",
    sorter: (a, b) => a.category.length - b.category.length,
    sortDirections: ["descend"],
  },
  {
    title: "Action",
    dataIndex: "action",
  },
];

const Bloglist = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getBlogs());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const {blogs} = useSelector((state) => state.blog.blogs);

  const dataSource = Array.from({
    length: blogs?.length || 0,
  }).map((_, i) => ({
    key: i + 1,
    title: blogs[i]?.title || "N/A",
    category: blogs[i]?.category || "N/A",
    action: (
      <>
        <Link to="/edit" className="fs-3 text-danger">
          <CiEdit />
        </Link>
        <Link to="/delete" className="ms-3 fs-3 text-danger" >
          <MdDeleteOutline />
        </Link>
      </>
    ),
  }));
  return (
    <>
      <div>
        <h3 className="mb-4 title">Blogs List</h3>
        <div><Table columns={columns} dataSource={dataSource} /></div>
      </div>
    </>
  );
};

export default Bloglist;
