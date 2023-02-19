import { createSlice } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from "../../Components/Toast/Toast";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    userData: null,
    todoData: null,
    galleryData: null,
    userPushNotificationToken: null,
    accessToken: AsyncStorage.getItem("accessToken") || null,
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
    getUserDataSuccess: (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.errorMessage = "";
      state.userData = action.payload;
    },
    loginSuccess: (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.userData = action.payload;
      state.accessToken = action.payload.accessToken;
      AsyncStorage.setItem("accessToken", action.payload.accessToken);
      Toast("Login Successful");
    },
    registerSuccess: (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.errorMessage = "";
      state.userData = action.payload;
    },
    addPushNotificationToken: (state, action) => {
      state.userPushNotificationToken = action.payload;
    },
    getTodoBoardSuccess: (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.errorMessage = "";
      state.todoData = action.payload;
    },
    getGallerySuccess: (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.errorMessage = "";
      state.galleryData = action.payload;
    },
    logoutSucess: (state) => {
      state.userData = null;
      state.accessToken = null;
      AsyncStorage.removeItem("accessToken");
      state.isLoading = false;
      state.isError = false;
      Toast("Logged out successfully");
    },
  },
});

export const {
  actionStart,
  loginSuccess,
  actionFailure,
  logoutSucess,
  getTodoBoardSuccess,
  addPushNotificationToken,
  getGallerySuccess,
} = userSlice.actions;
