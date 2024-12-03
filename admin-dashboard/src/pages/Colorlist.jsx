import { Table } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getColors, deleteColor } from "../features/color/colorSlice";
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

const Colorlist = () => {
  const dispatch = useDispatch();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [colorToDelete, setColorToDelete] = useState(null);

  useEffect(() => {
    dispatch(getColors());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const showDeleteModal = (color) => {
    setColorToDelete(color);
    setIsModalVisible(true);
  };

  const handleModalOk = () => {
    if (colorToDelete) {
      handleDelete(colorToDelete._id);
    }
    setIsModalVisible(false);
  };

  const handleModalCancel = () => {
    setIsModalVisible(false);
  };

  const handleDelete = async (id) => {
    try {
      await dispatch(deleteColor(id));
      dispatch(getColors());
      toast.success("Color deleted successfully!");
    } catch (error) {
      toast.error("Error deleting color!");
      console.error(error);
    }
  };

  const { allColor } = useSelector((state) => state.color.colors);

  const dataSource = Array.from({
    length: allColor?.length || 0,
  }).map((_, i) => ({
    key: i + 1,
    title: allColor[i]?.title || "N/A",
    action: (
      <>
        <Link
          to={`/admin/color/update/${allColor[i]?._id}`}
          className="fs-3 text-danger"
        >
          <CiEdit />
        </Link>
        <Link
          onClick={() => {
            showDeleteModal(allColor[i]);
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
        <h3 className="mb-4 title">Colors List</h3>
        <div>
          <Table columns={columns} dataSource={dataSource} />
        </div>
      </div>
      <ConfirmDeleteModal
        visible={isModalVisible}
        onCancel={handleModalCancel}
        onConfirm={handleModalOk}
        name="color"
      />
    </>
  );
};

export default Colorlist;
