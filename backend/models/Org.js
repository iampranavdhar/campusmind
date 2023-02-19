import mongoose from "mongoose";

const OrgSchema = new mongoose.Schema(
  {
    org_image: {
      type: String,
      default: "",
    },
    org_name: {
      type: String,
      require: true,
      unique: true,
    },
    org_adress: {
      type: String,
      require: true,
    },
    org_users: [
      {
        type: mongoose.Types.ObjectId,
        ref: "User",
      },
    ],
    org_announcements: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Announcement",
      },
    ],
    org_events: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Event",
      },
    ],
    org_branches: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Branch",
      },
    ],
    org_email: {
      type: String,
      require: true,
      unique: true,
    },
    org_password: {
      type: String,
      require: true,
      min: 6,
    },
    org_mobile: {
      type: Number,
      require: true,
      unique: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Org", OrgSchema);
