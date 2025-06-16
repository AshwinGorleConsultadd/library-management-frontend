import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name : "auth",
    initialState : {
        login : {
            status : "idle",
            error : null,
            data : null
        },
        signup : {
            status : "idle",
            error : null,
            data : null
        },
        verifyEmail : {
            status : "idle",
            error : null,
            data : null
        }
    },
    reducers : {
        //for login
        loginRequest : (state) => {
            state.login.status = "pending"
            state.login.error = null
            state.login.data = null
        },
        loginSuccess : (state, action) => {
            state.login.data = action.payload
            state.login.status = "success"
            state.login.error = null
        },
        loginFailure : (state, action) => {
            state.login.status = "failed"
            state.login.data = null
            state.login.error = action.payload 
        },
        clearLogin : (state, action) => {
            state.login.status = "idle"
            state.login.error = null
            state.login.data = null
        },
        //signup request
        signupRequest : (state) => {
            state.signup.status = "pending"
            state.signup.error = null
            state.signup.data = null
        },
        signupSuccess : (state, action) => {
            state.signup.data = action.payload
            state.signup.status = "success"
            state.signup.error = null
        },
        signupFailure : (state, action) => {
            state.signup.status = "failed"
            state.signup.data = null
            state.signup.error = action.payload 
        },
        clearSignup : (state, action) => {
            state.signup.status = "idle"
            state.signup.error = null
            state.signup.data = null
        },

        //verify-email
        verifyEmailRequest : (state) => {
            state.verifyEmail.status = "pending"
            state.verifyEmail.error = null
            state.verifyEmail.data = null
        },
        verifyEmailSuccess : (state, action) => {
            state.verifyEmail.data = action.payload
            state.verifyEmail.status = "success"
            state.verifyEmail.error = null
        },
        verifyEmailFailure : (state, action) => {
            state.verifyEmail.status = "failed"
            state.verifyEmail.data = null
            state.verifyEmail.error = action.payload 
        },
        clearVerifyEmail : (state, action) => {
            state.verifyEmail.status = "idle"
            state.verifyEmail.error = null
            state.verifyEmail.data = null
        },
        }
})
export default authSlice.reducer
export const authActions = authSlice.actions
