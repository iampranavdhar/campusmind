import axios from "axios";
import {
  actionFailure,
  actionStart,
  getBranchesSuccess,
  getSectionsSuccess,
  getTimeTableSuccess,
  getAssignmentsSuccess,
  addAssignmentSucess,
  addBranchSuccess,
  addSectionSuccess,
  submitAssignmentSucess,
} from "../reducers/batchDetailReducer";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_KEY } from "@env";

const accessToken = AsyncStorage.getItem("accessToken");

export const get_branches = async (dispatch, org_id) => {
  try {
    dispatch(actionStart());
    const response = await axios.get(
      API_KEY + "api/batchDetails/getbranches/" + org_id,
      {
        headers: {
          token: `Bearer ${accessToken}`,
        },
      }
    );
    dispatch(getBranchesSuccess(response.data));
  } catch (error) {
    dispatch(actionFailure(error.message));
  }
};

export const get_sections = async (dispatch, data) => {
  try {
    dispatch(actionStart());
    const response = await axios.post(
      API_KEY + "api/batchDetails/getsections",
      data,
      {
        headers: {
          token: `Bearer ${accessToken}`,
        },
      }
    );
    dispatch(getSectionsSuccess(response.data));
  } catch (error) {
    dispatch(actionFailure(error.message));
    console.log(error.message);
  }
};

export const get_timetable = async (dispatch, data) => {
  console.log(data, "data");
  try {
    dispatch(actionStart());
    const response = await axios.post(
      API_KEY + "api/batchDetails/gettimetable",
      data,
      {
        headers: {
          token: `Bearer ${accessToken}`,
        },
      }
    );
    console.log(response.data, "timetable");
    dispatch(getTimeTableSuccess(response.data));
  } catch (error) {
    dispatch(actionFailure(error.message));
    console.log(error.message);
  }
};

export const get_assignments = async (dispatch, data) => {
  try {
    dispatch(actionStart());
    const response = await axios.post(
      API_KEY + "api/batchDetails/getassignments",
      data,
      {
        headers: {
          token: `Bearer ${accessToken}`,
        },
      }
    );
    dispatch(getAssignmentsSuccess(response.data));
  } catch (error) {
    dispatch(actionFailure(error.message));
  }
};

export const add_assignment = async (dispatch, data) => {
  try {
    dispatch(actionStart());
    const response = await axios.post(
      API_KEY + "api/batchDetails/addassignment",
      data,
      {
        headers: {
          token: `Bearer ${accessToken}`,
        },
      }
    );
    dispatch(addAssignmentSucess(response.data));
  } catch (error) {
    dispatch(actionFailure(error.message));
  }
};

export const submit_assignment = async (dispatch, data) => {
  try {
    dispatch(actionStart());
    const response = await axios.post(
      API_KEY + "api/batchDetails/submitassignment",
      data,
      {
        headers: {
          token: `Bearer ${accessToken}`,
        },
      }
    );
    dispatch(submitAssignmentSucess(response.data));
  } catch (error) {
    dispatch(actionFailure(error.message));
  }
};

export const add_branch = async (dispatch, data) => {
  try {
    dispatch(actionStart());
    const response = await axios.post(
      API_KEY + "api/batchDetails/addbranch",
      data,
      {
        headers: {
          token: `Bearer ${accessToken}`,
        },
      }
    );
    dispatch(addBranchSuccess(response.data));
  } catch (error) {
    dispatch(actionFailure(error.message));
  }
};

export const add_section = async (dispatch, data) => {
  try {
    dispatch(actionStart());
    const response = await axios.post(
      API_KEY + "api/batchDetails/addsection",
      data,
      {
        headers: {
          token: `Bearer ${accessToken}`,
        },
      }
    );
    dispatch(addSectionSuccess(response.data));
  } catch (error) {
    dispatch(actionFailure(error.message));
    console.log(error.message);
  }
};
