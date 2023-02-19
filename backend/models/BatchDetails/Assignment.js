import mongoose from "mongoose";

const AssignmentSchema = new mongoose.Schema(
  {
    org_id: {
      type: String,
      required: true,
    },
    section_id: {
      type: String,
      required: true,
    },
    subject_code: {
      type: String,
      required: true,
    },
    subject_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
    },
    assignment_title: {
      type: String,
      required: true,
    },
    assignment_description: {
      type: String,
    },
    assignment_duedateandtime: {
      type: String,
      required: true,
    },
    color: {
      type: String,
      required: true,
    },
    assignment_submissions: [
      {
        user_id: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
        submission_dateandtime: {
          type: String,
        },
        submission_files: {
          type: Array,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Assignment", AssignmentSchema);
