import { Router } from "express";
import {
  addTodoItem,
  changeTodoItemStatus,
  deleteTotoItem,
  getTodoItems,
  updateTodoItem,
} from "../controller/todo.controller.js";
import { verifyJWT } from "../middleware/auth.middleware.js";
const router = Router();

router.route("/addTodoItem").post(verifyJWT, addTodoItem);
router.route("/changeTodoItemStatus").put(verifyJWT, changeTodoItemStatus);
router.route("/updateTodoItem").put(verifyJWT, updateTodoItem);
router.route("/deleteTodoItem/:_id").delete(verifyJWT, deleteTotoItem);
router.route("/getTodoItem").get(verifyJWT, getTodoItems);
export default router;
