import AsyncStorage from "@react-native-async-storage/async-storage";
import messaging from "@react-native-firebase/messaging";
import { Alert } from "react-native";
import { sendPushToken } from "./sendPushToken.js";

export async function requestUserPermission() {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    console.log("Authorization status:", authStatus);
  }
}

export async function GetFCMToken(user) {
  let FCMToken = await AsyncStorage.getItem("fcmtoken");

  if (!FCMToken) {
    try {
      FCMToken = await messaging().getToken();
      if (FCMToken) {
        // user has a device token
        await AsyncStorage.setItem("fcmtoken", FCMToken);
      } else {
        await requestUserPermission();
      }
    } catch (error) {
      console.log(error);
    }
  }
  await sendPushToken(FCMToken, user?._id, user?.org_id);
}

export const NotificationListener = async () => {
  try {
    messaging().onNotificationOpenedApp((remoteMessage) => {
      console.log(
        "Notification caused app to open from background state:",
        remoteMessage.notification
      );
      navigation.navigate(remoteMessage.data.type);
    });

    await messaging()
      .getInitialNotification()
      .then((remoteMessage) => {
        if (remoteMessage) {
          console.log(
            "Notification caused app to open from quit state:",
            remoteMessage.notification
          );
        }
      });

    messaging().onMessage(async (remoteMessage) => {
      console.log("A new FCM message arrived!", JSON.stringify(remoteMessage));
    });
  } catch (error) {
    console.log(error);
  }
};
