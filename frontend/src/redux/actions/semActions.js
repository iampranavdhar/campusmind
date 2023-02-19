import axios from "axios";
import {
  actionFailure,
  actionStart,
  getAllSemsDetails,
} from "../reducers/semReducer";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_KEY } from "@env";
const accessToken = AsyncStorage.getItem("accessToken");

export const get_all_sems_details = async (dispatch, data) => {
  try {
    dispatch(actionStart());
    const response = await axios.get(
      API_KEY + "api/semdetails/getallsems/" + data.org_id,

      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    dispatch(getAllSemsDetails(response.data));
  } catch (err) {
    dispatch(actionFailure(err.message));
  }
};
