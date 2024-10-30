const taskService = require('../services/taskService');
const { validateTaskInput } = require('../utils/validation');

exports.createTask = async (req, res) => {
    try {
        validateTaskInput(req.body);
        const taskData = {
            ...req.body,
            userId: req.user.userId
        };
        const task = await taskService.createTask(taskData);
        res.status(201).json({ message: 'Task created successfully', task });
    } catch (error) {
        next(error);
    }
};

exports.getTasks = async (req, res) => {
    try {
        const tasks = await taskService.getTasks(req.query);
        res.status(200).json(tasks);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.updateTask = async (req, res) => {
    try {
        const task = await taskService.updateTask(req.params.id, req.body);
        res.status(200).json({ message: 'Task updated successfully', task });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.deleteTask = async (req, res) => {
    try {
        await taskService.deleteTask(req.params.id);
        res.status(204).json();
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
