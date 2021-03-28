var passport = require("passport");
var GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;
var FacebookStrategy = require("passport-facebook").Strategy;
var LocalStrategy = require("passport-local").Strategy;
var passport = require("passport");
const MongoStore = require("connect-mongo");
const UserModel = require("../Models/User");

var session = require("express-session");

const init = () => {
  const Strategies = [
    new GoogleStrategy(
      {
        clientID: process.env.clientID,
        clientSecret: process.env.clientSecret,
        callbackURL: process.env.callbackURL,
      },
      function (accessToken, refreshToken, profile, cb) {
        //    User.findOrCreate({ googleId: profile.id }, function (err, user) {
        //      return done(err, user);
        //    });
        // console.log(profile);
        cb(null, profile);
      }
    ),
    new FacebookStrategy(
      {
        clientID: "302370124811139",
        clientSecret: "319fbddda6a0694a97612be3b44883ff",
        callbackURL: "http://localhost:3000/auth/facebook/callback",
      },
      function (accessToken, refreshToken, profile, cb) {
        // User.findOrCreate(..., function(err, user) {
        //   if (err) { return done(err); }
        //   done(null, user);
        // });
        console.log(profile);
        cb(null, profile);
      }
    ),
    new LocalStrategy(
      {
        usernameField: "Username",
        passwordField: "Password",
      },
      function (Username, Password, done) {
        console.log("username and password are", Username + Password);
        UserModel.findOne({ Username: Username }, function (err, user) {
          if (err) {
            return done(err);
          }
          if (!user) {
            return done(null, false);
          }
          if (!user.verifyPassword(Password)) {
            return done(null, false);
          }
          return done(null, user);
        });
      }
    ),
  ];

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((user, done) => {
    done(null, user);
  });

  for (const strategy of Strategies) {
    passport.use(strategy);
  }
};
const UseAuth = (app) => {
  app.use(passport.initialize());
  init();
  app.use(passport.session());
  app.use(
    session({
      secret: "some secret",
      resave: false,
      saveUninitialized: true,
      store: MongoStore.create({
        mongoUrl: "mongodb://localhost:27017/Project",
        ttl: 14 * 24 * 60 * 60,
      }),
      cookie: {
        maxAge: 1000 * 60 * 60 * 24,
      },
    })
  );

  app.get(
    "/google",
    passport.authenticate("google", {
      scope: ["https://www.googleapis.com/auth/plus.login"],
    })
  );

  // GET /auth/google/callback
  //   Use passport.authenticate() as route middleware to authenticate the
  //   request.  If authentication fails, the user will be redirected back to the
  //   login page.  Otherwise, the primary route function function will be called,
  //   which, in this example, will redirect the user to the home page.
  app.get("/google/callback", passport.authenticate("google", { failureRedirect: "/login" }), function (req, res) {
    res.send("Welcome");
  });
  app.post("/local", passport.authenticate("local", { successRedirect: "/" }));
  app.get("/auth/facebook", passport.authenticate("facebook"));

  app.get(
    "/auth/facebook/callback",
    passport.authenticate("facebook", {
      successRedirect: "/",
      failureRedirect: "/login",
    })
  );
};
module.exports = { UseAuth };
