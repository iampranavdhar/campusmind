import mongoose from "mongoose";

const ChatroomSchema = new mongoose.Schema(
  {
    org_id: {
      type: "String",
      required: true,
    },
    members: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    messages: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Message",
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model("Chatroom", ChatroomSchema);
