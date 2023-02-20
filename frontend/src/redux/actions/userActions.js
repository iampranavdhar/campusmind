import axios from "axios";
import {
  actionFailure,
  loginSuccess,
  actionStart,
  getUserDataSuccess,
  getTodoBoardSuccess,
  logoutSucess,
  addPushNotificationToken,
  getGallerySuccess,
} from "../reducers/userReducer";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_KEY } from "@env";
const accessToken = AsyncStorage.getItem("accessToken");

export const login = async (dispatch, user) => {
  dispatch(actionStart());
  try {
    const response = await axios.post(API_KEY + "api/auth/login", {
      email: user.email,
      password: user.password,
    });
    dispatch(loginSuccess(response.data));
  } catch (error) {
    await AsyncStorage.clear();
    dispatch(actionFailure(error.message));
    console.log(error);
  }
};

export const logout = async (dispatch, user, token) => {
  dispatch(actionStart());
  try {
    const response = await axios({
      method: "post",
      url: API_KEY + "api/pushNotifications/removeToken",
      data: {
        token: token,
        user_id: user?._id,
        org_id: user?.org_id,
      },
    });
    if (response.status === 200) {
      dispatch(logoutSucess());
      await AsyncStorage.clear();
    } else {
      dispatch(actionFailure("Something went wrong"));
    }
  } catch (error) {
    dispatch(actionFailure(error.message));
    console.log(error);
  }
};

export const get_user_data = async (dispatch, access_token) => {
  dispatch(actionStart());
  try {
    const response = await axios.get(API_KEY + "api/api/users", {
      headers: {
        token: `Bearer ${access_token}`,
      },
    });
    dispatch(getUserDataSuccess(response.data));
  } catch (error) {
    dispatch(actionFailure(error.message));
    console.log(error);
  }
};

export const get_todo_data = async (dispatch, user) => {
  try {
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
    console.log(error);
  }
};

export const add_push_notification_token = async (dispatch, token) => {
  dispatch(addPushNotificationToken(token));
};

export const get_gallery_data = async (dispatch, data) => {
  try {
    const response = await axios.post(
      API_KEY + "api/gallery/getGallery",
      data,
      {
        headers: {
          token: `Bearer ${accessToken}`,
        },
      }
    );
    dispatch(getGallerySuccess(response.data));
  } catch (error) {
    console.log(error);
  }
};

export const remove_image_from_gallery = async (dispatch, data) => {
  try {
    const response = await axios.post(
      API_KEY + "api/gallery/removeImage",
      data,
      {
        headers: {
          token: `Bearer ${accessToken}`,
        },
      }
    );
    dispatch(getGallerySuccess(response.data));
  } catch (error) {
    console.log(error);
  }
};

export const add_image_to_gallery = async (dispatch, data) => {
  try {
    const response = await axios.post(
      API_KEY + "api/gallery/updateGallery",
      data,
      {
        headers: {
          token: `Bearer ${accessToken}`,
        },
      }
    );
    dispatch(getGallerySuccess(response.data));
  } catch (error) {
    console.log(error);
  }
};
