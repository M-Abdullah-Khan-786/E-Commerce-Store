import { useFormik } from "formik";
import * as Yup from "yup";
import CustomInput from "../components/CustomInput";
import { useDispatch, useSelector } from "react-redux";
import {
  updateExistingCoupon,
  fetchSingleCoupon,
} from "../features/coupon/couponSlice";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useEffect } from "react";

const UpdateCoupon = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      dispatch(fetchSingleCoupon(id));
    }
  }, [id, dispatch]);

  const singleCoupon = useSelector((state) => state.coupon?.singleCoupon);
  const coupon = singleCoupon?.findCoupon;

  const validationSchema = Yup.object({
    name: Yup.string()
      .min(2, "Coupon name should be at least 2 characters")
      .required("Coupon name is required"),
    expiry: Yup.string().required("Expiry Date is required"),
    discount: Yup.number()
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
    initialValues: {
      name: coupon?.name || "",
      expiry: formatDate(coupon?.expiry) || "",
      discount: coupon?.discount || "",
    },
    validationSchema,
    enableReinitialize: true,
    onSubmit: async (values, { resetForm }) => {
      try {
        if (id) {
          await dispatch(updateExistingCoupon({ id, couponData: values }));
          resetForm();
          toast.success("Coupon updated successfully");
          navigate("/admin/coupon-list");
        }
      } catch (error) {
        toast.error("Failed to update coupon");
        console.error(error);
      }
    },
  });

  return (
    <div>
      <h3 className="mb-4 title">Update Coupon</h3>
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
            {formik.touched.title && formik.errors.title ? (
              <div className="text-danger">{formik.errors.title}</div>
            ) : null}
          </div>
          <div className="mt-4">
            <CustomInput
              type="date"
              placeholder="Expiry Date"
              className="w-100 p-3 border-0"
              name="expiry"
              value={formik.values.expiry}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.expiry && formik.errors.expiry ? (
              <div className="text-danger">{formik.errors.expiry}</div>
            ) : null}
          </div>

          <div className="mt-4">
            <CustomInput
              type="number"
              placeholder="Discount Percentage"
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
            Update Coupon
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateCoupon;
