const express = require("express");
const router = express.Router();
// const { auth } = require("../middlewares/auth");
const {
  addNewTodo,
  getTodos,
  editTodo,
  deleteTodo,
} = require("../controllers/todos");
const auth = require("../middlewares/auth");

router.route("/").get(getTodos).post(addNewTodo);
// router.route("/:id").delete(deleteTodo).patch(editTodo);
router.route("/:id").delete(auth, deleteTodo).patch(auth, editTodo);
// router.route("/:userId/todos").get(getUserTodos);

module.exports = router;
