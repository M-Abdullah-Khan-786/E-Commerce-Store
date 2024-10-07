import "../CSS/Login.css";
import { Link, useNavigate } from "react-router-dom";
import CustomInput from "../components/CustomInput";
import { useFormik } from "formik";
import { object, string } from "yup";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../features/auth/authSlice";
import { useEffect } from "react";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let userSchema = object({
    email: string()
      .email("Email Should be Valid")
      .required("Email is required"),
    password: string().required("Password is required"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: userSchema,
    onSubmit: (values) => {
      dispatch(login(values));
      alert(JSON.stringify(values, null, 2));
    },
  });

  const { user, loading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isSuccess) {
      navigate("admin");
    }
      // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, loading, isError, isSuccess, message]);

  return (
    <>
      <div className="login py-5">
        <br />
        <br />
        <br />
        <br />
        <div className="my-5 w-25 bg-white rounded-3 mx-auto p-4">
          <h3 className="text-center title">LogIn</h3>
          <p className="text-center">Login now to continue</p>
          <form action="" onSubmit={formik.handleSubmit}>
            <CustomInput
              placeholder="Email Addresss"
              name="email"
              id="email"
              className="w-100 p-2 rounded"
              onChange={formik.handleChange("email")}
              value={formik.values.email}
            />
            <div className="error">
              {formik.touched.email && formik.errors.email ? (
                <div>{formik.errors.email}</div>
              ) : null}
            </div>
            <CustomInput
              type="password"
              placeholder="Password"
              name="password"
              id="password"
              className="w-100 p-2 rounded"
              onChange={formik.handleChange("password")}
              value={formik.values.password}
            />
            <div className="error">
              {formik.touched.password && formik.errors.password ? (
                <div>{formik.errors.password}</div>
              ) : null}
            </div>
            <div className="mb-3 text-end">
              <Link to="/forgot-password">Forgot Password?</Link>
            </div>
            <div className="error text-center">
              {message.message==="Rejected" ? "Only Admin Allowed":""}
            </div>
            <button
              className="button border-0 px-3 py-2 text-white fw-bold w-100 fs-5 text-center text-decoration-none"
              type="submit"
            >
              Sign In
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
