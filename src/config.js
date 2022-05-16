require('dotenv').config();

// db config
const dbConfig = {
  host: process.env.HOST,
  user: process.env.MYSQL_USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
  port: process.env.DB_PORT,
};

const PORT = process.env.PORT || 5000;

const jwtSecret = process.env.JWT_SECRET;
if (!jwtSecret) throw new Error('no jwt secret found in .env');

// console.log('dbConfig ===', dbConfig);

module.exports = {
  PORT,
  dbConfig,
  jwtSecret,
};
