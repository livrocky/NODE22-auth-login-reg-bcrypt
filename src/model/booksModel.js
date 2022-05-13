const mysql = require('mysql2/promise');
const { dbConfig } = require('../config');

async function getArrayFromDb(sql) {
  let conn;
  try {
    conn = await mysql.createConnection(dbConfig);
    const [result] = await conn.execute(sql, []);
    return result;
  } catch (error) {
    console.log('error getArrayFromDb', error);
    throw new Error('error getArrayFromDb');
  } finally {
    conn?.end();
  }
}

async function getAllBooksDb() {
  const sql = 'SELECT * FROM books';
  return getArrayFromDb(sql);
}

async function allBooksWithAuthors() {
  const sql = 'SELECT books.id, authors.name, authors.surname, books.title, books.year FROM books LEFT JOIN authors ON books.author_id = authors.id';
  return getArrayFromDb(sql);
}

module.exports = { getAllBooksDb, allBooksWithAuthors };
