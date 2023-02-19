import { createSlice } from "@reduxjs/toolkit";
import Toast from "../../Components/Toast/Toast";

export const announcementSlice = createSlice({
  name: "announcement",
  initialState: {
    announcementsData: null,
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
    getAnnouncementsSuccess: (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.errorMessage = "";
      state.announcementsData = action.payload;
    },
    addAnnouncementSuccess: (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.errorMessage = "";
      Toast("Announcement added successfully");
    },
  },
});

export const {
  actionStart,
  actionFailure,
  getAnnouncementsSuccess,
  addAnnouncementSuccess,
} = announcementSlice.actions;
