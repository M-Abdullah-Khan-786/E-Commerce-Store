import { useFormik } from "formik";
import * as Yup from "yup";
import CustomInput from "../components/CustomInput";
import { useDispatch, useSelector } from "react-redux";
import { updateExistingBrand, fetchSingleBrand } from "../features/brand/brandSlice";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useEffect } from "react";

const UpdateBrand = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
     dispatch(fetchSingleBrand(id));
    }
  }, [id, dispatch]);

  const singleBrand = useSelector(state => state.brand?.singleBrand);
  const brand = singleBrand?.findBrand;

  const validationSchema = Yup.object({
    title: Yup.string()
      .min(2, "Brand name should be at least 2 characters")
      .required("Brand name is required"),
  });

  const formik = useFormik({
    initialValues: {
      title: brand?.title || "",
    },
    validationSchema,
    enableReinitialize: true,
    onSubmit: async (values, { resetForm }) => {
      try {
        if (id) {
          await dispatch(updateExistingBrand({ id, brandData: values }));
          resetForm();
          toast.success("Brand updated successfully");
          navigate("/admin/brand-list");
        }
      } catch (error) {
        toast.error("Failed to update brand");
        console.error(error);
      }
    },
  });

  return (
    <div>
      <h3 className="mb-4 title">Update Brand</h3>
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
            Update Brand
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateBrand;