import { useFormik } from "formik";
import * as Yup from "yup";
import CustomInput from "../components/CustomInput";
import { useDispatch, useSelector } from "react-redux";
import { updateExistingPcategory, fetchSinglePcategory } from "../features/product-category/pcategorySlice";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useEffect } from "react";

const UpdateProductCategory = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
     dispatch(fetchSinglePcategory(id));
    }
  }, [id, dispatch]);

  const singleproductsCategory = useSelector(state => state.productCategory?.singleproductsCategory);
  const category = singleproductsCategory?.findCategory;

  const validationSchema = Yup.object({
    title: Yup.string()
      .min(2, "Product Category name should be at least 2 characters")
      .required("Product Category name is required"),
  });

  const formik = useFormik({
    initialValues: {
      title: category?.title || "",
    },
    validationSchema,
    enableReinitialize: true,
    onSubmit: async (values, { resetForm }) => {
      try {
        if (id) {
          await dispatch(updateExistingPcategory({ id, pCategoryData: values }));
          resetForm();
          toast.success("Product category updated successfully");
          navigate("/admin/products-category-list");
        }
      } catch (error) {
        toast.error("Failed to update Product category");
        console.error(error);
      }
    },
  });

  return (
    <div>
      <h3 className="mb-4 title">Update Product Category</h3>
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
            Update Product Category
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateProductCategory;