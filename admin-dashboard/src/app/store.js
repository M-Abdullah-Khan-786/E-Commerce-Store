import { configureStore } from '@reduxjs/toolkit'
import authReducer from "../features/auth/authSlice.js"
import customerReducer from "../features/customer/customerSlice.js"

export const store = configureStore({
  reducer: {
    auth: authReducer,
    customer: customerReducer
  },
})