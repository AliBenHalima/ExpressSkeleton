const Express = require("express");
const Router = Express.Router();
const UserModel = require("../Models/User");

/* GET home page. */
Router.get("/", function (req, res, next) {
  UserModel.find(function (error, results) {
    if (error) {
      res.send(error);
    }
    res.send(results);
  });

  // Usermodel.find().then((results)=>{
  //   res.send(results)
  // }).catch(err=>{
  //   res.send(err)
  // })
  // const user = new Usermodel({
  //   Username:req.body.Username
  // })
  // user.save().then((results)=>{
  //     res.send(results)
  //   }).catch(err=>{
  //     res.send(err)
  //   })

  // Usermodel.create({ req.body.Username : 'Ali' }).then((results)=>{
  //   res.send(results)
  // }).catch(err=>{
  //   res.send(err)
  // })

  // res.render('index', { title: 'Express' });
});

module.exports =  Router;
