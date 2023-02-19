import express from "express";
import TodoBoard from "../models/Todo/TodoBoard.js";
import Category from "../models/Todo/Category.js";
import Task from "../models/Todo/Task.js";
import User from "../models/User.js";
const router = express.Router();

// Get todo board by user id
router.get("/gettodoboard/:id", async (req, res) => {
  try {
    const todo_board = await TodoBoard.findOne({
      user_id: req.params.id,
    }).populate({
      path: "categories",
      populate: {
        path: "tasks",
      },
    });
    res.status(200).json(todo_board);
  } catch (err) {
    return res.status(500).json(err);
  }
});

// Add TodoBoard based on user_id
router.post("/addtodoboard", async (req, res) => {
  try {
    const todo_board = await new TodoBoard({
      user_id: req.body.user_id,
      categories: [],
    });
    const todo_board_data = await todo_board.save();
    // push todo_board_id to user
    await User.findOneAndUpdate(
      { _id: req.body.user_id },
      { $push: { todo_board: todo_board_data._id } },
      { new: true }
    );

    res.status(200).json(todo_board_data);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
});

// Add Category based on todo_board_id
router.post("/addcategory", async (req, res) => {
  try {
    const category = await new Category({
      todo_board_id: req.body.todo_board_id,
      category_name: req.body.category_name,
      color: req.body.color,
      tasks: [],
    });
    const category_data = await category.save();
    // push category_id to todo_board
    await TodoBoard.findOneAndUpdate(
      { _id: req.body.todo_board_id },
      { $push: { categories: category_data._id } },
      { new: true }
    );

    res.status(200).json(category_data);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
});

// Add Task based on category_id
router.post("/addtask", async (req, res) => {
  try {
    const task = await new Task({
      category_id: req.body.category_id,
      task_title: req.body.task_title,
      description: req.body.task_description,
    });
    const task_data = await task.save();
    // push task_id to category
    await Category.findOneAndUpdate(
      { _id: req.body.category_id },
      { $push: { tasks: task_data._id } },
      { new: true }
    );

    res.status(200).json(task_data);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
});

// Update Task based on task_id
router.post("/updatetask", async (req, res) => {
  try {
    const old_task = await Task.findById(req.body.task_id);

    const task = await Task.findOneAndUpdate(
      { _id: req.body.task_id },
      { $set: { is_done: !old_task.is_done } },
      { new: true }
    );
    res.status(200).json(task);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
});

// Delete Task based on task_id
router.post("/deletetask", async (req, res) => {
  try {
    const task = await Task.findOneAndDelete({ _id: req.body.task_id });
    // delete task_id from category
    await Category.findOneAndUpdate(
      { _id: req.body.category_id },
      { $pull: { tasks: req.body.task_id } },
      { new: true }
    );

    res.status(200).json(task);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
});

// Delete Category based on category_id
router.post("/deletecategory", async (req, res) => {
  try {
    const category = await Category.findOneAndDelete({
      _id: req.body.category_id,
    });
    // delete category_id from todo_board
    await TodoBoard.findOneAndUpdate(
      { _id: req.body.todo_board_id },
      { $pull: { categories: req.body.category_id } },
      { new: true }
    );

    res.status(200).json(category);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
});

export default router;
