import { Table } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCoupons,deleteCoupon } from "../features/coupon/couponSlice";
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
    dataIndex: "name",
    sorter: (a, b) => a.name.length - b.name.length,
    sortDirections: ["descend"],
  },
  {
    title: "Discount",
    dataIndex: "discount",
  },
  {
    title: "Expiry",
    dataIndex: "expiry",
  },
  {
    title: "Action",
    dataIndex: "action",
  },
];

const Couponlist = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [couponToDelete, setCouponToDelete] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCoupons());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const showDeleteModal = (blogCategory) => {
    setCouponToDelete(blogCategory);
    setIsModalVisible(true);
  };

  const handleModalOk = () => {
    if (couponToDelete) {
      handleDelete(couponToDelete._id);
    }
    setIsModalVisible(false);
  };

  const handleModalCancel = () => {
    setIsModalVisible(false);
  };


  const Coupons = useSelector((state) => state.coupon.coupons.Coupons);

  const handleDelete = async (id) => {
    try {
      await dispatch(deleteCoupon(id));
      dispatch(getCoupons());
      toast.success("Coupon deleted successfully!");
    } catch (error) {
      toast.error("Error deleting coupon!");
      console.error(error);
    }
  };

  const dataSource = Coupons?.map((coupon, i) => ({
    key: i + 1,
    name: coupon?.name || "N/A",
    discount: coupon?.discount || "N/A",
    expiry:
      new Date(coupon?.expiry).toLocaleDateString("en-GB", {
        year: "numeric",
        month: "short",
        day: "numeric",
      }) || "N/A",
    action: (
      <>
        <Link to= {`/admin/coupon/${coupon?._id}`} className="fs-3 text-danger">
          <CiEdit />
        </Link>
        <Link 
       onClick={() => {
        showDeleteModal(coupon);
      }} className="ms-3 fs-3 text-danger">
          <MdDeleteOutline />
        </Link>
      </>
    ),
  }));

  return (
    <>
      <div>
        <h3 className="mb-4 title">Coupons List</h3>
        <div>
          <Table columns={columns} dataSource={dataSource} />
        </div>
      </div>
      <ConfirmDeleteModal
        visible={isModalVisible}
        onCancel={handleModalCancel}
        onConfirm={handleModalOk}
        name="coupon"
      />
    </>
  );
};

export default Couponlist;
