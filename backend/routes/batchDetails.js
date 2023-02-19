import express from "express";
import User from "../models/User.js";
import Branch from "../models/BatchDetails/Branch.js";
import Section from "../models/BatchDetails/Section.js";
import SectionTimetable from "../models/BatchDetails/SectionTimetable.js";
import Org from "../models/Org.js";
import Assignment from "../models/BatchDetails/Assignment.js";
import { sendNotificationToAllUsersInClass } from "../utils/sendNotification.js";
const router = express.Router();

/*
This Contains all the routes for the Batch Details 
Like Branch, Section, Section Timetable
*/

// Add Branch
router.post("/addbranch", async (req, res) => {
  try {
    // check if branch already exists
    const branch_data = await Branch.findOne({
      org_id: req.body.org_id,
      branch_name: req.body.branch_name,
    });

    if (branch_data) {
      res.status(200).json({
        message: "Branch already exists",
      });
    } else {
      const branch = await new Branch({
        org_id: req.body.org_id,
        branch_name: req.body.branch_name,
        sections: [],
      });

      const branch_data = await branch.save();

      await Org.findOneAndUpdate(
        { org_id: req.body.org_id },
        { $push: { branches: branch_data._id } },
        { new: true }
      );

      res.status(200).json(branch_data);
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
});

// Add Section based on branch id
router.post("/addsection", async (req, res) => {
  try {
    // check if branch exists
    const branch = await Branch.findOne({
      _id: req.body.branch_id,
    }).populate("sections");

    if (!branch) {
      return res.status(404).json({
        message: "Branch not found",
      });
    }

    // check if the section name already exists in the sections array of the branch
    const section = branch.sections?.find(
      (section) => section?.section_name === req.body.section_name
    );
    if (section) {
      return res.status(400).json({
        message: "Section already exists",
      });
    } else {
      const section = await new Section({
        branch_id: req.body.branch_id,
        section_name: req.body.section_name,
        timetable: [],
      });

      const section_data = await section.save();
      // push section_id to branch
      await Branch.findOneAndUpdate(
        { _id: req.body.branch_id },
        { $push: { sections: section_data._id } },
        { new: true }
      );

      res.status(200).json(section_data);
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
});

// Add Timetable based on section_id
router.post("/addtimetable", async (req, res) => {
  try {
    // check if day exists

    const day = req.body.day;
    if (
      day !== "Monday" &&
      day !== "Tuesday" &&
      day !== "Wednesday" &&
      day !== "Thursday" &&
      day !== "Friday" &&
      day !== "Saturday" &&
      day !== "Sunday"
    ) {
      return res.status(400).json({
        message: "Day not found",
      });
    }

    const timetable = await new SectionTimetable({
      section_id: req.body.section_id,
      day: req.body.day,
      day_classes: req.body.day_classes,
    });

    // check if section exists in branch
    const section = await Section.findOne({
      section_id: req.body.section_id,
    }).populate("time_table");

    if (!section) {
      return res.status(404).json({
        message: "Section not found",
      });
    } else if (
      section.timetable?.find((timetable) => timetable?.day === req.body.day)
    ) {
      return res.status(400).json({
        message: "Timetable For this day already exists",
      });
    } else {
      const timetable_data = await timetable.save();
      await Section.findOneAndUpdate(
        {
          _id: req.body.section_id,
          section_name: req.body.section_name,
          branch_id: req.body.branch_id,
        },
        { $push: { timetable: timetable_data._id } },
        { new: true }
      );

      res.status(200).json(timetable_data);
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
});

// Get All Branches on the basis of org_id
router.get("/getbranches/:org_id", async (req, res) => {
  try {
    const branches = await Branch.find({
      org_id: req.params.org_id,
    }).populate("sections");
    res.status(200).json(branches);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
});

// get branch based on branch_id
router.get("/getbranch/:branch_id", async (req, res) => {
  try {
    const branch = await Branch.findOne({
      _id: req.params.branch_id,
    }).populate("sections");
    res.status(200).json(branch);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
});

// Get All Sections based on branch_id
router.post("/getsections", async (req, res) => {
  try {
    const sections = await Section.find({
      branch_id: req.body.branch_id,
    }).populate("time_table");
    res.status(200).json(sections);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
});

// Get all the timetable based on section_id
router.post("/gettimetable", async (req, res) => {
  try {
    const timetable = await SectionTimetable.find({
      section_id: req.body.section_id,
    });
    res.status(200).json(timetable);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
});

// get assignments based on section_id
router.post("/getassignments", async (req, res) => {
  try {
    const assignments = await Assignment.find({
      section_id: req.body.section_id,
    })
      .sort({ assignment_duedateandtime: 1 })
      .populate("subject_id");
    res.status(200).json(assignments);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
});

// add assignment based on section_id
router.post("/addassignment", async (req, res) => {
  try {
    const section = await Section.findOne({
      section_id: req.body.section_id,
    });

    if (!section) {
      return res.status(404).json({
        message: "Section not found",
      });
    }

    const assignment = await new Assignment({
      org_id: req.body.org_id,
      section_id: req.body.section_id,
      subject_code: req.body.subject_code,
      assignment_title: req.body.assignment_title,
      assignment_description: req.body.assignment_description,
      assignment_duedateandtime: req.body.assignment_duedateandtime,
      color: req.body.color,
      subject_id: req.body.subject_id,
    }).populate("subject_id");

    const assignment_data = await assignment.save();
    await Section.findOneAndUpdate(
      { _id: req.body.section_id },
      { $push: { assignments: assignment_data._id } },
      { new: true }
    );

    if (
      await sendNotificationToAllUsersInClass({
        org_id: req.body.org_id,
        section_id: req.body.section_id,
        title: `${req.body.subject_code}-New Assignment: ${req.body.assignment_title}`,
        body: req.body.assignment_description,
      })
    ) {
      console.log("Notification Sent");
    } else {
      console.log("Notification Not Sent");
    }

    res.status(200).json(assignment_data);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
});

// submit assignment based on assignment_id
router.post("/submitassignment", async (req, res) => {
  try {
    const assignment = await Assignment.findOne({
      _id: req.body.assignment_id,
    });

    if (!assignment) {
      return res.status(404).json({
        message: "Assignment not found",
      });
    }

    const updatedAssignment = await Assignment.findOneAndUpdate(
      {
        _id: req.body.assignment_id,
      },
      {
        $push: {
          assignment_submissions: {
            user_id: req.body.user_id,
            submission_dateandtime: new Date(),
            submission_files: req.body.submission_files,
          },
        },
      },
      { new: true }
    );

    res.status(200).json(updatedAssignment);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
});

export default router;
