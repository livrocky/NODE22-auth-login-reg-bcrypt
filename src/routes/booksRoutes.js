/* eslint-disable object-curly-newline */
const express = require('express');
const { validateToken } = require('../middleware');
// const mysql = require('mysql2/promise');
// const bcrypt = require('bcryptjs');
// const { validateUser } = require('../middleware');
// const { dbConfig } = require('../config');
const { getAllBooksDb, allBooksWithAuthors, insertBookDb, authorBookCount } = require('../model/booksModel');

// sukuriam booksRoutes routeri
const booksRoutes = express.Router();

// GET /books - grazinti visas knygas
booksRoutes.get('/books', validateToken, async (req, res) => {
  try {
    const allBooksArr = await getAllBooksDb();
    res.json(allBooksArr);
  } catch (error) {
    // console.log('stack===', error.stack);
    res.sendStatus(500);
  }
});

booksRoutes.get('/books-count', async (req, res) => {
  try {
    const allBooksArr = await authorBookCount();
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
    if (createBookResult.affectedRows === 1) {
      res.sendStatus(201);
      return;
    }
    res.status(400).json('no book created');
  } catch (error) {
    res.sendStatus(500);
  }
});

module.exports = booksRoutes;
