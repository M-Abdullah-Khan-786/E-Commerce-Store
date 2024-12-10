import { Table } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getBrands, deletebrand } from "../features/brand/brandSlice";
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
    title: "Action",
    dataIndex: "action",
  },
];

const Brandlist = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [brandToDelete, setBrandToDelete] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getBrands());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const showDeleteModal = (brand) => {
    setBrandToDelete(brand);
    setIsModalVisible(true);
  };

  const handleModalOk = () => {
    if (brandToDelete) {
      handleDelete(brandToDelete._id);
    }
    setIsModalVisible(false);
  };

  const handleModalCancel = () => {
    setIsModalVisible(false);
  };

  const handleDelete = async (id) => {
    try {
      await dispatch(deletebrand(id));
      dispatch(getBrands());
      toast.success("Brand deleted successfully!");
    } catch (error) {
      toast.error("Error deleting brand!");
      console.error(error);
    }
  };

  const { allBrand } = useSelector((state) => state.brand.brands);

  const dataSource = Array.from({
    length: allBrand?.length || 0,
  }).map((_, i) => ({
    key: i + 1,
    title: allBrand[i]?.title || "N/A",
    action: (
      <>
        <Link
          to={`/admin/brand/${allBrand[i]?._id}`}
          className="fs-3 text-danger"
        >
          <CiEdit />
        </Link>
        <Link
          onClick={() => {
            showDeleteModal(allBrand[i]);
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
        <h3 className="mb-4 title">Brands List</h3>
        <div>
          <Table columns={columns} dataSource={dataSource} />
        </div>
      </div>
      <ConfirmDeleteModal
        visible={isModalVisible}
        onCancel={handleModalCancel}
        onConfirm={handleModalOk}
        name="brand"
      />
    </>
  );
};

export default Brandlist;
