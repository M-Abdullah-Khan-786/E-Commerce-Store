import { Table } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { CiEdit } from "react-icons/ci";
import { MdDeleteOutline } from "react-icons/md";
import {
  getCpoducts,
  deleteCpoducts,
} from "../features/product-category/pcategorySlice";
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

const ProductCategorylist = () => {
  const dispatch = useDispatch();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [productCategoryToDelete, setProductCategoryToDelete] = useState(null);

  useEffect(() => {
    dispatch(getCpoducts());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const showDeleteModal = (poductCategory) => {
    setProductCategoryToDelete(poductCategory);
    setIsModalVisible(true);
  };

  const handleModalOk = () => {
    if (productCategoryToDelete) {
      handleDelete(productCategoryToDelete._id);
    }
    setIsModalVisible(false);
  };

  const handleModalCancel = () => {
    setIsModalVisible(false);
  };

  const handleDelete = async (id) => {
    try {
      await dispatch(deleteCpoducts(id));
      dispatch(getCpoducts());
      toast.success("Product category deleted successfully!");
    } catch (error) {
      toast.error("Error deleting Product category!");
      console.error(error);
    }
  };

  const { allCategory } = useSelector(
    (state) => state.productCategory.productsCategory
  );

  const dataSource = Array.from({
    length: allCategory?.length || 0,
  }).map((_, i) => ({
    key: i + 1,
    title: allCategory[i]?.title || "N/A",
    action: (
      <>
        <Link
          to={`/admin/product-category/${allCategory[i]?._id}`}
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
        <h3 className="mb-4 title">Product Categories</h3>
        <div>
          <Table columns={columns} dataSource={dataSource} />
        </div>
      </div>
      <ConfirmDeleteModal
        visible={isModalVisible}
        onCancel={handleModalCancel}
        onConfirm={handleModalOk}
        name="product category"
      />
    </>
  );
};

export default ProductCategorylist;
