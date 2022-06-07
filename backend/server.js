const express = require("express");
const port = process.env.PORT || 3030;
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require('path');
const app = express();
const userAuth = require("./userAuth");
const orders = require("./orders");

app.use(cors());
app.use(express.json({ limit: "1mb" }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

require("../backend/route")(app);

app.use(express.static(path.join(__dirname, '../')));

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, '../frontend/index.html'));
});

app.post("/login", userAuth.login);
app.post("/register", userAuth.register);
app.use("/getAllOrders", orders);

app.listen(port, () => {
  console.log("server started");
});