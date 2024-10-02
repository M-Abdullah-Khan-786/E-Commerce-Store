import "../CSS/ResetPassword.css"
import CustomInput from "../components/CustomInput"

const ResetPassword = () => {
  return (
    <>
      <div className="reset py-5">
        <br />
        <br />
        <br />
        <br />
        <div className="my-5 w-25 bg-white rounded-3 mx-auto p-4">
          <h3 className="text-center title">Reset Password</h3>
          <p className="text-center">Enter registered email to reset password</p>
          <form action="">
            <CustomInput
              type="email"
              placeholder="Email Addresss"
              id="email"
              className="w-100"
            />
            <button className="button border-0 px-3 py-2 text-white fw-bold w-100" type="submit">
              Send Reset Link
            </button>
          </form>
        </div>
      </div> 
    </>
  )
}

export default ResetPassword
