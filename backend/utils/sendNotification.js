import NotificationToken from "../models/NotificationToken.js";

import admin from "firebase-admin";
import service_account_file from "../google_service_account.json" assert { type: "json" };

const newAdmin = admin.initializeApp({
  credential: admin.credential.cert(service_account_file),
  databaseURL: "https://campusmind-30beb.firebaseio.com",
});

// For Events and Announcements
export const sendNotificationToAllUsers = async (data) => {
  try {
    const org_id = data?.org_id;
    const title = data?.title;
    const desc = data?.body;

    const notification = await NotificationToken.find({
      org_id: org_id,
    });

    if (notification) {
      notification.forEach(async (user) => {
        user.tokens.forEach(async (token) => {
          const message = {
            notification: {
              title: title,
              body: desc,
            },
            token: token,
          };

          const response = await newAdmin.messaging().send(message);
          console.log(response);
        });
      });
      return true;
    } else {
      return false;
    }
  } catch (err) {
    console.log(err);
    return false;
  }
};

// For chat messages
export const sendNotificationToUser = async (data) => {
  try {
    const org_id = data?.org_id;
    const title = data?.title;
    const desc = data?.body;
    const user_id = data?.user_id;

    const notification = await NotificationToken.findOne({
      org_id: org_id,
      user_id: user_id,
    });

    if (notification) {
      notification.tokens.forEach(async (token) => {
        if (token) {
          const message = {
            notification: {
              title: title,
              body: desc,
            },
            token: token,
          };

          const response = await newAdmin.messaging().send(message);
          console.log(response);
        }
      });
      return true;
    } else {
      return false;
    }
  } catch (err) {
    console.log(err);
    return false;
  }
};

//  For Assignments
export const sendNotificationToAllUsersInClass = async (data) => {
  try {
    const org_id = data?.org_id;
    const title = data?.title;
    const desc = data?.body;
    const section_id = data?.section_id;

    const notification = await NotificationToken.find({
      org_id: org_id,
    }).populate({
      path: "user_id",
      match: {
        "batch_details.section_id": section_id,
      },
    });

    if (notification) {
      notification.forEach(async (user) => {
        user.tokens.forEach(async (token) => {
          if (token) {
            const message = {
              notification: {
                title: title,
                body: desc,
              },
              token: token,
            };

            const response = await newAdmin.messaging().send(message);
            console.log(response, "this_is_not");
          }
        });
      });
      return true;
    } else {
      return false;
    }
  } catch (err) {
    console.log(err);
    return false;
  }
};
