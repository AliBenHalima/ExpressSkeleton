const mongoose =require("mongoose");

const UseDatabase = (app) => {
  mongoose
    .connect("mongodb://localhost:27017/Project", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then((result) => {
      console.log("Connection successfully established to local database");
      app.listen(3000);
    })
    .catch((err) => {
      console.log(err);
    });
};
module.exports= {UseDatabase}

// mongoose
//   .connect(
//     `mongodb+srv://${process.env.USER_NAME}:${process.env.PASSWORD}@cluster0.jdfda.mongodb.net/${process.env.DB}?retryWrites=true&w=majority`,
//     {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     }
//   )
//   .then((result) => {
//     console.log("Connection successfully established");
//     app.listen(3000);
//   })
//   .catch((err) => {
//     console.log(err);
//   });
