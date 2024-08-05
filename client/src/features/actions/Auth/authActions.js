import { createAsyncThunk } from "@reduxjs/toolkit";
import apiClient from "../../../services/apiClient";

export const signup = createAsyncThunk(
  "auth/signup",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await apiClient.post("/api/v1/auth/signup", { payload });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data || error.message);
    }
  }
);
