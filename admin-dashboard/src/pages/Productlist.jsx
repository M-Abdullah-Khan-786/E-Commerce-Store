import { Table } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getProducts,
  deleteProductById,
} from "../features/product/productSlice";
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
    title: "Name",
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
    title: "Brand",
    dataIndex: "brand",
    sorter: (a, b) => a.brand.length - b.brand.length,
    sortDirections: ["descend"],
  },
  {
    title: "Color",
    dataIndex: "color",
    sorter: (a, b) => a.color.length - b.color.length,
    sortDirections: ["descend"],
  },
  {
    title: "Price",
    dataIndex: "price",
    sorter: (a, b) => a.price.length - b.price.length,
    sortDirections: ["descend"],
  },
  {
    title: "Action",
    dataIndex: "action",
  },
];

const Productlist = () => {
  const dispatch = useDispatch();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  const showDeleteModal = (product) => {
    setProductToDelete(product);
    setIsModalVisible(true);
  };

  const handleModalOk = () => {
    if (productToDelete) {
      handleDelete(productToDelete._id);
    }
    setIsModalVisible(false);
  };

  const handleModalCancel = () => {
    setIsModalVisible(false);
  };

  const handleDelete = async (id) => {
    try {
      await dispatch(deleteProductById(id));
      dispatch(getProducts());
      toast.success("Product deleted successfully!");
    } catch (error) {
      toast.error("Error deleting product!");
      console.error(error);
    }
  };

  const { getAllproducts } = useSelector((state) => state.product.products);

  const dataSource = Array.from({
    length: getAllproducts?.length || 0,
  }).map((_, i) => ({
    key: i + 1,
    title: getAllproducts[i]?.title || "N/A",
    category: getAllproducts[i]?.category || "N/A",
    brand: getAllproducts[i]?.brand || "N/A",
    color: getAllproducts[i]?.color || "N/A",
    price: getAllproducts[i]?.price || "N/A",
    action: (
      <>
        <Link to={`/admin/product/update/${getAllproducts[i]?._id}`} className="fs-3 text-danger">
          <CiEdit />
        </Link>
        <Link
          onClick={() => {
            showDeleteModal(getAllproducts[i]);
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
        <h3 className="mb-4 title">Products List</h3>
        <div>
          <Table columns={columns} dataSource={dataSource} />
        </div>
      </div>
      <ConfirmDeleteModal
        visible={isModalVisible}
        onCancel={handleModalCancel}
        onConfirm={handleModalOk}
        name="product"
      />
    </>
  );
};

export default Productlist;
