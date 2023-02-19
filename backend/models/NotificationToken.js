import mongoose from "mongoose";

const NotificationTokenSchema = new mongoose.Schema({
  org_id: {
    type: String,
    require: true,
  },
  user_id: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    require: true,
  },
  tokens: [
    {
      type: String,
      require: true,
    },
  ],
});

export default mongoose.model("NotificationToken", NotificationTokenSchema);
