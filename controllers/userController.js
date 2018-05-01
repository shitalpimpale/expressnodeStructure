"use strict";

// Internal dependencies
var userService = require('../services/userServices.js');

function createUser(req, res) {

    try {

        userService.createUser(req.body,
            function (successData) {
                res.send(successData);
            }, function (errorData) {
                res.send(errorData);
            })
    } catch (error) {
        res.send(RESPONSE.sendResponse(null, null, null, error.message, STATUS_CODE.INTERNAL_SERVER_ERROR));
    }
}

function updateUser(req, res) {
    try {

        var reqBody = req.body
        userService.updateUser(reqBody, function (successData) {
            res.send(successData);
        }, function (errorData) {
            res.send(errorData);
        });

    } catch (error) {
        res.send(RESPONSE.internalServerError(error.message));
    }
}


//get all users
function getAllUsers(req, res) {

    try {
        userService.getAllUsers(function (successData) {
            res.send(successData);
        }, function (errorData) {
            res.send(errorData);
        });
    } catch (error) {
        res.send(RESPONSE.internalServerError(error.message));
    }
}

// delete user
function deleteUser(req, res) {
    try {
        userService.deleteUser(req.params._id,
            function (successData) {
                res.send(successData);
            }, function (errorData) {
                res.send(errorData);
            });
    } catch (error) {
        res.send(RESPONSE.internalServerError(error.message));
    }
}

// get single user
function getUserById(req, res) {
    try {
        userService.getUserById(req.params._id,
            function (successData) {
                res.send(successData);
            }, function (errorData) {
                res.send(errorData);
            });
    } catch (error) {
        res.send(RESPONSE.internalServerError(error.message));
    }
}

exports.createUser = createUser;
exports.updateUser = updateUser;
exports.getAllUsers = getAllUsers;
exports.deleteUser = deleteUser;
exports.getUserById = getUserById;