import { useFormik } from "formik";
import * as Yup from "yup";
import CustomInput from "../components/CustomInput";
import { useDispatch } from "react-redux";
import {
  createNewPcategory,
  resetState,
} from "../features/product-category/pcategorySlice";
import { toast } from "react-toastify";

const AddProductCategory = () => {
  const dispatch = useDispatch();

  const validationSchema = Yup.object({
    title: Yup.string()
      .min(2, "Product Category name should be at least 2 characters")
      .required("Product Category name is required"),
  });

  const formik = useFormik({
    initialValues: {
      title: "",
    },
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        await dispatch(createNewPcategory(values));
        resetForm();
        toast.success("Product category created successfully");
        setTimeout(() => {
          dispatch(resetState());
        }, 3000);
      } catch (error) {
        toast.error("Failed to create Product category");
        console.error(error);
      }
    },
  });

  return (
    <>
      <div>
        <h3 className="mb-4 title">Add Product Category</h3>

        <div>
          <form onSubmit={formik.handleSubmit}>
            <div className="mt-4">
              <CustomInput
                type="text"
                placeholder="Product Category"
                className="w-100 p-3 border-0"
                name="title"
                value={formik.values.title}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.title && formik.errors.title ? (
                <div className="text-danger">{formik.errors.title}</div>
              ) : null}
            </div>
            <button
              className="btn btn-warning border-0 rounded-3 my-4 float-end me-4"
              type="submit"
            >
              Add Product Category
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddProductCategory;
