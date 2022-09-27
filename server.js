const express = require('express');
const PORT = process.env.PORT || 3001;
const mysql = require('mysql2');

const app = express();

//express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// connect to database
const db = mysql.createConnection(
    {
        host: 'localhost',
        // your mySQL username
        user: 'root',
        // your mySQL password
        password: 'Yikesoo97!',
        database: 'election'
    },
    console.log(`Connected to the election database!`)
);

// create a candidate
const sql = 
`INSERT INTO candidates (id, first_name, last_name, industry_connected)
    VALUES (?, ?, ?, ?)`;
const params = [1, 'Ronald', 'Firbank', 1];

// db.query(sql, params, (err, result) => {
//     if (err) {
//         console.log(err)
//     } else {
//         console.log(result);
//     }
// });

// get a single candidate
// db.query('SELECT * FROM candidates WHERE id = 1', (err, row) => {
//     if (err) {
//         console.log(err);
//     } else {
//     console.log(row);
//     }
// });
// delete a candidate 
// db.query('DELETE FROM candidates WHERE id = ?', 1, (err, results) => { // "1" is to specify the amount of objects deleted
//     if (err) {
//         console.log(err);
//     } else {
//         console.log(results);
//     }
// });

// db.query(`SELECT * FROM candidates`, (err, rows) => {
//     // console.log(rows);
// })

// catchall route. default response for any other request (not found) ** must be last route in script placement
app.use((req, res) => {
    res.status(404).end();
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}!`);
});
