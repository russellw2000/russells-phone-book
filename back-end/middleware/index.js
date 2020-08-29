const connection = require("../db/connection");

authUser = (request, response, next) => {
  //check a user has a valid token

  const query = `SELECT count(*) as count, user_id
                      FROM sessions
                        WHERE session_id = ?;`;

  const params = [request.headers.token];

  connection.mysql.query(query, params, (err, results) => {
    if (results[0].count == 1) {
      //valid token

      //add user id to the request object
      request.user_id = results[0].user_id;

      //proceed
      next();
    }
    if (results[0].count === 0) {
      response.send({ status: 0 });
    }
    if (results[0].count > 1) {
      response.send({ status: 999 }); //something has gone very wrong
    }
  });
};

module.exports = { authUser };
