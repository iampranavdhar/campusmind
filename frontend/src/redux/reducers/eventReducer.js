import { createSlice } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from "../../Components/Toast/Toast";

export const eventSlice = createSlice({
  name: "event",
  initialState: {
    eventsData: null,
    isLoading: false,
    isError: false,
    errorMessage: "",
  },
  reducers: {
    // get the user data from the server and store it in the redux store based on the access token
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
    getEventsSuccess: (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.errorMessage = "";
      state.eventsData = action.payload;
    },
    addEventSuccess: (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.errorMessage = "";
      Toast("Event added successfully");
    },
    deleteEventSuccess: (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.errorMessage = "";
      Toast("Event deleted successfully");
    }
  },
});

export const { actionStart, actionFailure, getEventsSuccess, addEventSuccess,deleteEventSuccess } =
  eventSlice.actions;
