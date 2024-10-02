import { Table } from "antd";

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
    title: "Status",
    dataIndex: "status",
  },
];
const dataSource = Array.from({
  length: 46,
}).map((_, i) => ({
  key: i + 1,
  name: `Edward King ${i}`,
  product: `London, Park Lane no. ${i}`,
  status: 32,
}));

const Orders = () => {
  return (
    <>
      <div>
        <h3 className="mb-4 title">Orders List</h3>
        <div>
          <Table columns={columns} dataSource={dataSource} />
        </div>
      </div>
    </>
  )
}

export default Orders
