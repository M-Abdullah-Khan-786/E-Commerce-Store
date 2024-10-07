import { Table } from "antd";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUsers } from "../features/customer/customerSlice";

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
    title: "Email Address",
    dataIndex: "email",
  },
  {
    title: "Phone Number",
    dataIndex: "phone",
  },
];


const Customers = () => {
  const dispatch = useDispatch();

useEffect(() => {
  dispatch(getUsers());
  // eslint-disable-next-line react-hooks/exhaustive-deps
}, []);

const { users } = useSelector((state) => state.customer.customers) || { users: [] };

const dataSource = Array.from({
  length: users?.length || 0,  // Ensure length is defined
}).map((_, i) => ({
  key: i + 1,
  name: users[i]?.firstName || 'N/A', 
  email: users[i]?.email || 'N/A',
  phone: users[i]?.phone || 'N/A',
}));

  return (
    <>
      <div>
        <h3 className="mb-4 title">Customers List</h3>
        <div>
          <Table columns={columns} dataSource={dataSource} />
        </div>
      </div>
    </>
  )
}

export default Customers
