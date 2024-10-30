const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const { isValidStatus } = require('../utils/validation');

class Task extends Model {}

Task.init({
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    status: {
        type: DataTypes.ENUM('pending', 'completed', 'in-progress'),
        allowNull: false,
        defaultValue: 'pending',
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Users',
            key: 'id'
        }
    },
}, {
    sequelize,
    modelName: 'Task',
    hooks: {
        beforeCreate: (task, options) => {
            if (!isValidStatus(task.status)) {
                throw new Error('Invalid task status provided.');
            }
        },
    },
});

module.exports = Task;
