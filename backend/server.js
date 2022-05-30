const express = require('express');
const port = process.env.PORT||3030;
const bodyParser = require('body-parser');
const cors = require('cors');
const app  = express();
const dataBase = require("./dataBase");
const userAuth = require("./userAuth");

app.use(cors())
app.use(express.json({limit:'1mb'}))
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());


require('../backend/route')(app)
app.post('/login',userAuth.login);
app.post('/register',userAuth.register);

app.listen(port ,()=>{
    console.log("server started");
})