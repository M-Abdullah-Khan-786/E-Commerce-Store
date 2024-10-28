import { Table } from "antd";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getPoducts,
  deleteProductById,
} from "../features/product/productSlice";
import { Link } from "react-router-dom";
import { CiEdit } from "react-icons/ci";
import { MdDeleteOutline } from "react-icons/md";
import { toast } from "react-toastify";

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

  useEffect(() => {
    dispatch(getPoducts());
  }, [dispatch]);

  const handleDelete = async (id) => {
    try {
      await dispatch(deleteProductById(id));
      dispatch(getPoducts());
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
        <Link to="/edit" className="fs-3 text-danger">
          <CiEdit />
        </Link>
        <Link
          onClick={() => {
            handleDelete(getAllproducts[i]?._id);
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
    </>
  );
};

export default Productlist;
