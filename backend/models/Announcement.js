import mongoose from "mongoose";

const AnnouncementSchema = new mongoose.Schema(
  {
    org_id: {
      type: String,
      require: true,
    },
    announcement_category: {
      type: String,
      required: true,
    },
    announcement: {
      type: String,
      required: true,
    },
    color: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Announcement", AnnouncementSchema);
