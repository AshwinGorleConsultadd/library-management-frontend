import axiosClient from "@/lib/exios";
import { authActions } from "../sclices/authSlice"
import { toast } from "react-toastify";

export const loginService = (data: { username: string; password: string }) => {
  return async (dispatch: any) => {
    try {
      console.log("login-request: ", data)
      dispatch(authActions.loginRequest())

      const formData = new URLSearchParams()
      formData.append("username", data.username)
      formData.append("password", data.password)

      const response = await axiosClient.post('http://127.0.0.1:8000/auth/login', formData, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        }
      })

      console.log("login-response: ", response.data)
      dispatch(authActions.loginSuccess(response.data))
      localStorage.setItem('token',response?.data?.access_token)
      
    } catch (error) {
      console.log("login error: ", error)
      console.log("login error: ", error?.response.data?.details)
      dispatch(authActions.loginFailure(error))
      toast(error?.response?.data?.detail || "Login failed")
    }
  }
}


export const signupService = (data: { name: string; email: string, password : string, confirm_password : string }) => {
  return async (dispatch: any) => {
    try {
      console.log("signup-request: ", data)
      dispatch(authActions.signupRequest())
      const response = await axiosClient.post('http://127.0.0.1:8000/auth/signup', data)
      console.log("signup-response: ", response.data)
      dispatch(authActions.signupSuccess(response.data))
      toast("signup sucessfull")
    } catch (error) {
      console.log("signup error: ", error)
      console.log("signup error: ", error?.response.data?.details)
      dispatch(authActions.signupFailure(error))
      toast(error?.response?.data?.detail || "signup failed")
    }
  }
}


export const verifyEmailService = (data: { name: string; email: string, password : string, confirm_password : string }) => {
  return async (dispatch: any) => {
    try {
      console.log("verify-email-request: ", data)
      dispatch(authActions.verifyEmailRequest())
      const response = await axiosClient.post('http://127.0.0.1:8000/auth/verify-email', data)
      console.log("verify-email-response: ", response.data)
      dispatch(authActions.verifyEmailSuccess(response.data))
      localStorage.setItem('token',response?.data?.access_token)
      const message = response.data.message || 'Email verified sucessfull'
      toast(message)
    } catch (error) {
      console.log("verify-email error: ", error)
      console.log("verify-email error: ", error?.response.data?.details)
      dispatch(authActions.verifyEmailFailure(error))
      toast(error?.response?.data?.detail || "Something went wrong Email varification failed")
    }
  }
}