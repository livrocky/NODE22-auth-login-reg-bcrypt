require('dotenv').config();

const PORT = process.env.PORT || 5000;

// db config
const dbConfig = {
  host: process.env.HOST,
  user: process.env.MYSQL_USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
  port: process.env.DB_PORT,
};

console.log('dbConfig ===', dbConfig);

module.exports = {
  PORT,
  dbConfig,
};
