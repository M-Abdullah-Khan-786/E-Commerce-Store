import { Table } from "antd";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getBrands,deletebrand } from "../features/brand/brandSlice";
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
    dataIndex: "title",
    sorter: (a, b) => a.title.length - b.title.length,
    sortDirections: ["descend"],
  },
  {
    title: "Action",
    dataIndex: "action",
  },
];

const Brandlist = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getBrands());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleDelete = async (id) => {
    try {
      await dispatch(deletebrand(id));
      dispatch(getBrands());
      toast.success("Brand deleted successfully!");
    } catch (error) {
      toast.error("Error deleting brand!");
      console.error(error);
    }
  };

  const {allBrand} = useSelector((state) => state.brand.brands);

  const dataSource = Array.from({
    length: allBrand?.length || 0,
  }).map((_, i) => ({
    key: i + 1,
    title: allBrand[i]?.title || "N/A",
    action: (
      <>
        <Link to="/edit" className="fs-3 text-danger">
          <CiEdit />
        </Link>
        <Link onClick={() => {
            handleDelete(allBrand[i]?._id);
          }} className="ms-3 fs-3 text-danger" >
          <MdDeleteOutline />
        </Link>
      </>
    )
  }));
  return (
    <>
      <div>
        <h3 className="mb-4 title">Brands List</h3>
        <div>
          <Table columns={columns} dataSource={dataSource} />
        </div>
      </div>
    </>
  )
}

export default Brandlist