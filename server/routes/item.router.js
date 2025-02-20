const express = require('express');
const encryptLib = require('../modules/encryption');
const pool = require('../modules/pool');

const { rejectUnauthenticated } = require('../modules/authentication-middleware');

const router = express.Router();


router.get("/", rejectUnauthenticated, (req, res) => {
    console.log('req.item', req.item);
    const sqlText = `SELECT * FROM "item";`;
    pool.query(sqlText)
      .then((dbRes) => {
        res.send(dbRes.rows);
      })
      .catch((dbErr) => {
        console.log('GET /api/item error:', dbErr);
        res.sendStatus(500);
      });
}); 

// Post to add a new item
router.post('/add-item', rejectUnauthenticated, async (req, res) => {
  const { name, description, image_url, created_by} = req.body;

  const sqlText = `
    INSERT INTO "item" ("name", "description", "image_url", "created_by")
    VALUES ($1, $2, $3, $4) RETURNING *;
  `;
  const values = [name, description, image_url, created_by]; 

  try {
    const result = await pool.query(sqlText, values);
    res.status(201).send(result.rows[0]);  // Send back the newly created item
  } catch (err) {
    console.log('Error creating new item:', err);
    res.status(500).send('Failed to create item');
  }
});



  module.exports = router;
  
