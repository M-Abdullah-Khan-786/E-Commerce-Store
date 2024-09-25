import "../CSS/Dashboard.css";
import { FiArrowDownRight } from "react-icons/fi";
import { Column } from "@ant-design/plots";
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
  key: i+1,
  name: `Edward King ${i}`,
  product: `London, Park Lane no. ${i}`,
  status: 32,
}));

const data = [
  { type: "Jan", value: 0.16 },
  { type: "Feb", value: 0.125 },
  { type: "Mar", value: 0.24 },
  { type: "Apr", value: 0.19 },
  { type: "May", value: 0.22 },
  { type: "June", value: 0.05 },
  { type: "July", value: 0.01 },
  { type: "Aug", value: 0.015 },
  { type: "Sep", value: 0.015 },
  { type: "Oct", value: 0.015 },
  { type: "Nov", value: 0.015 },
  { type: "Dec", value: 0.015 },
];
const Dashboard = () => {
  const config = {
    data,
    xField: "type",
    yField: "value",
    style: {
      fill: ({ type }) => {
        if (type === "10-30分" || type === "30+分") {
          return "#22CBCC";
        }
        return "#2989FF";
      },
    },
    label: {
      text: (originData) => {
        const val = parseFloat(originData.value);
        if (val < 0.05) {
          return (val * 100).toFixed(1) + "%";
        }
        return "";
      },
      offset: 10,
    },
    legend: false,
  };

  return (
    <>
      <h3 className="mb-4">Dashboard</h3>
      <div className="d-flex justify-content-between align-items-center gap-3">
        <div className="d-flex justify-content-between align-items-center flex-grow-1 bg-white p-3 rounded-3">
          <div>
            <p className="mb-0">Total</p> <h4 className="mb-0">Rs 2200</h4>
          </div>
          <div className="d-flex flex-column align-items-end">
            <h6>
              <FiArrowDownRight /> 22%
            </h6>
            <p className="mb-0">Compare to Last Month</p>
          </div>
        </div>
        <div className="d-flex justify-content-between align-items-center flex-grow-1 bg-white p-3 rounded-3">
          <div>
            <p className="mb-0">Total</p> <h4 className="mb-0">Rs 2200</h4>
          </div>
          <div className="d-flex flex-column align-items-end">
            <h6 className="red">
              <FiArrowDownRight /> 22%
            </h6>
            <p className="mb-0">Compare to Last Month</p>
          </div>
        </div>
        <div className="d-flex justify-content-between align-items-center flex-grow-1 bg-white p-3 rounded-3">
          <div>
            <p className="mb-0">Total</p> <h4 className="mb-0">Rs 2200</h4>
          </div>
          <div className="d-flex flex-column align-items-end">
            <h6 className="green">
              <FiArrowDownRight /> 22%
            </h6>
            <p className="mb-0">Compare to Last Month</p>
          </div>
        </div>
      </div>
      <div className="mt-4">
        <h3 className="mb-4">Income Stats</h3>
        <div>
          <Column {...config} />
        </div>
      </div>
      <div className="mt-4">
        <h3 className="mb-4">Recent Orders</h3>
        <div>
          <Table columns={columns} dataSource={dataSource} />
        </div>
      </div>
      <div className="my-4">
        <h3 className="mb-4">
          Recent Reviews
        </h3>
        <div></div>
      </div>
    </>
  );
};

export default Dashboard;
