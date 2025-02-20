const express = require('express');
const encryptLib = require('../modules/encryption');
const pool = require('../modules/pool');

const {rejectUnauthenticated} = require('../modules/authentication-middleware');

const router = express.Router();


router.get("/", rejectUnauthenticated, (req, res) => {
    const queryText = `SELECT * FROM "item";`;
    pool.query(queryText)
      .then((result) => {
        res.send(result.rows);
      })
      .catch((err) => {
        console.log("Error getting items", err);
        res.sendStatus(500);
      });
}); 


// Post to add a new item
router.post('/add-item', rejectUnauthenticated, async (req, res) => {
  const { description, image_url} = req.body;

  const sqlText = `
    INSERT INTO "item" ("description", "image_url", "user_id")
    VALUES ($1, $2, $3) RETURNING *;
  `;
  const values = [description, image_url, req.user.id]; 

  try {
    const result = await pool.query(sqlText, values);
    res.status(201).send(result.rows[0]);  // Send back the newly created item
  } catch (err) {
    console.log('Error creating new item:', err);
    res.status(500).send('Failed to create item');
  }
});



//NEED TO FIX THE QUERY CODE TO MATCH THE CASE. IT CAN ONLY BE DELETED BY THE ONE THAT MADE IT.
//if statement..?
router.delete("/delete/:id", rejectUnauthenticated, (req, res) => {
  const query = `
  DELETE 
FROM "item"
WHERE "item"."id" = $1;
  `;
  pool.query(query, [req.params.id])
    .then(result => {
      res.send(result.rows);
    })
    .catch(err => {
      console.log(`Error delete backend`, err);
      res.sendStatus(500);
    })
})

  

  module.exports = router;
  
