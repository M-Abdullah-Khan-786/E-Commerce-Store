import { Table } from "antd";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrders } from "../features/auth/authSlice";
import { Link } from "react-router-dom";
import { CiEdit } from "react-icons/ci";
import { MdDeleteOutline } from "react-icons/md";

const columns = [
  {
    title: "Sr No",
    dataIndex: "key",
  },
  {
    title: "Name",
    dataIndex: "name",
  },
  {
    title: "Product",
    dataIndex: "product",
  },
  {
    title: "Amount",
    dataIndex: "amount",
  },
  {
    title: "Date",
    dataIndex: "date",
  },
  {
    title: "Status",
    dataIndex: "status",
  },
  {
    title: "Action",
    dataIndex: "action",
  },
];
const Orders = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllOrders());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { order } = useSelector((state) => state.auth.orders);

  const dataSource = Array.from({
    length: order?.length || 0,
  }).map((_, i) => ({
    key: i + 1,
    name: order[i]?.orderby.firstName || "N/A",
    product: order[i]?.products?.map((product, index) => {
      return (
        <>
          <ul key={index}>
            <li>{product.product.title}</li>{" "}
          </ul>
        </>
      );
    }),
    amount: order[i]?.orderstatus,
    date: new Date(order[i]?.createdAt).toLocaleString(),
    action: (
      <>
        <Link to="/edit" className="fs-3 text-danger">
          <CiEdit />
        </Link>
        <Link to="/delete" className="ms-3 fs-3 text-danger">
          <MdDeleteOutline />
        </Link>
      </>
    ),
  }));

  return (
    <>
      <div>
        <h3 className="mb-4 title">Orders List</h3>
        <div>
          <Table columns={columns} dataSource={dataSource} />
        </div>
      </div>
    </>
  );
};

export default Orders;
