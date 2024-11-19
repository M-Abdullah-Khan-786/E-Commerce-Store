import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import CustomInput from "../components/CustomInput";
import RichTextEditor from "react-rte";
import { useDispatch, useSelector } from "react-redux";
import { getCblogs } from "../features/blog-category/bcategorySlice";
import { object, string } from "yup";
import { useFormik } from "formik";
import { getBlogByIds, updateBlogById } from "../features/blog/blogSlice";
import { toast } from "react-toastify";

const UpdateBlog = () => {
  const { id } = useParams();
  const [cBlog, setcBlog] = useState([]);
  const [images, setImages] = useState([]);
  const [descriptionValue, setDescriptionValue] = useState(
    RichTextEditor.createEmptyValue()
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getCblogs());
  }, [dispatch]);

  const { allCategory } = useSelector(
    (state) => state.blogCategory.blogsCategory
  );

  useEffect(() => {
    if (Array.isArray(allCategory)) {
      setcBlog(allCategory);
    } else {
      setcBlog([]);
    }
  }, [allCategory]);

  useEffect(() => {
    if (id) {
      dispatch(getBlogByIds(id)).then((result) => {
        if (result.payload) {
          const blog = result.payload.updated;
          if (blog) {
            formik.setValues({
              title: blog.title,
              description: blog.description,
              category: blog.category || "",
            });
            setDescriptionValue(
              RichTextEditor.createValueFromString(blog.description, "html")
            );

            if (blog.images && blog.images.length > 0) {
              const blogImages = blog.images.map((img) => ({
                url: img.url,
                public_id: img.public_id,
                preview: img.url,
              }));
              setImages(blogImages);
            }
          }
        }
      });
    }
  }, [id, dispatch]);

  const handleDesc = (value) => {
    setDescriptionValue(value);
    formik.setFieldValue("description", value.toString("html"));
  };

  const BlogSchema = object({
    title: string().required("Title is required"),
    description: string().required("Description is required"),
    category: string().required("Category is required"),
  });

  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      category: "",
    },
    validationSchema: BlogSchema,
    onSubmit: async (values) => {
      const formData = new FormData();
      formData.append("title", values.title);
      formData.append("description", values.description);
      formData.append("category", values.category);

      images.forEach((image) => {
        if (image.file) {
          formData.append("images", image.file);
        }
      });

      try {
        const resultAction = await dispatch(updateBlogById({ id, formData }));
        if (updateBlogById.fulfilled.match(resultAction)) {
          toast.success("Blog updated successfully");
          navigate("/admin/blogs-list");
        } else {
          toast.error("Failed to update blog");
        }
      } catch (error) {
        console.error(error);
        toast.error("An error occurred while updating the blog");
      }
    },
  });

  const handleImageChange = (event) => {
    const files = Array.from(event.target.files);
    const newImages = files.map((file) => ({
      file: file,
      preview: URL.createObjectURL(file),
    }));

    setImages((prevImages) => [...prevImages, ...newImages]);
  };

  const handleRemoveImage = (index) => {
    setImages((prevImages) =>
      prevImages.filter((_, imgIndex) => imgIndex !== index)
    );
  };

  return (
    <>
      <h3 className="mb-4 title">Update Blog</h3>
      <div>
        <form onSubmit={formik.handleSubmit}>
          <CustomInput
            type="text"
            value={formik.values.title}
            onChange={formik.handleChange("title")}
            onBlur={formik.handleBlur("title")}
            placeholder="Blog Title"
            className="w-100 p-3 mb-4 border-0"
          />
          {formik.touched.title && formik.errors.title && (
            <div className="error">{formik.errors.title}</div>
          )}

          <select
            name="category"
            className="form-control mt-3 mb-3"
            value={formik.values.category}
            onChange={formik.handleChange("category")}
            onBlur={formik.handleBlur("category")}
          >
            <option value="">Select Category</option>
            {Array.isArray(cBlog) &&
              cBlog.map((category, index) => (
                <option key={index} value={category.title}>
                  {category.title}
                </option>
              ))}
          </select>
          {formik.touched.category && formik.errors.category && (
            <div className="error">{formik.errors.category}</div>
          )}

          <RichTextEditor
            className="mt-3 mb-3"
            value={descriptionValue}
            onChange={handleDesc}
          />
          {formik.touched.description && formik.errors.description && (
            <div className="error">{formik.errors.description}</div>
          )}

          <div>
            <input type="file" multiple onChange={handleImageChange} />
          </div>
          <div>
            {images.map((image, index) => (
              <div key={index}>
                <img
                  src={image.preview}
                  alt="preview"
                  width={100}
                  height={100}
                />
                <button type="button" onClick={() => handleRemoveImage(index)}>
                  Remove
                </button>
              </div>
            ))}
          </div>

          <button
            className="btn btn-warning border-0 rounded-3 my-4 float-end me-4"
            type="submit"
          >
            Update Blog
          </button>
        </form>
      </div>
    </>
  );
};

export default UpdateBlog;
