import { useEffect, useState } from "react";
import CustomInput from "../components/CustomInput";
import RichTextEditor from "react-rte";
import { useDispatch, useSelector } from "react-redux";
import { getCblogs } from "../features/blog-category/bcategorySlice";
import { object, string } from "yup";
import { useFormik } from "formik";
import { createBlog, resetState } from "../features/blog/blogSlice";
import { toast } from "react-toastify";

const AddBlog = () => {
  const [cBlog, setcBlog] = useState([]);
  const [images, setImages] = useState([]);
  const [descriptionValue, setDescriptionValue] = useState(
    RichTextEditor.createEmptyValue()
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCblogs());
  }, [dispatch]);

  const { allCategory } = useSelector(
    (state) => state.blogCategory.blogsCategory
  );

  useEffect(() => {
    if (allCategory) {
      setcBlog(allCategory);
    }
  }, [allCategory]);

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
        const resultAction = await dispatch(createBlog(formData));
        if (createBlog.fulfilled.match(resultAction)) {
          formik.resetForm();
          setDescriptionValue(RichTextEditor.createEmptyValue());
          setImages([]);
          toast.success("Blog created successfully");
          setTimeout(() => {
            dispatch(resetState());
          }, 3000);
        } else {
          toast.error("Failed to create blog");
          console.error("Failed to blog product:", resultAction.error);
        }
      } catch (error) {
        console.error(error);
      }
    },
  });

  const handleImageChange = (event) => {
    const files = Array.from(event.target.files);
    const newImages = files.map((file) => ({
      file: file,
      preview: URL.createObjectURL(file),
    }));

    setImages((prevImages) => {
      const updatedImages = [...prevImages, ...newImages];
      return updatedImages;
    });
  };

  const handleRemoveImage = (index) => {
    setImages((prevImages) =>
      prevImages.filter((_, imgIndex) => imgIndex !== index)
    );
  };

  return (
    <>
      <h3 className="mb-4 title">Add Blogs</h3>
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
            id=""
            className="form-control mt-3 mb-3"
            value={formik.values.category}
            onChange={formik.handleChange("category")}
            onBlur={formik.handleBlur("category")}
          >
            <option value="">Select Category</option>
            {cBlog.map((cBlog, index) => (
              <option key={index} value={cBlog.title}>
                {cBlog.title}
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
          <div className="bg-white border-1 p-5 mt-4 text-center">
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleImageChange}
              className="form-control mb-3"
            />
            {images.length > 0 && (
              <div>
                <h4>Selected Images:</h4>
                <div className="image-previews">
                  {images.map((image, index) => (
                    <div key={index} className="image-preview">
                      <img
                        src={image.preview}
                        alt={`preview ${index}`}
                        style={{
                          width: "100px",
                          height: "auto",
                          margin: "5px",
                        }}
                      />
                      <p>{image.file.name}</p>
                      <button
                        type="button"
                        onClick={() => handleRemoveImage(index)}
                        className="btn btn-danger btn-sm"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
          <button
            className="btn btn-warning border-0 rounded-3 my-4 float-end me-4"
            type="submit"
          >
            Add Blog
          </button>
        </form>
      </div>
    </>
  );
};

export default AddBlog;
