import { createSlice } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from "../../Components/Toast/Toast";

export const todoSlice = createSlice({
  name: "todo",
  initialState: {
    todoData: null,
    isLoading: false,
    isError: false,
    errorMessage: "",
  },
  reducers: {
    actionStart: (state, action) => {
      state.isLoading = true;
      state.isError = false;
      state.errorMessage = "";
    },
    actionFailure: (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.errorMessage = action.payload;
    },
    getTodoBoardSuccess: (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.errorMessage = "";
      state.todoData = action.payload;
    },
    addTodoCategorySuccess: (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.errorMessage = "";
    },
    addTaskSuccess: (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.errorMessage = "";
    },
    removeTaskSuccess: (state, action) => {
      const { category_id, task_id } = action.payload;
      const categoryIndex = state.todoData.categories.findIndex(
        (category) => category._id === category_id
      );
      const taskIndex = state.todoData.categories[
        categoryIndex
      ].tasks.findIndex((task) => task._id === task_id);
      state.todoData.categories[categoryIndex].tasks.splice(taskIndex, 1);
      state.isLoading = false;
      state.isError = false;
      state.errorMessage = "";
    },
    updateTaskSuccess: (state, action) => {
      const { category_id, task_id } = action.payload;
      const categoryIndex = state.todoData.categories.findIndex(
        (category) => category._id === category_id
      );
      const taskIndex = state.todoData.categories[
        categoryIndex
      ].tasks.findIndex((task) => task._id === task_id);
      state.todoData.categories[categoryIndex].tasks[taskIndex] =
        action.payload;
      console.log(
        state.todoData.categories[categoryIndex].tasks[taskIndex],
        "state.todoData.categories[categoryIndex].tasks[taskIndex]"
      );
      state.isLoading = false;
      state.isError = false;
      state.errorMessage = "";
    },
  },
});

export const {
  actionStart,
  actionFailure,
  getTodoBoardSuccess,
  addTodoCategorySuccess,
  addTaskSuccess,
  removeTaskSuccess,
  updateTaskSuccess,
} = todoSlice.actions;
