import "../CSS/Auth.css";
import BreadCrumb from "../components/BreadCrumb";
import Meta from "../components/Meta";
import CustomInput from "../components/CustomInput";

const SignUp = () => {
  return (
    <>
      <Meta title="Sign Up" />
      <BreadCrumb title="Sign Up" />
      <div className="auth-wrapper home-wrapper-2">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="auth-card">
                <h3 className="text-center mb-3">Create Account</h3>
                <form action="" className="d-flex flex-column gap-15">
                  <CustomInput
                    type="text"
                    name="name"
                    placeholder="Name"
                  />
                  <CustomInput
                    type="email"
                    name="email"
                    placeholder="Email Address"
                  />
                  <CustomInput
                    type="tel"
                    name="phone"
                    placeholder="Phone Number"
                  />
                  <CustomInput
                    type="password"
                    name="password"
                    placeholder="Password"
                    className="mt-1"
                  />
                  <div>
                    <div className="mt-2 d-flex justify-content-center align-items-center gap-15">
                      <button className="button border-0" type="submit">
                        Sign Up
                      </button>
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

export default SignUp;
