const mysql = require('mysql2');
const dotenv = require('dotenv')
dotenv.config()

// connect to database
const db = mysql.createConnection(
    {
        host: 'localhost',
        // your mySQL username
        user: process.env.mySQL_USER,
        // your mySQL password
        password: process.env.mySQL_PASS,
        database: 'election'
    }
);

module.exports = db;