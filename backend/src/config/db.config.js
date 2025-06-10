// backend/src/config/db.config.js
const mysql = require("mysql2");
require("dotenv").config();

const pool = mysql.createPool({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_NAME || "task_manager",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// Convertir le pool en promesses
const promisePool = pool.promise();

module.exports = promisePool;
