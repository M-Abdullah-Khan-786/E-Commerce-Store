import "../CSS/Dashboard.css";
import { FiArrowDownRight } from "react-icons/fi";

const Dashboard = () => {
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
    </>
  );
};

export default Dashboard;
