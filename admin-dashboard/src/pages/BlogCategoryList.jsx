import { Table } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { CiEdit } from "react-icons/ci";
import { MdDeleteOutline } from "react-icons/md";
import {
  getCblogs,
  deleteCblogs,
} from "../features/blog-category/bcategorySlice";
import { toast } from "react-toastify";
import ConfirmDeleteModal from "../components/ConfirmDeleteModal";

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
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [blogCategoryToDelete, setBlogCategoryToDelete] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCblogs());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const showDeleteModal = (blogCategory) => {
    setBlogCategoryToDelete(blogCategory);
    setIsModalVisible(true);
  };

  const handleModalOk = () => {
    if (blogCategoryToDelete) {
      handleDelete(blogCategoryToDelete._id);
    }
    setIsModalVisible(false);
  };

  const handleModalCancel = () => {
    setIsModalVisible(false);
  };

  const handleDelete = async (id) => {
    try {
      await dispatch(deleteCblogs(id));
      dispatch(getCblogs());
      toast.success("Blog category deleted successfully!");
    } catch (error) {
      toast.error("Error deleting Blog category!");
      console.error(error);
    }
  };

  const { allCategory } = useSelector(
    (state) => state.blogCategory.blogsCategory
  );

  const dataSource = Array.from({
    length: allCategory?.length || 0,
  }).map((_, i) => ({
    key: i + 1,
    title: allCategory[i]?.title || "N/A",
    action: (
      <>
        <Link
          to={`/admin/blog-category/update/${allCategory[i]?._id}`}
          className="fs-3 text-danger"
        >
          <CiEdit />
        </Link>
        <Link
          onClick={() => {
            showDeleteModal(allCategory[i]);
          }}
          className="ms-3 fs-3 text-danger"
        >
          <MdDeleteOutline />
        </Link>
      </>
    ),
  }));
  return (
    <>
      <div>
        <h3 className="mb-4 title">Blogs Categories</h3>
        <div>
          <Table columns={columns} dataSource={dataSource} />
        </div>
      </div>
      <ConfirmDeleteModal
        visible={isModalVisible}
        onCancel={handleModalCancel}
        onConfirm={handleModalOk}
        name="blog category"
      />
    </>
  );
};

export default BlogCategoryList;
