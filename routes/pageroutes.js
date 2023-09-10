const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs');

// Path to db.json file
const dbFilePath = path.join(__dirname, '../db.json');

// Function to read the notes from db.json
const readNotesFromFile = () => {
  const data = fs.readFileSync(dbFilePath, 'utf8');
  return JSON.parse(data);
};

// Function to write notes to db.json
const writeNotesToFile = (notes) => {
  fs.writeFileSync(dbFilePath, JSON.stringify(notes), 'utf8');
};

// GET route to render the notes page
router.get('/notes', (req, res) => {
  const notes = readNotesFromFile();
  res.render('notes', { notes });
});

module.exports = router;
