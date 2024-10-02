import "../CSS/ForgotPassword.css"
import CustomInput from "../components/CustomInput"

const ForgotPassword = () => {
  return (
    <>
     <div className="forgot py-5">
        <br />
        <br />
        <br />
        <br />
        <div className="my-5 w-25 bg-white rounded-3 mx-auto p-4">
          <h3 className="text-center title">Forgot Password</h3>
          <p className="text-center">Enter your New Password & Confirm Password</p>
          <form action="">
          <CustomInput
              type="password"
              placeholder="New Password"
              id="password"
              className="w-100"
            />
          <CustomInput
              type="password"
              placeholder="Confirm Password"
              id="confirm-password"
              className="w-100"
            />
            <button className="button border-0 px-3 py-2 text-white fw-bold w-100" type="submit">
              Reset Password
            </button>
          </form>
        </div>
      </div> 
    </>
  )
}

export default ForgotPassword
