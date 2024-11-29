import { Table } from "antd";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCoupons,deleteCoupon } from "../features/coupon/couponSlice";
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
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCoupons());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
        <Link className="fs-3 text-danger">
          <CiEdit />
        </Link>
        <Link 
        onClick={() => {
          handleDelete(coupon?._id);
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
    </>
  );
};

export default Couponlist;
