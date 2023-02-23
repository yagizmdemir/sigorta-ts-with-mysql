"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUser = exports.deleteUsers = exports.getAllUsers = exports.getUser = exports.addUser = void 0;
var users_service_1 = require("../../services/users/users.service");
var service = new users_service_1.UserService();
var addUser = function (req, res) {
    var user = req.body.user;
    service.addUser(res, 'kullanicilar', user);
};
exports.addUser = addUser;
var getUser = function (req, res) {
    var id = req.params.id;
    service.getUser(req, res, 'kullanicilar', 'id', id);
};
exports.getUser = getUser;
var getAllUsers = function (req, res) {
    service.getUsers(req, res, 'kullanicilar');
};
exports.getAllUsers = getAllUsers;
var deleteUsers = function (req, res) {
    var id = req.params.id;
    service.deleteUser(req, res, 'kullanicilar', 'id', id);
};
exports.deleteUsers = deleteUsers;
var updateUser = function (req, res) {
};
exports.updateUser = updateUser;
