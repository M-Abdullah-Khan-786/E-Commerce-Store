import { useFormik } from "formik";
import * as Yup from "yup";
import CustomInput from "../components/CustomInput";
import { useDispatch } from "react-redux";
import { createNewColor, resetState } from "../features/color/colorSlice";
import { toast } from "react-toastify";

const AddColor = () => {
  const dispatch = useDispatch();

  const validationSchema = Yup.object({
    title: Yup.string()
      .min(2, "Color name should be at least 2 characters")
      .required("Color name is required"),
  });

  const formik = useFormik({
    initialValues: {
      title: "",
    },
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        await dispatch(createNewColor(values));
        resetForm();
        toast.success("Color created successfully");
        setTimeout(() => {
          dispatch(resetState());
        }, 3000);
      } catch (error) {
        toast.error("Failed to create color");
        console.error(error);
      }
    },
  });

  return (
    <>
      <div>
        <h3 className="mb-4 title">Add Color</h3>

        <div>
          <form onSubmit={formik.handleSubmit}>
            <div className="mt-4">
              <CustomInput
                type="text"
                placeholder="Color"
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
              Add Color
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddColor;
