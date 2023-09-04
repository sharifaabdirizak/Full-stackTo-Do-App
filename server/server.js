const express = require('express');
const app = express();
//set up bodyParser
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 5000;

const pg = require('pg');
let todoRouter = require('./routes/todo.router');

//add bodyParser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('server/public'));

// Routes go here //set up router
app.use('/tasks', todoRouter);



app.listen(PORT, () => {
    console.log('listening on port', PORT);
  });


