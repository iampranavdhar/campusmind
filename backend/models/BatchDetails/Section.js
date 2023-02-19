import mongoose from "mongoose";

const SectionSchema = new mongoose.Schema(
  {
    branch_id: {
      type: String,
      required: true,
    },
    section_name: {
      type: String,
      required: true,
    },
    // time table schema for section for each day
    time_table: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SectionTimetable",
    },
    assignments: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Assignment",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Section", SectionSchema);
