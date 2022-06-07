const express = require("express");
const router = express.Router();
var User = require("./dataBase");

//To Get All Orders as an array
router.get("/:userName", function (req, res) {
  const userName = req.params.userName;
  console.log(userName);
  User.findOne({ userName: userName }, function (err, user) {
    if (user) {
      const orders = user.orders;
      res.status(200).send(orders);
    } else {
      res.status(404).send();
    }
  });
});

module.exports = router;
