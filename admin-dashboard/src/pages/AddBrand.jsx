import CustomInput from "../components/CustomInput";

const AddBrand = () => {
  return (
    <>
      <div>
        <h3 className="mb-4 title">Add Brand</h3>

        <div>
          <form action="">
            <div className="mt-4">
              <CustomInput
                type="text"
                placeholder="Brand"
                className="w-100 p-3 border-0"
              />
            </div>
            <button
              className="btn btn-warning border-0 rounded-3 my-4 float-end me-4"
              type="submit"
            >
              Add Brand
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddBrand;
