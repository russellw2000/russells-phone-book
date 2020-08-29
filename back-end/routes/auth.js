const express = require("express");
const router = express.Router();
const connection = require("../db/connection");
const { generateToken } = require("../utils");
const sha256 = require("sha256");

router.post("/", (request, response) => {
  const query = `SELECT count(*) as count, id
                    FROM users
                     WHERE username = ?
                      AND password = ?;`;

  const sha256Password = sha256(request.body.name + request.body.password);

  const params = [request.body.username, sha256Password];

  connection.mysql.query(query, params, (err, results) => {
    if (results[0].count == 1) {
      const token = generateToken();

      //store token in sessions table

      const innerQuery = `INSERT INTO sessions
                            (user_id, session_id) 
                                VALUES (?, ?);`;

      const innerParams = [results[0].id, token];

      connection.mysql.query(innerQuery, innerParams, (err, results) => {});

      response.send({ status: 1, token });
    }
    if (results[0].count === 0) {
      response.send({ status: 0 });
    }
    if (results[0].count > 1) {
      response.send({ status: 999 }); //something has gone very wrong
    }
  });
});

module.exports = router;
