import { useFormik } from "formik";
import * as Yup from "yup";
import CustomInput from "../components/CustomInput";
import { useDispatch, useSelector } from "react-redux";
import {
  createNewColor,
  updateExistingColor,
  fetchSingleColor,
  resetState,
} from "../features/color/colorSlice";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useEffect } from "react";

const AddColor = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isUpdateMode = !!id; 

  useEffect(() => {
    if (isUpdateMode) {
      dispatch(fetchSingleColor(id));
    }
  }, [isUpdateMode, id, dispatch]);

  const singleColor = useSelector(state => state.color?.singleColor);
  const color = singleColor?.findColor;

  const validationSchema = Yup.object({
    title: Yup.string()
      .min(2, "Color name should be at least 2 characters")
      .required("Color name is required"),
  });

  const formik = useFormik({
    initialValues: {
      title: isUpdateMode ? color?.title || "" : "",
    },
    validationSchema,
    enableReinitialize: true,
    onSubmit: async (values, { resetForm }) => {
      try {
        if (isUpdateMode) {
          await dispatch(updateExistingColor({ id, colorData: values }));
          toast.success("Color updated successfully");
          navigate("/admin/color-list");
        } else {
          await dispatch(createNewColor(values));
          toast.success("Color created successfully");
        }
        resetForm();
        setTimeout(() => {
          dispatch(resetState());
        }, 3000);
      } catch (error) {
        const action = isUpdateMode ? "update" : "create";
        toast.error(`Failed to ${action} Color`);
        console.error(error);
      }
    },
  });

  return (
    <div>
      <h3 className="mb-4 title">
        {isUpdateMode ? "Update Color" : "Add Color"}
      </h3>
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
            {isUpdateMode ? "Update Color" : "Add Color"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddColor;
