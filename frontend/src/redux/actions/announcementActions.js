import axios from "axios";
import {
  actionFailure,
  actionStart,
  getAnnouncementsSuccess,
  addAnnouncementSuccess,
} from "../reducers/announcementReducer";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_KEY } from "@env";

const accessToken = AsyncStorage.getItem("accessToken");

export const get_announcements = async (dispatch, org_id) => {
  console.log(org_id, "org_id");
  try {
    dispatch(actionStart());
    const response = await axios.get(
      API_KEY + "api/announcement/getallannouncements/" + org_id,
      {
        headers: {
          token: `Bearer ${accessToken}`,
        },
      }
    );
    console.log(response.data, "announcements");
    dispatch(getAnnouncementsSuccess(response.data));
  } catch (error) {
    dispatch(actionFailure(error.message));
  }
};

export const add_announcement = async (dispatch, data) => {
  try {
    dispatch(actionStart());
    const response = await axios.post(
      API_KEY + "api/announcement/addannouncement",
      data,
      {
        headers: {
          token: `Bearer ${accessToken}`,
        },
      }
    );
    dispatch(addAnnouncementSuccess(response.data));
  } catch (error) {
    dispatch(actionFailure(error.message));
  }
};
