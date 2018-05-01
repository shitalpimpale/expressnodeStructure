"use strict";

var express = require('express');
var router = express.Router();
var userController = require('../controllers/userController.js');

router.post('/user/create', userController.createUser);
router.post('/user/update', userController.updateUser);
router.get('/user/getall', userController.getAllUsers);
router.get('/user/delete/:_id', userController.deleteUser);
router.get('/user/get/:_id', userController.getUserById);

module.exports = router;
