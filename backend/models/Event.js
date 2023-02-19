import mongoose from "mongoose";

const EventSchema = new mongoose.Schema({
  org_id: {
    type: String,
    require: true,
  },
  event_title: {
    type: String,
    required: true,
  },
  event_description: {
    type: String,
  },
  event_dateandtime: {
    type: String,
    required: true,
  },
  event_venue: {
    type: String,
    required: true,
  },
  event_image: {
    type: String,
    default: "",
  },
  event_attendees_count: {
    type: Number,
    default: 0,
  },
  event_register_link: {
    type: String,
    default: "",
  },
});

export default mongoose.model("Event", EventSchema);
