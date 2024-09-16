import "../CSS/Auth.css";
import { Link } from "react-router-dom";
import BreadCrumb from "../components/BreadCrumb";
import Meta from "../components/Meta";
import CustomInput from "../components/CustomInput";

const Login = () => {
  return (
    <>
      <Meta title="Login" />
      <BreadCrumb title="Login" />
      <div className="auth-wrapper home-wrapper-2">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="auth-card">
                <h3 className="text-center mb-3">Login</h3>
                <form action="" className="d-flex flex-column gap-15">
                  <CustomInput
                    type="email"
                    name="email"
                    placeholder="Email Address"
                  />

                  <CustomInput
                    type="password"
                    name="password"
                    placeholder="Password"
                    className="mt-1"
                  />
                  
                  <div>
                    <Link to="/forgot-password">Forgot Password?</Link>
                    <div className="mt-3 d-flex justify-content-center align-items-center gap-15">
                      <button className="button border-0" type="submit">
                        Login
                      </button>
                      <a href="/signup" className="button">
                        SignUp
                      </a>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
