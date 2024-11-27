import { useFormik } from "formik";
import * as Yup from "yup";
import CustomInput from "../components/CustomInput";
import { useDispatch } from "react-redux";
import { createNewCoupon, resetState } from "../features/coupon/couponSlice";
import { toast } from "react-toastify";

const AddCoupon = () => {
  const dispatch = useDispatch();

  const validationSchema = Yup.object({
    name: Yup.string()
      .min(2, "Coupon name should be at least 2 characters")
      .required("Coupon name is required"),
      expiry: Yup.string()
      .required("Expiry Date is required"),
      discount: Yup.string()
      .required("Discount Percentage is required"),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      expiry: "",
      discount: "",
    },
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        await dispatch(createNewCoupon(values));
        resetForm();
        toast.success("Coupon created successfully");
        setTimeout(() => {
          dispatch(resetState());
        }, 3000);
      } catch (error) {
        toast.error("Failed to create brand");
        console.error(error);
      }
    },
  });

  return (
    <>
      <div>
        <h3 className="mb-4 title">Add Coupon</h3>

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
              Add Coupon
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddCoupon;
