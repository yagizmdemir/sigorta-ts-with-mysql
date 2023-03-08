"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateAjans = exports.deleteAjans = exports.getAllAjans = exports.getAjans = void 0;
var ajans_service_1 = require("../../services/ajans/ajans.service");
var service = new ajans_service_1.AjansService();
var getAjans = function (req, res) {
    var ad = req.params.ad;
    service.getAjans(req, res, 'ajanslar', 'ad', ad);
};
exports.getAjans = getAjans;
var getAllAjans = function (req, res) {
    service.getAllajans(req, res, 'ajanslar');
};
exports.getAllAjans = getAllAjans;
var deleteAjans = function (req, res) {
    var id = req.params.id;
    service.deleteAjans(req, res, 'ajanslar', 'id', id);
};
exports.deleteAjans = deleteAjans;
var updateAjans = function (req, res) {
    var id = req.params.id;
    service.updateAjans(req, res, 'ajanslar', id);
};
exports.updateAjans = updateAjans;
