var express = require("express");
var passport = require("passport");
var bodyParser = require("body-parser");
var LocalStrategy = require("passport-local");
var passportLocalMongoose = require("passport-local-mongoose");
var User = require("./dataBase");
var app = express();

// app.set("view engine", "ejs");
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(
//   require("express-session")({
//     secret: "node js mongodb",
//     resave: false,
//     saveUninitialized: false,
//   })
// );
app.use(passport.initialize());
app.use(passport.session());
// passport.use(new LocalStrategy(User.authenticate()));
// passport.serializeUser(User.serializeUser());
// passport.deserializeUser(User.deserializeUser());

// Handling user signup
exports.register = function (req, res) {
  var email = req.body.email;
  var password = req.body.password;

  const newUser = new User({
    userName: email,
    password: password,
    isKYCDone: false,
    orders: [],
  });
  newUser.save(function (err, data) {
    if (!err) {
      res.status(201).send();
    } else {
      res.send(err);
    }
  });
};

//Handling user login
exports.login = function (req, res) {
  var isValid = false;
  console.log(req.body);
  User.find(function (err, users) {
    if (!err) {
      for (var i = 0; i < users.length; i++) {
        if (
          req.body.email == users[i].userName &&
          req.body.password == users[i].password
        ) {
          isValid = true;
          res.status(200).send({ isLoggedIn: true });
        }
      }
      if (!isValid) {
        res.status(401).send({ isLoggedIn: false });
      }
    } else {
      res.send(err);
    }
  });
  console.log(isValid);
};
//Handling user logout
app.get("/logout", function (req, res) {
  console.log("logged out");
});
function isLoggedIn(req, res, next) {
  // if (req.isAuthenticated()) return next();
  //   res.redirect("/login");
}
