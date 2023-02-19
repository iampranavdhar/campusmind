import express from "express";
import Org from "../models/Org.js";
import TodoBoard from "../models/Todo/TodoBoard.js";
import User from "../models/User.js";

const router = express.Router();

// Add Org
router.post("/addorg", async (req, res) => {
  try {
    const org = await new Org({
      org_image: req.body.org_image,
      org_name: req.body.org_name,
      org_email: req.body.org_email,
      org_password: req.body.org_password,
      org_address: req.body.org_address,
      org_mobile: req.body.org_mobile,
      org_users: [],
      org_branches: [],
      org_events: [],
      org_announcements: [],
    });

    const org_data = await org.save();
    // create a new user with the data

    const newuser = await new User({
      org_id: org_data._id,
      user_full_name: req.body.org_name,
      user_email: req.body.org_email,
      user_password: req.body.org_password,
      user_mobile: req.body.org_mobile,
      profile_image: req.body.org_image,
      todo_board: [],
      isAdmin: true,
    });

    const user = await newuser.save();

    await Org.findOneAndUpdate(
      { _id: req.body.org_id },
      { $push: { org_users: user._id } },
      { new: true }
    );
    const todo_board = await new TodoBoard({
      user_id: user._id,
      categories: [],
    });
    const todo_board_data = await todo_board.save();

    const new_user = await User.findByIdAndUpdate(user._id, {
      $set: {
        todo_board: [todo_board_data._id],
      },
    });

    res.status(200).json(org_data);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
});

// Remove User from Org by ID
router.post("/removeuser", async (req, res) => {
  try {
    const { org_id, user_id } = req.body;

    const org = await Org.findOneAndUpdate(
      { _id: org_id },
      { $pull: { org_users: user_id } },
      { new: true }
    );

    // delete the user based on the user_id and org_id
    await User.findOneAndDelete({ _id: user_id, org_id: org_id });

    res.status(200).json(org);
  } catch (err) {
    console.log(err);

    res.status(500).json({
      message: "Internal Server Error",
    });
  }
});

export default router;
