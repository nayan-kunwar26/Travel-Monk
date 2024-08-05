import { createSlice } from "@reduxjs/toolkit";
import { signup } from "../../actions/Auth/authActions";

const initialState = {
  isLoading: false,
  isSignupSuccess: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
   builder
    .addCase(signup.pending, (state) => {
          state.isLoading = true,
          state.isSignupSuccess = false,
          state.error= null                       
    })
    .addCase(signup.fulfilled, (state) => {
      state.isLoading = false,
      state.isSignupSuccess = true,
      state.error= null              
    })
    .addCase(signup.rejected, (state, action) => {
      state.isLoading = false,
      state.isSignupSuccess = action.payload,
      state.error= action.payload || "Signup failed"              
    })},
});

export const authReducer = authSlice.reducer;