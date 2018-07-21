var express = require('express');
var path = require('path');

var app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function (req, res) {
  res.send('index.html');
});

app.use((req, res) => {
  res.redirect('/');
});

module.exports = app;
