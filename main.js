/**
 * This server is for simulating the remote server during development
 * It serves content and API endpoints
 */

// Libs
// ================================================================
var express = require('express');
var net = require('net');
var url = require('url');
var fs = require('fs');
var bodyParser = require('body-parser');
var Http = require('http');

// Config
// ================================================================
var ENV = process.env.ENV || 'DEV';

// Init
// ================================================================
var app = express();
var server = Http.Server(app);

// Setup
// ================================================================
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Content-Length");
  //res.setHeader("Content-type", 'application/json');
  next();
});
app.use(express.static(__dirname + '/src'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json({extended: true}));
app.set('view engine', 'ejs');

// Configs
// ================================================================
var webServerPort = 8081;

// Web server for UI and API Endpoints
// ================================================================
var webserver = server.listen(webServerPort, function () {
    var host = webserver.address().address;
    var port = webserver.address().port;
    console.log('Web Server listening at http://%s:%s', host, port);
});
