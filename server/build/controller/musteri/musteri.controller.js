"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUser = exports.deleteMusteri = exports.getAllMusteri = exports.getMusteri = exports.addMusteri = void 0;
var musteri_service_1 = require("../../services/musteri/musteri.service");
var service = new musteri_service_1.musteriService();
var addMusteri = function (req, res) {
    var fullname = req.body.fullname;
    service.addMusteri(res, 'musteriler', fullname);
};
exports.addMusteri = addMusteri;
var getMusteri = function (req, res) {
    var ad = req.params.ad;
    service.getMusteri(req, res, 'musteriler', 'id', ad);
};
exports.getMusteri = getMusteri;
var getAllMusteri = function (req, res) {
    var ajansID = req.query.ajansID;
    if (!ajansID) {
        service.getAllMusteri(req, res, 'musteriler');
    }
    else {
        service.getRepresentsMusterileri(req, res, 'musteriler', "ajans_id = ".concat(ajansID));
    }
};
exports.getAllMusteri = getAllMusteri;
var deleteMusteri = function (req, res) {
    var ad = req.params.ad;
    service.deleteMusteri(req, res, 'musteriler', 'id', ad);
};
exports.deleteMusteri = deleteMusteri;
var updateUser = function (req, res) { };
exports.updateUser = updateUser;
