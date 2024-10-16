import { Table } from "antd";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getInquiry } from "../features/Inquiry/inquirySlice";
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
    sorter: (a, b) => a.name.length - b.name.length,
    sortDirections: ["descend"],
  },
  {
    title: "Email",
    dataIndex: "email",
  },
  {
    title: "Phone",
    dataIndex: "phone",
  },
  {
    title: "Comment",
    dataIndex: "comment",
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

const Inquiries = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getInquiry());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { allInquiry } = useSelector((state) => state.inquiry.inquiry);

  const dataSource = Array.from({
    length: allInquiry?.length || 0,
  }).map((_, i) => ({
    key: i + 1,
    name: allInquiry[i]?.name || "N/A",
    email: allInquiry[i]?.email || "N/A",
    phone: allInquiry[i]?.phone || "N/A",
    comment: allInquiry[i]?.comment || "N/A",
    status: (
      <>
      <select name="" id="" className="form-control form-select" >
        <option value={allInquiry[i]?.status}>Select Status</option>
        <option value="Pending">Pending</option>
        <option value="Resolved">Resolved</option>
        <option value="Closed">Closed</option>
      </select>
      </>
    ),
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
        <h3 className="mb-4 title">Inquiries</h3>
        <div>
          <Table columns={columns} dataSource={dataSource} />
        </div>
      </div>
    </>
  );
};

export default Inquiries;
