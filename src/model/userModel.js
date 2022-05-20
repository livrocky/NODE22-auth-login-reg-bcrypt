const mysql = require('mysql2/promise');
const { dbConfig } = require('../config');

// async function addUserToDb(email, password) {
//   let conn;
//   try {
//     conn = await mysql.createConnection(dbConfig);
//     const sql = `
//     INSERT INTO users(email, password)
//     VALUES (?, ?)
//     `;
//     const [result] = await conn.execute(sql, [email, password]);
//     return result;
//   } catch (error) {
//     console.log('error addUserToDb', error);
//     return false;
//   } finally {
//     conn?.end();
//   }
// }

async function addUserToDb(email, password) {
  let conn;
  try {
    conn = await mysql.createConnection(dbConfig);
    const sql = `
    INSERT INTO users(email, password)
    VALUES (?, ?)
    `;
    const saveResult = await conn.execute(sql, [email, password]);
    if (saveResult.affectedRows === 1) {
      res.sendStatus(201);
      return;
    }
    res.status(400).json('no user created');
  } catch (error) {
    console.log('error addUserToDb', error);
    return false;
  } finally {
    conn?.end();
  }
}

async function findUserByEmail(email) {
  let conn;
  try {
    conn = await mysql.createConnection(dbConfig);
    const sql = `
    SELECT * FROM users WHERE email = ? 
    `;
    const [result] = await conn.execute(sql, [email]);
    return result[0];
  } catch (error) {
    console.log('error findUserByEmail', error);
    return false;
  } finally {
    conn?.end();
  }
}

module.exports = {
  addUserToDb,
  findUserByEmail,
};
