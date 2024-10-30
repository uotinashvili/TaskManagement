const taskRepository = require('../repositories/taskRepository');
const { isValidStatus } = require('../utils/validation');
const { ValidationError, NotFoundError } = require('../utils/customErrors');

class TaskService {
    async createTask(taskData) {
        if (!isValidStatus(taskData.status)) {
            throw new ValidationError('Invalid task status provided.');
        }

        try {
            return await taskRepository.create(taskData);
        } catch (error) {
            throw new Error('Error creating task: ' + error.message);
        }
    }

    async getTasks(filters) {
        try {
            const tasks = await taskRepository.getAll(filters);

            if (!tasks || tasks.length === 0) {
                throw new NotFoundError('No tasks found.');
            }
            return tasks;
        } catch (error) {
            throw new Error('Error retrieving tasks: ' + error.message);
        }
    }

    async updateTask(id, taskData) {
        if (taskData.status && !isValidStatus(taskData.status)) {
            throw new ValidationError('Invalid task status provided.');
        }

        try {
            const updatedTask = await taskRepository.update(id, taskData);

            if (!updatedTask) {
                throw new NotFoundError(`Task with id ${id} not found.`);
            }
            return updatedTask;
        } catch (error) {
            throw new Error('Error updating task: ' + error.message);
        }
    }

    async deleteTask(id) {
        try {
            const deleted = await taskRepository.delete(id);

            if (!deleted) {
                throw new NotFoundError(`Task with id ${id} not found.`);
            }
        } catch (error) {
            throw new Error('Error deleting task: ' + error.message);
        }
    }
}

module.exports = new TaskService();
