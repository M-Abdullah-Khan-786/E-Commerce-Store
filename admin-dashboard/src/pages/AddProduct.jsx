import { useState } from "react";
import RichTextEditor from "react-rte";
import CustomInput from "../components/CustomInput";
import UploadImage from "../components/UploadImage";

const AddProduct = () => {
  const [descriptionValue, setDescriptionValue] = useState(
    RichTextEditor.createEmptyValue()
  );

  const handleDesc = (e) => {
    setDescriptionValue(e);
  };

  return (
    <>
      <div>
        <h3 className="mb-4 title">Add Product</h3>
        <div>
          <form action="">
            <CustomInput
              type="text"
              placeholder="Title"
              className="w-100 p-3 border-0"
            />
            <RichTextEditor
              value={descriptionValue}
              onChange={(e) => {
                handleDesc(e);
              }}
            />
            <CustomInput
              type="text"
              placeholder="Price"
              className="w-100 p-3 border-0 mt-3"
            />
            <CustomInput
              type="text"
              placeholder="Quantity"
              className="w-100 p-3 border-0 mt-3"
            />
            <select name="" id="" className="form-control p-3 mb-4">
              <option value="">Select Category</option>
              <option value="1">Category 1</option>
              <option value="2">Category 2</option>
              <option value="3">Category 3</option>
            </select>
            <select name="" id="" className="form-control p-3 mb-4">
              <option value="">Select Color</option>
              <option value="1">Color 1</option>
              <option value="2">Color 2</option>
              <option value="3">Color 3</option>
            </select>
            <select name="" id="" className="form-control p-3 mb-4">
              <option value="">Select Brand</option>
              <option value="1">Brand 1</option>
              <option value="2">Brand 2</option>
              <option value="3">Brand 3</option>
            </select>
            <UploadImage />
            <button
              className="btn btn-warning border-0 rounded-3 my-4 float-end me-4"
              type="submit"
            >
              Add Product
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddProduct;
