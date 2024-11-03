import { useFormik } from "formik";
import * as Yup from "yup";
import CustomInput from "../components/CustomInput";
import { useDispatch } from "react-redux";
import { createNewBrand } from "../features/brand/brandSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const AddBrand = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const validationSchema = Yup.object({
    title: Yup.string()
      .min(2, "Brand name should be at least 2 characters")
      .required("Brand name is required"),
  });

  const formik = useFormik({
    initialValues: {
      title: "",
    },
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        await dispatch(createNewBrand(values));
        resetForm();
        toast.success("Brand created successfully");
        navigate("/admin/brand-list");
      } catch (error) {
        toast.error("Failed to create brand");
        console.error(error);
      }
    },
  });

  return (
    <>
      <div>
        <h3 className="mb-4 title">Add Brand</h3>

        <div>
          <form onSubmit={formik.handleSubmit}>
            <div className="mt-4">
              <CustomInput
                type="text"
                placeholder="Brand"
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
              Add Brand
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddBrand;
