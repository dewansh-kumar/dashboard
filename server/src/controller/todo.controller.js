// add todo Item

import { Todo } from "../modal/todo.modal.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { todoItemSchemaValidator } from "../validator/todoItem.validator.js";

// adding todo item
export const addTodoItem = asyncHandler(async (req, res) => {
  const { title, description, priority, dueDate, status } = req.body;

  // console.log(title, description, priority, dueDate, status);

  // Validate user details
  try {
    todoItemSchemaValidator.parse({
      title,
      description,
      priority,
      dueDate,
      status,
    });
  } catch (error) {
    return res.status(400).send({
      success: false,
      message: error.errors[0].message, // Send the first validation error message
    });
  }

  const userId = req.user._id;

  const newTodoItem = await Todo.create({
    userId,
    title,
    description,
    priority,
    dueDate,
    status,
  });

  if (!newTodoItem) {
    return res.status(400).json({
      success: false,
      message: "Getting error while adding the todo item",
    });
  }

  return res.status(201).json({
    success: true,
    message: "Todo item added successfully",
    data: newTodoItem,
  });
});

// change the status of todo item
export const changeTodoItemStatus = asyncHandler(async (req, res) => {
  const { status, _id } = req.body;

  const updatedTodoItem = await Todo.findByIdAndUpdate(
    _id,
    { status },
    { new: true }
  );

  if (!updatedTodoItem) {
    return res.status(400).json({
      success: false,
      message: "Getting error while changing the todo item status",
    });
  }

  return res.status(200).json({
    success: true,
    data: updatedTodoItem,
    message: "Todo Item status changed successfully",
  });
});

// update the todo item
export const updateTodoItem = asyncHandler(async (req, res) => {
  const { _id, title, description, priority, dueDate } = req.body;

  try {
    todoItemSchemaValidator.parse({
      _id,
      title,
      description,
      priority,
      dueDate,
    });
  } catch (error) {
    return res.status(400).send({
      success: false,
      message: error.errors[0].message, // Send the first validation error message
    });
  }

  const updatedTodoItem = await Todo.findByIdAndUpdate(
    _id,
    { title, description, priority, dueDate },
    { new: true }
  );

  if (!updateTodoItem) {
    return res.status(400).json({
      success: false,
      message: "Getting error while updating todo item",
    });
  }

  return res.status(200).json({
    success: true,
    data: updatedTodoItem,
    message: "Todo item updated successfully",
  });
});

// delete todo item
export const deleteTotoItem = asyncHandler(async (req, res) => {
  const todoId = req.params._id;

  if (!todoId) {
    return res.status(400).json({
      success: false,
      message: "Todo item id is required",
    });
  }

  const deletedTodoItem = await Todo.findByIdAndDelete(todoId);
  if (!deletedTodoItem) {
    return res.status(404).json({ message: "TODO item not found" });
  }
  res.status(200).json({ message: "TODO item deleted successfully" });
});

export const getTodoItems = asyncHandler(async (req, res) => {
  const userId = req.user._id;

  const todoItems = await Todo.find({ userId });

  return res.status(200).json({
    success: true,
    data: todoItems,
    message: "Todo items get successfully",
  });
});
