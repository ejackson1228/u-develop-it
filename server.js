const express = require('express');
const PORT = process.env.PORT || 3001;
const mysql = require('mysql2');
const inputCheck = require('./utils/inputCheck');

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

app.post('/api/candidate', ({ body }, res) => { //req is an object being destructured into { body } for the body's properties 
    const errors = inputCheck(body, 'first_name', 'last_name', 'industry_connected');
    if (errors) {
        res.status(400).json({ error: errors});
        return;
    }
    const sql = 
    `INSERT INTO candidates (first_name, last_name, industry_connected)
    VALUES (?,?,?)`;
    const params = [body.first_name, body.last_name, body.industry_connected];
    db.query(sql, params, (err, result) => {
        if (err) {
            res.status(400).json({ error: err.message });
            return;
        } else {
            res.json({ 
                message: 'success',
                data: body
            })
        };
    });
});


// get all candidates
app.get('/api/candidates', (req, res) => {
    const sql = 
    `SELECT candidates.*, parties.party_name 
    AS party_name 
    FROM candidates 
    LEFT JOIN parties 
    ON candidates.party_id = parties.id`;

    db.query(sql, (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        } else {
            res.json({
                message: 'Success!',
                data: rows
            });
        };
    });
});

// get a single candidate by id
app.get('/api/candidates/:id', (req, res) => {
    const sql = 
    `SELECT candidates.*, parties.party_name 
    AS party_name 
    FROM candidates 
    LEFT JOIN parties 
    ON candidates.party_id = parties.id 
    WHERE candidates.id = ?`;

    const params = [req.params.id];

    db.query(sql, params, (err, row) => {
        if (err) {
            res.status(400).json({ error: err.message });
            return;
        } else {
            res.json({
                message: "success!",
                data: row
            });
        }
    });
});


// delete a candidate 
app.delete('/api/candidates/:id', (req, res) => {
    const sql = `DELETE FROM candidates WHERE id = ?`;
    const params = [req.params.id];


    db.query(sql, params, (err, result) => { // db.query params takes an array for parameters
        if (err) {
            res.status(400).json({ error: err.message });
            return;
        } else if (!result.affectedRows) { // if no rows are being affected, that means the candidate does not exist in the db 
            res.json({
                message: 'Candidate not found.' // let the user know that the candidate does not exist
            });
            return;
        } else {
            res.json({
                message: 'Deleted',
                changes: result.affectedRows, // result.AffectedRows will verify if any rows have changed. changes is the response syntax for any changes.
                id: req.params.id
            });
        }
    });
});

// catchall route. default response for any other request (not found) ** must be last route in script placement
app.use((req, res) => {
    res.status(404).end();
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}!`);
});
