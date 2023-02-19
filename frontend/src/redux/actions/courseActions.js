import axios from "axios";
import {
  actionFailure,
  actionStart,
  getCoursesSuccess,
  addCourseSuccess,
  deleteCourseSuccess,
  updateCourseSuccess,
} from "../reducers/courseReducer";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_KEY } from "@env";
const accessToken = AsyncStorage.getItem("accessToken");

export const get_courses = async (dispatch, org_id) => {
  try {
    dispatch(actionStart());
    const response = await axios.get(
      API_KEY + "api/courses/getcourses/" + org_id,
      {
        headers: {
          token: `Bearer ${accessToken}`,
        },
      }
    );
    dispatch(getCoursesSuccess(response.data));
  } catch (error) {
    dispatch(actionFailure(error.message));
  }
};

export const add_course = async (dispatch, course) => {
  try {
    dispatch(actionStart());
    const response = await axios.post(
      API_KEY + "api/courses/addcourse",
      course,
      {
        headers: {
          token: `Bearer ${accessToken}`,
        },
      }
    );
    dispatch(addCourseSuccess([response.data]));
  } catch (error) {
    dispatch(actionFailure(error.message));
  }
};

export const delete_course = async (dispatch, data) => {
  try {
    dispatch(actionStart());
    const response = await axios.post(
      API_KEY + "api/courses/deletecourse",
      data,
      {
        headers: {
          token: `Bearer ${accessToken}`,
        },
      }
    );
    dispatch(deleteCourseSuccess(response.data));
  } catch (error) {
    dispatch(actionFailure(error.message));
  }
};

export const update_course = async (dispatch, data) => {
  try {
    dispatch(actionStart());
    const response = await axios.post(
      API_KEY + "api/courses/updatecourse",
      data,
      {
        headers: {
          token: `Bearer ${accessToken}`,
        },
      }
    );
    dispatch(updateCourseSuccess(response.data));
  } catch (error) {
    dispatch(actionFailure(error.message));
  }
};
