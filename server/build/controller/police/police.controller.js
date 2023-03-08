"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUser = exports.deleteMusteri = exports.getAllPoliceler = exports.getPolice = exports.addMusteri = void 0;
var police_service_1 = require("../../services/police/police.service");
var service = new police_service_1.policeService();
var addMusteri = function (req, res) {
    var fullname = req.body.fullname;
    service.addMusteri(res, 'musteriler', fullname);
};
exports.addMusteri = addMusteri;
var getPolice = function (req, res) {
    var ad = req.params.ad;
    service.getPolice(req, res, 'police', 'id', ad);
};
exports.getPolice = getPolice;
var getAllPoliceler = function (req, res) {
    service.getAllPoliceler(req, res, 'police');
};
exports.getAllPoliceler = getAllPoliceler;
var deleteMusteri = function (req, res) {
    var ad = req.params.ad;
    service.deleteMusteri(req, res, 'musteriler', 'id', ad);
};
exports.deleteMusteri = deleteMusteri;
var updateUser = function (req, res) {
};
exports.updateUser = updateUser;
