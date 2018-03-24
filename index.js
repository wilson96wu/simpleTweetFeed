var fs = require("fs");
var App = require('./src/app');

var app = new App(fs);

app.start();