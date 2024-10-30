const userRepository = require('../repositories/userRepository');
const { ValidationError } = require('../utils/customErrors');
const bcrypt = require('bcryptjs');

class UserService {
    async register(userData) {
        const { email, password } = userData;

        if (!email || !password) {
            throw new ValidationError('Email and password are required.');
        }

        const existingUser = await userRepository.findByEmail(email);
        if (existingUser) {
            throw new ValidationError('Email is already in use.');
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await userRepository.createUser({ email, password: hashedPassword });

        return user;
    }

    async login(userData) {
        const { email, password } = userData;

        if (!email || !password) {
            throw new ValidationError('Email and password are required.');
        }

        const user = await userRepository.findByEmail(email);
        if (!user) {
            throw new ValidationError('Invalid credentials.');
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            throw new ValidationError('Invalid credentials.');
        }

        return user;
    }
}

module.exports = new UserService();
