const express = require('express');
const encryptLib = require('../modules/encryption');
const pool = require('../modules/pool');

const { rejectUnauthenticated } = require('../modules/authentication-middleware');

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

  module.exports = router;
  