import { createSlice } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from "../../Components/Toast/Toast";

export const batchSlice = createSlice({
  name: "batchDetail",
  initialState: {
    branchesData: null,
    sectionsData: null,
    assignmentsData: null,
    timetableData: null,
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
    getBranchesSuccess: (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.errorMessage = "";
      state.branchesData = action.payload;
    },
    getSectionsSuccess: (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.errorMessage = "";
      state.sectionsData = action.payload;
    },
    getTimeTableSuccess: (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.errorMessage = "";
      state.timetableData = action.payload;
    },
    getAssignmentsSuccess: (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.errorMessage = "";
      state.assignmentsData = action.payload;
    },
    addAssignmentSucess: (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.errorMessage = "";
      Toast("Assignment added successfully");
    },
    submitAssignmentSucess: (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.errorMessage = "";
      // change the status of the assignment to submitted in the state
      state.assignmentsData = state.assignmentsData.map((assignment) => {
        if (assignment._id === action.payload._id) {
          assignment = action.payload;
        }
        return assignment;
      });
      Toast("Assignment submitted successfully");
    },
    addBranchSuccess: (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.errorMessage = "";
      Toast("Branch added successfully");
    },
    addSectionSuccess: (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.errorMessage = "";
      Toast("Section added successfully");
    },
  },
});

export const {
  actionStart,
  actionFailure,
  getBranchesSuccess,
  getSectionsSuccess,
  getTimeTableSuccess,
  getAssignmentsSuccess,
  addAssignmentSucess,
  addBranchSuccess,
  addSectionSuccess,
  submitAssignmentSucess,
} = batchSlice.actions;
