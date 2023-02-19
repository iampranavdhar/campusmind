import { createSlice } from "@reduxjs/toolkit";

export const semSlice = createSlice({
  name: "sems",
  initialState: {
    allSemsData: null,
    isLoading: false,
    isError: false,
    errorMessage: "",
  },
  reducers: {
    actionStart: (state, action) => {
      state.isLoading = true;
      state.isError = false;
      state.errorMessage = "";
    },
    actionFailure: (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.errorMessage = action.payload;
    },
    getAllSemsDetails: (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.errorMessage = "";
      state.allSemsData = action.payload;
    },
  },
});

export const { actionStart, actionFailure, getAllSemsDetails } =
  semSlice.actions;
