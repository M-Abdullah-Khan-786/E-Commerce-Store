import { useFormik } from "formik";
import * as Yup from "yup";
import CustomInput from "../components/CustomInput";
import { useDispatch, useSelector } from "react-redux";
import { updateExistingColor, fetchSingleColor } from "../features/color/colorSlice";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useEffect } from "react";

const UpdateColor = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
     dispatch(fetchSingleColor(id));
    }
  }, [id, dispatch]);

  const singleColor = useSelector(state => state.color?.singleColor);
  const color = singleColor?.findColor;

  const validationSchema = Yup.object({
    title: Yup.string()
      .min(2, "Color name should be at least 2 characters")
      .required("Color name is required"),
  });

  const formik = useFormik({
    initialValues: {
      title: color?.title || "",
    },
    validationSchema,
    enableReinitialize: true,
    onSubmit: async (values, { resetForm }) => {
      try {
        if (id) {
          await dispatch(updateExistingColor({ id, colorData: values }));
          resetForm();
          toast.success("Color updated successfully");
          navigate("/admin/color-list");
        }
      } catch (error) {
        toast.error("Failed to update Color");
        console.error(error);
      }
    },
  });

  return (
    <div>
      <h3 className="mb-4 title">Update Color</h3>
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
            Update Color
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateColor;