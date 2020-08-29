//this is the server

require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const chalk = require("chalk");
const bodyParser = require("body-parser");
const helmet = require("helmet");

const { authUser } = require("./middleware");

app.use(helmet());
app.use(cors());
app.use(bodyParser.json());

app.use("/book", authUser, require("./routes/book"));
app.use("/auth", require("./routes/auth"));

app.listen(process.env.PORT, () => {
  console.log(chalk.cyan("The server is running on port: " + process.env.PORT));
});
