const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 5000;

const pg = require('pg');

//add bodyParser
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static('server/public'));




// Routes go here



app.listen(PORT, () => {
    console.log('listening on port', PORT);
  });


