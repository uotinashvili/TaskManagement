const validStatuses = ['pending', 'completed', 'in-progress'];

const isValidStatus = (status) => {
    return validStatuses.includes(status);
};

exports.validateTaskInput = (data) => {
    const { title, description, status } = data;

    if (!title) {
        throw new Error('Title is required.');
    }
    if (!description) {
        throw new Error('Description is required.');
    }
    if (status !== undefined && !isValidStatus(status)) {
        throw new Error('Invalid status provided.');
    }
};

exports.isValidStatus = isValidStatus;
