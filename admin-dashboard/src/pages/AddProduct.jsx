import { useEffect, useState } from "react";
import RichTextEditor from "react-rte";
import CustomInput from "../components/CustomInput";
import UploadImage from "../components/UploadImage";
import { useFormik } from "formik";
import { array, number, object, string } from "yup";
import { useDispatch, useSelector } from "react-redux";
import { getBrands } from "../features/brand/brandSlice";
import { getCpoducts } from "../features/product-category/pcategorySlice";
import { getColors } from "../features/color/colorSlice";
import Multiselect from "react-widgets/Multiselect";

const AddProduct = () => {
  const [brand, setBrand] = useState([]);
  const [cProduct, setcProduct] = useState([]);

  const dispatch = useDispatch();

  let userSchema = object({
    title: string().required("Title is required"),
    description: string().required("Description is required"),
    price: number().required("Price is required"),
    category: string().required("Category is required"),
    brand: string().required("Brand is required"),
    color: array().min(1, "At least one color is required").required("Colors is required"),
    quantity: number().required("Quantity is required"),
  });

  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      price: "",
      category: "",
      brand: "",
      color: "",
      quantity: "",
    },
    validationSchema: userSchema,
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  const handleDesc = (value) => {
    setDescriptionValue(value);
    formik.setFieldValue("description", value.toString("html"));
  };

  useEffect(() => {
    dispatch(getBrands());
    dispatch(getCpoducts());
    dispatch(getColors());
  }, [dispatch]);

  const { allBrand } = useSelector((state) => state.brand.brands);
  const { allCategory } = useSelector(
    (state) => state.productCategory.productsCategory
  );
  const { allColor } = useSelector((state) => state.color.colors);

  if (allBrand && allBrand.length !== brand.length) {
    setBrand(allBrand);
  }
  if (allCategory && allCategory.length !== cProduct.length) {
    setcProduct(allCategory);
  }

  const colors = [];
  if (allColor && Array.isArray(allColor)) {
    allColor.forEach((i) => {
      colors.push({
        _id: i._id,
        color: i.title,
      });
    });
  }
  const [descriptionValue, setDescriptionValue] = useState(
    RichTextEditor.createEmptyValue()
  );

  return (
    <>
      <div>
        <h3 className="mb-4 title">Add Product</h3>
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
              {cProduct.map((cProduct, index) => {
                return (
                  <option key={index} value={cProduct.title}>
                    {cProduct.title}
                  </option>
                );
              })}
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
              onChange={(e) => formik.setFieldValue("color", e)} 
              onBlur={formik.handleBlur("color")}
              className=" mt-3 mb-3"
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
              {brand.map((brand, index) => {
                return (
                  <option key={index} value={brand.title}>
                    {brand.title}
                  </option>
                );
              })}
            </select>
            {formik.touched.brand && formik.errors.brand && (
              <div className="error">{formik.errors.brand}</div>
            )}
            <UploadImage />
            <button
              className="btn btn-warning border-0 rounded-3 my-4 float-end me-4"
              type="submit"
            >
              Add Product
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddProduct;
