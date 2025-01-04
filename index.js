// index.js
// where your node app starts

// Initialize project
require('dotenv').config();
var express = require('express');
var app = express();

// Enable CORS for remote testing
var cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// Serve static files (if needed)
app.use(express.static('public'));

// Route for the main page (you can replace this if you want a more detailed frontend)
app.get('/', function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

// Hello API endpoint
app.get('/api/hello', function (req, res) {
  res.json({ greeting: 'hello API' });
});

// The Request Header Parser endpoint
app.get('/api/whoami', function (req, res) {
  // Extract the IP address, language, and software from the headers
  const ipAddress = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  const language = req.headers['accept-language']?.split(',')[0];
  const software = req.headers['user-agent'].match(/\(([^)]+)\)/)[1];

  // Return the parsed information in JSON format
  res.json({
    ipaddress: ipAddress,
    language: language,
    software: software
  });
});

// Start the server
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
