import CustomInput from "../components/CustomInput";

const AddColor = () => {
  return (
    <>
      <div>
        <h3 className="mb-4">Add Color</h3>

        <div>
          <form action="">
            <div className="mt-4">
              <CustomInput
                type="color"
                placeholder="Color"
                className="w-100 p-2 border-0"
              />
            </div>
            <button
              className="btn btn-warning border-0 rounded-3 my-4 float-end me-4"
              type="submit"
            >
              Add Color
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddColor;
