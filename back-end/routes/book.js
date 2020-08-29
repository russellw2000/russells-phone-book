const express = require("express");
const router = express.Router();
const connection = require("../db/connection");

//get an entries
router.get("/:order", (request, response) => {
  //get all entries

  //non prepared statement injection prevention
  const san = request.params.order === "DESC" ? "DESC" : "ASC";

  const query = `SELECT id, name, number
                    FROM contacts
                        WHERE user_id = ${request.user_id}
                          ORDER BY name ${san};`;

  connection.mysql.query(query, (err, results) => {
    response.send(results);
  });
});

//add an entry
router.post("/", (request, response) => {
  //add entry to database

  const query = `INSERT INTO contacts
                    (user_id, name, number) 
                        VALUES (?, ?, ?);`;

  const params = [request.user_id, request.body.name, request.body.number];

  connection.mysql.query(query, params, (err, results) => {
    if (results) {
      response.send({ status: 1 });
    } else {
      response.send({ status: 2 });
    }
  });
});

//delete an entry
router.delete("/:id", (request, response) => {
  //delete entry from database

  const query = `DELETE FROM contacts 
                    WHERE id = ?
                    AND user_id = ${request.user_id};`;

  const params = [request.params.id];

  connection.mysql.query(query, params, (err, results) => {
    if (results) {
      response.send({ status: 1 });
    } else {
      response.send({ status: 2 });
    }
  });
});

//edit an entry
router.put("/:id", (request, response) => {
  //edit an entry

  const query = `UPDATE contacts SET name = ?, 
                                     number = ? 
                                 WHERE id = ?
                                 AND user_id = ${request.user_id}`;

  const params = [request.body.name, request.body.number, request.params.id];

  connection.mysql.query(query, params, (err, results) => {
    if (results) {
      response.send({ status: 1 });
    } else {
      response.send({ status: 2 });
    }
  });
});

module.exports = router;
