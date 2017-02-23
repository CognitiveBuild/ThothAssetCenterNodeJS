var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var favicon = require('serve-favicon');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var jwt = require('jwt-simple');
var db = require('./db/db');
var fileUpload = require('express-fileupload');
var config = require('./config');

var app = express();

var routers = require('./routes/index');
var users = require('./routes/users');
var data = require('./routes/data');
var fileUD = require('./routes/files');
//view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

//add file upload.
// app.use(express.bodyParser());

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
// app.use(fileUpload());
app.use(fileUpload({limits: { fileSize: config.maxUploadFileSize }}));

app.use(function(req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods","GET,POST,PUT,DELETE");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

  next();
});
app.use('/', routers);
app.use('/users', users);
app.use('/data', data);
app.use('/files', fileUD);



db.connectDB(function(err,conn){
    if(err) console.log(err);
    console.log("connect:"+JSON.stringify(conn));
  });

// var server = app.listen(3000, function () {

//   var host = server.address().address;
//   var port = server.address().port;
//   // app.set('jwtTokenSecret','Secret');
//   console.log("Application: http://%s:%s", host, port)
//   console.log(app.get('jwtTokenSecret'));
//   console.log("db.isConnected:"+db.isConnected());
//   db.connectDB(function(err,conn){
//   	if(err) console.log(err);
//   	console.log("connect:"+JSON.stringify(conn));
//   });

// });

module.exports = app;