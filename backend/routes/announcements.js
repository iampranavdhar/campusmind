import express from "express";
import Announcement from "../models/Announcement.js";
import Org from "../models/Org.js";
import { sendNotificationToAllUsers } from "../utils/sendNotification.js";
const router = express.Router();

// Add Announcement
router.post("/addannouncement", async (req, res) => {
  try {
    const announcement = await new Announcement({
      org_id: req.body.org_id,
      announcement_category: req.body.announcement_category,
      announcement: req.body.announcement,
      color: req.body.color,
    });

    await Org.findOneAndUpdate(
      { _id: req.body.org_id },
      { $push: { announcements: announcement._id } },
      { new: true }
    );

    const announcement_data = await announcement.save();

    var dataToNotify = {
      org_id: req.body.org_id,
      title: req.body.announcement_category,
      body: req.body.announcement,
    };

    if (await sendNotificationToAllUsers(dataToNotify)) {
      console.log("Notification sent successfully");
    } else {
      console.log("Notification not sent");
    }

    res.status(200).json(announcement_data);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err });
  }
});

// get all announcement based on org_id
router.get("/getallannouncements/:org_id", async (req, res) => {
  try {
    const announcements = await Announcement.find({
      org_id: req.params.org_id,
    });

    res.status(200).json(announcements);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err });
  }
});

// delete announcement based on announcement_id
router.delete("/deleteannouncement", async (req, res) => {
  try {
    const announcement = await Announcement.findOneAndDelete({
      _id: req.query.announcement_id,
    });

    await Org.findOneAndUpdate(
      { _id: req.query.org_id },
      { $pull: { announcements: announcement._id } },
      { new: true }
    );

    res.status(200).json(announcement);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err });
  }
});

//update announcement based on announcement_id
router.post("/updateannouncement", async (req, res) => {
  try {
    const announcement = await Announcement.findOneAndUpdate(
      { _id: req.body.announcement_id },
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(announcement);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err });
  }
});

export default router;
