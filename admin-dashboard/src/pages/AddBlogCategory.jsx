import CustomInput from "../components/CustomInput";

const AddBlogCategory = () => {
  return (
    <>
      <div>
        <h3 className="mb-4 title">Add Blog Category</h3>

        <div>
          <form action="">
            <div className="mt-4">
              <CustomInput
                type="text"
                placeholder="Blog Category"
                className="w-100 p-3 border-0"
              />
            </div>
            <button
              className="btn btn-warning border-0 rounded-3 my-4 float-end me-4"
              type="submit"
            >
              Add Blog Category
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddBlogCategory;
