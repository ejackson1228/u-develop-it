const express = require('express');
const router = express.Router();
const db = require('../../db/connection');
const inputCheck = require('../../utils/inputCheck');

// create a candidate
router.post('/candidate', ({ body }, res) => { //req is an object being destructured into { body } for the body's properties 
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

// Update a candidate's party
router.put('/candidates/:id', (req, res) => {
    const errors = inputCheck(req.body, 'party_id');

    if (errors) {
        res.status(400).json({ error: errors });
        return;
    }
    
    const sql = 
    `UPDATE candidates SET party_id = ? 
    WHERE id = ?`; // update candidates party id by the candidates own id 
    const params = [req.body.party_id, req.params.id];
    db.query(sql, params, (err, result) => {
      if (err) {
        res.status(400).json({ error: err.message });
        // check if a record was found
      } else if (!result.affectedRows) {
        res.json({
          message: 'Candidate not found'
        });
      } else {
        res.json({
          message: 'success',
          data: req.body,
          changes: result.affectedRows
        });
      }
    });
  });

// get all candidates
router.get('/candidates', (req, res) => {
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
router.get('/candidates/:id', (req, res) => {
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
router.delete('/candidates/:id', (req, res) => {
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

module.exports = router ;