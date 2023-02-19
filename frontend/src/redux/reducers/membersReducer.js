import { createSlice } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from "../../Components/Toast/Toast";

export const membersSlice = createSlice({
  name: "members",
  initialState: {
    orgMembersData: null,
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
    getOrgMembersSuccess: (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.errorMessage = "";
      state.orgMembersData = action.payload;
    },
    addMemberSuccess: (state, action) => {
      state.orgMembersData.push(action.payload);
      Toast("Member Added Successfully");
    },
    deleteMemberSuccess: (state, action) => {
      const index = state.orgMembersData.findIndex(
        (member) => member._id === action.payload._id
      );
      state.orgMembersData.splice(index, 1);
    },
  },
});

export const {
  actionStart,
  actionFailure,
  getOrgMembersSuccess,
  addMemberSuccess,
  deleteMemberSuccess,
} = membersSlice.actions;
