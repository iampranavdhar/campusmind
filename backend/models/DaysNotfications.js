import mongoose from "mongoose";

const DaysNotificationsSchema = new mongoose.Schema({
  notifications: {
    type: Array,
  },
});

export default mongoose.model("DaysNotifications", DaysNotificationsSchema);
