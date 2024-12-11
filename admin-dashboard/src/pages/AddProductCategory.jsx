import { useFormik } from "formik";
import * as Yup from "yup";
import CustomInput from "../components/CustomInput";
import { useDispatch, useSelector } from "react-redux";
import {
  createNewPcategory,
  updateExistingPcategory,
  fetchSinglePcategory,
  resetState,
} from "../features/product-category/pcategorySlice";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useEffect } from "react";

const AddProductCategory = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isUpdateMode = !!id; 

  useEffect(() => {
    if (isUpdateMode) {
      dispatch(fetchSinglePcategory(id));
    }
  }, [isUpdateMode, id, dispatch]);

  const singleproductsCategory = useSelector(state => state.productCategory?.singleproductsCategory);
  const category = singleproductsCategory?.findCategory;

  const validationSchema = Yup.object({
    title: Yup.string()
      .min(2, "Product Category name should be at least 2 characters")
      .required("Product Category name is required"),
  });

  const formik = useFormik({
    initialValues: {
      title: isUpdateMode ? category?.title || "" : "",
    },
    validationSchema,
    enableReinitialize: true,
    onSubmit: async (values, { resetForm }) => {
      try {
        if (isUpdateMode) {
          await dispatch(updateExistingPcategory({ id, pCategoryData: values }));
          toast.success("Product category updated successfully");
          navigate("/admin/products-category-list");
        } else {
          await dispatch(createNewPcategory(values));
          toast.success("Product category created successfully");
        }
        resetForm();
        setTimeout(() => {
          dispatch(resetState());
        }, 3000);
      } catch (error) {
        const action = isUpdateMode ? "update" : "create";
        toast.error(`Failed to ${action} Product category`);
        console.error(error);
      }
    },
  });

  return (
    <div>
      <h3 className="mb-4 title">
        {isUpdateMode ? "Update Product Category" : "Add Product Category"}
      </h3>
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
            {isUpdateMode ? "Update Product Category" : "Add Product Category"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddProductCategory;
