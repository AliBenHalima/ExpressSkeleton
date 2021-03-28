const express = require("express");
const dotenv = require("dotenv");
const { UseAuth } = require("./middleware/Auth");
const { UseDatabase } = require("./middleware/Database");
const { UseGQL } = require("./middleware/GraphQL");
const { UseDefaultConfig } = require("./middleware/defaults");
const { UseErrorHandler } = require("./middleware/Errors");
const { UsePaths } = require("./controllers/index");

const indexRouter = require("./controllers/indexController");

var app = express();

dotenv.config();

app.use("/", indexRouter);
UseDefaultConfig(app);
UseAuth(app);
UseDatabase(app);
UsePaths(app);
UseGQL(app);
UseErrorHandler(app);

app.get("/aaaaa", (req, res, next) => {
  res.send("aaaaa");
});

module.exports = app;
