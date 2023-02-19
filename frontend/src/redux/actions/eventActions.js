import axios from "axios";
import {
  actionFailure,
  actionStart,
  getEventsSuccess,
  addEventSuccess,
  deleteEventSuccess,
} from "../reducers/eventReducer";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_KEY } from "@env";
const accessToken = AsyncStorage.getItem("accessToken");

export const get_events = async (dispatch, org_id) => {
  try {
    dispatch(actionStart());
    const response = await axios.get(
      API_KEY + "api/event/getallevents/" + org_id,
      {
        headers: {
          token: `Bearer ${accessToken}`,
        },
      }
    );
    dispatch(getEventsSuccess(response.data));
  } catch (error) {
    dispatch(actionFailure(error.message));
  }
};

export const add_event = async (dispatch, data) => {
  try {
    dispatch(actionStart());
    const response = await axios.post(API_KEY + "api/event/addevent", data, {
      headers: {
        token: `Bearer ${accessToken}`,
      },
    });
    dispatch(addEventSuccess(response.data));
  } catch (error) {
    dispatch(actionFailure(error.message));
    console.log(error);
  }
};

export const delete_event = async (dispatch, event_id) => {
  try {
    dispatch(actionStart());
    const response = await axios.delete(
      API_KEY + "api/event/deleteevent/" + event_id,
      {
        headers: {
          token: `Bearer ${accessToken}`,
        },
      }
    );
    dispatch(deleteEventSuccess(response.data));
    await get_events(dispatch, response.data.org_id);
  } catch (error) {
    dispatch(actionFailure(error.message));
    console.log(error);
  }
};
