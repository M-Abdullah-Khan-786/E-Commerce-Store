import { Table } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getBlog, deleteBlogById } from "../features/blog/blogSlice";
import { Link } from "react-router-dom";
import { CiEdit } from "react-icons/ci";
import { MdDeleteOutline } from "react-icons/md";
import { toast } from "react-toastify";
import ConfirmDeleteModal from "../components/ConfirmDeleteModal";

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
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [blogToDelete, setBlogToDelete] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getBlog());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const showDeleteModal = (blogCategory) => {
    setBlogToDelete(blogCategory);
    setIsModalVisible(true);
  };

  const handleModalOk = () => {
    if (blogToDelete) {
      handleDelete(blogToDelete._id);
    }
    setIsModalVisible(false);
  };

  const handleModalCancel = () => {
    setIsModalVisible(false);
  };

  const handleDelete = async (id) => {
    try {
      await dispatch(deleteBlogById(id));
      dispatch(getBlog());
      toast.success("Blog deleted successfully!");
    } catch (error) {
      toast.error("Error deleting blog!");
      console.error(error);
    }
  };

  const {blogs} = useSelector((state) => state.blog.blogs);

  const dataSource = Array.from({
    length: blogs?.length || 0,
  }).map((_, i) => ({
    key: i + 1,
    title: blogs[i]?.title || "N/A",
    category: blogs[i]?.category || "N/A",
    action: (
      <>
        <Link to={`/admin/blog/update/${blogs[i]?._id}`} className="fs-3 text-danger">
          <CiEdit />
        </Link>
        <Link  onClick={() => {
            showDeleteModal(blogs[i]);
          }} className="ms-3 fs-3 text-danger" >
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
      <ConfirmDeleteModal
        visible={isModalVisible}
        onCancel={handleModalCancel}
        onConfirm={handleModalOk}
        name="blog"
      />
    </>
  );
};

export default Bloglist;
