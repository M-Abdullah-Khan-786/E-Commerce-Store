import "../CSS/Auth.css";
import BreadCrumb from "../components/BreadCrumb";
import Meta from "../components/Meta";
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
                  <div>
                    <input
                      type="text"
                      name="name"
                      id=""
                      placeholder="Name"
                      className="form-control"
                    />
                  </div>
                  <div>
                    <input
                      type="email"
                      name="email"
                      id=""
                      placeholder="Email Address"
                      className="form-control"
                    />
                  </div>
                  <div>
                    <input
                      type="tel"
                      name="phone"
                      id=""
                      placeholder="Phone Number"
                      className="form-control"
                    />
                  </div>
                  <div className="mt-1">
                    <input
                      type="password"
                      name="password"
                      id=""
                      placeholder="Password"
                      className="form-control"
                    />
                  </div>
                  <div>
                    <div className="mt-2 d-flex justify-content-center align-items-center gap-15">
                      <button className="button border-0" type="submit">Sign Up</button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default SignUp
