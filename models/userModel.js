"use strict";

var mongoose = require('mongoose');
mongoose.Promise = Promise;
var Schema = mongoose.Schema;

var user = new Schema({
    fName: { type: String, required: true },
    lName: { type: String, required: true }

})


// Exports modules.
module.exports.user = mongoose.model('user', user, 'user');
