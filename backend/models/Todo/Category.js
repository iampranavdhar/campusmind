import mongoose from "mongoose";

const CategorySchema = new mongoose.Schema({
  todo_board_id: {
    type: String,
    required: true,
  },
  category_name: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    required: true,
  },
  tasks: [
    {
      type: mongoose.Types.ObjectId,
      ref: "Task",
    },
  ],
});

export default mongoose.model("Category", CategorySchema);
