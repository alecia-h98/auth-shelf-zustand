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

  module.exports = router;
  
