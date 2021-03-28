const indexRouter = require("./indexController");

module.exports.UsePaths = (app) => {
  
  app.use("/", indexRouter);

  app.get("/login", (req, res, next) => {
    res.send("Login");
  });


};