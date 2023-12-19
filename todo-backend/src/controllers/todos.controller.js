// imports the todo model
const Todo = require("../models/todos.model");

// make a controller for get all todos
exports.getAllTodos = async (req, res) => {
  try {
    const todos = await Todo.find({}).sort({ createdAt: -1 });

    try {
      res.status(200).json({
        message: "Get all todos successfully.",
        todos: todos,
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// make a controller for get a todo
exports.getATodo = async (req, res) => {
  try {
    const { id: todoId } = req.params;
    const todo = await Todo.findOne({ _id: todoId });

    if (!todo) {
      return res.status(404).json({ msg: `No task with id: ${todoId}` });
    } else {
      res.status(200).json({
        message: "Get a todo successfully.",
        todo: todo,
      });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// make a controller for create a todo
exports.createATodo = async (req, res) => {
  const newTodo = new Todo(req.body);
  await newTodo.save((err) => {
    if (err) {
      res.status(500).json({
        message: err.message,
      });
    } else {
      res.status(201).json({
        message: "Create a new todo successfully.",
      });
    }
  });
};

// make a controller for create many todos
exports.createManyTodos = async (req, res) => {
  await Todo.insertMany(req.body, (err) => {
    if (err) {
      res.status(500).json({
        message: err.message,
      });
    } else {
      res.status(201).json({
        message: "Create many new todos successfully.",
      });
    }
  });
};

// make a controller for update a todo
exports.updateATodo = async (req, res) => {
  try {
    const { id: todoId } = req.params;
    const todo = await Todo.findByIdAndUpdate(todoId, req.body, { new: true, runValidators: true });

    if (!todo) {
      return res.status(404).json({ msg: `No todo with id: ${todoId}` });
    } else {
      res.status(200).json({
        msg: `Todo with id: ${todoId} updated successfully.`,
        todo: todo,
      });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// make a controller for delete a todo
exports.deleteATodo = async (req, res) => {
  try {
    const { id: todoId } = req.params;
    const todo = await Todo.findByIdAndDelete(todoId);

    if (!todo) {
      return res.status(404).json({ msg: `No todo with id: ${todoId}` });
    } else {
      res.status(200).json({
        message: `Todo with id: ${todoId} deleted successfully.`,
        todo: todo,
      });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
