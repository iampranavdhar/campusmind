import mongoose from "mongoose";

const TaskSchema = new mongoose.Schema(
  {
    category_id: {
      type: String,
      required: true,
    },
    task_title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    is_done: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Task", TaskSchema);
