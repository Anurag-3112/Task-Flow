const Todo = require("../models/Todo");

const createTodo = async (req, res, next) => {
    try {
        const { text } = req.body;

        if (!text || !text.trim()) {
            return res.status(400).json({
                success: false,
                message: "Todo text is required"
            });
        }

        const todo = await Todo.create({
            text: text.trim()
        });

        res.status(201).json({
            success: true,
            data: todo
        });

    } catch (err) {
        next(err);
    }
};

const getTodos = async (req, res, next) => {
    try {
        const todos = await Todo.find()
            .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: todos.length,
            data: todos
        });

    } catch (err) {
        next(err);
    }
};

const updateTodo = async (req, res, next) => {
    try {
        const { completed } = req.body;

        const todo = await Todo.findByIdAndUpdate(
            req.params.id,
            { completed },
            {
                returnDocument: "after",
                runValidators: true
            }
        );

        if (!todo) {
            return res.status(404).json({
                success: false,
                message: "Todo not found"
            });
        }

        res.status(200).json({
            success: true,
            data: todo
        });

    } catch (err) {
        next(err);
    }
};

const deleteTodo = async (req, res, next) => {
    try {
        const todo = await Todo.findByIdAndDelete(
            req.params.id
        );

        if (!todo) {
            return res.status(404).json({
                success: false,
                message: "Todo not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Todo deleted successfully"
        });

    } catch (err) {
        next(err);
    }
};

module.exports = {
    createTodo,
    getTodos,
    updateTodo,
    deleteTodo
};