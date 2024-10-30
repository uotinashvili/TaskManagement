const { User } = require('../models');

class UserRepository {
    async findByEmail(email) {
        return User.findOne({ where: { email } });
    }

    async createUser(userData) {
        return User.create(userData);
    }
}

module.exports = new UserRepository();
