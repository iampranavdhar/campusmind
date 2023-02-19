import express from "express";
import Course from "../models/Course.js";

const router = express.Router();

router.get("/getcourses/:org_id", async (req, res) => {
  try {
    const courses = await Course.find({ org_id: req.params.org_id });
    res.status(200).json(courses);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
});

// get course details by course id
router.get("/getcourse/:course_id", async (req, res) => {
  try {
    const course = await Course.find({ _id: req.params.course_id });
    res.status(200).json(course);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
});

/* Course Addition */
router.post("/addcourse", async (req, res) => {
  try {
    const course = new Course({
      org_id: req.body.org_id,
      course_code: req.body.course_code,
      course_title: req.body.course_title,
      course_description: req.body.course_description,
      course_syllabus_pdf_link: req.body.course_syllabus_pdf_link,
      course_faculty: req.body.course_faculty,
      course_credits: req.body.course_credits,
    });

    const course_data = await course.save();
    res.status(200).json(course_data);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
});

router.post("/deletecourse", async (req, res) => {
  try {
    const deleted_course = await Course.findOneAndDelete({
      org_id: req.body.org_id,
      _id: req.body.course_id,
    });
    res.status(200).json(deleted_course);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
});

router.post("/updatecourse", async (req, res) => {
  try {
    const updated_course = await Course.findOneAndUpdate(
      {
        org_id: req.body.org_id,
        _id: req.body.course_id,
      },
      {
        course_code: req.body.course_code,
        course_title: req.body.course_title,
        course_description: req.body.course_description,
        course_syllabus_pdf_link: req.body.course_syllabus_pdf_link,
        course_faculty: req.body.course_faculty,
        course_credits: req.body.course_credits,
      }
    );
    res.status(200).json(updated_course);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
});

export default router;
