import axios from "axios";
import {
  actionFailure,
  actionStart,
  getOrgMembersSuccess,
  addMemberSuccess,
  deleteMemberSuccess,
} from "../reducers/membersReducer";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_KEY } from "@env";
const accessToken = AsyncStorage.getItem("accessToken");

export const get_org_members = async (dispatch, org_id) => {
  try {
    dispatch(actionStart());
    const response = await axios.get(
      API_KEY + "api/users/getallusers/" + org_id,
      {
        headers: {
          token: `Bearer ${accessToken}`,
        },
      }
    );
    dispatch(getOrgMembersSuccess(response.data));
  } catch (error) {
    dispatch(actionFailure(error.message));
  }
};

export const add_member = async (dispatch, data) => {
  try {
    dispatch(actionStart());
    const response = await axios.post(API_KEY + "api/auth/register", data, {
      headers: {
        token: `Bearer ${accessToken}`,
      },
    });
    dispatch(addMemberSuccess(response.data));
  } catch (error) {
    dispatch(actionFailure(error.message));
    console.log(error.message);
  }
};

export const remove_member = async (dispatch, data) => {
  try {
    dispatch(actionStart());
    const response = await axios.post(API_KEY + "api/org/removeuser", data, {
      headers: {
        token: `Bearer ${accessToken}`,
      },
    });
    dispatch(deleteMemberSuccess(response.data));
  } catch (error) {
    dispatch(actionFailure(error.message));
  }
};
