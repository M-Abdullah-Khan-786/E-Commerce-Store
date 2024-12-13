import { useFormik } from "formik";
import * as Yup from "yup";
import CustomInput from "../components/CustomInput";
import { useDispatch, useSelector } from "react-redux";
import { createNewCoupon,updateExistingCoupon,fetchSingleCoupon, resetState } from "../features/coupon/couponSlice";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";

const AddCoupon = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isUpdateMode = !!id; 

  useEffect(() => {
    if (isUpdateMode) {
      dispatch(fetchSingleCoupon(id));
    }
  }, [isUpdateMode, id, dispatch]);

  const singleCoupon = useSelector((state) => state.coupon?.singleCoupon);
  const coupon = singleCoupon?.findCoupon;
  console.log(coupon)

  const validationSchema = Yup.object({
    name: Yup.string()
      .min(2, "Coupon name should be at least 2 characters")
      .required("Coupon name is required"),
      expiry: Yup.string()
      .required("Expiry Date is required"),
      discount: Yup.string()
      .min(1, "Discount must be at least 1%")
      .max(100, "Discount cannot exceed 100%")
      .required("Discount Percentage is required"),
  });

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: isUpdateMode ? coupon?.name || "" : "",
      expiry: isUpdateMode ? formatDate(coupon?.expiry) || "" : "",
      discount: isUpdateMode ? coupon?.discount || "" : "",
    },
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        if (isUpdateMode) {
          await dispatch(updateExistingCoupon({ id, couponData: values }));
          toast.success("Coupon updated successfully");
          navigate("/admin/coupon-list");
        } else {
          await dispatch(createNewCoupon(values));
          toast.success("Coupon created successfully");
        }
        resetForm();
        setTimeout(() => {
          dispatch(resetState());
        }, 3000);
      } catch (error) {
        const action = isUpdateMode ? "update" : "create";
        toast.error(`Failed to ${action} brand`);
        console.error(error);
      }
    },
  });

  return (
    <>
      <div>
        <h3 className="mb-4 title">{isUpdateMode ? "Update Coupon" : "Add Coupon"}</h3>

        <div>
          <form onSubmit={formik.handleSubmit}>
            <div className="mt-4">
              <CustomInput
                type="text"
                placeholder="Coupon Name"
                className="w-100 p-3 border-0"
                name="name"
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.name && formik.errors.name ? (
                <div className="text-danger">{formik.errors.name}</div>
              ) : null}
            </div>
            <div className="mt-4">
              <CustomInput
                type="date"
                placeholder="Expiry"
                className="w-100 p-3 border-0"
                name="expiry"
                value={formik.values.expiry}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.name && formik.errors.expiry ? (
                <div className="text-danger">{formik.errors.expiry}</div>
              ) : null}
            </div>
            <div className="mt-4">
              <CustomInput
                type="text"
                placeholder="Discount"
                className="w-100 p-3 border-0"
                name="discount"
                value={formik.values.discount}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.discount && formik.errors.discount ? (
                <div className="text-danger">{formik.errors.discount}</div>
              ) : null}
            </div>
            <button
              className="btn btn-warning border-0 rounded-3 my-4 float-end me-4"
              type="submit"
            >
              {isUpdateMode ? "Update Coupon" : "Add Coupon"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddCoupon;
