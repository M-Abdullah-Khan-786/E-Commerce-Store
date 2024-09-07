import "../CSS/Auth.css"
import Meta from '../components/Meta'
import BreadCrumb from '../components/BreadCrumb'

const ResetPasssword = () => {
  return (
    <>
      <Meta title="Reset Password" />
       <BreadCrumb title="Reset Password" />
       <div className="auth-wrapper home-wrapper-2">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="auth-card">
                <h3 className="text-center mb-3">Reset your Password</h3>
                <form action="" className="d-flex flex-column gap-15">
                  <div>
                    <input
                      type="password"
                      name="password"
                      id=""
                      placeholder="New Password"
                      className="form-control"
                    />
                  </div>
                  <div className="mt-1">
                    <input
                      type="password"
                      name="password"
                      id=""
                      placeholder="Confirm Password"
                      className="form-control"
                    />
                  </div>
                  <div>
                    <div className="mt-2 d-flex flex-column justify-content-center align-items-center gap-15">
                      <button className="button border-0" type="submit" >Submit</button>
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

export default ResetPasssword