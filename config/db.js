const mysql = require('mysql2/promise');
const fs=require('fs');
require('dotenv').config();
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port:process.env.DB_PORT,
  ssl: {
    rejectUnauthorized: true,
    ca: fs.readFileSync("./ca.pem").toString(),
  },
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Connect to MySQL
// pool.connect((err) => {
//   if (err) {
//     console.error('Error connecting to MySQL: ' + err.stack);
//     return;
//   }
//   console.log('Connected to MySQL as ID ' + pool.threadId);
// });
module.exports=pool;