const { ValidationError } = require('../utils/customErrors');

const errorHandler = (err, req, res, next) => {
    if (err instanceof ValidationError) {
        return res.status(400).json({ error: err.message });
    }

    if (err.name === 'SequelizeValidationError') {
        return res.status(400).json({ error: err.errors.map(e => e.message) });
    }

    if (err.name === 'SequelizeDatabaseError') {
        return res.status(500).json({ error: 'Database error occurred.' });
    }

    console.error(err);
    return res.status(500).json({ error: 'An unexpected error occurred.' });
};

module.exports = errorHandler;
