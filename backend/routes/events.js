import express from "express";
import Event from "../models/Event.js";
import Org from "../models/Org.js";
import { sendNotificationToAllUsers } from "../utils/sendNotification.js";
const router = express.Router();

// Add Event with image
router.post("/addevent", async (req, res) => {
  try {
    const event = await new Event({
      org_id: req.body.org_id,
      event_title: req.body.event_title,
      event_description: req.body.event_description,
      event_dateandtime: req.body.event_dateandtime,
      event_image: req.body.event_image,
      event_venue: req.body.event_venue,
      event_register_link: req.body.event_register_link,
    });

    await Org.findOneAndUpdate(
      { _id: req.body.org_id },
      { $push: { events: event._id } },
      { new: true }
    );

    if (
      await sendNotificationToAllUsers({
        org_id: req.body.org_id,
        title: req.body.event_title,
        body:
          req.body.event_description.length > 100
            ? req.body.event_description.substring(0, 100) + "..."
            : req.body.event_description,
      })
    ) {
      console.log("Notification sent successfully");
    } else {
      console.log("Notification not sent");
    }

    const event_data = await event.save();
    res.status(200).json(event_data);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err });
  }
});

// get all events based on org_id
router.get("/getallevents/:org_id", async (req, res) => {
  try {
    const events = await Event.find({
      org_id: req.params.org_id,
    });

    res.status(200).json(events);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err });
  }
});

// delete event based on event_id
router.delete("/deleteevent/:event_id", async (req, res) => {
  try {
    const event = await Event.findOneAndDelete({
      _id: req.params.event_id,
    });

    await Org.findOneAndUpdate(
      { _id: req.query.org_id },
      { $pull: { events: event._id } },
      { new: true }
    );

    res.status(200).json(event);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err });
  }
});

//update event based on event_id
router.post("/updateevent", async (req, res) => {
  try {
    const event = await Event.findOneAndUpdate(
      { _id: req.body.event_id },
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(event);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err });
  }
});

export default router;
