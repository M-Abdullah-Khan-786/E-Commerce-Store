import { useState } from "react";
import CustomInput from "../components/CustomInput";
import RichTextEditor from "react-rte";
import UploadImage from "../components/UploadImage";

const AddBlog = () => {
  const [descriptionValue, setDescriptionValue] = useState(
    RichTextEditor.createEmptyValue()
  );

  const handleDesc = (e) => {
    setDescriptionValue(e);
  };

  return (
    <>
      <h3 className="mb-4">Add Blogs</h3>
      <div>
        <form action="">
          <UploadImage />
          <div className="mt-4">
            <CustomInput
              type="text"
              placeholder="Blog Title"
              className="w-100 p-3 border-0"
            />
          </div>
          <select name="" id="" className="form-control p-3 mb-4">
            <option value="">Select Blog Category</option>
            <option value="1">Category 1</option>
            <option value="2">Category 2</option>
            <option value="3">Category 3</option>
          </select>
          <RichTextEditor
            value={descriptionValue}
            onChange={(e) => {
              handleDesc(e);
            }}
          />
          <button
            className="btn btn-warning border-0 rounded-3 my-4 float-end me-4"
            type="submit"
          >
            Add Blog
          </button>
        </form>
      </div>
    </>
  );
};

export default AddBlog;
