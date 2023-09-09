const express = require('express');
const fs = require('fs');
const path = require('path');
const uuid = require('uuid');

// Create an instance of Express
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to handle JSON data in request bodies
app.use(express.json());
// Middleware to handle form data
app.use(express.urlencoded({ extended: true }));
// Middleware to serve static files
app.use(express.static('public'));

// Route to Index.js for Modularization
const index = require('./routes/index');
app.use('/', index);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});
