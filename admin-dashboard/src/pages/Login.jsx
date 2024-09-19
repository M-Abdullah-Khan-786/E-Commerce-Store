import "../CSS/Login.css";
import { Link } from "react-router-dom";
import CustomInput from "../components/CustomInput";
const Login = () => {
  return (
    <>
      <div className="login py-5">
        <br />
        <br />
        <br />
        <br />
        <div className="my-5 w-25 bg-white rounded-3 mx-auto p-4">
          <h3 className="text-center">LogIn</h3>
          <p className="text-center">Login now to continue</p>
          <form action="">
            <CustomInput
              type="email"
              placeholder="Email Addresss"
              id="email"
              className="w-100"
            />
            <CustomInput
              type="password"
              placeholder="Password"
              id="password"
              className="w-100"
            />
            <div className="mb-3 text-end">
              <Link to="/forgot-password">Forgot Password?</Link>
            </div>
            <Link
              to="/admin"
              className="button border-0 px-3 py-2 text-white fw-bold w-100 fs-5 text-center text-decoration-none"
              type="submit"
            >
              Sign In
            </Link>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
