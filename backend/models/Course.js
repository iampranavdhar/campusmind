import mongoose from "mongoose";

const CourseSchema = new mongoose.Schema(
  {
    org_id: {
      type: String,
      require: true,
    },
    course_code: {
      type: String,
      required: true,
    },
    course_title: {
      type: String,
      required: true,
    },
    course_description: {
      type: String,
    },
    course_syllabus_pdf_link: {
      type: String,
    },
    course_faculty: {
      type: "String",
      default: "Faculty of Engineering",
    },
    course_credits: {
      type: Number,
      required: true,
      default: 3,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Course", CourseSchema);
