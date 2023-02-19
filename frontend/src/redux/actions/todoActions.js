import axios from "axios";
import {
  actionFailure,
  actionStart,
  getTodoBoardSuccess,
  addTodoCategorySuccess,
  addTaskSuccess,
  removeTaskSuccess,
  updateTaskSuccess,
} from "../reducers/todoReducer";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_KEY } from "@env";
const accessToken = AsyncStorage.getItem("accessToken");

export const get_todo_data = async (dispatch, user) => {
  try {
    dispatch(actionStart());
    const response = await axios.get(
      API_KEY + "api/todo/gettodoboard/" + user._id,
      {
        headers: {
          token: `Bearer ${accessToken}`,
        },
      }
    );
    dispatch(getTodoBoardSuccess(response.data));
  } catch (error) {
    dispatch(actionFailure(error.message));
  }
};

export const add_todo_category = async (dispatch, data) => {
  try {
    dispatch(actionStart());
    const response = await axios.post(API_KEY + "api/todo/addcategory", data, {
      headers: {
        token: `Bearer ${accessToken}`,
      },
    });
    dispatch(addTodoCategorySuccess(response.data));
  } catch (error) {
    dispatch(actionFailure(error.message));
    console.log(error);
  }
};

export const add_todo_task = async (dispatch, data) => {
  try {
    dispatch(actionStart());
    const response = await axios.post(API_KEY + "api/todo/addtask", data, {
      headers: {
        token: `Bearer ${accessToken}`,
      },
    });
    dispatch(addTaskSuccess(response.data));
  } catch (error) {
    dispatch(actionFailure(error.message));
  }
};

export const remove_todo_task = async (dispatch, data) => {
  try {
    dispatch(actionStart());
    const response = await axios.post(API_KEY + "api/todo/deletetask", data, {
      headers: {
        token: `Bearer ${accessToken}`,
      },
    });
    dispatch(removeTaskSuccess(response.data));
  } catch (error) {
    dispatch(actionFailure(error.message));
  }
};

export const update_todo_task = async (dispatch, data) => {
  try {
    dispatch(actionStart());
    const response = await axios.post(API_KEY + "api/todo/updatetask", data, {
      headers: {
        token: `Bearer ${accessToken}`,
      },
    });
    dispatch(updateTaskSuccess(response.data));
  } catch (error) {
    dispatch(actionFailure(error.message));
    console.log(error, "todoError");
  }
};
