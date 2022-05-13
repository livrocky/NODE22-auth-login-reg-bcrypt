const express = require('express');
// const mysql = require('mysql2/promise');
// const bcrypt = require('bcryptjs');
// const { validateUser } = require('../middleware');
// const { dbConfig } = require('../config');
const { getAllBooksDb, allBooksWithAuthors } = require('../model/booksModel');

// sukuriam booksRoutes routeri
const booksRoutes = express.Router();

// GET /books - grazinti visas knygas
booksRoutes.get('/books', async (req, res) => {
  try {
    const allBooksArr = await getAllBooksDb();
    res.json(allBooksArr);
  } catch (error) {
    // console.log('stack===', error.stack);
    res.sendStatus(500);
  }
});

// GET /books-authors - grazinam visas knygas su autoriu vardais ir pavardem.
booksRoutes.get('/books-authors', async (req, res) => {
  try {
    const allBooksArr = await allBooksWithAuthors();
    res.json(allBooksArr);
  } catch (error) {
    // console.log('stack===', error.stack);
    res.sendStatus(500);
  }
});

booksRoutes.post('/books', async (req, res) => {
  try {
    const newBookObj = req.body;
    const createBookResult = await insertBookDb(newBookObj);
    res.json(createBookResult);
  } catch (error) {
    res.sendStatus(500);
  }
});

module.exports = booksRoutes;
