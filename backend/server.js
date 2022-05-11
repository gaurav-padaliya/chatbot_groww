const express = require('express');
const port = process.env.PORT||3030;
const bodyParser = require('body-parser');
const cors = require('cors');
const app  = express();

app.use(cors())
app.use(express.json({limit:'1mb'}))
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());


require('../backend/route')(app)

app.listen(port ,()=>{
    console.log("server started");
})