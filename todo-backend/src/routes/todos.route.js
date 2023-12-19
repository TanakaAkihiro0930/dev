const router = require("express").Router();
const { getAllTodos, getATodo, createATodo, createManyTodos, updateATodo, deleteATodo } = require("../controllers/todos.controller");

router.get("/todos-all", getAllTodos);
router.get("/todo/:id", getATodo);
router.post("/todo/new", createATodo);
router.post("/todos-many", createManyTodos);
router.put("/todo/:id", updateATodo);
router.delete("/todo/:id", deleteATodo);

module.exports = router;
