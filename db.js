require('dotenv').config();
const fs = require("fs");
const Pool = require("pg").Pool;

const pool = new Pool({
  host: process.env.HOST,
  user: process.env.DB_USER,
  database: process.env.DB,
  password: process.env.DB_PASS,
  port: process.env.DB_PORT,
});

pool.connect((err, client, done) => {
  if (err) {
    console.log('ERROR CONNECTING DB');
  } else {
    console.log('Connected to DB successfully!');
  }
});
module.exports.pool = pool;