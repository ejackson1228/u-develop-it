const express = require('express');
const router = express.Router();
const db = require('../../db/connection');
const inputCheck = require('../../utils/inputCheck');

// get voters
router.get('/voters', (req, res) => {
    const sql = `SELECT * FROM VOTERS ORDER BY last_name`;

    db.query(sql, (err, rows) => {
        if (err) {
            res.status(500).json({ message: err.message });
            return;
        } else {
            res.json({
                message: 'success',
                data: rows
            });
        }
    });
});

// get a single voter
router.get('/voters/:id', (req, res) => {
    const sql = `SELECT * FROM voters WHERE id = ?`;
    const params = [req.params.id];

    db.query(sql, params, (err, row) => {
        if (err) {
            res.status(400).json({ message: err.message });
            return;
        } else {
            res.json({
                message: 'success',
                data: row
            });
        }
    });
});

// create new voter
router.post('/voters', ({ body }, res) => {
    const errors = inputCheck(body, 'first_name', 'last_name', 'email');
    if (errors) {
        res.status(400).json({ error: errors });
        return;
    }
    
    const sql = `INSERT INTO voters (first_name, last_name, email) VALUES (?,?,?)`;
    const params = [body.first_name, body.last_name, body.email];

    db.query(sql, params, (err, result) => {
        if (err) {
            res.status(400).json({ message: err.message });
            return;
        } else {
            res.json({
                message: 'success',
                data: body
            });
        }
    });
});

//update voter email info
router.put('/voters/:id', (req, res) => {
    const errors = inputCheck(req.body, 'email');
    if (errors) {
        res.status(400).json({ error: errors });
        return;
    }

    const sql = `UPDATE voters SET email = ? WHERE id = ?`;
    const params = [req.body.email, req.params.id];

    db.query(sql, params, (err, result)  => {
        if (err) {
            res.status(400).json({ error: err.message });
            return;
        } else if (!result.affectedRows) {
            res.json({
                message: 'voter data not found' 
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

//delete voter
router.delete('/voters/:id', (req, res) => {
    const sql = `DELETE FROM voters WHERE id = ?`;
    
    db.query(sql, req.params.id, (err, result) => {
        if (err) {
            res.status(400).json({ error: err.message });
            return;
        } else if (!result.affectedRows) {
            res.json({
                message: 'Voter data not found'
            });
        } else {
            res.json({
                message: 'Deleted',
                changes: result.affectedRows,
                id: req.params.id
            });
        }
    });
});

module.exports = router;