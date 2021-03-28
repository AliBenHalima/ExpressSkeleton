const path = require("path");
var morgan = require('morgan')
const express = require("express");
var cookieParser = require('cookie-parser')

const UseDefaultConfig = (app) => {
  // view engine setup
  app.set("views", path.join(__dirname, "../views"));
  app.set("view engine", "jade");
  app.use(morgan("dev"));
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(cookieParser());
  app.use(express.static(path.join(__dirname, "../public")));
};
module.exports= {UseDefaultConfig}