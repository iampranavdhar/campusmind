import express from "express";
import User from "../models/User.js";
import { verifyTokenAndAuthorization } from "../middleware/verifyToken.js";
import TodoBoard from "../models/Todo/TodoBoard.js";

const router = express.Router();

/* Getting user by id */
router.get("/getuser/:id", verifyTokenAndAuthorization, async (req, res) => {
  try {
    const user = await User.findById(req.params.id).populate("todo_list");
    const { password, updatedAt, ...other } = user._doc;
    res.status(200).json(other);
  } catch (err) {
    return res.status(500).json(err);
  }
});

/* Getting all users */
router.get("/allmembers", async (req, res) => {
  try {
    const users = await User.find({}).populate("todo_list");
    res.status(200).json(users);
  } catch (err) {
    return res.status(500).json(err);
  }
});

/* Get all users based on the org_id */
router.get("/getallusers/:org_id", async (req, res) => {
  try {
    const users = await User.find({ org_id: req.params.org_id });
    res.status(200).json(users);
  } catch (err) {
    return res.status(500).json(err);
  }
});

/* Update user by id */
router.put("/updateuser/:id", verifyTokenAndAuthorization, async (req, res) => {
  if (req.body.password) {
    try {
      const salt = await bcrypt.genSalt(10);
      req.body.password = await bcrypt.hash(req.body.password, salt);
    } catch (err) {
      return res.status(500).json(err);
    }
  }
  try {
    const user = await User.findByIdAndUpdate(req.params.id, {
      $set: req.body,
    });
    res.status(200).json("Account has been updated");
  } catch (err) {
    return res.status(500).json(err);
  }
});

/* Delete user by id */
router.delete(
  "/deleteuser/:id",
  verifyTokenAndAuthorization,
  async (req, res) => {
    try {
      // check the user exists in db
      const user = await User.findById(req.params.id);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      // delete the todo board of the user
      const todo_board = await TodoBoard.findOne({ user_id: req.params.id });
      await TodoBoard.findByIdAndDelete(todo_board._id);

      await User.findByIdAndDelete(req.params.id);
      res.status(200).json("Account has been deleted");
    } catch (err) {
      return res.status(500).json(err);
    }
  }
);

export default router;
