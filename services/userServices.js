"use strict";

var userModel = require('../models/userModel.js').user;

//create user
function createUser(data, successData, errorData) {
    try {
        userModel(data).save().
            then(function (result) {
                successData(RESPONSE.sendResponse(true, true, result, MESSAGE.SUCCESS, STATUS_CODE.OK));
            }).catch(function (error) {
                errorData(RESPONSE.sendResponse(null, null, null, error.message, STATUS_CODE.INTERNAL_SERVER_ERROR))
            })
    } catch (error) {
        errorData(RESPONSE.sendResponse(null, null, null, error.message, STATUS_CODE.INTERNAL_SERVER_ERROR));
    }
}

//update user
function updateUser(data, successData, errorData) {
    try {
        userModel.findOneAndUpdate({ _id: data._id }, { $set: data }, { new: true })
            .then(function (result) {
                if (result) {
                    successData(RESPONSE.sendResponse(true, true, result, MESSAGE.UPDATE_DATA, STATUS_CODE.OK));
                } else {
                    successData(RESPONSE.sendResponse(true, false, null, MESSAGE.USER_NOT_FOUND, STATUS_CODE.NOT_FOUND));
                }
            }).catch(function (error) {
                errorData(RESPONSE.sendResponse(false, false, null, error.message, STATUS_CODE.BAD_REQUEST));
            });
    } catch (error) {
        errorData(RESPONSE.sendResponse(null, null, null, error.message, STATUS_CODE.INTERNAL_SERVER_ERROR));
    }
}

//get all users
function getAllUsers(successData, errorData) {
    try {
        userModel.find({}).
            then(function (result) {
                successData(RESPONSE.sendResponse(true, true, result, MESSAGE.SUCCESS, STATUS_CODE.OK));
            }).catch(function (error) {
                errorData(RESPONSE.sendResponse(null, null, null, error.message, STATUS_CODE.INTERNAL_SERVER_ERROR))
            })
    } catch (error) {
        errorData(RESPONSE.sendResponse(null, null, null, error.message, STATUS_CODE.INTERNAL_SERVER_ERROR));
    }
}

//delete user
function deleteUser(id, successData, errorData) {
    try {
        userModel.findById(id)
            .then(function (result) {
                if (result) {
                    try {
                        userModel.remove({ _id: id })
                            .then(function (result) {
                                successData(RESPONSE.sendResponse(true, true, null, MESSAGE.DATA_DELETED_SUCCESS, STATUS_CODE.OK));
                            }).catch(function (error) {
                                errorData(RESPONSE.sendResponse(null, null, null, error.message, STATUS_CODE.INTERNAL_SERVER_ERROR))
                            });
                    } catch (error) {
                        errorData(RESPONSE.sendResponse(null, null, null, error.message, STATUS_CODE.INTERNAL_SERVER_ERROR))
                    }
                } else {
                    successData(RESPONSE.sendResponse(true, false, null, MESSAGE.USER_NOT_FOUND, STATUS_CODE.NOT_FOUND));
                }
            }).catch(function (error) {
                errorData(RESPONSE.sendResponse(null, null, null, error.message, STATUS_CODE.INTERNAL_SERVER_ERROR))
            })
    } catch (error) {
        errorData(RESPONSE.sendResponse(null, null, null, error.message, STATUS_CODE.INTERNAL_SERVER_ERROR));
    }
}

//get single user
function getUserById(id, successData, errorData) {
    try {
        userModel.findById(id)
            .then(function (result) {
                if (result) {
                    successData(RESPONSE.sendResponse(true, true, result, MESSAGE.SUCCESS, STATUS_CODE.OK));
                } else {
                    successData(RESPONSE.sendResponse(true, false, null, MESSAGE.USER_NOT_FOUND, STATUS_CODE.NOT_FOUND));
                }
            }).catch(function (error) {
                errorData(RESPONSE.sendResponse(null, null, null, error.message, STATUS_CODE.INTERNAL_SERVER_ERROR));
            });
    } catch (error) {
        errorData(RESPONSE.sendResponse(null, null, null, error.message, STATUS_CODE.INTERNAL_SERVER_ERROR));
    }
}

module.exports.createUser = createUser;
module.exports.getAllUsers = getAllUsers;
module.exports.updateUser = updateUser;
module.exports.deleteUser = deleteUser;
module.exports.getUserById = getUserById;
