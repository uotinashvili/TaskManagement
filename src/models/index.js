const sequelize = require('../config/database');
const User = require('./user');
const Task = require('./task');

User.hasMany(Task, { foreignKey: 'userId' });
Task.belongsTo(User, { foreignKey: 'userId' });

module.exports = { sequelize, User, Task };
