const express = require('express');
const authRoutes = require('./authRoutes');
const taskRoutes = require('./taskRoutes');
const authenticate = require('../middleware/authMiddleware');

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/tasks', authenticate, taskRoutes);

module.exports = router;
