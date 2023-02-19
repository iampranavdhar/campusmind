import mongoose from "mongoose";

const SemDetailsSchema = new mongoose.Schema(
  {
    org_id: {
      type: String,
      require: true,
    },
    graduation_year: {
      type: Number,
      require: true,
    },
    branch_id: {
      type: String,
      require: true,
    },
    sem_no: {
      type: Number,
      require: true,
    },
    sem_courses: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course",
      },
    ],
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("SemDetails", SemDetailsSchema);
