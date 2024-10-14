import { Table } from "antd";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { CiEdit } from "react-icons/ci";
import { MdDeleteOutline } from "react-icons/md";
import {getCblogs  } from "../features/blog-category/bcategorySlice";

const columns = [
  {
    title: "Sr No",
    dataIndex: "key",
  },
  {
    title: "Name",
    dataIndex: "title",
    sorter: (a, b) => a.title.length - b.title.length,
    sortDirections: ["descend"],
  },
  {
    title: "Action",
    dataIndex: "action",
  },
];

const BlogCategoryList = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCblogs());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const {allCategory }= useSelector((state) => state.blogCategory.blogssCategory);

  const dataSource = Array.from({
    length: allCategory?.length || 0,
  }).map((_, i) => ({
    key: i + 1,
    title: allCategory[i]?.title || "N/A",
    action: (
      <>
        <Link to="/edit" className="fs-3 text-danger">
          <CiEdit />
        </Link>
        <Link to="/delete" className="ms-3 fs-3 text-danger" >
          <MdDeleteOutline />
        </Link>
      </>
    )
  }));
  return (
    <>
      <div>
        <h3 className="mb-4 title">Blogs Categories</h3>
        <div>
          <Table columns={columns} dataSource={dataSource} />
        </div>
      </div>
    </>
  )
}

export default BlogCategoryList
