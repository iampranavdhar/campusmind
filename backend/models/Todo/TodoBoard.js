import mongoose from "mongoose";

const TodoBoardSchema = new mongoose.Schema(
  {
    user_id: {
      type: String,
      required: true,
    },
    categories: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Category",
      },
    ],
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("TodoBoard", TodoBoardSchema);
