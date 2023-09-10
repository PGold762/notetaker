const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const uuid = require('uuid');

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

// GET route to retrieve all notes
router.get('/notes', (req, res) => {
  const notes = readNotesFromFile();
  res.json(notes);
});

// POST route to add a new note
router.post('/notes', (req, res) => {
  const newNote = {
    id: uuid.v4(),
    title: req.body.title,
    text: req.body.text,
  };

  const notes = readNotesFromFile();
  notes.push(newNote);

  writeNotesToFile(notes);

  res.json(newNote);
});

// DELETE route to delete a note by ID
router.delete('/notes/:id', (req, res) => {
  const noteIdToDelete = req.params.id;

  const notes = readNotesFromFile();

  // Find the index of the note to delete based on its ID
  const noteIndex = notes.findIndex((note) => note.id === noteIdToDelete);

  if (noteIndex === -1) {
    return res.status(404).json({ error: 'Note not found' });
  }

  // Remove the note from the array
  notes.splice(noteIndex, 1);

  writeNotesToFile(notes);

  return res.status(200).json({ message: 'Note deleted successfully' });
});

module.exports = router;
