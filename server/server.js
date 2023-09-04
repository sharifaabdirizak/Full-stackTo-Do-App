const express = require('express');
const app = express();
//set up bodyParser
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 5000;

const pg = require('pg');

//add bodyParser
app.use(bodyParser.urlencoded({ extended: true }));

let todoRouter = require ('./routes/todo.router.js');
app.use(express.static('server/public'));


// Routes go here //set up router
let todoRouter = require ('./routes/todo.router.js');


//console.log("listing on PORT", PORT);
app.listen(PORT, () => {
    console.log('listening on port', PORT);
  });


