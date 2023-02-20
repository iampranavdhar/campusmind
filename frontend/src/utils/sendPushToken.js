import axios from "axios";
import { API_KEY } from "@env";

export const sendPushToken = async (token, user_id, org_id) => {
  try {
    const response = await axios({
      method: "post",
      url: API_KEY + "api/pushNotifications/addToken",
      data: {
        token: token,
        user_id: user_id,
        org_id: org_id,
      },
    });
  } catch (error) {
    console.log(error);
  }
};
