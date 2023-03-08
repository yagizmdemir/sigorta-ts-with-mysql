"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var musteri_controller_1 = require("../../controller/musteri/musteri.controller");
var router = (0, express_1.Router)();
router.post('/musteri', musteri_controller_1.addMusteri);
//router.put('/ajans/:id', updateAjans);
router.delete('/musteri/:ad', musteri_controller_1.deleteMusteri);
router.get('/musteri/:ad', musteri_controller_1.getAllMusteri);
router.get('/musteri/:ad', musteri_controller_1.getMusteri);
exports.default = router;