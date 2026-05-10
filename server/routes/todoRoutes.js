const express = require("express");

const {
  createTodo,
  getTodos,
  updateTodo,
  deleteTodo
} = require("../controllers/todoController");

const router = express.Router();

router.post("/add", createTodo);
router.get("/todos", getTodos);
router.put("/update/:id", updateTodo);
router.delete("/delete/:id", deleteTodo);

module.exports = router;