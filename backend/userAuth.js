var User = require("./dataBase");

// Handling user register
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
  let isValid = false;
  console.log(req.body)
  User.find(function (err, users) {
    // console.log(req.body+" "+JSON.parse(users));
    if (!err) {
      for (var i = 0; i < users.length; i++) {
        if (
          req.body.email === users[i].userName &&
          req.body.password === users[i].password
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