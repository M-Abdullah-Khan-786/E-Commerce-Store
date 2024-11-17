import { useFormik } from "formik";
import * as Yup from "yup";
import CustomInput from "../components/CustomInput";
import { useDispatch, useSelector } from "react-redux";
import {
  updateExistingBcategory,
  fetchSingleBcategory,
} from "../features/blog-category/bcategorySlice";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useEffect } from "react";

const UpdateBlogCategory = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      dispatch(fetchSingleBcategory(id));
    }
  }, [id, dispatch]);

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
      title: category?.title || "",
    },
    validationSchema,
    enableReinitialize: true,
    onSubmit: async (values, { resetForm }) => {
      try {
        if (id) {
          await dispatch(
            updateExistingBcategory({ id, bCategoryData: values })
          );
          resetForm();
          toast.success("Blog category updated successfully");
          navigate("/admin/blogs-category-list");
        }
      } catch (error) {
        toast.error("Failed to update Blog category");
        console.error(error);
      }
    },
  });

  return (
    <div>
      <h3 className="mb-4 title">Update Blog Category</h3>
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
            Update Blog Category
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateBlogCategory;
