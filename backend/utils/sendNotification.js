import NotificationToken from "../models/NotificationToken.js";

// For Events and Announcements
export const sendNotificationToAllUsers = async (data) => {
  const expo_push_url = "https://exp.host/--/api/v2/push/send";
  try {
    const org_id = data?.org_id;
    const title = data?.title;
    const desc = data?.body;

    const notification = await NotificationToken.find({
      org_id: org_id,
    });

    if (notification) {
      notification.forEach(async (user) => {
        if (token) {
          user.tokens.forEach(async (token) => {
            const body = {
              to: token,
              title: title,
              body: desc,
              data: { extraData: "Some data" },
            };
            const response = await fetch(expo_push_url, {
              method: "POST",
              headers: {
                Accept: "application/json",
                "Accept-encoding": "gzip, deflate",
                "Content-Type": "application/json",
              },
              body: JSON.stringify(body),
            });
            const data = await response.json();
          });
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

// For chat messages
export const sendNotificationToUser = async (data) => {
  const expo_push_url = "https://exp.host/--/api/v2/push/send";
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
          const body = {
            to: token,
            title: title,
            body: desc,
            data: { extraData: "Some data" },
          };
          const response = await fetch(expo_push_url, {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Accept-encoding": "gzip, deflate",
              "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
          });
          const data = await response.json();
          console.log(data);
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
  const expo_push_url = "https://exp.host/--/api/v2/push/send";
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
            const body = {
              to: token,
              title: title,
              body: desc,
              data: { extraData: "Some data" },
            };
            const response = await fetch(expo_push_url, {
              method: "POST",
              headers: {
                Accept: "application/json",
                "Accept-encoding": "gzip, deflate",
                "Content-Type": "application/json",
              },
              body: JSON.stringify(body),
            });
            const data = await response.json();
            console.log(data);
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
