const express = require('express');
const mysql = require('mysql2/promise');
// const bcrypt = require('bcryptjs');
// const { validateUser } = require('../middleware');
const { dbConfig } = require('../config');
const { getAllBooksDb, allBooksWithAuthors } = require('../model/booksModel');

// sukuriam booksRoutes routeri

// extra booksModel funkcija getAllBooksDB

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

// GET /books - grazinti visas knygas
booksRoutes.get('/books-authors', async (req, res) => {
  try {
    const allBooksArr = await allBooksWithAuthors();
    res.json(allBooksArr);
  } catch (error) {
    // console.log('stack===', error.stack);
    res.sendStatus(500);
  }
});

// booksRoutes.get('/authorBooks', async (req, res) => {
//   let connection;
//   try {
//     connection = await mysql.createConnection(dbConfig);
//     console.log('connected');
//     const sql = 'SELECT books.id, authors.name, authors.surname, books.title, books.year FROM books LEFT JOIN authors ON books.author_id = authors.id';
//     const [rows] = await connection.execute(sql);
//     res.json(rows);
//   } catch (error) {
//     console.log('home route error ===', error);
//     res.status(500).json('something went wrong');
//   } finally {
//     // atsijungti
//     if (connection) connection.end();
//   }
// });

module.exports = booksRoutes;
