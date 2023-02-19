import mongoose from "mongoose";

const SectionTimetableSchema = new mongoose.Schema(
  {
    section_id: {
      type: String,
      required: true,
    },
    day: {
      type: String,
      required: true,
    },
    day_classes: [
      {
        class_name: {
          type: String,
          required: true,
        },
        start_time: {
          type: String,
          required: true,
        },
        end_time: {
          type: String,
          required: true,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("SectionTimetable", SectionTimetableSchema);
