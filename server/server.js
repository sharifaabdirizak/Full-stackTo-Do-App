const express = require('express');
const app = express();
app.use(express.static('server/public'));
// Routes go here
app.listen(5000, function () {
   console.log(`You started the server! It is running on port 5000.`);
})
data.js (optional)
let data = [];
module.exports = data;