import { combineReducers } from "@reduxjs/toolkit";
import { authReducer } from "../features/slices/Auth/authSlice.js";
const reducers = combineReducers({
  auth: authReducer,
});

const rootReducer = (state, action) => {
  return reducers(state, action);
};

export default rootReducer;
