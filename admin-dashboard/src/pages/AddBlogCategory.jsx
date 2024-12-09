import { useFormik } from "formik";
import * as Yup from "yup";
import CustomInput from "../components/CustomInput";
import { useDispatch, useSelector } from "react-redux";
import {
  createNewBcategory,
  updateExistingBcategory,
  fetchSingleBcategory,
  resetState,
} from "../features/blog-category/bcategorySlice";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useEffect } from "react";

const AddBlogCategory = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isUpdateMode = !!id; 

  useEffect(() => {
    if (isUpdateMode) {
      dispatch(fetchSingleBcategory(id));
    }
  }, [isUpdateMode, id, dispatch]);

  const singleblogsCategory = useSelector(
    (state) => state.blogCategory?.singleblogsCategory
  );
  const category = singleblogsCategory?.findCategory;

  const validationSchema = Yup.object({
    title: Yup.string()
      .min(2, "Blog Category name should be at least 2 characters")
      .required("Blog Category name is required"),
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
          await dispatch(updateExistingBcategory({ id, bCategoryData: values }));
          toast.success("Blog category updated successfully");
          navigate("/admin/blogs-category-list");
        } else {
          await dispatch(createNewBcategory(values));
          toast.success("Blog category created successfully");
        }
        resetForm();
        setTimeout(() => {
          dispatch(resetState());
        }, 3000);
      } catch (error) {
        const action = isUpdateMode ? "update" : "create";
        toast.error(`Failed to ${action} Blog category`);
        console.error(error);
      }
    },
  });

  return (
    <div>
      <h3 className="mb-4 title">
        {isUpdateMode ? "Update Blog Category" : "Add Blog Category"}
      </h3>
      <div>
        <form onSubmit={formik.handleSubmit}>
          <div className="mt-4">
            <CustomInput
              type="text"
              placeholder="Blog Category"
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
            {isUpdateMode ? "Update Blog Category" : "Add Blog Category"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddBlogCategory;
