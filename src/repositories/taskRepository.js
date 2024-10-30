const { Task } = require('../models');

class TaskRepository {
    async create(taskData) {
        return await Task.create(taskData);
    }

    async getAll(filters) {
        const { status, page = 1, limit = 10 } = filters;
        const queryOptions = {
            where: {},
            limit: parseInt(limit, 10),
            offset: (page - 1) * parseInt(limit, 10),
        };

        if (status) {
            queryOptions.where.status = status;
        }

        const { count, rows } = await Task.findAndCountAll(queryOptions);
        return {
            total: count,
            page: parseInt(page, 10),
            limit: parseInt(limit, 10),
            tasks: rows,
        };
    }

    async update(id, taskData) {
        const task = await Task.findByPk(id);
        if (!task) throw new Error('Task not found');

        return await task.update(taskData);
    }

    async delete(id) {
        const task = await Task.findByPk(id);
        if (!task) throw new Error('Task not found');

        await task.destroy();
        return task;
    }
}

module.exports = new TaskRepository();
