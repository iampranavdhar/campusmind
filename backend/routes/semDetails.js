import express from "express";
import SemDetails from "../models/SemDetails.js";

const router = express.Router();

router.post("/addsemdetails", async (req, res) => {
  try {
    const semDetails = await new SemDetails({
      org_id: req.body.org_id,
      graduation_year: req.body.graduation_year,
      branch_id: req.body.branch_id,
      sem_no: req.body.sem_no,
      sem_courses: req.body.sem_courses,
    });

    const saved_sem_details = await semDetails.save();

    res.status(200).json(saved_sem_details);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
});

router.get("/getallsems/:org_id", async (req, res) => {
  try {
    const allSems = await SemDetails.find({
      org_id: req.params.org_id,
    }).populate("sem_courses");
    res.status(200).json(allSems);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
});

router.get("/getsemdetails", async (req, res) => {
  try {
    const semDetails = await SemDetails.find({
      org_id: req.body.org_id,
      graduation_year: req.body.graduation_year,
      branch_id: req.body.branch_id,
    });
    res.status(200).json(semDetails);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
});

export default router;
