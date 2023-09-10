const express = require('express');

// Import our modular routers for /api and /pageroute
const apiRouter = require('./apiroutes');
const pageRouter = require('./pageroutes');

const app = express();

app.use('/apiroutes', apiRouter);
app.use('/pageroutes', pageRouter);

module.exports = app;