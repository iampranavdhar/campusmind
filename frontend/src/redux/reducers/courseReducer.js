import { createSlice } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from "../../Components/Toast/Toast";

export const courseSlice = createSlice({
  name: "coursesDetails",
  initialState: {
    coursesData: [],
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
    getCoursesSuccess: (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.errorMessage = "";
      state.coursesData = action.payload;
    },
    addCourseSuccess: (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.errorMessage = "";
      state.coursesData = [...state.coursesData, ...action.payload];
      Toast("Course added successfully", "success");
    },
    deleteCourseSuccess: (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.errorMessage = "";
      // remove the deleted course from the state
      // state.coursesData = state.coursesData.filter(
      //   (course) => course._id !== action.payload
      // );
      state.coursesData = state.coursesData.filter(
        (course) => course._id !== action.payload._id
      );
      Toast("Course deleted successfully", "success");
    },
    updateCourseSuccess: (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.errorMessage = "";
      state.coursesData = action.payload;
      Toast("Course updated successfully", "success");
    },
  },
});

export const {
  actionStart,
  actionFailure,
  getCoursesSuccess,
  addCourseSuccess,
  deleteCourseSuccess,
  updateCourseSuccess,
} = courseSlice.actions;
