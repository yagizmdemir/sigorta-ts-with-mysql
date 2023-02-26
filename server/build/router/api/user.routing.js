"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var users_controller_1 = require("../../controller/users/users.controller");
var router = (0, express_1.Router)();
router.post('/users', users_controller_1.addUser);
router.put('/users/:id', users_controller_1.updateUser);
router.delete('/users/:id', users_controller_1.deleteUsers);
router.get('/users', users_controller_1.getAllUsers);
router.get('/users/:id', users_controller_1.getUser);
exports.default = router;