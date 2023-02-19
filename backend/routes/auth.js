import express from "express";
import User from "../models/User.js";
import bcrypt from "bcrypt";
import Org from "../models/Org.js";
import TodoBoard from "../models/Todo/TodoBoard.js";
import jwt from "jsonwebtoken";

const router = express.Router();

/* User Registration */
router.post("/register", async (req, res) => {
  try {
    /* Salting and Hashing the Password */
    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(req.body.password, salt);

    /* Create a new user */
    const newuser = await new User({
      org_id: req.body.org_id,
      profile_image: req.body.profile_image,
      user_full_name: req.body.user_full_name,
      email: req.body.email,
      password: hashedPass,
      mobile: req.body.mobile,
      user_identity: req.body.user_identity,
      batch_details: {
        branch_name: req?.body?.batch_details.branch_name,
        section_name: req?.body?.batch_details.section_name,
        branch_id: req?.body?.batch_details.branch_id,
        section_id: req?.body?.batch_details.section_id,
      },
      dob: req.body.dob,
      gender: req.body.gender,
      address: req.body.address,
      todo_board: [],
      isAdmin: req.body.isAdmin,
    });

    /* Save User and Return */
    const user = await newuser.save();

    await Org.findOneAndUpdate(
      { _id: req.body.org_id },
      { $push: { org_users: user._id } },
      { new: true }
    );

    // creating a todo board for the user
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

    const { password, createdAt, updatedAt, ...other } = new_user._doc;
    res.status(200).json(other);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
});

/* User Login */
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({
      email: req.body.email,
    });

    if (user) {
      const validPass = await bcrypt.compare(req.body.password, user.password);

      if (validPass) {
        const accessToken = jwt.sign(
          {
            _id: user._id,
            isAdmin: user?.isAdmin,
          },
          process.env.JWT_SECRET_KEY,
          { expiresIn: "3d" }
        );

        const { password, createdAt, updatedAt, ...other } = user._doc;

        res.status(200).json({ ...other, accessToken });
      } else {
        res.status(400).json("Wrong Password");
      }
    } else {
      res.status(404).json("Check your email and password");
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
});

export default router;
