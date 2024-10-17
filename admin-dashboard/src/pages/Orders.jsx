// import { Table } from "antd";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrders } from "../features/auth/authSlice";
// import { Link } from "react-router-dom";
// import { CiEdit } from "react-icons/ci";
// import { MdDeleteOutline } from "react-icons/md";


// const columns = [
//   {
//     title: "Sr No",
//     dataIndex: "key",
//   },
//   {
//     title: "Name",
//     dataIndex: "name",
//   },
//   {
//     title: "Product",
//     dataIndex: "product",
//   },
//   {
//     title: "Status",
//     dataIndex: "status",
//   },
// ];
// const dataSource = Array.from({
//   length: 46,
// }).map((_, i) => ({
//   key: i + 1,
//   name: `Edward King ${i}`,
//   product: `London, Park Lane no. ${i}`,
//   status: 32,
// }));

const Orders = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllOrders());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // const {blogs} = useSelector((state) => state.blog.blogs);

  const {order} = useSelector((state) => state.auth.orders);

  console.log(order)

  return (
    <>
      <div>
        <h3 className="mb-4 title">Orders List</h3>
        <div>
          {/* <Table columns={columns} dataSource={dataSource} /> */}
        </div>
      </div>
    </>
  )
}

export default Orders
