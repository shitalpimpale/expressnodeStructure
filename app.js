"use strict";
//External dependencies
var express = require('express');
var bodyParser = require('body-parser');
var busboyBodyParser = require('busboy-body-parser');
const Sequelize = require('sequelize');
const _ = require('underscore');

//Internal dependencies
var userRoutes = require('./routes/user.js');
var config = require('./config/config.js');
var db = require('./utils/databaseConnection.js');

var envConfig = config.environmentConfig();
var port = envConfig.port;
var app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.json({ limit: '5mb', extended: true }));
// parse application/json
app.use(bodyParser.urlencoded({ limit: '5mb', extended: true }));

//parse multipart/form-data    
app.use(busboyBodyParser());

//Declear global variables
if (!global._) {
    global._ = _;
}

if (!global.MESSAGE)
    global.MESSAGE = require('./constants/messages.js');

if (!global.STATUS_CODE)
    global.STATUS_CODE = require('./constants/statusCode.js');

if (!global.RESPONSE)
    global.RESPONSE = require('./utils/Response.js');

app.get('/*', function (req, res, next) {
    console.log(req.method, "->", req.headers.host)
    next();
});

// Initialize routes
app.all('*', userRoutes);

var server = app.listen(process.env.PORT || port, function () {
    console.log('server runnig on port:', port);
    db.connectToMongo();
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development

    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.send(RESPONSE.sendResponse(false, false, null, err, STATUS_CODE.INTERNAL_SERVER_ERROR))
});

