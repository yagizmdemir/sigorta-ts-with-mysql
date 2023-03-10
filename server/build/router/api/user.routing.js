"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var users_controller_1 = require("../../controller/users/users.controller");
var user_middleware_1 = require("../../middleware/user.middleware");
var router = (0, express_1.Router)();
router.post('/users', user_middleware_1.addUserMiddleware, users_controller_1.addUser);
router.put('/users/:id', users_controller_1.updateUser);
router.delete('/users/:id', users_controller_1.deleteUsers);
router.get('/users', users_controller_1.getUsers);
router.get('/users/:id', users_controller_1.getUser);
exports.default = router;
