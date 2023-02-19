import express from "express";
import NotificationToken from "../models/NotificationToken.js";
const router = express.Router();

// Add Notification Token
router.post("/addToken", async (req, res) => {
  try {
    // check if token already exists for the user
    const notification = await NotificationToken.findOne({
      org_id: req.body.org_id,
      user_id: req.body.user_id,
    });

    if (notification) {
      if (notification.tokens.includes(req.body.token)) {
      } else {
        // update the token array with new token
        const updatedOne = await NotificationToken.updateOne(
          {
            org_id: req.body.org_id,
            user_id: req.body.user_id,
          },
          {
            $push: {
              tokens: req.body.token,
            },
          }
        );
        res.status(200).json(updatedOne);
      }
    } else {
      const newNotification = await new NotificationToken({
        org_id: req.body.org_id,
        user_id: req.body.user_id,
        tokens: [req.body.token],
      });
      const notification_data = await newNotification.save();
      res.status(200).json(notification_data);
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err });
  }
});

// remove Notification Token
router.post("/removeToken", async (req, res) => {
  try {
    // check if token already exists for the user
    const notification = await NotificationToken.findOne({
      org_id: req.body.org_id,
      user_id: req.body.user_id,
    });

    if (notification) {
      if (notification.tokens.includes(req.body.token)) {
        const updatedOne = await NotificationToken.updateOne(
          {
            org_id: req.body.org_id,
            user_id: req.body.user_id,
          },
          {
            $pull: {
              tokens: req.body.token,
            },
          }
        );
        res.status(200).json(updatedOne);
      } else {
        res.status(200).json({ message: "Token not found" });
      }
    } else {
      res.status(200).json({ message: "Token not found" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err });
  }
});

// send a notification to all users
router.post("/sendNotification", async (req, res) => {
  const expo_push_url = "https://exp.host/--/api/v2/push/send";
  try {
    const notification = await NotificationToken.find({
      org_id: req.body.org_id,
    });

    if (notification) {
      notification.forEach(async (user) => {
        user.tokens.forEach(async (token) => {
          const body = {
            to: token,
            title: req.body.title,
            body: req.body.body,
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
        });
      });
      res.status(200).json({ message: "Notification sent" });
    } else {
      res.status(200).json({ message: "No users found" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err });
  }
});

export default router;
