const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const { sequelize } = require('./models');
const routes = require('./routes');
const errorHandler = require('./middleware/errorHandler');

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());

app.use('/api', routes);

app.use(errorHandler);

sequelize.sync({ force: false })
    .then(() => console.log("Database synced"))
    .catch((error) => console.error("Database sync failed:", error));

module.exports = app;
