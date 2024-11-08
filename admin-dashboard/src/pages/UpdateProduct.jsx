import { useEffect, useState } from "react";
import RichTextEditor from "react-rte";
import CustomInput from "../components/CustomInput";
import { useFormik } from "formik";
import { array, number, object, string } from "yup";
import { useDispatch, useSelector } from "react-redux";
import { getBrands } from "../features/brand/brandSlice";
import { getCpoducts } from "../features/product-category/pcategorySlice";
import { getColors } from "../features/color/colorSlice";
import Multiselect from "react-widgets/Multiselect";
import { getProductByIds, updateProductById } from "../features/product/productSlice";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from 'react-toastify';

const UpdateProduct = () => {
  const { id } = useParams();
  const [brand, setBrand] = useState([]);
  const [cProduct, setcProduct] = useState([]);
  const [images, setImages] = useState([]);
  const [descriptionValue, setDescriptionValue] = useState(
    RichTextEditor.createEmptyValue()
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const productSchema = object({
    title: string().required("Title is required"),
    description: string().required("Description is required"),
    price: number().required("Price is required"),
    category: string().required("Category is required"),
    brand: string().required("Brand is required"),
    color: array()
      .min(1, "At least one color is required"),
    quantity: number().required("Quantity is required"),
  });

  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      price: "",
      category: "",
      brand: "",
      color: [],
      quantity: "",
      removeImages: []
    },
    validationSchema: productSchema,
    onSubmit: async (values) => {
      const formData = new FormData();
      formData.append("title", values.title);
      formData.append("description", values.description);
      formData.append("price", values.price);
      formData.append("category", values.category);
      formData.append("brand", values.brand);
      formData.append("quantity", values.quantity);

      values.color.forEach((color) => {
        formData.append("colors", color._id);
      });

      images.forEach((image) => {
        if (image.file) {
          formData.append("images", image.file);
        }
      });

      (formik.values.removeImages || []).forEach((id) => formData.append("removeImages", id));

      try {
        const resultAction = await dispatch(updateProductById({ id, data: formData }));
        if (updateProductById.fulfilled.match(resultAction)) {
          formik.resetForm();
          setDescriptionValue(RichTextEditor.createEmptyValue());
          formik.setFieldValue("color", []);
          setImages([]);
          toast.success("Product updated successfully");
          navigate("/admin/product-list");
        } else {
          toast.error("Failed to update product");
          console.error("Failed to update product:", resultAction.error);
        }
      } catch (error) {
        console.error(error);
      }
    },
  });

  const handleDesc = (value) => {
    setDescriptionValue(value);
    formik.setFieldValue("description", value.toString("html"));
  };

  const { allBrand } = useSelector((state) => state.brand.brands);
  const { allCategory } = useSelector((state) => state.productCategory.productsCategory);
  const { allColor } = useSelector((state) => state.color.colors);

  useEffect(() => {
    if (allBrand) {
      setBrand(allBrand);
    }
    if (allCategory) {
      setcProduct(allCategory);
    }
  }, [allBrand, allCategory]);

  useEffect(() => {
    dispatch(getProductByIds(id)).then((action) => {
      if (action.meta.requestStatus === 'fulfilled') {
        const product = action.payload.product;

        const selectedColors = allColor.filter(color => product.colors.includes(color._id))
        .map(color => ({
          _id: color._id,
          color: color.title,
        }));

        formik.setValues({
          title: product.title,
          description: product.description,
          price: product.price,
          category: product.category,
          brand: product.brand,
          color: selectedColors,
          quantity: product.quantity,
        });
        setDescriptionValue(RichTextEditor.createValueFromString(product.description, 'html'));
        if (product.images && product.images.length > 0) {
          const productImages = product.images.map((img) => ({
              url: img.url,
              public_id: img.public_id,
              preview: img.url,
          }));
          setImages(productImages);
      }
      }
    });

    dispatch(getBrands());
    dispatch(getCpoducts());
    dispatch(getColors());
  }, [dispatch, id]);



  const colors = [];
  if (allColor && Array.isArray(allColor)) {
    allColor.forEach((i) => {
      colors.push({
        _id: i._id,
        color: i.title,
      });
    });
  }
  const handleImageChange = (event) => {
    const files = Array.from(event.target.files);
    const newImages = files.map((file) => {
      const previewURL = URL.createObjectURL(file);
      return {
        file: file,
        preview: previewURL,
      };
    });
  
    setImages((prevImages) => [...prevImages, ...newImages]);
  };
  

  const handleRemoveImage = (index) => {
    setImages((prevImages) => {
      const removedImage = prevImages[index];
      if (removedImage.public_id) {
        formik.setFieldValue("removeImages", [
          ...(formik.values.removeImages || []),
          removedImage.public_id,
        ]);
      }
      return prevImages.filter((_, imgIndex) => imgIndex !== index);
    });
  };

  return (
    <>
      <div>
        <h3 className="mb-4 title">Update Product</h3>
        <div>
          <form onSubmit={formik.handleSubmit}>
            <CustomInput
              type="text"
              name="title"
              value={formik.values.title}
              onChange={formik.handleChange("title")}
              onBlur={formik.handleBlur("title")}
              placeholder="Title"
              className="w-100 p-3 mb-4 border-0"
            />
            {formik.touched.title && formik.errors.title && (
              <div className="error">{formik.errors.title}</div>
            )}
            <RichTextEditor
              className="my-3"
              value={descriptionValue}
              onChange={handleDesc}
            />
            {formik.touched.description && formik.errors.description && (
              <div className="error">{formik.errors.description}</div>
            )}
            <CustomInput
              type="text"
              name="price"
              value={formik.values.price}
              onChange={formik.handleChange("price")}
              onBlur={formik.handleBlur("price")}
              placeholder="Price"
              className="w-100 p-3 mb-4 border-0"
            />
            {formik.touched.price && formik.errors.price && (
              <div className="error">{formik.errors.price}</div>
            )}
            <CustomInput
              type="text"
              name="quantity"
              value={formik.values.quantity}
              onChange={formik.handleChange("quantity")}
              onBlur={formik.handleBlur("quantity")}
              placeholder="Quantity"
              className="w-100 p-3 mb-4 border-0"
            />
            {formik.touched.quantity && formik.errors.quantity && (
              <div className="error">{formik.errors.quantity}</div>
            )}
            <select
              name="category"
              value={formik.values.category}
              onChange={formik.handleChange("category")}
              onBlur={formik.handleBlur("category")}
              className="form-control p-3 mt-3 mb-3"
            >
              <option value="">Select Category</option>
              {cProduct.map((cProduct, index) => (
                <option key={index} value={cProduct.title}>
                  {cProduct.title}
                </option>
              ))}
            </select>
            {formik.touched.category && formik.errors.category && (
              <div className="error">{formik.errors.category}</div>
            )}
            <Multiselect
              name="color"
              dataKey="_id"
              textField="color"
              placeholder="Select Color"
              data={colors}
              value={formik.values.color} 
              onChange={(e) => {
                formik.setFieldValue("color", e);
                if (e.length === 0) {
                  formik.setFieldValue("color", null);
                }
              }}
              onBlur={formik.handleBlur("color")}
              className="mt-3 mb-3"
            />
            {formik.touched.color && formik.errors.color && (
              <div className="error">{formik.errors.color}</div>
            )}
            <select
              name="brand"
              value={formik.values.brand}
              onChange={formik.handleChange("brand")}
              onBlur={formik.handleBlur("brand")}
              className="form-control p-3 mt-3 mb-3"
            >
              <option value="">Select Brand</option>
              {brand.map((brand, index) => (
                <option key={index} value={brand.title}>
                  {brand.title}
                </option>
              ))}
            </select>
            {formik.touched.brand && formik.errors.brand && (
              <div className="error">{formik.errors.brand}</div>
            )}
            <div>
              <input type="file" multiple onChange={handleImageChange} />
            </div>
            <div>
              {images.map((image, index) => (
                <div key={index}>
                  <img src={image.preview} alt="preview" width={100} height={100} />
                  <button type="button" onClick={() => handleRemoveImage(index)}>
                    Remove
                  </button>
                </div>
              ))}
            </div>
            <button type="submit" className="btn btn-primary mt-3">Update Product</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default UpdateProduct;